"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getHomestayByRoute, homestays } from "@/data/homestays";
import ExploreSection from "@/components/Exploresection";
import CinematicGallery from "@/components/Cinematicgallery";

// ─── Exact route values from data/homestays.ts ────────────────────────────────
// id: "whitehouse"        route: "Whitehouse"
// id: "gardenvilla"       route: "GardenVilla"
// id: "cottagehouse"      route: "CottageHouse"
// id: "hilltopvilla"      route: "TopVilla"        ← NOTE: route ≠ id
// id: "sunrisehome"       route: "SunriseHome"
// id: "chalet-labonne-vie"route: "ChaletLabonne"   ← NOTE: id has hyphens
// id: "viewpoint-oasis"   route: "ViewPoint"       ← NOTE: id has hyphens
// ─────────────────────────────────────────────────────────────────────────────

// All image/video/meta maps use ROUTE (lowercased) as key — never id
const homestayVideos: Record<string, string> = {
  whitehouse:    "https://gu3khmwuvvy06mma.public.blob.vercel-storage.com/videos/white.mp4",
  gardenvilla:   "https://gu3khmwuvvy06mma.public.blob.vercel-storage.com/videos/garden.mp4",
  cottagehouse:  "https://gu3khmwuvvy06mma.public.blob.vercel-storage.com/videos/cottage.mp4",
  topvilla:      "https://gu3khmwuvvy06mma.public.blob.vercel-storage.com/videos/hilltop.mp4",
  sunrisehome:   "https://gu3khmwuvvy06mma.public.blob.vercel-storage.com/videos/sunrise.mp4",
  chaletlabonne: "https://gu3khmwuvvy06mma.public.blob.vercel-storage.com/videos/chalet.mp4",
};

const homestayImages: Record<string, string[]> = {
  whitehouse:    [
    "/whitehouse/new/1.webp", "/whitehouse/new/2.webp", "/whitehouse/new/3.webp",
    "/whitehouse/new/4.webp", "/whitehouse/new/5.webp", "/whitehouse/new/6.webp",
    "/whitehouse/new/8.webp", "/whitehouse/new/9.webp", "/whitehouse/new/10.webp",
    "/whitehouse/new/11.webp", "/whitehouse/new/12.webp", "/whitehouse/new/h1.webp",
    "/whitehouse/new/h2.webp", "/whitehouse/new/h3.webp", "/whitehouse/new/h4.webp",
    "/whitehouse/new/h5.webp",
  ],
  gardenvilla:   [
    "/gradernVilla/new/1.webp", "/gradernVilla/new/2.webp", "/gradernVilla/new/3.webp",
    "/gradernVilla/new/4.webp", "/gradernVilla/new/5.webp", "/gradernVilla/new/6.webp",
    "/gradernVilla/new/7.webp", "/gradernVilla/new/8.webp", "/gradernVilla/new/9.webp",
    "/gradernVilla/new/10.webp", "/gradernVilla/new/11.webp", "/gradernVilla/new/h1.webp",
    "/gradernVilla/new/h2.webp", "/gradernVilla/new/h3.webp", "/gradernVilla/new/h4.webp",
  ],
  cottagehouse:  [
    "/Cottage/new/1.webp", "/Cottage/new/2.webp", "/Cottage/new/3.webp",
    "/Cottage/new/4.webp", "/Cottage/new/5.webp", "/Cottage/new/6.webp",
    "/Cottage/new/7.webp", "/Cottage/new/9.webp", "/Cottage/new/10.webp",
    "/Cottage/new/11.webp", "/Cottage/new/h1.webp", "/Cottage/new/h2.webp",
    "/Cottage/new/h3.webp",
  ],
  topvilla:      [
    "/hilltop/new/1.webp", "/hilltop/new/2.webp", "/hilltop/new/3.webp",
    "/hilltop/new/4.webp", "/hilltop/new/5.webp", "/hilltop/new/6.webp",
    "/hilltop/new/7.webp", "/hilltop/new/8.webp", "/hilltop/new/h2.webp",
    "/hilltop/new/h5.webp",
  ],
  sunrisehome:   [
    "/sunrise/new/1.webp", "/sunrise/new/2.webp", "/sunrise/new/3.webp",
    "/sunrise/new/4.webp", "/sunrise/new/5.webp", "/sunrise/new/6.webp",
    "/sunrise/new/7.webp", "/sunrise/new/8.webp", "/sunrise/new/9.webp",
    "/sunrise/new/h1.webp", "/sunrise/new/h2.webp", "/sunrise/new/h3.webp",
  ],
  chaletlabonne: [
    '/chalet/new/1.webp', '/chalet/new/2.webp', '/chalet/new/3.webp',
    '/chalet/new/4.webp', '/chalet/new/5.webp', '/chalet/new/bedroom.webp',
    '/chalet/new/hall2.webp', '/chalet/new/kitchen2.webp', '/chalet/new/kitchen3.webp',
    '/chalet/new/scene2.webp', '/chalet/new/scene3.webp'
  ],
  viewpoint:     [
    "/view/new/1.webp", "/view/new/2.webp", "/view/new/3.webp",
    "/view/new/4.webp", "/view/new/5.webp", "/view/new/6.webp",
    "/view/new/7.webp", "/view/new/8.webp", "/view/new/9.webp",
    "/view/new/10.webp", "/view/new/_DSC3560.webp", "/view/new/_DSC3565.webp",
    "/view/new/_DSC3591.webp",
  ],
};

