// import React from "react";
// import { useForm, useWatch } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useLoaderData } from "react-router";
// import Swal from "sweetalert2";

// const BeARider = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     // formState: { errors }
//   } = useForm();
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const serviceCenters = useLoaderData();
//   console.log(serviceCenters);
//   const regionsDuplicate = serviceCenters.map((c) => c.region);

//   const regions = [...new Set(regionsDuplicate)];
//   // explore useMemo useCallback
//   const districtsByRegion = (region) => {
//     const regionDistricts = serviceCenters.filter((c) => c.region === region);
//     const districts = regionDistricts.map((d) => d.district);
//     return districts;
//   };

//   const riderRegion = useWatch({ control, name: "region" });

//   const handleRiderApplication = (data) => {
//     console.log(data);
//     axiosSecure.post("/riders", data).then((res) => {
//       if (res.data.insertedId) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title:
//             "Your application has been submitted. We will reach to you in 145 days",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     });
//   };
//   return (
//     <div>
//       <h2 className="text-4xl mt-32 text-center font-bold">Be a Rider</h2>
//       <form
//         onSubmit={handleSubmit(handleRiderApplication)}
//         className="mt-12 p-4 text-black"
//       >
//         {/* two column */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* rider Details */}

//           <fieldset className="fieldset">
//             <h4 className="text-2xl font-semibold">Rider Details</h4>
//             {/* rider name */}
//             <label className="label">Rider Name</label>
//             <input
//               type="text"
//               {...register("name")}
//               defaultValue={user?.displayName}
//               className="input w-full"
//               placeholder="Sender Name"
//             />

//             {/* rider email */}
//             <label className="label">Email</label>
//             <input
//               type="text"
//               {...register("email")}
//               defaultValue={user?.email}
//               className="input w-full"
//               placeholder="Sender Email"
//             />

//             {/* rider region */}
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend">Regions</legend>
//               <select
//                 {...register("region")}
//                 defaultValue="Pick a region"
//                 className="select"
//               >
//                 <option disabled={true}>Pick a region</option>
//                 {regions.map((r, i) => (
//                   <option key={i} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </fieldset>

//             {/* rider districts */}
//             <fieldset className="fieldset">
//               <legend className="fieldset-legend">Districts</legend>
//               <select
//                 {...register("district")}
//                 defaultValue="Pick a district"
//                 className="select"
//               >
//                 <option disabled={true}>Pick a district</option>
//                 {districtsByRegion(riderRegion).map((r, i) => (
//                   <option key={i} value={r}>
//                     {r}
//                   </option>
//                 ))}
//               </select>
//             </fieldset>

//             {/* rider address */}
//             <label className="label mt-4">Your Address</label>
//             <input
//               type="text"
//               {...register("address")}
//               className="input w-full"
//               placeholder="Sender Address"
//             />
//           </fieldset>
//           {/* receiver Details */}
//           <fieldset className="fieldset">
//             <h4 className="text-2xl font-semibold">More Details</h4>
//             {/* receiver name */}
//             <label className="label">Driving License</label>
//             <input
//               type="text"
//               {...register("license")}
//               className="input w-full"
//               placeholder="Driving License"
//             />

//             {/* receiver email */}
//             <label className="label">NID</label>
//             <input
//               type="text"
//               {...register("nid")}
//               className="input w-full"
//               placeholder="NID"
//             />

//             {/* Bike */}
//             <label className="label mt-4">BIKE</label>
//             <input
//               type="text"
//               {...register("bike")}
//               className="input w-full"
//               placeholder="Bike"
//             />
//             {/*  address */}
//           </fieldset>
//         </div>
//         <input
//           type="submit"
//           className="btn primary-btn mt-8 text-black"
//           value="Apply as a Rider"
//         />
//       </form>
//     </div>
//   );
// };

// export default BeARider;

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import TakeAwayAmico from "../../assets/Take-Away-rafiki.png";

const BeARider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  console.log(serviceCenters);
  const regionsDuplicate = serviceCenters.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];
  
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach to you in 145 days",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  // Shared Input Class for consistency
  const inputClasses = "w-full px-5 py-3 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200";
  const labelClasses = "block text-sm font-bold text-gray-700 mb-2 ml-1";

  return (
    <div className="min-h-screen  py-12 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 mt-18">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm ">Join the fleet</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 text-gray-900">
            Be a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Rider</span>
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Become a part of our delivery network. Earn competitive rates and work on your own schedule.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Side: The Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-1 bg-emerald-500 rounded-full"></div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">Application Form</h4>
                    <p className="text-sm text-gray-500">Please fill in valid details</p>
                  </div>
                </div>

                <form className="space-y-8">
                  {/* Section: Personal Info */}
                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className={labelClasses}>Full Name</label>
                      <input
                        type="text"
                        {...register("name")}
                        defaultValue={user?.displayName}
                        className={inputClasses}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="group">
                      <label className={labelClasses}>Email Address</label>
                      <input
                        type="text"
                        {...register("email")}
                        defaultValue={user?.email}
                        className={inputClasses}
                        placeholder="name@example.com"
                      />
                    </div>
                  </fieldset>

                  {/* Section: Location */}
                  <fieldset className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className={labelClasses}>Region</label>
                        <div className="relative">
                          <select
                            {...register("region")}
                            defaultValue="Pick a region"
                            className={`${inputClasses} appearance-none cursor-pointer`}
                          >
                            <option disabled={true}>Pick a region</option>
                            {regions.map((r, i) => (
                              <option key={i} value={r}>{r}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>

                      <div className="group">
                        <label className={labelClasses}>District</label>
                        <div className="relative">
                          <select
                            {...register("district")}
                            defaultValue="Pick a district"
                            className={`${inputClasses} appearance-none cursor-pointer`}
                          >
                            <option disabled={true}>Pick a district</option>
                            {districtsByRegion(riderRegion).map((r, i) => (
                              <option key={i} value={r}>{r}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className={labelClasses}>Address Line</label>
                      <input
                        type="text"
                        {...register("address")}
                        className={inputClasses}
                        placeholder="House No, Road No, Area"
                      />
                    </div>
                  </fieldset>

                  {/* Section: Documents & Vehicle */}
                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className={labelClasses}>Driving License</label>
                      <input
                        type="text"
                        {...register("license")}
                        className={inputClasses}
                        placeholder="License Number"
                      />
                    </div>

                    <div className="group">
                      <label className={labelClasses}>NID Number</label>
                      <input
                        type="text"
                        {...register("nid")}
                        className={inputClasses}
                        placeholder="National ID"
                      />
                    </div>

                    <div className="group md:col-span-2">
                      <label className={labelClasses}>Bike Details</label>
                      <input
                        type="text"
                        {...register("bike")}
                        className={inputClasses}
                        placeholder="Bike Model & Registration Number"
                      />
                    </div>
                  </fieldset>

                  <div className="pt-4">
                    <input
                      type="submit"
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-lg shadow-lg hover:shadow-emerald-500/30 transform transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                      value="Submit Application"
                      onClick={handleSubmit(handleRiderApplication)}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side: Image & Info (Sticky) */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-8 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/40 to-blue-200/40 rounded-full blur-3xl transform translate-y-10"></div>
              <img 
                src={TakeAwayAmico} 
                alt="Delivery Rider" 
                className="relative z-10 w-full drop-shadow-xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-lg shadow-emerald-100/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 mb-1">Process Overview</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Once you submit your application, our HR team will review your documents. You can expect to hear back from us within 145 days regarding your interview schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BeARider;