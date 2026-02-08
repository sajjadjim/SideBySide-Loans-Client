import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowRight, 
  Filter,
  Search,
  Loader
} from 'lucide-react';
import { useTheme } from '../../components/ThemeContext';
import axios from 'axios';
import Loading from '../../components/Loading';

const AllLoans = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    axios
      .get("https://grameen-loan-server.vercel.app/all-loans")
      .then((res) => {
        setLoans(res.data);
        setFilteredLoans(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error fetching loans:", err);
      })
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    let result = loans;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(loan => loan.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(loan => 
        loan.loanTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.category.toLowerCase().includes(searchQuery.toLowerCase())
        // loan.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLoans(result);
  }, [selectedCategory, searchQuery, loans]);

  const categories = ['All', ...new Set(loans.map(loan => loan.category))];

  const handleViewDetails = (loanId) => {
    navigate(`/loan-details/${loanId}`);
  };

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            All Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">Products</span>
          </h1>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore our wide range of loan products designed to meet your financial needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className={isDark ? 'text-slate-500' : 'text-slate-400'} size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search loans by title or category"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all
                    ${isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className={isDark ? 'text-slate-400' : 'text-slate-600'} size={20} />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all
                    ${selectedCategory === category
                      ? isDark
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-900 text-white'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
        >
          Showing <span className="font-bold">{filteredLoans.length}</span> loan{filteredLoans.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </motion.div> */}

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
          <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLoans.map((loan, index) => (
              
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
                  <p className={`text-sm mb-4 line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600 '}`}>
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
                    <span>
                      View Details
                      </span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>)
            ))}
          </div>
        )}

        {filteredLoans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
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

export default AllLoans;