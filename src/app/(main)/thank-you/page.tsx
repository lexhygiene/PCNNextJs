
import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";

export const metadata = {
    title: 'Thank You | Pest Control Noida - a Unit of Lex Hygiene India',
    description: 'Thank you for your enquiry. We will be in touch shortly.',
    robots: {
        index: false,
        follow: false,
    }
};

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-[#F7F9F9] flex items-center justify-center p-4">
            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-100">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                    <CheckCircle className="w-12 h-12 text-eco-green" />
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                    Request Received!
                </h1>

                <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                    Thank you for reaching out. Our expert team has received your details and will call you shortly to discuss your requirements.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full bg-eco-green hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        <span>Back to Homepage</span>
                    </Link>

                    <p className="text-xs text-slate-400 mt-6">
                        Need immediate assistance? <a href="tel:+918882333782" className="text-gold font-bold hover:underline">Call +91 8882333782</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
