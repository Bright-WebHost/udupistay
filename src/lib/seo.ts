export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

export const generateHead = (seo: SEOMetadata) => {
  return {
    title: seo.title,
    description: seo.description,
    canonical: seo.canonical,
    openGraph: {
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      url: seo.canonical,
      type: seo.ogType || 'website',
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle || seo.title,
      description: seo.ogDescription || seo.description,
      images: seo.ogImage ? [seo.ogImage] : [],
    },
  };
};

// Homestay Schema Markup
export const getHomestaySchema = (homestay: {
  title: string;
  description: string;
  guests: number;
  bathrooms: number;
  rooms: number;
  image: string;
  location: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: homestay.title,
    description: homestay.description,
    image: `https://udupistay.com${homestay.image}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Udupi',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    priceRange: '₹',
    telephone: '+91 89712 20576',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'WiFi' },
      { '@type': 'LocationFeatureSpecification', name: 'Parking' },
      { '@type': 'LocationFeatureSpecification', name: 'Kitchen' },
    ],
    numberOfBedrooms: homestay.rooms,
    numberOfBathroomsNumber: homestay.bathrooms,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: homestay.guests,
    },
  };
};

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Udupi Homestay',
  description: 'Premium homestays in Udupi, Karnataka near Malpe Beach, Krishna Temple, and Manipal',
  url: 'https://udupistay.com',
  logo: 'https://udupistay.com/logo-white.png',
  sameAs: [],
  contact: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+91 89712 20576',
    availableLanguageId: 'en-IN',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Udupi',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
};

// LocalBusiness Schema for better local SEO
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Udupi Homestay',
  image: 'https://udupistay.com/logo-white.png',
  description: 'Premium homestays in Udupi near Malpe Beach, Krishna Temple, and Manipal University',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Udupi',
    addressRegion: 'Karnataka',
    postalCode: '576101',
    addressCountry: 'IN',
  },
  telephone: '+91 89712 20576',
  url: 'https://udupistay.com',
  priceRange: '₹',
  areaServed: [
    'Udupi',
    'Manipal',
    'Malpe',
    'Karnataka',
  ],
};

// Breadcrumb Schema
export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
