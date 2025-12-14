import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | Pest Control Noida',
    description: 'Terms of Service for Pest Control Noida.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="container mx-auto max-w-4xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 mb-8">Terms of Service</h1>

                <div className="prose prose-slate max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-eco-green">
                    <p className="text-lg">Last Updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        By accessing this website and using our services, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h3>1. Services</h3>
                    <p>
                        Pest Control Noida (a unit of Lex Hygiene India) provides residential and commercial pest control services in Noida, Greater Noida, Ghaziabad, and Gurgaon. All services are subject to availability and our standard service agreement.
                    </p>

                    <h3>2. Pricing and Payments</h3>
                    <p>
                        Quotes provided via the website are estimates based on the information provided. Final pricing may vary based on an on-site inspection. Payment terms will be agreed upon prior to service commencement.
                    </p>

                    <h3>3. Cancellations and Rescheduling</h3>
                    <p>
                        Please provide at least 24 hours notice for any cancellations or rescheduling of appointments. Failure to do so may result in a fee.
                    </p>

                    <h3>4. Liability</h3>
                    <p>
                        While we take every precaution to ensure safe and effective treatments, Pest Control Noida shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services, except where required by law.
                    </p>

                    <h3>5. Changes to Terms</h3>
                    <p>
                        We reserve the right to modify these terms at any time. Your continued use of the site after any such changes constitutes your acceptance of the new Terms of Service.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        <strong>Pest Control Noida</strong><br />
                        Logix City Centre, Noida<br />
                        Uttar Pradesh, India<br />
                        Email: <Link href="mailto:info@pestcontrolnoida.in">info@pestcontrolnoida.in</Link><br />
                        Phone: <Link href="tel:+918882333782">+91 8882333782</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
