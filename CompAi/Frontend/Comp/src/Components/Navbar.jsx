import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Info, Menu, X } from "lucide-react";

/**
 * Navigation bar component with responsive mobile menu
 */
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const openMenu = () => setIsMenuOpen(true);

    return (
        <>
            <header className="shadow-md border-b border-gray-800 fixed w-full z-50 backdrop-blur bg-[#1a1a1a]/80">
                <div className="container mx-auto flex justify-between items-center px-4 py-4 h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gradient-accent">
                            CompAi
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                        >
                            <Home size={18} /> Home
                        </Link>
                        <Link
                            to="/about"
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                        >
                            <Info size={18} /> About
                        </Link>
                    </nav>

                    <button
                        onClick={openMenu}
                        className="md:hidden text-gray-300 hover:text-white"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile menu backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Mobile menu sidebar */}
            <aside
                className={`fixed top-0 right-0 w-64 h-full bg-[#1a1a1a] shadow-lg z-50 transform transition-transform duration-300 ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } md:hidden`}
            >
                <div className="p-4 flex flex-col gap-6">
                    <button
                        onClick={closeMenu}
                        className="self-end text-gray-400 hover:text-white"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                    >
                        <Home size={18} /> Home
                    </Link>
                    <Link
                        to="/about"
                        onClick={closeMenu}
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                    >
                        <Info size={18} /> About
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
