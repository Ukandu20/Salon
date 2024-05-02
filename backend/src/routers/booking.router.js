import { Router } from 'express';
import { bookings } from '../assets/data/data.js';

const bookingRouter = Router();

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

// Get bookings by time
bookingRouter.get('/time/:time', (req, res) => {
    const { time } = req.params;
    const bookingsForTime = bookings.filter(booking => booking.time === time);

    if (bookingsForTime.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this time' });
    }

    res.json(bookingsForTime);
});

// Create a new booking
bookingRouter.post('/', (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, service, date, time } = req.body;

        if (!firstName || !lastName || !phoneNumber || !email || !service || !date || !time) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!date.match(dateRegex)) {
            return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
        }

        const timeRegex = /^(morning|afternoon|evening)$/;
        if (!time.match(timeRegex)) {
            return res.status(400).json({ message: 'Invalid time format. Use morning, afternoon, or evening.' });
        }

        // Check for potential duplicate bookings
        const isDuplicate = bookings.some(booking => 
            booking.date === date && booking.time === time && booking.service === service);
        if (isDuplicate) {
            return res.status(409).json({ message: 'A booking already exists with the given date, time, and service.' });
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
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});

export default bookingRouter;
