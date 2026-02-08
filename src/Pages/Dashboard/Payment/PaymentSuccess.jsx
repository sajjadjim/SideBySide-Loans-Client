import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle, Copy, ArrowRight, Loader, AlertCircle } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useTheme } from "../../../components/ThemeContext";
import Loading from "../../../components/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { isDark } = useTheme();
  const sessionId = searchParams.get("session_id");
  
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState({ transaction: false, tracking: false });

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((response) => {
          console.log("Payment success:", response.data);
          setPaymentInfo({
            transactionId: response.data.transactionId,
            trackingId: response.data.trackingId,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Failed to verify payment. Please contact support.");
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  if (loading) {
    return (
     <Loading/>
    );
  }

  if (error) {
    return (
      <div className={` flex items-center justify-center p-4 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-md w-full p-8 rounded-2xl text-center ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
        >
          <AlertCircle className="text-red-500 mx-auto mb-4" size={64} />
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Verification Failed
          </h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={` flex items-center justify-center p-4 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        {/* Success Card */}
        <div className={`rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
          
          {/* Success Icon */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="text-white mx-auto mb-4" size={64} />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-green-100">Your application fee has been processed</p>
          </div>

          {/* Payment Details */}
          <div className="p-8 space-y-4">
            
            {/* Transaction ID */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Transaction ID
              </label>
              <div className="flex items-center gap-2">
                <code className={`flex-1 text-sm font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {paymentInfo?.transactionId || 'N/A'}
                </code>
                <button
                  onClick={() => copyToClipboard(paymentInfo?.transactionId, 'transaction')}
                  className={`p-2 rounded-lg transition ${
                    copied.transaction 
                      ? 'bg-green-500 text-white' 
                      : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Tracking ID */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <label className={`text-sm font-semibold block mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Tracking ID
              </label>
              <div className="flex items-center gap-2">
                <code className={`flex-1 text-sm font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {paymentInfo?.trackingId || 'N/A'}
                </code>
                <button
                  onClick={() => copyToClipboard(paymentInfo?.trackingId, 'tracking')}
                  className={`p-2 rounded-lg transition ${
                    copied.tracking 
                      ? 'bg-green-500 text-white' 
                      : isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Info Message */}
            <div className={`p-4 rounded-xl border-2 ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
              <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                ✓ Payment confirmation sent to your email<br />
                ✓ Application is now being processed
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex-1 py-3 rounded-xl font-semibold transition shadow-lg
                  ${isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-900 hover:bg-blue-800 text-white'
                  }`}
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/dashboard/my-loans')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition
                  ${isDark 
                    ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                  }`}
              >
                View Applications <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>

        {/* Support Link */}
        <p className={`text-center mt-6 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
          Questions? <a href="/contact" className="text-blue-600 hover:underline font-semibold">Contact Support</a>
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;