import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className='py-5 text-center shadow-lg border-t-2 border-gray-200 '>
      <div className='container mx-auto px-4'>

        <div className='mt-4 flex justify-center space-x-6'>
          <a 
            href='https://facebook.com' 
            className='hover:text-purple-600 transition duration-300 ease-in-out transform hover:scale-110' 
            aria-label='Facebook'
            target='_blank' 
            rel='noopener noreferrer'
          >
            <Github size={28} />
          </a>
          <a 
            href='https://facebook.com' 
            className='hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110' 
            aria-label='Facebook'
            target='_blank' 
            rel='noopener noreferrer'
          >
            <Facebook size={28} />
          </a>
          <a 
            href='https://twitter.com' 
            className='hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110' 
            aria-label='Twitter'
            target='_blank' 
            rel='noopener noreferrer'
          >
            <Twitter size={28} />
          </a>
          <a 
            href='https://linkedin.com' 
            className='hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-110' 
            aria-label='LinkedIn'
            target='_blank' 
            rel='noopener noreferrer'
          >
            <Linkedin size={28} />
          </a>
          <a 
            href='https://instagram.com' 
            className='hover:text-rose-600 transition duration-300 ease-in-out transform hover:scale-110' 
            aria-label='Instagram'
            target='_blank' 
            rel='noopener noreferrer'
          >
            <Instagram size={28} />
          </a>
        </div>
                <span className='text-lg '>
          ⓒ {new Date().getFullYear()} Your Company. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
