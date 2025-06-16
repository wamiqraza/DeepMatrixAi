import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import deepMatrix from '../assets/images/deepmatrix.png'; // Adjust the import path as necessary
import emblem from '../assets/images/emblem.png'; // Adjust the import path as necessary
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
      <div className="container mx-auto px-10">
        <header className="py-10">
          <nav className="flex items-center justify-between flex-wrap relative">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 mr-6">
              <Link to="/">
                <img src={emblem} alt="logo" className="h-13 w-auto" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="block lg:hidden" onClick={toggleMenu}>
              <button className="flex flex-col items-end justify-center h-8 w-8 space-y-1.5 focus:outline-none">
                <span className="block h-0.5 w-6 bg-black"></span>
                <span className="block h-0.5 w-6 bg-black"></span>
                <span className="block h-0.5 w-6 bg-black"></span>
              </button>
            </div>

            {/* Desktop Menu */}
            <div className='flex flex-row gap-20 bg-white/15 backdrop-blur-sm border border-white/10 px-12 py-4 rounded-full'>
              <ul className="hidden lg:flex space-x-8 items-center">
                <li><NavLink to="/" className={({ isActive }) =>`relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${isActive ? 'after:w-full text-[var(--primary-color)]': 'hover:after:w-full hover:[color:var(--primary-color)] text-white'}`} onClick={closeMenu}>Home</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) =>`relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${isActive ? 'after:w-full text-[var(--primary-color)]': 'hover:after:w-full hover:[color:var(--primary-color)] text-white'}`} onClick={closeMenu}>About</NavLink></li>
                <li><NavLink to="/service" className={({ isActive }) =>`relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${isActive ? 'after:w-full text-[var(--primary-color)]': 'hover:after:w-full hover:[color:var(--primary-color)] text-white'}`} onClick={closeMenu}>Services</NavLink></li>
                <li><NavLink to="/blog" className={({ isActive }) =>`relative inline-block after:content-[''] after:block after:w-0 after:h-[2px] after:bg-[var(--primary-color)] after:transition-all after:duration-300 ${isActive ? 'after:w-full text-[var(--primary-color)]': 'hover:after:w-full hover:[color:var(--primary-color)] text-white'}`} onClick={closeMenu}>Blog</NavLink></li>
              </ul>
            </div>  

            <button className='bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-full hover:from-[#A55EEA] hover:to-[#648DFD] transition duration-300 ease-in-out'>
              <Link to="/contact-us">
                Contact Us
                <Headset className='inline-block ms-2 w-5 h-5' />
              </Link>
            </button>

            {/* Mobile Menu */}
            {isChecked && (
              <ul className="absolute top-16 left-0 w-full bg-white shadow-md lg:hidden z-50 flex flex-col items-start px-6 py-4 space-y-4">
                <li><Link to="/" className="text-gray-700" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/about-us" className="text-gray-700" onClick={closeMenu}>About Us</Link></li>
                <li><Link to="/services" className="text-gray-700" onClick={closeMenu}>Services</Link></li>
                <li><Link to="/blog" className="text-gray-700" onClick={closeMenu}>Blog</Link></li>
                <li>
                  <Link
                    to="/contact-us"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={closeMenu}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </header>

      </div>
    </div>
  );
};

export default Header;
