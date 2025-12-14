import { Shield, Target, Users, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Pest Control Noida - a Unit of Lex Hygiene India',
    description: 'Learn about Lex Hygiene India, a trusted pest control provider in Noida and Delhi NCR since 2008.',
};

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-slate-900 text-white py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Our Story</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">About Pest Control Noida</h1>
                    <p className="text-sm md:text-base text-slate-400 font-medium uppercase tracking-wider mb-6">a unit of Lex Hygiene India</p>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                        Protecting homes and businesses in Noida & Delhi NCR with advanced, eco-friendly pest solutions for over 15 years.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Text Content */}
                    <div className="space-y-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-8 h-8 text-eco-green" />
                                <h2 className="text-3xl font-bold text-slate-900">Who We Are</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-lg mb-6">
                                <strong className="text-slate-900">Pest Control Noida - a Unit of Lex Hygiene India</strong> is dedicated to providing premium pest control and hygiene services. Founded in 2016, we have grown from a small local team to a trusted name across the National Capital Region.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We believe in a scientific approach to pest management. Instead of just spraying chemicals, we analyze the root cause of infestations, implement targeted treatments, and provide long-term prevention strategies ensuring a safe environment for your family and employees.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-8 h-8 text-gold" />
                                <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                To deliver the highest standard of hygiene and pest-free living through eco-friendly innovations, certified expertise, and unwavering commitment to customer satisfaction.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            {[
                                { icon: Users, title: 'Certified Experts', desc: 'Trained & vetted technicians' },
                                { icon: CheckCircle, title: 'Eco-Friendly', desc: 'Safe for kids & pets' },
                                { icon: Clock, title: 'Fast Response', desc: 'Mon - Sun 8am - 8pm' },
                                { icon: Shield, title: 'Guaranteed Results', desc: 'Warranty on services' },
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <feature.icon className="w-8 h-8 text-eco-green mb-3" />
                                    <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                                    <p className="text-sm text-slate-500">{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4 text-gold">Contact Details</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                                        <div className="text-sm text-slate-300">
                                            <span className="font-bold text-white block">Head Office</span>
                                            Logix City Centre, Noida,<br />Uttar Pradesh, 201301
                                        </div>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-slate-400" />
                                        <a href="tel:+918882333782" className="text-white font-bold hover:text-gold transition-colors">+91 8882333782</a>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-slate-400" />
                                        <a href="mailto:info@pestcontrolnoida.in" className="text-white hover:text-gold transition-colors decoration-slice">info@pestcontrolnoida.in</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:sticky lg:top-24">
                        <QuoteForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
