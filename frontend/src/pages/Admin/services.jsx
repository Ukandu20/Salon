import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ServicesTable } from '../../components/ui/ServiceTable';
import { useToast } from '@chakra-ui/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

const ServicesComponent = () => {
  // State for form data
  const [formData, setFormData] = useState({
    service: '',
    subservice: '',
    price: ''
  });

  // State for list of services
  const [services, setServices] = useState([]);
  const toast = useToast();

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Function to fetch services from the API
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Failed to fetch services:', error.message);
      console.error('Error details:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/services', formData);
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

  // Reset form data
  const resetFormData = () => {
    setFormData({
      service: '',
      subservice: '',
      price: ''
    });
  };

  // Handle service edit (implementation pending)
  const handleEditService = (service) => {
    // Implement the edit functionality
  };

  // Handle service deletion
  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${serviceId}`);
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

  // Modal control
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <h2>Manage Services</h2>

      <Card className="bg-transparent my-20">
        <CardHeader>
          <div className='grid lg:grid-cols-2'>
            <CardTitle>All Services</CardTitle>
            <Button onClick={onOpen} color="primary">Add Service</Button>
            <Modal 
              isOpen={isOpen} 
              onOpenChange={onOpenChange}
              placement="center"
              className='bg-card justify-center w-96 px-8 rounded-md'
              classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
                borderRadius: "5",
              }}
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
              <ModalContent className='grid'>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-5">Add a new Service</ModalHeader>
                    <form onSubmit={(e) => { handleServiceSubmit(e); onClose(); }}>
                      <ModalBody>
                        <Input
                          autoFocus
                          type="text" 
                          name="service" 
                          id="service" 
                          required placeholder="Service Name" 
                          value={formData.service} 
                          onChange={handleInputChange}
                          variant="bordered"
                        />
                        <Input
                          type="text" 
                          name="subservice" 
                          id="subservice" 
                          required placeholder="Subservice Name" 
                          value={formData.subservice} 
                          onChange={handleInputChange}
                          variant="bordered"
                        />
                        <Input
                          type="number" 
                          name="price" 
                          id="price" 
                          required placeholder="Enter Price" 
                          value={formData.price} 
                          onChange={handleInputChange}
                          variant="bordered"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onClick={onClose}>
                          Close
                        </Button>
                        <Button color="primary" type="submit">
                          Add Service
                        </Button>
                      </ModalFooter>
                    </form>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <CardDescription>View and manage all services</CardDescription>
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
