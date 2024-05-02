import { Router } from 'express';

const router = Router();

// Middleware to log all requests to the server
router.use((req, res, next) => {
    console.log(`Received ${req.method} request for '${req.url}' from ${req.ip}`);
    next(); // pass control to the next handler
});

// Root route with welcome message and guide
router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the backend!",
        instructions: "Navigate to '/api/bookings' to manage bookings.",
        availableRoutes: [
            { method: "GET", path: "/api/bookings", description: "Retrieve all bookings" },
            { method: "POST", path: "/api/bookings", description: "Create a new booking" },
            { method: "GET", path: "/api/bookings/date/:date", description: "Retrieve bookings by date" },
            { method: "GET", path: "/api/bookings/time/:time", description: "Retrieve bookings by time" }
        ]
    });
});

export default router;
