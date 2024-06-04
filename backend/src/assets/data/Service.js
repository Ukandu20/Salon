import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  service: { type: String, required: true },
  subservice: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

serviceSchema.index({ service: 1 }, { unique: true }); // Ensure service field is unique

export const Service = mongoose.model('Service', serviceSchema);



