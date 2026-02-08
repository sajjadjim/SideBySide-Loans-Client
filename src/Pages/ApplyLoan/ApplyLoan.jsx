// ApplyLoan.jsx
import axios from "axios";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  CreditCard,
  DollarSign,
  FileText,
  FileTextIcon,
  Loader,
  Mail,
  MapPin,
  MessageSquare,
  Percent,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const ApplyLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        setLoading(true);

        if (location.state?.loan) {
          setLoan(location.state.loan);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://grameen-loan-server.vercel.app/all-loans/${id}`
        );
        setLoan(response.data);
      } catch (error) {
        console.error("Error fetching loan:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load loan details",
        });
        navigate("/all-loans");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLoanDetails();
    }
  }, [id, location.state, navigate]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const applicationData = {
        // Auto-filled data (read-only)
        userEmail: user.email,
        loanId: loan._id,
        loanTitle: loan.loanTitle,
        interestRate: loan.interestRate || "8% - 15%",

        // User input data
        firstName: data.firstName,
        lastName: data.lastName,
        contactNumber: data.contactNumber,
        nationalId: data.nationalId,
        incomeSource: data.incomeSource,
        monthlyIncome: parseFloat(data.monthlyIncome),
        loanAmount: parseFloat(data.loanAmount),
        reasonForLoan: data.reasonForLoan,
        address: data.address,
        extraNotes: data.extraNotes || "",

        status: "Pending",
        applicationFeeStatus: "Unpaid",
        appliedAt: new Date(),

        // User info for reference
        userName: `${data.firstName} ${data.lastName}`,
        userPhoto: user.photoURL || "",
      };

      console.log("Submitting application:", applicationData);

      const response = await axios.post(
        "https://grameen-loan-server.vercel.app/loan-applications",
        applicationData
      );

      console.log("Application submitted:", response.data);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        html: `
          <p>Your loan application has been submitted successfully.</p>
          <p class="text-sm mt-2">Application ID: <strong>${response.data.insertedId}</strong></p>
          <p class="text-sm">Status: <strong>Pending Review</strong></p>
        `,
        confirmButtonText: "View My Applications",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/my-loans");
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      console.error("Error submitting application:", error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error.response?.data?.message ||
          "Failed to submit application. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div
      className="min-h-screen py-20 px-4 md:px-8"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: "var(--primary)"}}
          >
            <FileTextIcon className="w-4 h-4" style={{ color: "white" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "white" }}
            >
              Loan Application
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-black mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Apply for {loan?.loanTitle}
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Fill in the details below to submit your application
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 rounded-2xl space-y-8"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
          }}
        >
          {/* Auto-filled Section */}
          <div>
            <h2
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <Shield className="w-5 h-5" style={{ color: "var(--success)" }} />
              Loan Information (Auto-filled)
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {/* User Email */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 rounded-lg cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: "2px solid var(--border)",
                      color: "var(--text-primary)",
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>

              {/* Loan Title */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Loan Type
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    type="text"
                    value={loan?.loanTitle || ""}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 rounded-lg cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: "2px solid var(--border)",
                      color: "var(--text-primary)",
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Interest Rate
                </label>
                <div className="relative">
                  <Percent
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    type="text"
                    value={loan?.interestRate || "8% - 15%"}
                    readOnly
                    className="w-full pl-10 pr-4 py-3 rounded-lg cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: "2px solid var(--border)",
                      color: "var(--text-primary)",
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Personal Information */}
          <div>
            <h2
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <User className="w-5 h-5" style={{ color: "var(--primary)" }} />
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  First Name <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: `2px solid ${
                      errors.firstName ? "var(--error)" : "var(--border)"
                    }`,
                    color: "var(--text-primary)",
                  }}
                />
                {errors.firstName && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Last Name <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: `2px solid ${
                      errors.lastName ? "var(--error)" : "var(--border)"
                    }`,
                    color: "var(--text-primary)",
                  }}
                />
                {errors.lastName && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Contact Number{" "}
                  <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    {...register("contactNumber", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: `2px solid ${
                        errors.contactNumber ? "var(--error)" : "var(--border)"
                      }`,
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                {errors.contactNumber && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              {/* National ID */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  National ID / Passport{" "}
                  <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <div className="relative">
                  <CreditCard
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    {...register("nationalId", {
                      required: "ID is required",
                      minLength: {
                        value: 6,
                        message: "ID must be at least 6 characters",
                      },
                    })}
                    type="text"
                    placeholder="Enter ID number"
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: `2px solid ${
                        errors.nationalId ? "var(--error)" : "var(--border)"
                      }`,
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                {errors.nationalId && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.nationalId.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Financial Information */}
          <div>
            <h2
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <DollarSign
                className="w-5 h-5"
                style={{ color: "var(--success)" }}
              />
              Financial Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Income Source */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Income Source <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <select
                    {...register("incomeSource", {
                      required: "Please select income source",
                    })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none appearance-none cursor-pointer"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: `2px solid ${
                        errors.incomeSource ? "var(--error)" : "var(--border)"
                      }`,
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="">Select source</option>
                    <option value="Employment">Employed (Salary)</option>
                    <option value="Business">Business Owner</option>
                    <option value="Freelance">Freelancer</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Investment">Investment Income</option>
                    <option value="Pension">Pension/Retirement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.incomeSource && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.incomeSource.message}
                  </p>
                )}
              </div>

              {/* Monthly Income */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Monthly Income ($){" "}
                  <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    {...register("monthlyIncome", {
                      required: "Monthly income is required",
                      min: {
                        value: 500,
                        message: "Minimum income must be $500",
                      },
                    })}
                    type="number"
                    step="100"
                    placeholder="5000"
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: `2px solid ${
                        errors.monthlyIncome ? "var(--error)" : "var(--border)"
                      }`,
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                {errors.monthlyIncome && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.monthlyIncome.message}
                  </p>
                )}
              </div>

              {/* Loan Amount */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Requested Loan Amount ($){" "}
                  <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    {...register("loanAmount", {
                      required: "Loan amount is required",
                      min: {
                        value: 500,
                        message: "Minimum loan amount is $500",
                      },
                      max: {
                        value: 25000,
                        message: "Maximum loan amount is $25,000",
                      },
                    })}
                    type="number"
                    step="100"
                    placeholder="5000"
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: `2px solid ${
                        errors.loanAmount ? "var(--error)" : "var(--border)"
                      }`,
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                {errors.loanAmount && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.loanAmount.message}
                  </p>
                )}
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Max: {loan?.maxLoan || "$25,000"}
                </p>
              </div>

              {/* Reason for Loan */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Reason for Loan{" "}
                  <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <select
                    {...register("reasonForLoan", {
                      required: "Please select a reason",
                    })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none appearance-none cursor-pointer"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: `2px solid ${
                        errors.reasonForLoan ? "var(--error)" : "var(--border)"
                      }`,
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="">Select reason</option>
                    <option value="Business Expansion">
                      Business Expansion
                    </option>
                    <option value="Education">Education</option>
                    <option value="Home Renovation">Home Renovation</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Debt Consolidation">
                      Debt Consolidation
                    </option>
                    <option value="Wedding">Wedding</option>
                    <option value="Travel">Travel</option>
                    <option value="Vehicle Purchase">Vehicle Purchase</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.reasonForLoan && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.reasonForLoan.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Additional Information */}
          <div>
            <h2
              className="text-xl font-bold mb-4 flex items-center gap-2"
              style={{ color: "var(--text-primary)" }}
            >
              <MapPin
                className="w-5 h-5"
                style={{ color: "var(--secondary)" }}
              />
              Additional Information
            </h2>

            <div className="space-y-4">
              {/* Address */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Full Address <span style={{ color: "var(--error)" }}>*</span>
                </label>
                <textarea
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 10,
                      message: "Please provide complete address",
                    },
                  })}
                  rows="3"
                  placeholder="Enter your complete address"
                  className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: `2px solid ${
                      errors.address ? "var(--error)" : "var(--border)"
                    }`,
                    color: "var(--text-primary)",
                  }}
                />
                {errors.address && (
                  <p className="text-sm mt-1" style={{ color: "var(--error)" }}>
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Extra Notes */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Additional Notes (Optional)
                </label>
                <div className="relative">
                  <MessageSquare
                    className="absolute left-3 top-3 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <textarea
                    {...register("extraNotes")}
                    rows="4"
                    placeholder="Any additional information you'd like to share..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg outline-none resize-none"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: "2px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
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
                  Before You Submit
                </h4>
                <ul
                  className="space-y-1 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <li>
                    • All information provided must be accurate and truthful
                  </li>
                  <li>• You will be contacted for document verification</li>
                  <li>• Application review takes 2-4 business hours</li>
                  <li>• Approval is subject to credit and background checks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="flex-1 py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
              }}
            >
              {submitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={() => navigate(`/loan-details/${id}`)}
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl font-semibold"
              style={{
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                border: "2px solid var(--border)",
              }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ApplyLoan;
