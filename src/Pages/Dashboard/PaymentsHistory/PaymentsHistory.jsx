// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const PaymentsHistory = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: payments = [] } = useQuery({
//         queryKey: ['payments', user.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/payments?email=${user.email}`)
//             return res.data;
//         }
//     })

//     return (
//         <div>
//             <h2 className="text-5xl">Payment History: {payments.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Amount</th>
//                             <th>Paid Time</th>
//                             <th>Transaction Id</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             payments.map((payment, index) => <tr key={payment._id}>
//                                 <th>{index + 1}</th>
//                                 <td>Cy Ganderton</td>
//                                 <td>${payment.amount}</td>
//                                 <td>{payment.paidAt}</td>
//                                 <td>{payment.transactionId}</td>
//                             </tr>)
//                         }

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentsHistory;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CreditCard, Calendar, Receipt } from "lucide-react";

const PaymentsHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wider uppercase">
                Financials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Payment History
            </h2>
            <p className="text-gray-500">
              A record of all your completed transactions.
            </p>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2">
            <Receipt className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 font-medium">
              Total Transactions:
            </span>
            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-sm font-bold">
              {payments.length}
            </span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 w-16">
                    #
                  </th>
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Payer Name
                  </th>
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Payer Email
                  </th>
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Amount
                  </th>
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Date & Time
                  </th>
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-gray-50 transition-colors duration-150 group"
                  >
                    <td className="py-5 px-6 text-sm text-gray-400 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-semibold text-gray-900">
                        ---{user.displayName}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-semibold text-gray-900">
                        {payment.customer_email}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="inline-block font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        ${payment.amount}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {payment.paidAt}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200 select-all">
                        {payment.transactionId}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {payments.length === 0 && (
            <div className="py-16 text-center">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No payments found
              </h3>
              <p className="text-gray-500 mt-1">
                You haven't made any transactions yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsHistory;
