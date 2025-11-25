"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Star, Send, User } from "lucide-react";
import skillAcademyToast from "@/utils/skillAcademyToast";

/**
 * ReviewSection Component
 * Displays and manages course reviews
 */
export default function ReviewSection({
  courseId,
  reviews = [],
  onSubmitReview,
  isLoading = false,
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      skillAcademyToast.warning("Rating Required", "Please select a rating");
      return;
    }

    if (reviewText.trim().length < 10) {
      skillAcademyToast.warning(
        "Review Too Short",
        "Please write at least 10 characters"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmitReview) {
        await onSubmitReview({
          courseId,
          rating,
          text: reviewText,
        });
      }

      skillAcademyToast.reviewSubmitted();
      setRating(0);
      setReviewText("");
    } catch (error) {
      skillAcademyToast.reviewError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Review Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent border-2 border-white/10 rounded-2xl p-8 backdrop-blur-xl"
      >
        <h2 className="text-2xl font-black text-white mb-6">Student Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Rating Summary */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-6xl font-black text-white mb-2">
              {averageRating}
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-400">
              Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    {[...Array(stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#a87bcc] to-[#7e4ba3]"
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Write Review Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent border-2 border-white/10 rounded-2xl p-8 backdrop-blur-xl"
      >
        <h3 className="text-xl font-bold text-white mb-6">Share Your Review</h3>

        {/* Rating Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-all"
              >
                <Star
                  className={`w-8 h-8 transition-all ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-gray-600"
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Your Review
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with this course..."
            className="w-full h-32 px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#a87bcc]/50 focus:outline-none transition-all resize-none"
          />
          <p className="text-xs text-gray-400 mt-2">
            {reviewText.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-[#a87bcc] to-[#7e4ba3] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#a87bcc]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Review</span>
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Reviews List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a87bcc] to-[#7e4ba3] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      {review.userName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {review.date || "Recently"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-300">{review.text}</p>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
