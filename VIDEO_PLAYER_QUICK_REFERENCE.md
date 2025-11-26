# Video Player Quick Reference

## 🎯 Quick Start

### Import VideoPlayer

```javascript
import VideoPlayer from "@/components/ui/VideoPlayer";
```

### Basic Usage

```jsx
<VideoPlayer
  videoUrl="https://example.com/video.mp4"
  title="My Lesson"
  duration={3600}
/>
```

## 🎬 VideoPlayer Props

| Prop         | Type     | Required | Default        | Description                  |
| ------------ | -------- | -------- | -------------- | ---------------------------- |
| `videoUrl`   | string   | Yes      | -              | URL of the video file        |
| `title`      | string   | No       | "Course Video" | Title displayed above player |
| `duration`   | number   | No       | 0              | Video duration in seconds    |
| `thumbnail`  | string   | No       | null           | Poster image URL             |
| `onComplete` | function | No       | () => {}       | Callback when video ends     |

## 📺 LessonView Props

| Prop               | Type     | Required | Description         |
| ------------------ | -------- | -------- | ------------------- |
| `lesson`           | object   | Yes      | Current lesson data |
| `module`           | object   | Yes      | Current module data |
| `courseId`         | string   | Yes      | Course ID           |
| `allModules`       | array    | Yes      | All course modules  |
| `onLessonComplete` | function | No       | Completion callback |
| `onNavigateLesson` | function | No       | Navigation callback |

## 🛣️ Navigation

### Link to Lesson View

```javascript
router.push(`/skill-academy/courses/${courseId}/lesson/${lessonId}`);
```

### Route Structure

```
/skill-academy/courses/:courseId/lesson/:lessonId
```

## 🎨 Styling

### Apply Custom Colors

Edit Tailwind classes in components:

```javascript
// Change primary purple
from-[#692c7a] → from-[#YOUR_COLOR]
to-[#9463a8] → to-[#YOUR_COLOR]
```

## 🔌 API Integration

### Mark Lesson Complete

```javascript
await axios.post("/api/progress/mark-complete", {
  courseId: "course-id",
  lessonId: "lesson-id",
});
```

### Get Course Data

```javascript
const response = await axios.get(`/api/courses/${courseId}`);
const courseData = response.data.data;
```

## 📱 Responsive Classes

| Screen Size | Tailwind | Example         |
| ----------- | -------- | --------------- |
| Mobile      | `md:`    | `md:text-lg`    |
| Tablet      | `lg:`    | `lg:col-span-2` |
| Desktop     | Default  | `text-lg`       |

## 🎮 Controls

| Control               | Action                     |
| --------------------- | -------------------------- |
| **Play/Pause Button** | Toggle video playback      |
| **Progress Bar**      | Click to seek to position  |
| **Volume Slider**     | Adjust volume (0-100%)     |
| **Speed Dropdown**    | Select 0.5x to 2x playback |
| **Skip Buttons**      | Jump ±10 seconds           |
| **Fullscreen**        | Toggle fullscreen mode     |

## 🔑 Keyboard Shortcuts (Ready to Implement)

| Key     | Action      |
| ------- | ----------- |
| `Space` | Play/Pause  |
| `F`     | Fullscreen  |
| `→`     | Skip +10s   |
| `←`     | Skip -10s   |
| `↑`     | Volume Up   |
| `↓`     | Volume Down |
| `M`     | Mute        |

See `KEYBOARD_SHORTCUTS_GUIDE.md` for implementation.

## 📊 Lesson Object Structure

```javascript
{
  _id: "lesson-id",
  title: "Lesson Title",
  description: "Lesson description text",
  videoUrl: "https://example.com/video.mp4",
  durationSec: 1200,
  thumbnail: "https://example.com/thumb.jpg",
  isFreePreview: true,
  resources: [
    {
      name: "PDF Slides",
      url: "https://example.com/file.pdf"
    }
  ]
}
```

## 📦 Module Object Structure

```javascript
{
  _id: "module-id",
  title: "Module Title",
  lessons: [
    { _id: "...", title: "...", ... }
  ]
}
```

## 🚨 Common Issues & Solutions

### Issue: Video Won't Play

**Solution**: Check if:

- Video URL is correct and accessible
- CORS headers are set on video server
- Video format is supported (MP4 with H.264)

### Issue: Controls Hidden on Mobile

**Solution**: VideoPlayer hides controls after 3s inactivity

- Touch/click anywhere to show controls
- This is intentional design

### Issue: Seeking Not Working

**Solution**:

- Ensure video server supports Range requests
- Check browser console for errors

### Issue: Fullscreen Not Working

**Solution**:

- HTTPS is required in production
- Some browsers need user gesture first
- Check browser fullscreen permissions

## 💡 Pro Tips

1. **Performance**: Use video compression for faster loading
2. **Thumbnails**: Always provide thumbnail for better UX
3. **Duration**: Pre-calculate duration to avoid buffering
4. **Mobile**: Test on actual devices, not just browser DevTools
5. **Analytics**: Track completion via `onComplete` callback

## 📚 File References

- **Main Component**: `/components/ui/VideoPlayer.jsx`
- **Lesson Layout**: `/components/ui/LessonView.jsx`
- **Lesson Page**: `/app/skill-academy/courses/[id]/lesson/[lessonId]/page.jsx`
- **Course Detail**: `/app/skill-academy/courses/[id]/page.jsx`

## 🔗 Documentation Links

- [Complete Integration Guide](./VIDEO_PLAYER_INTEGRATION_GUIDE.md)
- [Implementation Summary](./VIDEO_PLAYER_IMPLEMENTATION_SUMMARY.md)
- [Keyboard Shortcuts Guide](./KEYBOARD_SHORTCUTS_GUIDE.md)
- [Backend Integration](./BACKEND_INTEGRATION_GUIDE.md)

## 🎓 Example: Complete Lesson Page

```javascript
import LessonView from "@/components/ui/LessonView";
import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [module, setModule] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/courses/${params.id}`);
      setCourse(res.data.data);
      // Find lesson in modules...
    };
    fetch();
  }, []);

  return (
    <LessonView
      lesson={lesson}
      module={module}
      courseId={params.id}
      allModules={course?.modules || []}
      onLessonComplete={(lessonId) => {
        axios.post("/api/progress/mark-complete", {
          courseId: params.id,
          lessonId,
        });
      }}
      onNavigateLesson={(newLessonId) => {
        router.push(
          `/skill-academy/courses/${params.id}/lesson/${newLessonId}`
        );
      }}
    />
  );
}
```

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: ✅ Production Ready
