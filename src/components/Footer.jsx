import React from 'react';
import { Facebook , Instagram, Linkedin} from 'lucide-react';



const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-500 to-purple-500 flex lg:flex-row flex-col justify-between items-center lg:px-20 px-10 py-4">
      <div className="flex flex-row items-center justify-center gap-2 text-white pb-4 lg:p-0">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
           <Facebook />
        </a>
        <a href="https://www.instagram.com/deepmatrixai/" target="_blank" rel="noopener noreferrer">
          <Instagram />
        </a>
        <a href="https://x.com/deepmatrixai" target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </a>
      </div>
      <span className="text-white text-center text-sm">© 2024 by AI Developer All rights reserved!</span>
    </footer>
  );
};

export default Footer;