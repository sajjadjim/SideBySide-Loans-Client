import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Headphones,
  Building2
} from 'lucide-react';
import { useTheme } from '../../components/ThemeContext';

const Contact = () => {
  // ========== THEME & STATE ==========
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // ========== CONTACT INFORMATION ==========
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+880 1234-567890', '+880 9876-543210'],
      description: 'Mon-Sat, 9AM - 6PM',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@grameenloan.com', 'info@grameenloan.com'],
      description: 'We reply within 24 hours',
      color: 'green'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['123 Microloan Street', 'Dhaka, Bangladesh'],
      description: 'Visit us during office hours',
      color: 'amber'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 4PM'],
      description: 'Closed on Sundays & Holidays',
      color: 'purple'
    }
  ];

  // ========== QUICK HELP OPTIONS ==========
  const helpOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team instantly',
      action: 'Start Chat',
      color: 'blue'
    },
    {
      icon: Headphones,
      title: 'Call Support',
      description: 'Talk to our loan experts',
      action: 'Call Now',
      color: 'green'
    },
   
  ];

  // ========== FORM HANDLERS ==========
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========== PAGE HEADER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4
            ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Touch</span>
          </h1>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Have questions about our loan services? We're here to help. Reach out to us anytime.
          </p>
        </motion.div>

        {/* ========== CONTACT INFO CARDS ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`rounded-xl p-6 border-2 transition-all
                  ${isDark 
                    ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4
                  ${info.color === 'blue' 
                    ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                    : info.color === 'green'
                    ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                    : info.color === 'amber'
                    ? isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                    : isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600'
                  }`}
                >
                  <IconComponent size={24} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className={`text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {detail}
                  </p>
                ))}
                <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {info.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ========== MAIN CONTENT GRID ========== */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* ========== LEFT: CONTACT FORM ========== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className={`rounded-xl p-8 border-2
              ${isDark 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
              }`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Send Us a Message
              </h2>

              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg border-2 border-green-500 flex items-center gap-3
                    ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}
                >
                  <CheckCircle2 className={isDark ? 'text-green-400' : 'text-green-600'} size={24} />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-green-300' : 'text-green-800'}`}>
                      Message Sent Successfully!
                    </p>
                    <p className={`text-sm ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all
                        ${isDark 
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all
                        ${isDark 
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all
                        ${isDark 
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      placeholder="+880 1234-567890"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all
                        ${isDark 
                          ? 'bg-slate-900 border-slate-700 text-white' 
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="loan-inquiry">Loan Inquiry</option>
                      <option value="application-status">Application Status</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="general-question">General Question</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all resize-none
                      ${isDark 
                        ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all text-white
                    ${isSubmitting 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-blue-900 hover:bg-blue-800 shadow-lg hover:shadow-xl'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ========== RIGHT: QUICK HELP OPTIONS ========== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Quick Help
            </h2>

            {helpOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-xl p-6 border-2 cursor-pointer transition-all
                    ${isDark 
                      ? 'bg-slate-800 border-slate-700 hover:border-blue-600' 
                      : 'bg-white border-slate-200 hover:border-blue-600'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4
                    ${option.color === 'blue' 
                      ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                      : option.color === 'green'
                      ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                      : isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {option.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {option.description}
                  </p>
                  <button className={`text-sm font-semibold transition-colors
                    ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    {option.action} →
                  </button>
                </motion.div>
              );
            })}

           
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;