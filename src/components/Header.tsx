import Link from 'next/link';
import { Shield, Phone, Menu } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
            {/* Top Bar - optional if we want phone very prominent, or just inline. User asked for aligned with logo OR top bar. Let's do inline for cleaner "Modern" look per Prompt 4 */}
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Shield className="w-8 h-8 text-eco-green group-hover:text-gold transition-colors" />
                    <span className="text-xl font-sans font-bold tracking-tight text-slate-900 group-hover:text-gold transition-colors">
                        Pest Control Noida<span className="text-eco-green">.</span>
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
                <div className="md:hidden">
                    <button aria-label="Menu" className="p-2 text-slate-600">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
