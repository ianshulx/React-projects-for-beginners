import React, { useState } from "react";

export default function ForgotPassword({ onOtpSent }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) return setMessage("Please enter your email");

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    localStorage.setItem("fp_demo_otp", JSON.stringify({ email, otp }));
    setMessage(`OTP sent successfully (demo only, your OTP is ${otp})`);
    onOtpSent(email);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">Forgot Password</h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter your email to receive an OTP.
      </p>
      <form onSubmit={handleSendOtp} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Send OTP
        </button>
      </form>
      {message && <p className="text-xs text-gray-600 mt-3">{message}</p>}
    </div>
  );
}
