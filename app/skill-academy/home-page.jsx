"use client";

import { useState, useEffect } from "react";
import {
  MouseFollower,
  Hero,
  WhyStandOut,
  Stats,
  FeaturedCourses,
  Features,
  FAQ,
  CTA,
} from "@/views/skill-academy";
import { SuccessStories } from "@/views/skill-academy/sections/success-stories";

export default function SkillAcademyHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative">
      {/* <MouseFollower mousePosition={mousePosition} /> */}
      <Hero />
      <FeaturedCourses />
      {/* <WhyStandOut /> */}
      {/* <Stats /> */}
      {/* <Features /> */}
      <SuccessStories />
      {/* <FAQ /> */}
      {/* <CTA /> */}
    </div>
  );
}
