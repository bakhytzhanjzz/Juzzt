import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await loginUser({ email, password });
            localStorage.setItem("token", response.data.token);
            const redirectPath = location.state?.from || "/";
            navigate(redirectPath, { replace: true });
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid credentials. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFCE8]">
            <div className="w-full max-w-md px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-xl shadow-lg"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-4xl text-black font-bold" style={{ fontFamily: "League Spartan" }}>
                            Welcome back
                        </h2>
                        <p className="text-gray-600 mt-2" style={{ fontFamily: "Manrope" }}>
                            Sign in to continue your journey
                        </p>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-[#DD403A]/10 border-l-4 border-[#DD403A] p-4 mb-6 rounded"
                        >
                            <p className="text-[#DD403A]" style={{ fontFamily: "Manrope" }}>{error}</p>
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#3E363F] mb-2" style={{ fontFamily: "Space Grotesk" }}>
                                Email
                            </label>
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                className="relative"
                            >
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B42D] focus:border-transparent transition-all"
                                    style={{ fontFamily: "Space Grotesk" }}
                                />
                            </motion.div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#3E363F] mb-2" style={{ fontFamily: "Space Grotesk" }}>
                                Password
                            </label>
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                className="relative"
                            >
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B42D] focus:border-transparent transition-all"
                                    style={{ fontFamily: "Nimbus Mono" }}
                                />
                            </motion.div>
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-sm text-[#697A21] hover:text-[#B8B42D] transition-colors" style={{ fontFamily: "Manrope" }}>
                                Forgot password?
                            </Link>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-[#697A21] transition-colors flex items-center justify-center"
                            style={{ fontFamily: "Poppins" }}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "sign in"
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600" style={{ fontFamily: "Manrope" }}>
                            Don't have an account?{" "}
                            <Link to="/register" className="text-[#697A21] hover:text-[#B8B42D] font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <Link to="/" className="inline-flex items-center text-[#3E363F] hover:text-[#697A21] transition-colors" style={{ fontFamily: "Space Grotesk" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Back to home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}