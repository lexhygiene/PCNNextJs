import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import MagazineSection from "@/components/MagazineSection";

// Revalidate every 60 seconds
// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export const metadata = {
    title: 'Articles & Insights | Pest Control Noida - a Unit of Lex Hygiene India',
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

            <div className="-mt-12 relative z-20">
                <MagazineSection posts={posts} showAll={true} />
            </div>
        </div>
    );
}
