// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import React from 'react';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { FileEdit, MagnetIcon, Trash } from 'lucide-react';
// import Swal from 'sweetalert2';
// import { Link } from 'react-router';

// const MyParcels = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     const { data: parcels = [] } = useQuery({
//     // const { data: parcels = [], refetch } = useQuery({
//         queryKey: ['my-parcels', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/parcels?email=${user.email}`);
//             return res.data;
//         },
//         enabled: !!user?.email, // Only run query if user email exists
//     })
// const handleParcelDelete = async (id) => {
//     console.log('deleting parcel', id);

//     const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//     });

//     if (!result.isConfirmed) return;

//     try {
//         const response = await axiosSecure.delete(`/parcels/${id}`);
//         console.log("Parcel deleted:", response.data);

//         if (response.data && response.data.deletedCount > 0) {
//           // refetch();
//             await Swal.fire({
//                 title: "Deleted!",
//                 text: "Your parcel has been deleted.",
//                 icon: "success",
//                 confirmButtonText: "OK",
//             });
//             // refresh the parcels list
//             queryClient.invalidateQueries(['my-parcels', user?.email]);
//         } else {
//             Swal.fire({
//                 title: "Error!",
//                 text: "Failed to delete parcel. Please try again.",
//                 icon: "error",
//                 confirmButtonText: "OK",
//             });
//         }
//     } catch (error) {
//         console.error("Delete error:", error);
//         Swal.fire({
//             title: "Error!",
//             text: "Failed to delete parcel. Please try again.",
//             icon: "error",
//             confirmButtonText: "OK",
//         });
//     }
// };
// console.log(parcels)

// const handlePayment =async (parcel) => {
//   const paymentInfo = {
//     parcelId: parcel._id,
//     parcelName: parcel.parcelName,
//     cost: parcel.cost,
//     senderEmail: parcel.senderEmail,
//   };
//   console.log(paymentInfo)
//   const response = await
//   axiosSecure
//     .post("/create-checkout-session", paymentInfo)
//     .then((response) => {
//       if (response.data.url) {
//         // window.location.href = response.data.url;
//         window.location.assign(response.data.url);
//       }
//     })
//     .catch((error) => {
//       console.error("Error creating checkout session:", error);
//     });
//   };

//     return (
//         <div>
//             <h2>All of my parcels : {parcels.length}</h2>
//             <div className="overflow-x-auto">
//   <table className="table table-zebra">
//     {/* head */}
//     <thead>
//       <tr>
//         <th></th>
//         <th>Parcel Name</th>
//         <th>Cost</th>
//         <th>Payment Status</th>
//         <th>Delivery Status</th>
//         <th>Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {
//         parcels.map((parcel, index) => <tr key={parcel._id}>

//         <th>{index + 1}</th>
//         <td>{parcel.parcelName}</td>
//         <td>{parcel.cost}</td>
//         <td>
//           {
//             parcel.paymentStatus === 'Paid' ? <span className='text-green-600 font-bold'>Paid</span>

//             :
//             // <Link to={`/dashboard/payment/${parcel._id}`}>
//             <button
//             onClick= {() => handlePayment(parcel)}
//             className='btn primary-btn btn-sm text-red-600 font-bold'>Pay</button>
//             // </Link>
//           }
//         </td>
//         <td>{parcel.deliveryStatus}</td>
//         <td>
//           <button className='btn btn-square hover:bg-gray-200'>
//             <FileEdit className='w-6 h-6 '></FileEdit>
//           </button>
//           <button className='btn  btn-square hover:bg-gray-200  mx-2'>
//             <MagnetIcon className='w-6 h-6  '></MagnetIcon>
//           </button>
//           <button
//           onClick={() => handleParcelDelete(parcel._id)}
//           className='btn btn-square hover:bg-gray-200 '>
//             <Trash className='w-6 h-6 '></Trash>
//           </button>
//         </td>
//       </tr>)
//       }
//     </tbody>
//   </table>
// </div>
//         </div>
//     );
// };

// export default MyParcels;

import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FileEdit, MagnetIcon, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: parcels = [] } = useQuery({
    // const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run query if user email exists
  });
  const handleParcelDelete = async (id) => {
    console.log("deleting parcel", id);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axiosSecure.delete(`/parcels/${id}`);
      console.log("Parcel deleted:", response.data);

      if (response.data && response.data.deletedCount > 0) {
        // refetch();
        await Swal.fire({
          title: "Deleted!",
          text: "Your parcel has been deleted.",
          icon: "success",
          confirmButtonText: "OK",
        });
        // refresh the parcels list
        queryClient.invalidateQueries(["my-parcels", user?.email]);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete parcel. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete parcel. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  console.log(parcels);

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      cost: parcel.cost,
      senderEmail: parcel.senderEmail,
    };
    console.log(paymentInfo);
    const response = await axiosSecure
      .post("/create-checkout-session", paymentInfo)
      .then((response) => {
        if (response.data.url) {
          // window.location.href = response.data.url;
          window.location.assign(response.data.url);
        }
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              My Parcels
            </h2>
            <p className="text-gray-500 mt-1">
              Manage your shipments and track delivery status
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <span className="text-sm font-medium text-gray-600">
              Total Bookings:
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {parcels.length}
            </span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    #
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Parcel Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Cost
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Delivery Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {parcels.map((parcel, index) => (
                  <tr
                    key={parcel._id}
                    className="hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-400 font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800">
                        {parcel.parcelName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      {parcel.cost}
                    </td>
                    <td className="px-6 py-4">
                      {parcel.paymentStatus === "Paid" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(parcel)}
                          className="inline-flex items-center px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wide shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
                        {parcel.deliveryStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105"
                          title="Edit"
                        >
                          <FileEdit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200 hover:scale-105"
                          title="Manage"
                        >
                          <MagnetIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleParcelDelete(parcel._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-105"
                          title="Delete"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {parcels.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              You haven't booked any parcels yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyParcels;
