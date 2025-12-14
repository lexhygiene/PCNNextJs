'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Phone, Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
            <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group z-50 relative">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-eco-green group-hover:text-gold transition-colors" />
                    <span className="text-lg md:text-xl font-sans font-bold tracking-tight text-slate-900 group-hover:text-gold transition-colors">
                        Pest Control Noida<span className="text-eco-green"></span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-slate-600 hover:text-gold transition-colors">Home</Link>
                    <Link href="/pest-library" className="text-sm font-medium text-slate-600 hover:text-gold transition-colors">Pest Library</Link>
                    <Link href="/about-us" className="text-sm font-medium text-slate-600 hover:text-gold transition-colors">About Us</Link>
                    <Link href="/service-areas" className="text-sm font-medium text-slate-600 hover:text-gold transition-colors">Service Areas</Link>
                    <Link href="/articles" className="text-sm font-medium text-slate-600 hover:text-gold transition-colors">Articles</Link>
                    <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-gold transition-colors">Contact</Link>
                </nav>

                {/* Right Actions: Phone + CTA */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-900">
                        <Phone className="w-5 h-5 text-gold" />
                        <a href="tel:+918882333782" className="text-sm font-bold hover:text-gold transition-colors">
                            +91 8882 333 782
                        </a>
                    </div>
                    <Link
                        href="/contact"
                        className="bg-gold hover:bg-orange-600 text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                        Get Inspection
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden z-50 relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                        className="p-2 text-slate-600 hover:text-eco-green transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Floating Card Menu */}
                    <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 flex flex-col gap-6 animate-in zoom-in-95 slide-in-from-top-2 duration-200 z-50 lg:hidden">
                        <nav className="flex flex-col gap-2 text-center">
                            <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-base font-bold text-slate-700 py-3 hover:bg-slate-50 rounded-xl transition-colors">Home</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="/pest-library" className="text-base font-bold text-slate-700 py-3 hover:bg-slate-50 rounded-xl transition-colors">Pest Library</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="/about-us" className="text-base font-bold text-slate-700 py-3 hover:bg-slate-50 rounded-xl transition-colors">About Us</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="/service-areas" className="text-base font-bold text-slate-700 py-3 hover:bg-slate-50 rounded-xl transition-colors">Service Areas</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="/articles" className="text-base font-bold text-slate-700 py-3 hover:bg-slate-50 rounded-xl transition-colors">Articles</Link>
                            <Link onClick={() => setIsMenuOpen(false)} href="/contact" className="text-base font-bold text-slate-700 py-3 hover:bg-slate-50 rounded-xl transition-colors">Contact</Link>
                        </nav>

                        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                            <Link
                                onClick={() => setIsMenuOpen(false)}
                                href="/contact"
                                className="bg-gold hover:bg-orange-600 text-white text-center font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                            >
                                Get Inspection
                            </Link>
                            <a
                                href="tel:+918882333782"
                                className="flex items-center justify-center gap-2 bg-eco-green hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                            >
                                <Phone className="w-5 h-5" />
                                Call +91 8882 333 782
                            </a>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
