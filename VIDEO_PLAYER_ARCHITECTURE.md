# Video Player System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Skill Academy Platform                       │
│                   (Next.js 14 + React 18)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐          ┌──────▼───────┐
        │  Course Detail │          │  Lesson View │
        │     Page       │          │     Page     │
        └───────┬────────┘          └──────┬───────┘
                │                          │
                │ Uses                     │ Uses
                │                          │
        ┌───────▼──────────┐      ┌──────▼──────────┐
        │  VideoPlayer     │      │   LessonView    │
        │  Component       │      │   Component     │
        │                  │      │                 │
        │ - Play/Pause     │      │ - VideoPlayer   │
        │ - Progress Bar   │      │ - Course Outline│
        │ - Volume Control │      │ - Navigation    │
        │ - Speed Select   │      │ - Resources     │
        │ - Fullscreen     │      │ - Bookmarks     │
        └───────┬──────────┘      └──────┬──────────┘
                │                        │
                └────────────┬───────────┘
                             │
                    ┌────────▼────────┐
                    │  HTML5 Video    │
                    │    Element      │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
        ┌─────▼──────┐            ┌────────▼────────┐
        │   Video    │            │  Thumbnail/    │
        │   Server   │            │  Poster Images  │
        │            │            │                 │
        │ - AWS S3   │            │ - CDN Hosted    │
        │ - Self     │            │ - Optimized     │
        │   hosted   │            └────────────────┘
        └────────────┘
```

## Data Flow

### 1. Course Detail Page Flow

```
User navigates to /skill-academy/courses/:id
    │
    ├─ Page mounts
    │
    ├─ Fetch: GET /api/courses/:id
    │
    ├─ Receive courseData {
    │    _id, title, videoUrl, modules: [{
    │      _id, title, lessons: [{
    │        _id, title, videoUrl, durationSec, ...
    │      }]
    │    }]
    │  }
    │
    ├─ Render featured VideoPlayer with course video
    │
    ├─ Display course info, stats, modules
    │
    └─ Show lesson list with lock indicators
```

### 2. Lesson Detail Page Flow

```
User clicks lesson / navigates to /skill-academy/courses/:id/lesson/:lessonId
    │
    ├─ Page mounts
    │
    ├─ Fetch: GET /api/courses/:id
    │
    ├─ Find lesson in modules array
    │
    ├─ Render LessonView with:
    │   ├─ VideoPlayer (lesson.videoUrl)
    │   ├─ Course outline sidebar
    │   └─ Lesson details
    │
    ├─ User watches video
    │
    ├─ Video completes
    │
    ├─ Call: POST /api/progress/mark-complete
    │
    └─ Update UI + show next lesson option
```

### 3. Video Playback Flow

```
VideoPlayer mounts
    │
    ├─ Load video metadata
    ├─ Show thumbnail/poster
    ├─ Ready to play
    │
    ├─ User clicks play
    │   │
    │   ├─ video.play()
    │   ├─ Update isPlaying state
    │   ├─ Show controls
    │   └─ Update time regularly
    │
    ├─ User interacts with controls
    │   ├─ Seek: video.currentTime = position
    │   ├─ Volume: video.volume = level
    │   ├─ Speed: video.playbackRate = rate
    │   └─ Fullscreen: requestFullscreen()
    │
    ├─ Video ends
    │   │
    │   ├─ Trigger onComplete callback
    │   ├─ Mark lesson as complete
    │   └─ Show completion message
    │
    └─ Video stops
```

## Component Hierarchy

```
LessonDetailPage
├─ LessonView
│  ├─ VideoPlayer
│  │  ├─ Video Element
│  │  ├─ Play Button (overlay)
│  │  ├─ Controls Bar
│  │  │  ├─ Progress Bar
│  │  │  ├─ Time Display
│  │  │  ├─ Volume Control
│  │  │  ├─ Speed Selector
│  │  │  ├─ Fullscreen Button
│  │  │  └─ Settings Menu
│  │  └─ Loading Spinner
│  │
│  ├─ Lesson Header
│  │  ├─ Title
│  │  ├─ Duration
│  │  ├─ Bookmark Button
│  │  └─ Share Button
│  │
│  ├─ Lesson Info
│  │  ├─ Description
│  │  └─ Resources List
│  │
│  ├─ Navigation Buttons
│  │  ├─ Previous Lesson
│  │  └─ Next Lesson/Module
│  │
│  └─ Course Outline Sidebar
│     ├─ Module Accordion
│     │  └─ Lesson List
│     └─ Progress Indicator
│
└─ Error States
   └─ Loading Spinner
```

## API Integration Map

```
Frontend Components          Backend Endpoints
───────────────────         ──────────────────

VideoPlayer       ◄────────  No direct API calls
                             (receives data from parent)

LessonView        ◄────────  /api/progress/mark-complete
                             (POST on video completion)

LessonDetailPage  ◄────────  /api/courses/:id
                  ◄────────  /api/purchases/check/:id
                  ◄────────  /api/progress/mark-complete

CourseDetailPage  ◄────────  /api/courses/:id
                  ◄────────  /api/purchases/create
                  ◄────────  /api/purchases/check/:id
