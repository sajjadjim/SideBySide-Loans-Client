import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Rider Approvals
            </h2>
            <p className="text-gray-500 mt-2">
              Manage and verify rider applications
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
            <span className="text-gray-600 font-medium">Pending Requests:</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg font-bold">
              {riders.length}
            </span>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="p-5 text-sm font-semibold tracking-wide text-gray-500 uppercase text-center w-16">
                    #
                  </th>
                  <th className="p-5 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Rider Name
                  </th>
                  <th className="p-5 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="p-5 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    District
                  </th>
                  <th className="p-5 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="p-5 text-sm font-semibold tracking-wide text-gray-500 uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {riders.map((rider, index) => (
                  <tr
                    key={rider._id}
                    className="hover:bg-gray-50/80 transition-colors duration-200"
                  >
                    <td className="p-5 text-center text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-gray-800">
                        {rider.name}
                      </div>
                    </td>
                    <td className="p-5 text-gray-600">{rider.email}</td>
                    <td className="p-5 text-gray-600">{rider.district}</td>
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          rider.status === "approved"
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : rider.status === "rejected"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {rider.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 transition-all hover:scale-105 active:scale-95"
                          title="Approve"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => handleApproval(rider)}
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 transition-all hover:scale-105 active:scale-95"
                          title="Approve"
                        >
                          <FaUserCheck size={18} />
                        </button>

                        <button
                          onClick={() => handleRejection(rider)}
                          className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-100 transition-all hover:scale-105 active:scale-95"
                          title="Reject"
                        >
                          <IoPersonRemoveSharp size={18} />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 transition-all hover:scale-105 active:scale-95"
                          title="Delete"
                        >
                          <FaTrashCan size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {riders.length === 0 && (
            <div className="p-12 text-center text-gray-400 bg-gray-50">
              No pending riders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveRiders;
