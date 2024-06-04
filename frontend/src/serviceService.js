import axios from 'axios';

// Function to get all services from the server
export const getAll = async () => {
  try {
    const response = await axios.get('/api/services');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createService = async (newService) => {
    try {
      const response = await axios.post('/api/services', newService);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };