import React from 'react';
import classes from './Home.module.css'; // Your CSS module for home page styles
import { Button } from '../../components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons';



export default function Home() {
  return (
    <div>
      <section className={classes.hero}>
        <div className={classes.hero_content}>
          <h1>Welcome to Hair haven</h1>
          <p>Your premier destination for hair styling and beauty services.</p>
          <Button variant="ghost" className={classes.hero_button}>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Explore Services
          </Button>
        </div>
      </section>
      <section className={classes.about_section}>
        <div className={classes.about_content}>
          <h2>About Us</h2>
          <p>[Your salon's story and mission statement]</p>
          <a href="/about" className={classes.learn_more_button}>Learn More</a>
        </div>
      </section>
      <section className={classes.gallery_section}>
        <div className={classes.gallery_content}>
          <h2>Gallery</h2>
          <p>View our latest works and styles.</p>
          <a href="/portfolio" className={classes.view_gallery_button}>View Gallery</a>
        </div>
      </section>
      <section className={classes.testimonials_section}>
        <div className={classes.testimonials_content}>
          <h2>Client Testimonials</h2>
          <p>See what our clients have to say about their experiences.</p>
          <a href="/testimonials" className={classes.view_testimonials_button}>View Testimonials</a>
        </div>
      </section>
      <section className={classes.contact_section}>
        <div className={classes.contact_content}>
          <h2>Contact Us</h2>
          <p>Get in touch to book an appointment or inquire about our services.</p>
          <a href="/contact" className={classes.contact_button}>Contact Us</a>
        </div>
      </section>      
    </div>
  );
}
