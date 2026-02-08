// WhyChooseUs.jsx
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  CheckCircle,
  Clock,
  DollarSign,
  Headphones,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Approval",
      description:
        "Get approved in as little as 2 hours with our AI-powered verification system. No waiting, no hassle.",
      stat: "2-4 Hours",
      color: "var(--accent)",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Shield,
      title: "100% Secure & Encrypted",
      description:
        "Bank-level security with 256-bit SSL encryption. Your data is protected by industry-leading security protocols.",
      stat: "SOC 2 Certified",
      color: "var(--success)",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description:
        "No hidden fees, no surprises. What you see is what you pay. Clear interest rates and repayment schedules upfront.",
      stat: "0% Hidden Fees",
      color: "var(--primary)",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      title: "Flexible Loan Terms",
      description:
        "Customize your repayment schedule to match your cash flow. Choose from 3 to 36 months with adjustable payments.",
      stat: "3-36 Months",
      color: "var(--secondary)",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Users,
      title: "No Credit Score Required",
      description:
        "Bad credit? No problem. We evaluate multiple factors beyond credit score to approve deserving applicants.",
      stat: "85% Approval",
      color: "var(--accent)",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Headphones,
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is always available via chat, phone, or email. Real humans, real help.",
      stat: "Always Available",
      color: "var(--success)",
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  const achievements = [
    {
      icon: Award,
      number: "50,000+",
      label: "Loans Funded",
      color: "var(--accent)",
    },
    {
      icon: Target,
      number: "$100M+",
      label: "Total Disbursed",
      color: "var(--primary)",
    },
    {
      icon: BarChart3,
      number: "4.9/5",
      label: "Customer Rating",
      color: "var(--success)",
    },
    {
      icon: CheckCircle,
      number: "99.5%",
      label: "Satisfaction Rate",
      color: "var(--secondary)",
    },
  ];

  const comparisons = [
    {
      feature: "Approval Time",
      traditional: "3-7 days",
      GrameenLoan: "2-4 hours",
      icon: Clock,
    },
    {
      feature: "Credit Check",
      traditional: "Mandatory, strict",
      GrameenLoan: "Flexible criteria",
      icon: Users,
    },
    {
      feature: "Hidden Fees",
      traditional: "Yes, many",
      GrameenLoan: "None",
      icon: DollarSign,
    },
    {
      feature: "Support",
      traditional: "Business hours",
      GrameenLoan: "24/7 available",
      icon: Headphones,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      className="py-28 px-4 md:px-8"
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
            style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
          >
            <Award className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--primary)" }}
            >
              The GrameenLoan Advantage
            </span>
          </motion.div>

          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Why Choose GrameenLoan?
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            We're not just another loan provider. We're your financial partner
            committed to your success.
          </p>
        </motion.div>

        {/* Achievements Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl text-center relative overflow-hidden"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{ backgroundColor: achievement.color }}
              />
              <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center relative z-10"
                style={{ backgroundColor: achievement.color, opacity: 0.1 }}
              >
                <achievement.icon
                  className="w-6 h-6"
                  style={{ color: achievement.color }}
                />
              </motion.div>
              <motion.div
                className="text-3xl font-black mb-1 relative z-10"
                style={{ color: "var(--text-primary)" }}
              >
                {achievement.number}
              </motion.div>
              <div
                className="text-sm font-medium relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-6 rounded-2xl relative overflow-hidden group"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              {/* Gradient Background on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative z-10"
                style={{ backgroundColor: feature.color, opacity: 0.1 }}
              >
                <feature.icon
                  className="w-7 h-7"
                  style={{ color: feature.color }}
                />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {feature.title}
                  </h3>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: feature.color,
                      color: "white",
                      opacity: 0.9,
                    }}
                  >
                    {feature.stat}
                  </span>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ border: `2px solid ${feature.color}` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
          }}
        >
          <div className="text-center mb-8">
            <h3
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              GrameenLoan vs Traditional Banks
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              See why thousands choose us over traditional lenders
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  <th
                    className="text-left py-4 px-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Feature
                  </th>
                  <th
                    className="text-center py-4 px-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Traditional Banks
                  </th>
                  <th className="text-center py-4 px-4">
                    <span
                      className="inline-block px-4 py-2 rounded-lg font-bold"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                      }}
                    >
                      GrameenLoan
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <item.icon
                          className="w-5 h-5"
                          style={{ color: "var(--primary)" }}
                        />
                        <span
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.feature}
                        </span>
                      </div>
                    </td>
                    <td
                      className="text-center py-4 px-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.traditional}
                    </td>
                    <td className="text-center py-4 px-4">
                      <span
                        className="font-bold inline-flex items-center gap-2"
                        style={{ color: "var(--success)" }}
                      >
                        <CheckCircle className="w-5 h-5" />
                        {item.GrameenLoan}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 text-lg font-bold"
          >
            Experience The Difference
          </motion.button>
          <p
            className="mt-4 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Join 50,000+ satisfied customers • Quick approval • No hidden fees
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
