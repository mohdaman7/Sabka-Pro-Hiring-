# Video Player Integration Guide

## Overview

The video player system has been fully integrated into the Skill Academy platform with three main components:

### Components Created

#### 1. **VideoPlayer.jsx** (`/components/ui/VideoPlayer.jsx`)

Professional video player component with full playback controls.

**Features:**

- Play/Pause controls with centered overlay
- Progress bar with click-to-seek functionality
- Volume control (slider shows on hover)
- Skip forward/backward 10 seconds
- Playback speed selector (0.5x to 2x)
- Fullscreen toggle
- Current/Total time display
- Auto-hide controls after 3 seconds during playback
- Responsive design for all devices
- Smooth animations with Framer Motion

**Props:**

```javascript
<VideoPlayer
  videoUrl="https://example.com/video.mp4" // Required
  title="Lesson Title" // Optional
  duration={3600} // Optional (in seconds)
  thumbnail="https://example.com/thumb.jpg" // Optional
  onComplete={() => {}} // Optional callback when video ends
/>
```

#### 2. **LessonView.jsx** (`/components/ui/LessonView.jsx`)

Comprehensive lesson viewing component with video player and course outline sidebar.

**Features:**

- Integrated VideoPlayer component
- Course outline sidebar with expandable modules
- Lesson navigation (previous/next)
- Module-level navigation
- Bookmark functionality
- Share button
- Lesson resources display
- Course completion status
- Progress tracking

**Props:**

```javascript
<LessonView
  lesson={{_id, title, description, videoUrl, durationSec, ...}}
  module={{_id, title, lessons, ...}}
  courseId="course-id"
  allModules={[...]}
  onLessonComplete={(lessonId) => {}}
  onNavigateLesson={(lessonId, moduleId) => {}}
/>
```

#### 3. **Lesson Detail Page** (`/app/skill-academy/courses/[id]/lesson/[lessonId]/page.jsx`)

Page component that handles:

- Fetching course and lesson data
- Loading states with animations
- Error handling
- Lesson navigation
- Backend API calls for completion tracking

**Route Structure:**

```
/skill-academy/courses/:courseId/lesson/:lessonId
```

**Features:**

- Fetches complete course with all modules and lessons
- Finds current lesson and module from URL params
- Shows LessonView component
- Marks lesson complete when video ends
- Handles navigation between lessons
- Shows loading spinner during data fetch
- Displays error messages if lesson not found

### Updated Components

#### 1. **Course Detail Page** (`/app/skill-academy/courses/[id]/page.jsx`)

Updated to include VideoPlayer component displaying featured course video.

**Integration:**

```javascript
{
  courseData?.videoUrl && (
    <div>
      <VideoPlayer
        videoUrl={courseData.videoUrl}
        title={courseData.title}
        duration={totals.totalDurationSec}
        thumbnail={courseData.thumbnail}
      />
    </div>
  );
}
```

**Shows:**

- Featured course video at top of course detail
- All existing course information
- Modules and lessons list
- Purchase options

## Integration with Backend API

### Required API Endpoints

The system uses the following API endpoints:

#### 1. Get Course Details

```
GET /api/courses/:courseId
Response: {
  data: {
    _id: "course-id",
    title: "Course Title",
    description: "...",
    videoUrl: "https://...",      // Featured course video
    thumbnail: "https://...",
    modules: [
      {
        _id: "module-id",
        title: "Module Title",
        lessons: [
          {
            _id: "lesson-id",
            title: "Lesson Title",
            videoUrl: "https://...",  // Lesson video
            durationSec: 1200,
            description: "...",
            isFreePreview: true,
            resources: [
              {name: "Resource Name", url: "https://..."}
            ]
          }
        ]
      }
    ]
  }
}
```

#### 2. Mark Lesson Complete

```
POST /api/progress/mark-complete
Body: {
  courseId: "course-id",
  lessonId: "lesson-id"
}
Response: {
  success: true,
  progress: {...}
}
```

