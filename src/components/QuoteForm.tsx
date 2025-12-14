'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function QuoteForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', heardAbout: 'Google Search', description: ''
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name || 'heardAbout']: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = recaptchaRef.current?.getValue();
        if (!token) {
            alert("Please verify that you are not a robot.");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, token }),
            });
            const data = await res.json();
            if (data.success) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', phone: '', heardAbout: 'Google Search', description: '' });
                recaptchaRef.current?.reset();
                router.push('/thank-you');
            } else {
                alert('Failed to send request. Please try again.');
            }
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-green-50 p-8 rounded-xl text-center border border-green-100">
                <div className="inline-flex bg-green-100 p-3 rounded-full mb-4">
                    <CheckCircle className="w-8 h-8 text-eco-green" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-600">Our team will call you shortly on the provided number.</p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-sm font-bold text-eco-green hover:underline"
                >
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-sans font-bold text-slate-900 mb-2">Get a Free Quote</h3>
            <p className="text-slate-500 mb-8 text-sm">Fill out the form below to request a free inspection or get a quote for our services.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* 2-Column Desktop Layout for Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wider">Full Name *</label>
                        <input name="name" value={formData.name} onChange={handleChange} type="text" required className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-eco-green focus:bg-white focus:ring-1 focus:ring-eco-green outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="John Doe" />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wider">Email Address *</label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" required className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-eco-green focus:bg-white focus:ring-1 focus:ring-eco-green outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="john@example.com" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wider">Phone Number (Optional)</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-eco-green focus:bg-white focus:ring-1 focus:ring-eco-green outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="+91..." />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wider">How did you hear about us?</label>
                        <select name="heardAbout" value={formData.heardAbout} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-eco-green focus:bg-white focus:ring-1 focus:ring-eco-green outline-none transition-all text-slate-700 font-medium appearance-none">
                            <option>Google Search</option>
                            <option>Social Media</option>
                            <option>Friend Referral</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 tracking-wider">Tell us about your home</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-eco-green focus:bg-white focus:ring-1 focus:ring-eco-green outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="Looking for termite control services..."></textarea>
                    </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" required id="privacy" className="mt-1 w-4 h-4 rounded border-gray-300 text-eco-green focus:ring-eco-green" />
                    <label htmlFor="privacy" className="text-xs text-slate-500 leading-relaxed">
                        I agree to the <a href="/privacy-policy" className="text-eco-green font-bold hover:underline">Privacy Policy</a> and consent to being contacted regarding my query.
                    </label>
                </div>

                <div className="flex justify-center transform scale-90 origin-left">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Sending...</span>
                        </>
                    ) : (
                        <>
                            <span>Get My Free Quote</span>
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
