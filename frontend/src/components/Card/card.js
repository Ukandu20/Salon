import React from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, SimpleGrid } from '@chakra-ui/react'
import { Button } from '../ui/button';  // Ensure this points to your custom Button component
import classes from './Card.module.css';

export default function CardComponent() {  // Renamed to avoid conflict with HTML Card element
  return (
    <div className={classes.container}>
        <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
        <Card maxW='sm'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Braids/Twists</Heading>

                    <Image                        
                        objectFit="cover"
                        src='/braids.jpg'
                        alt='Braids/Twists hairstyle image'
                        borderRadius='lg'
                    />
                    <Text>
                    This hairstyle is perfect for those who love a chic design with a
                    sprinkle of vintage design.
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        $200
                    </Text>
                </Stack>       
            </CardBody>            
            <CardFooter>
                <Button variant="default" asChild>
                    <a href="/appointments">Book appointment</a>
                </Button>             
            </CardFooter>
        </Card>

        <Card maxW='sm'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Locs Retwists</Heading>

                    <Image
                        src='/locs-retwist.jpg'
                        alt='Braids/Twists hairstyle image'
                        borderRadius='lg'
                    />
                    <Text>
                    This hairstyle is perfect for those who love a chic design with a
                    sprinkle of vintage design.
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        $200
                    </Text>
                </Stack>       
            </CardBody>            
            <CardFooter>
                <Button variant="default" asChild>
                    <a href="/appointments">Extensions</a>
                </Button>             
            </CardFooter>
        </Card>

        <Card maxW='sm'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Haircuts(Male)</Heading>

                    <Image
                        boxSize='250px'
                        objectFit='cover'
                        src='/mens.jpg'
                        alt='Braids/Twists hairstyle image'
                        borderRadius='lg'
                    />
                    <Text>
                    This hairstyle is perfect for those who love a chic design with a
                    sprinkle of vintage design.
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        $200
                    </Text>
                </Stack>       
            </CardBody>            
            <CardFooter>
                <Button variant="default" asChild>
                    <a href="/appointments">Book appointment</a>
                </Button>             
            </CardFooter>
        </Card>

        <Card maxW='sm'>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Extensions</Heading>

                    <Image
                        src='/extensions.jpg'
                        objectFit='cover'
                        boxSize='250px'
                        alt='Braids/Twists hairstyle image'
                        borderRadius='lg'
                    />
                    <Text>
                    This hairstyle is perfect for those who love a chic design with a
                    sprinkle of vintage design.
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        $200
                    </Text>
                </Stack>       
            </CardBody>            
            <CardFooter>
                <Button variant="default" asChild>
                    <a href="/appointments">Book appointment</a>
                </Button>             
            </CardFooter>
        </Card>

        
        </SimpleGrid>
    </div>
  )
}