#### 3. Check Purchase Status

```
GET /api/purchases/check/:courseId
Response: {
  purchased: true/false
}
```

## Data Structure Requirements

### Course Object

```javascript
{
  _id: String,
  title: String,
  description: String,
  videoUrl: String,           // Featured video URL
  thumbnail: String,          // Course thumbnail
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviewCount: Number,
  enrolledCount: Number,
  instructor: String,
  modules: [Module]
}
```

### Module Object

```javascript
{
  _id: String,
  title: String,
  lessons: [Lesson]
}
```

### Lesson Object

```javascript
{
  _id: String,
  title: String,
  description: String,
  videoUrl: String,           // Lesson video URL
  durationSec: Number,
  thumbnail: String,
  isFreePreview: Boolean,
  resources: [
    {
      name: String,
      url: String
    }
  ]
}
```

## File Structure

```
app/
├── skill-academy/
│   ├── courses/
│   │   ├── [id]/
│   │   │   ├── page.jsx              (Updated with VideoPlayer)
│   │   │   └── lesson/
│   │   │       └── [lessonId]/
│   │   │           └── page.jsx      (NEW - Lesson detail page)
│   │   └── page.jsx

components/
├── ui/
│   ├── VideoPlayer.jsx               (NEW - Core video player)
│   └── LessonView.jsx                (NEW - Lesson view layout)

services/
└── courseService.js                  (Use existing getById method)
```

## Usage Examples

### 1. Display Featured Course Video on Course Detail Page

Already integrated in `/app/skill-academy/courses/[id]/page.jsx`

### 2. Link Lessons to Video Viewing Page

In course detail page, update lesson click handlers:

```javascript
const handleStartLesson = (moduleId, lessonId) => {
  router.push(`/skill-academy/courses/${courseId}/lesson/${lessonId}`);
};
```

### 3. Direct Navigation to Lesson

```javascript
router.push(`/skill-academy/courses/${courseId}/lesson/${lessonId}`);
```

### 4. Programmatic Video Completion Tracking

```javascript
const handleLessonComplete = async (completeItemId) => {
  await axios.post(`/api/progress/mark-complete`, {
    courseId,
    lessonId: completeItemId,
  });
};
```

## Styling

All components use the Sabka Skill Academy color scheme:

- **Primary**: `#692c7a` (purple)
- **Secondary**: `#9463a8` (light purple)
- **Dark Background**: `#1a0f2e`, `#0f0820` (very dark purple/blue)
- **Accent**: `#d8b4f0` (light purple)

Components are responsive and work on:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## Performance Considerations

1. **Video Loading**: Videos load lazily when component mounts
2. **Controls Auto-hide**: Controls hide after 3 seconds of inactivity during playback
3. **Responsive Rendering**: All components adapt to screen size
4. **Optimized Animations**: Using Framer Motion for efficient animations

## Testing Checklist

- [ ] Video player loads and plays correctly
- [ ] Controls work: play, pause, seek, volume, speed
- [ ] Fullscreen toggle works
- [ ] Controls auto-hide after 3 seconds
- [ ] Lesson navigation works (previous/next)
- [ ] Module expansion/collapse works
- [ ] Lesson completion is tracked
- [ ] Error states display correctly
- [ ] Loading states display correctly
- [ ] Works on mobile, tablet, desktop
- [ ] Works on Chrome, Firefox, Safari, Edge

## Future Enhancements

- [ ] Add keyboard shortcuts handler (Space, F, Arrow keys)
- [ ] Implement video resume from last watched position
- [ ] Add video quality selection (adaptive bitrate)
- [ ] Add closed captions support
- [ ] Implement video analytics and heatmaps
- [ ] Add watch time badges/achievements
- [ ] Implement video note-taking feature
- [ ] Add related videos/lessons suggestions
