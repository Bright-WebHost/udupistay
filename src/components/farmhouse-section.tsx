"use client";

import Image from "next/image";
import Link from "next/link";

export default function FarmHouseSection() {
  return (
    <section className="relative w-full py-8 md:py-10 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <span className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase text-[#849826] mb-2">
            Day Visit Experience · Near Chalet La Bonne Vie
          </span>
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-gray-900">
            The Farm House
          </h2>
        </div>

        {/* Card with Image + Content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row">
            {/* Image - Top on mobile, Left on desktop */}
            <div className="md:w-2/5 lg:w-1/3 relative h-40 md:h-auto md:min-h-[240px]">
              <Image
                src="/farmhouse/1.webp"
                alt="The Farm House"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="md:w-3/5 lg:w-2/3 p-4 md:p-5 lg:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-900 mb-2">
                  A Living Farm Experience
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-3">
                  Interact with farm animals, explore organic gardens, and immerse yourself in authentic rural life. Perfect for families and nature enthusiasts seeking a countryside escape.
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-xs md:text-sm">
                    <span className="text-[#849826] font-bold">✓</span>
                    <span className="text-gray-700">Farm Animals</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm">
                    <span className="text-[#849826] font-bold">✓</span>
                    <span className="text-gray-700">Gardens</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm">
                    <span className="text-[#849826] font-bold">✓</span>
                    <span className="text-gray-700">Day Visits</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/farmhouse"
                className="inline-flex items-center gap-2 bg-[#849826] hover:bg-[#6f811f] text-white px-4 py-2 rounded text-xs md:text-sm font-semibold transition-colors w-fit"
              >
                Explore Farm House
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
