import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Booking.module.css'; // Your CSS module for Booking page styles
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { useToast } from '@chakra-ui/react';
import '../../axiosConfig';

export default function Booking() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        service: '',
        date: '',
        time: ''
    });

    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [fullyBookedDates, setFullyBookedDates] = useState([]);
    const toast = useToast();

    useEffect(() => {
        fetchFullyBookedDates();
    }, []);

    const fetchFullyBookedDates = async () => {
        try {
            const response = await axios.get(`/api/bookings/fully-booked-dates`);
            setFullyBookedDates(response.data);
        } catch (error) {
            console.error('Failed to fetch fully booked dates:', error);
        }
    };

    // Handles input changes for form fields
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Sets the date and fetches available time slots for that date
    const setDate = (newDate) => {
        const isoDate = newDate.toISOString().split('T')[0];
        setSelectedDate(newDate);
        setFormData({ ...formData, date: isoDate });
        fetchTimeSlots(newDate);
    };

    // Fetches time slots for a selected date
    const fetchTimeSlots = async (date) => {
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await axios.get(`/api/bookings/date/${formattedDate}/time-slots`);
            const availableSlots = response.data.filter(slot => slot.available); // Filter out booked slots
            setTimeSlots(availableSlots);
        } catch (error) {
            console.error('Failed to fetch time slots:', error);
            setTimeSlots([]);
        }
    };

    // Handles selection of a time slot
    const handleTimeSelection = (time) => {
        setFormData({ ...formData, time });
        setSelectedTime(time);
    };

    // Handles service selection
    const handleServiceSelection = (service) => {
        setFormData({ ...formData, service });
    };

    // Submits the booking form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/bookings', formData);
            resetFormData();
            toast({
                title: 'Booking Successful',
                position: 'bottom-right',
                description: 'Your booking has been successfully added!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            fetchTimeSlots(selectedDate); // Refresh time slots after successful booking
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: 'Error',
                position: 'bottom-right',
                description: `Error adding booking: ${error.response ? error.response.data.message : 'Server not reachable'}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    // Resets form data after submission or on error
    const resetFormData = () => {
        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            service: '',
            date: '',
            time: ''
        });
        setSelectedDate(null);
        setSelectedTime('');
        setTimeSlots([]);
    };

    // Disable past dates and fully booked dates
    const isDateDisabled = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today || fullyBookedDates.includes(date.toISOString().split('T')[0]);
    };

    return (
        <div className={classes.container}>
            <section className={classes.heading}>
                <h1>Appointments</h1>
                <p>Book an appointment with us today!</p>
            </section>
            
            <form onSubmit={handleSubmit} className={classes.form}>
                {/* Form groups for input */}
                <div className={classes.infoGrp}>
                    {/* Name, phone, and email inputs */}
                    <div className={classes.formGrp}>
                        <input type="text" name="firstName" id="firstName" required placeholder='First Name' value={formData.firstName} onChange={handleInputChange} />
                    </div>

                    <div className={classes.formGrp}>
                        <input type="text" name="lastName" id="lastName" required placeholder='Last Name' value={formData.lastName} onChange={handleInputChange} />
                    </div>

                    <div className={classes.formGrp}>
                        <input type="tel" name="phoneNumber" id="phoneNumber" required placeholder='Enter Phone Number' value={formData.phoneNumber} onChange={handleInputChange}/>
                    </div>

                    <div className={classes.formGrp}>
                        <input type="email" name="email" id="email" required placeholder='Enter Email Address' value={formData.email} onChange={handleInputChange}/>
                    </div>

                    {/* Service selection */}
                    <div className={classes.formGrp}>
                        <label>Service:</label>
                        <div>
                            {['Twists/Braids', 'Locs Retwist', 'Extensions', 'Haircuts(Male)'].map(service => (
                                <Button className={classes.button}
                                    key={service}
                                    type="button"
                                    onClick={() => handleServiceSelection(service)}
                                    style={{
                                        backgroundColor: formData.service === service ?  '#CBB74B' : '#007A76', // Active service has a different color
                                        color: 'white',
                                        margin: '5px',
                                        padding: '10px 20px',
                                        border: 'none',
                                        justifyContent: 'center',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {service}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Date and time selection */}
                <div className={classes.dateGrp}>
                    <div className={classes.calendar}>
                    <Calendar
                        key={selectedDate ? selectedDate.toISOString() : 'default'}
                        type="date"
                        name="date"
                        id="date"
                        required
                        value={formData.date}
                        onChange={(date) => setDate(new Date(date))} // Ensure date is set correctly
                        mode="single"
                        selected={selectedDate}
                        onSelect={setDate}
                        disabled={isDateDisabled}
                        className="rounded-md border shadow"
                    />
                    </div>
                    
                    <div className={classes.time}>                        
                        <div>
                            {timeSlots.map(slot => (
                                <Button
                                    key={slot.time}
                                    type="button"
                                    onClick={() => handleTimeSelection(slot.time)}
                                    style={{
                                        backgroundColor: slot.time === selectedTime ? '#CBB74B' : '#007A76',
                                        color: 'white',
                                        margin: '5px',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {slot.time}
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    <div className={classes.submitBtn}>
                        <Button type="submit">Book Appointment</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
