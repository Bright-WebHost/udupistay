export interface Homestay {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  image: string;
  description: string;
  longDescription: string;
  amenities: string[];
  features: string[];
  rooms: number;
  guests: number;
  bathrooms: number;
  highlights: string[];
  location: string;
  nearbyAttractions: string[];
}

export const homestays: Homestay[] = [
  {
    id: "whitehouse",
    title: "WHITE HOUSE",
    subtitle: "Luxury Coastal Retreat",
    route: "Whitehouse",
    image: "/whitehouse.webp",
    description: "Premium 7BHK family homestay in Udupi near Malpe Beach, perfect for large groups and celebrations with 8 modern bathrooms.",
    longDescription: "Experience one of the best homestays in Udupi at White House, a premium 7-bedroom coastal villa with spacious interiors, private balconies, and elegant modern comfort. Located near Malpe Beach with easy access to Udupi city attractions, this luxury Udupi Karnataka homestay is perfect for large families, reunions, and group celebrations.",
    amenities: [
      "Private swimming pool",
      "Ocean view terrace",
      "Fully equipped kitchen",
      "Air conditioning throughout",
      "Spacious living areas",
      "Multiple entertainment zones",
      "24/7 security",
      "Parking facility"
    ],
    features: [
      "7 bedrooms",
      "8 bathrooms",
      "Large living spaces",
      "Modern furnishings",
      "Beach proximity",
      "Outdoor seating areas",
      "Well-maintained gardens"
    ],
    rooms: 7,
    guests: 35,
    bathrooms: 8,
    highlights: [
      "Near Malpe Beach",
      "Perfect for large groups",
      "Modern amenities",
      "City center location"
    ],
    location: "Udupi City Center, Karnataka",
    nearbyAttractions: [
      "Malpe Beach",
      "Sri Krishna Temple",
      "St. Mary's Island",
      "Kaup Beach"
    ]
  },
  {
    id: "gardenvilla",
    title: "GARDEN VILLA",
    subtitle: "Spacious Bedrooms Paradise",
    route: "GardenVilla",
    image: "/gardenvilla.webp",
    description: "Spacious 5BHK Udupi homestay for families, accommodating up to 20 guests with 6 modern bathrooms and garden views.",
    longDescription: "Garden Villa is a family homestay in Udupi designed for relaxed group stays, intimate events, and comfortable long weekends. With 5 spacious bedrooms and 6 bathrooms, landscaped outdoor spaces, and thoughtful amenities, it is a top choice for travelers seeking a premium homestay in Udupi, Karnataka.",
    amenities: [
      "Swimming pool",
      "Fully furnished rooms",
      "Complete kitchen facilities",
      "Spacious dining area",
      "Living and recreation rooms",
      "Outdoor garden space",
      "Parking available",
      "Air conditioning"
    ],
    features: [
      "5 spacious bedrooms",
      "6 bathrooms",
      "Fully furnished",
      "Modern kitchen",
      "Large gardens",
      "Well-designed interiors"
    ],
    rooms: 5,
    guests: 20,
    bathrooms: 6,
    highlights: [
      "Spacious bedrooms",
      "Family-friendly",
      "Fully furnished",
      "Beautiful gardens"
    ],
    location: "Udupi City Center, Karnataka",
    nearbyAttractions: [
      "Shopping markets",
      "Restaurants and cafes",
      "Local temples",
      "Entertainment zones"
    ]
  },
  {
    id: "cottagehouse",
    title: "COTTAGE HOUSE",
    subtitle: "Air-Conditioned 3BHK Villa",
    route: "CottageHouse",
    image: "/cottagehouse.webp",
    description: "AC 3-room cottage homestay near Udupi and Manipal, accommodating up to 8 guests with 4 modern bathrooms.",
    longDescription: "Cottage House is an AC homestay near Manipal University and Udupi, offering a practical blend of comfort, value, and privacy. With 3 well-appointed rooms and 4 bathrooms, this fully furnished stay is ideal for families and small groups searching for a comfortable homestay in Udupi with convenient access to city and campus.",
    amenities: [
      "Air conditioning",
      "Fully furnished",
      "Complete kitchen",
      "Dining area",
      "Living room",
      "Outdoor space",
      "Parking",
      "Water supply"
    ],
    features: [
      "3 rooms",
      "4 bathrooms",
      "Air-conditioned",
      "Modern furnishings",
      "Well-designed",
      "Natural light"
    ],
    rooms: 3,
    guests: 8,
    bathrooms: 4,
    highlights: [
      "Air-conditioned",
      "Fully furnished",
      "Family-friendly",
      "Affordable pricing"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Manipal University",
      "Local restaurants",
      "Shopping areas",
      "Coastal roads"
    ]
  },
  {
    id: "hilltopvilla",
    title: "HILL TOP VILLA",
    subtitle: "Air-Conditioned 3BHK Villa",
    route: "TopVilla",
    image: "/hilltopvilla.webp",
    description: "Scenic AC 3BHK villa near Udupi and Manipal, accommodating up to 10 guests with 3 bathrooms and panoramic views.",
    longDescription: "Hill Top Villa offers a peaceful, elevated stay experience with panoramic views and modern comforts. This AC homestay in Udupi, Karnataka features 3 bedrooms and 3 bathrooms, well-suited for families and couples who want a calm weekend getaway near Manipal University while staying close to key Udupi attractions.",
    amenities: [
      "Air conditioning",
      "Panoramic views",
      "Fully furnished",
      "Kitchen facilities",
      "Living and dining areas",
      "Outdoor viewing space",
      "Parking facility",
      "24/7 water supply"
    ],
    features: [
      "3 bedrooms",
      "3 bathrooms",
      "Elevated location",
      "Scenic views",
      "Air-conditioned",
      "Modern interiors"
    ],
    rooms: 3,
    guests: 10,
    bathrooms: 3,
    highlights: [
      "Scenic views",
      "Elevated location",
      "Air-conditioned",
      "Perfect for couples & families"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Viewpoint",
      "Hill trails",
      "Scenic spots",
      "Local attractions"
    ]
  },
  {
    id: "sunrisehome",
    title: "SUNRISE HOME",
    subtitle: "3BHK Brick House",
    route: "SunriseHome",
    image: "/sunrise home.webp",
    description: "Affordable 2BHK family homestay in Udupi, accommodating up to 6 guests with 3 bathrooms and cozy interiors.",
    longDescription: "Sunrise Home is an affordable family homestay in Udupi, Karnataka with 2 bedrooms and 3 bathrooms for guests who prefer a private, quiet setting. With comfortable rooms and practical amenities, it is ideal for travelers searching for a budget-friendly Udupi homestay near Manipal and local dining spots.",
    amenities: [
      "Fully furnished",
      "Complete kitchen",
      "Dining area",
      "Living room",
      "Ceiling fans",
      "Outdoor space",
      "Parking",
      "Basic amenities"
    ],
    features: [
      "2 bedrooms",
      "3 bathrooms",
      "Brick construction",
      "Modern design",
      "Spacious rooms",
      "Well-lit interiors"
    ],
    rooms: 2,
    guests: 6,
    bathrooms: 3,
    highlights: [
      "Budget-friendly",
      "Comfortable stay",
      "Peaceful location",
      "Ideal for small groups"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Manipal Lake",
      "Local eateries",
      "Shopping centers",
      "Peaceful environment"
    ]
  },
  {
    id: "chalet-labonne-vie",
    title: "CHALET LA BONNE VIE",
    subtitle: "2BHK Modern House",
    route: "ChaletLabonne",
    image: "/chaletlabonnevie.webp",
    description: "Unique 2BHK nature homestay near Udupi, accommodating up to 5 guests with 3 bathrooms, bird sanctuary and farm access.",
    longDescription: "Chalet La Bonne Vie is a distinctive homestay near Udupi featuring 2 bedrooms and 3 bathrooms for nature lovers who want a quieter, eco-inspired retreat. This modern home combines comfort with immersive outdoor experiences, making it an excellent choice for couples and small families seeking an offbeat Udupi homestay.",
    amenities: [
      "Modern furnishings",
      "Equipped kitchen",
      "Dining space",
      "Living area",
      "Bird sanctuary access",
      "Farm access",
      "Outdoor space",
      "Parking facility"
    ],
    features: [
      "2 bedrooms",
      "3 bathrooms",
      "Modern design",
      "Bird sanctuary",
      "Farm access",
      "Nature-focused"
    ],
    rooms: 2,
    guests: 5,
    bathrooms: 3,
    highlights: [
      "Unique bird sanctuary",
      "Farm experience",
      "Nature immersion",
      "Eco-friendly stay"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Bird sanctuary",
      "Farm areas",
      "Natural surroundings",
      "Peaceful villages"
    ]
  },
  {
    id: "viewpoint-oasis",
    title: "VIEWPOINT OASIS",
    subtitle: "Premium Retreat with Facilities",
    route: "ViewPoint",
    image: "/viewpoint.webp",
    description: "Premium Udupi homestay with stunning viewpoints, swimming pool, BBQ counter, and jacuzzi for group celebrations.",
    longDescription: "Viewpoint Oasis is a premium homestay in Udupi with standout features including scenic viewpoints, swimming pool, and dedicated BBQ counter for group gatherings. Perfect for celebrations and upscale weekend escapes, this property suits guests looking for the best homestay in Udupi with comfort, privacy, and modern amenities.",
    amenities: [
      "Scenic viewpoints",
      "Swimming pool",
      "BBQ counter",
      "Jacuzzi facility",
      "Fully furnished",
      "Kitchen facilities",
      "Dining area",
      "Parking & security"
    ],
    features: [
      "Premium amenities",
      "Viewpoint access",
      "Swimming pool",
      "BBQ counter",
      "Jacuzzi setup",
      "Modern facilities"
    ],
    rooms: 3,
    guests: 12,
    bathrooms: 2,
    highlights: [
      "Jacuzzi facility",
      "BBQ area",
      "Scenic views",
      "Premium amenities"
    ],
    location: "Near Udupi (7 km) & Manipal (15 km), Karnataka",
    nearbyAttractions: [
      "Viewpoint locations",
      "Dining spots",
      "Entertainment zones",
      "Social venues"
    ]
  }
];

export const getHomestayByRoute = (route: string) => {
  return homestays.find(h => h.route === route);
};

export const getHomestayById = (id: string) => {
  return homestays.find(h => h.id === id);
};
