import type { Metadata } from "next";
import { getHomestayByRoute } from "@/data/homestays";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ homestay: string }>;
}): Promise<Metadata> {
  const { homestay: route } = await params;
  const stay = getHomestayByRoute(route);

  if (!stay) {
    return {
      title: "Premium Homestay in Udupi | Family Stays Near Malpe Beach",
      description:
        "Find premium and budget homestays in Udupi near Malpe Beach, Krishna Temple, and Manipal University with complete amenities.",
      openGraph: {
        title: "Premium Homestay in Udupi",
        description: "Family-friendly homestays in Udupi near Malpe Beach and Krishna Temple",
        type: "website",
      },
    };
  }

  const isHomestay = stay.rooms > 0;
  const title = isHomestay 
    ? `${stay.title} - Premium Homestay in Udupi, Karnataka`
    : `${stay.title} - Premium Pool Area & Outdoor Retreat in Udupi, Karnataka`;

  const description = isHomestay
    ? `${stay.description} Accommodates ${stay.guests} guests with ${stay.rooms} bedrooms and ${stay.bathrooms} bathrooms. Located near Malpe Beach, Krishna Temple, and Manipal University.`
    : `${stay.description} Accommodates up to ${stay.guests} guests with ${stay.bathrooms} bathrooms. Located near Udupi & Manipal, Karnataka.`;

  const ogTitle = isHomestay
    ? `${stay.title} - Homestay in Udupi`
    : `${stay.title} - Pool Area & Outdoor Retreat in Udupi`;

  return {
    title,
    description,
    keywords: [stay.title, "Udupi homestay", "family stay", "vacation rental"],
    alternates: {
      canonical: `https://udupistay.com/${stay.route}`,
    },
    openGraph: {
      title: ogTitle,
      description: stay.longDescription,
      type: "website",
      url: `https://udupistay.com/${stay.route}`,
      images: [
        {
          url: `https://udupistay.com${stay.image}`,
          width: 1200,
          height: 630,
          alt: stay.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: stay.description,
      images: [`https://udupistay.com${stay.image}`],
    },
  };
}

export default function HomestayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
