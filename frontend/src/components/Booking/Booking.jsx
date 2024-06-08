import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Booking.module.css'; // CSS module for Booking page styles
import { Calendar } from '../ui/calendar'; // Calendar component
import { Button } from '../ui/button'; // Button component
import { useToast } from '@chakra-ui/react'; // Toast component for notifications
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Select component from your UI library
import '../../axiosConfig'; // Configuration for axios

export default function Booking() {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    service: '',
    price: 0, // Field for the price
    date: '',
    time: ''
  });

  // State to store available services
  const [services, setServices] = useState([]);
  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(null);
  // State to store available time slots
  const [timeSlots, setTimeSlots] = useState([]);
  // State to store the selected time
  const [selectedTime, setSelectedTime] = useState('');
  // State to store fully booked dates
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  // Toast for notifications
  const toast = useToast();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchFullyBookedDates();
    fetchServices();
  }, []);

  // Fetch fully booked dates from the server
  const fetchFullyBookedDates = async () => {
    try {
      const response = await axios.get(`/api/bookings/fully-booked-dates`);
      setFullyBookedDates(response.data);
    } catch (error) {
      console.error('Failed to fetch fully booked dates:', error);
    }
  };

  // Fetch available services from the server
  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Set the selected date and fetch available time slots for that date
  const setDate = (newDate) => {
    const isoDate = newDate.toISOString().split('T')[0];
    setSelectedDate(newDate);
    setFormData({ ...formData, date: isoDate });
    fetchTimeSlots(newDate);
  };

  // Fetch available time slots for a given date
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

  // Handle service selection and set the price
  const handleServiceSelection = (service) => {
    const selectedService = services.find(s => s.subservice === service);
    setFormData({ ...formData, service: selectedService.subservice, price: selectedService.price });
  };

  // Handle time slot selection
  const handleTimeSelection = (time) => {
    setFormData({ ...formData, time });
    setSelectedTime(time);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', formData);
      resetFormData(); // Reset form data after successful booking
      toast({
        title: 'Booking Successful',
        position: 'bottom-right',
        description: 'Your booking has been successfully added!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchTimeSlots(selectedDate); // Refresh time slots
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

  // Reset form data
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

  // Disable dates that are in the past or fully booked
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
              <SelectContent >
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
          <div className={classes.submitBtn}>
          <Button type="submit">Schedule Appointment</Button>
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
              className="rounded-lg border shadow "
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
        </div>
        
      </form>
    </div>
  );
}
