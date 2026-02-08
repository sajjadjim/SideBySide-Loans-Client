// CTASection.jsx
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, TrendingUp, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <div className="py-14 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, #1E40AF 50%, var(--secondary) 100%)",
          }}
        >
          {/* Decorative wave pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <motion.path
                d="M 0 50 Q 100 30 200 50 T 400 50"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path
                d="M 0 80 Q 100 60 200 80 T 400 80"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.2, repeat: Infinity }}
              />
              <motion.path
                d="M 0 110 Q 100 90 200 110 T 400 110"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.4, repeat: Infinity }}
              />
              <motion.path
                d="M 0 140 Q 100 120 200 140 T 400 140"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.6, repeat: Infinity }}
              />
              <motion.path
                d="M 0 170 Q 100 150 200 170 T 400 170"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-blue-300"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8, repeat: Infinity }}
              />
            </svg>
          </div>

          {/* Floating circles decoration */}
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-5"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-white rounded-full opacity-5"
            animate={{
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 gap-8">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 max-w-xl"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight"
              >
                Quick Loans, Happy Lives
                <br />
                Your Financial Growth Partner
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-blue-100 text-base mb-6 leading-relaxed"
              >
                We offer the lowest interest rates with the highest approval
                chances along with 100% transparency. GrameenLoan delivers
                financial support to every corner of your dreams, right on time.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                {[
                  { icon: Clock, text: "2-Hour Approval" },
                  { icon: CheckCircle, text: "98% Success Rate" },
                  { icon: TrendingUp, text: "Flexible EMI" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                  >
                    <item.icon className="w-4 h-4 text-blue-200" />
                    <span className="text-sm text-white font-semibold">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white text-blue-900 font-bold rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  Apply for Loan Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white/50 hover:border-white transition-all duration-300 flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Check Eligibility
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Illustration - Loan/Money Animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:block flex-shrink-0"
            >
              <svg viewBox="0 0 300 250" className="w-72 h-64">
                {/* Background Money Stack */}
                <motion.g
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <rect
                    x="40"
                    y="120"
                    width="100"
                    height="60"
                    rx="6"
                    fill="none"
                    stroke="#93c5fd"
                    strokeWidth="3"
                  />
                  <circle
                    cx="90"
                    cy="150"
                    r="15"
                    fill="none"
                    stroke="#93c5fd"
                    strokeWidth="3"
                  />
                  <text
                    x="90"
                    y="155"
                    fontSize="20"
                    fill="#93c5fd"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    $
                  </text>
                </motion.g>

                {/* Front Money Stack with Dollar Sign */}
                <motion.g
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <rect
                    x="100"
                    y="140"
                    width="120"
                    height="80"
                    rx="8"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="4"
                  />
                  <circle
                    cx="160"
                    cy="180"
                    r="25"
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="4"
                  />
                  <text
                    x="160"
                    y="190"
                    fontSize="30"
                    fill="#60a5fa"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    $
                  </text>

                  {/* Money details */}
                  <line
                    x1="110"
                    y1="155"
                    x2="150"
                    y2="155"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />
                  <line
                    x1="170"
                    y1="155"
                    x2="210"
                    y2="155"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />
                  <line
                    x1="110"
                    y1="205"
                    x2="150"
                    y2="205"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />
                  <line
                    x1="170"
                    y1="205"
                    x2="210"
                    y2="205"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />
                </motion.g>

                {/* Flying Dollar Coins */}
                <motion.g
                  animate={{
                    y: [0, -30, -60],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  <circle
                    cx="180"
                    cy="100"
                    r="12"
                    fill="#fbbf24"
                    opacity="0.8"
                  />
                  <text
                    x="180"
                    y="105"
                    fontSize="12"
                    fill="#78350f"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    $
                  </text>
                </motion.g>

                <motion.g
                  animate={{
                    y: [0, -30, -60],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                >
                  <circle
                    cx="140"
                    cy="110"
                    r="10"
                    fill="#fbbf24"
                    opacity="0.8"
                  />
                  <text
                    x="140"
                    y="114"
                    fontSize="10"
                    fill="#78350f"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    $
                  </text>
                </motion.g>

                <motion.g
                  animate={{
                    y: [0, -30, -60],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1,
                  }}
                >
                  <circle
                    cx="200"
                    cy="110"
                    r="10"
                    fill="#fbbf24"
                    opacity="0.8"
                  />
                  <text
                    x="200"
                    y="114"
                    fontSize="10"
                    fill="#78350f"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    $
                  </text>
                </motion.g>

                {/* Growth Arrow */}
                <motion.g
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M 20 200 Q 80 180, 140 160 T 260 100"
                    stroke="#34d399"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="6 4"
                  />
                  <polygon points="260,100 250,95 255,105" fill="#34d399" />
                </motion.g>

                {/* Dots on path */}
                <motion.circle
                  cx="20"
                  cy="200"
                  r="5"
                  fill="#34d399"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle
                  cx="140"
                  cy="160"
                  r="5"
                  fill="#34d399"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle
                  cx="260"
                  cy="100"
                  r="5"
                  fill="#34d399"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />

                {/* Percentage Badge */}
                <motion.g
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: "240px 60px" }}
                >
                  <rect
                    x="220"
                    y="45"
                    width="60"
                    height="30"
                    rx="15"
                    fill="#10b981"
                  />
                  <text
                    x="250"
                    y="65"
                    fontSize="14"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    8% APR
                  </text>
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
