import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Records() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOption, setSortOption] = useState("newest");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [filtersVisible, setFiltersVisible] = useState(false);

    const recordsPerPage = 9;
    const genres = ["all", "jazz", "hard bop", "cool jazz", "jazz fusion", "free jazz", "avant-garde jazz", "modal jazz"];

    useEffect(() => {
        fetchRecords();
    }, [currentPage, sortOption, selectedGenre, priceRange]);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            // For demo purposes, fetching all records and handling pagination client-side
            // In a real app, you'd have backend endpoints for pagination, sorting, and filtering
            const response = await axios.get("http://localhost:8080/records");
            let filteredRecords = response.data;

            // Apply filters
            if (selectedGenre !== "all") {
                filteredRecords = filteredRecords.filter(record =>
                    record.genre && record.genre.toLowerCase() === selectedGenre.toLowerCase()
                );
            }

            // Apply price filtering
            filteredRecords = filteredRecords.filter(record =>
                record.price >= priceRange[0] && record.price <= priceRange[1]
            );

            // Apply sorting
            filteredRecords = sortRecords(filteredRecords, sortOption);

            // Calculate pagination
            const totalFilteredRecords = filteredRecords.length;
            setTotalPages(Math.ceil(totalFilteredRecords / recordsPerPage));

            // Get current page records
            const indexOfLastRecord = currentPage * recordsPerPage;
            const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
            const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

            setRecords(currentRecords);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching records:", error);
            setLoading(false);
        }
    };

    const sortRecords = (records, sortOption) => {
        const sortedRecords = [...records];

        switch (sortOption) {
            case "priceAsc":
                return sortedRecords.sort((a, b) => a.price - b.price);
            case "priceDesc":
                return sortedRecords.sort((a, b) => b.price - a.price);
            case "titleAsc":
                return sortedRecords.sort((a, b) => a.title.localeCompare(b.title));
            case "titleDesc":
                return sortedRecords.sort((a, b) => b.title.localeCompare(a.title));
            case "newest":
                return sortedRecords.sort((a, b) => new Date(b.releaseDate || b.createdAt || 0) - new Date(a.releaseDate || a.createdAt || 0));
            default:
                return sortedRecords;
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (index, value) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = parseInt(value);
        setPriceRange(newPriceRange);
        setCurrentPage(1);
    };

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    // Generate page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header/Navigation */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-bold text-black">
                        Juzzt<span className="text-[#B8B42D]">.</span>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="font-medium hover:text-[#B8B42D] transition-colors">Home</Link>
                        <Link to="/records" className="font-medium text-[#B8B42D] transition-colors">Records</Link>
                        <Link to="/about" className="font-medium hover:text-[#B8B42D] transition-colors">About</Link>
                        <Link to="/sale" className="font-medium hover:text-[#B8B42D] transition-colors">Sale</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:text-[#B8B42D] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button className="p-2 hover:text-[#B8B42D] transition-colors relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-[#DD403A] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </button>
                        <button className="p-2 hover:text-[#B8B42D] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Page Title */}
            <div className="bg-[#FFFCE8] py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-black">Our Collection</h1>
                    <div className="flex items-center mt-2">
                        <Link to="/" className="text-gray-600 hover:text-[#B8B42D]">Home</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-[#697A21]">Records</span>
                    </div>
                </div>
            </div>

            {/* Records Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row">
                    {/* Filters - Mobile Toggle */}
                    <div className="md:hidden w-full mb-4">
                        <button
                            onClick={toggleFilters}
                            className="w-full bg-black text-white py-2 px-4 rounded-lg flex justify-between items-center"
                        >
                            {filtersVisible ? "Hide Filters" : "Show Filters"}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transition-transform ${filtersVisible ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Filters - Sidebar */}
                    <div className={`${filtersVisible ? 'block' : 'hidden'} md:block md:w-1/4 md:pr-8 mb-6 md:mb-0`}>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Filters</h2>

                            {/* Genre Filter */}
                            <div className="mb-8">
                                <h3 className="font-semibold mb-3">Genre</h3>
                                <div className="space-y-2">
                                    {genres.map((genre) => (
                                        <div key={genre} className="flex items-center">
                                            <button
                                                onClick={() => handleGenreChange(genre)}
                                                className={`${
                                                    selectedGenre === genre
                                                        ? 'bg-[#B8B42D] text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                                } px-3 py-1 rounded-full text-sm transition-colors w-full text-left`}
                                            >
                                                {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range Filter */}
                            <div>
                                <h3 className="font-semibold mb-3">Price Range</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>${priceRange[0]}</span>
                                        <span>${priceRange[1]}</span>
                                    </div>
                                    <div className="relative h-1 bg-gray-200 rounded-full">
                                        <div
                                            className="absolute h-full bg-[#B8B42D] rounded-full"
                                            style={{
                                                left: `${(priceRange[0] / 200) * 100}%`,
                                                right: `${100 - (priceRange[1] / 200) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <label className="text-sm text-gray-600 block mb-1">Min</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max={priceRange[1]}
                                                value={priceRange[0]}
                                                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600 block mb-1">Max</label>
                                            <input
                                                type="number"
                                                min={priceRange[0]}
                                                max="200"
                                                value={priceRange[1]}
                                                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reset Filters Button */}
                            <button
                                onClick={() => {
                                    setSelectedGenre("all");
                                    setPriceRange([0, 200]);
                                }}
                                className="w-full mt-8 border border-black text-black py-2 rounded-full hover:bg-black hover:text-white transition-colors text-sm"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Records Grid */}
                    <div className={`${filtersVisible ? 'hidden md:block' : 'block'} md:w-3/4`}>
                        {/* Sort Options */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                            <p className="text-gray-600 mb-3 sm:mb-0">
                                Showing <span className="font-medium">{records.length}</span> of{" "}
                                <span className="font-medium">{totalPages * recordsPerPage}</span> records
                            </p>
                            <div className="flex items-center">
                                <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                                <select
                                    id="sort"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8B42D]"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="priceAsc">Price: Low to High</option>
                                    <option value="priceDesc">Price: High to Low</option>
                                    <option value="titleAsc">Title: A to Z</option>
                                    <option value="titleDesc">Title: Z to A</option>
                                </select>
                            </div>
                        </div>

                        {/* Records Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-96">
                                <div className="w-12 h-12 border-4 border-[#B8B42D] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {records.length > 0 ? (
                                    records.map((record, index) => (
                                        <motion.div
                                            key={record.id || index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
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
                                                {record.isNew && (
                                                    <div className="absolute top-3 right-3 bg-[#DD403A] text-white text-xs px-2 py-1 rounded">
                                                        New
                                                    </div>
                                                )}
                                            </Link>
                                            <div className="p-5">
                                                <Link
                                                    to={`/records/${record.id}`}
                                                    className="block text-lg font-semibold text-black mb-1 truncate hover:text-[#B8B42D] transition-colors"
                                                >
                                                    {record.title}
                                                </Link>
                                                <p className="text-gray-600 mb-3">{record.artist}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xl font-bold text-black">${record.price}</span>
                                                    <button className="bg-black text-white px-3 py-2 rounded-full text-sm hover:bg-[#B8B42D] transition-colors">
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

                        {/* Pagination */}
                        {!loading && totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex space-x-1">
                                    <button
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-2 rounded ${
                                            currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        &laquo;
                                    </button>

                                    {pageNumbers.map(number => {
                                        // Show only a window of 5 page numbers centered around current page
                                        if (
                                            number === 1 ||
                                            number === totalPages ||
                                            (number >= currentPage - 2 && number <= currentPage + 2)
                                        ) {
                                            return (
                                                <button
                                                    key={number}
                                                    onClick={() => handlePageChange(number)}
                                                    className={`w-10 h-10 rounded-full ${
                                                        currentPage === number
                                                            ? 'bg-[#B8B42D] text-white'
                                                            : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {number}
                                                </button>
                                            );
                                        } else if (
                                            (number === currentPage - 3 && currentPage > 3) ||
                                            (number === currentPage + 3 && currentPage < totalPages - 2)
                                        ) {
                                            return <span key={number} className="px-2 self-end">...</span>;
                                        }
                                        return null;
                                    })}

                                    <button
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-2 rounded ${
                                            currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                                        }`}
                                    >
                                        &raquo;
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-black mb-4">Juzzt.</h3>
                            <p className="text-gray-600">Juzzt is a place where music goes to hide.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-black mb-4">Shop</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><Link to="/records" className="hover:text-[#B8B42D]">All Records</Link></li>
                                <li><Link to="/new-arrivals" className="hover:text-[#B8B42D]">New Arrivals</Link></li>
                                <li><Link to="/bestsellers" className="hover:text-[#B8B42D]">Bestsellers</Link></li>
                                <li><Link to="/sale" className="hover:text-[#B8B42D]">Sale</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-black mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li><Link to="/about" className="hover:text-[#B8B42D]">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-[#B8B42D]">Contact</Link></li>
                                <li><Link to="/blog" className="hover:text-[#B8B42D]">Blog</Link></li>
                                <li><Link to="/faq" className="hover:text-[#B8B42D]">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-black mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-600">
                                <li>123 Jazz Street</li>
                                <li>Astana, Kazakhstan</li>
                                <li>info@juzzt.com</li>
                                <li>+7 (708) 734 1235</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
                        <p>© {new Date().getFullYear()} Juzzt Vinyl Shop. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}