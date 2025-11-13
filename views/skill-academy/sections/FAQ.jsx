"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ParallaxSection } from "../components/ParallaxSection";
import { FAQItem } from "../components/FAQItem";

const faqsData = [
  {
    question: "How do I get started with Sabka Skill Academy?",
    answer:
      "Getting started is easy! Simply create a free account, browse our course catalog, and enroll in courses that match your learning goals. Many of our courses are free, and you can start learning immediately.",
  },
  {
    question: "Are the certificates recognized by employers?",
    answer:
      "Yes! Our certificates are industry-recognized and valued by employers worldwide. We partner with leading companies to ensure our curriculum meets current industry standards and requirements.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely! All our courses are self-paced, allowing you to learn when it's convenient for you. You have lifetime access to course materials, so you can revisit content anytime.",
  },
  {
    question: "Do you offer job placement assistance?",
    answer:
      "Yes, we provide comprehensive career support including resume reviews, interview preparation, and job placement assistance. Our career services team works with you to help achieve your professional goals.",
  },
  {
    question: "What if I'm not satisfied with a course?",
    answer:
      "We offer a 30-day money-back guarantee on all paid courses. If you're not completely satisfied, contact our support team for a full refund within 30 days of purchase.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Most of our beginner courses have no prerequisites. For intermediate and advanced courses, we clearly list any required knowledge or skills. You can always start with our foundational courses if needed.",
  },
];

export const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <ParallaxSection speed={0.3}>
      <section className="py-20 lg:py-32">
        <div className="max-w-[95%] mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our courses and services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqsData.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFAQ === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </ParallaxSection>
  );
};
