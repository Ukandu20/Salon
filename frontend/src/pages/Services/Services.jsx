import React from 'react';
import classes from './Services.module.css'; // Your CSS module for services page styles
import CardComponent from '@/components/Card/card';
import Disclaimer from '@/components/Disclaimer/Disclaimer';

export default function Services() {
  return (
    <div>
      <Disclaimer/>
      <section className={classes.hero}>
        
        <div className={classes.hero_content}>
          <h1>Our Services</h1>
          <p>Discover our range of hair and beauty services.</p>
        </div>
      </section>
      
      <CardComponent/>
      
    </div>
  );
}
