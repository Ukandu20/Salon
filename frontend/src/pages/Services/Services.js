import React from 'react';
import classes from './Services.module.css'; // Your CSS module for services page styles

export default function Services() {
  return (
    <div>
      <section className={classes.hero}>
        <div className={classes.hero_content}>
          <h1>Our Services</h1>
          <p>Discover our range of hair and beauty services.</p>
        </div>
      </section>
      <section className={classes.services_section}>
        <div className={classes.services_grid}>
          <div className={classes.service_item}>
            <h2>Haircuts</h2>
            <p>From classic styles to the latest trends.</p>
          </div>
          <div className={classes.service_item}>
            <h2>Hair Coloring</h2>
            <p>Transform your look with vibrant colors.</p>
          </div>
          <div className={classes.service_item}>
            <h2>Extensions</h2>
            <p>Add length and volume to your hair.</p>
          </div>
          <div className={classes.service_item}>
            <h2>Styling</h2>
            <p>Special occasions or everyday glamour.</p>
          </div>
          <div className={classes.service_item}>
            <h2>Facials</h2>
            <p>Revitalize your skin with our treatments.</p>
          </div>
          <div className={classes.service_item}>
            <h2>Manicure & Pedicure</h2>
            <p>Pamper your hands and feet.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
