export const isTokenValid = (): boolean => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false;
    }
  
    try {
      // Decodificar el token (parte del payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      // Verificar expiración
      const expiration = payload.exp * 1000; // Convertir a milisegundos
      if (Date.now() >= expiration) {
        localStorage.removeItem('token'); // Limpiar token expirado
        return false;
      }
  
      return true;
    } catch (error) {
      localStorage.removeItem('token'); // Limpiar token inválido
      return false;
    }
  };
  
  export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };