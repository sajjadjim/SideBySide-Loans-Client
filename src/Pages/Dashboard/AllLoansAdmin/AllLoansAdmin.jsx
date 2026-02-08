// AllLoansAdmin.jsx
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Edit2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader,
  Plus,
  Search,
  Trash2Icon,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const AllLoansAdmin = () => {

  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();




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
          loan.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLoans(result);
  }, [selectedCategory, searchQuery, loans]);

  // CATEGORIES
  const categories = ["All", ...new Set(loans.map((loan) => loan.category))];


   //- edit mode 
  const handleEdit = (loan) => {
    
    navigate(`/dashboard/update-loan/${loan._id}`);
  };

   

  // delete loan 
  const handleDelete = (loan) => {
    Swal.fire({
      title: "Delete Loan?",
      text: `Are you sure you want to delete "${loan.loanTitle}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "var(--error)",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://grameen-loan-server.vercel.app/all-loans/${loan._id}`);

          setLoans(loans.filter((l) => l._id !== loan._id));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Loan deleted successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Could not delete loan",
          });
        }
      }
    });
  };

  const toggleShowOnHome = async (loan) => {
    try {
      const newStatus = !loan.showOnHome;

      await axios.patch(`https://grameen-loan-server.vercel.app/all-loans/${loan._id}`, {
        showOnHome: newStatus,
      });

      setLoans(prevLoans =>
        prevLoans.map((l) =>
          l._id === loan._id 
      ? { ...l, showOnHome: newStatus }
       : l
        )
      );

      Swal.fire({
        icon: "success",
        title: newStatus ? "Added to Home" : "Removed from Home",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update loan visibility",
      });
    }
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
            Manage All Loans
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Create, edit, and manage loan products
          </p>
        </div>


      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Loans",
            value: loans.length,
            color: "var(--primary)",
          },
          {
            label: "On Homepage",
            value: loans.filter((l) => l.showOnHome).length,
            color: "var(--success)",
          },
          {
            label: "Categories",
            value: new Set(loans.map((l) => l.category)).size,
            color: "var(--secondary)",
          },
          {
            label: "Hidden",
            value: loans.filter((l) => !l.showOnHome).length,
            color: "var(--text-third)",
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
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {stat.label}
            </p>
            <p className="text-3xl font-black" style={{ color: stat.color }}>
              {stat.value}
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
            placeholder="Search loans..."
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

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-lg font-semibold transition-all"
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
            </button>
          ))}
        </div>
      </div>

      {/* Loans Table */}
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
                  Image
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Title
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Interest
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Category
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Max Loan
                </th>
                <th
                  className="text-center p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Show on Home
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
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-8">
                    <AlertCircle
                      className="w-12 h-12 mx-auto mb-4 opacity-30"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <p style={{ color: "var(--text-secondary)" }}>
                      No loans found
                    </p>
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
                    {/* Image */}
                    <td className="p-4">
                      <div
                        className="w-16 h-16 rounded-lg overflow-hidden"
                        style={{ backgroundColor: "var(--bg)" }}
                      >
                        {loan.loanImage ? (
                          <img
                            src={loan.loanImage}
                            alt={loan.loanTitle}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon
                              className="w-6 h-6"
                              style={{ color: "var(--text-secondary)" }}
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title */}
                    <td className="p-4">
                      <p
                        className="font-bold"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {loan.loanTitle}
                      </p>
                      <p
                        className="text-sm line-clamp-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {loan.shortDescription}
                      </p>
                    </td>

                    {/* Interest */}
                    <td className="p-4">
                      <span
                        className="font-semibold"
                        style={{ color: "var(--secondary)" }}
                      >
                        {loan.interestRate}%
                      </span>
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          color: "var(--text-secondary)" }}
                      >
                        {loan.category}
                      </span>
                    </td>

                    {/* Max Loan */}
                    <td className="p-4">
                      <span
                        className="font-bold"
                        style={{ color: "var(--success)" }}
                      >
                        ${loan.maxLimit}
                      </span>
                    </td>

                    {/* Show on Home Toggle */}
                    <td className="p-4">
                      <div className="flex justify-center text-center items-center">
                        <button
                    
                          onClick={() => toggleShowOnHome(loan)}
                          className="p-2 rounded-lg"
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
                              className="w-5 h-5"
                              style={{ color: "white" }}
                            />
                          ) : (
                            <EyeOff
                              className="w-5 h-5"
                              style={{ color: "white" }}
                            />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(loan)}
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
                          onClick={() => handleDelete(loan)}
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
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

     
    </div>
  );
};

export default AllLoansAdmin;
