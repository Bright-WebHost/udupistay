"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { homestays } from "@/data/homestays";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Home Stays", href: "/homestays", hasDropdown: true },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const homestayMenuItems = [
  ...homestays.map((homestay) => ({
    id: homestay.id,
    title: homestay.title,
    href: `/${homestay.route.toLowerCase()}`,
  })),
  { id: "farmhouse", title: "FARM HOUSE", href: "/farmhouse" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  // Default to false so text is white on load (over hero)
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const parseRgb = (color: string) => {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
      if (!match) return null;
      return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
        a: match[4] !== undefined ? Number(match[4]) : 1,
      };
    };

    const isLightBackground = (element: Element) => {
      let current: Element | null = element;
      while (current && current !== document.body) {
        const bg = window.getComputedStyle(current).backgroundColor;
        const parsed = parseRgb(bg);
        if (parsed && parsed.a > 0.05) {
          const luminance = 0.2126 * parsed.r + 0.7152 * parsed.g + 0.0722 * parsed.b;
          return luminance >= 190;
        }
        current = current.parentElement;
      }
      return false;
    };

    const getHeroThreshold = () => {
      const firstSection = document.querySelector("main section") as HTMLElement | null;
      if (!firstSection) return 100;

      const heroHeight = firstSection.getBoundingClientRect().height;
      if (!heroHeight || Number.isNaN(heroHeight)) return 100;

      return Math.max(100, Math.min(heroHeight * 0.72, 460));
    };

    const handleScroll = () => {
      if (window.scrollY < getHeroThreshold()) {
        setIsOverWhite(false);
        return;
      }

      const navbar = document.querySelector('header');
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const navbarCenter = navbarRect.top + navbarRect.height / 2;

      // Check multiple points across the navbar
      const points = typeof window !== 'undefined' ? [
        window.innerWidth / 2,
        window.innerWidth * 0.3,
        window.innerWidth * 0.7
      ] : [];

      let lightCount = 0;
      
      points.forEach(x => {
        const stack = document.elementsFromPoint(x, navbarCenter);
        const contentElement = stack.find((el) => !navbar.contains(el));
        if (contentElement && isLightBackground(contentElement)) {
          lightCount++;
        }
      });

      // If majority of points detect a light background, switch text to dark
      setIsOverWhite(lightCount >= 2);
    };

    // On first load and route changes, enforce hero-aware color
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Also check after a short delay to catch any delayed renders
    const timer = setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <header className="fixed top-2 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-350 transition-all duration-500">
      <div className="flex items-center justify-between h-20 sm:h-16 md:h-13 lg:h-14 xl:h-16 2xl:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center h-full min-h-0 cursor-pointer shrink-0">
          <Image
            src={isOverWhite ? "/logo-black.png" : "/logo-white.png"}
            alt="Udupi Homestay Logo"
            width={180}
            height={80}
            priority
            className="h-14 sm:h-12 lg:h-10 xl:h-12 2xl:h-14 w-auto block transition-all duration-500"
          />
        </Link>

        {/* CENTER NAV - Desktop Only */}
        <nav
          className="hidden lg:flex items-center gap-4 xl:gap-8 2xl:gap-10 px-2 xl:px-6 2xl:px-8 h-full rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-500 bg-white/10 border border-white/15 min-h-0"
        >
          {navItems.map((item) => (
            item.hasDropdown ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm xl:text-base 2xl:text-lg font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                    isOverWhite ? "text-gray-900! hover:text-[#849826]!" : "text-white! hover:text-white/90!"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </Link>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50">
                    {homestayMenuItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-[#849826] hover:text-white transition-colors duration-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm xl:text-base 2xl:text-lg font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                  isOverWhite ? "text-gray-900! hover:text-[#849826]!" : "text-white! hover:text-white/90!"
                }`}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        {/* RIGHT ACTIONS - All screens */}
        <div className="flex items-center h-full min-h-0 gap-1 sm:gap-2 md:gap-3 lg:gap-3 xl:gap-4 2xl:gap-6 shrink-0">
          {/* Logos */}
          <Image
            src={isOverWhite ? "/udupi-logo.svg" : "/udupi-logo_white_text.svg"}
            alt="Udupi Logo"
            width={220}
            height={100}
            priority
            className="h-12 sm:h-11 md:h-10 lg:h-14 xl:h-16 2xl:h-20 w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
          />
          <Image
            src={isOverWhite ? "/karnatka-logo.png" : "/karnataka_logo_white_text.png"}
            alt="Karnataka Logo"
            width={220}
            height={100}
            priority
            className="h-12 sm:h-11 md:h-10 lg:h-14 xl:h-16 2xl:h-20 w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
          />

          {/* Phone - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 px-2 xl:px-4 h-full rounded-2xl backdrop-blur-xl transition-all duration-500 bg-white/10 border border-white/15 min-h-0">
            <div className="flex h-8 w-8 xl:h-10 xl:w-10 items-center justify-center rounded-full bg-[#849826]">
              <Phone size={16} className="text-white! xl:hidden" />
              <Phone size={18} className="text-white! hidden xl:block" />
            </div>
            <span className={`text-sm xl:text-base font-semibold whitespace-nowrap transition-colors duration-300 ${
              isOverWhite ? "text-gray-900!" : "text-white!"
            }`}>
              +91 89712 20576
            </span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center h-12 w-12 rounded-full backdrop-blur-xl transition-all duration-500 bg-white/10 border border-white/15"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className={isOverWhite ? "text-gray-900!" : "text-white!"} />
          ) : (
            <Menu size={24} className={isOverWhite ? "text-gray-900!" : "text-white!"} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-0 z-40 transition-opacity duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto bg-black/50 backdrop-blur-sm"
            : "opacity-0 pointer-events-none bg-black/0 backdrop-blur-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-screen w-full max-w-xs bg-[#849826] backdrop-blur-xl border-l border-white/15 z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex items-center justify-end p-4 border-b border-white/10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={24} className="text-white!" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            {/* Navigation Items */}
            <nav className="flex flex-col gap-2 mb-8">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-white! hover:bg-white/10 hover:text-white/90! transition-all duration-200 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileDropdownOpen(!mobileDropdownOpen);
                        }}
                        className="p-1"
                      >
                        <ChevronDown size={18} className={`transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </Link>
                    {mobileDropdownOpen && (
                      <div className="mt-1 ml-4 flex flex-col gap-1">
                        {homestayMenuItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="px-4 py-2.5 text-sm font-medium text-white/80! hover:text-white! hover:bg-white/10 transition-all duration-200 rounded-lg"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileDropdownOpen(false);
                            }}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-base font-semibold text-white! hover:bg-white/10 hover:text-white/90! transition-all duration-200 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-6"></div>

            {/* Phone */}
            <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 mb-6 border border-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#849826]">
                <Phone size={18} className="text-white!" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/60 font-medium">Contact</p>
                <span className="text-sm font-semibold text-white!">
                  +91 89712 20576
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
