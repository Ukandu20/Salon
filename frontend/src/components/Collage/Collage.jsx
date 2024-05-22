import React from 'react';
import classes from './Collage.module.css'; // Import the CSS module for styling

const images = [
  {
    id: 1,
    src: '/braids.jpg',
    alt: 'Image 1'
  },
  {
    id: 2,
    src: '/mens.jpg',
    alt: 'Image 2'
  },
  {
    id: 3,
    src: '/extensions.jpg',
    alt: 'Image 3'
  },
  {
    id: 4,
    src: '/locs-retwist.jpg',
    alt: 'Image 4'
  }
];

const CollageComponent = () => {
    return (
      <div className={classes.collage}>
        {images.map((image) => (
          <div key={image.id} className={`${classes.collage_item} ${classes[`item${image.id}`]}`}>
            <img src={image.src} alt={image.alt} className={classes.collage_image} />
          </div>
        ))}
      </div>
    );
  };

export default CollageComponent;
