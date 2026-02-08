// MyApplications.jsx
import axios from "axios";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  CircleDollarSign,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Loader,
  Search,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const LoanApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.email) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setError(null);


        const response = await axios.get(
          `https://grameen-loan-server.vercel.app/loan-applications`
        );

        setApplications(response.data);
        setFilteredApplications(response.data);
      } catch (err) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, navigate]);

  useEffect(() => {
    let result = applications;

    // Filter by status
    if (selectedStatus !== "All") {
      result = result.filter((app) => app.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (app) =>
          app.loanTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApplications(result);
  }, [selectedStatus, searchQuery, applications]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: {
        icon: Clock,
        color: "var(--accent)",
        bg: "rgba(245, 158, 11, 0.1)",
      },
      Approved: {
        icon: CheckCircle,
        color: "var(--success)",
        bg: "rgba(5, 150, 105, 0.1)",
      },
      Rejected: {
        icon: XCircle,
        color: "var(--error)",
        bg: "rgba(220, 38, 38, 0.1)",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const Icon = config.icon;

    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
        style={{ backgroundColor: config.bg }}
      >
        <Icon className="w-4 h-4" style={{ color: config.color }} />
        <span className="text-sm font-semibold" style={{ color: config.color }}>
          {status}
        </span>
      </div>
    );
  };

  const handleViewDetails = (applicationId, status, userEmail, monthlyIncome, contactNumber, interestRate) => {
    
    Swal.fire({
      title: "Application Details",
      html: `
        <div class="text-left">
         <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>monthlyIncome:</strong> ${monthlyIncome}</p>
            <p><strong>Contact:</strong> ${contactNumber}</p>
            <p><strong>Interest Rate:</strong> ${interestRate}</p>
        </div>
      `,
      confirmButtonText: "Close",
    });
  };

  if (loading) {
    return (
     <Loading/>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="text-center max-w-md p-8">
          <AlertCircle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "var(--error)" }}
          />
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {error}
          </h3>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-2 mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-4 px-4 md:px-8"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
         
          className="mb-8"
        >
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            All Loan Applications
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Track and manage your loan applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Applications",
              value: applications.length,
              icon: FileText,
              color: "var(--primary)",
            },
            {
              label: "Pending",
              value: applications.filter((a) => a.status === "Pending").length,
              icon: Clock,
              color: "var(--accent)",
            },
            {
              label: "Approved",
              value: applications.filter((a) => a.status === "Approved").length,
              icon: CheckCircle,
              color: "var(--success)",
            },
            {
              label: "Rejected",
              value: applications.filter((a) => a.status === "Rejected").length,
              icon: XCircle,
              color: "var(--error)",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                <span
                  className="text-3xl font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--text-secondary)" }}
            />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg outline-none"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {["All", "Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor:
                    selectedStatus === status
                      ? "var(--primary)"
                      : "var(--surface)",
                  color:
                    selectedStatus === status ? "white" : "var(--text-primary)",
                  border: "2px solid",
                  borderColor:
                    selectedStatus === status
                      ? "var(--primary)"
                      : "var(--border)",
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 rounded-2xl"
            style={{
              backgroundColor: "var(--surface)",
              border: "2px solid var(--border)",
            }}
          >
            <FileText
              className="w-16 h-16 mx-auto mb-4 opacity-30"
              style={{ color: "var(--text-secondary)" }}
            />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              No Applications Found
            </h3>
            <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
              {applications.length === 0
                ? "You haven't applied for any loans yet"
                : "No applications match your filters"}
            </p>
            <button
              onClick={() => navigate("/all-loans")}
              className="btn-primary px-6 py-2"
            >
              Browse Loans
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application, index) => (
              <motion.div
                key={application._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "2px solid var(--border)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Application Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: "var(--primary)",
                        }}
                      >
                        <FileText
                          className="w-6 h-6"
                          style={{ color: "white" }}
                        />
                      </div>

                      <div className="flex-1">
                        <h3
                          className="text-xl font-bold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {application.loanTitle}
                        </h3>
                        <p
                          className="text-sm mb-3"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Applied by: {application.firstName}{" "}
                          {application.lastName}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign
                              className="w-4 h-4"
                              style={{ color: "var(--success)" }}
                            />
                            <span style={{ color: "var(--text-secondary)" }}>
                              Amount:{" "}
                              <strong style={{ color: "var(--text-primary)" }}>
                                ${application.loanAmount?.toLocaleString()}
                              </strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar
                              className="w-4 h-4"
                              style={{ color: "var(--primary)" }}
                            />
                            <span style={{ color: "var(--text-secondary)" }}>
                              {new Date(
                                application.appliedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    {getStatusBadge(application.status)}


                    <button
                      onClick={() => handleViewDetails(application._id, application.status, application.userEmail,  application.monthlyIncome, application.contactNumber, application.interestRate)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all"
                      style={{
                        backgroundColor: "var(--primary)",
                        color: "white",
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanApplications;
