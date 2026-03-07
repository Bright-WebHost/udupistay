import type { Metadata } from "next";
import "./globals.css";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CustomCursor from "@/components/custom-cursor";
import PageTransitionClient from "@/components/page-transition-client";
import ScrollToTop from "@/components/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL("https://udupistay.com"),
  title: {
    default: "Udupi Homestay | Best Homestays in Udupi, Karnataka",
    template: "%s | Udupi Homestay",
  },
  description:
    "Book premium homestays in Udupi near Malpe Beach, Sri Krishna Temple, and Manipal University. Family-friendly AC accommodations with catering services and homemade food.",
  keywords: [
    "homestay in Udupi",
    "Udupi homestay",
    "best homestay in Udupi",
    "homestay near Malpe beach",
    "homestay near Krishna temple Udupi",
    "Udupi Karnataka homestay",
    "homestay near Manipal University",
    "family homestay Udupi",
    "budget homestay Udupi",
    "AC homestay Udupi",
    "Udupi homestay with food",
    "catering services Udupi",
    "luxury villa Udupi",
    "vacation rental Udupi",
  ],
  alternates: {
    canonical: "https://udupistay.com",
  },
  openGraph: {
    title: "Udupi Homestay | Premium Homestays in Udupi, Karnataka",
    description:
      "Family and group-friendly homestays in Udupi near Malpe Beach and Sri Krishna Temple with AC rooms, homemade food, and catering services.",
    url: "https://udupistay.com",
    siteName: "Udupi Homestay",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "https://udupistay.com/og-image.png",
      width: 1200,
      height: 630,
      alt: "Udupi Homestay",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Udupi Homestay | Premium Homestays in Udupi",
    description:
      "Stay near Malpe Beach, Krishna Temple, and Manipal. Book AC, family, and luxury homestays in Udupi with complete amenities.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    google: "add-your-google-verification-code",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Udupi Homestay",
  "url": "https://udupistay.com",
  "logo": "https://udupistay.com/logo-white.png",
  "description": "Premium homestays in Udupi, Karnataka near Malpe Beach, Krishna Temple, and Manipal University",
  "telephone": "+91 89712 20576",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Udupi",
    "addressRegion": "Karnataka",
    "postalCode": "576101",
    "addressCountry": "IN",
  },
  "areaServed": ["Udupi", "Malpe", "Manipal", "Karnataka"],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Family Friendly", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Catering Services", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Swimming Pool", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parking", "value": true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-background text-foreground antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ScrollToTop />
        <CustomCursor />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <PageTransitionClient>{children}</PageTransitionClient>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
