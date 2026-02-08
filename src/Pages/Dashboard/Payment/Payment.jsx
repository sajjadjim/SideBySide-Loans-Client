import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  CreditCard,
  Loader
} from 'lucide-react';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth"; 
import { useTheme } from '../../../components/ThemeContext';
import Loading from "../../../components/Loading";

const Payment = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const { user } = useAuth(); 
  const [isAgreed, setIsAgreed] = useState(false);

  const { isLoading, data: application } = useQuery({
    queryKey: ["loan-applications", loanId],
    enabled: !!loanId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/loan-applications/${loanId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    if (!isAgreed) {
      alert('Please accept the terms and conditions');
      return;
    }

    try {
      const paymentInfo = {
        cost: application?.cost || 10,
        applicationId: application?._id,
        senderEmail: user?.email || application?.email || application?.senderEmail,
        applicationName: application?.applicationName || 'Loan Application'
      };

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
      
      if (res?.data?.url) {
        window.location.href = res.data.url;
      } 

    } catch (error) {
      console.error('Payment Error:', error.response?.data || error.message);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Payment failed. Please try again.';
      
      alert(errorMessage);
    }
  };

  if (isLoading) {
    return (
     <Loading/>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-2 px-4
      ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className={`rounded-2xl shadow-2xl border-2 overflow-hidden
          ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
        >
          
          {/* Header */}
          <div className={`relative p-8 text-center
            ${isDark 
              ? 'bg-linear-to-br from-blue-900 to-slate-800' 
              : 'bg-linear-to-br from-blue-50 to-white'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center
                ${isDark ? 'bg-blue-600' : 'bg-blue-900'}`}
            >
              <CreditCard className="text-white" size={40} />
            </motion.div>

            <h1 className={`text-3xl font-bold mb-2
              ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
              Application Fee Payment
            </h1>
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Complete your payment to proceed with your loan application
            </p>
          </div>

          {/* Payment Details */}
          <div className="p-8 space-y-6">
            
            {/* Application Info */}
            <div className={`rounded-xl p-6
              ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
            >
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Application Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Application Name
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {application?.applicationName || 'Loan Application'}
                  </span>
                </div>
                <div className={`border-t pt-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Application Fee
                    </span>
                    <span className="text-3xl font-bold text-blue-600">
                      ${application?.cost || '10'}
                    </span>
                  </div>
                  <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    One-time non-refundable payment
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className={`rounded-xl p-6 border-2
              ${isDark 
                ? 'bg-amber-900/20 border-amber-800' 
                : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="flex gap-3">
                <AlertTriangle className={isDark ? 'text-amber-400' : 'text-amber-600'} size={24} />
                <div>
                  <h4 className={`font-bold mb-2 ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    Important Notice
                  </h4>
                  <ul className={`text-sm space-y-1 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                    <li>• This payment is <strong>non-refundable</strong></li>
                    <li>• Fee is required to process your application</li>
                    <li>• Payment does not guarantee loan approval</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What You Get */}
            <div className={`rounded-xl p-6
              ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
            >
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                What's Included
              </h3>
              <div className="space-y-3">
                {[
                  'Professional application review',
                  'Credit score assessment',
                  'Document verification',
                  'Fast-track processing'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className={`rounded-xl p-6 border-2
              ${isDark 
                ? 'bg-slate-900 border-slate-700' 
                : 'bg-white border-slate-200'
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex-1">
                  <p className={`text-sm leading-relaxed
                    ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                  >
                    I agree that the <strong>${application?.cost || '10'} application fee is non-refundable</strong> and understand 
                    that payment does not guarantee loan approval. I have read and agree to the{' '}
                    <a 
                      href="/terms" 
                      className="text-blue-600 hover:text-blue-700 underline font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Conditions
                    </a>
                    {' '}and{' '}
                    <a 
                      href="/privacy" 
                      className="text-blue-600 hover:text-blue-700 underline font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </label>
            </div>

            {/* Payment Button */}
            <motion.button
              whileHover={{ scale: isAgreed ? 1.02 : 1 }}
              whileTap={{ scale: isAgreed ? 0.98 : 1 }}
              onClick={handlePayment}
              disabled={!isAgreed}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg
                ${isAgreed
                  ? 'bg-blue-900 hover:bg-blue-800 text-white hover:shadow-xl cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
            >
              <DollarSign size={24} />
              <span>Pay Now - ${application?.cost || '10'}</span>
            </motion.button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm">
              <Shield className={isDark ? 'text-green-400' : 'text-green-600'} size={18} />
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Secured payment with 256-bit encryption
              </span>
            </div>

            {/* Cancel Link */}
            <div className="text-center">
              <button
                onClick={() => navigate(-1)}
                className={`text-sm font-semibold transition-colors
                  ${isDark 
                    ? 'text-slate-400 hover:text-slate-300' 
                    : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                Cancel and return to application
              </button>
            </div>

          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            Need help? Contact our support team at{' '}
            <a 
              href="/contact" 
              className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
            >
              Contact
            </a>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Payment;