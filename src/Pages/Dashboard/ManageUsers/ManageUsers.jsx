// ManageUsers.jsx
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader,
  Search,
  Shield,
  Trash2,
  UserCheck,
  Users,
  UserX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const ManageUsers = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("https://grameen-loan-server.vercel.app/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error(" Error fetching users:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load users",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = users;

    if (selectedRole !== "All") {
      result = result.filter((u) => u.role === selectedRole);
    }

    if (selectedStatus !== "All") {
      result = result.filter((u) => u.status === selectedStatus);
    }

    if (searchQuery) {
      result = result.filter(
        (u) =>
          u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(result);

    // PAGINATION 2

    setCurrentPage(1);
  }, [selectedRole, selectedStatus, searchQuery, users]);

  //  PAGINATION 3
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = filteredUsers.slice(firstIndex, lastIndex);

  // PAGINATION 4
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (userData) => {
    setSelectedUser({
      ...userData,
      newRole: userData.role,
      newStatus: userData.status || "active",
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      setUpdating(true);

      const updateData = {
        role: selectedUser.newRole,
        status: selectedUser.newStatus,
        updatedAt: new Date(),
      };

      await axios.patch(
        `https://grameen-loan-server.vercel.app/users/${selectedUser.email}`,
        updateData
      );

      setUsers(
        users.map((u) =>
          u.email === selectedUser.email ? { ...u, ...updateData } : u
        )
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `User role updated to ${selectedUser.newRole}`,
        timer: 2000,
        showConfirmButton: false,
      });

      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Failed to update user",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSuspend = (userData) => {
    Swal.fire({
      title: "Suspend User?",
      text: `Are you sure you want to suspend ${userData.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend",
      confirmButtonColor: "var(--error)",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`https://grameen-loan-server.vercel.app/users/${userData.email}`, {
            status: "suspended",
            updatedAt: new Date(),
          });

          setUsers(
            users.map((u) =>
              u.email === userData.email ? { ...u, status: "suspended" } : u
            )
          );

          Swal.fire({
            icon: "success",
            title: "Suspended!",
            text: "User has been suspended",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Could not suspend user",
          });
        }
      }
    });
  };

  const handleActivate = async (userData) => {
    try {
      await axios.patch(`https://grameen-loan-server.vercel.app/users/${userData.email}`, {
        status: "active",
        updatedAt: new Date(),
      });

      setUsers(
        users.map((u) =>
          u.email === userData.email ? { ...u, status: "active" } : u
        )
      );

      Swal.fire({
        icon: "success",
        title: "Activated!",
        text: "User has been activated",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not activate user",
      });
    }
  };

  const handleDelete = (userData) => {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${userData.name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "var(--error)",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://grameen-loan-server.vercel.app/users/${userData.email}`);

          setUsers(users.filter((u) => u.email !== userData.email));

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "User has been deleted",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Could not delete user",
          });
        }
      }
    });
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: {
        color: "var(--error)",
        bg: "rgba(220, 38, 38, 0.1)",
        icon: Shield,
      },
      manager: {
        color: "var(--primary)",
        bg: "rgba(30, 58, 138, 0.1)",
        icon: UserCheck,
      },
      user: {
        color: "var(--text-secondary)",
        bg: "rgba(100, 116, 139, 0.1)",
        icon: Users,
      },
    };

    const config = roleConfig[role] || roleConfig.user;
    const Icon = config.icon;

    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
        style={{ backgroundColor: config.bg }}
      >
        <Icon className="w-4 h-4" style={{ color: config.color }} />
        <span
          className="text-sm font-semibold capitalize"
          style={{ color: config.color }}
        >
          {role}
        </span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    if (status === "suspended") {
      return (
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
          style={{ backgroundColor: "rgba(220, 38, 38, 0.1)" }}
        >
          <Ban className="w-4 h-4" style={{ color: "var(--error)" }} />
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--error)" }}
          >
            Suspended
          </span>
        </div>
      );
    }

    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
        style={{ backgroundColor: "rgba(5, 150, 105, 0.1)" }}
      >
        <CheckCircle className="w-4 h-4" style={{ color: "var(--success)" }} />
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--success)" }}
        >
          Active
        </span>
      </div>
    );
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
          Manage Users
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Manage user roles and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Users",
            value: users.length,
            icon: Users,
            color: "var(--primary)",
          },
          {
            label: "Admins",
            value: users.filter((u) => u.role === "admin").length,
            icon: Shield,
            color: "var(--error)",
          },
          {
            label: "Managers",
            value: users.filter((u) => u.role === "manager").length,
            icon: UserCheck,
            color: "var(--secondary)",
          },
          {
            label: "users",
            value: users.filter((u) => u.role === "user").length,
            icon: Users,
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

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: "var(--text-secondary)" }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
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

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-3 rounded-lg outline-none cursor-pointer"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <option value="All">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 rounded-lg outline-none cursor-pointer"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Users Table */}
      <div
        className="rounded-xl overflow-hidden mb-6"
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
                  Name
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Role
                </th>
                <th
                  className="text-left p-4 font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Status
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
              {/*  PAGINATION 5 */
}
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8">
                    <AlertCircle
                      className="w-12 h-12 mx-auto mb-4 opacity-30"
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <p style={{ color: "var(--text-secondary)" }}>
                      No users found
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((userData, index) => (
                  <motion.tr
                    key={userData._id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            userData.photoURL ||
                            "https://via.placeholder.com/40"
                          }
                          alt={userData.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {userData.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span style={{ color: "var(--text-secondary)" }}>
                        {userData.email}
                      </span>
                    </td>

                    <td className="p-4">{getRoleBadge(userData.role)}</td>

                    <td className="p-4">{getStatusBadge(userData.status)}</td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(userData)}
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: "var(--primary)",
                          }}
                          title="Edit Role"
                        >
                          <Edit
                            className="w-4 h-4"
                            style={{ color: "white" }}
                          />
                        </motion.button>

                        {userData.status === "suspended" ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleActivate(userData)}
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: "var(--success)",
                            }}
                            title="Activate User"
                          >
                            <UserCheck
                              className="w-4 h-4"
                              style={{ color: "var(--success)" }}
                            />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSuspend(userData)}
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: "var(--error)",
                            }}
                            title="Suspend User"
                            disabled={userData.email === user?.email}
                          >
                            <UserX
                              className="w-4 h-4"
                              style={{ color: "white" }}
                            />
                          </motion.button>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(userData)}
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: "var(--error)",
                          }}
                          title="Delete User"
                          disabled={userData.email === user?.email}
                        >
                          <Trash2
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

      {/*  PAGINATION: 6*/}
      {filteredUsers.length > itemsPerPage && (
        <div
          className="flex items-center justify-between p-4 rounded-xl mb-6"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
          }}
        >
          {/* Info Text */}
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              Showing {firstIndex + 1} to{" "}
              {lastIndex > filteredUsers.length
                ? filteredUsers.length
                : lastIndex}{" "}
              of {filteredUsers.length} users
            </p>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
              whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-primary)",
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </motion.button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <motion.button
                    key={pageNum}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToPage(pageNum)}
                    className="w-10 h-10 rounded-lg font-bold transition-all"
                    style={{
                      backgroundColor:
                        currentPage === pageNum
                          ? "var(--primary)"
                          : "var(--bg)",
                      color:
                        currentPage === pageNum ? "white" : "var(--text-primary)",
                    }}
                  >
                    {pageNum}
                  </motion.button>
                )
              )}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
              whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-primary)",
              }}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md p-8 rounded-2xl"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "2px solid var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    className="text-2xl font-black"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Update User
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

                <div
                  className="flex items-center gap-3 mb-6 p-4 rounded-lg"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <img
                    src={
                      selectedUser.photoURL || "https://via.placeholder.com/40"
                    }
                    alt={selectedUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p
                      className="font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedUser.name}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    User Role
                  </label>
                  <select
                    value={selectedUser.newRole}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        newRole: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: "2px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Account Status
                  </label>
                  <select
                    value={selectedUser.newStatus}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        newStatus: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "var(--bg)",
                      border: "2px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleUpdate}
                    disabled={updating}
                    className="flex-1 py-3 rounded-xl font-bold disabled:opacity-50"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "white",
                    }}
                  >
                    {updating ? "Updating..." : "Update User"}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={{
                      backgroundColor: "var(--bg)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageUsers;