import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader } from 'lucide-react';
import { useTheme } from '../../../components/ThemeContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../../components/Loading';

const UpdateLoan = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    axios
      .get(`https://grameen-loan-server.vercel.app/all-loans/${loanId}`)
      .then((res) => {
        const loan = res.data;
        
        setValue("loanTitle", loan.loanTitle);
        setValue("category", loan.category);
        setValue("shortDescription", loan.shortDescription);
        setValue("description", loan.description);
        setValue("maxLimit", loan.maxLimit);
        setValue("interestRate", loan.interestRate);
        setValue("tenure", loan.tenure);
        setValue("emiPlans", loan.emiPlans?.join(", ") || "");
        
        setImagePreview(loan.loanImage || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching loan:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load loan data",
        }).then(() => navigate(-1));
      });
  }, [loanId, setValue, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const loanData = {
        loanTitle: data.loanTitle,
        category: data.category,
        shortDescription: data.shortDescription,
        description: data.description,
        maxLimit: data.maxLimit,
        interestRate: data.interestRate,
        tenure: data.tenure,
        emiPlans: data.emiPlans.split(",").map((p) => p.trim()),
        loanImage: imagePreview,
        updatedAt: new Date(),
      };

      await axios.patch(
        `https://grameen-loan-server.vercel.app/all-loans/${loanId}`,
        loanData
      );

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Loan updated successfully",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate('/dashboard/manage-loans');
      });

    } catch (error) {
      console.error("Error updating loan:", error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to update loan",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className={`min-h-screen pb-16 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 "
        >
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 mb-4 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Update Loan
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl p-8 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div>
              <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Loan Title
              </label>
              <input
                {...register("loanTitle", { required: "Title is required" })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              {errors.loanTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.loanTitle.message}</p>
              )}
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="">Select Category</option>
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
                <option value="Home">Home</option>
                <option value="Pregnancy">Pregnancy</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Wedding">Wedding</option>
                <option value="Education">Education</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Short Description
              </label>
              <input
                {...register("shortDescription",)}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              {errors.shortDescription && (
                <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
              )}
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Full Description
              </label>
              <textarea
                {...register("description",)}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Max Limit
                </label>
                <input
                  {...register("maxLimit", { required: "Max limit is required" })}
                  type="number"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isDark 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                {errors.maxLimit && (
                  <p className="text-red-500 text-sm mt-1">{errors.maxLimit.message}</p>
                )}
              </div>

              <div>
                <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Interest Rate (%)
                </label>
                <input
                  {...register("interestRate", { required: "Interest rate is required" })}
                  type="number"
                  step="0.1"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    isDark 
                      ? 'bg-slate-700 border-slate-600 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                {errors.interestRate && (
                  <p className="text-red-500 text-sm mt-1">{errors.interestRate.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tenure (months)
              </label>
              <input
                {...register("tenure", { required: "Tenure is required" })}
                type="number"
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              {errors.tenure && (
                <p className="text-red-500 text-sm mt-1">{errors.tenure.message}</p>
              )}
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                EMI Plans (comma separated)
              </label>
              <input
                {...register("emiPlans", { required: "EMI plans are required" })}
                placeholder="3, 6, 12, 24"
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              {errors.emiPlans && (
                <p className="text-red-500 text-sm mt-1">{errors.emiPlans.message}</p>
              )}
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Loan Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-full h-[500px] object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={`flex-1 py-3 rounded-lg font-bold ${
                  isDark 
                    ? 'bg-slate-700 text-white hover:bg-slate-600' 
                    : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Update Loan
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default UpdateLoan;