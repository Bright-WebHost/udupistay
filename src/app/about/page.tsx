"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Snowflake, 
  Wifi, 
  Lock, 
  Dumbbell, 
  UtensilsCrossed, 
  Waves,
  Heart,
  TreePine,
  Film,
  Briefcase,
  Baby,
  Users,
} from "lucide-react";

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState({ properties: 0, guests: 0, years: 0 });
  const [scrollY, setScrollY] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Counter animation function
  const animateCounter = (target: number, key: 'properties' | 'guests' | 'years', duration: number = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
    }, 16);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-animate');
          if (!id) return;

          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, id]));
            
            if (id === 'stats') {
              setCounters({ properties: 0, guests: 0, years: 0 });
              setTimeout(() => {
                animateCounter(15, 'properties', 2000);
                animateCounter(2500, 'guests', 2500);
                animateCounter(8, 'years', 1500);
              }, 200);
            }
          } else {
            setVisibleSections(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth infinite auto-scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const tick = () => {
      if (!isDraggingRef.current && el) {
        el.scrollLeft += 0.8;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft = 0;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - (carouselRef.current?.offsetLeft ?? 0);
    scrollLeftRef.current = carouselRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    carouselRef.current.scrollLeft = scrollLeftRef.current - (x - startXRef.current) * 1.5;
  };
  const onMouseUp = () => { isDraggingRef.current = false; };

  const cards = [
    { title: "Prime Location", desc: "Near cultural landmarks and pristine beaches", number: "01", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80" },
    { title: "Authentic Experience", desc: "Genuine Karnataka hospitality rooted in tradition", number: "02", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" },
    { title: "Modern Comfort", desc: "Contemporary amenities with traditional elegance", number: "03", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80" },
    { title: "Personal Service", desc: "Dedicated attention ensuring exceptional stays", number: "04", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80" },
    { title: "Culinary Excellence", desc: "Authentic local cuisine prepared with passion", number: "05", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" },
    { title: "Peaceful Retreats", desc: "Serene environments perfect for relaxation", number: "06", image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80" },
  ];

  const services = [
    { icon: <Snowflake className="w-6 h-6 md:w-7 md:h-7" />, label: "Air Condition" },
    { icon: <Wifi className="w-6 h-6 md:w-7 md:h-7" />, label: "Speed Internet" },
    { icon: <Lock className="w-6 h-6 md:w-7 md:h-7" />, label: "Smart Lock" },
    { icon: <Dumbbell className="w-6 h-6 md:w-7 md:h-7" />, label: "Gym Center" },
    { icon: <UtensilsCrossed className="w-6 h-6 md:w-7 md:h-7" />, label: "Breakfast" },
    { icon: <Waves className="w-6 h-6 md:w-7 md:h-7" />, label: "Swimming Pool" },
    { icon: <Heart className="w-6 h-6 md:w-7 md:h-7" />, label: "Health" },
    { icon: <TreePine className="w-6 h-6 md:w-7 md:h-7" />, label: "Outdoor" },
    { icon: <Film className="w-6 h-6 md:w-7 md:h-7" />, label: "Theatre" },
    { icon: <Users className="w-6 h-6 md:w-7 md:h-7" />, label: "Event Hall" },
    { icon: <Briefcase className="w-6 h-6 md:w-7 md:h-7" />, label: "Exec. Lounge" },
    { icon: <Baby className="w-6 h-6 md:w-7 md:h-7" />, label: "Kids Area" },
  ];

  return (
    <div className="bg-white text-[#2c2c2c] overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        :root { --gold: #849826; }

        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans  { font-family: 'Inter', sans-serif; }

        /* ── Universal Reveal ── */
        .fade-up {
          opacity: 0; transform: translateY(48px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .fade-up.visible { opacity: 1; transform: none; }

        .fade-left {
          opacity: 0; transform: translateX(-60px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .fade-left.visible { opacity: 1; transform: none; }

        .fade-right {
          opacity: 0; transform: translateX(60px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .fade-right.visible { opacity: 1; transform: none; }

        .scale-in {
          opacity: 0; transform: scale(0.92);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1),
                      transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .scale-in.visible { opacity: 1; transform: none; }

        /* ── Stagger ── */
        .stagger > * {
          opacity: 0; transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .stagger.visible > *:nth-child(1)  { transition-delay:0.05s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(2)  { transition-delay:0.15s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(3)  { transition-delay:0.25s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(4)  { transition-delay:0.35s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(5)  { transition-delay:0.45s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(6)  { transition-delay:0.55s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(7)  { transition-delay:0.65s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(8)  { transition-delay:0.75s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(9)  { transition-delay:0.85s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(10) { transition-delay:0.95s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(11) { transition-delay:1.05s; opacity:1; transform:none; }
        .stagger.visible > *:nth-child(12) { transition-delay:1.15s; opacity:1; transform:none; }

        /* ── Service icon hover ── */
        .svc-icon {
          transition: border-color 0.35s, transform 0.35s, color 0.35s,
                      box-shadow 0.35s;
        }
        .svc-icon:hover {
          border-color: #849826;
          transform: translateY(-6px) scale(1.12);
          color: #849826;
          box-shadow: 0 12px 28px rgba(132,152,38,0.22);
        }

        /* ── Service card hover (glass) ── */
        .svc-card {
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.5s, background 0.5s;
        }
        .svc-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(255,255,255,0.30);
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
        }
        .svc-card-arrow { transition: gap 0.35s; }
        .svc-card:hover .svc-card-arrow { gap: 1rem; }

        /* ── Shine on button ── */
        .shine-effect { position:relative; overflow:hidden; }
        .shine-effect::after {
          content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);
          transition:left 0.7s;
        }
        .shine-effect:hover::after { left:100%; }

        /* ── Award badge float ── */
        .award-badge { animation: badge-float 5s ease-in-out infinite; }
        @keyframes badge-float {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-10px); }
        }

        /* ── AOS Fade-Up + Zoom Reveal Animation ── */
        .image-reveal-container {
          overflow: hidden;
        }

        .image-reveal {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-right.visible .image-reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.3s;
        }

        /* Smooth hover effect */
        .image-reveal-container:hover .image-reveal {
          transform: translateY(0) scale(1.03);
        }

        /* ── Carousel ── */
        .carousel-track {
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .carousel-track::-webkit-scrollbar { display:none; }
        .carousel-track:active { cursor:grabbing; }

        /* Soft edge fade */
        .carousel-wrap { position:relative; }
        .carousel-wrap::before,
        .carousel-wrap::after {
          content:''; position:absolute; top:0; bottom:0; width:120px;
          pointer-events:none; z-index:2;
        }
        .carousel-wrap::before { left:0; background:linear-gradient(to right,#f8f8f8,transparent); }
        .carousel-wrap::after  { right:0; background:linear-gradient(to left,#f8f8f8,transparent); }

        /* Card */
        .c-card {
          flex-shrink:0;
          width: 300px;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.5s;
        }
        @media (min-width:640px)  { .c-card { width:340px; } }
        @media (min-width:1024px) { .c-card { width:360px; } }

        .c-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 32px 60px rgba(0,0,0,0.16);
        }
        .c-card .c-img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .c-card:hover .c-img { transform:scale(1.08); }

        /* ── Royal Promise ── */
        .royal-bg {
          background: linear-gradient(135deg,#fafaf7 0%,#f0f0e8 50%,#fafaf7 100%);
        }
        .corner-tl { position:absolute; top:24px; left:24px;  width:40px; height:40px; border-top:2px solid #849826; border-left:2px solid #849826; }
        .corner-tr { position:absolute; top:24px; right:24px; width:40px; height:40px; border-top:2px solid #849826; border-right:2px solid #849826; }
        .corner-bl { position:absolute; bottom:24px; left:24px;  width:40px; height:40px; border-bottom:2px solid #849826; border-left:2px solid #849826; }
        .corner-br { position:absolute; bottom:24px; right:24px; width:40px; height:40px; border-bottom:2px solid #849826; border-right:2px solid #849826; }

        .promise-card {
          border: 1px solid rgba(132,152,38,0.15);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.5s, border-color 0.4s;
        }
        .promise-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(132,152,38,0.12);
          border-color: rgba(132,152,38,0.4);
        }
        .promise-icon {
          transition: background 0.4s, color 0.4s, transform 0.4s;
        }
        .promise-card:hover .promise-icon {
          background: #849826;
          color: white;
          transform: scale(1.1);
        }

        /* Gold line separator */
        .gold-line {
          display: flex; align-items: center; gap: 12px;
        }
        .gold-line::before,
        .gold-line::after {
          content:''; flex:1; height:1px; background:#849826; opacity:0.4;
        }

        /* ── Center Spread Animation ── */
        .spread-cards > * {
          opacity: 0;
          transform: translate(0, 0) scale(0.8);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spread-cards > *:nth-child(1) { transform: translate(100%, 0) scale(0.8); }
        .spread-cards > *:nth-child(2) { transform: translate(0, 0) scale(0.8); }
        .spread-cards > *:nth-child(3) { transform: translate(-100%, 0) scale(0.8); }
        .spread-cards > *:nth-child(4) { transform: translate(100%, 0) scale(0.8); }
        .spread-cards > *:nth-child(5) { transform: translate(0, 0) scale(0.8); }
        .spread-cards > *:nth-child(6) { transform: translate(-100%, 0) scale(0.8); }

        .spread-cards.visible > *:nth-child(1) { opacity:1; transform:translate(0,0) scale(1); transition-delay:0.1s; }
        .spread-cards.visible > *:nth-child(2) { opacity:1; transform:translate(0,0) scale(1); transition-delay:0.2s; }
        .spread-cards.visible > *:nth-child(3) { opacity:1; transform:translate(0,0) scale(1); transition-delay:0.3s; }
        .spread-cards.visible > *:nth-child(4) { opacity:1; transform:translate(0,0) scale(1); transition-delay:0.4s; }
        .spread-cards.visible > *:nth-child(5) { opacity:1; transform:translate(0,0) scale(1); transition-delay:0.5s; }
        .spread-cards.visible > *:nth-child(6) { opacity:1; transform:translate(0,0) scale(1); transition-delay:0.6s; }

        /* ── WHO WE ARE: ensure top alignment ── */
        .who-grid {
          align-items: flex-start;
        }
      `}</style>

      {/* ═══════════════ HERO — REDUCED HEIGHT ═══════════════ */}
      {/* 
        CHANGES:
        - Mobile:  h-[36vh] min-h-[260px]  (was h-[60vh] min-h-[450px])
        - Tablet:  sm:h-[42vh]             (was sm:h-[70vh])
        - Desktop: md:h-[48vh]             (new cap)
        - Removed py padding inside hero so content fills height cleanly
      */}
      <section className="relative h-[36vh] sm:h-[42vh] md:h-[48vh] min-h-[260px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <img src="/about-hero.webp" alt="Udupi Homestays" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto fade-up visible">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-white/40" />
            <p className="text-xs tracking-[0.3em] uppercase font-light">About Us</p>
            <div className="h-px w-10 bg-white/40" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-tight">ABOUT US</h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
            <span className="text-white/80">HOME</span>
            <span className="text-[#849826]">›</span>
            <span className="text-[#849826]">ABOUT US</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHO WE ARE ═══════════════ */}
      {/*
        CHANGES:
        - Removed extra top/bottom padding: was py-16 sm:py-20 md:py-32, now py-12 sm:py-16 md:py-20
        - Added who-grid class so both columns align to the top (align-items: flex-start)
        - Removed mt-8 lg:mt-0 on right column — both columns now start at the same vertical position
        - Removed space-y-5 excessive gap replaced with tighter space-y-4
      */}
      <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
        {/* Parallax background pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, #849826 2px, transparent 2px)',
            backgroundSize: '50px 50px',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* who-grid ensures align-items: flex-start so both columns top-align */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 who-grid">

            {/* LEFT COLUMN */}
            <div data-animate="who-left" className={`space-y-4 fade-left ${visibleSections.has('who-left') ? 'visible' : ''}`}>
              <p className="text-[#849826] text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">Who We Are?</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                DISCOVER THE BEST PREMIUM<br />
                <span className="text-[#849826]">HOMESTAYS IN UDUPI, KARNATAKA</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Welcome to Udupi Homestay, your gateway to authentic Karnataka hospitality. We specialize in curating exceptional holiday experiences near Malpe Beach, Sri Krishna Temple, and Manipal University. With over 8 years of dedicated service, we've welcomed 2,500+ guests to our carefully selected premium properties.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our collection features 15 handpicked homestays ranging from cozy family stays to luxury 7-bedroom villas, each designed to provide comfort, warmth, and unforgettable memories for families, groups, and couples seeking authentic local experiences.
              </p>
              <div className="pt-1">
                <p className="text-xs text-gray-700 mb-1 font-medium">Located in:</p>
                <p className="text-gray-600 text-sm">Udupi, Karnataka, India • Near Malpe Beach & Sri Krishna Temple</p>
              </div>

              {/* Stats (mobile only) */}
              <div data-animate="stats" className={`grid grid-cols-3 gap-6 pt-4 stagger sm:hidden ${visibleSections.has('stats') ? 'visible' : ''}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl sm:text-5xl font-bold font-serif text-[#849826] mb-1">
                    {counters.properties}+
                  </div>
                  <p className="text-[#2c2c2c] font-semibold text-xs sm:text-sm">Premium Properties</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl sm:text-5xl font-bold font-serif text-[#849826] mb-1">
                    {counters.guests}+
                  </div>
                  <p className="text-[#2c2c2c] font-semibold text-xs sm:text-sm">Happy Guests</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl sm:text-5xl font-bold font-serif text-[#849826] mb-1">
                    {counters.years}+
                  </div>
                  <p className="text-[#2c2c2c] font-semibold text-xs sm:text-sm">Years Experience</p>
                </div>
              </div>

              <button className="mt-2 bg-[#849826] text-white px-8 py-3.5 hover:bg-[#6d7d20] transition-all duration-300 uppercase text-xs tracking-widest font-medium shine-effect">
                LEARN MORE
              </button>
            </div>

            {/* RIGHT COLUMN — no top margin so it aligns with left column top */}
            <div data-animate="who-right" className={`relative fade-right ${visibleSections.has('who-right') ? 'visible' : ''}`}>
              <div className="relative group">
                {/* Main image */}
                <div className="image-reveal-container">
                  <img 
                    src="/about-story.webp" 
                    alt="Luxury Homestay" 
                    className="w-full h-[380px] sm:h-[440px] md:h-[480px] object-cover shadow-2xl image-reveal" 
                  />
                </div>

                {/* Award badge */}
                <div 
                  className="absolute -top-5 -left-5 sm:-left-10 award-badge z-30"
                  style={{
                    transform: `translateY(${scrollY * 0.05}px)`,
                  }}
                >
                  <div className="bg-[#2c2c2c] text-white rounded-full w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center shadow-xl border-4 border-white transition-all duration-300 hover:border-[#849826] hover:scale-110">
                    <div className="text-[#849826] text-2xl sm:text-3xl mb-1">★</div>
                    <p className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-wide text-center leading-tight">Award<br/>Winning<br/>Hotel</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES & FACILITIES ═══════════════ */}
      <section className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover z-0" src="/video/HillTop.mp4" autoPlay loop muted playsInline />
        <div
          className="absolute inset-0 z-[5] bg-cover bg-center"
          style={{ backgroundImage: "url('/about-story.webp')" }}
        />
        <div className="absolute inset-0 bg-black/72 z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">

          {/* Header */}
          <div data-animate="svc-header" className={`text-center mb-14 fade-up ${visibleSections.has('svc-header') ? 'visible' : ''}`}>
            <p className="text-[#849826] text-xs tracking-[0.3em] uppercase mb-3 font-light">Our Amenities & Services</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              PREMIUM FACILITIES FOR YOUR <span className="text-[#849826] italic">COMFORT</span>
            </h2>
          </div>

          {/* Service Cards — 4 cards in mobile (2x2), 3 cards in desktop */}
          <div data-animate="svc-cards" className={`grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-14 stagger ${visibleSections.has('svc-cards') ? 'visible' : ''}`}>
            {[
              { title:"SECURE STAYS",  desc:"Advanced security systems and 24/7 monitoring for guest safety.", mobile: true },
              { title:"SPACIOUS HOMES", desc:"From cozy 2BHK to luxurious 7BHK villas with modern design.", mobile: true },
              { title:"WiFi & AC", desc:"High-speed internet and climate control in all rooms.", mobile: true },
              { title:"HOMEMADE MEALS", desc:"Authentic Karnataka cuisine with customizable catering options.", mobile: true },
            ].map((s,i)=>(
              <div 
                key={i} 
                className={`svc-card bg-[#849826]/25 backdrop-blur-2xl border border-[#849826]/40 rounded-2xl text-white px-6 sm:px-8 py-8 sm:py-10 text-center group ${
                  i === 3 ? 'md:hidden' : ''
                }`}
              >
                <h3 className="font-serif text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 uppercase tracking-wider">{s.title}</h3>
                <p className="text-white/90 text-[11px] sm:text-xs md:text-sm leading-relaxed mb-5 sm:mb-7">{s.desc}</p>
                <div className="svc-card-arrow text-white text-[11px] sm:text-xs md:text-sm flex items-center gap-2 justify-center">
                  Read More <span className="text-sm sm:text-base">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Icon Grid - 3 columns on mobile, 4 on tablet, 6 on desktop with circular thick borders */}
          <div data-animate="svc-icons" className={`grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5 stagger ${visibleSections.has('svc-icons') ? 'visible' : ''}`}>
            {services.map((s,i)=>(
              <div key={i} className="text-center cursor-pointer">
                <div className="svc-icon w-13 h-13 sm:w-15 sm:h-15 md:w-16 md:h-16 mx-auto rounded-full border-[3px] border-[#849826]/50 flex items-center justify-center mb-2 text-white/75"
                  style={{width:'52px',height:'52px'}}>
                  {s.icon}
                </div>
                <p className="text-[10px] sm:text-xs text-white/65 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT MAKES US SPECIAL ═══════════════ */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#f8f8f8] relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #849826 2px, transparent 2px)',
            backgroundSize: '60px 60px',
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div data-animate="why-header" className={`text-center fade-up ${visibleSections.has('why-header') ? 'visible' : ''}`}>
            <p className="text-[#849826] text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 font-medium">Why Choose Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold">WHAT MAKES US SPECIAL</h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div data-animate="why-cards" className={`grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 spread-cards ${visibleSections.has('why-cards') ? 'visible' : ''}`}>
            {cards.map((card, i) => (
              <div 
                key={i}
                className="group relative bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 border border-[#849826]/10 hover:border-[#849826]/30"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-48 sm:h-56 lg:h-72 overflow-hidden">
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-[#849826] flex items-center justify-center shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_30px_rgba(132,152,38,0.6)]">
                    <span className="font-serif text-sm sm:text-lg lg:text-2xl font-bold text-white">{card.number}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 lg:bottom-6 lg:left-6 lg:right-6">
                    <h3 className="font-serif text-lg sm:text-xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 transform transition-all duration-500 group-hover:translate-x-2 line-clamp-2">
                      {card.title}
                    </h3>
                    <div className="h-0.5 lg:h-1 w-12 sm:w-14 lg:w-16 bg-[#849826] transition-all duration-500 group-hover:w-16 sm:group-hover:w-20 lg:group-hover:w-24" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-white">
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed transition-colors duration-300 group-hover:text-gray-800 line-clamp-3">
                    {card.desc}
                  </p>
                  <div className="mt-2 sm:mt-3 lg:mt-4 flex items-center gap-1 sm:gap-2 text-[#849826] font-semibold text-xs sm:text-sm transition-all duration-300 group-hover:gap-2 sm:group-hover:gap-3 lg:group-hover:gap-4">
                    <span>Discover More</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border-t-2 border-l-2 border-[#849826]/0 group-hover:border-[#849826]/40 transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border-b-2 border-r-2 border-[#849826]/0 group-hover:border-[#849826]/40 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div data-animate="why-stats" className={`grid grid-cols-1 sm:grid-cols-3 gap-6 text-center stagger ${visibleSections.has('why-stats') ? 'visible' : ''}`}>
            {[["4.9/5","Guest Rating"],["98%","Guest Satisfaction"],["24/7","Support Available"]].map(([val,label],i)=>(
              <div key={i} className="bg-white p-6 sm:p-8 shadow-md rounded-xl">
                <div className="text-[#849826] text-3xl sm:text-4xl font-serif font-bold mb-2">{val}</div>
                <p className="text-gray-600 text-xs sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR PROMISE ═══════════════ */}
      <section className="py-16 sm:py-20 md:py-28 royal-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'radial-gradient(circle,#849826 1px,transparent 1px)',backgroundSize:'32px 32px'}} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-animate="promise-header" className={`text-center mb-12 fade-up ${visibleSections.has('promise-header') ? 'visible' : ''}`}>
            <div className="gold-line text-[#849826] text-xs tracking-[0.35em] uppercase mb-4">
              <span>Our Promise</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4">
              Creating Memories That<br/>
              <span className="text-[#849826] italic">Last Forever</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Every detail crafted with warmth, respect, and genuine care — because hospitality is deeply personal.
            </p>
          </div>

          <div data-animate="promise-cards" className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 stagger ${visibleSections.has('promise-cards') ? 'visible' : ''}`}>
            {[
              {
                icon:<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
                title:"Feel at Home",
                desc:"A warm sanctuary where you can truly relax and be yourself."
              },
              {
                icon:<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                title:"Personal Attention",
                desc:"Dedicated care ensuring every guest feels genuinely valued."
              },
              {
                icon:<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
                title:"Authentic Experience",
                desc:"Immerse in Karnataka culture and genuine heartfelt hospitality."
              }
            ].map((item,i)=>(
              <div key={i} className="promise-card bg-white rounded-2xl p-8 text-center group">
                <div className="promise-icon inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#849826]/10 text-[#849826] mb-5">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-[#2c2c2c]">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div data-animate="promise-quote" className={`relative bg-white border border-[#849826]/20 rounded-2xl px-8 sm:px-14 py-10 text-center max-w-3xl mx-auto shadow-lg scale-in ${visibleSections.has('promise-quote') ? 'visible' : ''}`}>
            <div className="corner-tl"/><div className="corner-tr"/>
            <div className="corner-bl"/><div className="corner-br"/>
            <svg className="w-10 h-10 text-[#849826] mx-auto mb-5 opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2c2c2c] leading-relaxed italic font-light mb-6">
              "Where strangers become friends, and guests become family."
            </blockquote>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-px bg-[#849826]"/>
              <div className="w-2 h-2 bg-[#849826] rotate-45"/>
              <div className="w-14 h-px bg-[#849826]"/>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#849826] font-semibold">Udupi Homestays</p>
          </div>
        </div>
      </section>
    </div>
  );
}
