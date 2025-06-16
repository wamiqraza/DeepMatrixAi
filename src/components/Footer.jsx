import React from 'react';
import { Facebook , Instagram, Linkedin} from 'lucide-react';



const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-500 to-purple-500 flex flex-row justify-between items-center px-20 py-4 mt-24">
      <div className="flex flex-row items-center justify-center gap-4 text-white">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
           <Facebook />
        </a>
        <a href="https://www.instagram.com/deepmatrixai/" target="_blank" rel="noopener noreferrer" className="icon">
          <Instagram />
        </a>
        <a href="https://x.com/deepmatrixai" target="_blank" rel="noopener noreferrer" className="icon">
          <Linkedin />
        </a>
      </div>
      <div className="text-white">© 2024 by AI Developer All rights reserved!</div>
    </footer>
  );
};

export default Footer;