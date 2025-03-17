import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Records from "./pages/Records";
import About from "./pages/About";
import Sale from "./pages/Sale";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/records" element={<Records />} />
                    <Route path="/records/:id" element={<Records />} /> {/* This will be replaced with a RecordDetail component later */}
                    <Route path="/about" element={<About />} />
                    <Route path="/sale" element={<Sale />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;