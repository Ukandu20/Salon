import React from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { Button } from '../ui/button';  // Ensure this points to your custom Button component
import classes from './Card.module.css';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CardComponent() {  // Renamed to avoid conflict with HTML Card element
  return (
    <div className={classes.container}>
      {/* Center content using Flexbox */}
      <div className={classes.centerContent}>
        {/* Responsive grid layout for cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {/* Card for Braids/Twists */}
          <Card maxW='sm' style={{ backgroundColor: 'azure' }}>
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
              </Stack>
            </CardBody>
          </Card>

          {/* Card for Locs Retwists */}
          <Card maxW='sm' style={{ backgroundColor: 'azure' }}>
            <CardBody>
              <Stack mt='6' spacing='3' align='center'>
                <Heading size='md'>Locs Retwists</Heading>
                <Image
                  boxSize='250px'
                  objectFit="cover"
                  src='/locs-retwist.jpg'
                  alt='Locs Retwist hairstyle image'
                  borderRadius='lg'
                />
                <Text>
                  This hairstyle is perfect for those who love a chic design with a
                  sprinkle of vintage design.
                </Text>
              </Stack>
            </CardBody>
          </Card>

          {/* Card for Haircuts(Male) */}
          <Card maxW='sm' style={{ backgroundColor: 'azure' }}>
            <CardBody>
              <Stack mt='6' spacing='3' align="center">
                <Heading size='md'>Haircuts(Male)</Heading>
                <Image
                  boxSize='250px'
                  objectFit='cover'
                  src='/mens.jpg'
                  alt='Haircuts(Male) hairstyle image'
                  borderRadius='lg'
                />
                <Text>
                  This hairstyle is perfect for those who love a chic design with a
                  sprinkle of vintage design.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Table with price list */}
        <div className={classes.Tables}>
          <Table>
            <TableCaption>Price List</TableCaption>
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
        </div>
      </div>
    </div>
  );
}
