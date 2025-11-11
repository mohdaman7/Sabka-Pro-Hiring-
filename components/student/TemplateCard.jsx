"use client";

import { motion } from "framer-motion";
import { Layout, Award, Crown, FileCheck, Zap, Check } from "lucide-react";

export default function TemplateCard({
  template,
  onSelect,
  isLocked,
  type = "resume",
}) {
  const getGradient = (index) => {
    const gradients = [
      "from-blue-500/20 to-cyan-500/20",
      "from-emerald-500/20 to-teal-500/20",
      "from-purple-500/20 to-pink-500/20",
      "from-amber-500/20 to-orange-500/20",
    ];
    return gradients[index % gradients.length];
  };

  const getAccentColor = (index) => {
    const colors = [
      "text-blue-400",
      "text-emerald-400",
      "text-purple-400",
      "text-amber-400",
    ];
    return colors[index % colors.length];
  };

  const getAccentBg = (index) => {
    const colors = [
      "from-blue-500/20 to-blue-600/20",
      "from-emerald-500/20 to-emerald-600/20",
      "from-purple-500/20 to-purple-600/20",
      "from-amber-500/20 to-amber-600/20",
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: isLocked ? 0 : -8 }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {/* Card Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradient(
          template.id
        )} backdrop-blur-sm`}
      />
      <div className="absolute inset-0 border border-white/10 rounded-2xl" />

      {/* Hover Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

      {/* Content */}
      <div className="relative p-5 sm:p-6 flex flex-col h-full space-y-4">
        {/* Header with Pro Badge */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-white group-hover:text-[#b87bd1] transition-colors">
              {template.name}
            </h3>
            {template.source && (
              <p className="text-xs text-white/60 mt-1">by {template.source}</p>
            )}
          </div>
          {!template.free && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-1 rounded-full shadow-lg flex-shrink-0"
            >
              <Crown className="w-3 h-3 text-white" />
              <span className="text-xs font-bold text-white">PRO</span>
            </motion.div>
          )}
        </div>

        {/* Preview Area */}
        <div
          className={`flex-1 min-h-40 bg-gradient-to-br ${getAccentBg(
            template.id
          )} border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full filter blur-3xl opacity-20" />
          </div>
          {/* Icon */}
          <div className="relative">
            {type === "resume" ? (
              <FileCheck
                className={`w-12 h-12 ${getAccentColor(template.id)}`}
              />
            ) : (
              <Layout className={`w-12 h-12 ${getAccentColor(template.id)}`} />
            )}
          </div>
        </div>

        {/* Template Info */}
        <div className="space-y-2">
          {template.score && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${template.score}%` }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
                />
              </div>
              <span
                className={`text-xs font-bold ${getAccentColor(template.id)}`}
              >
                {template.score}%
              </span>
            </div>
          )}
          {template.duration && (
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Zap className="w-3 h-3" />
              <span>{template.duration}</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: isLocked ? 1 : 1.02 }}
          whileTap={{ scale: isLocked ? 1 : 0.98 }}
          onClick={() => !isLocked && onSelect?.(template)}
          disabled={isLocked}
          className={`w-full py-2.5 font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2 ${
            isLocked
              ? "bg-white/5 text-white/60 cursor-not-allowed"
              : "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white hover:shadow-lg hover:shadow-[#b87bd1]/40"
          }`}
        >
          {template.free || isLocked ? (
            <>
              <Check className="w-4 h-4" />
              <span>{isLocked ? "Upgrade to Use" : "Use Template"}</span>
            </>
          ) : (
            <>
              <Crown className="w-4 h-4" />
              <span>Unlock Pro</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
