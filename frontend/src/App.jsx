import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Records from "./pages/Records";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/records" element={<Records />} />
                    <Route path="/records/:id" element={<Records />} /> {/* This will be replaced with a RecordDetail component later */}
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;