import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('/api/users/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up', error);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-foreground-100 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto my-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border-primary">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create Account
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please fill in the form to create an account
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <form className="my-5" onSubmit={handleSubmit}>
          <div className='grid lg:grid-cols-2 gap-5'>
            <div className="mb-2">
              <Label htmlFor="firstName" className=" text-sm text-neutral-800 dark:text-neutral-200">First Name</Label>
              <Input 
                id="firstName" 
                name="firstName"
                placeholder="Enter first name" 
                type="text" 
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="lastName" className=" text-sm text-neutral-800 dark:text-neutral-200">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName"
                placeholder="Enter last name" 
                type="text" 
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-1 w-full">
            <Label htmlFor="email" className=" text-sm text-neutral-800 dark:text-neutral-200 w-full">Email Address</Label>
            <Input 
              id="email" 
              name="email"
              placeholder="enter email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <div className='grid lg:grid-cols-2 gap-5'>
            <div className="mb-1">
              <Label htmlFor="password" className=" text-sm text-neutral-800 dark:text-neutral-200">Password</Label>
              <Input 
                id="password" 
                name="password"
                placeholder="••••••••" 
                type="password" 
                value={formData.password}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div className="mb-1">
              <Label htmlFor="confirmPassword" className=" text-sm text-neutral-800 dark:text-neutral-200">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword"
                placeholder="••••••••" 
                type="password" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Register &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
