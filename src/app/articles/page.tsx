import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import ArticleFeed from "@/components/ArticleFeed";

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
    title: 'Articles & Insights | The Green Shield Dispatch',
    description: 'Expert pest control advice, industry updates, and home protection strategies.',
};

export default async function ArticlesIndexPage() {
    // Fetch all posts - in a real app potentially paginated
    const posts = await client.fetch(POSTS_QUERY);

    return (
        <div className="min-h-screen bg-[#F7F9F9] pb-20">
            {/* Hero Section - Gradient & Texture */}
            <div className="relative bg-gradient-to-br from-slate-900 to-eco-green text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Our Latest Insights</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Pest Control Magazine</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                        Expert advice, home protection tips, and industry news to keep your property safe and pest-free.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Area - Articles Grid */}
                    <div className="lg:col-span-2">
                        <ArticleFeed posts={posts} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="sticky top-24">
                            <QuoteForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
