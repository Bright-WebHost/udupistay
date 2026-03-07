"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

const allImages = [
  { id: 1, src: "/farmhouse/1.webp", title: "Farm House Entrance" },
  { id: 2, src: "/farmhouse/11.webp", title: "Aviary" },
  { id: 3, src: "/farmhouse/2.webp", title: "Bird Houses" },
  { id: 4, src: "/farmhouse/4.webp", title: "Sheep" },
  { id: 5, src: "/farmhouse/5.webp", title: "Poultry" },
  { id: 6, src: "/farmhouse/6.webp", title: "Ducks" },
  { id: 7, src: "/farmhouse/3.webp", title: "Gardens" },
  { id: 8, src: "/farmhouse/7.webp", title: "Tree Canopy" },
  { id: 9, src: "/farmhouse/9.webp", title: "Estate" },
];

export default function FarmHousePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % allImages.length);
  }, [selectedIndex]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + allImages.length) % allImages.length);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedIndex]);

  const selectedImage = selectedIndex !== null ? allImages[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <Image
          src="/farmhouse/1.webp"
          alt="The Farm House"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-3">
            Day Visit Experience · Udupi
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
            The Farm House
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-7 leading-relaxed">
            An escape into the countryside — farm animals, lush gardens, and authentic rural life near Udupi.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-7 py-3 bg-[#849826] hover:bg-[#6f811f] text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              Plan Your Visit
            </Link>
            <Link
              href="#gallery"
              className="px-7 py-3 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold rounded-full transition-all duration-300 border border-white/30 backdrop-blur-sm"
            >
              See Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#849826] text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">
                Near Chalet La Bonne Vie
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                A Countryside Sanctuary
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nestled in the serene landscapes of Udupi, our Farm House welcomes visitors for day
                trips filled with authentic rural experiences — from friendly farm animals and tropical
                gardens to scenic trails and fresh country air.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {[
                  { label: "Nature Trails", icon: "🌿" },
                  { label: "Farm Animals", icon: "🐑" },
                  { label: "Bird Aviary", icon: "🦜" },
                  { label: "Family Friendly", icon: "👨‍👩‍👧" },
                ].map(({ label, icon }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/farmhouse/11.webp"
                alt="Farm birds"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-10 md:py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Gallery
            </h2>
            <p className="text-gray-400 text-sm">Click any photo to view full size</p>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
            style={{ gridAutoRows: "220px" }}
          >
            {/* [0] Wide feature */}
            <div className="group relative overflow-hidden rounded-xl cursor-pointer col-span-2" onClick={() => openImage(0)}>
              <GalleryTile image={allImages[0]} sizes="(max-width: 768px) 100vw, 66vw" />
            </div>

            {/* [1] Tall — rows 1+2 */}
            <div className="group relative overflow-hidden rounded-xl cursor-pointer row-span-2" onClick={() => openImage(1)}>
              <GalleryTile image={allImages[1]} sizes="33vw" />
            </div>

            {/* [2] */}
            <div className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => openImage(2)}>
              <GalleryTile image={allImages[2]} sizes="33vw" />
            </div>

            {/* [3] */}
            <div className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => openImage(3)}>
              <GalleryTile image={allImages[3]} sizes="33vw" />
            </div>

            {/* [4] [5] [6] */}
            {allImages.slice(4, 7).map((image, i) => (
              <div key={image.id} className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => openImage(4 + i)}>
                <GalleryTile image={image} sizes="33vw" />
              </div>
            ))}

            {/* [7] Wide bottom */}
            <div className="group relative overflow-hidden rounded-xl cursor-pointer col-span-2" onClick={() => openImage(7)}>
              <GalleryTile image={allImages[7]} sizes="(max-width: 768px) 100vw, 66vw" />
            </div>

            {/* [8] */}
            <div className="group relative overflow-hidden rounded-xl cursor-pointer" onClick={() => openImage(8)}>
              <GalleryTile image={allImages[8]} sizes="33vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Info */}
      <section className="py-12 md:py-16 bg-[#2f3b12] text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">Plan Your Visit</h2>
          <p className="text-white/60 text-sm md:text-base mb-10 max-w-lg mx-auto">
            Located near Chalet La Bonne Vie, 7 km from Udupi city. Day visits with prior booking.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { label: "Location", detail: "Near Chalet La Bonne Vie\nUdupi, Karnataka", emoji: "📍" },
              { label: "Visit Hours", detail: "Day visits welcome\nBooking recommended", emoji: "🕐" },
              { label: "Capacity", detail: "Up to 50 guests\nAll ages welcome", emoji: "👥" },
            ].map(({ label, detail, emoji }) => (
              <div key={label} className="bg-white/5 rounded-xl px-5 py-5">
                <div className="text-2xl mb-2">{emoji}</div>
                <h3 className="font-semibold text-sm mb-1">{label}</h3>
                <p className="text-white/50 text-sm whitespace-pre-line">{detail}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#849826] hover:bg-[#6f811f] text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            Contact Us to Book
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={closeImage}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10" onClick={closeImage}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10" onClick={(e) => { e.stopPropagation(); goPrev(); }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10" onClick={(e) => { e.stopPropagation(); goNext(); }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            className="relative w-full max-w-4xl mx-12"
            style={{ aspectRatio: "4/3" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={selectedImage.src} alt={selectedImage.title} fill className="object-contain" sizes="100vw" />
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs">
            {selectedIndex + 1} / {allImages.length}
          </p>
        </div>
      )}
    </div>
  );
}

function GalleryTile({ image, sizes }: { image: { src: string; title: string }; sizes: string }) {
  return (
    <>
      <Image
        src={image.src}
        alt={image.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-9 h-9 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </div>
      </div>
    </>
  );
}