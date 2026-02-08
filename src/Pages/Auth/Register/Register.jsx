import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, Eye, EyeOff, User, Upload } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../components/ThemeContext";
import RegisterImg from "../../../assets/RegisterImg.png";
import Swal from "sweetalert2";
import axios from "axios";


const Register = () => {
  // ========== HOOKS & CONTEXT ==========
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const { registerUser, updateUserProfile, signInGoogle } = useAuth();

  // ========== FORM STATE ==========
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ========== LOCAL STATE ==========
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  // ========== HANDLERS ==========
  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    console.log(profileImg)

    setIsLoading(true);
    registerUser(data.email, data.password)
      .then(() => {
        // store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // send the photo to imgbb and get the photo url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        return axios.post(image_API_URL, formData);
      })
      .then((res) => {
        const photoURL = res.data.data.url;

        // update user profile to firebase
        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };
        return updateUserProfile(userProfile).then(() => photoURL);
      })
      .then((photoURL) => {
        // create a user object to store in mongodb database 
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: photoURL,
          role: data.role // use selected role from form
        };
        return axiosSecure.post('/users', userInfo);
      })
      .then((res) => {
        if (res.data.insertedId) {
          console.log('new user added to database', res.data);

          // SUCCESS ALERT
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Welcome to Grameen Lone',
            confirmButtonColor: '#1E3A8A',
            confirmButtonText: 'Continue'
          }).then(() => {
            navigate('/'); // Navigate to home after success
          });
        }
      })
      .catch((error) => {
        // Handle errors from any of the above steps
        console.log('Registration Error:', error);
        let title = 'Registration Failed';
        let text = error.message || 'Could not create account. Please try again.';

        // Custom error messages for specific steps
        if (error.response && error.response.data && error.response.data.error) {
          title = 'Image Upload Failed';
          text = 'Could not upload profile photo. Please try again.';
        } else if (error.code === 'auth/update-profile') {
          title = 'Profile Update Failed';
          text = 'Could not update profile. Please try again.';
        } else if (error.response && error.response.config && error.response.config.url && error.response.config.url.includes('/users')) {
          title = 'Database Error';
          text = 'Failed to save user information';
        }

        Swal.fire({
          icon: 'error',
          title,
          text,
          confirmButtonColor: '#DC2626'
        });
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
};
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);

 // ✅ Save user to MongoDB after Google login
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        role: 'user',
        createdAt: new Date()
      };
      
      axios.post('https://grameen-loan-server.vercel.app/users', userInfo)
        .then((res) => {
          console.log('User saved to DB:', res.data);
        })
         .catch(err => {
          if (err.response?.status === 409) {
            console.log('ℹ️ User already exists');
          } else {
            console.error('❌ Error saving user:', err);
          }
        });

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back",
          confirmButtonColor: "#1E3A8A",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Google Sign-in Failed",
          text: error.message,
          confirmButtonColor: "#DC2626",
        });
      });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFileName(file.name);
  //   }
  // };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8
      ${
        isDark ? "bg-slate-900" : "bg-slate-50"
      } transition-colors duration-300`}
    >
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* ========== LEFT SIDE - BRANDING ========== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <img src={RegisterImg} alt="" />
          </motion.div>

          {/* ========== RIGHT SIDE - REGISTRATION FORM ========== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`rounded-2xl p-8 sm:p-10 border-2 shadow-xl
              ${
                isDark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              {/* Header */}
              <div className="mb-6">
                <h2
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Create an Account
                </h2>
                <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                  Register with SideBySide Loan
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(handleRegistration)}
                className="space-y-4"
              >
                <div className="space-y-3">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User
                          className={
                            isDark ? "text-slate-500" : "text-slate-400"
                          }
                          size={20}
                        />
                      </div>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all
                          ${
                            isDark
                              ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                              : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Name is required
                      </p>
                    )}
                  </div>

                  {/* Role Dropdown - ADDED */}
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Role
                    </label>
                    <select
                      {...register("role", { required: true })}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-all
                        ${
                          isDark
                            ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500"
                            : "bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    >
                      <option value="">Select Role</option>
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                    </select>
                    {errors.role && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Role is required
                      </p>
                    )}
                  </div>

  {/* Photo Upload Field */}
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Profile Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        {...register("photo", { required: true })}
                        accept="image/*"
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-semibold file:cursor-pointer
                          ${isDark 
                            ? 'bg-slate-900 border-slate-700 text-slate-400 file:bg-blue-900/30 file:text-blue-400 ' 
                            : 'bg-slate-50 border-slate-300 text-slate-600 file:bg-blue-100 file:text-blue-600'
                          }`}
                        id="photo-upload"
                      />
                    </div>
                    {errors.photo?.type === "required" && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Photo is required
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail
                          className={
                            isDark ? "text-slate-500" : "text-slate-400"
                          }
                          size={20}
                        />
                      </div>
                      <input
                        type="email"
                        {...register("email", { required: true })}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all
                          ${
                            isDark
                              ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                              : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Email is required
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-semibold ${
                        isDark ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock
                          className={
                            isDark ? "text-slate-500" : "text-slate-400"
                          }
                          size={20}
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          minLength: 6,
                          pattern:
                            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{6,}$/,
                        })}
                        className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all
                          ${
                            isDark
                              ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500"
                              : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600"
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff
                            className={
                              isDark ? "text-slate-500" : "text-slate-400"
                            }
                            size={20}
                          />
                        ) : (
                          <Eye
                            className={
                              isDark ? "text-slate-500" : "text-slate-400"
                            }
                            size={20}
                          />
                        )}
                      </button>
                    </div>
                    {errors.password?.type === "required" && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Password is required
                      </p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Password must be 6
                        characters or longer
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Password must have
                        uppercase, number & special character
                      </p>
                    )}
                  </div>

                  {/* Register Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all text-white
                      ${
                        isLoading
                          ? "bg-slate-400 cursor-not-allowed"
                          : "bg-blue-900 hover:bg-blue-800 hover:shadow-xl"
                      }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating account...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative flex items-center py-2">
                    <div
                      className={`flex-grow border-t ${
                        isDark ? "border-slate-700" : "border-slate-300"
                      }`}
                    ></div>
                    <span
                      className={`flex-shrink mx-4 text-sm ${
                        isDark ? "text-slate-500" : "text-slate-500"
                      }`}
                    >
                      or
                    </span>
                    <div
                      className={`flex-grow border-t ${
                        isDark ? "border-slate-700" : "border-slate-300"
                      }`}
                    ></div>
                  </div>

                  {/* Google Register Button */}
                  <motion.button
                    type="button"
                    onClick={handleGoogleSignIn}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-3 px-4 py-3 border-2 rounded-lg font-semibold transition-all
                      ${
                        isDark
                          ? "border-slate-700 text-slate-300 hover:bg-slate-700"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    <FcGoogle className="text-2xl" />
                    Register with Google
                  </motion.button>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p
                      className={`text-sm ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Already have an account?{" "}
                      <Link
                        state={location.state}
                        to="/login"
                        className={`font-bold transition-colors
                          ${
                            isDark
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-700"
                          }`}
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 text-center">
              <p
                className={`text-xs ${
                  isDark ? "text-slate-500" : "text-slate-500"
                }`}
              >
                🔒 Your information is protected with bank-level security
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
