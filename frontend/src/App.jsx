import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartContext, CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Records from "./pages/Records";
import About from "./pages/About";
import Sale from "./pages/Sale";
import Cart from "./pages/Cart";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import './styles/ToastStyles.css';
import { useContext, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function NavigationRegistrar() {
    const { setNavigate } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        setNavigate(navigate);
    }, [navigate, setNavigate]);

    return null;
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <CartProvider>
                    <NavigationRegistrar />
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/records" element={<Records />} />
                        <Route path="/records/:id" element={<Records />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/sale" element={<Sale />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </CartProvider>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
