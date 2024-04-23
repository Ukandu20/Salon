import React from 'react';
import classes from './Appointments.module.css'; // Your CSS module for appointments page styles

export default function Appointments() {
  return (
    <div  className={classes.container}>
        <section className={classes.heading}>
            <h1>Appointments</h1>
            <p>Book an appointment with us today!</p>
        </section>
        
        <form action="/appointments" method="post"  className={classes.form} >
            <div className={classes.formGrp}>
                <label htmlFor="name">First Name:</label>
                <input type="text" name="name" id="name" required placeholder='First Name' />                
            </div>

            <div className={classes.formGrp}>
                <label htmlFor="name">Last Name:</label>
                <input type="text" name="name" id="name" required placeholder='Last Name' />                
            </div>

            <div className={classes.formGrp}>
                <label htmlFor="email address" id="email">Email:</label>
                <input type="email" name="email" id="email" required placeholder='Enter Email Address' />
            </div>
            
            <div className={classes.formGrp}>
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" id="date" required />
            </div>
            
            <div className={classes.formGrp}>
                <label htmlFor="time">Time:</label>
                <select name="time" id="time" required>
                        <option value="morning">9:00 AM</option>
                        <option value="afternoon">2:00 PM</option>
                        <option value="evening">6:00 PM</option>
                </select><br/><br/>
            </div>
            
            <div  className={classes.submitBtn}>
                <button type="submit">Book Appointment</button>
            </div>
            </form>
        </div>
    )
}
