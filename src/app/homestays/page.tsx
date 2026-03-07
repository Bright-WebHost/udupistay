"use client";

import Image from "next/image";
import Link from "next/link";
import { homestays } from "@/data/homestays";
import { useEffect, useState } from "react";

export default function StaysPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const homestaysSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Udupi Homestays",
    itemListElement: homestays.map((stay, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "LodgingBusiness",
        name: stay.title,
        description: stay.description,
        url: `https://udupistay.com/${stay.route}`,
        image: `https://udupistay.com${stay.image}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Udupi",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
    })),
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15 }
    );
    
    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#2c2c2c] overflow-hidden font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homestaysSchema) }}
      />
      <style jsx global>{`
        /* Font classes are now set globally via Tailwind config */

        /* Royal ornate corners */
        .royal-corners {
          position: relative;
        }
        .royal-corners::before,
        .royal-corners::after {
          content: '';
          position: absolute;
          width: 50px;
          height: 50px;
          border: 2px solid #849826;
          transition: all 0.5s;
        }
        .royal-corners::before {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }
        .royal-corners::after {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }
        .royal-corners:hover::before,
        .royal-corners:hover::after {
          width: 70px;
          height: 70px;
          border-color: #b8ca40;
        }

        /* Diagonal accent line */
        .diagonal-accent {
          position: relative;
          overflow: hidden;
        }
        .diagonal-accent::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            135deg,
            transparent 48%,
            rgba(132, 152, 38, 0.15) 50%,
            transparent 52%
          );
          transform: translateX(-100%);
          transition: transform 0.6s;
        }
        .diagonal-accent:hover::before {
          transform: translateX(0);
        }

        /* Shine sweep */
        .shine-sweep {
          position: relative;
          overflow: hidden;
        }
        .shine-sweep::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 50%;
          height: 200%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transform: translateX(-200%) rotate(20deg);
          transition: transform 0.8s;
        }
        .shine-sweep:hover::after {
          transform: translateX(400%) rotate(20deg);
        }

        /* Gold badge pulse */
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(132, 152, 38, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 6px 30px rgba(132, 152, 38, 0.5); }
        }
        .gold-badge {
          animation: badge-pulse 3s ease-in-out infinite;
        }

        /* Stagger fade in */
        .fade-in-card {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fade-in-card.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.5s; }
        .delay-6 { transition-delay: 0.6s; }

        /* Decorative frame */
        .decorative-frame {
          position: relative;
          padding: 3px;
          background: linear-gradient(135deg, #849826 0%, #b8ca40 50%, #849826 100%);
        }
        .decorative-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(135deg, #849826, #b8ca40);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

      `}</style>

      {/* ═══════════════ HERO — SAME AS ABOUT PAGE ═══════════════ */}
      <section className="relative h-[36vh] sm:h-[42vh] md:h-[48vh] min-h-[260px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <Image
            src={homestays[0]?.image || "/stays-hero.jpg"}
            alt="Luxury Homestays"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-white/40" />
            <p className="text-xs tracking-[0.3em] uppercase font-light">Curated Collection</p>
            <div className="h-px w-10 bg-white/40" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">
            BEST HOMESTAYS IN UDUPI
          </h1>
          <p className="mx-auto max-w-3xl text-sm sm:text-base text-white/90 leading-relaxed">
            Explore family, AC, and budget-friendly homestays in Udupi near Malpe Beach, Udupi Krishna Temple, and Manipal University — with options for homemade food and catering support.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
            <span className="text-white/80">HOME</span>
            <span className="text-[#849826]">›</span>
            <span className="text-[#849826]">STAYS</span>
          </div>
        </div>
      </section>

      
      {/* ═══════════════ PROPERTIES — PREMIUM ROYAL CARDS ═══════════════ */}
      <section className="py-16 sm:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2c2c2c] mb-4 uppercase tracking-[0.04em]">
              Udupi Karnataka Homestay Collection
            </h2>
            <p className="mx-auto max-w-4xl text-gray-600 text-sm sm:text-base leading-relaxed">
              From homestays near Malpe Beach to stays near Sri Krishna Mutt and Manipal, this curated collection is designed for weekend getaways, family vacations, and group celebrations in coastal Karnataka.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {homestays.concat([
              {
                id: 'farmhouse',
                title: 'FARM HOUSE',
                subtitle: 'Day Visit Experience',
                route: 'farmhouse',
                image: '/farmhouse/1.webp',
                description: 'Experience authentic farm life with animals and organic gardens',
                longDescription: 'A countryside escape near Chalet La Bonne Vie',
                amenities: ['Farm Animals', 'Organic Gardens'],
                features: ['Day Visits'],
                rooms: 0,
                guests: 0,
                bathrooms: 0,
                highlights: ['Farm Animals'],
                location: 'Udupi',
                nearbyAttractions: ['Chalet'],
              } as typeof homestays[0],
            ]).map((stay, index) => (
              <Link 
                href={`/${stay.route}`} 
                key={stay.id}
                data-index={index}
                className={`fade-in-card delay-${Math.min(index % 3 + 1, 6)} ${visibleCards.has(index) ? 'visible' : ''}`}
              >
                <div className="royal-corners diagonal-accent shine-sweep group h-full bg-white border-2 border-[#e5dfd6] transition-all duration-500 hover:border-[#849826] hover:shadow-2xl hover:shadow-[#849826]/20 hover:-translate-y-3 cursor-pointer relative">
                  
                  {/* Image with overlay gradient */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={stay.image}
                      alt={stay.title}
                      fill
                      className="object-cover transition-transform duration-700"
                    />
                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Info bar at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#849826]/95 to-[#849826]/90 backdrop-blur-sm px-6 py-4">
                      <div className="flex items-center justify-between text-white text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white/70">◆</span>
                            <span className="font-semibold">{stay.rooms} Rooms</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-white/70">◆</span>
                            <span className="font-semibold">{stay.guests} Guests</span>
                          </div>
                        </div>
                        <div className="text-white/70 text-xs uppercase tracking-widest">
                          {stay.bathrooms} Baths
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-7 pb-8 relative bg-white">
                    {/* Category tag */}
                    <div className="inline-block mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#849826] border-b border-[#849826]/30 pb-1">
                        {stay.subtitle}
                      </p>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2c2c2c] mb-4 group-hover:text-[#849826] transition-colors leading-tight">
                      {stay.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-gray-600 text-base leading-relaxed mb-5 line-clamp-3">
                      {stay.description}
                    </p>

                    {/* Divider with center accent */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#849826]/30" />
                      <div className="w-1.5 h-1.5 bg-[#849826] rotate-45" />
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#849826]/30" />
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm uppercase tracking-[0.15em] text-[#849826] font-bold">
                        Explore Estate
                      </span>
                      <div className="flex items-center gap-2 text-[#849826] group-hover:gap-4 transition-all">
                        <div className="w-8 h-px bg-[#849826]" />
                        <span className="text-xl">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA — REGAL BANNER ═══════════════ */}
      <section className="relative py-24 overflow-hidden">
        {/* Rich dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1e0d] via-[#2c2c2c] to-[#1a1e0d]" />
        <div 
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        
        {/* Ornate corner frames */}
        <div className="absolute top-0 left-0 w-40 h-40 border-t-2 border-l-2 border-[#849826]/40" />
        <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-[#849826]/40" />
        <div className="absolute bottom-0 left-0 w-40 h-40 border-b-2 border-l-2 border-[#849826]/40" />
        <div className="absolute bottom-0 right-0 w-40 h-40 border-b-2 border-r-2 border-[#849826]/40" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#849826]" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#849826] rotate-45" />
              <span className="text-[#849826] text-xs tracking-[0.35em] uppercase font-bold">Begin Your Journey</span>
              <div className="w-2 h-2 bg-[#849826] rotate-45" />
            </div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#849826]" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Reserve Your <span className="text-[#849826] italic">Royal</span> Escape
          </h2>
          
          <p className="text-white/80 font-body text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Step into a world where every detail speaks of grandeur and every moment is crafted for your delight. 
            Your sanctuary awaits.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-[#849826] via-[#9db02d] to-[#849826] text-white font-display font-bold uppercase tracking-widest text-sm hover:from-[#9db02d] hover:via-[#849826] hover:to-[#9db02d] transition-all duration-500 shadow-2xl shadow-[#849826]/40 hover:shadow-[#849826]/60 hover:scale-105 group relative overflow-hidden"
          >
            <span className="relative z-10">Reserve Now</span>
            <span className="text-xl relative z-10 group-hover:translate-x-2 transition-transform">→</span>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Link>

          <div className="mt-8 flex items-center justify-center gap-4 text-white/60 text-sm">
            <div className="h-px w-12 bg-white/20" />
            <p className="uppercase tracking-widest font-semibold">
              or call <span className="text-[#849826]">+91 89712 20576</span>
            </p>
            <div className="h-px w-12 bg-white/20" />
          </div>
        </div>
      </section>
    </div>
  );
}
