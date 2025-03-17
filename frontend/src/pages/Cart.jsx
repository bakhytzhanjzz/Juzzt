import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useContext(CartContext);
    const navigate = useNavigate();
    const [isClearing, setIsClearing] = useState(false);

    const handleClearCart = () => {
        setIsClearing(true);
        setTimeout(() => {
            clearCart();
            setIsClearing(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <Header />

            <div className="bg-[#FFFCE8] py-8">
                <div className="container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-black mb-2"
                    >
                        Your Cart
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-600 mb-6"
                    >
                        {cart.length > 0
                            ? `You have ${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`
                            : "Your cart is currently empty"}
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-black mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 max-w-md mx-auto mb-8">
                            Looks like you haven't found your perfect jazz record yet.
                            Let's help you discover something special.
                        </p>
                        <Link to="/records">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black text-white px-8 py-3 rounded-full hover:bg-[#B8B42D] transition-colors"
                            >
                                Browse Collection
                            </motion.button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:w-2/3"
                        >
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                    <h2 className="text-xl font-semibold text-black">Cart Items</h2>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {cart.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex flex-col sm:flex-row items-center sm:items-start p-6 gap-4"
                                        >
                                            {/* Record Image */}
                                            <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-black">
                                                        <div className="w-3/4 h-3/4 rounded-full bg-[#FFFCE8] flex items-center justify-center">
                                                            <div className="w-1/3 h-1/3 rounded-full bg-black"></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Record Details */}
                                            <div className="flex-1 text-center sm:text-left">
                                                <h3 className="text-xl font-semibold text-black mb-1">{item.title}</h3>
                                                <p className="text-gray-600 mb-2">{item.artist}</p>
                                                <p className="text-lg font-bold text-black mb-3">${item.price.toFixed(2)}</p>

                                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                                    {/* Quantity Selector */}
                                                    <div className="inline-flex items-center border border-gray-200 rounded-full">
                                                        <button
                                                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full"
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-10 text-center">{item.quantity}</span>
                                                        <button
                                                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700 transition flex items-center gap-1 text-sm"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Item Total Price - Mobile Hidden, Desktop Visible */}
                                            <div className="hidden sm:block text-right">
                                                <p className="text-lg font-bold text-black">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    ${item.price.toFixed(2)} each
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Cart Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:w-1/3"
                        >
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 sticky top-6">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                    <h2 className="text-xl font-semibold text-black">Order Summary</h2>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-black font-bold">${(totalPrice || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-black font-medium">Calculated at checkout</span>
                                    </div>

                                    <div className="h-px bg-gray-200 my-4"></div>

                                    <div className="flex justify-between mb-6">
                                        <span className="text-lg font-bold text-black">Total</span>
                                        <span className="text-lg font-bold text-black">${totalPrice.toFixed(2)}</span>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate("/checkout")}
                                        className="w-full bg-black text-white py-3 rounded-full hover:bg-[#B8B42D] transition mb-3"
                                    >
                                        Proceed to Checkout
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleClearCart}
                                        disabled={isClearing}
                                        className="w-full bg-white text-black border border-gray-300 py-3 rounded-full hover:bg-gray-100 transition"
                                    >
                                        {isClearing ? "Clearing..." : "Clear Cart"}
                                    </motion.button>

                                    <div className="mt-6">
                                        <Link to="/records" className="text-[#697A21] hover:text-[#B8B42D] transition-colors flex items-center justify-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Related Records Section - Show only when cart is empty */}
            {cart.length === 0 && (
                <section className="py-16 bg-[#FFFCE8]">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-black mb-8">You Might Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                                >
                                    <div className="h-48 bg-gray-100 relative">
                                        <div className="w-full h-full flex items-center justify-center bg-black">
                                            <div className="w-3/4 h-3/4 rounded-full bg-[#FFFCE8] flex items-center justify-center">
                                                <div className="w-1/3 h-1/3 rounded-full bg-black"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-semibold text-black mb-1">Jazz Record #{item}</h3>
                                        <p className="text-gray-600 mb-3">Various Artists</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-black">$24.99</span>
                                            <button className="bg-black text-white px-3 py-2 rounded-full text-sm hover:bg-[#B8B42D] transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-black rounded-xl p-8 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
                        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
                            Subscribe to our newsletter for exclusive discounts, new arrivals, and jazz recommendations.
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