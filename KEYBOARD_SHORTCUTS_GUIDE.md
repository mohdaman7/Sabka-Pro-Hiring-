# Video Player Keyboard Shortcuts Implementation

## Overview

This guide documents how to implement keyboard shortcuts for the VideoPlayer component.

## Supported Shortcuts

| Shortcut | Action         | Description                          |
| -------- | -------------- | ------------------------------------ |
| `Space`  | Play/Pause     | Toggle video playback                |
| `F`      | Fullscreen     | Toggle fullscreen mode               |
| `→`      | Skip Forward   | Skip 10 seconds ahead                |
| `←`      | Skip Backward  | Skip 10 seconds back                 |
| `↑`      | Volume Up      | Increase volume by 10%               |
| `↓`      | Volume Down    | Decrease volume by 10%               |
| `M`      | Mute           | Toggle mute on/off                   |
| `0-9`    | Seek           | Jump to 0-90% of video               |
| `.`      | Next Frame     | Move to next frame (paused only)     |
| `,`      | Previous Frame | Move to previous frame (paused only) |
| `>`      | Increase Speed | Increase playback speed              |
| `<`      | Decrease Speed | Decrease playback speed              |

## Implementation

### Adding Keyboard Event Listener to VideoPlayer

```javascript
import { useEffect, useRef, useState } from "react";

export default function VideoPlayer({ videoUrl, onComplete, ...props }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!videoRef.current) return;

      // Check if user is not typing in an input
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      const video = videoRef.current;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;

        case "KeyF":
          e.preventDefault();
          if (!document.fullscreenElement) {
            videoRef.current.parentElement?.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          break;

        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.duration, video.currentTime + 10);
          break;

        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;

        case "ArrowUp":
          e.preventDefault();
          const newVolumeUp = Math.min(1, volume + 0.1);
          setVolume(newVolumeUp);
          video.volume = newVolumeUp;
          break;

        case "ArrowDown":
          e.preventDefault();
          const newVolumeDown = Math.max(0, volume - 0.1);
          setVolume(newVolumeDown);
          video.volume = newVolumeDown;
          break;

        case "KeyM":
          e.preventDefault();
          setIsMuted(!isMuted);
          video.muted = !video.muted;
          break;

        case "Period": // .
          if (video.paused) {
            e.preventDefault();
            video.currentTime += 1 / 30; // Move to next frame
          }
          break;

        case "Comma": // ,
          if (video.paused) {
            e.preventDefault();
            video.currentTime -= 1 / 30; // Move to previous frame
          }
          break;

        case "Digit0":
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9":
          e.preventDefault();
          const digit = parseInt(e.code.replace("Digit", ""));
          video.currentTime = (digit / 10) * video.duration;
          break;

        case "BracketRight": // >
          e.preventDefault();
          const newSpeedUp = Math.min(2, currentSpeed + 0.25);
          setCurrentSpeed(newSpeedUp);
          video.playbackRate = newSpeedUp;
          break;

        case "BracketLeft": // <
          e.preventDefault();
          const newSpeedDown = Math.max(0.5, currentSpeed - 0.25);
          setCurrentSpeed(newSpeedDown);
          video.playbackRate = newSpeedDown;
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [volume, currentSpeed, isMuted]);

  return (
    // ... rest of component
  );
}
```

## Implementation in LessonView

The keyboard shortcuts will work automatically when the VideoPlayer component is rendered inside LessonView.

## User-Facing Documentation

### Display Keyboard Shortcuts Info

Add a help tooltip showing available shortcuts:

```javascript
import { HelpCircle } from "lucide-react";

export function KeyboardShortcutsTooltip() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowHelp(!showHelp)}
        className="p-2 text-gray-400 hover:text-white transition-colors"
        title="Keyboard shortcuts"
      >
        <HelpCircle className="w-5 h-5" />
      </button>

      {showHelp && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 border border-gray-700 rounded-lg p-4 w-48 text-sm text-gray-300 z-50">
          <h4 className="font-semibold text-white mb-2">Keyboard Shortcuts</h4>
          <ul className="space-y-1 text-xs">
            <li>
              <kbd>Space</kbd> - Play/Pause
            </li>
            <li>
              <kbd>→</kbd> - Skip +10s
            </li>
            <li>
              <kbd>←</kbd> - Skip -10s
            </li>
            <li>
              <kbd>↑</kbd> - Volume Up
            </li>
            <li>
              <kbd>↓</kbd> - Volume Down
            </li>
            <li>
              <kbd>M</kbd> - Mute
            </li>
            <li>
              <kbd>F</kbd> - Fullscreen
            </li>
            <li>
              <kbd>0-9</kbd> - Jump to %
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
```

## Browser Compatibility

| Shortcut    | Chrome | Firefox | Safari | Edge |
| ----------- | ------ | ------- | ------ | ---- |
| Space/Play  | ✅     | ✅      | ✅     | ✅   |
| Fullscreen  | ✅     | ✅      | ⚠️     | ✅   |
| Arrow Keys  | ✅     | ✅      | ✅     | ✅   |
| Number Keys | ✅     | ✅      | ✅     | ✅   |

Note: Some browsers may require user interaction before allowing fullscreen.

## Accessibility Features

The keyboard shortcuts include:

- **Screen Reader Compatible**: Uses native HTML5 video controls as fallback
- **Keyboard Navigation**: Full keyboard access without mouse
- **Visual Feedback**: Shows current state in UI
- **Customizable**: Shortcuts can be modified per implementation

## Testing Keyboard Shortcuts

Test each shortcut:

```javascript
// Test play/pause
const video = document.querySelector("video");
// Press Space
console.log(video.paused); // Should toggle

// Test skip forward
// Press Arrow Right
console.log(video.currentTime); // Should increase by 10

// Test fullscreen
// Press F
console.log(document.fullscreenElement); // Should not be null

// Test volume
// Press Arrow Up
console.log(video.volume); // Should increase by 0.1
```

## Future Enhancements

- [ ] Add customizable keyboard shortcuts
- [ ] Persist shortcut preferences
- [ ] Add visual feedback for shortcuts used
- [ ] Implement context-aware shortcuts
- [ ] Add mobile touch gesture equivalents
- [ ] Add accessibility mode for screen readers
- [ ] Localize shortcut labels
