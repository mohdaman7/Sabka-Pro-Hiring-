"use client";

import { useState, useEffect } from "react";
import {
  MouseFollower,
  Hero,
  Stats,
  FeaturedCourses,
  Features,
  FAQ,
  CTA,
} from "@/views/skill-academy";

export default function SkillAcademyHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative">
      <MouseFollower mousePosition={mousePosition} />
      <Hero />
      <Stats />
      <FeaturedCourses />
      <Features />
      <FAQ />
      <CTA />
    </div>
  );
}
