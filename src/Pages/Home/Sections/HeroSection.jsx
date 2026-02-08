import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { useTheme } from "../../../components/ThemeContext";
import HeroImg from "../../../assets/hero_Img.png";
import { Link } from "react-router";

const HeroSection = () => {
  // ========== GET THEME FROM CONTEXT ==========
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen pt-20 ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* ========== MAIN GRID: LEFT TEXT + RIGHT IMAGE ========== */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* ========== LEFT CONTENT - HEADLINE & CTA ========== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2
                ${
                  isDark
                    ? "bg-blue-900/20 border-blue-700 text-blue-300"
                    : "bg-blue-50 border-blue-200 text-blue-700"
                }`}
            >
              <Award size={18} />
              <span className="text-sm font-semibold">
                Trusted Platform • 10,000+ Active Loans
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6
              ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Simple Microloans for{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700">
                  Your Dreams
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-sky-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg sm:text-xl mb-8 leading-relaxed
              ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              Fast, transparent, and secure microloan management. From
              application to approval in 24 hours. Zero paperwork, maximum
              trust.
            </p>

            {/* CTA Buttons */}

            <div className="flex gap-4 items-center justify-center lg:justify-start mb-10">
              <Link to="/all-loans">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl 
                font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center 
                justify-center gap-2"
                >
                Explore Loans
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={22}
                  />
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  No Hidden Fees
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  24hr Approval
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 size={14} className="text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Bank-Level Security
                </span>
              </div>
            </div>
          </motion.div>
{/* right  */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Main Dashboard Card */}
            <div
              className={`relative rounded-2xl p-6 sm:p-8 shadow-2xl border-2
              ${
                isDark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <img src={HeroImg} alt="" />
            </div>

            {/* Floating Badge 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className={`absolute -top-4 -left-4 px-4 py-3 rounded-xl shadow-lg border-2
                ${
                  isDark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-200"
                }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="text-green-500" size={20} />
                <div>
                  <p
                    className={`text-xs font-medium ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Secure
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    256-bit SSL
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating Badge 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className={`absolute -bottom-4 -right-4 px-4 py-3 rounded-xl shadow-lg border-2
                ${
                  isDark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-200"
                }`}
            >
              <div className="flex items-center gap-2">
                <Users className="text-blue-500" size={20} />
                <div>
                  <p
                    className={`text-xs font-medium ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Trusted by
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    10,000+ Users
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ========== BOTTOM STATS BAR ========== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 py-8 px-6 rounded-2xl border-2
            ${
              isDark
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            }`}
        >
          {/* Stat 1 */}
          <div className="text-center">
            <p
              className={`text-3xl font-extrabold mb-1 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              $5M+
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Total Funded
            </p>
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            <p
              className={`text-3xl font-extrabold mb-1 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              98%
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Approval Rate
            </p>
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            <p
              className={`text-3xl font-extrabold mb-1 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              24hrs
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Avg Processing
            </p>
          </div>

          {/* Stat 4 */}
          <div className="text-center">
            <p
              className={`text-3xl font-extrabold mb-1 ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              10K+
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Happy Borrowers
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
