'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Search, ChevronRight } from 'lucide-react';

interface ServiceAreaFeedProps {
    areas: any[];
}

export default function ServiceAreaFeed({ areas }: ServiceAreaFeedProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAreas = areas.filter((area) => {
        const term = searchQuery.toLowerCase();
        const matchesName = area.locationName?.toLowerCase().includes(term);
        const matchesParent = area.parent?.locationName?.toLowerCase().includes(term);
        return matchesName || matchesParent;
    });

    // Grouping Logic
    // 1. Identify "Top Level" regions (those with no parent)
    const mainRegions = filteredAreas.filter(a => !a.parent);

    // 2. Identify "Sub Regions" (those with a parent)
    // Note: If we are searching, we might show a sub-region whose parent is filtered out. 
    // In that case, we should probably just show them as a flat list or grouped by their parent name effectively.
    // For simplicity in search mode: If search is active, show flat list. If not, show hierarchy.

    const isSearching = searchQuery.length > 0;

    return (
        <>
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 border border-slate-100">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Find your location (e.g., Noida, Sector 105)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Service Areas Display */}
            <div className="space-y-12">
                {isSearching ? (
                    // Flat Grid for Search Results
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAreas.map(area => (
                            <AreaCard key={area._id} area={area} />
                        ))}
                        {filteredAreas.length === 0 && <NoResults query={searchQuery} />}
                    </div>
                ) : (
                    // Hierarchical View
                    // Hierarchical View
                    mainRegions.length > 0 ? (
                        mainRegions.map(region => (
                            <ServiceAreaGroup
                                key={region._id}
                                region={region}
                                allAreas={areas}
                            />
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-500">No regions found.</p>
                        </div>
                    )
                )}
            </div>
        </>
    );
}

// Component for a Parent Region and its children
function ServiceAreaGroup({ region, allAreas }: { region: any, allAreas: any[] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Find children for this region
    const children = allAreas.filter(a => a.parent?._id === region._id);
    const visibleChildren = isExpanded ? children : children.slice(0, 3);
    const hasMore = children.length > 3;

    return (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md">
            {/* Main Region Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-50">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                    <div className="w-16 h-16 bg-eco-green/10 rounded-2xl flex items-center justify-center text-eco-green text-3xl shadow-sm flex-shrink-0">
                        <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-slate-900 leading-tight mb-2 sm:mb-0">
                            {region.locationName}
                        </h2>
                        <p className="text-slate-500 font-medium">Main Service Hub • {children.length} Zones</p>
                    </div>
                </div>
                <Link
                    href={`/service-areas/${region.slug.current}`}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-gold transition-all shadow-lg shadow-slate-200 hover:shadow-gold/20 flex items-center gap-2 w-fit whitespace-nowrap"
                >
                    View Main Page <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Children Grid */}
            {children.length > 0 ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                            Available Zones
                        </h3>
                        {!isExpanded && hasMore && (
                            <span className="text-xs text-slate-400 font-medium">
                                Showing 3 of {children.length}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visibleChildren.map(child => (
                            <AreaCard key={child._id} area={child} isChild />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="group flex items-center gap-2 px-6 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full font-bold text-sm transition-all border border-slate-200 hover:border-slate-300"
                            >
                                {isExpanded ? (
                                    <>Show Less</>
                                ) : (
                                    <>View All {children.length} Zones <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-slate-400 text-sm italic">No specific sub-areas listed yet.</p>
            )}
        </div>
    );
}

// Sub-component for individual cards to keep main code clean
function AreaCard({ area, isChild = false }: { area: any, isChild?: boolean }) {
    return (
        <Link href={`/service-areas/${area.slug.current}`} className={`
            group flex items-center justify-between p-4 rounded-xl border transition-all duration-300
            ${isChild
                ? 'bg-slate-50 border-slate-100 hover:bg-white hover:border-gold/30 hover:shadow-md'
                : 'bg-white border-slate-200 hover:border-gold hover:shadow-lg'
            }
        `}>
            <div className="flex items-center gap-3">
                {!isChild && (
                    <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-gold">
                        <MapPin className="w-5 h-5" />
                    </div>
                )}
                <div>
                    <h3 className={`font-bold text-slate-900 group-hover:text-eco-green transition-colors ${isChild ? 'text-sm' : 'text-lg'}`}>
                        {area.locationName}
                    </h3>
                </div>
            </div>
            <ChevronRight className={`text-slate-300 group-hover:text-gold group-hover:translate-x-1 transition-all ${isChild ? 'w-4 h-4' : 'w-5 h-5'}`} />
        </Link>
    );
}

function NoResults({ query }: { query: string }) {
    return (
        <div className="col-span-full text-center py-20 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
            <div className="inline-flex bg-slate-50 p-4 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2">Location not found</p>
            <p className="text-slate-500">We might not be listing "{query}" yet, but give us a call to check!</p>
        </div>
    );
}
