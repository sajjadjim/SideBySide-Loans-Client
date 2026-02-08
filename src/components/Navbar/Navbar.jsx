import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, LogOut, UserCircle } from 'lucide-react';
import { Link, NavLink } from "react-router";
import { getAuth } from "firebase/auth";

import app from "../../firebase/firebase.config";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo/Logo";
import { useTheme } from '../../components/ThemeContext';

const auth = getAuth(app);

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  
  // ========== STATE MANAGEMENT ==========
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ========== SCROLL DETECTION ==========
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ========== LOGOUT HANDLER ==========
  const handleLogout = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? isDark 
            ? 'bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800' 
            : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200'
          : isDark
            ? 'bg-slate-900'
            : 'bg-white'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
         {/* ========== LOGO SECTION ========== */}
          <div className="flex items-center gap-3"
          >
            {/* Logo Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Logo Text */}
            <NavLink to='/'>
              <div>
                <h1 className={`text-xl font-bold tracking-tight
                  ${isDark ? 'text-white' : 'text-slate-900'}`}
                >
                  SideBySide Loan
                </h1>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Give your dreams a boost with SideBySide Loan
                </p>
              </div>
            </NavLink>
          </div>


          {/* ========== DESKTOP NAVIGATION (CENTER) ========== */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `font-semibold transition-colors text-white bg-blue-600  px-3 py-1   rounded-3xl shadow-md  duration-300 ${
                  isActive 
                    ? isDark ? 'text-blue-400' : 'text-green-600 bg-linear-to-r from-yellow-600 to-orange-700  transition-all'
                    : isDark 
                      ? 'text-slate-300 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/all-loans"
              className={({ isActive }) => 
                `font-semibold transition-colors text-white bg-blue-600  px-3 py-1   rounded-3xl shadow-md  duration-300 ${
                  isActive 
                    ? isDark ? 'text-blue-400' : 'text-blue-600 bg-linear-to-r from-yellow-600 to-orange-700  transition-all'
                    : isDark 
                      ? 'text-slate-300 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              All Loans
            </NavLink>

            {/* Show Dashboard only when logged in */}
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) => 
                  `font-semibold transition-colors text-white bg-blue-600  px-3 py-1   rounded-3xl shadow-md  duration-300${
                    isActive 
                      ? isDark ? 'text-blue-400' : 'text-blue-600 bg-linear-to-r from-yellow-600 to-orange-700  transition-all'
                      : isDark 
                        ? 'text-slate-300 hover:text-white' 
                        : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Show these only when NOT logged in */}
            {!user && (
              <>
                <NavLink
                  to="/about"
                  className={({ isActive }) => 
                    `font-semibold transition-colors text-white bg-blue-600  px-3 py-1   rounded-3xl shadow-md  duration-300${
                      isActive 
                        ? isDark ? 'text-blue-400' : 'text-blue-600 bg-linear-to-r from-yellow-600 to-orange-700  transition-all'
                        : isDark 
                          ? 'text-slate-300 hover:text-white' 
                          : 'text-slate-600 hover:text-slate-900'
                    }`
                  }
                >
                  About Us
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) => 
                    `font-semibold transition-colors text-white bg-blue-600  px-3 py-1   rounded-3xl shadow-md  duration-300${
                      isActive 
                        ? isDark ? 'text-blue-400' : 'text-blue-600 bg-linear-to-r from-yellow-600 to-orange-700  transition-all'
                        : isDark 
                          ? 'text-slate-300 hover:text-white' 
                          : 'text-slate-600 hover:text-slate-900'
                    }`
                  }
                >
                  Contact
                </NavLink>
              </>
            )}
          </div>

          {/* ========== RIGHT SIDE ACTIONS ========== */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={` flex items-center justify-center w-10 h-10 rounded-lg transition-all
                ${isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* ========== WHEN USER IS NOT LOGGED IN ========== */}
            {!user ? (
              <>
                {/* Login Button - Desktop */}
                <NavLink
                  to="/login"
                  className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all border-2
                    ${isDark 
                      ? 'border-slate-700 text-slate-300 hover:bg-slate-800' 
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <UserCircle size={18} />
                  <span>Login</span>
                </NavLink>

                {/* Register Button - Desktop */}
                <NavLink
                  to="/register"
                  className="hidden lg:flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-all"
                >
                  <span>Register</span>
                </NavLink>
              </>
            ) : (
              <>
                {/* User Avatar - Desktop */}
                <NavLink
                  to="/myprofile"
                  className="hidden lg:flex items-center gap-2"
                >
                  <div className="relative group">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      referrerPolicy="no-referrer"
                      alt={user.displayName || "User"}
                      className={`w-10 h-10 rounded-full object-cover border-2 transition-all cursor-pointer
                        ${isDark 
                          ? 'border-slate-700 group-hover:border-blue-400' 
                          : 'border-slate-300 group-hover:border-blue-600'
                        }`}
                    />
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {user.displayName || "User"}
                  </span>
                </NavLink>

                {/* Logout Button - Desktop */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className={`hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all border-2
                    ${isDark 
                      ? 'border-red-800 text-red-400 hover:bg-red-900/30' 
                      : 'border-red-200 text-red-600 hover:bg-red-50'
                    }`}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all
                ${isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* ========== MOBILE MENU ========== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden overflow-hidden border-t
              ${isDark 
                ? 'bg-slate-900 border-slate-800' 
                : 'bg-white border-slate-200'
              }`}
          >
            <div className="px-4 py-6 space-y-4">
              
              {/* Mobile Nav Items */}
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `block py-3 px-4 rounded-lg font-medium transition-colors ${
                    isActive
                      ? isDark 
                        ? 'bg-blue-900/30 text-blue-400' 
                        : 'bg-blue-50 text-blue-600'
                      : isDark 
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/all-loans"
                className={({ isActive }) => 
                  `block py-3 px-4 rounded-lg font-medium transition-colors ${
                    isActive
                      ? isDark 
                        ? 'bg-blue-900/30 text-blue-400' 
                        : 'bg-blue-50 text-blue-600'
                      : isDark 
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Loans
              </NavLink>

              {user && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => 
                    `block py-3 px-4 rounded-lg font-medium transition-colors ${
                      isActive
                        ? isDark 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-blue-50 text-blue-600'
                        : isDark 
                          ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}

              {!user && (
                <>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => 
                      `block py-3 px-4 rounded-lg font-medium transition-colors ${
                        isActive
                          ? isDark 
                            ? 'bg-blue-900/30 text-blue-400' 
                            : 'bg-blue-50 text-blue-600'
                          : isDark 
                            ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About Us
                  </NavLink>

                  <NavLink
                    to="/contact"
                    className={({ isActive }) => 
                      `block py-3 px-4 rounded-lg font-medium transition-colors ${
                        isActive
                          ? isDark 
                            ? 'bg-blue-900/30 text-blue-400' 
                            : 'bg-blue-50 text-blue-600'
                          : isDark 
                            ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                </>
              )}

              {/* Mobile Theme Toggle */}
              {/* <button
                onClick={toggleTheme}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-lg font-medium transition-colors
                  ${isDark 
                    ? 'text-slate-300 hover:bg-slate-800' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <span>Theme</span>
                <div className="flex items-center gap-2">
                  {isDark ? (
                    <>
                      <Sun size={20} className="text-yellow-400" />
                      <span className="text-sm">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={20} />
                      <span className="text-sm">Dark Mode</span>
                    </>
                  )}
                </div>
              </button> */}

              {/* Mobile Action Buttons */}
              <div className={`pt-4 space-y-3 border-t
                ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
              >
                {!user ? (
                  <>
                    <NavLink
                      to="/login"
                      className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all border-2
                        ${isDark 
                          ? 'border-slate-700 text-slate-300 hover:bg-slate-800' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <UserCircle size={20} />
                      <span>Login</span>
                    </NavLink>

                    <NavLink
                      to="/register"
                      className="w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Register</span>
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/myprofile"
                      className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg font-semibold transition-all border-2
                        ${isDark 
                          ? 'border-slate-700 text-slate-300 hover:bg-slate-800' 
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        referrerPolicy="no-referrer"
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full object-cover border-2 border-slate-300"
                      />
                      <span>My Profile</span>
                    </NavLink>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all border-2
                        ${isDark 
                          ? 'border-red-800 text-red-400 hover:bg-red-900/30' 
                          : 'border-red-200 text-red-600 hover:bg-red-50'
                        }`}
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;