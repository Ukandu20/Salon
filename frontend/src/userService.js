import axios from 'axios';

//Function to get All users from the server
export const getAll = async () => {
  try {
    const response = await axios.get('/api/users');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//Function to get a single user by its ID
export const getById = async userId => {
  try {
    const response = await axios.get(`/api/users/${encodeURIComponent(userId)}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//Function to post a new user to the server 
export const createUser = async (newUser) => {
  try {
    const response = await axios.post('/api/users', newUser);
    return response.data;
  }
  catch (error) {
    handleError(error);
  }
};

// Eror handler
function handleError(error) {
  console.error('An error occurred', error);
  throw new Error('Failed to fetch from the API', {cause: error});
}