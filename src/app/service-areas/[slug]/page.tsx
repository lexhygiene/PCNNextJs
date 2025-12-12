import { client } from "@/sanity/lib/client";
import { SERVICE_AREA_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone, ShieldCheck, AlertTriangle } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

import { Metadata } from "next";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(
    props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const area = await client.fetch(SERVICE_AREA_QUERY, { slug: params.slug });

    if (!area) {
        return {
            title: "Location Not Found",
        };
    }

    return {
        title: area.seoTitle || `Pest Control Services in ${area.locationName} | Local Experts`,
        description: area.seoDescription || `Professional pest control services in ${area.locationName}. Same-day inspections and eco-friendly solutions.`,
        openGraph: {
            title: area.seoTitle || `Pest Control Services in ${area.locationName} | Local Experts`,
            description: area.seoDescription || `Professional pest control services in ${area.locationName}. Same-day inspections and eco-friendly solutions.`,
        }
    };
}

export default async function ServiceAreaPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const area = await client.fetch(SERVICE_AREA_QUERY, { slug: params.slug });

    if (!area) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20">
            {/* City Header */}
            <div className="relative bg-gradient-to-br from-slate-900 to-eco-green text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {area.parent ? (
                            <Link href={`/service-areas/${area.parent.slug.current}`} className="hover:text-white transition-colors flex items-center gap-1">
                                {area.parent.locationName} <span className="text-white/50">/</span> {area.locationName}
                            </Link>
                        ) : (
                            <span>SERVING {area.locationName.toUpperCase()}</span>
                        )}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                        Pest Control in {area.locationName}
                    </h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        {area.seoDescription || `Top-rated residential and commercial pest control services in ${area.locationName}. We protect your home from local pests with eco-friendly solutions.`}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:+918882333782" className="bg-gold hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                            <Phone className="w-5 h-5" />
                            <span>Call {area.locationName} Branch</span>
                        </a>
                        <a href="#quote-form" className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition-colors backdrop-blur-sm border border-white/20">
                            Request Quote
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-[1440px]">
                {/* Parent Back Link (Mobile friendly) */}
                {area.parent && (
                    <div className="mb-8">
                        <Link href={`/service-areas/${area.parent.slug.current}`} className="text-eco-green font-bold flex items-center gap-2 hover:underline">
                            ← Back to {area.parent.locationName} Overview
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Local Pests Section */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                            <AlertTriangle className="w-8 h-8 text-eco-green" />
                            Common Pests in {area.locationName}
                        </h2>

                        {area.commonPests && area.commonPests.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {area.commonPests.map((pest: any) => (
                                    <Link href={`/pest-library/${pest.slug.current}`} key={pest._id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all bg-white group">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                            {pest.mainImageExternalUrl ? (
                                                <Image
                                                    src={pest.mainImageExternalUrl}
                                                    alt={pest.commonName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : pest.image ? (
                                                <Image
                                                    src={urlFor(pest.image).width(150).height(150).url()}
                                                    alt={pest.commonName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-xs text-slate-400">No Img</div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-eco-green transition-colors">{pest.commonName}</h3>
                                            <span className={`
                                            text-xs font-bold uppercase tracking-wider
                                            ${pest.dangerLevel === 'high' ? 'text-red-600' : 'text-slate-500'}
                                        `}>
                                                {pest.dangerLevel} Priority
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-8 rounded-xl text-center">
                                <p className="text-slate-500">Specific pest data for this area is coming soon.</p>
                            </div>
                        )}

                        <div className="mt-12 bg-eco-green/5 p-8 rounded-2xl border border-eco-green/20">
                            <h3 className="text-2xl font-bold text-eco-green mb-4">Why Choose Us in {area.locationName}?</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                                    <span className="text-slate-700"><strong>Local Experts:</strong> Our technicians live in {area.locationName} and understand the local pest ecosystem.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                                    <span className="text-slate-700"><strong>Rapid Response:</strong> We guarantee same-day inspection for {area.locationName} residents calling before noon.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                                    <span className="text-slate-700"><strong>Eco-Friendly:</strong> Safe for {area.locationName}'s pets and families.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Sub-Regions (Children) Display */}
                        {area.children && area.children.length > 0 && (
                            <div className="mt-16 border-t border-slate-100 pt-12">
                                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-gold" />
                                    Locations in {area.locationName}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {area.children.map((child: any) => (
                                        <Link
                                            key={child._id}
                                            href={`/service-areas/${child.slug.current}`}
                                            className="block p-4 bg-white rounded-xl border border-slate-100 hover:border-gold hover:shadow-md transition-all text-sm font-bold text-slate-700 hover:text-eco-green flex items-center justify-between group"
                                        >
                                            {child.locationName}
                                            <span className="text-slate-300 group-hover:text-gold">→</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8 scroll-mt-32" id="quote-form">
                            <QuoteForm />

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact {area.locationName} Branch</h3>
                                <div className="space-y-3 text-sm text-slate-600">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span>Mon - Fri</span>
                                        <span className="font-bold text-slate-900">8:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span>Saturday</span>
                                        <span className="font-bold text-slate-900">9:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-bold text-red-500">Emergency Only</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
