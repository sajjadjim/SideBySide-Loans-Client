import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Loader,
  Mail,
  MapPin,
  Phone,
  Search,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const PendingLoans = () => {

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://grameen-loan-server.vercel.app/loan-applications"
      );

      // Filter only pending applications
      const pendingApps = response.data.filter(
        (app) => app.status === "Pending"
      );

      setApplications(pendingApps);
      setFilteredApplications(pendingApps);
    } catch (error) {
      console.error("Error fetching applications:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load applications",
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (searchQuery) {
      const filtered = applications.filter(
        (app) =>
          app.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.loanTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications(applications);
    }
  }, [searchQuery, applications]);

  const handleApprove = (application) => {
    Swal.fire({
      title: "Approve Loan?",
      html: `
        <p>Approve loan application for <strong>${application.firstName} ${
        application.lastName
      }</strong>?</p>
        <p class="text-sm mt-2">Amount: <strong>$${application.loanAmount?.toLocaleString()}</strong></p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      confirmButtonColor: "var(--success)",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setProcessing(true);

          await axios.patch(
            `https://grameen-loan-server.vercel.app/loan-applications/${application._id}`,
            {
              status: "Approved",
              approvedAt: new Date(),
              approvedBy: "Admin",
            }
          );

          // Remove from pending list
          setApplications(
            applications.filter((app) => app._id !== application._id)
          );

          Swal.fire({
            icon: "success",
            title: "Approved!",
            text: "Loan application has been approved",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error approving application:", error);
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Could not approve application",
          });
        } finally {
          setProcessing(false);
        }
      }
    });
  };

