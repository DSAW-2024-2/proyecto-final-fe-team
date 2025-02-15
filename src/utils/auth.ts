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

// API Base URL
export const API_BASE_URL = 'https://proyecto-final-be-team-chi.vercel.app';

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
    
    if (payload.deviceId && payload.deviceId !== generateDeviceFingerprint()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return false;
    }

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

export const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
  'X-Device-ID': generateDeviceFingerprint()
});

export const fetchWithTokenRefresh = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  let attempts = 0;
  const maxAttempts = 2;

  const fetchWithCredentials = async (): Promise<Response> => {
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
      ...getAuthHeaders()
    };
    
    const response = await fetch(`${API_BASE_URL}${url}`, { 
      ...options, 
      headers,
      credentials: 'include'
    });

    if (response.status === 401 && attempts < maxAttempts) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return fetchWithCredentials();
      }
      throw new Error('Sesión expirada');
    }

    return response;
  };

  return fetchWithCredentials();
};

export const refreshAccessToken = async (): Promise<boolean> => {
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
    const response = await fetch(`${API_BASE_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Device-ID': generateDeviceFingerprint()
      },
      credentials: 'include',
      body: JSON.stringify({ 
        refreshToken,
        deviceId: generateDeviceFingerprint()
      })
    });

    if (!response.ok) {
      throw new Error('Error refreshing token');
    }

    const data: RefreshTokenResponse = await response.json();
    
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    
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