'use client';

import { Phone, MessageCircle, Star, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    useEffect(() => {
        // Show after a small delay for better UX
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* =========================================
                MOBILE: Unified Bottom Bar (3-Column Grid)
               ========================================= */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden pointer-events-none">

                {/* Review Drawer (Mobile) - Slides up from behind bar */}
                <div
                    className={`absolute bottom-full left-0 right-0 mx-4 mb-3 bg-white rounded-2xl border border-slate-200 shadow-2xl transition-all duration-300 transform origin-bottom ${isReviewOpen ? 'translate-y-0 opacity-100 pointer-events-auto scale-100' : 'translate-y-8 opacity-0 pointer-events-none scale-95'
                        }`}
                >
                    <div className="p-4 relative">
                        <button
                            onClick={() => setIsReviewOpen(false)}
                            className="absolute top-2 right-2 p-2 text-slate-400"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-3">
                            {/* Google G Logo */}
                            <div className="bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
                                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Excellent</h3>
                                <div className="flex text-[#FBBC05] gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-3 h-3 fill-current" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <span className="text-2xl font-bold text-slate-900">4.8</span>
                                <span className="text-[10px] text-slate-500 block">380+ reviews</span>
                            </div>
                            <Link
                                href="https://www.google.com/search?q=Lex+Hygiene+India+reviews"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg text-sm font-bold shadow-sm"
                            >
                                Read Reviews
                            </Link>
                        </div>
                    </div>
                </div>

                {/* The Bar Itself */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/60 px-6 py-3 mx-4 mb-5 rounded-full shadow-2xl pointer-events-auto">
                    <div className="grid grid-cols-3 gap-2">
                        {/* 1. Phone */}
                        <a
                            href="tel:+918882333782"
                            className="flex flex-col items-center justify-center gap-1 bg-eco-green/10 text-eco-green hover:bg-eco-green hover:text-white py-2 rounded-full transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Call</span>
                        </a>

                        {/* 2. WhatsApp */}
                        <a
                            href="https://wa.me/918882333782"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center justify-center gap-1 bg-green-50 text-[#25D366] hover:bg-[#25D366] hover:text-white py-2 rounded-full transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">WhatsApp</span>
                        </a>

                        {/* 3. Reviews */}
                        <button
                            onClick={() => setIsReviewOpen(!isReviewOpen)}
                            className={`flex flex-col items-center justify-center gap-1 py-2 rounded-full transition-colors ${isReviewOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Star className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Reviews</span>
                        </button>
                    </div>
                </div>
            </div>


            {/* =========================================
                DESKTOP: Floating Elements (Hidden on Mobile)
               ========================================= */}

            {/* 1. Need Help Pill (Bottom Center) */}
            <div className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                <div className="bg-white rounded-full shadow-xl border border-slate-100 p-2 pr-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0">
                        <Phone className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Need help?</p>
                        <a href="tel:+918882333782" className="text-lg font-bold text-slate-900 hover:text-gold transition-colors block leading-none">
                            +91 8882333782
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. Google Reviews Badge (Bottom Right) */}
            <div className="hidden md:flex fixed bottom-6 right-6 z-[100] flex-col items-end">
                {/* Expanded Desktop Tray */}
                {isReviewOpen && (
                    <div className="mb-4 bg-white rounded-xl shadow-2xl p-5 border border-slate-100 w-72 origin-bottom-right animate-in fade-in slide-in-from-bottom-4 relative">
                        <button
                            onClick={() => setIsReviewOpen(false)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100">
                                <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 leading-none">Excellent</h3>
                                <div className="flex text-[#FBBC05] gap-0.5 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-3 h-3 fill-current" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <span className="text-3xl font-bold text-slate-900 block">4.8</span>
                            <span className="text-xs text-slate-500">Based on 380+ reviews</span>
                        </div>

                        <Link
                            href="https://www.google.com/search?q=Lex+Hygiene+India+reviews"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors shadow-md shadow-blue-200"
                        >
                            Read Reviews
                        </Link>
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => setIsReviewOpen(!isReviewOpen)}
                    onMouseEnter={() => setIsReviewOpen(true)}
                    className={`bg-white hover:bg-slate-50 text-slate-900 rounded-full shadow-xl border border-slate-200 p-3 flex items-center gap-3 transition-all duration-300 group ${isReviewOpen ? 'ring-4 ring-blue-50 border-blue-200' : ''}`}
                >
                    <div className="relative">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none pr-1">
                        <span className="font-bold text-sm">4.8</span>
                        <div className="flex text-[#FBBC05] gap-0.5 scale-75 origin-left -ml-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 fill-current" />
                            ))}
                        </div>
                    </div>
                </button>
            </div>
        </>
    );
}
