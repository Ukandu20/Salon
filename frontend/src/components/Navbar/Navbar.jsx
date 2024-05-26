import React from 'react';
import classes from './Navbar.module.css';
import { IconButton } from '@chakra-ui/react';
import { Button } from '../../components/ui/button';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';

export default function Navbar() {
  return (
    <div className={classes.nav}>
      <nav>
        {/* Desktop Navigation links */}
        <ul className={classes.nav_links}>
          <li>
            <a href='/' className={window.location.pathname === '/' ? classes.active : ''}>
              Home
            </a>
          </li>
          <li>
            <a href='/Services' className={window.location.pathname === '/Services' ? classes.active : ''}>
              Services
            </a>
          </li>
          <li>
            <a href='/Gallery' className={window.location.pathname === '/Gallery' ? classes.active : ''}>
              Gallery
            </a>
          </li>
          <li>
            <a href='/contact' className={window.location.pathname === '/contact' ? classes.active : ''}>
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

        {/* Hamburger Menu for smaller screens */}
        <div className={classes.hamburgerMenu}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
            />
            <MenuList>
              <MenuItem as='a' href='/' icon={<AddIcon />} className={classes.menuItem}>
                Home
              </MenuItem>
              <MenuItem as='a' href='/Services' icon={<ExternalLinkIcon />} className={classes.menuItem}>
                Services
              </MenuItem>
              <MenuItem as='a' href='/Gallery' icon={<RepeatIcon />} className={classes.menuItem}>
                Gallery
              </MenuItem>
              <MenuItem as='a' href='/contact' icon={<EditIcon />} className={classes.menuItem}>
                Contact Us
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </nav>
    </div>
  );
}