```

## State Management

### VideoPlayer State

```
State Variables:
├─ isPlaying: boolean
├─ currentTime: number
├─ duration: number (from props)
├─ volume: number (0-100)
├─ isMuted: boolean
├─ playbackRate: number (0.5-2)
├─ showControls: boolean
├─ isFullscreen: boolean
└─ showSettings: boolean
```

### LessonView State

```
State Variables:
├─ isBookmarked: boolean
├─ expandedModule: string (module ID)
├─ showNotesPanel: boolean
├─ notes: string
└─ Navigation state from props
```

### LessonDetailPage State

```
State Variables:
├─ course: object
├─ lesson: object
├─ module: object
├─ loading: boolean
├─ error: string
└─ myAccess: array (user's access rights)
```

## Authentication & Authorization Flow

```
User Request
    │
    ├─ Token check: useAuth() hook
    │
    ├─ Free Preview Content?
    │   ├─ Yes ──► Show video immediately
    │   └─ No  ──► Check purchase status
    │
    ├─ Check: GET /api/purchases/check/:courseId
    │
    ├─ Purchase Status?
    │   ├─ Purchased ──► Show video
    │   ├─ Not Purchased ──► Show lock
    │   └─ Free Course ──► Show video
    │
    └─ Include token in requests (axios interceptor)
       └─ Authorization: Bearer <token>
```

## Error Handling Architecture

```
Error Occurs
    │
    ├─ API Error
    │   ├─ 401 Unauthorized ──► Redirect to login
    │   ├─ 403 Forbidden ──► Show lock screen
    │   ├─ 404 Not Found ──► Show error page
    │   └─ 5xx Server Error ──► Show retry option
    │
    ├─ Video Error
    │   ├─ Network ──► Show retry
    │   ├─ Format ──► Show supported formats
    │   └─ Missing ──► Show error message
    │
    └─ Component Error
        ├─ Missing Data ──► Show placeholder
        └─ Loading Error ──► Show spinner
```

## Performance Optimization

```
Load Optimization:
├─ Code Splitting
│  ├─ VideoPlayer: Lazy loaded when needed
│  └─ LessonView: Dynamic import
│
├─ Image Optimization
│  ├─ Thumbnails: WebP format, optimized
│  └─ Posters: Next.js Image component
│
├─ Caching Strategy
│  ├─ Course data: Server-side cache
│  ├─ Video metadata: Browser cache
│  └─ User progress: IndexedDB
│
└─ Rendering Optimization
   ├─ Memoization: memo() for components
   ├─ Callbacks: useCallback for event handlers
   ├─ State: Minimal re-renders
   └─ Animations: GPU-accelerated (Framer Motion)
```

## File Organization

```
app/
├── skill-academy/
│   └── courses/
│       ├── [id]/
│       │   ├── page.jsx (Course Detail - Updated ✅)
│       │   ├── lesson/
│       │   │   └── [lessonId]/
│       │   │       └── page.jsx (Lesson Detail - NEW ✅)
│       │   └── layout.jsx
│       ├── page.jsx (Courses List)
│       └── layout.jsx

components/
├── ui/
│   ├── VideoPlayer.jsx (NEW ✅)
│   ├── LessonView.jsx (NEW ✅)
│   ├── toast.jsx
│   └── [other UI components]

context/
├── AuthContext.jsx (User auth)

services/
├── courseService.js
├── purchaseService.js
└── progressService.js (planned)

lib/
├── axios.js (API client with auth)
└── [utilities]
```

## Technologies Used

```
Frontend Stack:
├─ Next.js 14.2.16 (Framework)
├─ React 18+ (UI Library)
├─ Tailwind CSS (Styling)
├─ Framer Motion (Animations)
├─ Lucide React (Icons)
├─ HTML5 Video API (Video Playback)
└─ Context API (State Management)

Backend Integration:
├─ Axios (HTTP Client)
├─ Express.js (Backend Framework)
├─ MongoDB (Database)
└─ JWT Authentication (Security)
```

## Deployment Architecture

```
                    ┌─────────────────┐
                    │  Git Repository │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  Build Process  │
                    │ (npm run build) │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐        ┌──────▼──────┐     ┌─────▼────┐
   │ Staging │        │ Development │     │Production│
   │Environment       │ Environment │     │Environment
   └────┬────┘        └──────┬──────┘     └─────┬────┘
        │                    │                   │
   ┌────▼──────────────────────────────────────▼────┐
   │         CDN (Video Hosting)                    │
   │    - Optimize & Cache Videos                   │
   │    - Serve from Edge Locations                 │
   └──────────────────────────────────────────────────┘
```

## Security Architecture

```
Client Request
    │
    ├─ Validate CORS headers
    │
    ├─ Check Authentication
    │   └─ Token valid?
    │
    ├─ Authorization Check
    │   ├─ Free content?
    │   └─ Purchased?
    │
    ├─ Rate Limiting
    │   └─ Prevent API abuse
    │
    └─ HTTPS Only
       └─ Encrypt data in transit
```

## Monitoring & Analytics

```
VideoPlayer Events:
├─ Video Started
├─ Video Paused
├─ Video Resumed
├─ Video Completed
├─ Quality Selected
├─ Speed Changed
├─ Error Occurred
└─ Fullscreen Toggled

Metrics Tracked:
├─ Completion Rate
├─ Average Watch Time
├─ Drop-off Points
├─ Error Rates
├─ Load Times
├─ Player Performance
└─ User Engagement
```

---

**Version**: 1.0  
**Architecture Type**: Microservices-Ready  
**Status**: ✅ Production Ready
