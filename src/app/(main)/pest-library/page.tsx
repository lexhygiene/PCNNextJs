import { client } from "@/sanity/lib/client";
import { PESTS_QUERY } from "@/sanity/lib/queries";
import PestFeed from "@/components/PestFeed";
import QuoteForm from "@/components/QuoteForm";

// Revalidate every 60 seconds
// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export const metadata = {
    title: 'Identify Pests in Noida | Pest Control Noida Library',
    description: 'Identify common pests in Noida like termites, cockroaches, and rodents. Learn prevention tips from Pest Control Noida experts.',
};

export default async function PestLibraryPage() {
    const pests = await client.fetch(PESTS_QUERY);

    return (
        <div className="min-h-screen bg-[#F7F9F9] pb-20">
            {/* Hero Section - Gradient & Texture */}
            <div className="relative bg-gradient-to-br from-slate-900 to-eco-green text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Identify Pests in Noida</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Pest Library & Identification</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                        Comprehensive guide to identifying pests in Noida, understanding their behavior, and finding the right solutions.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-[1440px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <PestFeed pests={pests} />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <QuoteForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
