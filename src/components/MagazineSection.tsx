'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Calendar, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

interface MagazineSectionProps {
    posts: any[];
    showAll?: boolean; // If true, shows all remaining posts instead of just 6
}

export default function MagazineSection({ posts: initialPosts, showAll = false }: MagazineSectionProps) {

    // Combine real and mock posts
    const allPosts = initialPosts || [];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const posts = searchQuery.trim()
        ? allPosts.filter(p =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.seoDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categories?.some((cat: string) => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : allPosts;

    // 1. FILTERING LOGIC
    // Tier 1: Featured (Slider) - Strict: Only 'featured' boolean (If search is active, we don't use this separate bucket usually, but efficient to keep logic clean)
    const featuredPosts = posts.filter(p => p.featured);

    // Remaining posts for grids
    const remainingPosts = posts.filter(p => !p.featured);

    // Tier 2: Visual Feed (Termite related) - Loose Matching
    const termitePosts = remainingPosts.filter(p =>
        p.categories?.some((cat: string) => cat.toLowerCase().includes('termite'))
    );

    // Tier 3: Quick Reads (All other categories)
    const generalPosts = remainingPosts.filter(p =>
        !p.categories?.some((cat: string) => cat.toLowerCase().includes('termite'))
    );

    // 2. TIER LOOPS
    // We will alternate between Visual Grid (Termite) and Text Grid (General)
    // Visual Grid chunk size: 4
    // Text Grid chunk size: 6
    const visualChunks: any[][] = [];
    for (let i = 0; i < termitePosts.length; i += 4) {
        visualChunks.push(termitePosts.slice(i, i + 4));
    }

    const textChunks: any[][] = [];
    for (let i = 0; i < generalPosts.length; i += 6) {
        textChunks.push(generalPosts.slice(i, i + 6));
    }

    const maxChunks = Math.max(visualChunks.length, textChunks.length);


    const handleTopicClick = (tag: string) => {
        setSearchQuery(tag);
        const section = document.getElementById('knowledge-hub');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Auto-advance slider
    useEffect(() => {
        if (featuredPosts.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredPosts.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);

    if (!allPosts || allPosts.length === 0) return null;

    return (
        <section className="bg-[#F7F9F9] py-16 md:py-24" id="knowledge-hub">
            <div className="container mx-auto px-4 max-w-[1440px]">
                {/* Header with Search */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="flex-1">
                        <span className="text-gold font-bold tracking-widest uppercase text-xs mb-3 block">Knowledge Hub</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                            Pest Control Magazine
                        </h2>
                        {/* Search Input */}
                        <div className="relative max-w-md">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all shadow-sm"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                {/* Search Icon SVG defined inline or use imported Search icon if available. Using Sparkles as placeholder or better import Search */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                        </div>
                    </div>
                    {!showAll && !searchQuery && (
                        <Link href="/articles" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-eco-green transition-colors pb-2 border-b-2 border-transparent hover:border-eco-green">
                            View Full Archive <ArrowRight className="w-4 h-4" />
                        </Link>
                    )}
                </div>

                {/* CONDITIONAL RENDER: Search Results vs Magazine Layout */}
                {searchQuery ? (
                    <div className="min-h-[400px]">
                        <h3 className="text-xl font-bold text-slate-500 mb-8">
                            Found {posts.length} results for "{searchQuery}"
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link href={`/articles/${post.slug.current}`} key={post._id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                                    <div className="relative aspect-[16/9] bg-slate-200">
                                        {post.mainImageExternalUrl ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={post.mainImageExternalUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : post.mainImage ? (
                                            <Image src={urlFor(post.mainImage).width(800).height(450).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white/20 font-bold">No Image</div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="text-xs text-gold font-bold uppercase tracking-wider mb-2">{post.categories?.[0]}</div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-eco-green transition-colors">{post.title}</h3>
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">{post.seoDescription}</p>
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">Read Article <ArrowRight className="w-3 h-3" /></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* ORIGINAL MAGAZINE LAYOUT */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

                        {/* LEFT COLUMN: Content Engine (70%) */}
                        <div className="lg:col-span-8 flex flex-col gap-16">

                            {/* TIER 1: Featured Slider */}
                            {featuredPosts.length > 0 && (
                                <div className="group relative block w-full h-[500px] rounded-3xl overflow-hidden shadow-xl bg-slate-900">
                                    {/* Slides */}
                                    {featuredPosts.map((post, idx) => (
                                        <div
                                            key={post._id}
                                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                        >
                                            <Link href={`/articles/${post.slug.current}`} className="block w-full h-full">
                                                <div className="absolute inset-0">
                                                    {post.mainImageExternalUrl ? (
                                                        /* eslint-disable-next-line @next/next/no-img-element */
                                                        <img src={post.mainImageExternalUrl} alt={post.title} className="w-full h-full object-cover" />
                                                    ) : post.mainImage ? (
                                                        <Image src={urlFor(post.mainImage).width(1200).height(800).url()} alt={post.title} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-800" />
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
                                                </div>
                                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-5/6 text-white">
                                                    {post.categories && (
                                                        <span className="inline-block bg-gold text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                                                            {post.categories[0]}
                                                        </span>
                                                    )}
                                                    <h3 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-4 hover:text-gold transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm font-bold tracking-wide">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-gold" />
                                                            <span>{new Date(post.publishedAt || post._createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}

                                    {/* Slider Controls */}
                                    {featuredPosts.length > 1 && (
                                        <div className="absolute bottom-12 right-12 z-20 flex gap-3">
                                            <button onClick={(e) => { e.preventDefault(); prevSlide(); }} className="p-3 rounded-full bg-white/10 hover:bg-gold text-white backdrop-blur-md transition-all">
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button onClick={(e) => { e.preventDefault(); nextSlide(); }} className="p-3 rounded-full bg-white/10 hover:bg-gold text-white backdrop-blur-md transition-all">
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* LOOPS: Alternating Tiers */}
                            {Array.from({ length: showAll ? maxChunks : 1 }).map((_, loopIdx) => (
                                <div key={`loop-${loopIdx}`} className="bg-white/50 rounded-2xl p-6 md:p-0 md:bg-transparent">

                                    {/* TIER 2: Visual Grid (Termite) */}
                                    {visualChunks[loopIdx] && (
                                        <div className="mb-16">
                                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                                                <span className="w-8 h-1 bg-eco-green rounded-full"></span>
                                                {loopIdx === 0 ? "Termite Control Insights" : "More on Termite Control"}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                                                {visualChunks[loopIdx].map((post: any) => (
                                                    <Link href={`/articles/${post.slug.current}`} key={post._id} className="group flex flex-col h-full">
                                                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5 bg-slate-200 shadow-sm">
                                                            {post.mainImageExternalUrl ? (
                                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                                <img src={post.mainImageExternalUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                            ) : post.mainImage ? (
                                                                <Image src={urlFor(post.mainImage).width(800).height(450).url()} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                            ) : (
                                                                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white/20 font-bold">No Image</div>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col flex-1">
                                                            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                <span>{new Date(post.publishedAt || post._createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                            </div>
                                                            <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-eco-green transition-colors">
                                                                {post.title}
                                                            </h3>
                                                            <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
                                                                {post.seoDescription}
                                                            </p>
                                                            <div className="text-gold text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                                                Read Article <ArrowRight className="w-3.5 h-3.5" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* TIER 3: Text Grid (General) */}
                                    {textChunks[loopIdx] && (
                                        <div className="border-t border-slate-200 pt-16 mb-8">
                                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-10 flex items-center gap-3">
                                                <span className="w-8 h-1 bg-slate-900 rounded-full"></span>
                                                {loopIdx === 0 ? "Quick Reads & Updates" : "More Updates"}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                {textChunks[loopIdx].map((post: any) => (
                                                    <Link href={`/articles/${post.slug.current}`} key={post._id} className="group bg-white p-8 rounded-2xl border border-slate-100 hover:border-gold hover:shadow-md transition-all duration-300">
                                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">
                                                            <span className="text-gold font-bold">{post.categories?.[0] || 'Article'}</span>
                                                            <span>•</span>
                                                            <span>{new Date(post.publishedAt || post._createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-gold transition-colors">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed mb-4">
                                                            {post.seoDescription}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                                                            Stop Pests Now <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ))}

                        </div>

                        {/* RIGHT COLUMN: Sidebar (30%) */}
                        <div className="lg:col-span-4 space-y-10">
                            {/* Sticky Container */}
                            <div className="sticky top-24">

                                {/* Lead Form */}
                                <div className="mb-12">
                                    <div className="bg-white p-1 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-eco-green"></div>
                                        <QuoteForm />
                                    </div>
                                </div>

                                {/* Trending / Categories Block */}
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Sparkles className="w-5 h-5 text-gold" />
                                        <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Trending Topics</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {['Termite Control', 'Cockroaches', 'Rodent Defense', 'Eco-Friendly', 'Pet Safety', 'Home Tips'].map((tag) => (
                                            <button
                                                onClick={() => handleTopicClick(tag)}
                                                key={tag}
                                                className={`px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition-all border ${searchQuery === tag ? 'bg-gold text-slate-900 border-gold shadow-md' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-100'}`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-16 text-center md:hidden">
                    <Link href="/articles" className="inline-block bg-white border border-slate-200 text-slate-900 font-bold py-4 px-10 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
                        View Full Archive
                    </Link>
                </div>
            </div>
        </section>
    );
}
