import React, { useState } from "react";

export default function VerifyOtp({ email, onVerified }) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("fp_demo_otp"));
    if (!stored || stored.email !== email)
      return setMessage("No OTP request found.");
    if (stored.otp === otp) {
      setMessage("OTP verified successfully!");
      onVerified();
    } else setMessage("Invalid OTP. Try again.");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 border rounded-md"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded-md"
        >
          Verify OTP
        </button>
      </form>
      {message && <p className="text-xs text-gray-600 mt-3">{message}</p>}
    </div>
  );
}
