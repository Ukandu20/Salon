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
        instructions: "Navigate to '/api/bookings' to manage bookings or query specific booking details.",
        availableRoutes: [
            { method: "GET", path: "/api/bookings", description: "Retrieve all bookings or filter by any field like firstName, lastName, etc." },
            { method: "POST", path: "/api/bookings", description: "Create a new booking" },
            { method: "GET", path: "/api/bookings/:field/:value", description: "Retrieve bookings by any field (e.g., firstName, lastName, email)" },
            { method: "GET", path: "/api/bookings/date/:date", description: "Retrieve bookings by date" },
            { method: "GET", path: "/api/bookings/date/:date/time-slots", description: "Retrieve available time slots for a specific date" },
            { method: "DELETE", path: "/api/bookings/id/:id", description: "Delete a specific booking by ID" },
            { method: "DELETE", path: "/api/bookings/all", description: "Delete all bookings" }
        ]
    });
});

export default router;
