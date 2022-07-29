import React, { useState } from 'react';
import { Button } from './Button';
import { Link , useLocation } from 'react-router-dom';

import './Navbar.css';
import Dropdown from './Dropdown';
import {isAuthenticated} from '../Auth'

function Navbar() {
  const location = useLocation()
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
 
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          GateStone
          <i className='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        {isAuthenticated() || location.login?
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              User Management
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/consulting'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Existing Campaigns 
               {/* <i className='fas fa-caret-down' /> */}
            </Link>
            {/* {dropdown && <Dropdown />} */}
          </li>
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Analytics
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
             Admin Site
            </Link>
          </li> */}
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        : "" }
        <Button />
      </nav>
    </>
  );
}

export default Navbar;
