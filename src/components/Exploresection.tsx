"use client";

import { useRef, useState, useEffect } from "react";

interface ExploreProps {
  title: string;
  rooms: number;
  bathrooms: number;
  guests: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const polaroidMeta = [
  {
    key: "bedrooms",
    label: "Bedrooms",
    tilt: "-6deg",
    delay: 0,
    photoGradient: "linear-gradient(135deg, #f5f0e8 0%, #ede4d0 100%)",
    accent: "#849826",
    handwritten: "sweet dreams ✦",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 44, height: 44 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    key: "bathrooms",
    label: "Bathrooms",
    tilt: "4deg",
    delay: 200,
    photoGradient: "linear-gradient(135deg, #eef0e4 0%, #dfe5c8 100%)",
    accent: "#6b7a1e",
    handwritten: "so fresh ✦",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 44, height: 44 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    key: "guests",
    label: "Guests",
    tilt: "-3deg",
    delay: 400,
    photoGradient: "linear-gradient(135deg, #f7f2e6 0%, #ece3cc 100%)",
    accent: "#849826",
    handwritten: "bring everyone ✦",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 44, height: 44 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },

];

const floatingDots = [
  { top: "12%", left: "8%",  size: 3,   delay: "0s"   },
  { top: "28%", left: "22%", size: 2,   delay: "0.8s" },
  { top: "60%", left: "5%",  size: 2.5, delay: "1.4s" },
  { top: "80%", left: "18%", size: 1.5, delay: "0.3s" },
  { top: "10%", left: "75%", size: 3,   delay: "1.1s" },
  { top: "35%", left: "88%", size: 2,   delay: "0.5s" },
  { top: "65%", left: "92%", size: 2.5, delay: "1.8s" },
  { top: "85%", left: "78%", size: 1.5, delay: "0.7s" },
  { top: "50%", left: "50%", size: 2,   delay: "1.2s" },
  { top: "20%", left: "55%", size: 1.5, delay: "2s"   },
];

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1100, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

// ─── Single Polaroid ──────────────────────────────────────────────────────────

function PolaroidCard({
  meta,
  value,
  index,
  isVisible,
}: {
  meta: (typeof polaroidMeta)[0];
  value: number;
  index: number;
  isVisible: boolean;
}) {
  const [landed, setLanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const countTarget = meta.key === "price" ? Math.round(value / 1000) : value;
  const count = useCountUp(countTarget, 1100, landed);

  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => setLanded(true), meta.delay);
    return () => clearTimeout(t);
  }, [isVisible, meta.delay]);

  const displayValue = meta.key === "price" ? `₹${count}K` : `${count}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-block",
        opacity: landed ? 1 : 0,
        transform: hovered
          ? "rotate(0deg) scale(1.1) translateY(-8px)"
          : `rotate(${meta.tilt}) scale(1)`,
        transition: landed
          ? "transform 0.4s cubic-bezier(0.34,1.5,0.64,1), box-shadow 0.3s ease"
          : "none",
        animation: landed ? "polaroidDrop 0.75s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
        boxShadow: hovered
          ? "0 28px 60px rgba(100,90,50,0.25), 0 0 0 1px rgba(132,152,38,0.3)"
          : "0 10px 32px rgba(100,90,50,0.18), 0 4px 10px rgba(100,90,50,0.12)",
        cursor: "pointer",
        zIndex: hovered ? 10 : index + 1,
        ["--tilt" as string]: meta.tilt,
      }}
    >
      {/* Tape */}
      <div style={{
        position: "absolute",
        top: -13,
        left: "50%",
        transform: "translateX(-50%) rotate(-1.5deg)",
        width: "clamp(60px, 5.8vw, 94px)",
        height: "clamp(22px, 2.3vw, 36px)",
        background: "rgba(255,245,200,0.80)",
        borderRadius: 2,
        boxShadow: "0 1px 4px rgba(100,80,0,0.13)",
        zIndex: 2,
        backdropFilter: "blur(2px)",
      }} />

      {/* Frame */}
      <div style={{
        background: "#fffef9",
        padding: "10px 10px 42px 10px",
        width: "clamp(158px, 17vw, 286px)",
        borderRadius: 3,
        border: "1px solid rgba(132,152,38,0.18)",
      }}>
        {/* Photo area */}
        <div style={{
          background: meta.photoGradient,
          width: "100%",
          height: "clamp(140px, 13.6vw, 246px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          borderRadius: 1,
        }}>
          {/* Bright radial highlight behind content */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 45%, rgba(255,255,200,0.55) 0%, rgba(132,152,38,0.08) 55%, transparent 80%)",
            pointerEvents: "none",
          }} />

          {/* Subtle texture overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 30% 30%, rgba(132,152,38,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          {/* Decorative dots */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(1.5px 1.5px at 18% 28%, rgba(132,152,38,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 72% 62%, rgba(107,122,30,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 48% 82%, rgba(132,152,38,0.3) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 84% 18%, rgba(107,122,30,0.45) 0%, transparent 100%)`,
            pointerEvents: "none",
          }} />

          {/* Icon — larger, brighter, with glow */}
          <div style={{
            color: meta.accent,
            marginBottom: 8,
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${meta.accent}99) drop-shadow(0 2px 4px ${meta.accent}55)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {meta.icon}
          </div>

          {/* Number — larger, brighter with highlight */}
          <div style={{
            fontSize: "clamp(46px, 3.7vw, 74px)",
            fontWeight: 700,
            color: meta.accent,
            lineHeight: 1,
            letterSpacing: -1.5,
            fontFamily: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            textShadow: `0 0 18px ${meta.accent}cc, 0 2px 8px ${meta.accent}66, 0 0 2px #fff`,
            filter: "brightness(1.15)",
          }}>
            {displayValue}
          </div>

          {/* Corner dots */}
          {([{ top: 6, left: 6 }, { top: 6, right: 6 }, { bottom: 6, left: 6 }, { bottom: 6, right: 6 }] as React.CSSProperties[]).map((pos, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "rgba(132,152,38,0.35)",
              ...pos,
            }} />
          ))}
        </div>

        {/* Caption */}
        <div style={{ paddingTop: 10, textAlign: "center" }}>
          <div style={{
            fontSize: "clamp(10px, 0.95vw, 13px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5a5030",
            fontFamily: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            fontWeight: 600,
          }}>
            {meta.label}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ExploreSection({ title, rooms, bathrooms, guests }: ExploreProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const statValues: Record<string, number> = {
    bedrooms: rooms,
    bathrooms,
    guests,
  };

  return (
    <>
      <style jsx global>{`
        @keyframes polaroidDrop {
          0%   { opacity: 0; transform: translateY(-200px) rotate(calc(var(--tilt, 0deg) * 2.5)) scale(0.75); }
          55%  { opacity: 1; }
          80%  { transform: translateY(10px) rotate(var(--tilt, 0deg)) scale(1.04); }
          100% { opacity: 1; transform: translateY(0) rotate(var(--tilt, 0deg)) scale(1); }
        }

        @keyframes floatDot {
          0%, 100% { opacity: 0.18; transform: translateY(0px); }
          50%       { opacity: 0.55; transform: translateY(-4px); }
        }

        /*
         * MOBILE: Scale each polaroid down so all 4 fit in one visible row.
         * We use transform: scale() on a fixed-size wrapper so inline styles
         * on the card don't interfere — scale is purely visual.
         *
         * Card natural size: 158px wide × ~215px tall (with tape)
         * Scale 0.44 → ~70px wide. 4 × 70px + gaps ≈ 310px — fits any phone.
         * We set the wrapper to (158 * 0.44) = 70px wide and collapse height
         * with a negative margin so the section doesn't get too tall.
         */
        @media (max-width: 600px) {
          .polaroid-track {
            display: flex !important;
            flex-wrap: nowrap !important;
            align-items: flex-end !important;
            justify-content: center !important;
            gap: 0 !important;
            padding: 16px 0 20px !important;
          }
          .polaroid-track > div {
            margin-bottom: 0 !important;
            flex: 0 0 auto !important;
          }
          /* Mobile default: larger cards while keeping all four visible */
          .polaroid-scale-wrap {
            width: 86px !important;
            /* Height = natural card height (215px) * scale (0.54) ≈ 117px */
            height: 117px !important;
            display: flex !important;
            align-items: flex-end !important;
            justify-content: center !important;
            overflow: visible !important;
          }
          .polaroid-scale-inner {
            transform: scale(0.54) !important;
            transform-origin: bottom center !important;
            flex-shrink: 0 !important;
          }
        }
        @media (max-width: 380px) {
          .polaroid-scale-wrap {
            width: 80px !important;
            height: 109px !important;
          }
          .polaroid-scale-inner {
            transform: scale(0.51) !important;
          }
        }
        @media (max-width: 340px) {
          .polaroid-scale-wrap {
            width: 72px !important;
            height: 98px !important;
          }
          .polaroid-scale-inner {
            transform: scale(0.46) !important;
          }
        }
      `}</style>

      <div
        ref={sectionRef}
        style={{
          position: "relative",
          padding: "48px 24px 56px",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Floating accent dots */}
        {floatingDots.map((dot, i) => (
          <div key={i} style={{
            position: "absolute",
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: "#849826",
            boxShadow: "0 0 6px rgba(132,152,38,0.4)",
            animation: `floatDot ${2 + i * 0.25}s ease-in-out infinite`,
            animationDelay: dot.delay,
            pointerEvents: "none",
          }} />
        ))}

        {/* Top border accent */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, transparent, #c4b878, #849826, #a8b830, #849826, #c4b878, transparent)",
        }} />
        {/* Bottom border accent */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, transparent, #c4b878, #849826, #a8b830, #849826, #c4b878, transparent)",
        }} />

        {/* Soft glow orbs */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(132,152,38,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "-6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(132,152,38,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Subtle grain texture */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          opacity: 0.6,
        }} />

        <div style={{ maxWidth: 1460, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: 14,
            }}>
              <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, #849826)" }} />
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18, opacity: 0.85 }}>
                <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4L12 22l5.5-1.6C20.2 18.6 22 15.5 22 12c0-5.5-4.5-10-10-10z" stroke="#849826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2v20M7 7c1.5 2 5 3 5 3s3.5-1 5-3" stroke="#849826" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#849826",
                fontFamily: "ui-sans-serif, system-ui, sans-serif",
              }}>Explore</span>
              <svg viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18, opacity: 0.85 }}>
                <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4L12 22l5.5-1.6C20.2 18.6 22 15.5 22 12c0-5.5-4.5-10-10-10z" stroke="#849826" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2v20M7 7c1.5 2 5 3 5 3s3.5-1 5-3" stroke="#849826" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, #849826, transparent)" }} />
            </div>

            <h2 style={{
              fontSize: "clamp(22px,3.5vw,36px)",
              fontWeight: 600,
              color: "#3a2e1a",
              fontFamily: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
              letterSpacing: "0.01em",
              marginBottom: 0,
              textShadow: "0 2px 20px rgba(132,152,38,0.10)",
            }}>
              {title}
            </h2>
          </div>

          {/* Cards */}
          <div
            className="polaroid-track"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "24px 30px",
            }}
          >
            {polaroidMeta.map((meta, i) => (
              // On desktop: normal wrapper with staggered margin
              // On mobile: .polaroid-scale-wrap shrinks to 70px wide,
              //            .polaroid-scale-inner applies scale(0.44)
              <div key={meta.key} className="polaroid-scale-wrap" style={{ marginBottom: [0, 20, 8, 14][i] }}>
                <div className="polaroid-scale-inner">
                  <PolaroidCard meta={meta} value={statValues[meta.key]} index={i} isVisible={isVisible} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
