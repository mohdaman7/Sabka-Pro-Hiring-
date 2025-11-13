"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export const FAQItem = ({ faq, index, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white/5 border-2 border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500 hover:bg-white/10 transition-all duration-300 shadow-xl"
  >
    <motion.button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
      >
        <Plus className="w-5 h-5 text-white" />
      </motion.div>
    </motion.button>

    <motion.div
      initial={false}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-4">
        <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
      </div>
    </motion.div>
  </motion.div>
);
