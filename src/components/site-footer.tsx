"use client";

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#1a1a1a] text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('/footer-bg.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90" />
      
      <div className="relative">
        {/* Newsletter Section - Golden/Beige Background */}
        <div className="bg-[#849826] mx-auto max-w-[1400px] rounded-[20px] px-4 sm:px-6 md:px-12 py-6 md:py-10 -mb-12 md:-mb-16 mt-4 mx-4 sm:mx-6 xl:mx-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="text-center md:text-left w-full md:max-w-[500px]">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[42px] font-serif text-white leading-tight mb-2 md:mb-3">
                Get updates from Udupi Homestays
              </h2>
              <p className="text-white/90 text-[14px] md:text-[16px] font-light">
                Experience the perfect blend of comfort and culture with our signature homestays in Udupi.
              </p>
            </div>
            
            {/* WhatsApp CTA */}
            <div className="w-full md:w-auto md:min-w-[360px] flex justify-center md:justify-end">
              <a
                href="https://wa.me/918971220576"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#73801e] hover:bg-[#6a751b] text-white px-6 md:px-8 h-[50px] md:h-[55px] rounded-[8px] font-semibold uppercase tracking-wide transition-all duration-300 whitespace-nowrap text-sm md:text-base shadow-lg"
                aria-label="Chat on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.42 0 .04 5.38.04 12c0 2.11.55 4.17 1.6 6.01L0 24l6.2-1.6a11.96 11.96 0 005.84 1.49h.01c6.62 0 12-5.38 12-12 0-3.2-1.24-6.2-3.53-8.42zM12.05 21.1h-.01a9.96 9.96 0 01-5.08-1.39l-.36-.21-3.68.95.98-3.6-.23-.37A9.96 9.96 0 012.04 12c0-5.5 4.48-9.96 9.99-9.96a9.92 9.92 0 017.06 2.93A9.9 9.9 0 0122.01 12c0 5.5-4.46 9.1-9.96 9.1zm5.8-7.29c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.22-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.33-.54.11-.22.06-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.26-.62-.52-.54-.74-.55h-.64c-.22 0-.57.08-.87.41-.3.32-1.14 1.12-1.14 2.73s1.17 3.16 1.33 3.38c.16.22 2.3 3.5 5.56 4.9.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.3-.22-.62-.38z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 xl:px-12 pt-24 md:pt-32 pb-8 md:pb-12">
          <div className="grid gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-12 md:mb-16">

            {/* Important Links */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-[22px] md:text-[28px] font-serif text-white mb-1">Important Links</h3>
                <div className="w-16 h-[2px] bg-[#849826]"></div>
              </div>
              <div className="flex flex-col gap-3 text-gray-300 text-[14px] md:text-[15px]">
                <Link href="/" className="hover:text-[#849826] transition">
                  Home
                </Link>
                <Link href="/about" className="hover:text-[#849826] transition">
                  About Us
                </Link>
                <Link href="/homestays" className="hover:text-[#849826] transition">
                  Home Stays
                </Link>
                <Link href="/contact" className="hover:text-[#849826] transition">
                  Contact
                </Link>
              </div>
            </div>


            {/* Contact Us */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-[22px] md:text-[28px] font-serif text-white mb-1">Contact Us</h3>
                <div className="w-16 h-[2px] bg-[#849826]"></div>
              </div>
              <div className="flex flex-col gap-4 text-gray-300 text-[13px] md:text-[15px]">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p>H.No. 4-4-95, BhaghatSingh Marg, Udupi 576101</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:fahad@udupistay.com" className="hover:text-[#849826] transition">
                    fahad@udupistay.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:asif@udupistay.com" className="hover:text-[#849826] transition">
                    asif@udupistay.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href="https://wa.me/918971220576" className="hover:text-[#849826] transition">
                    +91 89712 20576
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a href="tel:+918050123132" className="hover:text-[#849826] transition">
                    +91 80501 23132
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              {/* Social Media Icons */}
              <div className="flex gap-3 md:gap-4 order-2 md:order-1">
                <a
                  href="https://www.instagram.com/udupihomestay__/"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#849826] flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/udupistay"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#849826] flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@udupistay"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#849826] flex items-center justify-center transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5 6.2a3.01 3.01 0 00-2.12-2.13C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.57A3.01 3.01 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3.01 3.01 0 002.12 2.13C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.57a3.01 3.01 0 002.12-2.13A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/918971220576"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#849826] flex items-center justify-center transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.42 0 .04 5.38.04 12c0 2.11.55 4.17 1.6 6.01L0 24l6.2-1.6a11.96 11.96 0 005.84 1.49h.01c6.62 0 12-5.38 12-12 0-3.2-1.24-6.2-3.53-8.42zM12.05 21.1h-.01a9.96 9.96 0 01-5.08-1.39l-.36-.21-3.68.95.98-3.6-.23-.37A9.96 9.96 0 012.04 12c0-5.5 4.48-9.96 9.99-9.96a9.92 9.92 0 017.06 2.93A9.9 9.9 0 0122.01 12c0 5.5-4.46 9.1-9.96 9.1zm5.8-7.29c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.22-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.33-.54.11-.22.06-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.26-.62-.52-.54-.74-.55h-.64c-.22 0-.57.08-.87.41-.3.32-1.14 1.12-1.14 2.73s1.17 3.16 1.33 3.38c.16.22 2.3 3.5 5.56 4.9.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.3-.22-.62-.38z" />
                  </svg>
                </a>
              </div>

              {/* Footer Links */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm text-gray-400 order-1 md:order-2">
                <Link href="/" className="hover:text-[#849826] transition">
                  Home
                </Link>
                <span>/</span>
                <Link href="/about" className="hover:text-[#849826] transition">
                  About
                </Link>
                <span>/</span>
                <Link href="/homestays" className="hover:text-[#849826] transition">
                  Home Stays
                </Link>
                <span>/</span>
                <Link href="/contact" className="hover:text-[#849826] transition">
                  Contact
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-gray-400 text-xs md:text-sm order-3 text-center md:text-left">
                Copyright 2025 <span className="text-white font-medium">UdupiStay</span> - Design By Bright Media
              </div>
            </div>
          </div>

          {/* Sticky WhatsApp Button */}
          <a
            href="https://wa.me/918971220576"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-22 right-5 sm:bottom-24 sm:right-8 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg transition-all duration-300 z-50"
            aria-label="Open WhatsApp chat"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.42 0 .04 5.38.04 12c0 2.11.55 4.17 1.6 6.01L0 24l6.2-1.6a11.96 11.96 0 005.84 1.49h.01c6.62 0 12-5.38 12-12 0-3.2-1.24-6.2-3.53-8.42zM12.05 21.1h-.01a9.96 9.96 0 01-5.08-1.39l-.36-.21-3.68.95.98-3.6-.23-.37A9.96 9.96 0 012.04 12c0-5.5 4.48-9.96 9.99-9.96a9.92 9.92 0 017.06 2.93A9.9 9.9 0 0122.01 12c0 5.5-4.46 9.1-9.96 9.1zm5.8-7.29c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.22-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.22-.32.33-.54.11-.22.06-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.26-.62-.52-.54-.74-.55h-.64c-.22 0-.57.08-.87.41-.3.32-1.14 1.12-1.14 2.73s1.17 3.16 1.33 3.38c.16.22 2.3 3.5 5.56 4.9.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.14-.3-.22-.62-.38z" />
            </svg>
          </a>

          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 w-12 h-12 rounded-full bg-[#849826] hover:bg-[#9B8B6B] text-white flex items-center justify-center shadow-lg transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}