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
                <div className="fixed inset-0 bg-white z-40 lg:hidden pt-24 px-6 flex flex-col gap-6 animate-in slide-in-from-top-10 duration-200">
                    <nav className="flex flex-col gap-4 text-center">
                        <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50">Home</Link>
                        <Link onClick={() => setIsMenuOpen(false)} href="/pest-library" className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50">Pest Library</Link>
                        <Link onClick={() => setIsMenuOpen(false)} href="/service-areas" className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50">Service Areas</Link>
                        <Link onClick={() => setIsMenuOpen(false)} href="/articles" className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50">Articles</Link>
                        <Link onClick={() => setIsMenuOpen(false)} href="/contact" className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50">Contact</Link>
                    </nav>

                    <div className="flex flex-col gap-4 mt-4">
                        <Link
                            onClick={() => setIsMenuOpen(false)}
                            href="/contact"
                            className="bg-gold text-white text-center font-bold py-4 rounded-xl shadow-md"
                        >
                            Get Inspection
                        </Link>
                        <a href="tel:+918882333782" className="flex items-center justify-center gap-2 text-slate-600 font-bold py-2">
                            <Phone className="w-5 h-5 text-gold" />
                            +91 8882 333 782
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
