import { client } from "@/sanity/lib/client";
import { SERVICE_AREAS_QUERY } from "@/sanity/lib/queries";
import ServiceAreaFeed from "@/components/ServiceAreaFeed";
import QuoteForm from "@/components/QuoteForm";

export const revalidate = 60;

export const metadata = {
    title: 'Service Areas | Pest Control Noida & NCR',
    description: 'Expert pest control services in Noida, Greater Noida, Ghaziabad, and Delhi NCR. Fast, reliable termite and pest removal.',
};

export default async function ServiceAreasPage() {
    const areas = await client.fetch(SERVICE_AREAS_QUERY);

    return (
        <div className="min-h-screen bg-[#F7F9F9] pb-20">
            {/* Hero Section - Gradient & Texture */}
            <div className="relative bg-gradient-to-br from-slate-900 to-eco-green text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Serving Noida & NCR</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Service Areas in Noida</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                        Providing top-tier, reliable pest control in Noida, Greater Noida, Ghaziabad, and surrounding areas.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-[1440px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <ServiceAreaFeed areas={areas} />
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
