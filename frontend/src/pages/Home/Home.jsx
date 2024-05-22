import React from 'react';
import classes from './Home.module.css'; // Your CSS module for home page styles
import { Button } from '../../components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import CollageComponent from '@/components/Collage/Collage'; // Import the CollageComponent
import { LampContainer } from '../../components/ui/lamp'; // Adjust the import path according to your project structure

export default function Home() {
  return (
    <div>
      <LampContainer>
        <div className={classes.hero_content}>
          <div className={classes.text_content}>
            <h1>Welcome to Hair Haven</h1>
            <p>Your premier destination for hair styling and beauty services.</p>
            <div className={classes.buttons}>
              <Button>
                <a href="/Services">View Services</a>
              </Button>
              <Button>
                <a href="/Gallery">View Gallery</a>
              </Button>
            </div>
          </div>
          <div className={classes.image_content}>
          </div>
        </div>
      </LampContainer>
    </div>
  );
}
