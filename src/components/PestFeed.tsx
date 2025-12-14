'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, AlertTriangle } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

interface PestFeedProps {
    pests: any[];
}

export default function PestFeed({ pests }: PestFeedProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPests = pests.filter((pest) => {
        const term = searchQuery.toLowerCase();
        const nameMatch = pest.commonName?.toLowerCase().includes(term);
        const dangerMatch = pest.dangerLevel?.toLowerCase().includes(term);
        return nameMatch || dangerMatch;
    });

    const getDangerColor = (level: string) => {
        switch (level?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-700 bg-red-500'; // Adjusted for UI
            case 'medium': return 'bg-orange-100 text-orange-700';
            default: return 'bg-green-100 text-green-700';
        }
    };

    // Helper for visual badges
    const DangerBadge = ({ level }: { level: string }) => {
        if (!level) return null;
        const isHigh = level.toLowerCase() === 'high';
        const isMedium = level.toLowerCase() === 'medium';
        const isLow = level.toLowerCase() === 'low';

        let classes = "bg-slate-100 text-slate-600";
        if (isHigh) classes = "bg-red-50 text-red-600 border-red-100";
        if (isMedium) classes = "bg-orange-50 text-orange-600 border-orange-100";
        if (isLow) classes = "bg-green-50 text-eco-green border-green-100";

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${classes}`}>
                {level} Risk
            </span>
        );
    }

    return (
        <>
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 border border-slate-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Find a pest (e.g., Termites, Cockroaches)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Pests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPests.length > 0 ? (
                    filteredPests.map((pest: any) => (
                        <Link href={`/pest-library/${pest.slug.current}`} key={pest._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 h-full">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                {pest.mainImageExternalUrl ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={pest.mainImageExternalUrl}
                                            alt={pest.mainImageExternalAlt || pest.commonName}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        />
                                    </div>
                                ) : pest.image ? (
                                    <Image
                                        src={urlFor(pest.image).width(600).height(450).url()}
                                        alt={pest.commonName}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <span className="text-xs font-bold uppercase">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <DangerBadge level={pest.dangerLevel} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex-1">
                                    <h3 className="text-xl font-sans font-bold text-slate-900 mb-2 group-hover:text-eco-green transition-colors leading-tight">
                                        {pest.commonName}
                                    </h3>
                                    {/* Placeholder for scientific name if available in projection, otherwise brief text could go here */}
                                    <p className="text-sm text-slate-500 mb-4">Identify, prevent, and treat {pest.commonName.toLowerCase()} infestations.</p>
                                </div>

                                <div className="flex items-center text-gold font-bold text-sm tracking-wide group-hover:gap-2 transition-all pt-4 border-t border-slate-50">
                                    <span>View Details</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
                        <div className="inline-flex bg-slate-50 p-4 rounded-full mb-4">
                            <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-xl font-bold text-slate-900 mb-2">No pests found</p>
                        <p className="text-slate-500">Try searching for a different pest name.</p>
                    </div>
                )}
            </div>
        </>
    );
}