const homestayMeta: Record<string, { tags: string[] }> = {
  whitehouse:    { tags: ["Near Malpe Beach",  "Large Groups",    "Modern Amenities"] },
  gardenvilla:   { tags: ["Spacious Bedrooms", "Family-Friendly", "Fully Furnished"]  },
  cottagehouse:  { tags: ["Air-Conditioned",   "Fully Furnished", "Family-Friendly"]  },
  topvilla:      { tags: ["Hill View",         "Scenic Location", "Air-Conditioned"]  },
  sunrisehome:   { tags: ["Sunrise View",      "Cozy Interiors",  "Budget Friendly"]  },
  chaletlabonne: { tags: ["Bird Sanctuary",    "Farm Access",     "Nature Immersion"] },
  viewpoint:     { tags: ["Jacuzzi",           "BBQ Area",        "Scenic Views"]     },
};

// Lookup key: lowercase the route string, strip spaces
// "Whitehouse"    → "whitehouse"
// "GardenVilla"   → "gardenvilla"
// "CottageHouse"  → "cottagehouse"
// "TopVilla"      → "topvilla"
// "SunriseHome"   → "sunrisehome"
// "ChaletLabonne" → "chaletlabonne"
// "ViewPoint"     → "viewpoint"
const routeKey = (r: string) => r.toLowerCase().replace(/\s+/g, "");

