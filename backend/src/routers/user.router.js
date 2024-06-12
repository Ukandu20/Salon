import { Router } from 'express';
import { User } from '../assets/data/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRouter = Router();

// Get all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// Register a new user (admin only)
userRouter.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, isAdmin } = req.body; // Added isAdmin to req.body
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, firstName, lastName, isAdmin });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'User already exists.' });
    } else {
      console.error('Error creating user:', err.message);
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
  }
});

// Update a user (admin only)
userRouter.put('/:id', async (req, res) => {
  const { firstName, lastName, isAdmin } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, isAdmin }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err.message);
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

// Delete a user (admin only)
userRouter.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// Login route
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default userRouter;
