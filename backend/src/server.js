import express from 'express';
import cors from 'cors';
import router from './routers/router.js';
import bookingRouter from './routers/booking.router.js';
import serviceRouter from './routers/service.router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('MongoDB URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://salon-cartierkuti.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/api/bookings', bookingRouter);
app.use('/api/services', serviceRouter);
app.use('/', router);

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
