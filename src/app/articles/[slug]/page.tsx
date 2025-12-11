import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomPortableText } from "@/components/CustomPortableText";
import { Shield, Calendar, User } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

import { Metadata } from "next";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateMetadata(
    props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const post = await client.fetch(POST_QUERY, { slug: params.slug });

    if (!post) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || `Read more about ${post.title}`,
        title: post.seoTitle || post.title,
        description: post.seoDescription || `Read more about ${post.title}`,
        openGraph: {
            images: post.mainImageExternalUrl
                ? [post.mainImageExternalUrl]
                : (post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : []),
        }
    };
}



export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await client.fetch(POST_QUERY, { slug: params.slug });

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen pb-20">
            {/* Header/Hero */}
            <div className="bg-slate-900 text-white relative py-20 px-3">
                <div className="absolute inset-0 overflow-hidden opacity-30">
                    {post.mainImageExternalUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={post.mainImageExternalUrl}
                            alt={post.title}
                            className="w-full h-full object-cover blur-sm"
                        />
                    ) : post.mainImage && (
                        <Image
                            src={urlFor(post.mainImage).width(1920).height(1080).url()}
                            alt={post.title}
                            fill
                            className="object-cover blur-sm"
                        />
                    )}
                </div>
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6 text-gold text-sm font-bold uppercase tracking-wider">
                        {post.categories && post.categories.join(' • ')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight max-w-4xl mx-auto">
                        {post.title}
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-300 text-sm">
                        {post.author && (
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gold" />
                                <span>By {post.author}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-3 max-w-[1440px] -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Article Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-xl p-4 md:p-12 overflow-hidden">
                            {post.mainImageExternalUrl ? (
                                <div className="mb-10 rounded-lg overflow-hidden shadow-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.mainImageExternalUrl}
                                        alt={post.title}
                                        className="w-full h-auto"
                                    />
                                </div>
                            ) : post.mainImage && (
                                <div className="mb-10 rounded-lg overflow-hidden shadow-sm">
                                    <Image
                                        src={urlFor(post.mainImage).width(1200).height(800).url()}
                                        alt={post.title}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto"
                                    />
                                </div>
                            )}

                            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-eco-green">
                                <CustomPortableText value={post.body} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <QuoteForm />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
