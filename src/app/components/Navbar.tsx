"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/context/AdminContext";

const MotionLink = motion(Link);

const Navbar = () => {
  const { adminLoggedIn } = useAdmin();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFieldsMenuOpen, setMobileFieldsMenuOpen] = useState(false);

  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  // Desktop "Fields" dropdown: close when clicking outside
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

  // Function to close desktop dropdown when a link is clicked
  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
  };

  // Handlers for mobile Fields submenu
  const openMobileFieldsMenu = () => {
    setMobileFieldsMenuOpen(true);
  };

  const closeMobileFieldsMenu = () => {
    setMobileFieldsMenuOpen(false);
  };

  return (
    <nav className="bg-white h-16 shadow-md relative">
      {/* Logo: centered on mobile, left-aligned on desktop */}
      <Link
        href="/"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-4 md:translate-x-0 cursor-pointer"
      >
        <div className="w-30 h-30 relative overflow-hidden ml-0">
          <Image
            src="/images/logo4.png"
            alt="STL Mens Soccer Logo"
            fill
            className="object-cover object-center"
          />
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex  mx-auto h-full justify-end items-center">
        {/* max-w-7xl */}
        <div className="flex items-center space-x-8 pr-4 mr-3">
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
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full bg-white shadow-lg z-20"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{ width: "60%" }} // covers only a small portion of the screen
          >
            <div className="p-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 text-xl underline mb-4 focus:outline-none"
              >
                Close
              </button>
              <ul className="space-y-4">
                <li>
                  <MotionLink
                    href="/rules"
                    className="text-gray-800 hover:text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover="hover"
                    variants={linkVariants}
                  >
                    Rules
                  </MotionLink>
                </li>
                <li>
                  <button
                    onClick={openMobileFieldsMenu}
                    className="text-gray-800 hover:text-gray-600 focus:outline-none"
                  >
                    Fields
                  </button>
                </li>
                <li>
                  <MotionLink
                    href={adminLoggedIn ? "/admin/schedules" : "/schedules"}
                    className="text-gray-800 hover:text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover="hover"
                    variants={linkVariants}
                  >
                    Schedules
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href={adminLoggedIn ? "/admin/seasons" : "/seasons"}
                    className="text-gray-800 hover:text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover="hover"
                    variants={linkVariants}
                  >
                    Seasons
                  </MotionLink>
                </li>
                <li>
                  <MotionLink
                    href="/contact"
                    className="text-gray-800 hover:text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover="hover"
                    variants={linkVariants}
                  >
                    Contact
                  </MotionLink>
                </li>
              </ul>
            </div>

            {/* Mobile Fields Submenu */}
            <AnimatePresence>
              {mobileFieldsMenuOpen && (
                <motion.div
                  className="fixed top-0 right-0 h-full bg-white shadow-lg z-30"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  style={{ width: "80%" }} // expands further to show the fields links
                >
                  <div className="p-4">
                    <button
                      onClick={closeMobileFieldsMenu}
                      className="text-gray-800 text-xl underline mb-4 focus:outline-none"
                    >
                      Back
                    </button>
                    <ul className="space-y-4">
                      <li>
                        <MotionLink
                          href="/fields/chesterfield"
                          className="text-gray-800 hover:text-gray-600"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            closeMobileFieldsMenu();
                          }}
                          whileHover="hover"
                          variants={linkVariants}
                        >
                          Chesterfield Field
                        </MotionLink>
                      </li>
                      <li>
                        <MotionLink
                          href="/fields/ofallon"
                          className="text-gray-800 hover:text-gray-600"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            closeMobileFieldsMenu();
                          }}
                          whileHover="hover"
                          variants={linkVariants}
                        >
                          O'Fallon Field
                        </MotionLink>
                      </li>
                      <li>
                        <MotionLink
                          href="/fields/loufusz"
                          className="text-gray-800 hover:text-gray-600"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            closeMobileFieldsMenu();
                          }}
                          whileHover="hover"
                          variants={linkVariants}
                        >
                          Lou Fusz Field
                        </MotionLink>
                      </li>
                      <li>
                        <MotionLink
                          href="/fields/forestpark"
                          className="text-gray-800 hover:text-gray-600"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            closeMobileFieldsMenu();
                          }}
                          whileHover="hover"
                          variants={linkVariants}
                        >
                          Forest Park Field
                        </MotionLink>
                      </li>
                      <li>
                        <MotionLink
                          href="/fields/fenton"
                          className="text-gray-800 hover:text-gray-600"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            closeMobileFieldsMenu();
                          }}
                          whileHover="hover"
                          variants={linkVariants}
                        >
                          Fenton Field
                        </MotionLink>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
