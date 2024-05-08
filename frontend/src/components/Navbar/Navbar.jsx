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
                        <a href='/' className={window.location.pathname === '/about' ? 'active' : ''}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='/Services' className={window.location.pathname === '/about' ? 'active' : ''}>
                            Services
                        </a>
                    </li>
                    <li>
                        <a href='/portfolio' className={window.location.pathname === '/portfolio' ? 'active' : ''}>
                            Gallery
                        </a>
                    </li>
                    <li>
                        <a href='/contact' className={window.location.pathname === '/contact' ? 'active' : ''}>
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
