import React from 'react';
import Pin from '@/components/Pin/Pin';
import classes from './Layout.module.css';

const images = [
    // Add your image URLs here
    "/braids.jpg",
    "/extensions.jpg",
    "/locs-retwist.jpg",
    "/mens.jpg",
    "/braids.jpg",
    "/extensions.jpg",
    "/locs-retwist.jpg",
    "/mens.jpg",
    "/braids.jpg",
    "/extensions.jpg",
    "/locs-retwist.jpg",
    "/mens.jpg",
    "/braids.jpg",
    "/extensions.jpg",
    "/locs-retwist.jpg",
    "/mens.jpg",
    "/braids.jpg",
    "/extensions.jpg",
    "/locs-retwist.jpg",
    "/mens.jpg",
    // Add more URLs as needed
];

const sizes = ['small', 'medium', 'large'];

function Layout() {
    return (
        <div className={classes.pinContainer}>
            {images.map((image, index) => (
                <Pin key={index} size={sizes[index % sizes.length]} image={image} />
                            ))}
        </div>
    );
}

export default Layout;
