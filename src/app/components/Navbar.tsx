"use client"
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import {
  UserIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className={pathname === '/Blog' ? 'bg-white border-b border-gray-300 p-4' : 'bg-[#eee8d5] border-b border-gray-300 p-4'}>
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4">
        {/* Logo or Placeholder */}
        <div className="flex items-center">
          <Link href="/Account" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
            </svg>
            <span className="text-sm">MYAccount</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:items-center`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 font-bold mt-4 md:mt-0">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-black hover:underline hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/Shop"
                className="block py-2 px-3 text-black hover:underline hover:text-blue-500"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/Blog"
                className="block py-2 px-3 text-black hover:underline hover:text-blue-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/Contact"
                className="block py-2 px-3 text-black hover:underline hover:text-blue-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar Icons */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex items-center space-x-6 mt-4 md:mt-0`}>
          <Link href="/CartSideBar" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <UserIcon className="h-6 w-6" />
            <span className="text-sm">CartSideBar</span>
          </Link>
          <Link href="/SingleProduct" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span className="text-sm">SingleProduct</span>
          </Link>
          <Link href="/CheckOut" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <HeartIcon className="h-6 w-6" />
            <span className="text-sm">CheckOut</span>
          </Link>
          <Link href="/Cart" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-sm">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;