import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    lastName: { 
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 255
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength:3, 
        maxLength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

export const User = mongoose.model('Users', userSchema);
