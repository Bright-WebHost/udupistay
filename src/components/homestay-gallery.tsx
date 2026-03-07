"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  homestayId: string;
  homestayTitle: string;
  images: string[];
}

export default function HomestayGallery({
  homestayId,
  homestayTitle,
  images,
}: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  // Create masonry array - alternate between different sizes
  const getMasonryLayout = (index: number) => {
    const patterns = [
      { cols: "lg:col-span-2", rows: "lg:row-span-2", size: "large" }, // 2x2
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "small" }, // 1x1
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "small" }, // 1x1
      { cols: "lg:col-span-1", rows: "lg:row-span-2", size: "tall" }, // 1x2 tall
      { cols: "lg:col-span-2", rows: "lg:row-span-1", size: "wide" }, // 2x1 wide
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "small" },
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "small" },
      { cols: "lg:col-span-1", rows: "lg:row-span-1", size: "small" },
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="w-full bg-[#fbfaf7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f7a3f] mb-2">
            Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#161616] mb-4">
            {homestayTitle}
          </h2>
          <div className="h-1 w-16 mx-auto bg-gradient-to-r from-[#1f7a3f] to-transparent"></div>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[280px] lg:auto-rows-[300px]">
          {images.map((image, index) => {
            const layout = getMasonryLayout(index);
            return (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative overflow-hidden rounded-xl group bg-[#f0ede7] hover:shadow-2xl hover:shadow-[#1f7a3f]/20 transition-all duration-300 ${layout.cols} ${layout.rows} col-span-1 md:col-span-1`}
              >
                <Image
                  src={image}
                  alt={`${homestayTitle} - Gallery ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#161616]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* View Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#161616]/40 backdrop-blur-sm">
                  <div className="text-white text-center">
                    <svg
                      className="w-8 h-8 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                      />
                    </svg>
                    <p className="text-sm font-medium">View</p>
                  </div>
                </div>

                {/* Image Number Badge */}
                <div className="absolute top-3 right-3 bg-[#161616]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {index + 1}/{images.length}
                </div>
              </button>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#161616]/95 backdrop-blur-sm p-4 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={`${homestayTitle} - Full view`}
                fill
                className="object-contain"
                onLoadingComplete={() => setImageLoaded(true)}
              />

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors duration-300 backdrop-blur-sm z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Gallery Stats */}
        <div className="mt-12 text-center">
          <p className="text-[#1c1c1c]/70 text-sm">
            <span className="font-semibold text-[#1f7a3f]">{images.length}</span> high-quality photos of{" "}
            <span className="font-semibold text-[#161616]">{homestayTitle}</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
