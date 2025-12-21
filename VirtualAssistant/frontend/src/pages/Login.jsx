import React, { useState, useEffect, useContext } from "react";
import bg from "../assets/authBg.png";
import { authStore } from "../stores/auth.store.js";
import { Eye, EyeOff } from 'lucide-react';
import { UserContext } from "../Context/usercontext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, isLogin } = authStore();
    const [showpassword, setShowpassword] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const { users, setUsers } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Mouse move 3D effect
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setOffset({ x: x * 20, y: y * 20 });
    };

    const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

    // Custom glowing cursor


    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            const result = login(email, password);
            setUsers({ ...users, ...result });
            navigate('/customize');
        }
    };

    return (
        <div
            className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Glowing cursor */}


            {/* Form container */}
            <div
                className="relative w-full max-w-md bg-white/20 p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md min-h-[380px] sm:h-[400px] flex flex-col justify-center gap-4 mx-4"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `rotateX(${offset.y / 2}deg) rotateY(${offset.x / 2}deg)`,
                    transition: "transform 0.15s ease-out",
                }}
            >
                {/* Decorative Circles */}
                <div
                    className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-b from-cyan-300/40 to-transparent backdrop-blur-lg shadow-lg"
                    style={{
                        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
                        transition: "transform 0.15s ease-out",
                    }}
                ></div>
                <div
                    className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-t from-purple-400/40 to-transparent backdrop-blur-lg shadow-lg"
                    style={{
                        transform: `translate3d(${-offset.x}px, ${-offset.y}px, 0)`,
                        transition: "transform 0.15s ease-out",
                    }}
                ></div>

                {/* Form */}
                <form className="flex flex-col gap-4 relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">Login to VA</h1>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="p-3 rounded-full bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="relative">
                        <input
                            type={showpassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className="w-full p-3 pr-10 rounded-full bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowpassword(!showpassword)}
                        >
                            {showpassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="p-3 mt-4 sm:mt-6 w-full py-3 sm:py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-lg shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] transition-all"
                    >
                        Login
                    </button>
                    <p className="text-white text-center mt-2 sm:mt-4 text-sm sm:text-base">
                        Don't have an account? <a href="/signup" className="text-cyan-300">Sign Up</a>
                    </p>
                    {isLogin && (
                        <p className="text-green-300 text-center mt-4">
                            🎉 Login Successful!
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
