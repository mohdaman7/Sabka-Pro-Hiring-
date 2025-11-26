"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

export default function VideoPlayer({
  videoUrl,
  title = "Course Video",
  duration = 0,
  onComplete = () => {},
  thumbnail = null,
  userEmail = "user@sabka.com",
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showFullscreenControls, setShowFullscreenControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  // Format time helper
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume / 100;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  // Change playback rate
  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Skip forward/backward
  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        0,
        videoRef.current.currentTime + seconds
      );
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * (videoRef.current?.duration || 0);

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
    onComplete();
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Initialize video volume
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  }, []);

  const videoDuration = videoRef.current?.duration || duration || 0;
  const progressPercentage = (currentTime / videoDuration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
      className="w-full bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#4a1f52] rounded-2xl overflow-hidden shadow-2xl shadow-[#692c7a]/30 group"
    >
      {/* Video Container */}
      <div
        className="relative w-full bg-gradient-to-b from-[#3d1642] via-[#2a1138] to-[#1a0f2e] cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Watermark - Top Left */}
        <div className="absolute top-4 left-4 pointer-events-none z-20">
          <div className="flex items-center gap-2 px-3 py-2">
            <img
              src="/sabka-logo.png"
              alt="Sabka Logo"
              className="w-5 h-5 object-contain opacity-60"
            />
          </div>
        </div>

        {/* Watermark - Bottom Right */}
        <div className="absolute bottom-4 right-4 pointer-events-none z-20">
          <div className="px-3 py-2">
            <p className="text-[10px] text-gray-400 font-medium opacity-50">
              © Sabka Academy
            </p>
          </div>
        </div>

        {/* Play Button Overlay (when paused) */}
        {!isPlaying && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#692c7a] to-[#9463a8] flex items-center justify-center shadow-2xl shadow-[#692c7a]/50 hover:shadow-[#692c7a]/70 transition-all"
            >
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </motion.button>
          </motion.div>
        )}

        {/* Video Title Overlay */}
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent"
          >
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl truncate">
              {title}
            </h2>
          </motion.div>
        )}

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6"
        >
          {/* Progress Bar */}
          <div
            onClick={handleProgressClick}
            className="w-full h-1 bg-white/20 rounded-full cursor-pointer mb-4 hover:h-2 transition-all group/progress"
          >
            <div
              className="h-full bg-gradient-to-r from-[#692c7a] to-[#9463a8] rounded-full transition-all group-hover/progress:shadow-lg group-hover/progress:shadow-[#692c7a]/50"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="w-3 h-3 bg-white rounded-full float-right -mt-1 shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white" />
                )}
              </motion.button>

              {/* Volume Control - Only shows slider on hover */}
              <div className="relative group/volume">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>

                {/* Volume Slider - Appears on hover */}
                <div className="hidden group-hover/volume:flex absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 items-center justify-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 appearance-none bg-white/20 rounded-lg h-1 cursor-pointer accent-blue-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                        isMuted ? 0 : volume
                      }%, rgba(255,255,255,0.2) ${
                        isMuted ? 0 : volume
                      }%, rgba(255,255,255,0.2) 100%)`,
                    }}
                  />
                </div>
              </div>

              {/* Time Display */}
              <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap ml-2">
                {formatTime(currentTime)} / {formatTime(videoDuration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Show/Hide Controls Toggle (Fullscreen only) */}
              {isFullscreen && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setShowFullscreenControls(!showFullscreenControls)
                  }
                  className="p-2 hover:bg-white/20 rounded-lg transition-all text-xs font-medium text-white"
                  title="Toggle controls visibility"
                >
                  {showFullscreenControls ? "Hide" : "Show"}
                </motion.button>
              )}

              {/* Fullscreen */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5 text-white" />
                ) : (
                  <Maximize className="w-5 h-5 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Keyboard Shortcuts Info - Hidden */}
      </div>

      {/* Video Info Footer */}
      <div className="bg-gradient-to-b from-[#3d1642]/50 to-[#2a1138]/50 px-4 sm:px-6 py-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-semibold text-sm sm:text-base">
              {title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Duration: {formatTime(videoDuration)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white text-xs sm:text-sm font-medium">
              {Math.round(progressPercentage)}% Watched
            </p>
            <div className="w-24 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#692c7a] to-[#9463a8]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
