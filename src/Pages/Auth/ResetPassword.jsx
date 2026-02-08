import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const oobCode = searchParams.get("oobCode"); 

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be minimum 8 characters, at least one letter and one number"
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!oobCode) {
      toast.error("Invalid or missing password reset code.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password has been reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password: " + error.message);
    }
  };

  return (
    <div className="card w-full max-w-sm mx-auto mt-10 p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Set New Password</h2>
      <form onSubmit={handleResetPassword}>
        <label className="label">New Password</label>
        <input
          type="password"
          className="input input-bordered w-full mb-4"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input input-bordered w-full mb-4"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
