import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Udupi Homestay | Book Your Stay in Udupi",
  description:
    "Contact Udupi Homestay for bookings and inquiries. Get personalized assistance for family stays, luxury villas, and group accommodations in Udupi, Karnataka.",
  keywords: ["contact homestay", "book Udupi homestay", "homestay booking", "Udupi accommodation contact"],
  alternates: {
    canonical: "https://udupistay.com/contact",
  },
  openGraph: {
    title: "Contact Udupi Homestay",
    description: "Get in touch for homestay bookings and inquiries in Udupi.",
    type: "website",
    url: "https://udupistay.com/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
