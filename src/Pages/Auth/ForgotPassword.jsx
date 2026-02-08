import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiArrowLeft } from "react-icons/hi";
import { NavLink, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebase.config";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setValue("email", emailFromQuery);
    }
  }, [searchParams, setValue]);

  const handleForgotPassword = async (data) => {
    if (!data.email) {
      toast.warning("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, data.email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-6">
        <fieldset className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Send Reset Email
          </button>

          {/* Back to Login Link */}
          <div className="text-center">
            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors duration-200"
            >
              <HiArrowLeft className="text-lg" />
              Back to Login
            </NavLink>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgotPassword;
