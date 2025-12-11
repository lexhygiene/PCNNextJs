'use client';

import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a small delay for better UX
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
            <div className="bg-white rounded-full shadow-lg border border-slate-100 p-2 flex items-center justify-between gap-3 max-w-sm mx-auto">

                {/* Call Button */}
                <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-4 mb-0.5">Free Inspection</p>
                    <h3 className="text-sm font-bold text-slate-900 ml-4 leading-tight">Pest Problem?</h3>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href="https://wa.me/918882333784"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-full font-bold text-sm transition-colors shadow-sm"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                    </a>

                    <a
                        href="tel:+918882333782"
                        className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-sm hover:bg-slate-800 transition-colors"
                        aria-label="Call Now"
                    >
                        <Phone className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
