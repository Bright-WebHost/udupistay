"use client";

import Image from "next/image";
import Link from "next/link";

export default function FarmHouseSection() {
  return (
    <section className="relative w-full py-6 md:py-12 lg:py-14 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[280px] md:min-h-[340px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Side - Content */}
          <div className="bg-gradient-to-br from-[#849826] to-[#6d7f1e] p-4 sm:p-5 md:p-8 lg:p-10 flex flex-col justify-between">
            {/* Top Content */}
            <div>
              {/* Label */}
              <div className="mb-1 sm:mb-2 md:mb-3">
                <span className="text-white/90 text-[9px] sm:text-xs md:text-xs font-semibold tracking-[0.2em] uppercase">
                  DAY VISIT EXPERIENCE
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-white font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-[0.02em] leading-tight mb-2 sm:mb-3 md:mb-4">
                The Farm House
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg font-light mb-2 md:mb-3">
                Farm Animals, Organic Gardens, Countryside Experience
              </p>

              {/* Description */}
              <div className="text-white/90 text-[11px] sm:text-xs md:text-sm lg:text-base font-light leading-relaxed max-w-xl space-y-2 md:space-y-2">
                <p>
                  Interact with farm animals, explore organic gardens, and immerse yourself in authentic rural life. Perfect for families and nature enthusiasts seeking a countryside escape near Chalet La Bonne Vie.
                </p>
              </div>
            </div>

            {/* Bottom Content - Features */}
            <div className="mt-4 sm:mt-6 md:mt-8">
              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-4 md:mb-6">
                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                  <span className="text-white font-bold">✓</span>
                  <span className="text-white/90">Farm Animals</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                  <span className="text-white font-bold">✓</span>
                  <span className="text-white/90">Organic Gardens</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                  <span className="text-white font-bold">✓</span>
                  <span className="text-white/90">Day Visits</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/farmhouse"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#849826] px-4 md:px-5 py-2 md:py-2.5 rounded text-xs md:text-sm font-semibold transition-colors w-fit"
              >
                Explore Farm House
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side - Large Image */}
          <div className="relative min-h-[200px] sm:min-h-[280px] lg:min-h-[340px] bg-gradient-to-br from-gray-900 to-gray-800">
            <Image
              src="/farmhouse/1.webp"
              alt="The Farm House"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
