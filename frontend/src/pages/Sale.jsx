import {useState, useEffect, useContext} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Sale() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetchSaleRecords();
    }, []);

    const fetchSaleRecords = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/records");
            const discountedRecords = response.data
                .filter(record => record.price < 20) // Fake sale filter
                .map(record => ({
                    ...record,
                    originalPrice: formatOriginalPrice(record.price)
                }));
            setRecords(discountedRecords);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching sale records:", error);
            setLoading(false);
        }
    };

    const formatOriginalPrice = (price) => {
        const fakeIncrease = (Math.random() * (10 - 5) + 5).toFixed(2);
        const finalPrice = (parseFloat(price) + parseFloat(fakeIncrease));
        return (finalPrice % 1 < 0.5) ? finalPrice.toFixed(1) + "5" : finalPrice.toFixed(0) + ".99";
    };

    return (
        <div className="min-h-screen bg-[#FFFCE8] text-black">
            <Header />

            {/* Title Section with Improved Spacing */}
            <section className="bg-[#FFFCE8] py-12 text-center">
                <h1 className="text-5xl font-bold text-black mb-5">Limited-Time Deals</h1>
                <p className="text-lg text-gray-700 mb-1">Grab your favorite records at special prices.</p>
            </section>

            {/* Sale Records Grid */}
            <section className="container mx-auto px-4 pb-16">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-[#B8B42D] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {records.length > 0 ? (
                            records.map((record) => (
                                <motion.div
                                    key={record.id}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                                    whileHover={{ rotate: 1.5 }}
                                >
                                    <Link to={`/records/${record.id}`} className="block h-64 bg-gray-100 relative overflow-hidden">
                                        {record.imageUrl ? (
                                            <img
                                                src={record.imageUrl}
                                                alt={record.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-black">
                                                <div className="w-3/4 h-3/4 rounded-full bg-[#FFFCE8] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                                    <div className="w-1/3 h-1/3 rounded-full bg-black"></div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-[#DD403A] text-white text-lg px-4 py-2 rounded-lg font-bold shadow-md">
                                            SALE
                                        </div>
                                    </Link>
                                    <div className="p-5">
                                        <Link
                                            to={`/records/${record.id}`}
                                            className="block text-lg font-semibold text-black mb-1 truncate hover:text-[#B8B42D] transition-colors"
                                        >
                                            {record.title}
                                        </Link>
                                        <p className="text-gray-600">{record.artist}</p>
                                        <div className="flex justify-between items-center mt-3">
                                            <div>
                                                <span className="text-xl font-bold text-black">${record.price}</span>
                                                <span className="text-red-500 text-sm line-through ml-2">${record.originalPrice}</span>
                                            </div>
                                            <button
                                                className="bg-black text-white px-3 py-2 rounded-full text-sm hover:bg-[#B8B42D] transition-colors"
                                                onClick={() => addToCart(record)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-3 py-16 text-center">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h3 className="text-xl font-medium mb-1">No Records Found</h3>
                                <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
