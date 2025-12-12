import Link from 'next/link';
import { Home, Search, MapPin, Contact } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-[#F7F9F9] px-4 py-12 md:py-20">
            <div className="text-center max-w-2xl mx-auto">
                <div className="mb-4 md:mb-8 relative inline-block">
                    {/* Abstract background blobus for visual pop */}
                    <div className="absolute inset-0 bg-eco-green/10 rounded-full blur-2xl transform scale-150"></div>
                    <h1 className="relative text-7xl md:text-9xl font-bold text-slate-200 select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl md:text-4xl text-eco-green animate-bounce">🐜</span>
                    </div>
                </div>

                <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 mb-3 md:mb-4">
                    Oops! This page scurried away.
                </h2>

                <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-md mx-auto">
                    We can't seem to find the page you're looking for. It might have been moved, deleted, or eaten by termites.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-lg mx-auto">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-eco-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                    >
                        <Home className="w-5 h-5" />
                        <span>Back Home</span>
                    </Link>

                    <Link
                        href="/pest-library"
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                    >
                        <Search className="w-5 h-5" />
                        <span>Pest Library</span>
                    </Link>

                    <Link
                        href="/service-areas"
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-slate-700 border border-gray-200 font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                    >
                        <MapPin className="w-5 h-5" />
                        <span>Service Locations</span>
                    </Link>

                    <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 bg-gold hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-sm hover:shadow-md"
                    >
                        <Contact className="w-5 h-5" />
                        <span>Contact Us</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
