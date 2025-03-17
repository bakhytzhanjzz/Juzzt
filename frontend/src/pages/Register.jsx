import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();

    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length > 6) strength += 1;
        if (pass.match(/[A-Z]/)) strength += 1;
        if (pass.match(/[0-9]/)) strength += 1;
        if (pass.match(/[^a-zA-Z0-9]/)) strength += 1;
        setPasswordStrength(strength);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        checkPasswordStrength(newPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await registerUser({ name, email, password });
            navigate("/login");
        } catch (err) {
            setError("Registration failed. Try again.");
            setIsLoading(false);
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-200";
        if (passwordStrength === 1) return "bg-red-500";
        if (passwordStrength === 2) return "bg-orange-500";
        if (passwordStrength === 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength === 1) return "Weak";
        if (passwordStrength === 2) return "Fair";
        if (passwordStrength === 3) return "Good";
        return "Strong";
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
                            Create your account
                        </h2>
                        <p className="text-gray-600 mt-2" style={{ fontFamily: "Manrope" }}>
                            Join our music community today
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

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#3E363F] mb-2" style={{ fontFamily: "Space Grotesk" }}>
                                Name
                            </label>
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B42D] focus:border-transparent transition-all"
                                    style={{ fontFamily: "Space Grotesk" }}
                                />
                            </motion.div>
                        </div>

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
                                    onChange={handlePasswordChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8B42D] focus:border-transparent transition-all"
                                    style={{ fontFamily: "Space Grotesk" }}
                                />
                            </motion.div>

                            {password && (
                                <div className="mt-2">
                                    <div className="flex items-center mt-1">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${passwordStrength * 25}%` }}
                                                transition={{ duration: 0.3 }}
                                                className={`h-2 rounded-full ${getStrengthColor()}`}
                                            ></motion.div>
                                        </div>
                                        <span className="ml-2 text-xs text-gray-500" style={{ fontFamily: "Space Grotesk" }}>
                                            {getStrengthText()}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-[#697A21] transition-colors flex items-center justify-center mt-2"
                            style={{ fontFamily: "Poppins" }}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "sign up"
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600" style={{ fontFamily: "Manrope" }}>
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#697A21] hover:text-[#B8B42D] font-medium transition-colors">
                                Sign in
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