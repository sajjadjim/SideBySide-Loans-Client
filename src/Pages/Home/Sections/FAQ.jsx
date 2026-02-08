// FAQ.jsx
import { AnimatePresence, motion } from "framer-motion";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      category: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          question: "What is SideBySide Loan and how does it work?",
          answer:
            "SideBySide Loan is a microloan platform that connects borrowers with quick, transparent, and affordable financing. Simply submit an application, get verified, receive approval, and access funds within 24 hours. Our streamlined process eliminates traditional banking hassles.",
        },
        {
          question: "Who can apply for a loan?",
          answer:
            "Anyone aged 18 or above with a valid government ID, bank account, and proof of income can apply. We serve individuals, small business owners, students, and freelancers. No minimum credit score required, but we do perform verification checks.",
        },
        {
          question: "How much can I borrow?",
          answer:
            "Loan amounts range from $500 to $25,000 depending on your profile, income verification, and creditworthiness. First-time borrowers typically qualify for $500-$5,000. Repeat customers with good repayment history can access higher amounts.",
        },
      ],
    },
    {
      category: "Application Process",
      icon: MessageCircle,
      questions: [
        {
          question: "How long does approval take?",
          answer:
            "Most applications are reviewed within 2-4 hours. Simple cases get instant approval, while complex applications may take up to 24 hours. You'll receive real-time notifications via email and SMS throughout the process.",
        },
        {
          question: "What documents do I need?",
          answer:
            "Required documents include: (1) Government-issued ID (passport, driver's license), (2) Proof of address (utility bill, lease agreement), (3) Bank statements (last 3 months), (4) Proof of income (pay stubs, tax returns, business financials). Upload everything securely through our platform.",
        },
        {
          question: "Can I apply if I have bad credit?",
          answer:
            "Yes! While we check credit history, we consider multiple factors including income stability, employment history, and debt-to-income ratio. Many customers with poor credit scores have been approved. We believe in second chances.",
        },
      ],
    },
    {
      category: "Repayment & Fees",
      icon: Phone,
      questions: [
        {
          question: "What are the interest rates?",
          answer:
            "Interest rates range from 8% to 24% APR based on loan amount, term, and your financial profile. We provide transparent rate calculations before you accept the loan. No hidden charges or surprise fees—what you see is what you pay.",
        },
        {
          question: "How do I repay my loan?",
          answer:
            "Repayment is automated via direct debit from your linked bank account. Choose weekly, bi-weekly, or monthly installments. Set up auto-pay to never miss a payment, or make manual payments through our app or website anytime.",
        },
        {
          question: "Are there penalties for early repayment?",
          answer:
            "No! We encourage early repayment and charge zero prepayment penalties. Pay off your loan anytime to save on interest. Many customers refinance or pay early to improve their credit and qualify for larger loans in the future.",
        },
        {
          question: "What happens if I miss a payment?",
          answer:
            "We understand life happens. Contact us immediately if you anticipate difficulty. We offer grace periods, payment plans, and hardship programs. Late fees apply after 10 days, but we work with you to avoid default and protect your credit score.",
        },
      ],
    },
    {
      category: "Security & Privacy",
      icon: Mail,
      questions: [
        {
          question: "Is my information secure?",
          answer:
            "Absolutely. We use bank-level 256-bit SSL encryption for all data transmission and storage. Our systems are SOC 2 compliant and regularly audited. Your personal and financial information is never sold to third parties.",
        },
        {
          question: "How is my data used?",
          answer:
            "Your data is used solely for loan processing, verification, and account management. We may share information with credit bureaus and partner lenders only when necessary. You control your privacy settings and can request data deletion anytime.",
        },
      ],
    },
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      color: "var(--primary)",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+1 (555) 123-4567",
      action: "Call Now",
      color: "var(--success)",
    },
    {
      icon: Mail,
      title: "Email",
      description: "support@SideBySide Loan.com",
      action: "Send Email",
      color: "var(--secondary)",
    },
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === key ? null : key);
  };

  const filteredFAQs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <section
      className="py-28 px-4 md:px-8"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-4xl mx-auto">
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
            style={{ backgroundColor: "var(--secondary)", opacity: 0.1 }}
          >
            <HelpCircle
              className="w-4 h-4"
              style={{ color: "var(--secondary)" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--secondary)" }}
            >
              Got Questions? We've Got Answers
            </span>
          </motion.div>

          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Everything you need to know about SideBySide Loan. Can't find your
            answer? Contact our support team.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--text-secondary)" }}
            />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-lg outline-none transition-all"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8 mb-16">
          {filteredFAQs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary)", opacity: 0.1 }}
                >
                  <category.icon
                    className="w-5 h-5"
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {category.category}
                </h3>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isActive = activeIndex === key;

                  return (
                    <motion.div
                      key={questionIndex}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: questionIndex * 0.05 }}
                      className="rounded-xl overflow-hidden"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: isActive
                          ? "2px solid var(--primary)"
                          : "2px solid var(--border)",
                      }}
                    >
                      {/* Question Button */}
                      <motion.button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full p-6 flex items-center justify-between gap-4 text-left transition-all"
                        whileHover={{ backgroundColor: "var(--bg)" }}
                      >
                        <span
                          className="text-lg font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0"
                        >
                          {isActive ? (
                            <Minus
                              className="w-6 h-6"
                              style={{ color: "var(--primary)" }}
                            />
                          ) : (
                            <Plus
                              className="w-6 h-6"
                              style={{ color: "var(--text-secondary)" }}
                            />
                          )}
                        </motion.div>
                      </motion.button>

                      {/* Answer */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-6 pb-6 leading-relaxed"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
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
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Still Have Questions?
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              Our support team is here to help you 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl text-center"
                style={{
                  backgroundColor: "var(--bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: option.color, opacity: 0.1 }}
                >
                  <option.icon
                    className="w-7 h-7"
                    style={{ color: option.color }}
                  />
                </div>
                <h4
                  className="font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {option.title}
                </h4>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {option.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    backgroundColor: option.color,
                    color: "white",
                  }}
                >
                  {option.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
