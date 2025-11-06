# 🎉 Confetti Setup Guide

This guide explains how to set up the confetti animation library for success animations.

## Installation

### Option 1: NPM (Recommended)

```bash
npm install canvas-confetti
```

Then import in your component:

```javascript
import { triggerSuccessAnimation } from "@/utils/successAnimations";

// Use it
triggerSuccessAnimation({ type: "success" });
```

### Option 2: CDN (No Installation)

Add to your `next.config.js` or HTML head:

```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
```

The library will be available globally as `window.confetti`.

## Verification

After installation, verify it works:

```javascript
// In browser console
window.confetti({ particleCount: 100, spread: 70 });
```

You should see confetti particles fall across the screen.

## Usage in Components

### Basic Usage

```javascript
import { triggerSuccessAnimation } from "@/utils/successAnimations";

// In your component
const handleSuccess = () => {
  customToast.success("Success!", "Operation completed");
  triggerSuccessAnimation({ type: "success" });
};
```

### Different Animation Types

```javascript
// Standard success
triggerSuccessAnimation({ type: "success" });

// Achievement (more intense)
triggerSuccessAnimation({ type: "achievement" });

// Milestone (celebration)
triggerSuccessAnimation({ type: "milestone" });
```

### Custom Configuration

```javascript
import { triggerConfetti } from "@/utils/successAnimations";

triggerConfetti({
  particleCount: 150,
  spread: 100,
  duration: 5000,
});
```

## Accessibility

The animations automatically respect user preferences:

```javascript
// Automatically disables if user prefers reduced motion
triggerSuccessAnimation({ type: "success" });

// Check preference
import { prefersReducedMotion } from "@/utils/successAnimations";

if (!prefersReducedMotion()) {
  triggerSuccessAnimation({ type: "success" });
}
```

## Troubleshooting

### Confetti not showing?

1. **Check if library is loaded:**
   ```javascript
   console.log(window.confetti); // Should not be undefined
   ```

2. **Verify import:**
   ```javascript
   import { triggerSuccessAnimation } from "@/utils/successAnimations";
   ```

3. **Check browser console for errors:**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for "Confetti animation failed" messages

### Sound not playing?

1. **Check browser permissions:**
   - Some browsers require user interaction before playing audio
   - Ensure user has clicked something before triggering sound

2. **Check audio context:**
   ```javascript
   const audioContext = new (window.AudioContext || window.webkitAudioContext)();
   console.log(audioContext.state); // Should be "running"
   ```

### Haptic feedback not working?

1. **Check device support:**
   - Haptic feedback only works on mobile devices
   - Desktop browsers won't vibrate

2. **Check permissions:**
   - Mobile browser may require permission to vibrate
   - Check browser settings

## Performance Tips

1. **Limit confetti frequency:**
   - Don't trigger on every action
   - Use for major achievements only

2. **Adjust particle count:**
   - Lower count = better performance
   - 50-100 particles is usually enough

3. **Respect user preferences:**
   - Always check `prefersReducedMotion()`
   - Disable for accessibility

## Browser Support

| Browser | Confetti | Sound | Haptic |
|---------|----------|-------|--------|
| Chrome | ✅ | ✅ | ✅ |
| Firefox | ✅ | ✅ | ✅ |
| Safari | ✅ | ✅ | ⚠️ |
| Edge | ✅ | ✅ | ✅ |
| Mobile Chrome | ✅ | ✅ | ✅ |
| Mobile Safari | ✅ | ✅ | ⚠️ |

## Examples

### Password Change Success

```javascript
const handlePasswordChange = async (oldPassword, newPassword) => {
  try {
    await updatePassword(oldPassword, newPassword);
    customToast.success("Password Changed", "Your password has been updated");
    triggerSuccessAnimation({ type: "achievement" }); // Major achievement
  } catch (error) {
    customToast.error("Error", error.message);
  }
};
```

### Course Enrollment

```javascript
const handleEnrollCourse = async (courseId) => {
  try {
    await enrollCourse(courseId);
    customToast.success("Enrolled", "You have enrolled in the course");
    triggerSuccessAnimation({ type: "milestone" }); // Milestone achievement
  } catch (error) {
    customToast.error("Error", error.message);
  }
};
```

### Job Application

```javascript
const handleApplyJob = async (jobId, applicationData) => {
  try {
    await submitApplication(jobId, applicationData);
    customToast.success("Applied", "Your application has been submitted");
    triggerSuccessAnimation({ type: "success" }); // Standard success
  } catch (error) {
    customToast.error("Error", error.message);
  }
};
```

## Customization

### Create Custom Animation

```javascript
import { triggerConfetti } from "@/utils/successAnimations";

const triggerCustomConfetti = () => {
  triggerConfetti({
    particleCount: 200,
    spread: 120,
    duration: 5000,
  });
};
```

### Disable All Animations

```javascript
import { getAccessibleAnimations } from "@/utils/successAnimations";

// Use accessible animations (no confetti/sound)
const animations = getAccessibleAnimations();
animations.triggerSuccessAnimation(); // Does nothing
```

## Next Steps

1. ✅ Install confetti library
2. ✅ Import in components
3. ✅ Test animations
4. ✅ Customize as needed
5. ✅ Monitor performance

## Support

For issues or questions:
- Check browser console for errors
- Verify library is loaded
- Test in different browsers
- Check accessibility settings

Happy celebrating! 🎉
