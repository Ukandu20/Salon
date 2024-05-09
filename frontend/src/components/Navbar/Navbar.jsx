import React from 'react';
import classes from './Navbar.module.css';
import { Button } from '../ui/button';



export default function Navbar() {



    return (
        <div className={classes.nav}>
            <nav>                
                {/* Navigation links */}
                <ul className={classes.nav_links}>
                    <li>
                        <a href='/' className={window.location.pathname === '/' ? 'classes.active' : ''}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='/Services' className={window.location.pathname === '/Services' ? 'classes.active' : ''}>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href='/Gallery' className={window.location.pathname === '/Gallery' ? 'classes.active' : ''}>
                            Gallery
                        </a>
                    </li>
                    <li>
                        <a href='/contact' className={window.location.pathname === '/contact' ? 'classes.active' : ''}>
                            Contact Us
                        </a>
                    </li>                    
                </ul>
                <ul>
                    <li>              
                        <Button asChild>
                            <a href="/appointments">Book appointment</a>
                        </Button>
                    </li>
                </ul>                            
            </nav>
        </div>
    );
}
