// MyProfile.jsx
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  FileText,
  Loader,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { auth } from "../../../firebase/firebase.config";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const Profile = () => {
  const { user, logOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalBorrowed: 0,
  });

  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    occupation: "",
    monthlyIncome: "",
  });

  // ========== FETCH USER DATA ==========
  useEffect(() => {
    if (user?.email) {
      fetchUserData();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://grameen-loan-server.vercel.app/users/${user.email}`
      );

      const data = response.data.user || response.data;
      setUserData(data);

      setFormData({
        displayName: user.displayName || data.name || "",
        photoURL: user.photoURL || data.photoURL || "",
        phone: data.phone || "",
        address: data.address || "",
        dateOfBirth: data.dateOfBirth || "",
        occupation: data.occupation || "",
        monthlyIncome: data.monthlyIncome || "",
      });
    } catch (error) {
      console.error(" Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(
        `https://grameen-loan-server.vercel.app/loan-applications/user/${user.email}`
      );
      const applications = response.data;

      setStats({
        totalApplications: applications.length,
        pendingApplications: applications.filter(
          (app) => app.status === "Pending"
        ).length,
        approvedApplications: applications.filter(
          (app) => app.status === "Approved"
        ).length,
        totalBorrowed: applications
          .filter((app) => app.status === "Approved")
          .reduce((sum, app) => sum + (app.loanAmount || 0), 0),
      });
    } catch (error) {
      console.error(" Error fetching stats:", error);

    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      console.log("Updating Firebase...");
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      await axios.patch(`https://grameen-loan-server.vercel.app/users/${user.email}`, {
        name: formData.displayName,
        photoURL: formData.photoURL,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        occupation: formData.occupation,
        monthlyIncome: formData.monthlyIncome,
        updatedAt: new Date(),
      });

      await auth.currentUser.reload();

      setUserData({ ...userData, ...formData });
      setEditMode(false);

      toast.success("Profile updated successfully!");

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update profile. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "var(--error)",
      cancelButtonColor: "var(--border)",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          navigate("/");
          toast.success("Logged out successfully");
          Swal.fire({
            icon: "success",
            title: "Logged Out",
            text: "You have been logged out successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUpdating(true);
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      // Upload to ImgBB
      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`,
        formDataImg
      );

      const photoURL = imgbbResponse.data.data.url;

      // Update Firebase profile
      await updateProfile(auth.currentUser, { photoURL });

      // Update database
      await axios.patch(`https://grameen-loan-server.vercel.app/users/${user.email}`, {
        photoURL,
        updatedAt: new Date(),
      });

      // Update local state
      setFormData({ ...formData, photoURL });

      toast.success("Photo updated successfully!");

      Swal.fire({
        icon: "success",
        title: "Photo Updated!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Reload to show new photo
      await auth.currentUser.reload();
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo");

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Failed to upload photo",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || loading) {
    return (
     <Loading/>
    );
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div
          className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{
            backgroundColor: "var(--surface)",
            border: "2px solid var(--border)",
          }}
        >
          <Shield
            className="mx-auto mb-4"
            size={64}
            style={{ color: "var(--text-secondary)" }}
          />
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            No user logged in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className="text-3xl md:text-4xl font-black mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            My Profile
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Manage your account information and settings
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div
              className="p-8 rounded-2xl text-center sticky top-24"
              style={{
                backgroundColor: "var(--surface)",
                border: "2px solid var(--border)",
              }}
            >
              {/* Profile Photo */}
              <div className="relative inline-block mb-6">
                <img
                  src={
                    formData.photoURL ||
                    user?.photoURL ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mx-auto"
                  style={{ border: "4px solid var(--primary)" }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />

                {/* Upload Button */}
                <label
                  className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={updating}
                  />
                </label>
              </div>

              {/* Name & Email */}
              <h2
                className="text-2xl font-black mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {formData.displayName || user?.displayName || "User"}
              </h2>
              <p
                className="mb-4 break-words"
                style={{ color: "var(--text-secondary)" }}
              >
                {user?.email}
              </p>

              {/* Role Badge */}
              <div className="flex items-center gap-2 justify-center">

              
              <div
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: "var(--primary)", }}
              >
                <Shield
                  className="w-4 h-4"
                  style={{ color: "white" }}
                />
                <span
                  className="text-sm font-bold capitalize"
                  style={{ color: "white" }}
                >
                  {userData?.role || "User"}
                </span>
              </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Calendar
                  className="w-4 h-4"
                  style={{ color: "var(--text-secondary)" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Member since{" "}
                  {new Date(
                    userData?.createdAt || user?.metadata?.creationTime
                  ).toLocaleDateString()}
                </span>
              </div>

              {/* Stats */}
              <div
                className="pt-6 border-t mb-6"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      {stats.totalApplications}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Total Applications
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: "var(--success)" }}
                    >
                      ${stats.totalBorrowed.toLocaleString()}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Total Borrowed
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "var(--error)",
                  color: "white",
                }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Edit Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              {[
                {
                  icon: FileText,
                  label: "Applications",
                  value: stats.totalApplications,
                  color: "var(--primary)",
                },
                {
                  icon: Clock,
                  label: "Pending",
                  value: stats.pendingApplications,
                  color: "var(--accent)",
                },
                {
                  icon: CheckCircle,
                  label: "Approved",
                  value: stats.approvedApplications,
                  color: "var(--success)",
                },
                {
                  icon: DollarSign,
                  label: "Borrowed",
                  value: `$${stats.totalBorrowed.toLocaleString()}`,
                  color: "var(--secondary)",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "2px solid var(--border)",
                  }}
                >
                  <stat.icon
                    className="w-5 h-5 mb-2"
                    style={{ color: stat.color }}
                  />
                  <p
                    className="text-xl font-black mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Profile Information Form */}

            <div
              className="p-8 rounded-2xl"
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
                  {editMode
                    ? "Edit Profile Information"
                    : "Profile Information"}
                </h3>

                {!editMode ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "white",
                    }}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditMode(false);
                        fetchUserData();
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold"
                      style={{
                        backgroundColor: "var(--bg)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                {/* Email (Read-only) */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail
                        className="w-5 h-5"
                        style={{ color: "var(--text-secondary)" }}
                      />
                    </div>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 cursor-not-allowed"
                      style={{
                        backgroundColor: "var(--bg)",
                        border: "2px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    />
                  </div>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Email cannot be changed
                  </p>
                </div>

                {/* Display Name */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Display Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User
                        className="w-5 h-5"
                        style={{ color: "var(--text-secondary)" }}
                      />
                    </div>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="Enter your display name"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none transition-all"
                      style={{
                        backgroundColor: editMode
                          ? "var(--bg)"
                          : "var(--surface)",
                        border: `2px solid var(--border)`,
                        color: "var(--text-primary)",
                        cursor: editMode ? "text" : "not-allowed",
                      }}
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Photo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Camera
                        className="w-5 h-5"
                        style={{ color: "var(--text-secondary)" }}
                      />
                    </div>
                    <input
                      type="text"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="Enter image URL"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none transition-all"
                      style={{
                        backgroundColor: editMode
                          ? "var(--bg)"
                          : "var(--surface)",
                        border: `2px solid var(--border)`,
                        color: "var(--text-primary)",
                        cursor: editMode ? "text" : "not-allowed",
                      }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none"
                        style={{
                          backgroundColor: editMode
                            ? "var(--bg)"
                            : "var(--surface)",
                          border: `2px solid var(--border)`,
                          color: "var(--text-primary)",
                          cursor: editMode ? "text" : "not-allowed",
                        }}
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      </div>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none"
                        style={{
                          backgroundColor: editMode
                            ? "var(--bg)"
                            : "var(--surface)",
                          border: `2px solid var(--border)`,
                          color: "var(--text-primary)",
                          cursor: editMode ? "text" : "not-allowed",
                        }}
                      />
                    </div>
                  </div>

                  {/* Occupation */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Occupation
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Briefcase
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      </div>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        placeholder="Your occupation"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none"
                        style={{
                          backgroundColor: editMode
                            ? "var(--bg)"
                            : "var(--surface)",
                          border: `2px solid var(--border)`,
                          color: "var(--text-primary)",
                          cursor: editMode ? "text" : "not-allowed",
                        }}
                      />
                    </div>
                  </div>

                  {/* Monthly Income */}
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Monthly Income
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      </div>
                      <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        placeholder="5000"
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none"
                        style={{
                          backgroundColor: editMode
                            ? "var(--bg)"
                            : "var(--surface)",
                          border: `2px solid var(--border)`,
                          color: "var(--text-primary)",
                          cursor: editMode ? "text" : "not-allowed",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-4 pointer-events-none">
                      <MapPin
                        className="w-5 h-5"
                        style={{ color: "var(--text-secondary)" }}
                      />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      rows="3"
                      placeholder="Your full address"
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 outline-none resize-none"
                      style={{
                        backgroundColor: editMode
                          ? "var(--bg)"
                          : "var(--surface)",
                        border: `2px solid var(--border)`,
                        color: "var(--text-primary)",
                        cursor: editMode ? "text" : "not-allowed",
                      }}
                    />
                  </div>
                </div>

                {/* Provider Info */}
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <div className="flex items-center gap-3">
                    <Shield
                      className="w-6 h-6"
                      style={{ color: "var(--primary)" }}
                    />
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Authentication Provider
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {user?.providerData?.[0]?.providerId || "unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Update Button - Only show in edit mode */}
                {editMode && (
                  <motion.button
                    type="submit"
                    disabled={updating}
                    whileHover={{ scale: updating ? 1 : 1.02 }}
                    whileTap={{ scale: updating ? 1 : 0.98 }}
                    className="w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: updating
                        ? "var(--text-secondary)"
                        : "var(--primary)",
                    }}
                  >
                    {updating ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Save className="w-5 h-5" />
                        Update Profile
                      </span>
                    )}
                  </motion.button>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
