import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ServicesTable } from '../../components/ui/ServiceTable';
import { useToast } from '@chakra-ui/react';

const ServicesComponent = () => {
  const [formData, setFormData] = useState({
    service: '',
    subservice: '',
    price: ''
  });

  const [services, setServices] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services'); // Ensure the correct base URL
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error.message);
      console.error('Error details:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/services', formData); // Ensure the correct base URL
      fetchServices();
      resetFormData();
      toast({
        title: 'New Service added',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: 'Error adding service',
        position: 'bottom-right',
        description: `Error adding service: ${error.response ? error.response.data.message : 'Server not reachable'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const resetFormData = () => {
    setFormData({
      service: '',
      subservice: '',
      price: ''
    });
  };

  const handleEditService = (service) => {
    // Implement the edit functionality
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${serviceId}`); // Ensure the correct base URL
      fetchServices();
      toast({
        title: 'Service deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Error deleting service',
        position: 'bottom-right',
        description: `Error deleting service: ${error.response ? error.response.data.message : 'Server not reachable'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <h2>Manage Services</h2>
      <Card className="mb-4 bg-transparent">
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
          <CardDescription>Enter the details of the new service below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleServiceSubmit}>
            <div>
              <div>
                <Input type="text" name="service" id="service" required placeholder="Service Name" value={formData.service} onChange={handleInputChange} />
              </div>
              <div>
                <Input type="text" name="subservice" id="subservice" required placeholder="Subservice Name" value={formData.subservice} onChange={handleInputChange} />
              </div>
              <div>
                <Input type="number" name="price" id="price" required placeholder="Enter Price" value={formData.price} onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <Button type="submit">Add Service</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <ServicesTable
            data={services}
            columns={[
              { header: 'Service', accessor: 'service' },
              {
                header: 'Subservices', accessor: 'subservice', Cell: ({ value }) => (
                  <ul>
                    {value.map(sub => (
                      <li key={sub.subservice}>{sub.subservice} - ${sub.price}</li>
                    ))}
                  </ul>
                )
              },
              {
                header: 'Actions',
                Cell: ({ row }) => (
                  <div>
                    <Button onClick={() => handleEditService(row.original)}>Edit</Button>
                    <Button onClick={() => handleDeleteService(row.original._id)}>Delete</Button>
                  </div>
                )
              }
            ]}
            itemsPerPage={10}
            totalPages={Math.ceil(services.length / 10)}
            currentPage={1}
            onPageChange={() => { }} // Implement pagination
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesComponent;