export default function HomestayPage() {
  const params   = useParams();
  const route    = params.homestay as string;
  const homestay = getHomestayByRoute(route);

  if (!homestay) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fbfaf7] px-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-light text-[#161616] mb-4">Property Not Found</h1>
          <Link href="/homestays" className="text-[#1f7a3f] hover:text-[#155a2f]">← Back to Stays</Link>
        </div>
      </div>
    );
  }

  const rk        = routeKey(homestay.route);
  const images    = homestayImages[rk] || [];
  const heroImage = images[0] || "/last.avif";
  const isViewpoint = homestay.route === "ViewPoint";
  const video     = isViewpoint ? "https://gu3khmwuvvy06mma.public.blob.vercel-storage.com/videos/viewpoint.mp4" : homestayVideos[rk];

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            name: homestay.title,
            description: homestay.longDescription,
            image: `https://udupistay.com${homestay.image}`,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Udupi",
              addressRegion: "Karnataka",
              postalCode: "576101",
              addressCountry: "IN",
            },
            telephone: "+91 89712 20576",
            url: `https://udupistay.com/${homestay.route}`,
            numberOfBedrooms: homestay.rooms,
            numberOfBathroomsNumber: homestay.bathrooms,
            occupancy: { "@type": "QuantitativeValue", maxValue: homestay.guests },
            amenityFeature: homestay.amenities.map((a: string) => ({
              "@type": "LocationFeatureSpecification",
              name: a,
            })),
          }),
        }}
      />

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-black" style={{ height: "45vh", minHeight: "260px" }}>
        <div className="relative h-full w-full">
          {heroImage && (
            <>
              <Image src={heroImage} alt={homestay.title} fill className="object-cover" priority quality={95} />
              <div className="absolute inset-0 bg-black/20" />
            </>
          )}
          <Link
            href="/homestays"
            className="absolute top-4 left-4 md:top-8 md:left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded text-sm transition-all duration-300 flex items-center gap-2 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <div className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24 text-white z-30">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-px w-5 md:w-8 bg-white" />
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.02em] uppercase leading-tight drop-shadow-lg">
                {homestay.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═════════════════════════════════════════════════════ */}
      <section className="relative py-14 md:py-20 lg:py-24 bg-white overflow-hidden">
        <Image
          src="/Vector3.png" alt=""
          width={700} height={700} quality={90}
          className="absolute -right-16 -top-16 w-[400px] md:w-[600px] lg:w-[700px] pointer-events-none opacity-60 hidden md:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

            {/* Media */}
            {video && (
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] overflow-hidden shadow-2xl rounded-2xl aspect-[9/16]">
                  <video
                    className="w-full h-full object-cover block"
                    src={video}
                    poster={images[1] || images[0] || "/last.avif"}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
            )}

            {/* Text */}
            <div className={`${video ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col justify-center lg:pl-8`}>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-[#849826] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
                <p className="text-[10px] font-light uppercase tracking-[0.18em] text-[#849826]">{homestay.subtitle}</p>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.02em] text-[#161616] mb-5 leading-tight">
                Luxury Escape in the Heart of Udupi
              </h2>
              <p className="text-sm md:text-base lg:text-lg font-light text-[#1c1c1c]/70 leading-relaxed mb-6">
                {homestay.description} Perfectly positioned near Udupi&apos;s finest destinations,
                with spacious interiors, modern comforts, and a serene atmosphere — the ideal
                sanctuary to elevate your stay.
              </p>
              <div className="h-px bg-[#d4e8d4] mb-6" />

              {/* Amenities — pulled from data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {homestay.amenities.slice(0, 4).map((amenity) => (
                  <div key={amenity} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#849826] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-xs md:text-sm text-[#1c1c1c] font-light">{amenity}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-[#849826] text-white font-light rounded-lg hover:bg-[#6d7d20] transition-all duration-300 uppercase tracking-[0.1em] text-xs md:text-sm"
                >
                  About Us
                </Link>
                <a
                  href={`https://wa.me/918971220576?text=Hello,%20I%20would%20like%20to%20book%20${encodeURIComponent(homestay.title)}`}
                  className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-[#849826] text-white font-light rounded-lg hover:bg-[#6d7d20] transition-all duration-300 uppercase tracking-[0.1em] text-xs md:text-sm"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ EXPLORE SECTION ═══════════════════════════════════════════ */}
      <ExploreSection
        title={homestay.title}
        rooms={homestay.rooms}
        bathrooms={homestay.bathrooms}
        guests={homestay.guests}
      />

      {/* ══ CINEMATIC GALLERY ═════════════════════════════════════════ */}
      <CinematicGallery images={images} title={homestay.title} />

      {/* ══ OTHER HOMESTAYS ═══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#f8f8f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
              <p className="text-[10px] md:text-xs font-light uppercase tracking-[0.2em] text-[#849826]">Discover More</p>
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#161616] uppercase tracking-[0.02em]">
              Explore Other Stays
            </h2>
            <p className="mt-2 md:mt-3 text-[#1c1c1c]/50 font-light text-xs md:text-sm tracking-wide max-w-md md:max-w-xl mx-auto">
              Handpicked homestays across Udupi — each one unique, all unforgettable.
            </p>
          </div>

          <div className="grid grid-flow-col auto-cols-[84%] sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 snap-x snap-mandatory sm:snap-none scrollbar-hide">
            {homestays
              .filter((h) => h.route !== homestay.route)
              .slice(0, 3)
              .map((h) => {
                const hKey      = routeKey(h.route);
                const cardImage = homestayImages[hKey]?.[0] || "/last.avif";
                const hMeta     = homestayMeta[hKey];

                return (
                  <Link
                    key={h.id}
                    href={`/${h.route}`}
                    className="group block snap-start"
                  >
                    <div className="h-full bg-white overflow-hidden rounded-2xl border border-[#ebe5da] hover:border-[#849826]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500">

                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ height: "200px" }}>
                        <Image
                          src={cardImage}
                          alt={`${h.title} - Homestay in Udupi`}
                          fill
                          quality={90}
                          className="object-cover transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

                        {/* Stats bar */}
                        <div className="absolute bottom-0 left-0 right-0 bg-[#849826]/90 backdrop-blur-sm px-3 md:px-4 py-2 md:py-2.5 flex items-center justify-between text-white">
                          <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs">
                            <span className="flex items-center gap-1">
                              <svg className="w-2 h-2 opacity-80" viewBox="0 0 8 8" fill="currentColor"><polygon points="4,0 8,4 4,8 0,4" /></svg>
                              {h.rooms} Rooms
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-2 h-2 opacity-80" viewBox="0 0 8 8" fill="currentColor"><polygon points="4,0 8,4 4,8 0,4" /></svg>
                              {h.guests} Guests
                            </span>
                          </div>
                          <span className="text-[10px] md:text-xs opacity-80 tracking-wider uppercase">{h.bathrooms} Baths</span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-4 md:p-5">
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#849826] mb-1">{h.subtitle}</p>
                        <h3 className="text-base md:text-xl font-bold text-[#1a1a1a] mb-2 group-hover:text-[#849826] transition-colors uppercase tracking-wide leading-snug">
                          {h.title}
                        </h3>
                        <p className="text-xs md:text-sm font-light text-[#1c1c1c]/60 leading-relaxed line-clamp-2 mb-3 md:mb-4">
                          {h.description}
                        </p>

                        {/* Tags */}
                        {hMeta && (
                          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
                            {hMeta.tags.map((tag) => (
                              <span key={tag} className="text-[9px] md:text-[10px] uppercase tracking-wider text-[#6b7c1f] bg-[#849826]/[0.08] border border-[#849826]/25 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-semibold">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#ebe5da]">
                          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#849826] font-bold">Explore Estate</span>
                          <div className="flex items-center gap-2 text-[#849826] group-hover:gap-4 transition-all duration-300">
                            <div className="w-4 md:w-5 h-px bg-[#849826] group-hover:w-7 md:group-hover:w-8 transition-all duration-300" />
                            <span className="text-sm">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <Link
              href="/homestays"
              className="inline-flex items-center gap-2 md:gap-3 text-xs md:text-sm uppercase tracking-[0.2em] text-[#849826] font-semibold border border-[#849826] px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-[#849826] hover:text-white transition-all duration-300"
            >
              View All Homestays <span>→</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
