import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

class ObservationsService {

    async getAllObservationsByUserId(userId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/observations-ms/observations/user?id=${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            return response.data;
        } catch (error) {
            console.error('Error al consultar observaciones:', error);
            throw error;
        }
    }

    async getObservationById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/observations-ms/observations`, {
                params: { id },
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener observación por id:', error);
            throw error;
        }
    }

    async updateObservation(id, body) {
        try {
            const response = await axios.patch(`${API_BASE_URL}/observations-ms/observations/${id}`,
                body,
                { headers: { 'Content-Type': 'application/json' } }
            );
            return response.data;
        } catch (error) {
            console.error('Error al actualizar observación:', error);
            throw error;
        }
    }

    async deleteObservation(id) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/observations-ms/observations/${id}`, {
                headers: { 'Content-Type': 'application/json' }
            })
            return response.data
        } catch (error) {
            console.error('Error al eliminar observación:', error)
            throw error
        }
    }

    async createObservation(body) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/observations-ms/observations`,
                body,
                { headers: { 'Content-Type': 'application/json' } }
            )
            return response.data
        } catch (error) {
            console.error('Error al crear observación:', error)
            throw error
        }
    }
}

export default ObservationsService;
