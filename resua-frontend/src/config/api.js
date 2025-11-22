/**
 * Configuración de URLs de los microservicios
 */

// URLs base de los microservicios
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

export const API_ENDPOINTS = {
  // Microservicio de Autenticación (Java)
  AUTH: {
    BASE: `${API_BASE_URL}:8081/api/auth`,
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    REFRESH: '/refresh',
    PROFILE: '/profile',
  },
  
  // Microservicio de Observaciones (Java)
  OBSERVATIONS: {
    BASE: `${API_BASE_URL}:8082/api/observations`,
    LIST: '/',
    CREATE: '/',
    DETAIL: '/:id',
    UPDATE: '/:id',
    DELETE: '/:id',
    BY_USER: '/user/:userId',
    BY_LOCATION: '/location',
  },
  
  // Microservicio de Comunidad (Java)
  COMMUNITY: {
    BASE: `${API_BASE_URL}:8083/api/community`,
    COMMENTS: '/comments',
    CREATE_COMMENT: '/comments',
    LIKE: '/likes',
    SHARE: '/shares',
  },
  
  // Microservicio de IA (Python)
  IA: {
    BASE: `${API_BASE_URL}:8000/api/ia`,
    IDENTIFY_SPECIES: '/identify',
    SUGGESTIONS: '/suggestions',
  },
}

// Configuración de headers por defecto
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken')
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  }
}

// Timeout por defecto (30 segundos)
export const API_TIMEOUT = 30000

export default API_ENDPOINTS

