import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

class AgentService {
   
async queryObservations(consulta) {
    try {
      const response = await axios.post(`${API_BASE_URL}/observations/query`, {
        consulta: consulta
      }, {
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
}

export default AgentService;
