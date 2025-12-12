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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">

                    {/* Contact Info Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Phone Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-eco-green mb-6 group-hover:bg-eco-green group-hover:text-white transition-colors">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-sans font-bold text-slate-900 mb-1 text-lg">Phone Number</h3>
                            <p className="text-sm text-slate-500 mb-3">Mon - Sat: 8am - 8pm<br />Sun: Emergency Only</p>
                            <a href="tel:+918882333782" className="text-lg text-slate-900 font-bold hover:text-gold transition-colors flex items-center gap-2">
                                +91 8882333782
                                <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        {/* Email Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-white transition-colors">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-sans font-bold text-slate-900 mb-1 text-lg">Email Address</h3>
                            <p className="text-sm text-slate-500 mb-3">For general inquiries</p>
                            <a href="mailto:info@pestcontrolnoida.com" className="text-lg text-slate-900 font-bold hover:text-gold transition-colors break-words">
                                info@pestcontrolnoida.com
                            </a>
                        </div>

                        {/* Office Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-sans font-bold text-slate-900 mb-1 text-lg">Our Office</h3>
                            <address className="text-slate-600 not-italic leading-relaxed">
                                <span className="font-bold block mb-1">Pest Control Noida</span>
                                <span className="text-xs uppercase tracking-wider block mb-2 text-slate-400">a unit of Lex Hygiene India</span>
                                Logix City Centre, Noida,<br />
                                Uttar Pradesh, India
                            </address>
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
        </div>
    );
}
