import express from 'express';
import cors from 'cors';
import router from './routers/router.js';
import bookingRouter from './routers/booking.router.js';

const app = express();

// Add body parsing middleware here
app.use(express.json()); // Enables parsing of JSON bodies


// CORS configuration to allow requests from specific origins with credentials
const corsOptions = {
    origin: ['http://localhost:5173', 'https://salon-cartier.netlify.app'], // Allowed origins
    credentials: true, // Allow credentials such as cookies, authorization headers, etc.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Allowed custom headers
};

// Apply CORS middleware with the above options
app.use(cors(corsOptions));

// Enable preflight requests for all routes
app.options('*', cors(corsOptions)); // Include before other routes

// Use bookingRouter for booking-related endpoints
app.use('/api/bookings', bookingRouter);

// Use router for other endpoints
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
