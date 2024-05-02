import React, { useState } from 'react';
import axios from 'axios';
import classes from './Appointments.module.css'; // Your CSS module for appointments page styles

export default function Appointments() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        service: '',
        date: '',
        time: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/api/bookings', formData);
            console.log('Backend Response:', response.data); // Log backend response
            setFormData({ // Clear form data after successful submission
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                service: '',
                date: '',
                time: ''
            });
            setSuccessMessage('Booking successfully added!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error:', error);
            const errorResponse = error.response ? error.response.data.message : 'Server not reachable';
            setErrorMessage(`Error adding booking: ${errorResponse}`);
            setSuccessMessage('');
        }
    };

    return (
        <div className={classes.container}>
            <section className={classes.heading}>
                <h1>Appointments</h1>
                <p>Book an appointment with us today!</p>
            </section>
            
            <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.formGrp}>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" id="firstName" required placeholder='First Name' value={formData.firstName} onChange={handleInputChange} />
                </div>

                <div className={classes.formGrp}>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" id="lastName" required placeholder='Last Name' value={formData.lastName} onChange={handleInputChange} />
                </div>

                <div className={classes.formGrp}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="tel" name="phoneNumber" id="phoneNumber" required placeholder='Enter Phone Number' value={formData.phoneNumber} onChange={handleInputChange}/>
                </div>

                <div className={classes.formGrp}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" required placeholder='Enter Email Address' value={formData.email} onChange={handleInputChange}/>
                </div>

                <div className={classes.formGrp}>
                    <label htmlFor="service">Service:</label>
                    <select name="service" id="service" required value={formData.service} onChange={handleInputChange}>
                        <option value="">Select Service</option>
                        <option value="Haircut">Haircut</option>
                        <option value="Coloring">Hair Coloring</option>
                        <option value="Extension">Extensions</option>
                    </select>
                </div>
                
                <div className={classes.formGrp}>
                    <label htmlFor="date">Date:</label>
                    <input type="date" name="date" id="date" required value={formData.date} onChange={handleInputChange}/>
                </div>
                
                <div className={classes.formGrp}>
                    <label htmlFor="time">Time:</label>
                    <select name="time" id="time" required value={formData.time} onChange={handleInputChange}>
                        <option value="">Select Time</option>
                        <option value="morning">9:00 AM</option>
                        <option value="afternoon">2:00 PM</option>
                        <option value="evening">6:00 PM</option>
                    </select>
                </div>
                
                <div className={classes.submitBtn}>
                    <button type="submit">Book Appointment</button>
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
            </form>
        </div>
    );
}
