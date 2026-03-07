'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const thumbnails = [
  { id: 1, image: '/view/new/2.webp', alt: 'Jacuzzi Area' },
  { id: 2, image: '/view/new/4.webp', alt: 'BBQ Area' },
  { id: 3, image: '/view/new/5.webp', alt: 'Rooftop View' },
  { id: 4, image: '/view/new/3.webp', alt: 'Garden Area' },
];

const mainImages = [
  { id: 1, image: '/view/new/2.webp', alt: 'Viewpoint Oasis Main 1' },
  { id: 2, image: '/view/new/4.webp', alt: 'Viewpoint Oasis Main 2' },
  { id: 3, image: '/view/new/3.webp', alt: 'Viewpoint Oasis Main 3' },
  { id: 4, image: '/view/new/5.webp', alt: 'Viewpoint Oasis Main 4' },
];

export default function ViewpointOasisSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainImages.length);
    }, 2500); // Change slide every 2.5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mainImages.length) % mainImages.length);
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-white py-6 md:py-12 lg:py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[280px] md:min-h-[340px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side - Content */}
        <div className="bg-gradient-to-br from-[#849826] to-[#6d7f1e] p-4 sm:p-5 md:p-8 lg:p-10 flex flex-col justify-between">
          {/* Top Content */}
          <div>
            {/* Label */}
            <div className="mb-1 sm:mb-2 md:mb-3">
              <span className="text-white/90 text-[9px] sm:text-xs md:text-xs font-semibold tracking-[0.2em] uppercase">
                EXCLUSIVE OUTDOOR RETREAT
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-white font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-[0.02em] leading-tight mb-2 sm:mb-3 md:mb-4">
              Viewpoint Oasis
            </h2>

            {/* Subtitle */}
            <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-light mb-2 md:mb-3">
              Jacuzzi, BBQ Area, Rooftop Viewpoint
            </p>

            {/* Description */}
            <div className="text-white/90 text-[11px] sm:text-xs md:text-sm lg:text-base font-light leading-relaxed max-w-xl space-y-2 md:space-y-2">
              <p>
                Viewpoint Oasis is an exclusive outdoor retreat for Udupi Homestay guests, 
                featuring a relaxing jacuzzi, a dedicated BBQ area, and a spacious garden 
                perfect for family gatherings and fun.
              </p>

            </div>
          </div>

          {/* Bottom Content - Thumbnails and Navigation */}
          <div className="mt-4 sm:mt-6 md:mt-8">
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
              {thumbnails.map((thumb, index) => (
                <button
                  key={thumb.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all cursor-pointer ${
                    currentSlide === index 
                      ? 'border-2 border-white' 
                      : 'border-2 border-white/30 hover:border-white'
                  }`}
                >
                  <Image
                    src={thumb.image}
                    alt={thumb.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center transition-all group flex-shrink-0"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-[#849826] group-hover:text-[#6d7f1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all border border-white/40 flex-shrink-0"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Large Image Slider */}
          <div className="relative min-h-[200px] sm:min-h-[280px] lg:min-h-[340px] bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="relative w-full h-full">
            {mainImages.map((img, index) => (
              <div
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={img.image}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#849826]/20" />
        </div>
      </div>
      </div>
    </section>
  );
}
