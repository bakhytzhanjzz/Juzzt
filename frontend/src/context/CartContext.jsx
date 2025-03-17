import { createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Create Cart Context
export const CartContext = createContext();

// CartProvider Component
export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Store navigation function reference
    const [navigateFunction, setNavigateFunction] = useState(null);

    // Method to set the navigate function from components
    const setNavigate = (navigateFn) => {
        setNavigateFunction(navigateFn);
    };

    useEffect(() => {
        // Try loading cart from localStorage (optional)
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart to localStorage whenever it changes
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (record) => {
        // Check if the item already exists in the cart
        const existingItem = cart.find((item) => item.id === record.id);

        // Update the cart
        setCart((prevCart) => {
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === record.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...record, quantity: 1 }];
        });

        // Generate a unique toast ID to prevent duplicates
        const toastId = `cart-add-${record.id}-${Date.now()}`;

        // Create the content for the notification outside of the toast component
        const NotificationContent = (
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                    {record.imageUrl ? (
                        <img
                            src={record.imageUrl}
                            alt={record.title}
                            className="w-12 h-12 object-cover rounded-md"
                        />
                    ) : (
                        <div className="w-12 h-12 bg-black rounded-md flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#FFFCE8] flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-black"></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-black text-sm mb-0.5">Added to Cart</h4>
                    <p className="text-gray-700 text-xs mb-1.5">{record.title} by {record.artist || 'Unknown Artist'}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#697A21]">${(record.price || 0).toFixed(2)}</span>
                        <button
                            onClick={() => {
                                // Close toast
                                toast.dismiss(toastId);

                                // Navigate to cart if navigate function exists
                                if (navigateFunction) {
                                    navigateFunction('/cart');
                                } else {
                                    // Fallback if navigate isn't available
                                    window.location.href = '/cart';
                                }
                            }}
                            className="text-xs text-white bg-black hover:bg-[#B8B42D] transition-colors px-2 py-1 rounded-full"
                        >
                            View Cart
                        </button>
                    </div>
                </div>
            </div>
        );

        // Use the toast ID to prevent duplicates
        toast.success(
            () => NotificationContent,
            {
                toastId: toastId,
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                className: "custom-toast-success",
                bodyClassName: "p-0",
                progressClassName: "bg-[#B8B42D]",
                icon: false,
                closeButton: true
            }
        );
    };

    const removeFromCart = (id) => {
        // Find the item before removing it
        const itemToRemove = cart.find(item => item.id === id);

        setCart((prevCart) => prevCart.filter((item) => item.id !== id));

        if (itemToRemove) {
            // Generate a unique toast ID
            const toastId = `cart-remove-${id}-${Date.now()}`;

            toast.info(
                `Removed "${itemToRemove.title}" from cart`,
                {
                    toastId: toastId,
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    className: "custom-toast-info",
                    icon: "🎵",
                    closeButton: true
                }
            );
        }
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);

        // Generate a unique toast ID
        const toastId = `cart-clear-${Date.now()}`;

        toast.info(
            "Your cart has been cleared",
            {
                toastId: toastId,
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "custom-toast-info",
                closeButton: true
            }
        );
    };

    // Calculate total items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate total price
    const totalPrice = cart?.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0) || 0;

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
            setNavigate
        }}>
            {children}
            <ToastContainer
                limit={3}
                newestOnTop
                containerId="cartNotifications"
            />
        </CartContext.Provider>
    );
}