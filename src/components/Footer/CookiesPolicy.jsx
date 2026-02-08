// CookiesPolicy.jsx
import { motion } from "framer-motion";
import {
  BarChart,
  CheckCircle,
  Cookie,
  Eye,
  Settings,
  Shield,
  Target,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const CookiesPolicy = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load saved preferences from localStorage
    const saved = localStorage.getItem("cookiePreferences");
    if (saved) {
      setCookiePreferences(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (type) => {
    if (type === "essential") return; // Essential cookies cannot be disabled

    const newPreferences = {
      ...cookiePreferences,
      [type]: !cookiePreferences[type],
    };
    setCookiePreferences(newPreferences);
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences));
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setCookiePreferences(onlyEssential);
    localStorage.setItem("cookiePreferences", JSON.stringify(onlyEssential));
  };

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

  const cookieTypes = [
    {
      icon: Shield,
      type: "essential",
      title: "Essential Cookies",
      description:
        "These cookies are necessary for the website to function and cannot be switched off.",
      examples: [
        "Authentication and security",
        "Session management",
        "Load balancing",
        "Cookie consent preferences",
      ],
      color: "var(--success)",
    },
    {
      icon: Settings,
      type: "functional",
      title: "Functional Cookies",
      description:
        "These cookies enable enhanced functionality and personalization.",
      examples: [
        "Remember your preferences",
        "Language and region settings",
        "Form auto-fill data",
        "Customized user interface",
      ],
      color: "var(--primary)",
    },
    {
      icon: BarChart,
      type: "analytics",
      title: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors interact with our website.",
      examples: [
        "Page visit statistics",
        "User behavior analysis",
        "Performance monitoring",
        "Error tracking and reporting",
      ],
      color: "var(--secondary)",
    },
    {
      icon: Target,
      type: "marketing",
      title: "Marketing Cookies",
      description:
        "These cookies are used to track visitors and display relevant advertisements.",
      examples: [
        "Personalized advertisements",
        "Social media integration",
        "Retargeting campaigns",
        "Conversion tracking",
      ],
      color: "var(--accent)",
    },
  ];

  return (
    <div
      className=" py-28 px-4 md:px-8"
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
            style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
          >
            <Cookie className="w-10 h-10" style={{ color: "var(--accent)" }} />
          </div>
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Cookie Policy
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
              <span className="font-bold" style={{ color: "var(--primary)" }}>
                SideBySide Loan
              </span>{" "}
              uses cookies to improve your experience, analyze site traffic, and
              personalize content. Learn how we use cookies and manage your
              preferences below.
            </p>
          </div>
        </motion.div>

        {/* What Are Cookies */}
        <motion.div
          variants={itemVariants}
          className="p-6 md:p-8 rounded-xl shadow-lg mb-8"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <Eye
              className="w-8 h-8 flex-shrink-0"
              style={{ color: "var(--primary)" }}
            />
            <div>
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                What Are Cookies?
              </h2>
              <p style={{ color: "var(--text-secondary)" }} className="mb-3">
                Cookies are small text files that are placed on your device when
                you visit a website. They help the website remember your actions
                and preferences over time, so you don't have to re-enter them
                whenever you return to the site.
              </p>
              <p style={{ color: "var(--text-secondary)" }}>
                We use both{" "}
                <span className="font-semibold">session cookies</span> (which
                expire when you close your browser) and{" "}
                <span className="font-semibold">persistent cookies</span> (which
                remain on your device until they expire or you delete them).
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cookie Types & Preferences */}
        <div className="space-y-6 mb-8">
          {cookieTypes.map((cookie, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 md:p-8 rounded-xl shadow-lg"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: cookie.color, opacity: 0.1 }}
                  >
                    <cookie.icon
                      className="w-6 h-6"
                      style={{ color: cookie.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {cookie.title}
                    </h3>
                    <p
                      className="mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {cookie.description}
                    </p>
                    <div className="space-y-2">
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Examples:
                      </p>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                              style={{ backgroundColor: cookie.color }}
                            />
                            <span style={{ color: "var(--text-secondary)" }}>
                              {example}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleToggle(cookie.type)}
                    disabled={cookie.type === "essential"}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      cookie.type === "essential"
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                    style={{
                      backgroundColor: cookiePreferences[cookie.type]
                        ? cookie.color
                        : "var(--border)",
                    }}
                  >
                    <motion.div
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{
                        left: cookiePreferences[cookie.type] ? "30px" : "4px",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  </button>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {cookie.type === "essential"
                      ? "Always On"
                      : cookiePreferences[cookie.type]
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAcceptAll}
            className="flex-1 flex items-center justify-center gap-2 btn-primary"
          >
            <CheckCircle className="w-5 h-5" />
            Accept All Cookies
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRejectAll}
            className="flex-1 flex items-center justify-center gap-2 btn-outline"
          >
            <XCircle className="w-5 h-5" />
            Reject Non-Essential
          </motion.button>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          variants={itemVariants}
          className="p-6 md:p-8 rounded-xl shadow-lg mb-8"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Managing Cookies in Your Browser
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Most web browsers allow you to control cookies through their
            settings. You can set your browser to:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Block all cookies",
              "Block third-party cookies only",
              "Delete cookies when you close your browser",
              "Alert you when a website tries to set a cookie",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  style={{ color: "var(--success)" }}
                />
                <span style={{ color: "var(--text-secondary)" }}>{item}</span>
              </li>
            ))}
          </ul>
          <p style={{ color: "var(--text-secondary)" }}>
            <strong>Note:</strong> Blocking all cookies may affect your ability
            to use certain features of our website.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={itemVariants}
          className="p-8 rounded-xl text-center"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--accent)",
          }}
        >
          <Cookie
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "var(--accent)" }}
          />
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Questions About Cookies?
          </h3>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            If you have any questions about how we use cookies, please contact
            us:
          </p>
          <p style={{ color: "var(--text-secondary)" }}>
            Email:{" "}
            <span className="font-semibold" style={{ color: "var(--accent)" }}>
              cookies@GrameenLoan.com
            </span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CookiesPolicy;
