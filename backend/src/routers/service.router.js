import { Router } from 'express';
import {Service} from '../assets/data/Service.js'; // Corrected import statement

const serviceRouter = Router();

// Get all services
serviceRouter.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
});

// Create a new services
serviceRouter.post('/', async (req, res) => {
  const { service, subservice, price } = req.body;
  if (!service || !subservice || !price) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newService = new Service({ service, subservice, price });
    await newService.save();
    res.status(201).json({ message: 'Service created successfully.', service: newService });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Service already exists.' });
    } else {
      console.error('Error creating service:', err.message);
      res.status(500).json({ message: 'Error creating service', error: err.message });
    }
  }
});

// Update a service by ID
serviceRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { service, subservice, price } = req.body;

    const updatedService = await Service.findByIdAndUpdate(id, { service, subservice, price }, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated successfully', service: updatedService });
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ message: 'Error updating service', error: err.message });
  }
});

// Delete a service by ID
serviceRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ message: 'Error deleting service', error: err.message });
  }
});

// Get all services with subservices
serviceRouter.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
});

export default serviceRouter;
