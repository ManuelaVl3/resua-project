import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083';

class AuthService {

    async registerUser(userData) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth-ms/user`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth-ms/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userFullName', response.data.fullName);
                
                // Guardar el token si viene en la respuesta (intentar diferentes nombres posibles)
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('authToken', response.data.token); // También guardar como backup
                    console.log('Token guardado correctamente en localStorage');
                } else if (response.data.jwt) {
                    localStorage.setItem('token', response.data.jwt);
                    localStorage.setItem('authToken', response.data.jwt);
                    console.log('Token (jwt) guardado correctamente en localStorage');
                } else {
                    console.warn('No se encontró token en la respuesta del login:', response.data);
                }
            }
            
            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const token = this.getAuthToken() || localStorage.getItem('token') || localStorage.getItem('jwt');
            
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await axios.get(
                `${API_BASE_URL}/auth-ms/user?id=${userId}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const token = this.getAuthToken() || localStorage.getItem('token') || localStorage.getItem('jwt');
            
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const response = await axios.patch(
                `${API_BASE_URL}/auth-ms/user/${userId}`,
                userData,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userFullName');
        window.location.href = '/login';
    }

    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    isAuthenticated() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    getCurrentUserId() {
        return localStorage.getItem('userId');
    }

    getCurrentUserEmail() {
        return localStorage.getItem('userEmail');
    }

    getCurrentUserFullName() {
        return localStorage.getItem('userFullName');
    }

    async getUserSecurityQuestionByEmail(email) {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/auth-ms/user/question?email=${encodeURIComponent(email)}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al obtener pregunta de seguridad por email:', error);
            throw error;
        }
    }

    async verifySecurityAnswer(userId, secretAnswer) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth-ms/user/verify-answer`,
                { userId, secretAnswer },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al verificar respuesta de seguridad:', error);
            throw error;
        }
    }

    async resetPassword(userId, newPassword, confirmPassword) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/auth-ms/user/reset-password`,
                { 
                    userId,
                    newPassword,
                    confirmPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error al restablecer contraseña:', error);
            throw error;
        }
    }
}

export default AuthService;

