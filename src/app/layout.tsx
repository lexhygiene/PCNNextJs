import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import FloatingReviewBadge from "@/components/FloatingReviewBadge";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: {
    template: '%s | Pest Control Noida',
    default: 'Pest Control Noida - A Unit of Lex Hygiene India | Expert Services',
  },
  description: 'Pro Pest Control Noida offers government-approved, eco-friendly termite, rodent, and cockroach control services. Residential & Commercial pest removal in Noida & NCR.',
  keywords: ['Pest Control Noida', 'Termite Control in Noida', 'Pest Control Service Noida', 'Cockroach Control Noida', 'Rodent Control Noida'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Pest Control Noida',
              image: 'https://pestcontrolnoida.in/icon.png',
              '@id': 'https://pestcontrolnoida.in',
              url: 'https://pestcontrolnoida.in',
              telephone: '+918882333782',
              priceRange: '₹₹',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Logix City Centre',
                addressLocality: 'Noida',
                addressRegion: 'Uttar Pradesh',
                postalCode: '201301',
                addressCountry: 'IN'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.5747,
                longitude: 77.3560
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'
                ],
                opens: '08:00',
                closes: '20:00'
              },
              sameAs: [
                'https://pestcontrolnoida.in'
              ],
              parentOrganization: {
                '@type': 'Organization',
                name: 'Lex Hygiene India'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91 8882333782',
                contactType: 'customer service'
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans flex flex-col min-h-screen`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DHRGFJQLK6"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DHRGFJQLK6');
          `}
        </Script>

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17787304856"
          strategy="lazyOnload"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17787304856');
          `}
        </Script>

        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <StickyCTA />

      </body>
    </html>
  );
}
