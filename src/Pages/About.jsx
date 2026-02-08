import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Award,
  Users,
  TrendingUp,
  Shield,
  Heart,
  Globe,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Home
} from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const About = () => {
  // ========== GET THEME FROM CONTEXT ==========
  const { isDark } = useTheme();

  // ========== STATISTICS DATA ==========
  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Borrowers' },
    { icon: TrendingUp, value: '$5M+', label: 'Total Funded' },
    { icon: Award, value: '98%', label: 'Success Rate' },
    { icon: Globe, value: '25+', label: 'Districts Covered' }
  ];

  // ========== CORE VALUES ==========
  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in building long-term relationships through honest communication and transparent processes.',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'Our mission is to empower communities by providing accessible financial solutions to those who need it most.',
      color: 'red'
    },
    {
      icon: Target,
      title: 'Financial Inclusion',
      description: 'We strive to break barriers and make microfinance accessible to everyone, regardless of their background.',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Sustainable Growth',
      description: 'We focus on creating sustainable impact that helps individuals and communities grow over time.',
      color: 'amber'
    }
  ];

  // ========== LOAN IMPACT AREAS ==========
  const impactAreas = [
    {
      icon: Briefcase,
      title: 'Small Business',
      count: '15,000+',
      description: 'Entrepreneurs funded'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      count: '8,000+',
      description: 'Students supported'
    },
    {
      icon: Home,
      title: 'Housing',
      count: '5,000+',
      description: 'Families housed'
    },
    {
      icon: Heart,
      title: 'Healthcare',
      count: '3,000+',
      description: 'Medical needs met'
    }
  ];

  // ========== TEAM MEMBERS ==========
  const team = [
    {
      name: 'Dr. Muhammad Yunus',
      role: 'Founder & Chairman',
      image: 'https://via.placeholder.com/200',
      bio: 'Nobel Peace Prize laureate and pioneer of microfinance'
    },
    {
      name: 'Sarah Ahmed',
      role: 'Chief Executive Officer',
      image: 'https://via.placeholder.com/200',
      bio: '15+ years in microfinance and community banking'
    },
    {
      name: 'Kamal Hassan',
      role: 'Chief Financial Officer',
      image: 'https://via.placeholder.com/200',
      bio: 'Expert in financial risk management and compliance'
    },
    {
      name: 'Nadia Rahman',
      role: 'Head of Operations',
      image: 'https://via.placeholder.com/200',
      bio: 'Specialist in loan processing and customer relations'
    }
  ];

  // ========== MILESTONES ==========
  const milestones = [
    { year: '2010', event: 'SideBySide Loan founded with a vision to empower rural communities' },
    { year: '2015', event: 'Reached 10,000 active borrowers across Bangladesh' },
    { year: '2018', event: 'Launched digital loan application platform' },
    { year: '2020', event: 'Expanded to 25+ districts nationwide' },
    { year: '2023', event: 'Achieved 50,000+ borrowers and $5M+ in total funding' },
    { year: '2024', event: 'Introduced AI-powered credit scoring system' }
  ];

  return (
    <div className={`min-h-screen pt-28 pb-16 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========== HERO SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4
            ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">SideBySide Loan</span>
          </h1>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Empowering communities through accessible microfinance since 2010. 
            We believe everyone deserves a chance to achieve their financial dreams.
          </p>
        </motion.div>

        {/* ========== STATISTICS CARDS ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`rounded-xl p-6 border-2 text-center transition-all
                  ${isDark 
                    ? 'bg-slate-800 border-slate-700 hover:border-blue-600' 
                    : 'bg-white border-slate-200 hover:border-blue-600'
                  }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                  ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                >
                  <IconComponent size={32} />
                </div>
                <h3 className={`text-3xl font-extrabold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ========== MISSION & VISION ========== */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`rounded-xl p-8 border-2
              ${isDark 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
              }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6
              ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
            >
              <Target size={32} />
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Mission
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              To provide accessible, transparent, and fair microfinance solutions that empower individuals 
              and communities to break the cycle of poverty and achieve sustainable economic growth.
            </p>
            <ul className="mt-6 space-y-3">
              {['Financial inclusion for all', 'Transparent loan processes', 'Community empowerment', 'Sustainable impact'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`rounded-xl p-8 border-2
              ${isDark 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
              }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6
              ${isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'}`}
            >
              <Eye size={32} />
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our Vision
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              To become the leading microfinance institution in Bangladesh, recognized for our commitment 
              to social responsibility, innovation, and creating lasting positive change in communities.
            </p>
            <ul className="mt-6 space-y-3">
              {['Nationwide coverage', 'Digital-first approach', 'Zero poverty initiative', 'Financial literacy programs'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ========== CORE VALUES ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
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
                    ${value.color === 'blue' 
                      ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                      : value.color === 'red'
                      ? isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                      : value.color === 'green'
                      ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                      : isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ========== IMPACT AREAS ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Impact
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-xl p-6 text-center border-2 transition-all
                    ${isDark 
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' 
                      : 'bg-gradient-to-br from-white to-slate-50 border-slate-200'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4
                    ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                  >
                    <IconComponent size={28} />
                  </div>
                  <h3 className={`text-2xl font-extrabold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {area.count}
                  </h3>
                  <p className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {area.title}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ========== LEADERSHIP TEAM ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Meet Our Leadership
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`rounded-xl p-6 border-2 text-center transition-all
                  ${isDark 
                    ? 'bg-slate-800 border-slate-700 hover:border-blue-600' 
                    : 'bg-white border-slate-200 hover:border-blue-600'
                  }`}
              >
                <div className={`w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4
                  ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
                >
                  <div className={`w-full h-full flex items-center justify-center text-3xl font-bold
                    ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {member.name}
                </h3>
                <p className={`text-sm font-semibold mb-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {member.role}
                </p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== MILESTONES TIMELINE ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-20"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex gap-6 items-start rounded-xl p-6 border-2 transition-all hover:scale-[1.02]
                  ${isDark 
                    ? 'bg-slate-800 border-slate-700 hover:border-blue-600' 
                    : 'bg-white border-slate-200 hover:border-blue-600'
                  }`}
              >
                <div className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-xl font-extrabold
                  ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}
                >
                  {milestone.year}
                </div>
                <p className={`text-lg leading-relaxed pt-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {milestone.event}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== CTA SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`rounded-2xl p-12 text-center border-2
            ${isDark 
              ? 'bg-gradient-to-br from-blue-900/30 to-slate-800 border-slate-700' 
              : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'
            }`}
        >
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to Start Your Journey?
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Join thousands of borrowers who trust SideBySide Loan for their financial needs. 
            Apply today and take the first step towards achieving your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg"
            >
              Apply for Loan
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-lg font-bold text-lg border-2 transition-all
                ${isDark 
                  ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                  : 'border-slate-300 text-slate-700 hover:bg-white'
                }`}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;