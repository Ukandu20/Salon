import { Router } from 'express';
import { Booking } from '../assets/data/Booking.js';
import mongoose from 'mongoose';

const bookingRouter = Router();
const standardTimeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '5:00 PM'];

// Get all bookings
bookingRouter.get('/', async (req, res) => {
  try {
    const query = req.query; // Capture all query parameters
    const bookings = await Booking.find(query); // Pass query directly to find
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Get booking by specific parameter
bookingRouter.get('/:field/:value', async (req, res) => {
  try {
    const { field, value } = req.params;
    const query = {};
    query[field] = field === '_id' ? mongoose.Types.ObjectId(value) : value;
    const bookings = await Booking.find(query);

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking', error: err.message });
  }
});

// Create a new booking
bookingRouter.post('/', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, service, date, time } = req.body;
  if (!firstName || !lastName || !phoneNumber || !email || !service || !date || !time) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingBooking = await Booking.findOne({ date: new Date(date), time });
    if (existingBooking) {
      return res.status(409).json({ message: 'A booking already exists with the given date and time' });
    }

    const newBooking = new Booking({ firstName, lastName, phoneNumber, email, service, date: new Date(date), time });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully.', booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// Get time slots for a specific date
bookingRouter.get('/date/:date/time-slots', async (req, res) => {
  try {
    const { date } = req.params;
    const bookings = await Booking.find({ date: new Date(date) });
    const timeSlots = standardTimeSlots.map(slot => ({
      time: slot,
      available: !bookings.some(booking => booking.time === slot)
    }));
    res.json(timeSlots);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching time slots', error: err.message });
  }
});

// Delete a single booking by ID
bookingRouter.delete('/id/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
});

// Delete all bookings
bookingRouter.delete('/all', async (req, res) => {
  try {
    await Booking.deleteMany({});
    res.status(200).json({ message: 'All bookings deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting all bookings', error: err.message });
  }
});

// Get the count of bookings for a specific month
bookingRouter.get('/count/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const count = await Booking.countDocuments({ date: { $gte: startDate, $lte: endDate } });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking count', error: err.message });
  }
});

// Get the count of total users (based on email)
bookingRouter.get('/count-users', async (req, res) => {
  try {
    const userCount = await Booking.countDocuments();
    res.json({ count: userCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user count', error: err.message });
  }
});

// Get the count of total users for a specific month
bookingRouter.get('/count-users/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  try {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const userCount = await Booking.find({ date: { $gte: start, $lt: end } }).countDocuments();
    res.json({ count: userCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user count', error: err.message });
  }
});

// Get the count of unique users (based on email)
bookingRouter.get('/count-unique-users', async (req, res) => {
  try {
    const uniqueUsers = await Booking.distinct('email');
    const uniqueUserCount = uniqueUsers.length;
    res.json({ count: uniqueUserCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching unique user count', error: err.message });
  }
});

// Get the count of unique users for a specific month
bookingRouter.get('/count-unique-users/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  try {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);
    const uniqueUsers = await Booking.find({ date: { $gte: start, $lt: end } }).distinct('email');
    const uniqueUserCount = uniqueUsers.length;
    res.json({ count: uniqueUserCount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching unique user count', error: err.message });
  }
});



export default bookingRouter;
