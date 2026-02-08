// Error.jsx
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Home,
  Mail,
  Search,
  TrendingUp,
} from "lucide-react";
import { useNavigate, useRouteError } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full max-w-md mx-auto"
              >
                {/* Main 404 Circle Background */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "200px 200px" }}
                />

                {/* Inner rotating circle */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "200px 200px" }}
                />

                {/* Dollar Sign - Left "4" */}
                <motion.g
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle
                    cx="120"
                    cy="200"
                    r="50"
                    fill="var(--primary)"
                    opacity="0.1"
                  />
                  <text
                    x="120"
                    y="220"
                    fontSize="70"
                    fontWeight="black"
                    fill="var(--primary)"
                    textAnchor="middle"
                  >
                    4
                  </text>
                </motion.g>

                {/* Alert Circle - Middle "0" */}
                <motion.g
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="55"
                    fill="var(--accent)"
                    opacity="0.1"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="45"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="6"
                  />
                  <motion.path
                    d="M 200 180 L 200 210"
                    stroke="var(--accent)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <circle cx="200" cy="225" r="4" fill="var(--accent)" />
                </motion.g>

                {/* Money/Document - Right "4" */}
                <motion.g
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                >
                  <circle
                    cx="280"
                    cy="200"
                    r="50"
                    fill="var(--secondary)"
                    opacity="0.1"
                  />
                  <text
                    x="280"
                    y="220"
                    fontSize="70"
                    fontWeight="black"
                    fill="var(--secondary)"
                    textAnchor="middle"
                  >
                    4
                  </text>
                </motion.g>

                {/* Floating coins */}
                {[...Array(6)].map((_, i) => (
                  <motion.g
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                      y: [-100, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <circle
                      cx={100 + i * 40}
                      cy={350}
                      r="8"
                      fill="var(--accent)"
                      opacity="0.6"
                    />
                    <text
                      x={100 + i * 40}
                      y={355}
                      fontSize="10"
                      fontWeight="bold"
                      fill="white"
                      textAnchor="middle"
                    >
                      $
                    </text>
                  </motion.g>
                ))}

                {/* Search magnifier */}
                <motion.g
                  animate={{
                    x: [0, 20, -20, 0],
                    y: [0, -20, 20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle
                    cx="320"
                    cy="100"
                    r="20"
                    fill="none"
                    stroke="var(--success)"
                    strokeWidth="3"
                  />
                  <line
                    x1="335"
                    y1="115"
                    x2="350"
                    y2="130"
                    stroke="var(--success)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.g>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    cx={80 + Math.random() * 240}
                    cy={80 + Math.random() * 240}
                    r="3"
                    fill="var(--primary)"
                    opacity="0.3"
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </svg>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left"
            >
              {/* Error Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: "var(--error)", opacity: 0.1 }}
              >
                <AlertCircle
                  className="w-4 h-4"
                  style={{ color: "var(--error)" }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--error)" }}
                >
                  Error {error?.status || "404"}
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-black mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Oops! Page Not Found
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg mb-6 max-w-md"
                style={{ color: "var(--text-secondary)" }}
              >
                The page you're looking for seems to have taken a loan and
                disappeared! Don't worry, we'll help you find your way back.
              </motion.p>

              {/* Error Details (if available) */}
              {error?.statusText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-6 p-4 rounded-xl"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-sm font-mono"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <strong>Error:</strong> {error.statusText || error.message}
                  </p>
                </motion.div>
              )}

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Quick Links:
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Home, label: "Home", path: "/" },
                    { icon: Search, label: "Apply Loan", path: "/apply" },
                    { icon: TrendingUp, label: "Track Status", path: "/track" },
                  ].map((link, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(link.path)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        backgroundColor: "var(--surface)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Homepage
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(-1)}
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </motion.button>
              </motion.div>

              {/* Contact Support */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 p-4 rounded-xl"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <Mail
                    className="w-5 h-5"
                    style={{ color: "var(--primary)" }}
                  />
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Need Help?
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Contact our support team at{" "}
                      <a
                        href="mailto:support@GrameenLoan.com"
                        className="font-semibold hover:underline"
                        style={{ color: "var(--primary)" }}
                      >
                        support@GrameenLoan.com
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Error;
