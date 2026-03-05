import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Udupi Homestay | Trusted Accommodations Since 2015",
  description:
    "Learn about Udupi Homestay - your trusted platform for discovering premium family homestays, luxury villas, and budget-friendly accommodations near Malpe Beach and Krishna Temple in Udupi, Karnataka.",
  keywords: ["about Udupi Homestay", "homestay provider", "vacation rentals", "family accommodations"],
  openGraph: {
    title: "About Udupi Homestay",
    description: "Discover our story and commitment to providing exceptional homestay experiences in Udupi.",
    type: "website",
    url: "https://udupistay.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
