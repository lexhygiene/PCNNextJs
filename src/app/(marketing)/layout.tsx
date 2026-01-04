import Link from "next/link";
import WhatsAppBubble from "@/components/WhatsAppBubble";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* Slim Header */}
            <header className="fixed top-0 left-0 right-0 py-4 px-6 md:px-12 bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 flex items-center justify-between">
                <Link href="#" className="font-serif font-bold text-xl md:text-2xl text-slate-900 tracking-tight flex flex-col">
                    <span>Pest Control <span className="text-gold">Noida</span></span>
                    <span className="text-[10px] md:text-xs text-slate-500 font-sans tracking-wide font-normal uppercase mt-0.5">A Unit of Lex Hygiene India</span>
                </Link>
                <a
                    href="tel:+918882333782"
                    className="bg-gold hover:bg-orange-600 text-white text-sm md:text-base font-bold py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    <span>Call Now</span>
                </a>
            </header>

            <main className="flex-grow pt-20">
                {children}
            </main>

            {/* Minimal Footer */}
            <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center text-sm border-t border-slate-800">
                <p className="mb-4">Logix City Centre, Noida, Uttar Pradesh 201301</p>
                <div className="flex justify-center gap-4 mb-4">
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <span>|</span>
                    <span>&copy; {new Date().getFullYear()} Pest Control Noida</span>
                </div>
            </footer>

            {/* WhatsApp Bubble (Mobile Only as requested, but good for all) - Visible on Mobile primarily but let's keep it responsive */}
            <WhatsAppBubble />
        </>
    );
}
