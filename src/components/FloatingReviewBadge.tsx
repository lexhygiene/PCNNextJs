'use client';

import { useState } from 'react';
import { Star, X } from 'lucide-react';
import Link from 'next/link';

export default function FloatingReviewBadge() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-24 left-4 md:bottom-6 md:right-6 md:left-auto z-[100] flex flex-col items-start md:items-end">
            {/* Expanded Tray */}
            <div
                className={`transition-all duration-300 origin-bottom-left md:origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100 translate-y-0 mb-4' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'
                    }`}
            >
                <div className="bg-white rounded-xl shadow-2xl p-5 border border-slate-100 w-72 relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100">
                            {/* Google G Logo */}
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
            </div>

            {/* Toggle Button / Badge */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                className={`bg-white hover:bg-slate-50 text-slate-900 rounded-full shadow-xl border border-slate-200 p-3 flex items-center gap-3 transition-all duration-300 group ${isOpen ? 'ring-4 ring-blue-50 border-blue-200' : ''}`}
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
    );
}
