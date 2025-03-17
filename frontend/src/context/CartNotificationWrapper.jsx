import { useNavigate } from "react-router-dom";

const CartNotificationWrapper = ({ record, closeToast, navigateFunction }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        console.log("Close button clicked!"); // Debugging Log
        if (closeToast && typeof closeToast === 'function') {
            closeToast();  // Use the closeToast function provided by react-toastify
        }
    };

    const handleViewCart = () => {
        // Close the toast first
        if (closeToast && typeof closeToast === 'function') {
            closeToast();
        }

        // Then navigate
        if (navigateFunction) {
            navigateFunction('/cart');
        } else if (navigate) {
            navigate('/cart');
        } else {
            window.location.href = '/cart';
        }
    };

    // Safely handle the price with null checking
    const priceDisplay = (record.price !== undefined && record.price !== null)
        ? `$${Number(record.price).toFixed(2)}`
        : '$0.00';

    return (
        <div className="flex items-start relative">
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
                    <span className="text-xs font-semibold text-[#697A21]">{priceDisplay}</span>
                    <button
                        onClick={handleViewCart}
                        className="text-xs text-white bg-black hover:bg-[#B8B42D] transition-colors px-2 py-1 rounded-full"
                    >
                        View Cart
                    </button>
                </div>
            </div>

            {/* Only add our custom close button if closeToast is provided */}
            {closeToast && (
                <button
                    onClick={handleClose}
                    className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

export default CartNotificationWrapper;