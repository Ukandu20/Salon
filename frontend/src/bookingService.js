import axios from 'axios';

// Function to get all bookings from the server
export const getAll = async () => {
  try {
    const response = await axios.get('/api/bookings');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get a single booking by its ID
export const getById = async bookingId => {
  try {
    const response = await axios.get(`/api/bookings/${encodeURIComponent(bookingId)}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to get booking count for a specific month
export const getBookingCountByMonth = async (year, month) => {
  try {
    const response = await axios.get(`/api/bookings/count/${year}/${month}`);
    return response.data.count;
  } catch (error) {
    handleError(error);
  }
};

// Function to get the count of total users
export const getTotalUserCount = async () => {
  try {
    const response = await axios.get('/api/bookings/count-users');
    return response.data.count;
  } catch (error) {
    handleError(error);
  }
};

// Function to get the count of total users for a specific month
export const getTotalUserCountByMonth = async (year, month) => {
  try {
    const response = await axios.get(`/api/bookings/count-users/${year}/${month}`);
    return response.data.count;
  } catch (error) {
    handleError(error);
  }
};

// Function to get the count of unique users
export const getUniqueUserCount = async () => {
  try {
    const response = await axios.get('/api/bookings/count-unique-users');
    return response.data.count;
  } catch (error) {
    handleError(error);
  }
};

// Function to get the count of unique users for a specific month
export const getUniqueUserCountByMonth = async (year, month) => {
  try {
    const response = await axios.get(`/api/bookings/count-unique-users/${year}/${month}`);
    return response.data.count;
  } catch (error) {
    handleError(error);
  }
};

// Function to post a new booking to the server and return the newly created booking object
export const createBooking = async (newBooking) => {
  try {
    const response = await axios.post('/api/bookings', newBooking);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Generic error handler for logging and potentially throwing or handling the error
function handleError(error) {
  console.error('API call failed:', error);
  throw new Error('Failed to fetch from the API', { cause: error });
}

// Function to update booking status
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axios.put(`/api/bookings/status/${encodeURIComponent(bookingId)}`, { status });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
