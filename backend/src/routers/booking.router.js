import { Router } from 'express';
import { bookings } from '../assets/data/data.js';

const bookingRouter = Router();

// Standard time slots for the salon
const standardTimeSlots = ['9:00 AM', '1:00 PM', '5:00 PM'];

// Get all bookings
bookingRouter.get('/', (req, res) => {
    res.json(bookings);
});

// Get bookings by date
bookingRouter.get('/date/:date', (req, res) => {
    const { date } = req.params;
    const bookingsForDate = bookings.filter(booking => booking.date === date);

    if (bookingsForDate.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this date' });
    }

    res.json(bookingsForDate);
});

// Create a new booking
bookingRouter.post('/', (req, res) => {
    const { firstName, lastName, phoneNumber, email, service, date, time } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !service || !date || !time) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const isDuplicate = bookings.some(booking => 
        booking.date === date && booking.time === time);
    if (isDuplicate) {
        return res.status(409).json({ message: 'A booking already exists with the given date, time' });
    }

    const newBooking = {
        id: Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        phoneNumber,
        email,
        service,
        date,
        time
    };

    bookings.push(newBooking);

    res.status(201).json({ message: 'Booking created successfully.', booking: newBooking });
});

// Get time slots for a specific date
bookingRouter.get('/date/:date/time-slots', (req, res) => {
    const { date } = req.params;
    const bookingsForDate = bookings.filter(booking => booking.date === date);

    const timeSlots = standardTimeSlots.map(slot => ({
        time: slot,
        available: !bookingsForDate.some(booking => booking.time === slot)
    }));

    res.json(timeSlots);
});

export default bookingRouter;
