/**
 * The above JavaScript code defines functions to interact with a server API for managing bookings,
 * including getting all bookings, getting a single booking by ID, and creating a new booking.
 * @returns The code snippet provided contains functions for interacting with a booking API. The
 * functions include:
 * 1. `getAll`: Retrieves all bookings from the server.
 * 2. `getById`: Retrieves a single booking by its ID.
 * 3. `createBooking`: Posts a new booking to the server and returns the newly created booking object.
 * 4. `handleError`: A generic error handler function for logging and potentially throwing
 */
import axios from "axios";

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
