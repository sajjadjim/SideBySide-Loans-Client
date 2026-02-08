// PrivacyPolicy.jsx
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Database,
  Eye,
  FileText,
  Lock,
  Shield,
  UserCheck,
} from "lucide-react";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          points: [
            "Full name, email address, phone number",
            "Date of birth, address, and identification documents",
            "Bank account details and financial information",
            "Employment information and income details",
          ],
        },
        {
          subtitle: "Automatically Collected Information",
          points: [
            "IP address, browser type, and device information",
            "Usage data and interaction with our platform",
            "Cookies and similar tracking technologies",
            "Location data (with your permission)",
          ],
        },
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Primary Uses",
          points: [
            "Process and evaluate loan applications",
            "Verify your identity and prevent fraud",
            "Manage your account and provide customer support",
            "Send important updates about your loan status",
            "Improve our services and user experience",
          ],
        },
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          points: [
            "Industry-standard encryption (SSL/TLS) for data transmission",
            "Secure servers with regular security audits",
            "Access controls and authentication protocols",
            "Regular backup and disaster recovery procedures",
            "Employee training on data protection",
          ],
        },
      ],
    },
    {
      icon: UserCheck,
      title: "Information Sharing",
      content: [
        {
          subtitle: "We May Share Your Information With",
          points: [
            "Credit bureaus and financial institutions for loan processing",
            "Service providers who assist in our operations",
            "Legal authorities when required by law",
            "Third-party partners with your explicit consent",
          ],
        },
        {
          subtitle: "We Never",
          points: [
            "Sell your personal information to third parties",
            "Share your data for marketing without consent",
            "Disclose sensitive financial details unnecessarily",
          ],
        },
      ],
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: [
        {
          subtitle: "You Have the Right To",
          points: [
            "Access your personal data at any time",
            "Request correction of inaccurate information",
            "Delete your account and associated data",
            "Object to processing of your personal data",
            "Withdraw consent for data processing",
            "Request a copy of your data (data portability)",
          ],
        },
      ],
    },
    {
      icon: AlertCircle,
      title: "Data Retention",
      content: [
        {
          subtitle: "Retention Policy",
          points: [
            "Active loan data: Retained for the duration of the loan + 7 years",
            "Application data: Retained for 3 years after rejection",
            "Account data: Retained until account closure + 1 year",
            "Marketing data: Retained until consent is withdrawn",
          ],
        },
      ],
    },
  ];

  return (
    <div
      className="min-h-screen py-28 px-4 md:px-8"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
            style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
          >
            <Shield className="w-10 h-10" style={{ color: "var(--primary)" }} />
          </div>
          <h1
            className="text-7xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Last Updated: January 2025
          </p>
          <div
            className="mt-6 p-4 rounded-lg"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <p style={{ color: "var(--text-secondary)" }}>
              At{" "}
              <span className="font-bold" style={{ color: "var(--primary)" }}>
                SideBySide Loan
              </span>
              , we are committed to protecting your privacy and ensuring the
              security of your personal information. This policy explains how we
              collect, use, and safeguard your data.
            </p>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 md:p-8 rounded-xl shadow-lg"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
                >
                  <section.icon
                    className="w-6 h-6"
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {section.title}
                </h2>
              </div>

              {section.content.map((item, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  {item.subtitle && (
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.subtitle}
                    </h3>
                  )}
                  <ul className="space-y-2">
                    {item.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-3">
                        <CheckCircle
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: "var(--success)" }}
                        />
                        <span style={{ color: "var(--text-secondary)" }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-8 rounded-xl text-center"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--primary)",
          }}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Questions About Privacy?
          </h3>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            If you have any questions or concerns about our privacy practices,
            please contact us:
          </p>
          <div className="space-y-2" style={{ color: "var(--text-secondary)" }}>
            <p>
              Email:{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--primary)" }}
              >
                privacy@GrameenLoan.com
              </span>
            </p>
            <p>
              Phone:{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--primary)" }}
              >
                +1 (555) 123-4567
              </span>
            </p>
            <p>
              Address:{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--primary)" }}
              >
                123 Finance Street, Suite 100, New York, NY 10001
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
