// ApprovedLoans.jsx
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Eye,
  FileText,
  Loader,
  Mail,
  Phone,
  Search,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const ApprovedLoans = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://grameen-loan-server.vercel.app/loan-applications"
      );

      // Filter only approved applications
      const approvedApps = response.data.filter(
        (app) => app.status === "Approved"
      );

      // Sort by approved date (newest first)
      approvedApps.sort(
        (a, b) => new Date(b.approvedAt) - new Date(a.approvedAt)
      );

      console.log("✅ Approved applications:", approvedApps);
      setApplications(approvedApps);
      setFilteredApplications(approvedApps);
    } catch (error) {
      console.error("❌ Error fetching applications:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load approved applications",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = applications;

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (app) =>
          app.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.loanTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== "All") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      result = result.filter((app) => {
        const approvedDate = new Date(app.approvedAt);

        switch (dateFilter) {
          case "Today":
            return approvedDate >= today;
          case "This Week":
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return approvedDate >= weekAgo;
          case "This Month":
            return (
              approvedDate.getMonth() === now.getMonth() &&
              approvedDate.getFullYear() === now.getFullYear()
            );
          default:
            return true;
        }
      });
    }

    setFilteredApplications(result);
  }, [searchQuery, dateFilter, applications]);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  // ========== EXPORT TO CSV ==========
  const handleExport = () => {
    if (filteredApplications.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Data",
        text: "No approved applications to export",
      });
      return;
    }

    const csvContent = [
      // Headers
      [
        "Loan ID",
        "Name",
        "Email",
        "Loan Type",
        "Amount",
        "Approved Date",
        "Approved By",
      ].join(","),
      // Data rows
      ...filteredApplications.map((app) =>
        [
          app._id,
          `${app.firstName} ${app.lastName}`,
          app.userEmail,
          app.loanTitle,
          app.loanAmount,
          new Date(app.approvedAt).toLocaleDateString(),
          app.approvedBy || "Manager",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `approved-loans-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    Swal.fire({
      icon: "success",
      title: "Exported!",
      text: "Approved loans exported successfully",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const stats = {
    totalApproved: applications.length,
    totalAmount: applications.reduce(
      (sum, app) => sum + (app.loanAmount || 0),
      0
    ),
    todayApproved: applications.filter((app) => {
      const today = new Date().toDateString();
      return new Date(app.approvedAt).toDateString() === today;
    }).length,
    thisMonthApproved: applications.filter((app) => {
      const now = new Date();
      const approvedDate = new Date(app.approvedAt);
      return (
        approvedDate.getMonth() === now.getMonth() &&
        approvedDate.getFullYear() === now.getFullYear()
      );
    }).length,
  };

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1
            className="text-3xl md:text-4xl font-black mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Approved Loan Applications
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            View and manage all approved loans
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
          style={{
            backgroundColor: "var(--success)",
            color: "white",
          }}
        >
          <Download className="w-5 h-5" />
          Export to CSV
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Approved",
            value: stats.totalApproved,
            icon: CheckCircle,
            color: "var(--success)",
          },
          {
            label: "Total Amount Disbursed",
            value: `$${stats.totalAmount.toLocaleString()}`,
            icon: DollarSign,
            color: "var(--primary)",
          },
          {
            label: "Approved Today",
            value: stats.todayApproved,
            icon: Clock,
            color: "var(--accent)",
          },
          {
            label: "This Month",
            value: stats.thisMonthApproved,
            icon: TrendingUp,
            color: "var(--secondary)",
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

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
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

        {/* Date Filter */}
        <div className="flex gap-2">
          {["All", "Today", "This Week", "This Month"].map((filter) => (
            <button
              key={filter}
              onClick={() => setDateFilter(filter)}
              className="px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap"
              style={{
                backgroundColor:
                  dateFilter === filter ? "var(--primary)" : "var(--surface)",
                color: dateFilter === filter ? "white" : "var(--text-primary)",
                border: "2px solid",
                borderColor:
                  dateFilter === filter ? "var(--primary)" : "var(--border)",
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
        Showing {filteredApplications.length} of {applications.length} approved
        applications
      </p>

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
                  Approved Date
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Approved By
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
                  <td colSpan="7" className="text-center p-8">
                    <CheckCircle
                      className="w-12 h-12 mx-auto mb-4 opacity-30"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <p style={{ color: "var(--text-secondary)" }}>
                      {applications.length === 0
                        ? "No approved applications yet"
                        : "No applications match your filters"}
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

                    {/* Approved Date */}
                    <td className="p-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar
                            className="w-4 h-4"
                            style={{ color: "var(--success)" }}
                          />
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {new Date(
                              application.approvedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {new Date(
                            application.approvedAt
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </td>

                    {/* Approved By */}
                    <td className="p-4">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--Primary)" }}
                      >
                        {application.approvedBy || "Manager"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleViewDetails(application)}
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: "var(--success)",
                          }}
                          title="View Details"
                        >
                          <Eye
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
              {/* details modal */}
              <div className="flex mt-20 items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--success)", opacity: 0.1 }}
                  >
                    <CheckCircle
                      className="w-6 h-6"
                      style={{ color: "var(--success)" }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-black"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Approved Application
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Approved on{" "}
                      {new Date(
                        selectedApplication.approvedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
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
                        Approved Amount
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
                        Purpose
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

                {/* Timeline */}
                <div
                  className="p-6 rounded-xl"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <h4
                    className="text-lg font-bold mb-4"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Application Timeline
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                      <div className="flex-1">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Applied
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {new Date(
                            selectedApplication.appliedAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "var(--success)" }}
                      />
                      <div className="flex-1">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Approved by{" "}
                          {selectedApplication.approvedBy || "Manager"}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {new Date(
                            selectedApplication.approvedAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 rounded-xl font-bold"
                  style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text-primary)",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApprovedLoans;
