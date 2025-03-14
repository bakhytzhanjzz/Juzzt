import { Link } from "react-router-dom";

export default function Footer() {
    return (
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
    );
}
