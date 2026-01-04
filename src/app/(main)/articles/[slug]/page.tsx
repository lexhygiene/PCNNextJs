import { client } from "@/sanity/lib/client";
import { POST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CustomPortableText } from "@/components/CustomPortableText";
import { Shield, Calendar, User, ArrowRight } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

import { Metadata } from "next";

// Revalidate every 60 seconds
// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

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
        alternates: {
            canonical: post.canonicalUrl || `https://pestcontrolnoida.in/articles/${post.slug.current}`,
        },
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
                            alt={post.mainImageExternalAlt || post.title}
                            className="w-full h-full object-cover blur-sm"
                        />
                    ) : post.mainImage && (
                        <Image
                            src={urlFor(post.mainImage).width(1920).height(1080).url()}
                            alt={post.mainImage?.alt || post.title}
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
                                        alt={post.mainImageExternalAlt || post.title}
                                        className="w-full h-auto"
                                    />
                                </div>
                            ) : post.mainImage && (
                                <div className="mb-10 rounded-lg overflow-hidden shadow-sm">
                                    <Image
                                        src={urlFor(post.mainImage).width(1200).height(800).url()}
                                        alt={post.mainImage?.alt || post.title}
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

            {/* Related Articles Section */}
            {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div className="bg-white py-16 border-t border-slate-100 mt-12">
                    <div className="container mx-auto px-4 max-w-[1440px]">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-1 w-10 bg-gold rounded-full"></div>
                            <h2 className="text-2xl font-serif font-bold text-slate-900">More Articles Like This</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {post.relatedPosts.map((relatedPost: any) => (
                                <a href={`/articles/${relatedPost.slug.current}`} key={relatedPost._id} className="group flex flex-col bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-slate-100">
                                    <div className="relative aspect-video overflow-hidden">
                                        {relatedPost.mainImageExternalUrl ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img
                                                src={relatedPost.mainImageExternalUrl}
                                                alt={relatedPost.mainImageExternalAlt || relatedPost.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : relatedPost.mainImage ? (
                                            <Image
                                                src={urlFor(relatedPost.mainImage).width(600).height(400).url()}
                                                alt={relatedPost.title}
                                                fill
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                                <span className="text-slate-400 text-sm font-bold">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium uppercase">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{new Date(relatedPost.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-eco-green transition-colors">
                                            {relatedPost.title}
                                        </h3>
                                        <div className="mt-auto pt-4 flex items-center text-gold text-sm font-bold group-hover:gap-2 transition-all">
                                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
}
