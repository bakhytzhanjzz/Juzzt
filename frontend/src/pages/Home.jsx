import {useState, useEffect, useContext} from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
    const [records, setRecords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:8080/api/records")
            .then((response) => {
                setRecords(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching records:", error);
                setLoading(false);
            });
    }, []);

    const nextRecord = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === records.length - 3 ? 0 : prevIndex + 3
        );
    };

    const prevRecord = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, records.length - 3) : prevIndex - 3
        );
    };

    // Get visible records for carousel
    const getVisibleRecords = () => {
        if (records.length === 0) return [];

        const result = [];
        const numToShow = Math.min(3, records.length);

        for (let i = 0; i < numToShow; i++) {
            const index = (currentIndex + i) % records.length;
            result.push({ ...records[index], id: index });
        }
        return result;
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <Header />
            {/* Hero Section */}
            <section className="bg-[#FFFCE8] py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
                            <motion.h1
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-5xl md:text-6xl font-bold mb-4 text-black leading-tight"
                            >
                                Discover the Sound of <span className="text-[#B8B42D]">Jazz</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg text-gray-700 mb-8 max-w-md"
                            >
                                Juzzt isn't a record store. It's a place where people borrow music and never give it back.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <Link to="/records">
                                    <button
                                        className="bg-black text-white px-8 py-3 rounded-full hover:bg-[#B8B42D] transition-colors">
                                        Browse Collection
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    alt="Vinyl records"
                                    className="rounded-lg shadow-xl"
                                />
                                <div className="absolute -bottom-4 -right-4 bg-[#B8B42D] text-white px-6 py-3 rounded-lg">
                                    New Arrivals
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Records Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-black">Featured Records</h2>
                        <Link to="/records" className="text-[#697A21] hover:text-[#B8B42D] transition-colors">
                            View all →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-12 h-12 border-4 border-[#B8B42D] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="overflow-hidden py-4">
                                <AnimatePresence mode="wait">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {getVisibleRecords().map((record) => (
                                            <motion.div
                                                key={record.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4 }}
                                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                                            >
                                                <div className="h-64 bg-gray-100 relative">
                                                    {record.imageUrl ? (
                                                        <img
                                                            src={record.imageUrl}
                                                            alt={record.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-black">
                                                            <div className="w-3/4 h-3/4 rounded-full bg-[#FFFCE8] flex items-center justify-center">
                                                                <div className="w-1/3 h-1/3 rounded-full bg-black"></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="absolute top-3 right-3 bg-[#DD403A] text-white text-xs px-2 py-1 rounded">
                                                        New
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <h3 className="text-lg font-semibold text-black mb-1 truncate">{record.title}</h3>
                                                    <p className="text-gray-600 mb-3">{record.artist}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xl font-bold text-black">${record.price}</span>
                                                        <button
                                                            className="bg-black text-white px-3 py-2 rounded-full text-sm hover:bg-[#B8B42D] transition-colors"
                                                            onClick={() => addToCart(record)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation Buttons */}
                            {records.length > 3 && (
                                <div className="flex justify-center mt-8 space-x-4">
                                    <button
                                        onClick={prevRecord}
                                        className="bg-white border border-gray-200 text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
                                        aria-label="Previous records"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={nextRecord}
                                        className="bg-white border border-gray-200 text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
                                        aria-label="Next records"
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Categories Section */}
            <section className="bg-[#FFFCE8] py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-black mb-8 text-center">Browse by Genre</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {["Hard Bop", "Cool Jazz", "Jazz Fusion", "Modal Jazz"].map((category, index) => (
                            <motion.div
                                key={category}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-lg shadow-sm text-center cursor-pointer h-48 flex flex-col items-center justify-center"
                            >
                                <Link to={`/records?genre=${encodeURIComponent(category)}`}>
                                    <div
                                        className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-4">
                                        <span className="text-white text-xl">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-black">{category}</h3>
                                    <p className="text-gray-600 mt-2">Explore collection</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-black rounded-xl p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                            Subscribe to our newsletter for new arrivals, exclusive offers, and jazz insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-3 rounded-full focus:outline-none text-black w-full"
                            />
                            <button className="bg-[#B8B42D] text-white px-6 py-3 rounded-full font-medium hover:bg-[#697A21] transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}