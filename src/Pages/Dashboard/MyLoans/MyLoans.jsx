// MyApplications.jsx
import axios from "axios";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  DollarSign,
  Edit2,
  Eye,
  FileText,
  Loader,
  Percent,
  Rotate3D,
  Search,
  SquaresIntersectIcon,
  Trash2Icon,
  XCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const MyLoans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [paymentDetails, setPaymentDetails] = useState(null);
const [loadingPayment, setLoadingPayment] = useState(false);

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
          `https://grameen-loan-server.vercel.app/loan-applications/user/${user.email}`
        );

        setApplications(response.data);
        setFilteredApplications(response.data);
      } catch (err) {
        console.error("Error fetching applications:", err);
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

  const handleDelete = async (application) => {
    if (application.status === "Approved") {
      Swal.fire({
        icon: "error",
        title: "Cannot Delete",
        text: "Approved applications cannot be deleted. Please contact support if needed.",
        confirmButtonColor: "var(--error)",
      });
      return;
    }

    //  DELETE FOR PENDING APPLICATIONS
    Swal.fire({
      title: "Delete Application?",
      text: `Are you sure you want to delete "${application.loanTitle}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "var(--error)",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://grameen-loan-server.vercel.app/loan-applications/${application._id}`
          );

          setApplications(
            applications.filter((a) => a._id !== application._id)
          );
          setFilteredApplications(
            filteredApplications.filter((a) => a._id !== application._id)
          );

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Application deleted successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text:
              error.response?.data?.message || "Could not delete application",
          });
        }
      }
    });
  };




  const handleViewPayment = async (applicationId) => {
    try {
      setLoadingPayment(true);
      setShowPaymentModal(true);
      
      const response = await axios.get(`https://grameen-loan-server.vercel.app/payment-details/${applicationId}`);
      setPaymentDetails(response.data);
      
    } catch (error) {
      console.error("Error fetching payment:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not load payment details",
      });
      setShowPaymentModal(false);
    } finally {
      setLoadingPayment(false);
    }
  };





  // view details
  const handleViewDetails = (
    applicationId,
    status,
    userEmail,
    monthlyIncome,
    contactNumber,
    interestRate
  ) => {
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
    return <Loading />;
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
      className="min-h-screen py-20 px-4 md:px-8"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            My Applications
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Track and manage your loan applications
          </p>
        </motion.div>

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
                          Id: {application._id}{" "}
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
                            <Percent
                              className="w-4 h-4"
                              style={{ color: "var(--success)" }}
                            />
                            <span style={{ color: "var(--text-secondary)" }}>
                              Interest:{" "}
                              <strong style={{ color: "var(--text-primary)" }}>
                                ${application.interestRate?.toLocaleString()}
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
                    {getStatusBadge(application.approvedAt)}

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          // onClick={() => handleEdit(application)}
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: "var(--accent)",
                          }}
                          title="Edit"
                        >
                          <Edit2
                            className="w-4 h-4"
                            style={{ color: "var(--text-third)" }}
                          />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(application)}
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: "var(--error)",
                          }}
                          title="Delete"
                        >
                          <Trash2Icon
                            className="w-4 h-4"
                            style={{ color: "var(--text-third)" }}
                          />
                        </motion.button>

                        {application?.paymentStatus === "Paid" ? (
                          // PAID STATE - Disabled/Badge Style
                          <button
    onClick={() => handleViewPayment(application._id)}
    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90 cursor-pointer"
    style={{
      backgroundColor: "var(--success)",
      color: "white",
    }}
    title="Click to view payment details"
  >
    <CheckCircle2 className="w-4 h-4" />
    Paid
  </button>
) : (
                          // UNPAID STATE 
                          <Link to={`/dashboard/payment/${application._id}`}>
                            <button
                              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:opacity-90"
                              style={{
                                backgroundColor: "var(--success)",
                                color: "white",
                              }}
                            >
                              <CircleDollarSign className="w-4 h-4" />
                              Pay ${application?.cost || "10"}
                            </button>
                          </Link>
                        )}
                      </div>
                    </td>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    {getStatusBadge(application.status)}

                    <button
                      onClick={() =>
                        handleViewDetails(
                          application._id,
                          application.status,
                          application.userEmail,
                          application.monthlyIncome,
                          application.contactNumber,
                          application.interestRate
                        )
                      }
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
     {/* Payment Details Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: "var(--surface)" }}
            >
              {/* Header */}
              <div
                className="p-6 text-white"
                style={{ backgroundColor: "var(--success)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={32} />
                    <h2 className="text-2xl font-bold">Payment Details</h2>
                  </div>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="hover:bg-white/20 p-2 rounded-lg transition"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {loadingPayment ? (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <Loader
                      className="animate-spin"
                      size={48}
                      style={{ color: "var(--primary)" }}
                    />
                    <p style={{ color: "var(--text-secondary)" }}>
                      Loading payment details...
                    </p>
                  </div>
                ) : paymentDetails ? (
                  <div className="space-y-4">
                    {/* Payment Status */}
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: "rgba(5, 150, 105, 0.1)",
                      }}
                    >
                      <p
                        className="text-sm"
                        style={{ color: "var(--success)" }}
                      >
                        Payment Status
                      </p>
                      <p
                        className="text-xl font-bold"
                        style={{ color: "var(--success)" }}
                      >
                        ✓ {paymentDetails.paymentStatus || "Paid"}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-3">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Email
                        </p>
                        <p
                          className="font-mono text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {paymentDetails.customer_email || "N/A"}
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Transaction ID
                        </p>
                        <p
                          className="font-mono text-sm break-all"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {paymentDetails.transactionId || "N/A"}
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Application ID
                        </p>
                        <p
                          className="font-mono text-sm break-all"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {paymentDetails.applicationId || "N/A"}
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Tracking ID
                        </p>
                        <p
                          className="font-mono text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {paymentDetails.trackingId || "N/A"}
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Amount Paid
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "var(--primary)" }}
                        >
                          ${paymentDetails.amount || "0"}
                        </p>
                      </div>

                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        <p
                          className="text-xs font-semibold mb-1"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Payment Date
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {paymentDetails.paidAt
                            ? new Date(paymentDetails.paidAt).toLocaleString()
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p
                    className="text-center py-8"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    No payment details found
                  </p>
                )}
              </div>

              {/* Footer */}
              <div
                className="p-6 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-full py-3 rounded-lg font-bold transition"
                  style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text-primary)",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </div>
  );
};


export default MyLoans;
