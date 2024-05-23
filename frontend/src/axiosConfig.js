import axios from 'axios';

// Set the base URL for Axios based on the environment
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:5000/' : 'https://salon-2.onrender.com/';

// Ensure that credentials are included in requests
axios.defaults.withCredentials = true;
