import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Homestays in Udupi | Premium Stays Near Malpe Beach & Krishna Temple",
  description:
    "Explore our collection of premium homestays in Udupi, Karnataka. Choose from luxury 7BHK villas, family stays, and budget accommodations near Malpe Beach, Krishna Temple, and Manipal University.",
  keywords: ["homestays Udupi", "vacation rental Udupi", "family homestay", "luxury villa Udupi"],
  alternates: {
    canonical: "https://udupistay.com/homestays",
  },
  openGraph: {
    title: "All Homestays in Udupi | Premium Stays Near Malpe Beach",
    description: "Book luxury, family, and budget-friendly homestays in Udupi with complete amenities near beaches and temples.",
    type: "website",
    url: "https://udupistay.com/homestays",
  },
};

export default function HomestaysLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
