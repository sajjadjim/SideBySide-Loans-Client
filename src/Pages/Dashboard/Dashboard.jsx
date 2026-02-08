import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  CreditCard,
  PieChart,
  Activity,
  Eye,
  UserPlus,
  Briefcase
} from 'lucide-react';

const Dashboard = () => {

  const loanDistribution = [
    { category: 'Business', percentage: 35, color: 'var(--primary)' },
    { category: 'Personal', percentage: 25, color: 'var(--success)' },
    { category: 'Home', percentage: 20, color: 'var(--secondary)' },
    { category: 'Education', percentage: 15, color: 'var(--accent)' },
    { category: 'Medical', percentage: 5, color: 'var(--error)' }
  ];

  const monthlyData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 75 },
    { month: 'Mar', value: 55 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 70 },
    { month: 'Jun', value: 95 }
  ];

  const getStatusBadge = (status) => {
    const config = {
      Approved: { color: 'var(--success)', bg: 'rgba(5, 150, 105, 0.1)', icon: CheckCircle },
      Pending: { color: 'var(--accent)', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
      Rejected: { color: 'var(--error)', bg: 'rgba(220, 38, 38, 0.1)', icon: XCircle }
    };

    const { color, bg, icon: Icon } = config[status] || config.Pending;

    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
        style={{ color, backgroundColor: bg }}
      >
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  return (
    <div className="w-full overflow-x-hidden p-2 sm:p-4 md:p-6 lg:p-0">
      <div className="mb-6 md:mb-8">
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Dashboard Overview
        </h1>
        <p className="text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
          Welcome back! Here's what's happening with your loan platform.
        </p>
      </div>

      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-4 md:p-6 rounded-2xl"
          style={{
            backgroundColor: 'var(--surface)',
            border: '2px solid var(--border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-black" style={{ color: 'var(--text-primary)' }}>
              Monthly Applications
            </h2>
            <Activity className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          </div>

          <div className="flex items-end justify-between gap-2 md:gap-4 h-48 md:h-64">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${item.value}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="w-full rounded-t-lg relative group cursor-pointer"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded text-xs font-bold whitespace-nowrap"
                    style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                  >
                    {item.value}%
                  </div>
                </motion.div>
                <span className="text-xs md:text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 md:p-6 rounded-2xl"
          style={{
            backgroundColor: 'var(--surface)',
            border: '2px solid var(--border)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-black" style={{ color: 'var(--text-primary)' }}>
              Loan Distribution
            </h2>
            <PieChart className="w-5 h-5" style={{ color: 'var(--primary)' }} />
          </div>

          <div className="space-y-4">
            {loanDistribution.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {item.category}
                  </span>
                  <span className="text-sm font-bold" style={{ color: item.color }}>
                    {item.percentage}%
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--bg)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
        {[
          { title: 'New Users This Month', value: '145', icon: UserPlus, color: 'var(--primary)' },
          { title: 'Total Disbursed', value: '$2.4M', icon: CreditCard, color: 'var(--success)' },
          { title: 'Active Partnerships', value: '23', icon: Briefcase, color: 'var(--secondary)' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="p-4 md:p-6 rounded-2xl"
            style={{
              backgroundColor: 'var(--surface)',
              border: '2px solid var(--border)'
            }}
          >
            <item.icon className="w-8 h-8 mb-3" style={{ color: item.color }} />
            <h3 className="text-2xl md:text-3xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>
              {item.value}
            </h3>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;