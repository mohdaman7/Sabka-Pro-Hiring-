/**
 * Success Animations Utility
 * Provides confetti, sound effects, and haptic feedback for major achievements
 */

/**
 * Trigger confetti animation
 * @param {Object} options - Configuration options
 * @param {number} options.duration - Duration in milliseconds (default: 3000)
 * @param {string} options.particleCount - Number of particles (default: 100)
 * @param {string} options.spread - Spread angle (default: 90)
 */
export const triggerConfetti = (options = {}) => {
  const {
    duration = 3000,
    particleCount = 100,
    spread = 90,
  } = options;

  // Check if confetti library is available
  if (typeof window !== "undefined" && window.confetti) {
    try {
      window.confetti({
        particleCount,
        spread,
        origin: { y: 0.6 },
        duration,
      });
    } catch (error) {
      console.warn("Confetti animation failed:", error);
    }
  }
};

/**
 * Trigger success confetti with specific patterns
 */
export const triggerSuccessConfetti = () => {
  triggerConfetti({
    particleCount: 100,
    spread: 70,
    duration: 3000,
  });
};

/**
 * Trigger celebration confetti (more intense)
 */
export const triggerCelebrationConfetti = () => {
  triggerConfetti({
    particleCount: 200,
    spread: 100,
    duration: 4000,
  });
};

/**
 * Play success sound effect
 * @param {string} type - Type of sound: 'success', 'achievement', 'milestone'
 */
export const playSuccessSound = (type = "success") => {
  if (typeof window === "undefined") return;

  try {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;

    switch (type) {
      case "success":
        // Simple success beep
        playTone(audioContext, 800, 0.1, now);
        playTone(audioContext, 1000, 0.1, now + 0.1);
        break;

      case "achievement":
        // Achievement sound (ascending notes)
        playTone(audioContext, 523, 0.1, now); // C5
        playTone(audioContext, 659, 0.1, now + 0.1); // E5
        playTone(audioContext, 784, 0.1, now + 0.2); // G5
        break;

      case "milestone":
        // Milestone sound (longer celebration)
        playTone(audioContext, 523, 0.15, now); // C5
        playTone(audioContext, 659, 0.15, now + 0.15); // E5
        playTone(audioContext, 784, 0.15, now + 0.3); // G5
        playTone(audioContext, 1047, 0.2, now + 0.45); // C6
        break;

      default:
        playTone(audioContext, 800, 0.1, now);
    }
  } catch (error) {
    console.warn("Sound effect failed:", error);
  }
};

/**
 * Helper function to play a tone
 * @param {AudioContext} audioContext - Audio context
 * @param {number} frequency - Frequency in Hz
 * @param {number} duration - Duration in seconds
 * @param {number} startTime - Start time in seconds
 */
const playTone = (audioContext, frequency, duration, startTime) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
};

/**
 * Trigger haptic feedback (vibration)
 * @param {string} type - Type of feedback: 'light', 'medium', 'heavy'
 */
export const triggerHapticFeedback = (type = "medium") => {
  if (typeof navigator === "undefined" || !navigator.vibrate) {
    return; // Haptic feedback not supported
  }

  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
    success: [10, 20, 10],
    achievement: [20, 30, 20],
    milestone: [30, 50, 30, 50, 30],
  };

  const pattern = patterns[type] || patterns.medium;

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn("Haptic feedback failed:", error);
  }
};

/**
 * Combined success animation (confetti + sound + haptic)
 * @param {Object} options - Configuration options
 * @param {boolean} options.confetti - Enable confetti (default: true)
 * @param {boolean} options.sound - Enable sound (default: true)
 * @param {boolean} options.haptic - Enable haptic feedback (default: true)
 * @param {string} options.type - Animation type: 'success', 'achievement', 'milestone'
 */
export const triggerSuccessAnimation = (options = {}) => {
  const {
    confetti: enableConfetti = true,
    sound: enableSound = true,
    haptic: enableHaptic = true,
    type = "success",
  } = options;

  if (enableConfetti) {
    if (type === "milestone") {
      triggerCelebrationConfetti();
    } else {
      triggerSuccessConfetti();
    }
  }

  if (enableSound) {
    playSuccessSound(type);
  }

  if (enableHaptic) {
    triggerHapticFeedback(type);
  }
};

/**
 * Disable animations (for accessibility or user preference)
 * @returns {Object} - Object with all animation functions disabled
 */
export const getAccessibleAnimations = () => {
  return {
    triggerConfetti: () => {},
    triggerSuccessConfetti: () => {},
    triggerCelebrationConfetti: () => {},
    playSuccessSound: () => {},
    triggerHapticFeedback: () => {},
    triggerSuccessAnimation: () => {},
  };
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean} - True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get animations based on user preferences
 * @returns {Object} - Animation functions respecting user preferences
 */
export const getAnimationsWithPreferences = () => {
  if (prefersReducedMotion()) {
    return getAccessibleAnimations();
  }
  return {
    triggerConfetti,
    triggerSuccessConfetti,
    triggerCelebrationConfetti,
    playSuccessSound,
    triggerHapticFeedback,
    triggerSuccessAnimation,
  };
};

export default {
  triggerConfetti,
  triggerSuccessConfetti,
  triggerCelebrationConfetti,
  playSuccessSound,
  triggerHapticFeedback,
  triggerSuccessAnimation,
  getAccessibleAnimations,
  prefersReducedMotion,
  getAnimationsWithPreferences,
};
