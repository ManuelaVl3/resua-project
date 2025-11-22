import axios from 'axios';

const API_BASE_URL = 'http://localhost:8084';

class CommunityService {
    
    async getCommentsByObservationId(observationId) {
        try {
            // Intentar obtener el token de diferentes claves posibles
            const token = localStorage.getItem('token') || 
                         localStorage.getItem('authToken') || 
                         localStorage.getItem('jwt');
            
            const headers = {
                'Content-Type': 'application/json'
            };
            
            // Agregar el token si está disponible (puede que algunos endpoints no requieran autenticación)
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const url = `${API_BASE_URL}/community-ms/community?observation_id=${observationId}`;
            console.log('Obteniendo comentarios desde:', url);
            
            const response = await axios.get(
                url,
                {
                    headers
                }
            );
            
            console.log('Respuesta del backend al obtener comentarios:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener comentarios:', error);
            
            // Detectar errores de CORS
            if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                const corsError = new Error('Error de conexión. El servidor no permite peticiones desde este origen (CORS). Por favor, contacta al administrador.');
                corsError.isCorsError = true;
                throw corsError;
            }
            
            throw error;
        }
    }
    
    async addComment(observationId, description) {
        try {
            // Intentar obtener el token de diferentes claves posibles
            const token = localStorage.getItem('token') || 
                         localStorage.getItem('authToken') || 
                         localStorage.getItem('jwt');
            
            if (!token) {
                const error = new Error('No se encontró el token de autenticación. Por favor, inicia sesión.');
                error.status = 401;
                throw error;
            }

            console.log('Enviando comentario al backend:', {
                observationId,
                description,
                url: `${API_BASE_URL}/community-ms/community`
            });

            const response = await axios.post(
                `${API_BASE_URL}/community-ms/community`,
                {
                    observationId,
                    description
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            console.log('Respuesta del backend al agregar:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al agregar comentario:', error);
            
            // Detectar errores de CORS
            if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                const corsError = new Error('Error de conexión. El servidor no permite peticiones desde este origen (CORS). Por favor, contacta al administrador.');
                corsError.isCorsError = true;
                throw corsError;
            }
            
            // Si es un error 401, agregar información para redirigir al login
            if (error.response && error.response.status === 401) {
                error.requiresLogin = true;
            } else if (error.status === 401) {
                error.requiresLogin = true;
            }
            
            throw error;
        }
    }

    async deleteComment(commentId) {
        try {
            // Intentar obtener el token de diferentes claves posibles
            const token = localStorage.getItem('token') || 
                         localStorage.getItem('authToken') || 
                         localStorage.getItem('jwt');
            
            if (!token) {
                const error = new Error('No se encontró el token de autenticación. Por favor, inicia sesión.');
                error.status = 401;
                throw error;
            }

            const response = await axios.delete(
                `${API_BASE_URL}/community-ms/community/comment/${commentId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            return response.data;
        } catch (error) {
            console.error('Error al eliminar comentario:', error);
            
            // Detectar errores de CORS
            if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                const corsError = new Error('Error de conexión. El servidor no permite peticiones desde este origen (CORS). Por favor, contacta al administrador.');
                corsError.isCorsError = true;
                throw corsError;
            }
            
            // Si es un error 401, agregar información para redirigir al login
            if (error.response && error.response.status === 401) {
                error.requiresLogin = true;
            } else if (error.status === 401) {
                error.requiresLogin = true;
            }
            
            throw error;
        }
    }
}

export default CommunityService;

