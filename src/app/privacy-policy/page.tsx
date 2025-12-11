import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | Pest Control Noida',
    description: 'Privacy Policy for Pest Control Noida services.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="container mx-auto max-w-4xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-eco-green">
                    <p className="text-lg">Last Updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        Welcome to Pest Control Noida (a unit of Lex Hygiene India). We are committed to protecting your privacy and ensuring your personal information is handled in a safe and responsible manner.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We collect information that you strictly provide to us for the purpose of inquiring about or securing our pest control services. This includes:
                    </p>
                    <ul>
                        <li>Name</li>
                        <li>Phone Number</li>
                        <li>Email Address</li>
                        <li>Property Address</li>
                        <li>Details about your pest problem</li>
                    </ul>

                    <h3>2. How We Use Your Information</h3>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul>
                        <li>Provide quotes and schedule inspections.</li>
                        <li>Communicate with you regarding your service appointments.</li>
                        <li>Send you important updates or safety information related to our treatments.</li>
                        <li>Improve our website and customer service.</li>
                    </ul>

                    <h3>3. Information Sharing</h3>
                    <p>
                        We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                    </p>

                    <h3>4. Security</h3>
                    <p>
                        We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
                    </p>

                    <h3>5. Contact Us</h3>
                    <p>
                        If there are any questions regarding this privacy policy, you may contact us using the information below:
                    </p>
                    <p>
                        <strong>Pest Control Noida</strong><br />
                        Logix City Centre, Noida<br />
                        Uttar Pradesh, India<br />
                        Email: <Link href="mailto:info@pestcontrolnoida.com">info@pestcontrolnoida.com</Link><br />
                        Phone: <Link href="tel:+918882333782">+91 8882333782</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
