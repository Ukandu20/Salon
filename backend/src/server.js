import express from 'express';
import cors from 'cors';
import router from './routers/router.js';
import bookingRouter from './routers/booking.router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Log MongoDB URI for debugging purposes
console.log('MongoDB URI:', process.env.MONGO_URI); // Ensure this matches the .env file

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, // Increase the timeout to 30 seconds
  socketTimeoutMS: 45000 // Set the socket timeout to 45 seconds
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const app = express();
app.use(express.json());

// Set up CORS options
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://salon-cartierkuti.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Use routers for different endpoints
app.use('/api/bookings', bookingRouter);
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
