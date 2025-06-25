import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import emblem from '../assets/images/emblem.png'; 
import { Headset } from 'lucide-react';

const Header = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleMenu = () => {
    setIsChecked(!isChecked);
  };

  const closeMenu = () => {
    setIsChecked(false);
  };

  return (
    <div className="w-full absolute top-0 left-0 z-50">
      <div className="container mx-auto px-6 lg:px-10">
        <header className="lg:py-10 py-6">
          <nav className="flex items-center justify-between flex-wrap relative">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 mr-6">
              <Link to="/">
                <img src={emblem} alt="logo" className="lg:h-13 h-10" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="block lg:hidden " onClick={toggleMenu}>
              <button className="relative flex flex-col justify-center items-center w-8 h-8 focus:outline-none group  cursor-pointer">
                <span
                  className={`block absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out transform ${
                    isChecked ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out ${
                    isChecked ? 'opacity-0' : 'opacity-100'
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-white transition-all duration-300 ease-in-out transform ${
                    isChecked ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className='hidden lg:flex lg:flex-row gap-20 bg-white/15 backdrop-blur-sm border border-white/10 px-12 py-4 rounded-full'>
              <ul className="flex space-x-8 items-center">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) =>
                      `relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${
                        isActive 
                          ? 'after:w-full text-[var(--primary-color)]' 
                          : 'hover:after:w-full hover:text-[var(--primary-color)] text-white'
                      }`
                    } 
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) =>
                      `relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${
                        isActive 
                          ? 'after:w-full text-[var(--primary-color)]' 
                          : 'hover:after:w-full hover:text-[var(--primary-color)] text-white'
                      }`
                    } 
                    onClick={closeMenu}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/services" 
                    className={({ isActive }) =>
                      `relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${
                        isActive 
                          ? 'after:w-full text-[var(--primary-color)]' 
                          : 'hover:after:w-full hover:text-[var(--primary-color)] text-white'
                      }`
                    } 
                    onClick={closeMenu}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/blog" 
                    className={({ isActive }) =>
                      `relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${
                        isActive 
                          ? 'after:w-full text-[var(--primary-color)]' 
                          : 'hover:after:w-full hover:text-[var(--primary-color)] text-white'
                      }`
                    } 
                    onClick={closeMenu}
                  >
                    Blog
                  </NavLink>
                </li>
              </ul>
            </div>  

            <button className='bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-full hidden lg:block'>
              <Link to="/contact-us">
                Contact Us
                <Headset className='inline-block ms-2 w-5 h-5' />
              </Link>
            </button>

            {/* Mobile Menu */}
            {isChecked && (
              <ul className="absolute top-16 left-0 w-full  bg-white/5 backdrop-blur-lg border border-white/10 rounded-sm lg:hidden z-50 flex flex-col items-start px-6 py-4 space-y-4">
                <li><Link to="/" className="text-white" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/about" className="text-white" onClick={closeMenu}>About Us</Link></li>
                <li><Link to="/services" className="text-white" onClick={closeMenu}>Services</Link></li>
                <li><Link to="/blog" className="text-white" onClick={closeMenu}>Blog</Link></li>
                <button className="bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-full">
                  <Link to="/contact-us" onClick={closeMenu}>Contact Us</Link>
                </button>
              </ul>
            )}
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Header;