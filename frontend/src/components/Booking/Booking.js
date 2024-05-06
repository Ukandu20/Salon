import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Booking.module.css'; // Your CSS module for Booking page styles
import { Calendar } from '../../components/ui/calendar'
import { Button } from '../ui/button';



export default function Booking() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        service: '',
        date: '', // Ensure this is initially an empty string or a valid date string.
        time: ''
    });

    const [selectedDate, setSelectedDate] = useState(null); // Additional state to handle the calendar date immediately
    const [timeSlots, setTimeSlots] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setDate = (newDate) => {
        setSelectedDate(newDate); // Set selected date immediately for the calendar
        setFormData({ ...formData, date: newDate.toISOString().split('T')[0] });
        fetchTimeSlots(newDate);
    };

    useEffect(() => {
        // This effect ensures that the selectedDate state is updated when formData.date changes externally
        if (formData.date) {
            setSelectedDate(new Date(formData.date));
        }
    }, [formData.date]);

    const fetchTimeSlots = async (date) => {
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:5000/api/bookings/date/${formattedDate}/time-slots`);
            console.log("Time Slots Received:", response.data);
            setTimeSlots(response.data);
        } catch (error) {
            console.error('Failed to fetch time slots:', error);
            setTimeSlots([]);
        }
    };

    const handleTimeSelection = (time) => {
        setFormData({ ...formData, time });
    };

    const handleServiceSelection = (service) => {
        setFormData({ ...formData, service });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/bookings', formData);
            console.log('Backend Response:', response.data);
            resetFormData();
            setSuccessMessage('Booking successfully added!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(`Error adding booking: ${error.response ? error.response.data.message : 'Server not reachable'}`);
            setSuccessMessage('');
        }
    };

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
        setSelectedDate(null); // Clear selected date
        setTimeSlots([]);
    };




    return (
        <div className={classes.container}>
            <section className={classes.heading}>
                <h1>Appointments</h1>
                <p>Book an appointment with us today!</p>
            </section>
            
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.infoGrp}>
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

                    <div className={classes.formGrp}>
                        <label>Service:</label>
                        <div>
                            {['Haircut', 'Coloring', 'Extensions'].map(service => (
                                <Button className={classes.button}
                                    key={service}
                                    type="button"
                                    onClick={() => handleServiceSelection(service)}
                                    style={{
                                        backgroundColor: formData.service === service ? '#007A76' : '#CBB74B', // Active service has a different color
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
                
                <div className={classes.dateGrp}>
                <div className={classes.calendar}>
                    <Calendar
                        type="date"
                        name="date"
                        id="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        mode="single"
                        selected={selectedDate}
                        onSelect={setDate}
                        className="rounded-md border shadow"
                    />
                    </div>
                    
                    <div className={classes.time}>                        
                        <div>
                            {timeSlots.map(slot => (
                                <Button
                                    key={slot.time}
                                    type="button"
                                    onClick={() => slot.available && handleTimeSelection(slot.time)}
                                    disabled={!slot.available}
                                    style={{
                                        backgroundColor: slot.available ? '#007A76' : 'rose',
                                        color: 'white',
                                        margin: '5px',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: slot.available ? 'pointer' : 'not-allowed'
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

                    {/* Display success message if set */}
                    {successMessage && (
                        <div className={classes.successMessage}>
                            {successMessage}
                        </div>
                    )}

                    {/* Display error message if set */}
                    {errorMessage && (
                        <div className={classes.errorMessage}>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </form>

            
        </div>
    );
}
