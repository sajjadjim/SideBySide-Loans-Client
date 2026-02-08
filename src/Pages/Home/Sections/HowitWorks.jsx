// HowItWorks.jsx
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Shield,
  TrendingUp,
  Wallet,
} from "lucide-react";

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Submit Application",
      description:
        "Fill out our simple online form with your personal and financial details. Takes less than 5 minutes.",
      color: "var(--primary)",
      bgColor: "rgba(30, 58, 138, 0.1)",
      features: ["Quick form", "Secure data", "No paperwork"],
    },
    {
      number: "02",
      icon: Search,
      title: "Verification & Review",
      description:
        "Our team reviews your application and verifies your information to ensure accuracy and security.",
      color: "var(--secondary)",
      bgColor: "rgba(14, 165, 233, 0.1)",
      features: ["Fast review", "Credit check", "Document verify"],
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Get Approved",
      description:
        "Receive instant approval notification with your loan amount, interest rate, and repayment schedule.",
      color: "var(--success)",
      bgColor: "rgba(5, 150, 105, 0.1)",
      features: ["Instant decision", "Clear terms", "No hidden fees"],
    },
    {
      number: "04",
      icon: Wallet,
      title: "Receive Funds",
      description:
        "Once approved, funds are transferred directly to your bank account within 24 hours.",
      color: "var(--accent)",
      bgColor: "rgba(245, 158, 11, 0.1)",
      features: ["Quick transfer", "Direct deposit", "Track payment"],
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Get approved in minutes, not days",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Bank-level encryption for your data",
    },
    {
      icon: TrendingUp,
      title: "Flexible Terms",
      description: "Customize repayment to fit your needs",
    },
  ];

  return (
    <section
      className="py-14 px-4 md:px-8"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <span
              className="text-sm font-semibold"
              style={{ color: "white" }}
            >
              Simple Process
            </span>
          </motion.div>

          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            How It Works
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Get your microloan in 4 easy steps. Fast, transparent, and
            hassle-free process designed for your convenience.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="relative"
            >
              <motion.div
                variants={cardHoverVariants}
                className="h-full p-6 rounded-2xl shadow-lg relative overflow-hidden"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Background Number */}
                <div
                  className="absolute top-0 right-0 text-8xl font-black opacity-5 leading-none"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative z-10"
                  style={{ backgroundColor: step.bgColor }}
                >
                  <step.icon
                    className="w-8 h-8"
                    style={{ color: step.color }}
                  />
                </motion.div>

                {/* Step Number */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-sm font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: step.bgColor,
                      color: step.color,
                    }}
                  >
                    Step {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {step.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-md"
                      style={{
                        backgroundColor: "var(--bg)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow Connector (hidden on last item) */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20"
                  >
                    <ArrowRight
                      className="w-8 h-8"
                      style={{ color: step.color }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-2xl"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
              >
                <benefit.icon
                  className="w-6 h-6"
                  style={{ color: "var(--primary)" }}
                />
              </div>
              <div>
                <h4
                  className="font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {benefit.title}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2 group"
          >
            Start Your Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
