import { client } from "@/sanity/lib/client";
import { PEST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomPortableText } from "@/components/CustomPortableText";
import { AlertTriangle, Bug, Shield, ThermometerSun } from "lucide-react";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";

import { Metadata } from "next";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(
    props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const pest = await client.fetch(PEST_QUERY, { slug: params.slug });

    if (!pest) {
        return {
            title: "Pest Not Found",
        };
    }

    return {
        title: pest.seoTitle || `${pest.commonName} Control & Identification | Pest Library`,
        description: pest.seoDescription || `Learn how to identify and get rid of ${pest.commonName} (${pest.scientificName}). Expert advice on behavior, habitat, and prevention.`,
        openGraph: {
            title: pest.seoTitle || `${pest.commonName} Control & Identification | Pest Library`,
            description: pest.seoDescription || `Learn how to identify and get rid of ${pest.commonName} (${pest.scientificName}). Expert advice on behavior, habitat, and prevention.`,
            images: pest.mainImageExternalUrl
                ? [pest.mainImageExternalUrl]
                : pest.image
                    ? [urlFor(pest.image).width(1200).height(630).url()]
                    : [],
        }
    };
}

export default async function PestPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const pest = await client.fetch(PEST_QUERY, { slug: params.slug });

    if (!pest) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-20 bg-slate-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center gap-8">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner flex-shrink-0 bg-gray-200">
                        {pest.mainImageExternalUrl ? (
                            <Image
                                src={pest.mainImageExternalUrl}
                                alt={pest.commonName}
                                fill
                                className="object-cover"
                            />
                        ) : pest.image && (
                            <Image
                                src={urlFor(pest.image).width(300).height(300).url()}
                                alt={pest.commonName}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">{pest.commonName}</h1>
                            <span className={`
                            px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider border
                            ${pest.dangerLevel === 'high' ? 'bg-red-50 text-red-700 border-red-100' :
                                    pest.dangerLevel === 'medium' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                        'bg-green-50 text-green-700 border-green-100'}
                        `}>
                                {pest.dangerLevel}
                            </span>
                        </div>
                        <p className="text-slate-500 italic text-lg mb-4">{pest.scientificName}</p>

                        {pest.seasonalActivity && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <ThermometerSun className="w-4 h-4 text-gold" />
                                <span className="font-bold">Active Seasons:</span>
                                {pest.seasonalActivity.join(', ')}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {pest.behavior && (
                        <div className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-eco-green">
                            <div className="flex items-center gap-3 mb-6">
                                <Bug className="w-6 h-6 text-eco-green" />
                                <h2 className="text-2xl font-serif font-bold text-slate-900">Behavior & Habits</h2>
                            </div>
                            <div className="prose max-w-none text-slate-600">
                                <CustomPortableText value={pest.behavior} />
                            </div>
                        </div>
                    )}

                    {pest.habitat && (
                        <div className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-gold">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle className="w-6 h-6 text-gold" />
                                <h2 className="text-2xl font-serif font-bold text-slate-900">Habitat & Signs</h2>
                            </div>
                            <div className="prose max-w-none text-slate-600">
                                <CustomPortableText value={pest.habitat} />
                            </div>
                        </div>
                    )}

                    <div className="bg-slate-900 text-white rounded-xl shadow-lg p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-gold" />
                            <h2 className="text-2xl font-serif font-bold text-white">Prevention & Control</h2>
                        </div>
                        {pest.prevention ? (
                            <div className="prose prose-invert prose-lg max-w-none">
                                <CustomPortableText value={pest.prevention} isDark={true} />
                            </div>
                        ) : (
                            <p className="text-slate-400">No specific prevention tips listed. Contact a professional immediately.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar / Prevention */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <QuoteForm />



                        <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
                            <p className="text-sm text-slate-500 mb-2">Not what you were looking for?</p>
                            <Link href="/pest-library" className="text-eco-green font-bold hover:underline">
                                ← Back to Pest Library
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: pest.commonName,
                        description: pest.seoDescription || `Complete guide to identifying and controlling ${pest.commonName}.`,
                        image: pest.mainImageExternalUrl ? [pest.mainImageExternalUrl] : (pest.image ? [urlFor(pest.image).url()] : []),
                        author: {
                            '@type': 'Organization',
                            name: 'Pest Control Noida'
                        },
                        datePublished: pest._createdAt,
                        dateModified: pest._updatedAt,
                    })
                }}
            />
        </div>
    );
}
