import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

export const metadata = {
    title: 'Contact Us | The Green Shield',
    description: 'Get in touch with our expert team for pest control advice and services.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F9] pb-20">
            {/* Hero Section - Gradient & Texture */}
            <div className="relative bg-gradient-to-br from-slate-900 to-eco-green text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">We are here to help</span>
                    <h1 className="text-5xl md:text-6xl font-sans font-bold mb-6">Contact Us</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                        Have a pest problem? Reach out to our expert team for immediate assistance, quotes, or to schedule a comprehensive inspection.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 max-w-6xl mx-auto">

                    {/* Contact Info Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Phone Card */}
                        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all flex flex-row-reverse items-start gap-4 md:gap-6">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center text-eco-green shrink-0 group-hover:bg-eco-green group-hover:text-white transition-colors">
                                <Phone className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <h3 className="font-sans font-bold text-slate-900 mb-1 text-lg">Phone Number</h3>
                                <p className="text-sm text-slate-500 mb-2 md:mb-3">Mon - Sun: 8am - 8pm</p>
                                <a href="tel:+918882333782" className="text-base md:text-lg text-slate-900 font-bold hover:text-gold transition-colors flex items-center gap-2">
                                    +91 8882333782
                                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all flex flex-row-reverse items-start gap-4 md:gap-6">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 rounded-xl flex items-center justify-center text-gold shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <h3 className="font-sans font-bold text-slate-900 mb-1 text-lg">Email Address</h3>
                                <p className="text-sm text-slate-500 mb-2 md:mb-3">For general inquiries</p>
                                <a href="mailto:info@pestcontrolnoida.com" className="text-base md:text-lg text-slate-900 font-bold hover:text-gold transition-colors break-words">
                                    info@pestcontrolnoida.com
                                </a>
                            </div>
                        </div>

                        {/* Office Card */}
                        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all flex flex-row-reverse items-start gap-4 md:gap-6">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-slate-600 shrink-0 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <h3 className="font-sans font-bold text-slate-900 mb-1 text-lg">Our Office</h3>
                                <address className="text-slate-600 not-italic leading-relaxed text-sm">
                                    <span className="font-bold block mb-1">Pest Control Noida</span>
                                    <span className="text-[10px] md:text-xs uppercase tracking-wider block mb-2 text-slate-400">a unit of Lex Hygiene India</span>
                                    Logix City Centre, Noida,<br />
                                    Uttar Pradesh, India
                                </address>
                            </div>
                        </div>
                    </div>

                    {/* Form Column (8 cols) */}
                    <div className="lg:col-span-8">
                        <QuoteForm />

                        {/* Additional Help Text */}
                        <div className="mt-8 text-center text-slate-400 text-sm">
                            <p>Need urgent help? Call us directly for priority service.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Map Section */}
            <div className="mt-20 h-[450px] w-full bg-slate-100 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.671977943522!2d77.29971187549552!3d28.489423675743218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce9baa3b08a0f%3A0x4d62d56e4b6c152f!2sLex%20Hygiene%20India!5e0!3m2!1sen!2sin!4v1765557576365!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Pest Control Noida Location"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
            </div>
        </div>
    );
}
