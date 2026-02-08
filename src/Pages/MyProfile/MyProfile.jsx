import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import { User, Mail, Camera, Shield, CheckCircle, Loader } from 'lucide-react';
import useAuth from "../../hooks/useAuth";
import { auth } from '../../firebase/firebase.config';
import { useTheme } from '../../components/ThemeContext';
import Loading from '../../components/Loading';

const MyProfile = () => {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className={`max-w-md w-full rounded-2xl p-8 text-center border-2
          ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
        >
          <Shield className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} size={64} />
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            No user logged in.
          </p>
        </div>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      toast.success('Profile updated successfully!');
      await auth.currentUser.reload();
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className={`text-3xl sm:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            My Profile
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Manage your account information and settings
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

{/* left sidebar            */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className={`rounded-2xl p-6 border-2 text-center
              ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
            >
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                <img
                  src={photoURL || user.photoURL || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-slate-300 dark:border-slate-700"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
                <div className={`absolute bottom-2 right-2 w-10 h-10 rounded-full flex items-center justify-center border-4 cursor-pointer
                  ${isDark 
                    ? 'bg-blue-600 border-slate-800 hover:bg-blue-700' 
                    : 'bg-blue-600 border-white hover:bg-blue-700'
                  }`}
                >
                  <Camera className="text-white" size={20} />
                </div>
              </div>

              {/* User Info */}
              <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {displayName || user.displayName || "No Name"}
              </h2>
              <p className={`text-sm mb-4 break-words ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {user?.email || user?.providerData?.[0]?.email || "No email"}
              </p>

              {/* Provider Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                ${isDark 
                  ? 'bg-green-900/30 text-green-400 border border-green-800' 
                  : 'bg-green-100 text-green-700 border border-green-200'
                }`}
              >
                <CheckCircle size={16} />
                {user.providerData[0]?.providerId === 'google.com' ? 'Google Account' : 'Email Account'}
              </div>

              {/* Account Stats */}
              <div className={`mt-6 pt-6 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                      0
                    </p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      Active Loans
                    </p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      $0
                    </p>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      Total Borrowed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

{/* right sidebar  */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className={`rounded-2xl p-6 sm:p-8 border-2
              ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
            >
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Edit Profile Information
              </h3>

              <div className="space-y-6">
                
                {/* Email (Read-only) */}
                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={isDark ? 'text-slate-500' : 'text-slate-400'} size={20} />
                    </div>
                    <input
                      type="email"
                      value={user?.email || user?.providerData?.[0]?.email || ""}
                      disabled
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 cursor-not-allowed
                        ${isDark 
                          ? 'bg-slate-900/50 border-slate-700 text-slate-500' 
                          : 'bg-slate-100 border-slate-300 text-slate-500'
                        }`}
                    />
                  </div>
                  <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    Email cannot be changed
                  </p>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <label htmlFor="displayName" className={`block text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Display Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={isDark ? 'text-slate-500' : 'text-slate-400'} size={20} />
                    </div>
                    <input
                      type="text"
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all
                        ${isDark 
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                  <label htmlFor="photoURL" className={`block text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Photo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Camera className={isDark ? 'text-slate-500' : 'text-slate-400'} size={20} />
                    </div>
                    <input
                      type="text"
                      id="photoURL"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="Enter image URL"
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all
                        ${isDark 
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                </div>

                {/* Provider Info */}
                <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-3">
                    <Shield className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />
                    <div>
                      <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Authentication Provider
                      </p>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {user.providerData[0]?.providerId || "unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Update Button */}
                <motion.button
                  onClick={handleUpdateProfile}
                  disabled={updating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all text-white
                    ${updating 
                      ? 'bg-slate-400 cursor-not-allowed' 
                      : 'bg-blue-900 hover:bg-blue-800 hover:shadow-xl'
                    }`}
                >
                  {updating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </span>
                  ) : (
                    'Update Profile'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;