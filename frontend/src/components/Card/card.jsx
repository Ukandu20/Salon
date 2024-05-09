import React from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, SimpleGrid } from '@chakra-ui/react'
import { Button } from '../ui/button';  // Ensure this points to your custom Button component
import classes from './Card.module.css';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
  } from "@/components/ui/table"

  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"




export default function CardComponent() {  // Renamed to avoid conflict with HTML Card element
  return (
    <div className={classes.container}>
        <SimpleGrid spacing={10} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
        <Card maxW='sm' style={{ backgroundColor: 'azure' }} >
            <CardBody>
                <Stack mt='6' spacing='3' align='center'>
                    <Heading size='md'>Braids/Twists</Heading>

                    <Image
                        boxSize='250px'                        
                        objectFit="cover"
                        src='/braids.jpg'
                        alt='Braids/Twists hairstyle image'
                        borderRadius='lg'
                    />
                    <Text>
                    This hairstyle is perfect for those who love a chic design with a
                    sprinkle of vintage design.
                    </Text>
                    <Table>
                        <TableCaption>Price List.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Length</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">12" & 14"</TableCell>
                                <TableCell className="text-right">$150</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">16" & 18"</TableCell>
                                <TableCell className="text-right">$200</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Stack>       
            </CardBody>            
            <CardFooter>
                <Button variant="default" asChild>
                    <a href="/appointments">Book appointment</a>
                </Button>             
            </CardFooter>
        </Card>

        <Card maxW='sm' style={{ backgroundColor: 'azure' }}>
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
                    <Table>
                        <TableCaption>Price List.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Service</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Retwist</TableCell>
                                <TableCell className="text-right">$60</TableCell>
                            </TableRow>                            
                            <TableRow>
                                <TableCell className="font-medium">Full Service + Coloring</TableCell>
                                <TableCell className="text-right">$200</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </Stack>       
            </CardBody>            
            <CardFooter>
                <Button variant="default" asChild>
                    <a href="/appointments">Book Appointment</a>
                </Button>             
            </CardFooter>
        </Card>

        <Card maxW='sm' style={{ backgroundColor: 'azure' }}>
            <CardBody>
                <Stack mt='6' spacing='3' align="center">
                    <Heading size='md'>Haircuts(Male)</Heading>

                    <Image
                        boxSize='250px'
                        objectFit='cover'
                        src='/mens.jpg'
                        alt='Braids/Twists hairstyle image'
                        borderRadius='lg'
                    />
                    <Table>
                        <TableCaption>Price List.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Style</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        <TableRow>
                                <TableCell colSpan="2">
                                    <Accordion type="single" collapsible style={{ boxShadow: 'none' }}>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Braids/Twists</AccordionTrigger>
                                            <AccordionContent>
                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="font-medium">Stitch Braids</TableCell>
                                                            <TableCell className="text-right">$100</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="font-medium">Cornrows</TableCell>
                                                            <TableCell className="text-right">$100</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="2">
                                    <Accordion type="single" collapsible style={{ border: 'none' }}>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className={classes.AccordionTrigger}>Haircuts</AccordionTrigger>
                                            <AccordionContent>
                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="font-medium">Children</TableCell>
                                                            <TableCell className="text-right">$20</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="font-medium">Lineup</TableCell>
                                                            <TableCell className="text-right">$20</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="font-medium">Fade</TableCell>
                                                            <TableCell className="text-right">$40</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell className="font-medium">Fade + Beard</TableCell>
                                                            <TableCell className="text-right">$60</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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
