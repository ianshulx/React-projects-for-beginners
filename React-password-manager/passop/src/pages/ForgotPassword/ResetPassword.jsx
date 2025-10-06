import React, { useState } from "react";

export default function ResetPassword({ email, onDone }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (password.length < 6) return setMessage("Password too short");
    if (password !== confirm) return setMessage("Passwords do not match");

    const usersRaw = localStorage.getItem("fp_demo_users") || "{}";
    const users = JSON.parse(usersRaw);
    users[email] = { password };
    localStorage.setItem("fp_demo_users", JSON.stringify(users));

    localStorage.removeItem("fp_demo_otp");
    setMessage("Password reset successful (demo only).");
    onDone();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded-md"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="text-xs text-gray-600 mt-3">{message}</p>}
    </div>
  );
}
