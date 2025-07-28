import React, { useEffect, useState } from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { Link } from "react-router-dom";
import axios from "axios";
import { Github, Menu, X } from "lucide-react";
import Login from "./Login";
import GitHubAuthButton from "./GithubAuthButton";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detect scroll direction and background blur
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false); // scroll down
        setMobileMenuOpen(false);
      } else {
        setShowNavbar(true); // scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const closeMobileMenu = () => setMobileMenuOpen(false);


  return (
    <>
      <nav
        className={`fixed  top-0 left-0 w-full z-50 transition-all duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled ? " backdrop-blur-2xl shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl flex justify-center items-center font-bold hover:text-blue-600 uppercase transition duration-300 ease-in-out transform"
            >
              <Github className="w-6 h-6 mr-2" />
              Github Remover
            </Link>


            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-sm px-3 py-2 rounded-md font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm px-3 py-2 rounded-md font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm px-3 py-2 rounded-md font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Contact
              </Link>

              <GitHubAuthButton />

              <ThemeToggle />
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden flex items-center">
              <ThemeToggle className="mr-4" />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md focus:outline-none"
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 backdrop-blur-xl ease-in-out ${mobileMenuOpen
            ? "max-h-96 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
            }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 shadow-md">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Contact
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/repos"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 text-blue-600 dark:text-blue-400 text-base font-medium hover:underline"
                >
                  Repos
                </Link>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    logout();
                  }}
                  className="block w-full text-left px-3 py-2  bg-red-600 text-base font-medium hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  closeMobileMenu();
                  login();
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-800"
              >
                Login with GitHub
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Page spacer */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
