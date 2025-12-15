import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900 to-eco-green text-white pt-20 pb-10 border-t border-white/10 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('/cubes.png')] animate-pulse"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Shield className="w-8 h-8 text-gold" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-sans font-bold tracking-tight text-white leading-none">
                                    Pest Control Noida<span className="text-gold">.</span>
                                </span>
                                <span className="text-[10px] text-white/50 uppercase tracking-widest mt-1">A unit of Lex Hygiene India</span>
                            </div>
                        </Link>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Premium pest control services for modern living. Safe, effective, and trusted by thousands of homeowners in NCR.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://share.google/zw1VMrRn1UR2Rmp7s" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors text-white" aria-label="Google Business Profile">
                                <MapPin className="w-4 h-4" />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61558108401437" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors text-white" aria-label="Facebook">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://www.instagram.com/lexhygiene2020/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold transition-colors text-white" aria-label="Instagram">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-sans font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="/" className="text-white/70 hover:text-gold transition-colors text-sm">Home</Link></li>
                            <li><Link href="/pest-library" className="text-white/70 hover:text-gold transition-colors text-sm">Pest Library</Link></li>
                            <li><Link href="/service-areas" className="text-white/70 hover:text-gold transition-colors text-sm">Service Areas</Link></li>
                            <li><Link href="/articles" className="text-white/70 hover:text-gold transition-colors text-sm">Articles & Tips</Link></li>
                            <li><Link href="/contact" className="text-white/70 hover:text-gold transition-colors text-sm">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-sans font-bold mb-6 text-white">Legal</h3>
                        <ul className="space-y-4">
                            <li><Link href="/privacy-policy" className="text-white/70 hover:text-gold transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="text-white/70 hover:text-gold transition-colors text-sm">Terms of Service</Link></li>
                            <li><Link href="/sitemap.xml" className="text-white/70 hover:text-gold transition-colors text-sm">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Contact - Emphasized */}
                    <div>
                        <h3 className="text-lg font-sans font-bold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                                <span className="text-white/70 text-sm leading-relaxed">
                                    Logix City Centre, Noida,<br />Uttar Pradesh, India
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <a href="tel:+918882333782" className="text-white/70 hover:text-gold transition-colors text-sm font-bold">
                                    +91 8882 333 782
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <a href="mailto:info@pestcontrolnoida.in" className="text-white/70 hover:text-gold transition-colors text-sm">
                                    info@pestcontrolnoida.in
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Pest Control Noida. All rights reserved.
                    </p>
                    <p className="text-white/30 text-xs">
                        Designed with care for a pest-free world.
                    </p>
                </div>
            </div>
        </footer>
    );
}
