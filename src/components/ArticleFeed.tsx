'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

interface ArticleFeedProps {
    posts: any[];
}

export default function ArticleFeed({ posts }: ArticleFeedProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter((post) => {
        const term = searchQuery.toLowerCase();
        const titleMatch = post.title?.toLowerCase().includes(term);
        const categoryMatch = post.categories?.some((cat: string) => cat.toLowerCase().includes(term));
        return titleMatch || categoryMatch;
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
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-400 font-medium"
                        />
                    </div>
                    <button className="bg-gold text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-sm whitespace-nowrap">
                        Search Insights
                    </button>
                </div>
            </div>

            {/* Articles Grid - Vertical Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post: any) => (
                        <Link href={`/articles/${post.slug.current}`} key={post._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                {post.mainImage ? (
                                    <Image
                                        src={urlFor(post.mainImage).width(800).height(600).url()}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <span className="text-xs font-bold uppercase">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    {post.categories && (
                                        <span className="bg-white/95 backdrop-blur-sm text-eco-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-eco-green/10">
                                            {post.categories[0]}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>

                                    <h3 className="text-xl font-sans font-bold text-slate-900 mb-4 group-hover:text-eco-green transition-colors leading-tight">
                                        {post.title}
                                    </h3>

                                    {post.seoDescription && (
                                        <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                                            {post.seoDescription}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center text-gold font-bold text-sm tracking-wide group-hover:gap-2 transition-all pt-6 border-t border-slate-50 mt-2">
                                    <span>Read Article</span>
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-1 md:col-span-2 text-center py-20 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
                        <div className="inline-flex bg-slate-50 p-4 rounded-full mb-4">
                            <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-xl font-bold text-slate-900 mb-2">No articles found</p>
                        <p className="text-slate-500">We couldn't find matches for "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </>
    );
}
