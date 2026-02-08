// DashboardLayout.jsx
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  DollarSignIcon,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { FcApprove } from "react-icons/fc";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { useTheme } from "../../components/ThemeContext";
import useAuth from "../../hooks/useAuth";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://grameen-loan-server.vercel.app/users/${user.email}`)
        .then(response => {
          const userData = response.data.user || response.data;
          setUserRole(userData.role || 'user');
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
          setUserRole('user');
          setLoading(false);
        });
    }
  }, [user]);

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      end: true,
      roles: ['admin', 'user', 'manager'],
    },
    {
      name: "Loan Applications",
      path: "/dashboard/loan-applications",
      icon: FileText,
      roles: ['admin'],
    },
    {
      name: "My Loans",
      path: "/dashboard/my-loans",
      icon: FileText,
      roles: [ 'user'],
    },
    {
      name: "Add Loan",
      path: "/dashboard/add-loan",
      icon: FileText,
      roles: ['manager'],
    },
    {
      name: "Manage Loans",
      path: "/dashboard/manage-loans",
      icon: FileText,
      roles: ['manager'],
    },
    {
      name: "Manage Users",
      path: "/dashboard/manage-users",
      icon: Users,
      roles: ['admin'],
    },
    {
      name: "All Loans",
      path: "/dashboard/all-loan",
      icon: DollarSignIcon,
      roles: ['admin'],
    },
    {
      name: "Pending Loans",
      path: "/dashboard/pending-loans",
      icon: Clock,
      roles: ['manager'],
    },
    {
      name: "Approved Loans",
      path: "/dashboard/approved-loans",
      icon: FcApprove,
      roles: ['manager'],
    },
    // {
    //   name: "Payment History",
    //   path: "/dashboard/payments-history",
    //   icon: CreditCard,
    //   roles: ['admin'],
    // },
    {
      name: "My Profile",
      path: "/dashboard/profile",
      icon: UserCircle,
      roles: ['admin', 'user', 'manager'],
    },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        style={{
          backgroundColor: "var(--surface)",
          borderBottom: "2px solid var(--border)",
        }}
      >
        <div className="max-w-full mx-auto flex items-center justify-between">
          {/* Left: Menu Toggle + Logo */}
          <div className="flex items-center gap-4">
            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-opacity-10 transition-all"
              style={{ backgroundColor: "var(--secondary)"}}
            >
              {isSidebarOpen ? (
                <ChevronLeft
                  className="w-5 h-5"
                  style={{ color: "--text(-third)" }}
                />
              ) : (
                <ChevronRight
                  className="w-5 h-5"
                  style={{ color: "--text(-third)" }}
                />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: "var(--primary)"}}
            >
              <Menu className="w-5 h-5" style={{ color: "white" }} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              
              <span
                className="text-xl font-black hidden sm:block"
                style={{ color: "var(--text-primary)" }}
              >
              Dashboard
              </span>
            </Link>
          </div>

          {/* Right: Search, Notifications, Profile */}
          <div className="flex items-center gap-4">
            {/* Search (Hidden on mobile) */}
            <div
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
              }}
            >
              <Search
                className="w-4 h-4"
                style={{ color: "var(--text-secondary)" }}
              />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm"
                style={{ color: "var(--text-primary)" }}
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--bg)" }}
            >
              {isDark ? "🌙" : "☀️"}
            </button>

            {/* Notifications */}
            <button
              className="relative w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--bg)" }}
            >
              <Bell
                className="w-5 h-5"
                style={{ color: "var(--text-primary)" }}
              />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--error)" }}
              />
            </button>

            {/* User Profile */}
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-lg"
              style={{ backgroundColor: "var(--bg)" }}
            >
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden md:block">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user?.displayName || "User"}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar */}
      <div className="flex pt-20">
        {/* Desktop Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 280 : 80 }}
          className="hidden lg:block fixed left-0 top-20 bottom-0 overflow-hidden"
          style={{
            backgroundColor: "var(--surface)",
            borderRight: "2px solid var(--border)",
          }}
        >
          <div className="h-full flex flex-col py-6">
            {/* Navigation Items */}
            <nav className="flex-1 px-4 space-y-2">
              {filteredNavItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                    ${isActive ? "shadow-lg" : "hover:shadow-md"}
                  `}
                  style={({ isActive }) => ({
                    backgroundColor: isActive
                      ? "var(--primary)"
                      : "transparent",
                    color: isActive ? "white" : "var(--text-primary)",
                  })}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-semibold whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div
              className="px-4 space-y-2 border-t pt-4"
              style={{ borderColor: "var(--border)" }}
            >
              <Link
                to="/"
                className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:shadow-md"
                style={{ color: "var(--text-primary)" }}
              >
                <Home className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-semibold">Back to Home</span>
                )}
              </Link>

              {/* <button
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:shadow-md"
                style={{ color: "var(--text-primary)" }}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && (
                  <span className="font-semibold">Settings</span>
                )}
              </button> */}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all hover:shadow-md"
                style={{ color: "var(--error)" }}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-semibold">Logout</span>}
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-20"
              />

              {/* Sidebar */}
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="lg:hidden fixed left-0 top-20 bottom-0 w-72 z-50 overflow-y-auto"
                style={{
                  backgroundColor: "var(--surface)",
                  borderRight: "2px solid var(--border)",
                }}
              >
                <div className="h-full flex flex-col py-6">
                  {/* Close Button */}
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--bg)" }}
                  >
                    <X
                      className="w-5 h-5"
                      style={{ color: "var(--text-primary)" }}
                    />
                  </button>

                  {/* Navigation Items */}
                  <nav className="flex-1 px-4 space-y-2">
                    {filteredNavItems.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.path}
                        end={item.end}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={({ isActive }) => `
                          flex items-center gap-4 px-4 py-3 rounded-xl transition-all
                          ${isActive ? "shadow-lg" : ""}
                        `}
                        style={({ isActive }) => ({
                          backgroundColor: isActive
                            ? "var(--primary)"
                            : "transparent",
                          color: isActive ? "white" : "var(--text-primary)",
                        })}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-semibold">{item.name}</span>
                      </NavLink>
                    ))}
                  </nav>

                  {/* Bottom Actions */}
                  <div
                    className="px-4 space-y-2 border-t pt-4"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <Link
                      to="/"
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Home className="w-5 h-5" />
                      <span className="font-semibold">Back to Home</span>
                    </Link>

                    {/* <button
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-xl"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-semibold">Settings</span>
                    </button> */}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-4 py-3 rounded-xl"
                      style={{ color: "var(--error)" }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-semibold">Logout</span>
                    </button>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          initial={false}
          animate={{
            marginLeft: isSidebarOpen ? 280 : 80,
            width: isSidebarOpen ? "calc(100% - 280px)" : "calc(100% - 80px)",
          }}
          className="flex-1 p-6 lg:p-8 hidden lg:block"
        >
          <Outlet />
        </motion.main>

        {/* Mobile Main Content */}
        <main className="lg:hidden flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;