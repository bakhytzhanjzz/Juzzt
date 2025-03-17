import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in by looking for the token
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleProfileClick = () => {
        if (isLoggedIn) {
            navigate("/profile"); // ✅ Redirect to profile if logged in
        } else {
            navigate("/login"); // ✅ Redirect to login if NOT logged in
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold text-black">
                    Juzzt<span className="text-[#B8B42D]">.</span>
                </Link>

                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="font-medium hover:text-[#B8B42D] transition-colors">Home</Link>
                    <Link to="/records" className="font-medium hover:text-[#B8B42D] transition-colors">Records</Link>
                    <Link to="/about" className="font-medium hover:text-[#B8B42D] transition-colors">About</Link>
                    <Link to="/sale" className="font-medium hover:text-[#B8B42D] transition-colors">Sale</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:text-[#B8B42D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <button className="p-2 hover:text-[#B8B42D] transition-colors relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-[#DD403A] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </button>
                    <button onClick={handleProfileClick} className="p-2 hover:text-[#B8B42D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
