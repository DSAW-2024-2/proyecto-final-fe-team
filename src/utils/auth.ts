// Tipos
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface TokenPayload {
  exp: number;
  id: string;
  email: string;
  role: string;
  deviceId?: string;
}

// Variable para controlar el estado de refresh
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Función para generar un device fingerprint simple
const generateDeviceFingerprint = (): string => {
  const { userAgent, language, platform } = navigator;
  const screenRes = `${window.screen.width}x${window.screen.height}`;
  const fingerprint = `${userAgent}|${language}|${platform}|${screenRes}`;
  return btoa(fingerprint);
};

export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as TokenPayload;
    const expiration = payload.exp * 1000;
    
    // Verificar el device fingerprint
    if (payload.deviceId && payload.deviceId !== generateDeviceFingerprint()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return false;
    }

    // Si el token expira en menos de 30 segundos, intentar refresh
    if (Date.now() >= (expiration - 30000)) {
      refreshAccessToken();
      return false;
    }

    return true;

  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return false;
  }
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Device-ID': generateDeviceFingerprint()
  };
};

export const refreshAccessToken = async (): Promise<boolean> => {
  // Si ya hay un refresh en proceso, esperar a que termine
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshSubscribers.push((token: string) => {
        resolve(!!token);
      });
    });
  }

  isRefreshing = true;
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) {
    isRefreshing = false;
    return false;
  }

  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-ID': generateDeviceFingerprint()
      },
      body: JSON.stringify({ 
        refreshToken,
        deviceId: generateDeviceFingerprint()
      })
    });

    if (!response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      isRefreshing = false;
      refreshSubscribers = [];
      return false;
    }

    const data: RefreshTokenResponse = await response.json();
    
    // Almacenar tokens en cookies HttpOnly si está disponible el endpoint
    try {
      await fetch(`${API_URL}/set-tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }),
        credentials: 'include'
      });
    } catch {
      // Si falla el almacenamiento en cookies, usar localStorage como fallback
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    
    // Notificar a todos los subscribers que el token se ha actualizado
    refreshSubscribers.forEach(callback => callback(data.accessToken));
    refreshSubscribers = [];
    
    isRefreshing = false;
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    isRefreshing = false;
    refreshSubscribers = [];
    return false;
  }
};

export const fetchWithTokenRefresh = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  let attempts = 0;
  const maxAttempts = 2;

  async function attemptFetch(): Promise<Response> {
    if (attempts >= maxAttempts) {
      throw new Error('Máximo de intentos alcanzado');
    }

    if (!isTokenValid() && attempts === 0) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        throw new Error('Sesión expirada');
      }
    }

    attempts++;
    
    const headers = { 
      ...options.headers, 
      ...getAuthHeaders(),
      'X-Device-ID': generateDeviceFingerprint()
    };
    
    const response = await fetch(url, { 
      ...options, 
      headers,
      credentials: 'include' // Para soportar cookies
    });

    if (response.status === 401 && attempts < maxAttempts) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return attemptFetch();
      }
      throw new Error('Sesión expirada');
    }

    return response;
  }

  return attemptFetch();
};