import { Link } from "react-router";
import React from "react";

const PaymentCancel = () => {
  return (
    <div>
      <h2>payment cancel</h2>
      <Link to="/dashboard/my-parcels"><button className="btn primary-btn">
       Try again
       </button> </Link>
    </div>
  );
};

export default PaymentCancel;
