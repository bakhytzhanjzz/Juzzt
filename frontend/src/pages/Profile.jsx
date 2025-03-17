import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await getProfile(token);
                console.log("Profile Data:", res.data);
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFCE8]">
            <div className="w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#B8B42D] opacity-10 rounded-full"></div>
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#697A21] opacity-10 rounded-full"></div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="w-12 h-12 border-4 border-[#B8B42D] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500" style={{ fontFamily: "Manrope" }}>Loading profile...</p>
                        </div>
                    ) : user ? (
                        <>
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-24 h-24 bg-[#697A21] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                                    style={{ fontFamily: "Space Grotesk" }}
                                >
                                    {getInitials(user.name)}
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="text-3xl font-bold text-[#3E363F]"
                                    style={{ fontFamily: "League Spartan" }}
                                >
                                    {user.name || "music lover"}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-gray-500"
                                    style={{ fontFamily: "Manrope" }}
                                >
                                    Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </motion.p>
                            </div>

                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="bg-[#FFFCE8] p-4 rounded-lg"
                                >
                                    <h3 className="text-sm text-[#697A21] font-medium mb-1" style={{ fontFamily: "Space Grotesk" }}>EMAIL</h3>
                                    <p className="text-[#3E363F] break-all" style={{ fontFamily: "Space Grotesk" }}>{user.email}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="bg-[#FFFCE8] p-4 rounded-lg"
                                >
                                    <h3 className="text-sm text-[#697A21] font-medium mb-1" style={{ fontFamily: "Space Grotesk" }}>MEMBERSHIP</h3>
                                    <p className="text-[#3E363F]" style={{ fontFamily: "Space Grotesk" }}>Standard</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="bg-[#FFFCE8] p-4 rounded-lg"
                                >
                                    <h3 className="text-sm text-[#697A21] font-medium mb-1" style={{ fontFamily: "Space Grotesk" }}>RECENT ACTIVITY</h3>
                                    <p className="text-[#3E363F]" style={{ fontFamily: "Space Grotesk" }}>No recent activity</p>
                                </motion.div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <Link to="/">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center text-[#3E363F] bg-gray-100 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                                        style={{ fontFamily: "Space Grotesk" }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                        </svg>
                                        Home
                                    </motion.button>
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center text-white bg-[#DD403A] py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                                    style={{ fontFamily: "Space Grotesk" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 4.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L14.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M3 7a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Logout
                                </motion.button>
                            </div>

                            {/* Logout confirmation modal */}
                            {showLogoutConfirm && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                >
                                    <div className="bg-white rounded-lg p-6 w-80 text-center">
                                        <h3 className="text-xl font-bold mb-4" style={{ fontFamily: "League Spartan" }}>
                                            are you sure?
                                        </h3>
                                        <p className="mb-6 text-gray-600" style={{ fontFamily: "Manrope" }}>
                                            You'll be logged out of your account
                                        </p>
                                        <div className="flex justify-between space-x-4">
                                            <button
                                                onClick={cancelLogout}
                                                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                                                style={{ fontFamily: "Space Grotesk" }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={confirmLogout}
                                                className="flex-1 py-2 bg-[#DD403A] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                                                style={{ fontFamily: "Space Grotesk" }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-red-500 mb-4" style={{ fontFamily: "Manrope" }}>
                                Unable to load profile data
                            </p>
                            <Link to="/login">
                                <button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-[#B8B42D] transition-colors" style={{ fontFamily: "Space Grotesk" }}>
                                    Return to Login
                                </button>
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}