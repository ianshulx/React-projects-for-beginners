// src/Login.jsx
import React, { Fragment, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { login, register } from "../store/slices/SliceWish";

export default function Modal({ modal, setModal }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
  
    const foundUser = JSON.parse(localStorage.getItem("users"))?.find(
      (u) => u.email === email && u.password === password
    );
  
    if (!foundUser) {
      toast.error("User not found or wrong password!");
      return;
    }
  
    dispatch(login({ email, password }));
    toast.success("Logged in successfully!");
    setModal(false);
  };
  
  const handleRegister = () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
  
    const exists = JSON.parse(localStorage.getItem("users"))?.find(
      (u) => u.email === email
    );
  
    if (exists) {
      toast.error("User already registered!");
      return;
    }
  
    dispatch(register({ name, email, password }));
    toast.success("Registered successfully!");
    setModal(false);
  };
  

  return (
    <Fragment>
      {modal && (
        <div className="min-h-screen overflow-hidden inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 fixed flex flex-col items-center justify-center">
          <div className="bg-white shadow-md rounded-2xl p-8 w-[480px] h-[500px] text-center">
            
            {isLogin ? (
              <>
                <h2 className="text-2xl font-bold mt-4">Login</h2>

                <div className="text-left mt-12 mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="text-left mb-4 relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                    onClick={togglePassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  onClick={handleLogin}
                  className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md font-semibold transition-all"
                >
                  Login
                </button>

                <p className="text-sm text-gray-600 mt-6">
                  Don’t have an Account yet?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="text-green-600 font-semibold hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mt-4">Register</h2>

                <div className="text-left mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="text-left mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="text-left mb-4 relative">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                    onClick={togglePassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  onClick={handleRegister}
                  className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md font-semibold transition-all"
                >
                  Register
                </button>

                <p className="text-sm text-gray-600 mt-6">
                  Already have an Account?{" "}
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-green-600 font-semibold hover:underline cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            )}

          </div>

          <button
            onClick={() => setModal(false)}
            className="bg-white flex gap-2 mt-2 items-center p-3 rounded-xl"
          >
            <FaTimes className="text-xs" /> <span className="text-xs">Close</span>
          </button>
        </div>
      )}
    </Fragment>
  );
}
