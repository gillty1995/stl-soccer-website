"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";

const MotionLink = motion(Link);

const Navbar = () => {
  const { adminLoggedIn } = useAdmin();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Function to close dropdown when a link is clicked
  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white h-16 shadow-md relative">
      {/* Logo positioned absolutely in the top-left corner */}
      <Link
        href="/"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
      >
        <div className="w-30 h-30 relative overflow-hidden ml-25">
          <Image
            src="/images/logo4.png"
            alt="STL Mens Soccer Logo"
            fill
            className="object-cover object-center"
          />
        </div>
      </Link>
      {/* Navigation Links aligned to the right */}
      <div className="max-w-7xl mx-auto h-full flex justify-end items-center">
        <div className="flex items-center space-x-8 pr-4">
          <MotionLink
            href="/rules"
            className="text-gray-800 hover:text-gray-600"
            whileHover="hover"
            variants={linkVariants}
          >
            Rules
          </MotionLink>
          <div className="relative">
            <motion.button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none cursor-pointer"
              whileHover="hover"
              variants={linkVariants}
            >
              Fields
            </motion.button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10"
              >
                <MotionLink
                  href="/fields/chesterfield"
                  onClick={handleDropdownLinkClick}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  Chesterfield Field
                </MotionLink>
                <MotionLink
                  href="/fields/ofallon"
                  onClick={handleDropdownLinkClick}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  O'Fallon Field
                </MotionLink>
                <MotionLink
                  href="/fields/loufusz"
                  onClick={handleDropdownLinkClick}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  Lou Fusz Field
                </MotionLink>
                <MotionLink
                  href="/fields/forestpark"
                  onClick={handleDropdownLinkClick}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  Forest Park Field
                </MotionLink>
                <MotionLink
                  href="/fields/fenton"
                  onClick={handleDropdownLinkClick}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  Fenton Field
                </MotionLink>
              </div>
            )}
          </div>
          <MotionLink
            href={adminLoggedIn ? "/admin/schedules" : "/schedules"}
            className="text-gray-800 hover:text-gray-600"
            whileHover="hover"
            variants={linkVariants}
          >
            Schedules
          </MotionLink>
          <MotionLink
            href={adminLoggedIn ? "/admin/seasons" : "/seasons"}
            className="text-gray-800 hover:text-gray-600"
            whileHover="hover"
            variants={linkVariants}
          >
            Seasons
          </MotionLink>
          <MotionLink
            href="/contact"
            className="text-gray-800 hover:text-gray-600"
            whileHover="hover"
            variants={linkVariants}
          >
            Contact
          </MotionLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
