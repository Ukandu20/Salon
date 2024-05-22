import React, { useState, useEffect } from 'react';
import classes from './Gallery.module.css';
import Disclaimer from '@/components/Disclaimer/Disclaimer';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShareNodes, faCommentDots } from '@fortawesome/free-solid-svg-icons';





export default function Gallery() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(true);
        }, 5000); // Show alert after 5000 milliseconds (5 seconds)
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Disclaimer/>
            
            {showAlert && (
                <div className={classes.alertContainer}>
                    <Alert>
                        <RocketIcon className="h-4 w-4" />
                        <AlertTitle>Hey There!</AlertTitle>
                        <AlertDescription>
                            Like what you see? Book an appointment with us today!
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <div>
            <Card maxW='sm' color='black' >
            <CardBody>
                <Stack mt='6' spacing='3' align='center'>
                    <Heading size='md'>Locs Retwists</Heading>
                    <Image
                        boxSize='250px'                        
                        objectFit="cover"
                        src='/locs-retwist.jpg'
                        alt='Braids/Twists hairstyle image'
                        borderRadius='lg'
                    />
                    <Text>
                    This hairstyle is perfect for those who love a chic design with a
                    sprinkle of vintage design.
                    </Text>
                </Stack>       
            </CardBody>            
            <CardFooter>
            <Button flex='1' variant='ghost' >
            <FontAwesomeIcon icon={faThumbsUp} />
                </Button>
                <Button flex='1' variant='ghost' >
                <FontAwesomeIcon icon={faCommentDots} />
                </Button>
                <Button flex='1' variant='ghost' >
                <FontAwesomeIcon icon={faShareNodes} />
            </Button>             
            </CardFooter>
        </Card> 
            </div>
        </div>
    );
}
