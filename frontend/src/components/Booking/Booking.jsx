import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Booking.module.css'; // Your CSS module for Booking page styles
import { Calendar } from '../ui/calendar';
import { Button } from '../ui/button';
import { useToast } from '@chakra-ui/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import '../../axiosConfig';

export default function Booking() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        service: '',
        price: 0, // New field for the price
        date: '',
        time: ''
    });

    const [services, setServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [fullyBookedDates, setFullyBookedDates] = useState([]);
    const toast = useToast();

    useEffect(() => {
        fetchFullyBookedDates();
        fetchServices();
    }, []);

    const fetchFullyBookedDates = async () => {
        try {
            const response = await axios.get(`/api/bookings/fully-booked-dates`);
            setFullyBookedDates(response.data);
        } catch (error) {
            console.error('Failed to fetch fully booked dates:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/services');
            setServices(response.data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setDate = (newDate) => {
        const isoDate = newDate.toISOString().split('T')[0];
        setSelectedDate(newDate);
        setFormData({ ...formData, date: isoDate });
        fetchTimeSlots(newDate);
    };

    const fetchTimeSlots = async (date) => {
        try {
            const formattedDate = date.toISOString().split('T')[0];
            const response = await axios.get(`/api/bookings/date/${formattedDate}/time-slots`);
            const availableSlots = response.data.filter(slot => slot.available);
            setTimeSlots(availableSlots);
        } catch (error) {
            console.error('Failed to fetch time slots:', error);
            setTimeSlots([]);
        }
    };

    const handleServiceSelection = (service) => {
        const selectedService = services.find(s => s.subservice === service);
        setFormData({ ...formData, service: selectedService.subservice, price: selectedService.price });
    };

    const handleTimeSelection = (time) => {
        setFormData({ ...formData, time });
        setSelectedTime(time);
    };

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
            fetchTimeSlots(selectedDate);
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

    const resetFormData = () => {
        setFormData({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            service: '',
            price: 0,
            date: '',
            time: ''
        });
        setSelectedDate(null);
        setSelectedTime('');
        setTimeSlots([]);
    };

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
                        <Select onValueChange={handleServiceSelection} value={formData.service}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {services.map(service => (
                                        <SelectItem key={service._id} value={service.subservice}>
                                            {service.subservice}:  ${service.price}
                                        </SelectItem>

                                        
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <div className={classes.dateGrp}>
                    <div>
                        <Calendar
                            key={selectedDate ? selectedDate.toISOString() : 'default'}
                            type="date"
                            name="date"
                            id="date"
                            required
                            value={formData.date}
                            onChange={(date) => setDate(new Date(date))}
                            mode="single"
                            selected={selectedDate}
                            onSelect={setDate}
                            disabled={isDateDisabled}
                            className="rounded-lg border shadow"
                        />
                    </div>
                    
                    <div className={classes.formGrp}>
                        <Select onValueChange={handleTimeSelection} value={formData.time}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {timeSlots.length > 0 ? (
                                        timeSlots.map(slot => (
                                            <SelectItem key={slot.time} value={slot.time}>{slot.time}</SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem disabled>
                                            There are no available slots for today
                                        </SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className={classes.submitBtn}>
                        <Button type="submit">Book Appointment</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
