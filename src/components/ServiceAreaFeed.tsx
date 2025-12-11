'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Search } from 'lucide-react';

interface ServiceAreaFeedProps {
    areas: any[];
}

export default function ServiceAreaFeed({ areas }: ServiceAreaFeedProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAreas = areas.filter((area) => {
        const term = searchQuery.toLowerCase();
        return area.locationName?.toLowerCase().includes(term);
    });

    return (
        <>
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 border border-slate-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Find your location (e.g., Noida, Greater Noida)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Service Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAreas.length > 0 ? (
                    filteredAreas.map((area: any) => (
                        <Link href={`/service-areas/${area.slug.current}`} key={area._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 h-full p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-eco-green group-hover:bg-eco-green group-hover:text-white transition-colors">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-gold transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
                            </div>

                            <h3 className="text-xl font-sans font-bold text-slate-900 mb-3 group-hover:text-eco-green transition-colors">
                                {area.locationName}
                            </h3>

                            <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-1">
                                Professional pest control services available in {area.locationName}. Same-day inspection available.
                            </p>

                            <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                                <div className="w-0 h-full bg-gold group-hover:w-full transition-all duration-500 ease-out"></div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
                        <div className="inline-flex bg-slate-50 p-4 rounded-full mb-4">
                            <MapPin className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-xl font-bold text-slate-900 mb-2">Location not found</p>
                        <p className="text-slate-500">We might not be listing "{searchQuery}" yet, but give us a call to check!</p>
                    </div>
                )}
            </div>
        </>
    );
}
