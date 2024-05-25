import React from 'react';
import classes from './Footer.module.css'; // Your CSS module for footer styles

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.links}>
          <a href="/about" className={classes.footerLink}>About Us</a>
          <a href="/sitemap" className={classes.footerLink}>Sitemap</a>
          <a href="/faq" className={classes.footerLink}>FAQ</a>
        </div>
        <div className={classes.contactSection}>
          <h5>Contact Us</h5>
          <a href='/contact' className={classes.footerLink}>123-456-7890</a>
          <a href="/contact" className={classes.footerLink}>hairhaven@gmail.com</a>
        </div>
        <div className={classes.legal}>
          <a href="/privacy" className={classes.footerLink}>Privacy Policy</a>
          <a href="/terms" className={classes.footerLink}>Terms of Service</a>
        </div>
      </div>
      <div className={classes.copyRight}>
        <p>&copy; 2024 Hair Haven. All rights reserved.</p>
      </div>
    </footer>
  );
}
