"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useIsMobile } from "@/lib/useIsMobile";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const homestays = [
  { id: 1, name: "WHITE HOUSE", image: "whitehouse/new/1.webp", rooms: 6, guests: 35, route: "/Whitehouse" },
  { id: 2, name: "GARDEN VILLA", image: "gradernVilla/new/1.webp", rooms: 5, guests: 20, route: "/GardenVilla" },
  { id: 3, name: "COTTAGE HOUSE", image: "Cottage/new/1.webp", rooms: 3, guests: 15, route: "/CottageHouse" },
  { id: 4, name: "HILL TOP VILLA", image: "hilltop/new/1.webp", rooms: 4, guests: 25, route: "/TopVilla" },
  { id: 5, name: "SUNRISE HOME", image: "sunrise/new/1.webp", rooms: 4, guests: 18, route: "/SunriseHome" },
  { id: 6, name: "CHALET LA BONNE VIE", image: "chalet/new/1.webp", rooms: 5, guests: 20, route: "/ChaletLabonne" },
  { id: 7, name: "VIEWPOINT OASIS", image: "view/new/1.webp", rooms: 4, guests: 22, route: "/ViewPoint" },
];

export default function HomestaysHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(768);
  const [centerCardIndex, setCenterCardIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Get the track's total width and viewport width
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Calculate scroll distance: we want to scroll from showing the first card 
    // to showing the last card aligned with the right edge
    const scrollDistance = trackWidth - viewportWidth;

    if (scrollDistance <= 0) return;

    // Set initial position to 0 (start)
    gsap.set(track, { x: 0 });

    const tween = gsap.to(track, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance * 1.5}`, // Adjust multiplier to control scroll speed
        pin: true,
        scrub: isMobile ? 0.5 : 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const viewportCenter = window.innerWidth / 2;
          let closestIndex = 0;
          let minDistance = Infinity;

          const cards = Array.from(track.children) as HTMLElement[];

          cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          setCenterCardIndex(closestIndex);
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isMobile]);

  return (
    <div
      id="homestays-section"
      className="relative bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url(/view/new/2.webp)",
        backgroundColor: "#f8f7f4",
      }}
    >
      <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]" />

      <div
        ref={containerRef}
        className="relative w-full h-screen flex flex-col justify-center items-start overflow-hidden z-10"
      >
        <div className="relative z-20 text-center w-full px-6 mb-6">
          <h2 className="text-4xl md:text-6xl font-semibold uppercase tracking-[0.02em] text-white mb-3">
            Discover Our Homestays
          </h2>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/90">
            Curated Collection
          </p>
        </div>

        <div
          ref={trackRef}
          className="relative flex items-center gap-3 md:gap-6 px-4 md:px-16 z-20"
          style={{ willChange: "transform" }}
        >
          {homestays.map((homestay, index) => {
            const isCenter = index === centerCardIndex;

            return (
              <Link
                key={homestay.id}
                href={`/${homestay.route.toLowerCase()}`}
                className={`relative shrink-0 rounded-full border border-white/20 transition-all duration-500 overflow-hidden ${
                  isCenter
                    ? "shadow-[0_25px_80px_rgba(0,0,0,0.5)]"
                    : "shadow-[0_15px_50px_rgba(0,0,0,0.3)]"
                }`}
                style={{
                  width: isMobile ? "320px" : "550px",
                  opacity: isCenter ? 1 : 0.9,
                  borderRadius: '32px',
                }}
              >
                <div
                  className="relative overflow-hidden w-full"
                  style={{ height: isMobile ? "180px" : "280px" }}
                >
                  <img
                    src={`/${homestay.image}`}
                    alt={homestay.name}
                    className="h-full w-full object-cover transition-transform duration-500"
                    style={{
                      transform: isCenter ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                </div>

                <div className="p-5 md:p-6 bg-black/25 backdrop-blur-md">
                  <h3 className="font-bold text-white mb-4">
                    {homestay.name}
                  </h3>

                  <div className="flex gap-4 mb-5 text-white text-sm">
                    <span>{homestay.rooms} Rooms</span>
                    <span>Up to {homestay.guests}</span>
                  </div>

                  <div className="w-full py-3 px-6 font-bold text-white uppercase text-xs tracking-wider rounded-lg bg-[#849826] hover:bg-[#6d7d1f] transition text-center">
                    View Details
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
