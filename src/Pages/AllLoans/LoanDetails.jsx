// LoanDetails.jsx
import axios from "axios";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Loader,
  Mail,
  MonitorCheck,
  MoveDownRight,
  Percent,
  Phone,
  Shield,
  TrendingUp,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useTheme } from "../../components/ThemeContext";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const LoanDetails = () => {
  const { isDark } = useTheme();

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔄 Fetching loan details for ID:", id);

        const response = await axios.get(
          `https://grameen-loan-server.vercel.app/all-loans/${id}`
        );

        console.log("✅ Loan details:", response.data);
        setLoan(response.data);
      } catch (err) {
        console.error("❌ Error fetching loan:", err);
        setError(err.response?.data?.message || "Failed to load loan details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLoanDetails();
    }
  }, [id]);

  const handleApplyNow = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to apply for a loan",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {
            state: { from: `/apply-loan/${id}` },
            replace: true,
          });
        }
      });
      return;
    }

    // Navigate to application form with loan data
    navigate(`/apply-loan/${id}`, { state: { loan } });
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen  flex items-center justify-center"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          className="text-center max-w-md p-8 rounded-2xl"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
          }}
        >
          <AlertCircle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "var(--error)" }}
          />
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Loan Not Found
          </h3>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            {error}
          </p>
          <button
            onClick={() => navigate("/all-loans")}
            className="btn-primary px-6 py-2 "
          >
            Back to All Loans
          </button>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="text-center">
          <p style={{ color: "var(--text-primary)" }}>No loan data available</p>
        </div>
      </div>
    );
  }
  console.log(loan);
  return (
    <div
      className="min-h-screen py-32 px-4 md:px-8"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              

              {/* Title */}
              <h1
                className="text-3xl md:text-4xl font-black mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {loan.loanTitle}
              </h1>

              {/* Short Description */}
              <p
                className="text-lg mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {loan.shortDescription}
              </p>

              {/* Loan Image */}
              <div className="relative h-72 overflow-hidden rounded-xl mb-8">
                <img
                  src={loan.loanImage}
                  alt={loan.loanTitle}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md
                      ${
                        isDark
                          ? "bg-blue-900/80 text-blue-200"
                          : "bg-white/90 text-blue-900"
                      }`}
                  >
                    {loan.category}
                  </span>
                </div>
                {/* Featured Badge */}
                {loan.isFeatured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white backdrop-blur-md">
                      ⭐ Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="flex ">
                {/* Max Loan Amount */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--primary)"}}
                  >
                    <DollarSign
                      className="w-6 h-6"
                      style={{ color: "white" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Maximum Loan Amount
                    </p>
                    <p
                      className="text-3xl font-black"
                      style={{ color: "var(--primary)" }}
                    >
                      ${loan.maxLimit}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Loan Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Interest Rate */}
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "2px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--secondary)",
                    }}
                  >
                    <Percent
                      className="w-5 h-5"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h3
                    className="font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Interest Rate
                  </h3>
                </div>
                <p
                  className="text-2xl font-black"
                  style={{ color: "var(--secondary)" }}
                >
                  {loan.interestRate || "8% - 15%"}%
                </p>
              </div>

              {/* Available EMI Plans */}
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "2px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    <MoveDownRight
                      className="w-5 h-5"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h3
                    className="font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Available EMI Plans
                  </h3>
                </div>
                <p
                  className="text-2xl font-black"
                  style={{ color: "var(--secondary)" }}
                >
                  {loan.availableEMIPlans?.map((m, i) => {
                    if (i === 3) {
                      return <span key={m}>{m}m </span>;
                    }
                    return <span key={m}>{m}m, </span>;
                  })}
                </p>
              </div>
            </motion.div>

            {/* Full Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              <h2
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{ color: "var(--text-primary)" }}
              >
                <FileText
                  className="w-6 h-6"
                  style={{ color: "var(--primary)" }}
                />
                About This Loan
              </h2>

              <div className="space-y-6">
                {/* Introduction */}
                <div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Overview
                  </h3>
                  <p
                    className="leading-relaxed text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    At{" "}
                    <span
                      className="font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      SideBySide Loan
                    </span>
                    , we understand that financial needs can arise unexpectedly.
                    Whether you're looking to grow your business, fund your
                    education, renovate your home, or handle a medical
                    emergency, our loan programs are designed to provide quick,
                    transparent, and affordable financing solutions tailored to
                    your specific requirements.
                  </p>
                </div>

                {/* What Makes Us Different */}
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <h3
                    className="text-xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Shield
                      className="w-5 h-5"
                      style={{ color: "var(--success)" }}
                    />
                    What Makes Us Different
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{
                          backgroundColor: "var(--primary)",
                          opacity: 0.1,
                        }}
                      >
                        <CheckCircle
                          className="w-4 h-4"
                          style={{ color: "var(--primary)" }}
                        />
                      </div>
                      <div>
                        <h4
                          className="font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Lightning Fast Approval
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Get approved in as little as 2-4 hours with our
                          streamlined digital process
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{
                          backgroundColor: "var(--success)",
                          opacity: 0.1,
                        }}
                      >
                        <CheckCircle
                          className="w-4 h-4"
                          style={{ color: "var(--success)" }}
                        />
                      </div>
                      <div>
                        <h4
                          className="font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          No Hidden Charges
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Complete transparency with all fees disclosed upfront
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{
                          backgroundColor: "var(--secondary)",
                          opacity: 0.1,
                        }}
                      >
                        <CheckCircle
                          className="w-4 h-4"
                          style={{ color: "var(--secondary)" }}
                        />
                      </div>
                      <div>
                        <h4
                          className="font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Flexible Repayment
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Choose EMI plans that fit your cash flow and financial
                          situation
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{
                          backgroundColor: "var(--accent)",
                          opacity: 0.1,
                        }}
                      >
                        <CheckCircle
                          className="w-4 h-4"
                          style={{ color: "var(--accent)" }}
                        />
                      </div>
                      <div>
                        <h4
                          className="font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Minimal Documentation
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Simple paperwork with completely digital document
                          submission
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <div>
                  <h3
                    className="text-xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <User
                      className="w-5 h-5"
                      style={{ color: "var(--primary)" }}
                    />
                    Eligibility Criteria
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        Age: 18 years or above
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        Valid government-issued ID
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        Active bank account
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-4 rounded-lg"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        Proof of income or business
                      </span>
                    </div>
                  </div>
                </div>

                {/* How It Works */}
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(30, 58, 138, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <TrendingUp
                      className="w-5 h-5"
                      style={{ color: "var(--primary)" }}
                    />
                    Simple 4-Step Process
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: "01",
                        title: "Submit Application",
                        desc: "Fill our quick online form with your details and upload required documents",
                      },
                      {
                        step: "02",
                        title: "Instant Verification",
                        desc: "Our AI-powered system verifies your information in minutes",
                      },
                      {
                        step: "03",
                        title: "Get Approved",
                        desc: "Receive approval notification with loan terms and EMI schedule",
                      },
                      {
                        step: "04",
                        title: "Funds Disbursed",
                        desc: "Money transferred directly to your bank account within 24 hours",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-black"
                          style={{
                            backgroundColor: "var(--primary)",
                            color: "white",
                            fontSize: "14px",
                          }}
                        >
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h4
                            className="font-bold mb-1"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {item.title}
                          </h4>
                          <p
                            className="text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Important Information */}
                <div
                  className="p-6 rounded-xl border-2"
                  style={{
                    borderColor: "var(--accent)",
                    backgroundColor: "rgba(245, 158, 11, 0.05)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className="w-6 h-6 flex-shrink-0 mt-1"
                      style={{ color: "var(--accent)" }}
                    />
                    <div>
                      <h4
                        className="font-bold mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Important Information
                      </h4>
                      <ul
                        className="space-y-2 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Interest rates may vary based on your credit profile
                            and loan amount
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Late payment fees apply after 10-day grace period
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Zero prepayment penalties - pay off your loan early
                            without extra charges
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>
                            Subject to final approval based on verification and
                            credit assessment
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Why Choose SideBySide Loan */}
                <div>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Why Thousands Choose SideBySide Loan
                  </h3>
                  <div className="prose max-w-none">
                    <p
                      className="leading-relaxed mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Since our inception, we've helped over{" "}
                      <span
                        className="font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        50,000+ customers
                      </span>{" "}
                      achieve their financial goals with loans totaling more
                      than{" "}
                      <span
                        className="font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        $100 million
                      </span>
                      . Our commitment to transparency, speed, and customer
                      satisfaction has earned us a{" "}
                      <span
                        className="font-bold"
                        style={{ color: "var(--success)" }}
                      >
                        4.9/5 star rating
                      </span>
                      .
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      We believe financial support should be accessible to
                      everyone. That's why we've eliminated unnecessary barriers
                      and created a lending process that's fair, fast, and
                      focused on your success. Join our community of satisfied
                      borrowers and experience the SideBySide Loan difference
                      today.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="text-center p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <p
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Ready to Get Started?
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Apply now and get a decision in as little as 2 hours
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/all-loans")}
              className="flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--text-primary)",
                border: "2px solid var(--border)",
              }}
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Loans
            </motion.button>

            {/* Features/Benefits */}
            {loan.features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-2xl"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "2px solid var(--border)",
                }}
              >
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {loan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0 mt-1"
                        style={{ color: "var(--success)" }}
                      />
                      <span style={{ color: "var(--text-secondary)" }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Application Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-2xl sticky top-24"
              style={{
                background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)`,
              }}
            >
              <h3 className="text-2xl font-black text-white mb-6">
                Apply for This Loan
              </h3>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Approval Time</span>
                  </div>
                  <span className="font-bold">2-4 Hours</span>
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </div>
                  <span className="font-bold">100% Safe</span>
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Success Rate</span>
                  </div>
                  <span className="font-bold">98%</span>
                </div>
              </div>

              <div className="h-px bg-white opacity-20 my-6"></div>

              {/* Documents Required */}
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3">
                  Documents Required:
                </h4>
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Government ID (Passport/License)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Proof of Address
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Bank Statements (3 months)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Proof of Income
                  </li>
                </ul>
              </div>

              {/* Apply Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApplyNow}
                disabled={applying}
                className="w-full py-4 bg-white text-blue-900 font-black rounded-xl hover:shadow-2xl transition-all disabled:opacity-50"
              >
                {applying ? "Processing..." : "Apply Now"}
              </motion.button>

              <p className="text-white text-xs text-center mt-4 opacity-80">
                By applying, you agree to our Terms & Conditions
              </p>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-6 rounded-xl"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              <h4
                className="font-bold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Need Help?
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone
                    className="w-4 h-4"
                    style={{ color: "var(--primary)" }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail
                    className="w-4 h-4"
                    style={{ color: "var(--primary)" }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>
                    support@grameenloan.com
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
