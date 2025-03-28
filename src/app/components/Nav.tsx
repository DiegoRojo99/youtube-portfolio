'use client';
import React, { useState } from 'react';

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-3 z-50 w-11/12 max-w-4xl md:w-auto">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-xl text-black font-bold">SM</h1> */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-full left-0 w-full bg-white shadow-lg rounded-lg md:static md:flex md:items-center md:space-x-6 md:bg-transparent md:shadow-none md:rounded-none`}
        >
          <li>
            <a href="#home" className="block px-4 py-2 text-gray-700 hover:text-gray-900">
              Home
            </a>
          </li>
          {/* <li>
            <a href="#about" className="block px-4 py-2 text-gray-700 hover:text-gray-900">
              About
            </a>
          </li> */}
          {/* <li>
            <a href="#services" className="block px-4 py-2 text-gray-700 hover:text-gray-900">
              Services
            </a>
          </li> */}
          {/* <li>
            <a href="#contact" className="block px-4 py-2 text-gray-700 hover:text-gray-900">
              Contact
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;