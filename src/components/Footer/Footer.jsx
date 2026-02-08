import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  X, 
  Linkedin, 
  Instagram,
  ArrowRight,
  Heart
} from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from '../../components/ThemeContext';
import Logo from '../Logo/Logo';

const Footer = () => {
  const { isDark } = useTheme();

  const footerLinks = {
    quickLinks: [
      { label: 'Home', path: '/' },
      { label: 'All Loans', path: '/all-loans' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' }
    ],
    loanTypes: [
      { label: 'Personal Loan', path: '/loans/personal' },
      { label: 'Business Loan', path: '/loans/business' },
      { label: 'Education Loan', path: '/loans/education' },
      { label: 'Emergency Loan', path: '/loans/emergency' }
    ],
    support: [
      { label: 'Why Choose Us', path: '/why-choose-us' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Terms & Conditions', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' }
    ],
  
  };

  const contactInfo = [
    { icon: Phone, text: '+880 1234-567890', href: 'tel:+8801234567890' },
    { icon: Mail, text: 'support@grameenloan.com', href: 'mailto:support@grameenloan.com' },
    { icon: MapPin, text: 'Dhaka, Bangladesh' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaXTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
  ];

  return (
    <footer className={`relative mt-20 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      
      {/* Top Border Accent */}
      <div className=" absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700"></div>

{/* main footer content  */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* ========== COLUMN 1: LOGO & DESCRIPTION ========== */}
          <div className="lg:col-span-2">
            {/* ========== LOGO SECTION ========== */}
          <div className="flex items-center gap-3"
          >
            {/* Logo Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Logo Text */}
            <div>
              <h1 className={`text-xl font-bold tracking-tight
                ${isDark ? 'text-white' : 'text-slate-900'}`}
              >
                SideBySide Loan
              </h1>
              <p className={`text-xs  ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Empowering Communities
              </p>
            </div>
          </div>

            {/* Description */}
            <p className={`text-sm leading-relaxed mt-2 mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              SideBySide Loan empowers communities through accessible microfinance solutions. 
              We believe in financial inclusion and helping individuals achieve their dreams 
              through transparent, fast, and secure loan services.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 text-sm transition-colors group
                      ${isDark 
                        ? 'text-slate-400 hover:text-blue-400' 
                        : 'text-slate-600 hover:text-blue-600'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all
                      ${isDark 
                        ? 'bg-slate-800 group-hover:bg-blue-900/30' 
                        : 'bg-slate-200 group-hover:bg-blue-100'
                      }`}
                    >
                      <IconComponent size={16} />
                    </div>
                    <span>{item.text}</span>
                  </a>
                ) : (
                  <div
                    key={index}
                    className={`flex items-center gap-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                      ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
                    >
                      <IconComponent size={16} />
                    </div>
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                      ${isDark 
                        ? 'bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white' 
                        : 'bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white'
                      }`}
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ========== COLUMN 2: QUICK LINKS ========== */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 text-sm transition-colors group
                      ${isDark 
                        ? 'text-slate-400 hover:text-blue-400' 
                        : 'text-slate-600 hover:text-blue-600'
                      }`}
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========== COLUMN 3: LOAN TYPES ========== */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Loan Types
            </h3>
            <ul className="space-y-3">
              {footerLinks.loanTypes.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 text-sm transition-colors group
                      ${isDark 
                        ? 'text-slate-400 hover:text-blue-400' 
                        : 'text-slate-600 hover:text-blue-600'
                      }`}
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

{/* support and company col-4  */}
          <div>
            <h3 className={`text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Support
            </h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 text-sm transition-colors group
                      ${isDark 
                        ? 'text-slate-400 hover:text-blue-400' 
                        : 'text-slate-600 hover:text-blue-600'
                      }`}
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

          
          </div>
        </div>

        <div className={`  rounded-xl p-8 mb-12 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Stay Updated
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Subscribe to our newsletter for the latest updates on loan products and financial tips.
              </p>
            </div>
            <div className="flex gap-3 flex-col lg:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isDark 
                    ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        <div className={`pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className={`text-sm text-center md:text-left ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              © {new Date().getFullYear()} SideBySide Loan. All rights reserved. 
             
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy"
                className={`transition-colors ${isDark 
                  ? 'text-slate-400 hover:text-blue-400' 
                  : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className={`transition-colors ${isDark 
                  ? 'text-slate-400 hover:text-blue-400' 
                  : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className={`transition-colors ${isDark 
                  ? 'text-slate-400 hover:text-blue-400' 
                  : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

{/* backto top  */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all
          ${isDark 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-900 hover:bg-blue-800 text-white'
          }`}
        aria-label="Back to top"
      >
        <ArrowRight size={20} className="rotate-[-90deg]" />
      </motion.button>
    </footer>
  );
};

export default Footer;