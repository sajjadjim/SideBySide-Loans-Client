import axios from "axios";
import { motion } from "framer-motion";
import {
  AlertCircle,
  DollarSign,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Image as ImageIcon,
  Loader,
  Percent,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const ManageLoans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deleting, setDeleting] = useState(null);


  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://grameen-loan-server.vercel.app/all-loans");

      setLoans(response.data);
      setFilteredLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      toast.error("Failed to load loans");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load loans",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = loans;

    if (selectedCategory !== "All") {
      result = result.filter((loan) => loan.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(
        (loan) =>
          loan.loanTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loan.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loan.shortDescription
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLoans(result);
  }, [selectedCategory, searchQuery, loans]);

  const categories = ["All", ...new Set(loans.map((loan) => loan.category))];

  const handleEdit = (loanId) => {
    navigate(`/dashboard/update-loan/${loanId}`);
  };


  const handleDelete = (loan) => {
    Swal.fire({
      title: "Delete Loan?",
      html: `
        <p>Are you sure you want to delete <strong>"${loan.loanTitle}"</strong>?</p>
        <p class="text-sm text-red-600 mt-2">This action cannot be undone.</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          setDeleting(loan._id);

          await axios.delete(`https://grameen-loan-server.vercel.app/all-loans/${loan._id}`);

          setLoans(loans.filter((l) => l._id !== loan._id));

          return true;
        } catch (error) {
          console.error(" Error deleting loan:", error);
          Swal.showValidationMessage(
            `Delete failed: ${error.response?.data?.message || error.message}`
          );
          return false;
        } finally {
          setDeleting(null);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        toast.success("Loan deleted successfully!");
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${loan.loanTitle} has been deleted.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const toggleVisibility = async (loan) => {
    try {
      const newStatus = !loan.showOnHome;

      await axios.patch(`https://grameen-loan-server.vercel.app/all-loans/${loan._id}`, {
        showOnHome: newStatus,
      });

      setLoans(
        loans.map((l) =>
          l._id === loan._id ? { ...l, showOnHome: newStatus } : l
        )
      );

      toast.success(
        newStatus
          ? "Loan is now visible on homepage"
          : "Loan hidden from homepage"
      );
    } catch (error) {
      console.error("Error updating visibility:", error);
      toast.error("Failed to update visibility");
    }
  };

  const stats = {
    total: loans.length,
    visible: loans.filter((l) => l.showOnHome).length,
    hidden: loans.filter((l) => !l.showOnHome).length,
    categories: new Set(loans.map((l) => l.category)).size,
  };

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className="w-full overflow-x-hidden p-2 sm:p-4 md:p-6 lg:p-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-3 md:gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Manage Loans
          </h1>
          <p className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            View, edit, and manage all loan products
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard/add-loan")}
          className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-bold w-full md:w-auto justify-center"
          style={{
            backgroundColor: "var(--primary)",
            color: "white",
          }}
        >
          <Plus className="w-3 h-3 md:w-5 md:h-5" />
          Add New Loan
        </motion.button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6 mb-6 md:mb-8">
        {[
          {
            label: "Total Loans",
            value: stats.total,
            icon: DollarSign,
            color: "var(--primary)",
          },
          {
            label: "Visible on Home",
            value: stats.visible,
            icon: Eye,
            color: "var(--success)",
          },
          {
            label: "Hidden",
            value: stats.hidden,
            icon: EyeOff,
            color: "var(--text-secondary)",
          },
          {
            label: "Categories",
            value: stats.categories,
            icon: Filter,
            color: "var(--secondary)",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 sm:p-4 md:p-6 rounded-xl"
            style={{
              backgroundColor: "var(--surface)",
              border: "2px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
              <span
                className="text-xl sm:text-2xl md:text-3xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
            </div>
            <p
              className="text-xs sm:text-sm font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
            style={{ color: "var(--text-secondary)" }}
          />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 rounded-lg outline-none text-sm md:text-base"
            style={{
              backgroundColor: "var(--surface)",
              border: "2px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all whitespace-nowrap"
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? "var(--primary)"
                    : "var(--surface)",
                color:
                  selectedCategory === category
                    ? "white"
                    : "var(--text-primary)",
                border: "2px solid",
                borderColor:
                  selectedCategory === category
                    ? "var(--primary)"
                    : "var(--border)",
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="mb-3 md:mb-4 text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
        Showing {filteredLoans.length} of {loans.length} loans
      </p>

      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: "var(--surface)",
          border: "2px solid var(--border)",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead style={{ backgroundColor: "var(--bg)" }}>
              <tr>
                <th
                  className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Image
                </th>
                <th
                  className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Title
                </th>
                <th
                  className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Category
                </th>
                <th
                  className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base font-bold hidden lg:table-cell"
                  style={{ color: "var(--text-primary)" }}
                >
                  Interest Rate
                </th>
                <th
                  className="text-left p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Max Loan
                </th>
                <th
                  className="text-center p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Visibility
                </th>
                <th
                  className="text-center p-2 sm:p-3 md:p-4 text-xs sm:text-sm md:text-base font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-6 md:p-8">
                    <AlertCircle
                      className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 opacity-30"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <p className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
                      {loans.length === 0
                        ? "No loans created yet. Create your first loan!"
                        : "No loans match your search criteria"}
                    </p>
                    {loans.length === 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/dashboard/add-loan")}
                        className="mt-4 px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-semibold"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "white",
                        }}
                      >
                        Create First Loan
                      </motion.button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan, index) => (
                  <motion.tr
                    key={loan._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t hover:bg-opacity-5"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="p-2 sm:p-3 md:p-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-lg overflow-hidden"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        {loan.loanImage ? (
                          <img
                            src={loan.loanImage}
                            alt={loan.loanTitle}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center">
                                  <svg class="w-4 h-4 md:w-6 md:h-6" style="color: var(--text-secondary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                  </svg>
                                </div>
                              `;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon
                              className="w-4 h-4 md:w-6 md:h-6"
                              style={{ color: "var(--text-secondary)" }}
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="p-2 sm:p-3 md:p-4">
                      <p
                        className="font-bold text-xs sm:text-sm md:text-base"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {loan.loanTitle}
                      </p>
                      <p
                        className="text-xs sm:text-sm line-clamp-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {loan.shortDescription}
                      </p>
                    </td>

                    <td className="p-2 sm:p-3 md:p-4">
                      <span
                        className="px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "white",
                        }}
                      >
                        {loan.category}
                      </span>
                    </td>

                    <td className="p-2 sm:p-3 md:p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Percent
                          className="w-3 h-3 md:w-4 md:h-4"
                          style={{ color: "var(--secondary)" }}
                        />
                        <span
                          className="font-semibold text-xs sm:text-sm md:text-base"
                          style={{ color: "var(--secondary)" }}
                        >
                          {loan.interestRate}
                        </span>
                      </div>
                    </td>

                    <td className="p-2 sm:p-3 md:p-4">
                      <span
                        className="font-bold text-sm sm:text-base md:text-lg"
                        style={{ color: "var(--success)" }}
                      >
                        {loan.maxLimit}
                      </span>
                    </td>

                    <td className="p-2 sm:p-3 md:p-4">
                      <div className="flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleVisibility(loan)}
                          className="p-1.5 md:p-2 rounded-lg"
                          style={{
                            backgroundColor: loan.showOnHome
                              ? "var(--success)"
                              : "var(--text-secondary)",
                          }}
                          title={
                            loan.showOnHome
                              ? "Visible on Home"
                              : "Hidden from Home"
                          }
                        >
                          {loan.showOnHome ? (
                            <Eye
                              className="w-4 h-4 md:w-5 md:h-5"
                              style={{ color: "white" }}
                            />
                          ) : (
                            <EyeOff
                              className="w-4 h-4 md:w-5 md:h-5"
                              style={{ color: "white" }}
                            />
                          )}
                        </motion.button>
                      </div>
                    </td>

                    <td className="p-2 sm:p-3 md:p-4">
                      <div className="flex items-center justify-center gap-1.5 md:gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(loan._id)}
                          className="p-1.5 md:p-2 rounded-lg"
                          style={{
                            backgroundColor: "var(--primary)",
                          }}
                          title="Edit Loan"
                        >
                          <Edit
                            className="w-3 h-3 md:w-4 md:h-4"
                            style={{ color: "white" }}
                          />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(loan)}
                          disabled={deleting === loan._id}
                          className="p-1.5 md:p-2 rounded-lg disabled:opacity-50"
                          style={{
                            backgroundColor: "var(--error)",
                          }}
                          title="Delete Loan"
                        >
                          {deleting === loan._id ? (
                            <Loader
                              className="w-3 h-3 md:w-4 md:h-4 animate-spin"
                              style={{ color: "white" }}
                            />
                          ) : (
                            <Trash2
                              className="w-3 h-3 md:w-4 md:h-4"
                              style={{ color: "white" }}
                            />
                          )}
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

      {loans.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 md:mt-8 text-center p-8 md:p-12 rounded-2xl"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px dashed var(--border)",
          }}
        >
          <DollarSign
            className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 opacity-30"
            style={{ color: "var(--primary)" }}
          />
          <h3
            className="text-xl md:text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            No Loans Created Yet
          </h3>
          <p className="mb-4 md:mb-6 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            Start by creating your first loan product
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard/add-loan")}
            className="btn-primary px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
            Create First Loan
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ManageLoans;