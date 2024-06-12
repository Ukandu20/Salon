import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@chakra-ui/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import UserTable from '../../components/ui/userTable'; // Ensure this path is correct

const Users = () => {
  // State to store form data for creating/editing users
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });

  // State to store list of users
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission to add a new user
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      await axios.post('/api/users/register', formData);
      fetchUsers();
      resetFormData();
      toast({
        title: 'New User added',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: 'Error adding user',
        description: `Error adding user: ${error.response ? error.response.data.message : 'Server not reachable'}`,
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
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false
    });
  };

  // Handle user edit
  const handleEditUser = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      confirmPassword: '',
      isAdmin: user.isAdmin
    });
    onOpen();
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      fetchUsers();
      toast({
        title: 'User deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error deleting user',
        description: `Error deleting user: ${error.response ? error.response.data.message : 'Server not reachable'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>

      <Card className="bg-transparent my-20">
        <CardHeader>
          <div className='grid lg:grid-cols-2'>
            <CardTitle>All Users</CardTitle>
            <Button onClick={onOpen} color="primary">Add User</Button>
            <Modal 
              isOpen={isOpen} 
              onOpenChange={onOpenChange}
              placement="center"
              className='max-w-lg w-full mx-auto my-10 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border-black flex items-center justify-center lg:grid-cols-2'
              backdrop="blur"
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  },
                  exit: {
                    y: -20,
                    opacity: 0,
                    transition: {
                      duration: 0.2,
                      ease: "easeIn",
                    },
                  },
                }
              }}
            >
              <ModalContent className='flex flex-col w-full '>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex w-full flex-col gap-5 font-bold text-xl text-primary dark:text-neutral">Add a new User</ModalHeader>
                    <form onSubmit={(e) => { handleUserSubmit(e); onClose(); }} className="w-full">
                      <ModalBody className="w-full">
                        <div className='grid lg:grid-cols-2 gap-2 w-full'>
                          <Input
                            autoFocus
                            type="text" 
                            name="firstName" 
                            id="firstName" 
                            required 
                            placeholder="First Name" 
                            value={formData.firstName} 
                            onChange={handleInputChange}
                            variant="bordered"
                            className="w-full"
                          />
                          <Input
                            type="text" 
                            name="lastName" 
                            id="lastName" 
                            required 
                            placeholder="Last Name" 
                            value={formData.lastName} 
                            onChange={handleInputChange}
                            variant="bordered"
                            className="w-full"
                          />
                        </div>
                        <Input
                          type="email" 
                          name="email" 
                          id="email" 
                          required 
                          placeholder="Email" 
                          value={formData.email} 
                          onChange={handleInputChange}
                          variant="bordered"
                          className="w-full mt-2"
                        />
                        <Input
                          type="password" 
                          name="password" 
                          id="password" 
                          required 
                          placeholder="Password" 
                          value={formData.password} 
                          onChange={handleInputChange}
                          variant="bordered"
                          className="w-full mt-2"
                        />
                        <Input
                          type="password" 
                          name="confirmPassword" 
                          id="confirmPassword" 
                          required 
                          placeholder="Confirm Password" 
                          value={formData.confirmPassword} 
                          onChange={handleInputChange}
                          variant="bordered"
                          className="w-full mt-2"
                        />
                        <div className="flex items-center mt-1 justify-start gap-10">
                          <ModalFooter className="mt-auto gap-5">
                            <Button className='text-white' onClick={onClose}>
                              Close
                            </Button>
                            <Button color="primary" type="submit">
                              Add User
                            </Button>
                          </ModalFooter>
                          <label htmlFor="isAdmin" className=" text-black">Admin</label>
                          <input 
                            type="checkbox" 
                            name="isAdmin" 
                            id="isAdmin" 
                            checked={formData.isAdmin}
                            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                            color='red'
                          />
                          
                          
                        </div>
                        
                      </ModalBody>
                      
                    </form>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <CardDescription>View and manage all users</CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable
            data={users}
            itemsPerPage={10}
            totalPages={Math.ceil(users.length / 10)}
            currentPage={1}
            onPageChange={() => { }} // Implement pagination
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
