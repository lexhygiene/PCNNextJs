'use client';

import QuoteForm from '@/components/QuoteForm';
import { ShieldCheck, Clock, Award, Star } from 'lucide-react';
import Image from 'next/image';

import { sendGAEvent } from '@/lib/analytics';

export default function TermiteLandingPage() {
    return (
        <div className="bg-white">
            {/* SECTION 1: HERO */}
            <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-10 bg-[url('/cubes.png')] animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-eco-green/50"></div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-block bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            Official Anti-Termite Treatment
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                            Get Rid of <span className="text-gold">Termites</span> Today – 100% Guaranteed.
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 font-light leading-relaxed">
                            Professional & Odorless Termite Control in Noida. Government-approved chemicals.
                            <span className="block mt-2 font-medium text-white">Starting from just ₹1299.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="tel:+918882333782"
                                onClick={() => sendGAEvent('click_call', 'Hero Section')}
                                className="bg-gold hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2"
                            >
                                📞 Click to Call: 8882333782
                            </a>
                        </div>

                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-400">
                            <span className="w-2 h-2 bg-eco-green rounded-full animate-pulse"></span>
                            Available Now in Noida Sectors 1-150 & NCR
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gold to-eco-green rounded-2xl blur opacity-30 pointer-events-none"></div>
                        <div className="relative z-10">
                            <QuoteForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: SOCIAL PROOF */}
            <section className="bg-slate-50 py-12 border-b border-slate-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Govt Approved", desc: "CIB Certified Chemicals" },
                            { icon: Clock, title: "Same Day Service", desc: "Within 2 Hours" },
                            { icon: Award, title: "2-Year Warranty", desc: "Written Guarantee" },
                            { icon: Star, title: "Verified Pros", desc: "Background Checked" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                                    <item.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="font-bold text-slate-900">{item.title}</h3>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: PRICING */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-slate-500">No hidden charges. Pay only for what you need.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Basic */}
                        <div className="border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all flex flex-col">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Standard</h3>
                            <div className="text-3xl font-bold text-gold mb-6">₹1,299<span className="text-sm text-slate-400 font-normal">/visit</span></div>
                            <ul className="space-y-4 mb-8 text-sm text-slate-600 flex-1">
                                <li className="flex gap-2"><CheckIcon /> 1 Bedroom / Kitchen</li>
                                <li className="flex gap-2"><CheckIcon /> Drill-Fill-Seal Tech</li>
                                <li className="flex gap-2"><CheckIcon /> Odorless Spray</li>
                                <li className="flex gap-2 text-slate-400"><XIcon /> Warranty</li>
                            </ul>
                            <a
                                href="https://wa.me/918882333782?text=Hi,%20I%20am%20interested%20in%20Standard%20Termite%20Plan%20(Rs.1299)"
                                target="_blank"
                                onClick={() => sendGAEvent('click_whatsapp', 'Pricing Standard')}
                                className="block w-full py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg text-center hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                Book on WhatsApp
                            </a>
                        </div>

                        {/* Best Value */}
                        <div className="border-2 border-gold bg-red-50/10 rounded-2xl p-8 relative shadow-lg transform md:-translate-y-4 flex flex-col">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Advanced (2 BHK)</h3>
                            <div className="text-3xl font-bold text-eco-green mb-6">₹3,499<span className="text-sm text-slate-400 font-normal">/year</span></div>
                            <ul className="space-y-4 mb-8 text-sm text-slate-700 font-medium flex-1">
                                <li className="flex gap-2"><CheckIcon /> Complete Termite Treatment</li>
                                <li className="flex gap-2"><CheckIcon /> Drill-Fill-Seal Tech</li>
                                <li className="flex gap-2"><CheckIcon /> Chemical Barrier</li>
                                <li className="flex gap-2"><CheckIcon /> 1-Year Warranty</li>
                            </ul>
                            <a
                                href="tel:+918882333782"
                                onClick={() => sendGAEvent('click_call', 'Pricing Advanced')}
                                className="block w-full py-3 bg-gold text-white font-bold rounded-lg text-center hover:bg-orange-600 transition-all shadow-md"
                            >
                                Call to Book
                            </a>
                        </div>

                        {/* Premium */}
                        <div className="border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all flex flex-col">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Premium (3 BHK+)</h3>
                            <div className="text-3xl font-bold text-slate-900 mb-6">₹5,999<span className="text-sm text-slate-400 font-normal">/2 years</span></div>
                            <ul className="space-y-4 mb-8 text-sm text-slate-600 flex-1">
                                <li className="flex gap-2"><CheckIcon /> Whole Home Protection</li>
                                <li className="flex gap-2"><CheckIcon /> Quarterly Check-ups</li>
                                <li className="flex gap-2"><CheckIcon /> Pre & Post Construction</li>
                                <li className="flex gap-2"><CheckIcon /> 2-Year Warranty</li>
                            </ul>
                            <a
                                href="https://wa.me/918882333782?text=Hi,%20I%20am%20interested%20in%20Premium%20Termite%20Plan%20(Rs.5999)"
                                target="_blank"
                                onClick={() => sendGAEvent('click_whatsapp', 'Pricing Premium')}
                                className="block w-full py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg text-center hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                Book on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* CTA Strip */}
                    <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Confused what plan to pick?</h3>
                            <p className="text-slate-500 text-sm">Talk to our experts for a custom quote tailored to your home.</p>
                        </div>
                        <a
                            href="tel:+918882333782"
                            onClick={() => sendGAEvent('click_call', 'Bottom CTA')}
                            className="bg-slate-900 hover:bg-black text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>Give us a call</span>
                        </a>
                    </div>

                </div>
            </section>

            {/* SECTION 4: GOOGLE REVIEWS */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8">Trusted by Neighbors in Noida</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            {
                                name: "Amit Sharma",
                                review: "Great value for money. The 2 year warranty gives peace of mind. Best termite control service I have used.",
                                date: "3 weeks ago"
                            },
                            {
                                name: "Priya Singh",
                                review: "Very professional and punctual. They used odorless chemicals as promised. Highly recommend for pest control in Noida.",
                                date: "1 month ago"
                            },
                            {
                                name: "Lalit Kumar",
                                review: "Excellent service by Lex Hygiene. The team was professional and the termite treatment was done very thoroughly. 5 Stars!",
                                date: "2 months ago"
                            }
                        ].map((review, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-xl text-left border border-slate-100 shadow-sm relative">
                                <div className="flex text-gold mb-3">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-3">"{review.review}"</p>
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">{review.name}</div>
                                        <div className="text-[10px] text-slate-400">Google Review • {review.date}</div>
                                    </div>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-4 h-4 ml-auto opacity-50" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-12">
                        <a
                            href="tel:+918882333782"
                            onClick={() => sendGAEvent('click_call', 'Reviews Section CTA')}
                            className="inline-flex bg-gold hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg items-center gap-2"
                        >
                            <span>Join 390+ Happy Neighbors – Call Now</span>
                        </a>
                    </div>

                    {/* Mobile Trust Badge */}
                    <div className="md:hidden bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 text-center">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">A Unit of</p>
                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Lex Hygiene India</h3>
                        <div className="flex justify-center text-gold text-sm font-bold items-center gap-2 mb-4">
                            <div className="flex">★★★★★</div>
                            <span>4.9 (390+ Reviews)</span>
                        </div>
                        <a href="https://maps.google.com/?q=Lex+Hygiene+India" target="_blank" className="inline-block text-xs bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-full font-bold text-slate-700 transition-colors">
                            View on Google Maps
                        </a>
                    </div>

                    {/* Google Map Embed */}
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[300px] md:h-[400px] relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.580665488975!2d77.35338107550063!3d28.574673375696515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5d6d34b35a7%3A0x6323675685257917!2sLogix%20City%20Centre%20Mall!5e0!3m2!1sen!2sin!4v1714828192831!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Map location of Pest Control Noida"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 hidden md:flex">
                            <div className="text-left">
                                <div className="font-bold text-slate-900 text-sm">Lex Hygiene India</div>
                                <div className="flex text-gold text-xs">
                                    ★★★★★ 4.9 (390+ Reviews)
                                </div>
                            </div>
                            <a href="https://maps.google.com/?q=Lex+Hygiene+India" target="_blank" className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md font-bold text-slate-600 transition-colors">
                                View on Google
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: REAL PHOTOS */}
            <section className="bg-slate-50 py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <h2 className="text-3xl font-serif font-bold text-center mb-12">See Our Experts in Action</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
                            <video
                                src="https://res.cloudinary.com/drvdyd23p/video/upload/v1767545245/WhatsApp_Video_2026-01-04_at_21.11.14_rp9mxi.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 bg-black/60 text-white px-4 py-2 text-sm font-medium">Drill-Fill-Seal Process</div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
                            <video
                                src="https://res.cloudinary.com/drvdyd23p/video/upload/v1767545268/WhatsApp_Video_2026-01-04_at_21.11.17_a2hoko.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 bg-black/60 text-white px-4 py-2 text-sm font-medium">Uniformed Professionals</div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="https://wa.me/918882333782?text=Hi,%20I%20saw%20your%20videos%20and%20want%20similar%20termite%20treatment"
                            target="_blank"
                            onClick={() => sendGAEvent('click_whatsapp', 'Video Section CTA')}
                            className="inline-flex border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold py-3 px-8 rounded-full transition-all items-center gap-2"
                        >
                            <span>Get Professional Treatment – Book on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

function CheckIcon() {
    return <div className="text-eco-green"><ShieldCheck className="w-4 h-4" /></div>
}

function XIcon() {
    return <div className="text-slate-300 font-bold text-xs">✕</div>
}
