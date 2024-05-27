import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'reserved', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
});

export const Booking = mongoose.model('Booking', bookingSchema);
