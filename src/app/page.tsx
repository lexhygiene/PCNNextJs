import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ShieldCheck, Bug, Leaf, Search, Sparkles } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: 'Pest Control Noida & NCR | Expert Termite & Pest Removal',
  description: 'Government-approved, eco-friendly pest control in Noida. Specializing in termite treatment, cockroach control, and rodent defense. Call for a free quote.',
};

export default async function Home() {
  // Fetch posts from Sanity
  const posts = await client.fetch(POSTS_QUERY);
  console.log('Sanity Posts Data:', JSON.stringify(posts, null, 2));

  return (
    <div className="min-h-screen bg-[#F7F9F9]">

      {/* Hero Section - Gradient & Texture */}
      <div className="relative bg-gradient-to-br from-slate-900 to-eco-green text-white pt-12 pb-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <span className="text-gold font-bold tracking-widest uppercase text-sm mb-6 block">Professional Pest Control Services</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
            Expert Pest Control <br className="hidden md:block" /> in Noida & NCR
          </h1>
          <p className="text-2xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Government-approved, eco-friendly <strong>Pest Control in Noida</strong>. We specialize in <strong>Termite Control in Noida</strong>, cockroach removal, and rodent defense.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-gold hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
              Get a Free Quote
            </Link>
            <Link href="/pest-library" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-all text-lg backdrop-blur-sm border border-white/20">
              Identify Pests
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Service Cards - Minimalist, overlapping */}
      <div className="container mx-auto px-4 mt-6 md:mt-12 relative z-20 mb-8 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-eco-green mb-8">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-slate-800 mb-4">Termite Control in Noida</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">Protect your property investment with our advanced, odor-free drill-fill-seal termite treatment in Noida.</p>
            <Link href="/pest-library" className="text-eco-green font-bold text-sm tracking-wide uppercase hover:opacity-80">Learn More</Link>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 relative top-0 md:-top-4">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-gold mb-8">
              <Bug className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-slate-800 mb-4">General Pest Control</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">Complete sanitization against cockroaches, ants, and mosquitoes for a healthier home in Noida.</p>
            <Link href="/pest-library" className="text-gold font-bold text-sm tracking-wide uppercase hover:opacity-80">View All Pests</Link>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-slate-600 mb-8">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-slate-800 mb-4">Eco-Safe Protocol</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">We prioritize your health using government-approved, low-toxicity chemicals safe for pests.</p>
            <Link href="/articles" className="text-slate-600 font-bold text-sm tracking-wide uppercase hover:opacity-80">Read Our Safety Policy</Link>
          </div>
        </div>
      </div>

      {/* 3. Article Grid (Modern list) */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="text-gold font-bold tracking-widest uppercase text-xs mb-2 block">Knowledge Base</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Latest Insights</h2>
          </div>
          <Link href="/articles" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-eco-green transition-colors">
            View All Articles <Sparkles className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.slice(0, 3).map((post: any) => (
              <Link href={`/articles/${post.slug.current}`} key={post._id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-100">
                  {post.mainImageExternalUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.mainImageExternalUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(600).url()}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-eco-green uppercase tracking-wider">
                    {post.categories?.[0] || 'Insight'}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-eco-green transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-500 line-clamp-2 mb-4">
                  {post.seoDescription || "Read more about this pest control topic..."}
                </p>
                <span className="text-gold font-bold text-sm flex items-center gap-2">
                  Read Article <span className="text-xl leading-none">→</span>
                </span>
              </Link>
            ))
          ) : (
            <p className="text-slate-500">No posts found.</p>
          )}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/articles" className="inline-block bg-slate-100 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition-colors">
            View All Articles
          </Link>
        </div>
      </div>

      {/* 4. CTA Section - Big Impact */}
      <div className="bg-slate-900 text-white py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready to reclaim your space?</h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-10 font-light">
            Book a comprehensive inspection today and get a custom treatment plan for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+918882333782" className="bg-gold hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-full transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
              Call Now: +91 8882333782
            </a>
            <Link href="/contact" className="bg-transparent border-2 border-slate-700 hover:border-white text-white font-bold py-4 px-12 rounded-full transition-all text-lg">
              Book Online
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
