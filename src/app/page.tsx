import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ShieldCheck, Bug, Leaf, Search, Sparkles } from "lucide-react";
import MagazineSection from "@/components/MagazineSection";

// Revalidate every 60 seconds
// Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

export const metadata = {
  title: 'Pest Control Noida & NCR | Expert Termite & Pest Removal',
  description: 'Government-approved, eco-friendly pest control in Noida. Specializing in termite treatment, cockroach control, and rodent defense. Call for a free quote.',
};

export default async function Home() {
  // Fetch posts from Sanity
  const posts = await client.fetch(POSTS_QUERY);


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

      <MagazineSection posts={posts} />

      {/* 2.5 How It Works - Process Steps */}
      <div className="bg-white py-16 md:py-24 border-y border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Simple Process</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-12">How We Protect Your Home</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

            <div className="relative group">
              <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:border-eco-green group-hover:scale-110 transition-all duration-300">
                <Search className="w-10 h-10 text-slate-400 group-hover:text-eco-green transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Inspection</h3>
              <p className="text-slate-500 leading-relaxed px-4">We conduct a thorough survey to identify the pest species and infestation level.</p>
            </div>

            <div className="relative group">
              <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:border-gold group-hover:scale-110 transition-all duration-300">
                <Bug className="w-10 h-10 text-slate-400 group-hover:text-gold transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Treatment</h3>
              <p className="text-slate-500 leading-relaxed px-4">Our experts apply eco-friendly, government-approved chemical treatments.</p>
            </div>

            <div className="relative group">
              <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:border-blue-400 group-hover:scale-110 transition-all duration-300">
                <ShieldCheck className="w-10 h-10 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Prevention</h3>
              <p className="text-slate-500 leading-relaxed px-4">We seal entry points and provide tips to prevent future pest problems.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Service Cards (LEFT) & FAQ (RIGHT) - Combined Section */}
      <div className="container mx-auto px-4 mt-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT COLUMN: Service Cards (Stacked) - lg:col-span-5 */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-widest mb-6 block lg:hidden">Our Services</h3>

            {/* Card 1: Termite */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row lg:flex-col gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-50 flex shrink-0 items-center justify-center text-eco-green">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-sans font-bold text-slate-800 mb-2">Termite Control in Noida</h2>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">Protect your property with our advanced, odor-free drill-fill-seal termite treatment.</p>
                <Link href="/pest-library" className="text-eco-green font-bold text-xs tracking-wide uppercase hover:opacity-80 flex items-center gap-1">Learn More <Sparkles className="w-3 h-3" /></Link>
              </div>
            </div>

            {/* Card 2: General */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row lg:flex-col gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex shrink-0 items-center justify-center text-gold">
                <Bug className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-sans font-bold text-slate-800 mb-2">General Pest Control</h2>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">Complete sanitization against cockroaches, ants, and mosquitoes for a healthier home.</p>
                <Link href="/pest-library" className="text-gold font-bold text-xs tracking-wide uppercase hover:opacity-80 flex items-center gap-1">View All Pests <Sparkles className="w-3 h-3" /></Link>
              </div>
            </div>

            {/* Card 3: Eco-Safe */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row lg:flex-col gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex shrink-0 items-center justify-center text-slate-600">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-sans font-bold text-slate-800 mb-2">Eco-Safe Protocol</h2>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">We use government-approved, low-toxicity chemicals safe for children and pets.</p>
                <Link href="/articles" className="text-slate-600 font-bold text-xs tracking-wide uppercase hover:opacity-80 flex items-center gap-1">Read Safety Policy <Sparkles className="w-3 h-3" /></Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: FAQ Section - lg:col-span-7 */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm h-full">
              <div className="mb-10">
                <span className="text-gold font-bold tracking-widest uppercase text-xs mb-3 block">Common Questions</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-500">Everything you need to know about our pest control services in Noida.</p>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is the treatment safe for children and pets?", a: "Yes. We use government-approved, low-toxicity chemicals (CIB approved). However, we recommend keeping children and pets away from the treated area for 2-4 hours during the process." },
                  { q: "Do I need to leave my house during treatment?", a: "For most general pest control (cockroaches, ants), you don't need to leave. For termite treatment (drilling) or intense fogging, we may recommend stepping out for a few hours." },
                  { q: "How long does the treatment take?", a: "A standard 2BHK/3BHK apartment treatment takes about 30-45 minutes. Termite treatment is more intensive and can take 4-6 hours depending on the area." },
                  { q: "Do you provide a warranty?", a: "Yes, we offer warranties ranging from 3 months to 2 years depending on the service (e.g., 2-year warranty for Anti-Termite Treatment)." }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                      <span className="text-gold mt-1">0{idx + 1}.</span> {faq.q}
                    </h3>
                    <p className="text-slate-500 leading-relaxed pl-8 text-sm md:text-base">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
              Call Now
            </a>
            <Link href="/contact" className="bg-transparent border-2 border-slate-700 hover:border-white text-white font-bold py-4 px-12 rounded-full transition-all text-lg">
              Book Online
            </Link>
          </div>
        </div>
      </div>

    </div >
  );
}
