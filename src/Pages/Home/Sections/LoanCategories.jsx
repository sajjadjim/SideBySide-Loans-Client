import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowRight, 
  Loader,
  Eye // ← NEW IMPORT
} from 'lucide-react';
import { useTheme } from '../../../components/ThemeContext';
import axios from 'axios';

const LoanCategories = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://grameen-loan-server.vercel.app/all-loans")
      .then((res) => {
        setLoans(res.data);
        setFilteredLoans(res.data);
      })
      .catch((err) => {
        console.error("Error fetching loans:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetails = (loanId) => {
    navigate(`/loan-details/${loanId}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center gap-4">
          <Loader className={`animate-spin ${isDark ? 'text-blue-400' : 'text-blue-600'}`} size={48} />
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Loading loans...</p>
        </div>
      </div>
    );
  }

  const displayedLoans = filteredLoans.slice(0, 6);
  const hasMore = filteredLoans.length > 6;

  return (
    <div className={`min-h-screen pb-16 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            All Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Categories</span>
          </h1>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore our wide range of loan products designed to meet your financial needs
          </p>
        </motion.div>

        {filteredLoans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-20 rounded-2xl border-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
          >
            <p className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              No loans found
            </p>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedLoans.map((loan, index) => (
                loan.showOnHome && (

                <motion.div
                  key={loan._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`rounded-2xl overflow-hidden border-2 shadow-lg transition-all
                    ${isDark 
                      ? 'bg-slate-800 border-slate-700 hover:border-blue-600' 
                      : 'bg-white border-slate-200 hover:border-blue-600'
                    }`}
                >
                  {/* Loan Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={loan.loanImage}
                      alt={loan.loanTitle}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md
                        ${isDark 
                          ? 'bg-blue-900/80 text-blue-200' 
                          : 'bg-white/90 text-blue-900'
                        }`}
                      >
                        {loan.category}
                      </span>
                    </div>
                    {/* Featured Badge */}
                    {loan.isFeatured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white backdrop-blur-md">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {loan.loanTitle}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm mb-4 line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {loan.shortDescription} 
                    </p>

                    {/* Loan Details */}
                    <div className="space-y-3 mb-6">
                      {/* Interest Rate */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className={isDark ? 'text-green-400' : 'text-green-600'} size={18} />
                          <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Interest Rate
                          </span>
                        </div>
                        <span className={`text-lg font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                          {loan.interestRate}%
                        </span>
                      </div>

                      {/* Max Limit */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className={isDark ? 'text-blue-400' : 'text-blue-600'} size={18} />
                          <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Max Limit
                          </span>
                        </div>
                        <span className={`text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          ${loan.maxLimit}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleViewDetails(loan._id)}
                      className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                    >
                      <span>View Details</span>
                      <ArrowRight size={20} />
                    </motion.button>
                  </div>
                </motion.div>)
              ))}
            </div>
            {/* button  */}

            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 text-center "
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/all-loans')}
                  className={`group px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all flex items-center gap-3 mx-auto
                    ${isDark 
                      ? 'btn-primary' 
                      : 'btn-primary'
                    }`}
                >                 
                  View All Loans
                 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
               
              </motion.div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        {filteredLoans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`mt-16 rounded-2xl p-8 text-center border-2
              ${isDark 
                ? 'bg-gradient-to-br from-blue-900/30 to-slate-800 border-slate-700' 
                : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'
              }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Can't Find What You're Looking For?
            </h2>
            <p className={`text-lg mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Our loan specialists are here to help you find the perfect loan solution
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all"
            >
              Contact Us
            </motion.button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default LoanCategories;