// reject application 
  const handleReject = (application) => {
    Swal.fire({
      title: "Reject Loan?",
      html: `
        <p>Are you sure you want to reject this loan application?</p>
        <textarea id="rejection-reason" class="w-full mt-4 p-3 border rounded" placeholder="Reason for rejection (optional)"></textarea>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      confirmButtonColor: "var(--error)",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reason = document.getElementById("rejection-reason").value;
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setProcessing(true);

          await axios.patch(
            `https://grameen-loan-server.vercel.app/loan-applications/${application._id}`,
            {
              status: "Rejected",
              rejectedAt: new Date(),
              rejectedBy: "Admin",
              rejectionReason: result.value || "No reason provided",
            }
          );

          // Remove from pending list
          setApplications(
            applications.filter((app) => app._id !== application._id)
          );

          Swal.fire({
            icon: "success",
            title: "Rejected",
            text: "Loan application has been rejected",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error rejecting application:", error);
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Could not reject application",
          });
        } finally {
          setProcessing(false);
        }
      }
    });
  };


  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };


  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-black mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Pending Loan Applications
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Review and approve/reject loan applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: "Total Pending",
            value: applications.length,
            icon: Clock,
            color: "var(--accent)",
          },
          {
            label: "Total Amount Requested",
            value: `$${applications
              .reduce((sum, app) => sum + (app.loanAmount || 0), 0)
              .toLocaleString()}`,
            icon: DollarSign,
            color: "var(--primary)",
          },
          {
            label: "Today's Applications",
            value: applications.filter((app) => {
              const today = new Date().toDateString();
              return new Date(app.appliedAt).toDateString() === today;
            }).length,
            icon: Calendar,
            color: "var(--success)",
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
                className="text-2xl font-black"
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

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: "var(--text-secondary)" }}
          />
          <input
            type="text"
            placeholder="Search by name, email, or loan type..."
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
      </div>

      {/* Applications Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: "var(--surface)",
          border: "2px solid var(--border)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "var(--bg)" }}>
              <tr>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Loan ID
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  User Info
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Loan Type
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Amount
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Date Applied
                </th>
                <th
                  className="text-center p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8">
                    <AlertCircle
                      className="w-12 h-12 mx-auto mb-4 opacity-30"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <p style={{ color: "var(--text-secondary)" }}>
                      {applications.length === 0
                        ? "No pending applications"
                        : "No applications match your search"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application, index) => (
                  <motion.tr
                    key={application._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t hover:bg-opacity-5"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {/* Loan ID */}
                    <td className="p-4">
                      <span
                        className="font-mono text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        #{application._id.slice(-8).toUpperCase()}
                      </span>
                    </td>

                    {/* User Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            application.userPhoto ||
                            "https://via.placeholder.com/40"
                          }
                          alt={application.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p
                            className="font-bold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {application.firstName} {application.lastName}
                          </p>
                          <p
                            className="text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {application.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Loan Type */}
                    <td className="p-4">
                      <span
                        className=" py-1 rounded-full text-sm font-semibold"
                        style={{
                          // backgroundColor: "var(--success)",
                          // opacity: 0.1,
                          color: "var(--secondary)",
                        }}
                      >
                        {application.loanTitle}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="p-4">
                      <span
                        className="text-lg font-black"
                        style={{ color: "var(--success)" }}
                      >
                        ${application.loanAmount?.toLocaleString()}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar
                          className="w-4 h-4"
                          style={{ color: "var(--text-secondary)" }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className=" px-1 flex items-center justify-center gap-2">
                        {/* View Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleViewDetails(application)}
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: "var(--primary)",
                          }}
                          title="View Details"
                        >
                          <Eye
                            className="w-4 h-4"
                            style={{ color: "white" }}
                          />
                        </motion.button>

                        {/* Approve Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleApprove(application)}
                          disabled={processing}
                          className="p-2 rounded-lg disabled:opacity-50"
                          style={{
                            backgroundColor: "var(--success)",
                          }}
                          title="Approve"
                        >
                          <CheckCircle
                            className="w-4 h-4"
                            style={{ color: "white" }}
                          />
                        </motion.button>

                        {/* Reject Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReject(application)}
                          disabled={processing}
                          className="p-2 rounded-lg disabled:opacity-50"
                          style={{
                            backgroundColor: "var(--error)",
                          }}
                          title="Reject"
                        >
                          <XCircle
                            className="w-4 h-4"
                            style={{ color: "white" }}
                          />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showModal && selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl p-8 rounded-2xl my-8"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-2xl font-black"
                  style={{ color: "var(--text-primary)" }}
                >
                  Application Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: "var(--text-primary)" }}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Applicant Info */}
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <h4
                    className="text-lg font-bold mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Applicant Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User
                        className="w-5 h-5"
                        style={{ color: "var(--primary)" }}
                      />
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Full Name
                        </p>
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedApplication.firstName}{" "}
                          {selectedApplication.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail
                        className="w-5 h-5"
                        style={{ color: "var(--primary)" }}
                      />
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Email
                        </p>
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedApplication.userEmail}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone
                        className="w-5 h-5"
                        style={{ color: "var(--primary)" }}
                      />
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Contact
                        </p>
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedApplication.contactNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText
                        className="w-5 h-5"
                        style={{ color: "var(--primary)" }}
                      />
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          National ID
                        </p>
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedApplication.nationalId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loan Details */}
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <h4
                    className="text-lg font-bold mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Loan Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Loan Type
                      </p>
                      <p
                        className="font-bold text-lg"
                        style={{ color: "var(--primary)" }}
                      >
                        {selectedApplication.loanTitle}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Requested Amount
                      </p>
                      <p
                        className="font-black text-2xl"
                        style={{ color: "var(--success)" }}
                      >
                        ${selectedApplication.loanAmount?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Interest Rate
                      </p>
                      <p
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedApplication.interestRate}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-sm mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Reason
                      </p>
                      <p
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedApplication.reasonForLoan}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Info */}
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <h4
                    className="text-lg font-bold mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Financial Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Briefcase
                        className="w-5 h-5"
                        style={{ color: "var(--success)" }}
                      />
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Income Source
                        </p>
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {selectedApplication.incomeSource}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign
                        className="w-5 h-5"
                        style={{ color: "var(--success)" }}
                      />
                      <div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Monthly Income
                        </p>
                        <p
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          ${selectedApplication.monthlyIncome?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 mt-1"
                      style={{ color: "var(--primary)" }}
                    />
                    <div className="flex-1">
                      <p
                        className="text-sm mb-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Address
                      </p>
                      <p style={{ color: "var(--text-primary)" }}>
                        {selectedApplication.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Extra Notes */}
                {selectedApplication.extraNotes && (
                  <div
                    className="p-6 rounded-xl"
                    style={{ backgroundColor: "var(--bg)" }}
                  >
                    <p
                      className="text-sm mb-2 font-semibold"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Additional Notes:
                    </p>
                    <p style={{ color: "var(--text-primary)" }}>
                      {selectedApplication.extraNotes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleApprove(selectedApplication);
                    }}
                    className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "var(--success)",
                      color: "white",
                    }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Loan
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleReject(selectedApplication);
                    }}
                    className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--error)", color: "white" }}
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Loan
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingLoans;
