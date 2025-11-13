"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export const ParallaxSection = ({ children, speed = 0.5 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * speed]);

  return <motion.div style={{ y }}>{children}</motion.div>;
};
