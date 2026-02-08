import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import useAuth from "../../../hooks/useAuth";
import { useTheme } from '../../../components/ThemeContext';
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const { signInUser, signInGoogle } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const from = location?.state?.from || '/';


  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      
      const result = await signInUser(data.email, data.password);
      console.log('✅ Login successful:', result.user);
      
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to SideBySide Loan',
        confirmButtonColor: '#1E3A8A',
        confirmButtonText: 'Continue',
        timer: 2000
      }).then(() => {
        console.log(from)
        navigate(from, { replace: true });
      });
      
    } catch (error) {
      console.error('Login Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid email or password',
        confirmButtonColor: '#DC2626'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      
      const result = await signInGoogle();
      console.log('✅ Google login successful:', result.user);
      
      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'Logged in with Google',
        confirmButtonColor: '#1E3A8A',
        timer: 1500,
        showConfirmButton: false
      });
      
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('Google Login Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: error.message,
        confirmButtonColor: '#DC2626'
      });
    } finally {
      setIsLoading(false);
    }
  };


return (
  <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors duration-300`}>
    <div className="min-h-screen flex items-center justify-center px-4 py-12 lg:py-38">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* left dide  */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className={`rounded-2xl p-12 border-2
              ${isDark 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' 
                : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'
              }`}
            >
              {/* Logo/Icon */}
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8
                ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}
              >
                <Shield className={isDark ? 'text-blue-400' : 'text-blue-600'} size={40} />
              </div>

              {/* Heading */}
              <h1 className={`text-4xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Secure Banking
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                  Made Simple
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Access your SideBySide Loan account securely. Manage your loans, track payments, 
                and apply for new loans all in one place.
              </p>

              {/* Features */}
              <div className="space-y-4">
                {[
                  'Bank-grade 256-bit encryption',
                  'Instant loan status updates',
                  'Secure document management',
                  'Simple Verification Process',
                  '24/7 account access'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      {feature}
                    </span>
                  </div>
                  
                ))}
                 {/* Trust Badge */}
            <div className="mt-8 text-center ">
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                🔒 Your information is protected with bank-level security
              </p>
            </div>
              </div>
            </div>
          </motion.div>

{/* right side  */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`rounded-2xl p-8 sm:p-12 border-2 shadow-xl
              ${isDark 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
              }`}
            >
              {/* Header */}
              <div className="mb-8">
                <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Welcome Back
                </h2>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Sign in to continue to your account
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  
                  {/* Email Field */}
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
                        {...register("email", { required: true })}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all
                          ${isDark 
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' 
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email?.type === "required" && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="text-xs">⚠</span> Email is required
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={isDark ? 'text-slate-500' : 'text-slate-400'} size={20} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: true,
                          minLength: 6,
                        })}
                        className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all
                          ${isDark 
                            ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500' 
                            : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className={isDark ? 'text-slate-500' : 'text-slate-400'} size={20} />
                        ) : (
                          <Eye className={isDark ? 'text-slate-500' : 'text-slate-400'} size={20} />
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
                        <span className="text-xs">⚠</span> Password must be 6 characters or longer
                      </p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        {...register("rememberMe")}
                        className="h-4 w-4 rounded border-2 border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <label 
                        htmlFor="remember-me" 
                        className={`ml-2 block text-sm cursor-pointer ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                      >
                        Remember me
                      </label>
                    </div>
                    <Link 
                      to='/forgot-password' 
                      className={`text-sm font-semibold transition-colors
                        ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <motion.button
                    onClick={handleSubmit(handleLogin)}
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-lg font-bold text-lg shadow-lg transition-all text-white
                      ${isLoading 
                        ? 'bg-slate-400 cursor-not-allowed' 
                        : 'bg-blue-900 hover:bg-blue-800 hover:shadow-xl'
                      }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Signing in...
                      </span>
                    ) : (
                      'Login'
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative flex items-center py-2">
                    <div className={`flex-grow border-t ${isDark ? 'border-slate-700' : 'border-slate-300'}`}></div>
                    <span className={`flex-shrink mx-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                      or
                    </span>
                    <div className={`flex-grow border-t ${isDark ? 'border-slate-700' : 'border-slate-300'}`}></div>
                  </div>

                  {/* Google Login Button */}
                  <motion.button
                    type="button"
                    onClick={handleGoogleLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-3 px-4 py-3 border-2 rounded-lg font-semibold transition-all
                      ${isDark 
                        ? 'border-slate-700 text-slate-300 hover:bg-slate-700' 
                        : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <FcGoogle className="text-2xl" />
                    Login with Google
                  </motion.button>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4">
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Don't have an account?{" "}
                      <Link 
                        to="/register" 
                        className={`font-bold transition-colors
                          ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          
          </motion.div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;