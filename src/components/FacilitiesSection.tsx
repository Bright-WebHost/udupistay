'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Car, Wifi, Sparkles, Key, Home, Waves, Phone } from 'lucide-react';
import Link from 'next/link';

const facilities = [
  { title: 'Free Car Parking',    icon: Car,       filled: false },
  { title: 'Fast Wi-Fi Internet', icon: Wifi,      filled: true  },
  { title: 'Daily Housekeeping',  icon: Sparkles,  filled: false },
  { title: "Smart Key's",         icon: Key,       filled: true  },
  { title: 'Home Kitchen',        icon: Home,      filled: false },
  { title: 'Swimming Pool',       icon: Waves,     filled: true  },
];

const stats = [
  { value: 15,   suffix: '+', label: 'Premium Properties' },
  { value: 2500, suffix: '+', label: 'Happy Guests'       },
  { value: 8,    suffix: '+', label: 'Years Experience'   },
  { value: 98,   suffix: '%', label: 'Satisfaction Rate'  },
];

/* ── animated counter ── */
function useCounter(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [active, target, duration]);
  return count;
}

/* ── single stat row inside tag ── */
function StatRow({ stat, active, index, compact }: {
  stat: typeof stats[0]; active: boolean; index: number; compact?: boolean;
}) {
  const count = useCounter(stat.value, 1300 + index * 180, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ delay: 0.8 + index * 0.14, duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center relative"
      style={{ paddingTop: compact ? '8px' : '12px', paddingBottom: compact ? '8px' : '12px' }}
    >
      {index > 0 && (
        <div
          className="absolute top-0 left-3 right-3 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,216,74,0.25), transparent)' }}
        />
      )}
      {/* Number */}
      <div
        className="font-serif font-bold leading-none tabular-nums text-white"
        style={{
          fontSize: compact ? '1.25rem' : '1.65rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        {count.toLocaleString()}
        <span style={{ color: '#c8d84a', fontSize: compact ? '1rem' : '1.3rem' }}>
          {stat.suffix}
        </span>
      </div>
      {/* Label */}
      <div
        className="mt-0.5 text-center"
        style={{
          fontSize: compact ? '6px' : '7.5px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   3D PRICE TAG
   - On mobile (< lg): small tag, top-right corner, scale 0.72
   - On tablet (md–lg): medium, scale 0.88
   - On desktop (lg+): full size
═══════════════════════════════════════════════ */
export function PriceTag({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="price-tag-3d"
          className="absolute top-2 right-2 sm:top-0 sm:right-3 md:right-6 lg:right-8 xl:right-16 z-30"
          style={{ transformOrigin: 'top center' }}
          initial={{
            y: -140,
            rotateX: -90,
            rotateZ: -18,
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            y: 0,
            rotateX: 0,
            rotateZ: [null, 12, -7, 4, -2, 0],
            opacity: 1,
            scale: 1,
          }}
          exit={{
            y: -140,
            rotateX: -90,
            rotateZ: -18,
            opacity: 0,
            scale: 0.7,
            transition: { duration: 0.45, ease: 'easeIn' },
          }}
          transition={{
            y:       { type: 'spring', stiffness: 120, damping: 10, mass: 1.4 },
            rotateX: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            rotateZ: { duration: 1.4, ease: 'easeOut', times: [0, 0.25, 0.5, 0.7, 0.85, 1] },
            opacity: { duration: 0.3 },
            scale:   { type: 'spring', stiffness: 180, damping: 18 },
          }}
        >
          {/* Responsive scale wrapper:
              mobile  → 0.65×
              sm      → 0.80×
              md      → 0.90×
              lg+     → 1.00×
          */}
          <div
            className="origin-top"
            style={{
              /* CSS custom property trick for clean responsive scale */
              transform: 'scale(0.65)',
            }}
          >
            {/* Override with responsive Tailwind via style tag trick —
                we use a wrapper div with class-based approach instead */}
          </div>

          {/*
            We use an inline responsive scale via a wrapping div
            that applies different transform at different breakpoints
            using Tailwind's responsive prefix on the `style` prop workaround.
            Cleanest approach: a single div with CSS clamp / media via className.
          */}
          <div className="price-tag-scale-wrapper">
            <style>{`
              .price-tag-scale-wrapper {
                transform-origin: top center;
                transform: scale(0.75);
              }
              @media (min-width: 480px) {
                .price-tag-scale-wrapper { transform: scale(0.85); }
              }
              @media (min-width: 768px) {
                .price-tag-scale-wrapper { transform: scale(0.95); }
              }
              @media (min-width: 1024px) {
                .price-tag-scale-wrapper { transform: scale(1); }
              }
            `}</style>

            <div style={{ perspective: '600px', perspectiveOrigin: 'top center' }}>
              <motion.div
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateZ: [0, 1.5, 0, -1.5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
              >
                <div className="flex flex-col items-center" style={{ transformOrigin: 'top center' }}>

                  {/* ── Nail head ── */}
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 38% 35%, #e8e0c8, #b8a060 55%, #6b5a2a)',
                      boxShadow: '0 3px 8px rgba(0,0,0,0.55), inset 0 1px 2px rgba(255,255,255,0.3)',
                      zIndex: 10,
                      flexShrink: 0,
                    }}
                  />

                  {/* String nail → hole */}
                  <div
                    style={{
                      width: '1.5px',
                      height: '22px',
                      background: 'linear-gradient(to bottom, #b8965a, #c8a84a88)',
                      boxShadow: '0 0 3px rgba(184,150,90,0.4)',
                    }}
                  />

                  {/* ── Hole ring ── */}
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '2.5px solid #c8a84a',
                      background: 'radial-gradient(circle at 40% 35%, #e8e4d8, #fdfbf7)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2)',
                      flexShrink: 0,
                    }}
                  />

                  {/* String hole → body */}
                  <div
                    style={{
                      width: '1.5px',
                      height: '10px',
                      background: 'linear-gradient(to bottom, #c8a84a88, #c8a84a)',
                    }}
                  />

                  {/* ── TAG BODY ── */}
                  <div
                    className="relative"
                    style={{
                      width: '122px',
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 22px), 50% 100%, 0% calc(100% - 22px))',
                      background: 'linear-gradient(160deg, #2a3318 0%, #1e2810 40%, #253015 70%, #1a1e0c 100%)',
                      paddingBottom: '32px',
                      boxShadow: `
                        -6px 8px 24px rgba(0,0,0,0.55),
                         4px 4px 12px rgba(0,0,0,0.3),
                        inset 1px 0 0 rgba(255,255,255,0.06),
                        inset -1px 0 0 rgba(0,0,0,0.3)
                      `,
                    }}
                  >
                    {/* Grain texture */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        opacity: 0.06,
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        backgroundSize: '200px',
                      }}
                    />

                    {/* Left highlight edge */}
                    <div
                      className="absolute top-0 bottom-0 left-0 w-[2px]"
                      style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent 60%)' }}
                    />
                    {/* Right shadow edge */}
                    <div
                      className="absolute top-0 bottom-0 right-0 w-[2px]"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 60%)' }}
                    />
                    {/* Top gold border */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent, #849826, #c8d84a, #849826, transparent)' }}
                    />
                    {/* Dot grid watermark */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        opacity: 0.04,
                        backgroundImage: 'radial-gradient(circle, #c8d84a 1px, transparent 1px)',
                        backgroundSize: '14px 14px',
                      }}
                    />
                    {/* Brand watermark */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                      style={{ opacity: 0.06 }}
                    >
                      <span
                        style={{
                          fontSize: '7px',
                          letterSpacing: '0.4em',
                          textTransform: 'uppercase',
                          color: '#c8d84a',
                          fontWeight: 700,
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        UDUPI HOMESTAYS
                      </span>
                    </div>

                    {/* ── Stats content ── */}
                    <div className="relative z-10 px-3 pt-3">
                      {/* Eyebrow */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={active ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.75 }}
                        className="flex items-center gap-1.5 mb-1"
                      >
                        <div className="flex-1 h-px" style={{ background: 'rgba(200,216,74,0.3)' }} />
                        <span style={{
                          fontSize: '6px',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'rgba(200,216,74,0.55)',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}>
                          Our Numbers
                        </span>
                        <div className="flex-1 h-px" style={{ background: 'rgba(200,216,74,0.3)' }} />
                      </motion.div>

                      {stats.map((s, i) => (
                        <StatRow key={i} stat={s} active={active} index={i} />
                      ))}

                      {/* Est. footer */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={active ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1.5 }}
                        className="flex items-center gap-1.5 mt-1"
                      >
                        <div className="flex-1 h-px" style={{ background: 'rgba(200,216,74,0.2)' }} />
                        <span style={{
                          fontSize: '6px',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.2)',
                          fontWeight: 500,
                        }}>
                          Est. 2017
                        </span>
                        <div className="flex-1 h-px" style={{ background: 'rgba(200,216,74,0.2)' }} />
                      </motion.div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════ */
export default function FacilitiesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-20% 0px -20% 0px' });
  
  return (
    <section
      ref={sectionRef}
      className="relative bg-[#fdfbf7] py-8 md:py-20 lg:py-28 overflow-visible"
    >
      {/* PRICE TAG - positioned absolutely */}
      <PriceTag active={isInView} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center gap-8 md:gap-12">

          {/* LEFT – FACILITY GRID */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 order-2 lg:order-1"
          >
            {facilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center justify-center rounded-xl md:rounded-2xl p-3 sm:p-6 md:p-8 text-center transition-all duration-300 cursor-pointer
                    ${item.filled
                      ? 'bg-[#849826] text-white shadow-lg'
                      : 'border-2 border-[#d4c5a0] bg-white text-[#1f1f1f] hover:border-[#849826]'
                    }`}
                  style={{ minHeight: '120px' }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className={`mb-2 sm:mb-4 md:mb-3 ${item.filled ? 'text-white' : 'text-[#849826]'}`}
                  />
                  <p className={`text-xs sm:text-base font-medium leading-tight ${item.filled ? 'text-white' : 'text-[#1f1f1f]'}`}>
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT – CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center lg:pl-8 order-1 lg:order-2"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-2 md:mb-4 text-xs md:text-sm tracking-[0.25em] uppercase text-[#849826] font-medium"
            >
              Our Best Facilities
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4 md:mb-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-[0.02em] leading-tight text-[#1f1f1f]"
            >
              Our Facilities &amp; Amenities
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6 md:mb-10 text-[#5f5f5f] leading-relaxed text-sm sm:text-base md:text-lg"
            >
              Welcome to Udupi Homestays, your trusted platform for discovering and
              booking the best homestays in Udupi. Since our journey began, we've been
              committed to making travel easier, more comfortable, and affordable for
              everyone.
            </motion.p>

            {/* CTA ROW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 rounded-lg md:rounded-xl bg-white px-4 sm:px-6 py-3 sm:py-4 shadow-md border border-gray-100 cursor-pointer"
              >
                <div className="flex h-10 sm:h-14 w-10 sm:w-14 items-center justify-center rounded-full bg-[#849826] flex-shrink-0">
                  <Phone size={18} className="text-white sm:w-5 sm:h-5" />
                </div>
                <span className="font-medium text-[#1f1f1f] text-sm sm:text-lg">
                  +001 6520 698 00
                </span>
              </motion.div>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-lg md:rounded-xl bg-[#849826] px-6 sm:px-10 py-3 sm:py-4 font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-wide text-xs sm:text-base"
                >
                  Book Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
