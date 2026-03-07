"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const mapLocations = [
  {
    title: "WHITE HOUSE",
    subtitle: "Luxury Coastal Retreat",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2957.2571521159443!2d74.7420341!3d13.328624900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbb3933f8ba97%3A0x2012b1a29485f75b!2sUDUPI%20HOMESTAY%2F%20WHITE%20HOUSE!5e1!3m2!1sen!2sin!4v1734434136143!5m2!1sen!2sin",
  },
  {
    title: "GARDEN VILLA",
    subtitle: "Private Garden Estate",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.5378619072985!2d74.7204502!3d13.387320100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbd3e8311f751%3A0x942541c0bcbf48cf!2sUDUPI%20HOMESTAY%2FGARDEN%20VILLA!5e1!3m2!1sen!2sin!4v1734434243526!5m2!1sen!2sin",
  },
  {
    title: "OTHER HOME STAYS",
    subtitle: "Curated Homestay Cluster",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2957.7638565545876!2d74.7876347!3d13.2871242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca5008f8b9ac9%3A0xbd5f9d1a1688b130!2sUDUPI%20HOMESTAY%2F%20SUNRISE%20HOME!5e1!3m2!1sen!2sin!4v1734434319721!5m2!1sen!2sin",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#1c1c1c]">
      <section
        className="relative w-full overflow-hidden bg-[#849826]"
        style={{ height: "44vh", minHeight: "300px" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/about-hero.webp"
            alt="Contact Udupi Homestays"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/75" />
        </div>

        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded text-sm transition-all duration-300 flex items-center gap-2 group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>

        <div className="relative z-10 h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl text-white">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-white/70" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-white/90">
                Premium Concierge
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-[0.02em] leading-tight">
              Contact Us
            </h1>
            <p className="mt-3 text-sm md:text-base text-white/80 max-w-2xl">
              Tell us your travel dates, guest count, and stay style. We curate
              the most suitable luxury homestay for your trip.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 lg:py-24 bg-[#f7f5ef] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
          <div className="absolute -top-20 -right-12 w-72 h-72 rounded-full bg-[#849826]" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[#849826]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#849826]">
                Royal Service Desk
              </p>
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.02em] text-[#161616] leading-tight">
              Plan Your Stay With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-7 rounded-3xl p-[1px] bg-gradient-to-br from-[#849826]/60 via-[#d9dfb8] to-[#849826]/20 shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
              <div className="rounded-3xl bg-[#849826] p-6 md:p-8 text-white">
                {submitted ? (
                  <div className="min-h-[360px] flex flex-col justify-center text-white">
                    <div className="w-12 h-12 rounded-full border border-[#849826] text-[#849826] flex items-center justify-center mb-4 bg-[#849826]/10">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold uppercase tracking-[0.03em]">
                      Inquiry Received
                    </h3>
                    <p className="mt-2 text-sm text-white/75 max-w-md leading-relaxed">
                      Thank you for reaching out. Our concierge team will contact
                      you shortly on WhatsApp or email with tailored options.
                    </p>
                    <button
                      className="mt-6 w-fit inline-flex items-center justify-center px-6 py-3 bg-[#849826] text-white rounded-lg uppercase tracking-[0.12em] text-xs font-semibold hover:bg-[#6d7d20] transition-colors"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    {/* Heading removed as requested */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.22em] text-white mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          className="w-full bg-white/10 border border-white/15 focus:border-white outline-none py-3 px-3 text-sm text-white placeholder:text-white/80 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.22em] text-white mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full bg-white/10 border border-white/15 focus:border-white outline-none py-3 px-3 text-sm text-white placeholder:text-white/80 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.22em] text-white mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 00000 00000"
                          className="w-full bg-white/10 border border-white/15 focus:border-white outline-none py-3 px-3 text-sm text-white placeholder:text-white/80 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.22em] text-white mb-2">
                          Preferred Estate
                        </label>
                        <input
                          type="text"
                          placeholder="White House / Garden Villa / Other"
                          className="w-full bg-white/5 border border-white/15 focus:border-[#849826] outline-none py-3 px-3 text-sm text-white placeholder:text-white/30 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] text-white/55 mb-2">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Tell us about your dates, number of guests, and special requests."
                        className="w-full bg-white/10 border border-white/15 focus:border-white outline-none p-3 text-sm text-white placeholder:text-white/80 rounded-lg resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-8 py-3 bg-[#849826] text-white rounded-lg uppercase tracking-[0.14em] text-xs font-semibold hover:bg-[#6d7d20] transition-colors"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-3xl border border-[#d9d2c4] bg-white p-6 md:p-7 shadow-[0_16px_44px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-4 w-4 text-[#849826]" />
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#849826] font-semibold">
                    Direct Concierge
                  </p>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.02em] text-[#161616]">
                  Reservation Desk
                </h3>
                <p className="mt-2 text-sm text-[#1c1c1c]/65 leading-relaxed">
                  For fast confirmations, reach us directly through WhatsApp or
                  email. We respond daily.
                </p>

                <div className="mt-5 space-y-3">
                  <a
                    href="https://wa.me/918971220576"
                    className="flex items-center justify-between rounded-xl border border-[#e6e0d3] px-4 py-3 hover:border-[#849826]/45 transition-colors"
                  >
                    <span className="text-sm text-[#1c1c1c]/80">+91 89712 20576</span>
                    <Phone className="h-4 w-4 text-[#849826]" />
                  </a>
                  <a
                    href="mailto:fahad@udupistay.com"
                    className="flex items-center justify-between rounded-xl border border-[#e6e0d3] px-4 py-3 hover:border-[#849826]/45 transition-colors"
                  >
                    <span className="text-sm text-[#1c1c1c]/80">fahad@udupistay.com</span>
                    <Mail className="h-4 w-4 text-[#849826]" />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-[#849826] text-white p-6 md:p-7 shadow-[0_16px_44px_rgba(132,152,38,0.35)]">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/80 font-semibold mb-3">
                  Service Window
                </p>
                <div className="flex items-start gap-3">
                  <Clock3 className="h-5 w-5 mt-0.5 text-white/90" />
                  <div>
                    <p className="text-sm md:text-base font-medium">
                      Daily Assistance Available
                    </p>
                    <p className="text-sm text-white/85 mt-1">
                      8:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-white/85 leading-relaxed">
                  H.No. 4-4-95, Bhaghat Singh Marg, Udupi - 576101
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-8 md:mt-10">
            <div className="rounded-2xl border border-[#e7e1d3] bg-white p-5 md:p-6">
              <MapPin className="h-5 w-5 text-[#849826] mb-3" />
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#849826] font-semibold mb-2">
                Address
              </p>
              <p className="text-sm text-[#1c1c1c]/70 leading-relaxed">
                H.No. 4-4-95, Bhaghat Singh Marg, Udupi - 576101
              </p>
            </div>
            <div className="rounded-2xl border border-[#e7e1d3] bg-white p-5 md:p-6">
              <Mail className="h-5 w-5 text-[#849826] mb-3" />
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#849826] font-semibold mb-2">
                Email
              </p>
              <p className="text-sm text-[#1c1c1c]/70 leading-relaxed">
                fahad@udupistay.com
                <br />
                asif@udupistay.com
              </p>
            </div>
            <div className="rounded-2xl border border-[#e7e1d3] bg-white p-5 md:p-6">
              <Phone className="h-5 w-5 text-[#849826] mb-3" />
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#849826] font-semibold mb-2">
                Call
              </p>
              <p className="text-sm text-[#1c1c1c]/70 leading-relaxed">
                +91 89712 20576
                <br />
                +91 80501 23132
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-[#849826]">
                Estate Locations
              </p>
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-[0.02em] text-[#161616]">
              Visit Our Homestays
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {mapLocations.map((location) => (
              <div
                key={location.title}
                className="rounded-2xl border border-[#e7e1d3] bg-[#f9f8f4] overflow-hidden"
              >
                <div className="px-4 pt-4 md:px-5 md:pt-5 pb-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#849826] font-semibold mb-1">
                    {location.subtitle}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold uppercase tracking-[0.08em] text-[#161616]">
                    {location.title}
                  </h3>
                </div>
                <div className="h-[260px] border-t border-[#e7e1d3]">
                  <iframe
                    title={location.title}
                    src={location.src}
                    loading="lazy"
                    allowFullScreen
                    className="h-full w-full"
                    style={{ border: 0 }}
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-gradient-to-r from-[#1f2410] via-[#20220f] to-[#1f2410]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#a7bb43] font-semibold mb-2">
              Reserve Instantly
            </p>
            <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.02em] text-white">
              Talk to Our Team on WhatsApp
            </h3>
          </div>
          <a
            href="https://wa.me/918971220576"
            className="inline-flex items-center justify-center px-7 py-3 bg-[#849826] text-white rounded-lg uppercase tracking-[0.14em] text-xs font-semibold hover:bg-[#6d7d20] transition-colors"
          >
            Start Chat
          </a>
        </div>
      </section>
    </div>
  );
}
