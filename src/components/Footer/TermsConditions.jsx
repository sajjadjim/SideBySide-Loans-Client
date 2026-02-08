// TermsConditions.jsx
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpen,
  DollarSign,
  FileText,
  RefreshCw,
  Scale,
  UserX,
  XCircle,
} from "lucide-react";
import { useEffect } from "react";

const TermsConditions = () => {
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
      icon: BookOpen,
      title: "Acceptance of Terms",
      content: [
        {
          text: "By accessing and using GrameenLoan, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.",
        },
        {
          subtitle: "Agreement Updates",
          points: [
            "We reserve the right to modify these terms at any time",
            "Changes will be effective immediately upon posting",
            "Continued use constitutes acceptance of modified terms",
            "You will be notified of significant changes via email",
          ],
        },
      ],
    },
    {
      icon: UserX,
      title: "Eligibility Requirements",
      content: [
        {
          subtitle: "To use GrameenLoan, you must:",
          points: [
            "Be at least 18 years of age or the age of majority in your jurisdiction",
            "Have the legal capacity to enter into binding contracts",
            "Provide accurate, current, and complete information",
            "Not be prohibited from using our services under applicable laws",
            "Have a valid bank account and government-issued ID",
          ],
        },
      ],
    },
    {
      icon: DollarSign,
      title: "Loan Terms & Conditions",
      content: [
        {
          subtitle: "Application Process",
          points: [
            "All loan applications are subject to approval",
            "We reserve the right to reject any application without explanation",
            "Approval is based on creditworthiness and internal criteria",
            "Loan amounts, interest rates, and terms are determined individually",
          ],
        },
        {
          subtitle: "Repayment Obligations",
          points: [
            "Borrowers must repay loans according to the agreed schedule",
            "Late payments may incur additional fees and penalties",
            "Early repayment is allowed without prepayment penalties",
            "Failed payments may affect your credit score",
            "Default may result in legal action and collection proceedings",
          ],
        },
        {
          subtitle: "Interest Rates & Fees",
          points: [
            "Interest rates vary based on loan type and borrower profile",
            "All fees will be clearly disclosed before loan acceptance",
            "Processing fees, if any, are non-refundable",
            "Late payment fees will be charged as per the loan agreement",
          ],
        },
      ],
    },
    {
      icon: Scale,
      title: "User Responsibilities",
      content: [
        {
          subtitle: "You agree to:",
          points: [
            "Provide accurate and truthful information",
            "Maintain the confidentiality of your account credentials",
            "Notify us immediately of any unauthorized access",
            "Use the platform only for lawful purposes",
            "Not attempt to manipulate or abuse the system",
            "Not share your account with others",
          ],
        },
        {
          subtitle: "Prohibited Activities",
          points: [
            "Submitting false or misleading information",
            "Using the service for fraudulent purposes",
            "Attempting to hack, disrupt, or compromise security",
            "Creating multiple accounts to circumvent restrictions",
            "Harassing or threatening staff or other users",
          ],
        },
      ],
    },
    {
      icon: AlertTriangle,
      title: "Disclaimers & Limitations",
      content: [
        {
          subtitle: "Service Availability",
          points: [
            "We do not guarantee uninterrupted or error-free service",
            "Platform may be unavailable during maintenance",
            "We are not liable for delays or failures due to circumstances beyond our control",
          ],
        },
        {
          subtitle: "Financial Advice",
          points: [
            "GrameenLoan does not provide financial, legal, or tax advice",
            "You should consult professionals before making financial decisions",
            "We are not responsible for financial losses from poor decisions",
          ],
        },
        {
          subtitle: "Limitation of Liability",
          points: [
            "Our liability is limited to the maximum extent permitted by law",
            "We are not liable for indirect, incidental, or consequential damages",
            "Total liability shall not exceed the fees paid by you in the past 12 months",
          ],
        },
      ],
    },
    {
      icon: XCircle,
      title: "Account Termination",
      content: [
        {
          subtitle: "We may suspend or terminate your account if:",
          points: [
            "You violate these terms and conditions",
            "You provide false or misleading information",
            "You engage in fraudulent or illegal activities",
            "Your account remains inactive for an extended period",
            "Required by law or regulatory authorities",
          ],
        },
        {
          subtitle: "Upon Termination",
          points: [
            "You must immediately repay all outstanding loans",
            "Your access to the platform will be revoked",
            "We may retain your data as required by law",
            "Provisions that should survive termination will remain in effect",
          ],
        },
      ],
    },
    {
      icon: RefreshCw,
      title: "Dispute Resolution",
      content: [
        {
          subtitle: "Resolution Process",
          points: [
            "Any disputes should first be reported to customer support",
            "We will attempt to resolve disputes amicably within 30 days",
            "Unresolved disputes may be subject to arbitration",
            "Arbitration will be conducted in accordance with local laws",
            "Class action lawsuits are waived to the extent permitted by law",
          ],
        },
      ],
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Ownership",
          points: [
            "All content, logos, and trademarks are owned by GrameenLoan",
            "You may not copy, reproduce, or distribute our content without permission",
            "Unauthorized use may result in legal action",
            "You retain ownership of the information you provide",
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
        className="max-w-7xl mx-auto"
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
            <Scale className="w-10 h-10" style={{ color: "var(--primary)" }} />
          </div>
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Terms & Conditions
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
              Please read these terms and conditions carefully before using{" "}
              <span className="font-bold" style={{ color: "var(--primary)" }}>
                SideBySide Loan
              </span>
              . These terms govern your use of our platform and services.
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
                  style={{ backgroundColor: "var(--secondary)", opacity: 0.1 }}
                >
                  <section.icon
                    className="w-6 h-6"
                    style={{ color: "var(--secondary)" }}
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
                  {item.text && (
                    <p
                      className="mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.text}
                    </p>
                  )}
                  {item.subtitle && (
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.subtitle}
                    </h3>
                  )}
                  {item.points && (
                    <ul className="space-y-2">
                      {item.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start gap-3">
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                            style={{ backgroundColor: "var(--secondary)" }}
                          />
                          <span style={{ color: "var(--text-secondary)" }}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Acceptance Box */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-8 rounded-xl text-center"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--secondary)",
          }}
        >
          <AlertTriangle
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "var(--accent)" }}
          />
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Agreement Acknowledgment
          </h3>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            By using GrameenLoan, you acknowledge that you have read,
            understood, and agree to be bound by these Terms & Conditions.
          </p>
          <p style={{ color: "var(--text-secondary)" }}>
            Questions? Contact us at{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--secondary)" }}
            >
              legal@GrameenLoan.com
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsConditions;
