import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Udupi Homestay Photos & Videos",
  description:
    "Explore our stunning gallery of premium homestays in Udupi. View photos and videos of luxury villas, family stays, and accommodations near Malpe Beach and Krishna Temple.",
  keywords: ["homestay gallery", "Udupi photos", "vacation rental images", "villa gallery"],
  openGraph: {
    title: "Homestay Gallery | Udupi Homestay",
    description: "Browse beautiful photos and videos of our premium homestays in Udupi.",
    type: "website",
    url: "https://udupistay.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
