'use client';

import { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/lib/useIsMobile';
import Image from 'next/image';

const homestays = [
  {
    id: 1,
    title: 'Chalet La Bonne Vie',
    description: 'Experience alpine charm and cozy comfort in our exclusive chalet',
    image: '/chalet/new/1.JPG',
    alt: 'Chalet',
  },
  {
    id: 2,
    title: 'Cottage House',
    description: 'A quaint and charming cottage retreat perfect for intimate getaways',
    image: '/Cottage/h1.webp',
    alt: 'Cottage',
  },
  {
    id: 3,
    title: 'Garden Villa',
    description: 'Luxurious villa surrounded by lush gardens and tranquil landscapes',
    image: '/gradernVilla/h1.webp',
    alt: 'Garden Villa',
  },
];

export default function HomestaysStickyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile(1024);

  useEffect(() => {
    // Skip scroll handling on mobile
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
      
      // Calculate scroll progress through the container
      const scrollStart = rect.top;
      const scrollHeight = rect.height - viewportHeight;
      
      // Progress from 0 to 1 as we scroll through the section
      const progress = Math.max(0, Math.min(1, -scrollStart / scrollHeight));
      
      // Calculate which card should be active
      const totalCards = homestays.length;
      const progressPerCard = 1 / totalCards;
      const currentIndex = Math.floor(progress / progressPerCard);
      const localProgress = (progress % progressPerCard) / progressPerCard;
      
      setActiveIndex(Math.min(currentIndex, totalCards - 1));
      setScrollProgress(localProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Mobile version - simple vertical cards
  if (isMobile) {
    return (
      <div className="relative w-full py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-[#849826] text-sm uppercase tracking-widest mb-3">Our Collection</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold uppercase tracking-[0.02em] text-gray-900">Discover Our Homestays</h2>
          </div>

          {/* Cards Grid */}
          <div className="space-y-8">
            {homestays.map((homestay, index) => (
              <div
                key={homestay.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src={homestay.image}
                    alt={homestay.alt}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Card Number Badge */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold uppercase tracking-[0.02em] text-gray-900 mb-3">
                    {homestay.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-4">
                    {homestay.description}
                  </p>
                  <button className="px-6 py-2.5 bg-[#849826] hover:bg-[#9B8B6B] text-white rounded-lg font-medium transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop version - sticky scroll
  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: `${homestays.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {homestays.map((homestay, index) => {
          const isActive = index === activeIndex;
          const isPrevious = index < activeIndex;
          const isNext = index === activeIndex + 1;
          
          // Calculate transforms
          let translateY = '100%';
          let scale = 0.85;
          let opacity = 0;
          let zIndex = index;
          
          if (isPrevious) {
            // Cards that have scrolled past
            translateY = '-100%';
            scale = 0.85;
            opacity = 0;
            zIndex = 0;
          } else if (isActive) {
            // Current active card
            translateY = `${-scrollProgress * 100}%`;
            scale = 1 - (scrollProgress * 0.15);
            opacity = 1;
            zIndex = 10;
          } else if (isNext) {
            // Next card coming up
            translateY = `${100 - (scrollProgress * 100)}%`;
            scale = 0.85 + (scrollProgress * 0.15);
            opacity = scrollProgress;
            zIndex = 9;
          } else {
            // Cards further down
            translateY = '100%';
            scale = 0.85;
            opacity = 0;
            zIndex = index;
          }
          
          return (
            <div
              key={homestay.id}
              className="absolute inset-0 transition-all duration-300 ease-out"
              style={{
                transform: `translateY(${translateY}) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              {/* Card Container with padding */}
              <div className="absolute inset-6 lg:inset-8 xl:inset-12">
                {/* Card with rounded corners and shadow */}
                <div 
                  className={`relative h-full w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group ${
                    isActive ? 'shadow-[0_0_40px_rgba(132,152,38,0.3)]' : ''
                  }`}
                >
                  {/* Background Image with zoom on hover */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={homestay.image}
                      alt={homestay.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="100vw"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 p-8 lg:p-12 xl:p-16 transition-all duration-500 ${
                      isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                  >
                    <h3 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-semibold uppercase tracking-[0.02em] text-white mb-4 leading-tight">
                      {homestay.title}
                    </h3>
                    <p className="text-lg lg:text-xl text-gray-200 max-w-2xl leading-relaxed">
                      {homestay.description}
                    </p>
                    
                    {/* View Details Button */}
                    <button className="mt-8 px-8 py-3 bg-[#849826] hover:bg-[#9B8B6B] text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                      View Details
                    </button>
                  </div>
                  
                  {/* Card Number Badge */}
                  <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
