'use client';

import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { useRef } from 'react';

export default function HospitalitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-5% 0px -5% 0px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-visible"
      style={{ backgroundColor: '#f8f7f4' }}
    >

      <div className="max-w-7xl mx-auto">
        {/* items-stretch makes both columns the same height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Left Side - Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            {/* On mobile a fixed aspect ratio; on lg+ it fills the column height */}
            <div className="relative w-full h-56 sm:h-72 lg:h-full min-h-0 rounded-xl overflow-hidden shadow-md">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/video/white.mp4" type="video/mp4" />
                <source src="/video/hilltop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Subtle gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center order-1 lg:order-2 lg:pl-6 xl:pl-12"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-3 md:mb-4"
              style={{ color: '#849826' }}
            >
              Exceptional Hospitality
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold uppercase tracking-[0.02em] leading-tight text-gray-900 mb-4 md:mb-6"
            >
              Experience Authentic Udupi Living
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8"
            >
              Strategically located near Malpe Beach, Krishna Temple, and Manipal University, our
              curated homestays offer modern amenities, authentic local cuisine, and professional
              hospitality for families and travelers.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative pt-4 md:pt-6"
            >
              {/* Decorative radial background */}
              <div
                className="absolute inset-0 rounded-xl opacity-25 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, #849826 0%, transparent 70%)',
                }}
              />

              <div className="relative flex flex-row items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl flex-wrap sm:flex-nowrap">
                {/* Know More */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide text-xs md:text-sm whitespace-nowrap flex-shrink-0"
                  style={{ backgroundColor: '#849826' }}
                >
                  Know More
                </motion.button>

                {/* View Videos */}
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                  <span className="text-gray-700 font-semibold uppercase tracking-wide text-xs md:text-sm whitespace-nowrap">
                    View Videos
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 relative flex-shrink-0"
                    style={{ backgroundColor: '#849826' }}
                  >
                    <Play className="w-4 md:w-5 h-4 md:h-5 text-white fill-white ml-0.5" />
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ backgroundColor: '#849826' }}
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}