'use client';

import HeroSection from "@/components/hero-section";
import HospitalitySection from "@/components/hospitality-section";
import MarqueeTags from "@/components/marquee-tags";
import HomestaysHorizontalScroll from "@/components/homestays-horizontal-scroll";
import TajStyleShowcase from "@/components/taj-style-showcase";
import FacilitiesSection from "@/components/FacilitiesSection";
import ViewpointOasisSection from "@/components/viewpoints";
import FarmHouseSection from "@/components/farmhouse-section";
import TestimonialsSection from "@/components/testimonial";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Premium Hero Section */}
      <HeroSection />

      {/* Hospitality Section */}
      <HospitalitySection />

      {/* Marquee Tags Section */}
      <MarqueeTags />

      {/* Premium Horizontal Scroll Section */}
      <HomestaysHorizontalScroll />
<FacilitiesSection/>
      <div className="lg:hidden">
        <TajStyleShowcase />
      </div>
<ViewpointOasisSection/>
<FarmHouseSection/>
<TestimonialsSection/>
     
    </div>
  );
}
