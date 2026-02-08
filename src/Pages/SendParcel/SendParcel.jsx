import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
      parcelName: "",
      parcelWeight: "",
      senderName: "",
      senderEmail: "",
      senderWireHouse: "",
      senderAddress: "",
      senderContact: "",
      senderRegion: "",
      pickupInstruction: "",
      receiverName: "",
      receiverEmail: "",
      receiverWireHouse: "",
      receiverAddress: "",
      receiverContact: "",
      receiverRegion: "",
      deliveryInstruction: "",
    },
  });
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const serviceCenters = useLoaderData() || [];
  // console.log(serviceCenters)
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions)

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts =
      serviceCenters.filter((c) => c.region === region) || [];
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    console.log("cost", cost);
    (data.cost = cost), (data.status = "pending");
    data.bookingDate = new Date().toISOString();
    data.userEmail = user?.email;

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "I agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure
          .post("/parcels", data)
          .then((res) => {
            console.log("after saving parcel", res.data);
            if (res.data.insertedId) {
              navigate('/dashboard/my-parcels')
              // ✅ Invalidate queries to refetch parcels
              // queryClient.invalidateQueries({
              //   queryKey: ["myParcels", user?.email],
              // });

              // ✅ Show success message
              Swal.fire({
                title: "Success!",
                text: "Your parcel has been booked successfully.Please proceed to payment.",
                icon: "success",
                confirmButtonText: "OK",
              });

              // ✅ Reset form
              reset();
            }
          })
          .catch((error) => {
            console.error("Error saving parcel:", error);

            // ✅ Show error message
            Swal.fire({
              title: "Error!",
              text: "Failed to book parcel. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen my-28">
      <div className="max-w-7xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-16">
            <h2 className="card-title text-5xl font-bold text-gray-900 mb-6">
              Add Parcel
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Parcel Details Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Enter your parcel details
                </h3>

                {/* Document Type Radio Buttons */}
                <div className="flex gap-6 mb-6">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      {...register("parcelType")}
                      value="document"
                      className="radio radio-success"
                    />
                    <span className="label-text font-medium">Document</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      {...register("parcelType")}
                      value="not-document"
                      className="radio radio-success"
                    />
                    <span className="label-text font-medium">Not-Document</span>
                  </label>
                </div>

                {/* Parcel Name and Weight */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Parcel Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Parcel Name"
                      {...register("parcelName", {
                        required: "Parcel name is required",
                      })}
                      className={`input input-bordered w-full ${
                        errors.parcelName ? "input-error" : ""
                      }`}
                    />
                    {errors.parcelName && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.parcelName.message}
                        </span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Parcel Weight (KG)
                      </span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Parcel Weight (KG)"
                      {...register("parcelWeight", {
                        required: "Weight is required",
                      })}
                      className={`input input-bordered w-full ${
                        errors.parcelWeight ? "input-error" : ""
                      }`}
                    />
                    {errors.parcelWeight && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.parcelWeight.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Sender and Receiver Details Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                {/* Sender Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Sender Details
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Sender Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Sender Name"
                          {...register("senderName", { required: "Required" })}
                          defaultValue={user?.displayName}
                          className={`input input-bordered w-full ${
                            errors.senderName ? "input-error" : ""
                          }`}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Sender Email
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Sender Email"
                          {...register("senderEmail", { required: "Required" })}
                          defaultValue={user?.email}
                          className={`input input-bordered w-full ${
                            errors.senderEmail ? "input-error" : ""
                          }`}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Sender Pickup Wire house
                          </span>
                        </label>
                        <select
                          {...register("senderWireHouse", {
                            required: "Required",
                          })}
                          className={`select select-bordered w-full ${
                            errors.senderWireHouse ? "select-error" : ""
                          }`}
                        >
                          <option value="">Select Wire house</option>
                          <option value="warehouse1">Warehouse 1</option>
                          <option value="warehouse2">Warehouse 2</option>
                          <option value="warehouse3">Warehouse 3</option>
                          {/* --------------------------------------------     */}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Address
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Address"
                          {...register("senderAddress", {
                            required: "Required",
                          })}
                          className={`input input-bordered w-full ${
                            errors.senderAddress ? "input-error" : ""
                          }`}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Sender Contact No
                          </span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Sender Contact No"
                          {...register("senderContact", {
                            required: "Required",
                          })}
                          className={`input input-bordered w-full ${
                            errors.senderContact ? "input-error" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Sender Region
                        </span>
                      </label>
                      <select
                        {...register("senderRegion", { required: "Required" })}
                        className={`select select-bordered w-full ${
                          errors.senderRegion ? "select-error" : ""
                        }`}
                      >
                        <option value="">Select your region</option>
                        {regions.map((r, i) => (
                          <option key={i} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* --------------------------------------------  */}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Sender Districts
                        </span>
                      </label>
                      <select
                        {...register("senderDistrict", {
                          required: "Required",
                        })}
                        className={`select select-bordered w-full ${
                          errors.senderDistrict ? "select-error" : ""
                        }`}
                      >
                        <option value="">Select your district</option>
                        {districtsByRegion(senderRegion).map((d, i) => (
                          <option key={i} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* -----------------------------------  */}
                    <div className="form-control ">
                      <label className="label">
                        <span className="label-text font-medium">
                          Pickup Instruction
                        </span>
                      </label>
                      <textarea
                        placeholder="Pickup Instruction"
                        {...register("pickupInstruction")}
                        className="textarea textarea-bordered h-24 w-full"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Receiver Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Receiver Details
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Receiver Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Receiver Name"
                          {...register("receiverName", {
                            required: "Required",
                          })}
                          className={`input input-bordered w-full ${
                            errors.receiverName ? "input-error" : ""
                          }`}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Receiver Email
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Receiver Email"
                          {...register("receiverEmail", {
                            required: "Required",
                          })}
                          className={`input input-bordered w-full ${
                            errors.receiverEmail ? "input-error" : ""
                          }`}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Receiver Delivery Wire house
                          </span>
                        </label>
                        <select
                          {...register("receiverWireHouse", {
                            required: "Required",
                          })}
                          className={`select select-bordered w-full ${
                            errors.receiverWireHouse ? "select-error" : ""
                          }`}
                        >
                          <option value="">Select Wire house</option>
                          <option value="warehouse1">Warehouse 1</option>
                          <option value="warehouse2">Warehouse 2</option>
                          <option value="warehouse3">Warehouse 3</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Receiver Address
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Address"
                          {...register("receiverAddress", {
                            required: "Required",
                          })}
                          className={`input input-bordered w-full ${
                            errors.receiverAddress ? "input-error" : ""
                          }`}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Receiver Contact No
                          </span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Receiver Contact No"
                          {...register("receiverContact", {
                            required: "Required",
                          })}
                          className={`input input-bordered w-full ${
                            errors.receiverContact ? "input-error" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Receiver Region
                        </span>
                      </label>
                      <select
                        {...register("receiverRegion", {
                          required: "Required",
                        })}
                        className={`select select-bordered w-full ${
                          errors.receiverRegion ? "select-error" : ""
                        }`}
                      >
                        <option value="">Select your region</option>
                        {regions.map((r, i) => (
                          <option key={i} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Receiver Districts
                        </span>
                      </label>
                      <select
                        {...register("receiverDistrict", {
                          required: "Required",
                        })}
                        className={`select select-bordered w-full ${
                          errors.receiverDistrict ? "select-error" : ""
                        }`}
                      >
                        <option value="">Select your district</option>
                        {districtsByRegion(receiverRegion).map((d, i) => (
                          <option key={i} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* -----------------  */}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Delivery Instruction
                        </span>
                      </label>
                      <textarea
                        placeholder="Delivery Instruction"
                        {...register("deliveryInstruction")}
                        className="textarea textarea-bordered h-24 w-full"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note and Submit Button */}
              <div className="mt-10">
                <p className="text-sm text-gray-600 mb-4">
                  * PickUp Time 4pm-7pm Approx.
                </p>
                <button
                  type="submit"
                  className="btn btn-success text-white px-8 mt-6"
                >
                  Proceed to Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendParcel;
