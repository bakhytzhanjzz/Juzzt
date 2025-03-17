import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/global.css";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CartProvider>
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
          <App />
      </CartProvider>
  </StrictMode>,
)
