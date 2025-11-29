# 🎨 Visual Guide - Course Purchase & Certificate System

## What You'll See in Your App

### 1. Course Detail Page - Before vs After

#### BEFORE (Course Page Without Demo Button)
```
┌─────────────────────────────────────────┐
│          Course Detail Page             │
├─────────────────────────────────────────┤
│                                          │
│  Course Title                           │
│  Description                            │
│  Video Player                           │
│                                          │
│  Course Content                         │  
│  Modules & Lessons                      │
│                                          │
│                          ┌────────────┐ │
│                          │ Buy Button │ │
│                          └────────────┘ │
│                                          │
└─────────────────────────────────────────┘
```

#### AFTER (With New Demo Button)
```
┌─────────────────────────────────────────┐
│          Course Detail Page             │
├─────────────────────────────────────────┤
│                                          │
│  Course Title                           │
│  Description                            │
│  Video Player                           │
│                                          │
│  Course Content                         │  
│  Modules & Lessons                      │
│                                          │
│                          ┌──────────────────┐
│                          │ Buy Comp. Bundle │ ← Primary Button
│                          │   (Purple Gradient)
│                          └──────────────────┘
│                          ┌──────────────────┐
│                          │ ▶ Try Demo       │ ← NEW Button!
│                          │   (Outlined)     │
│                          └──────────────────┘
│                                          │
└─────────────────────────────────────────┘
```

---

### 2. Button States & Interactions

#### BUY BUTTON - Different States

**State 1: Normal (Not Purchased)**
```
┌─────────────────────────────────────────┐
│ 🛒 Buy Complete Bundle                   │
│ (Purple gradient with shadow)            │
└─────────────────────────────────────────┘
```

**State 2: Processing (Clicked)**
```
┌─────────────────────────────────────────┐
│ 🛒⟳ Processing...                        │
│ (Spinner animation, button disabled)     │
└─────────────────────────────────────────┘
```

**State 3: Success (Already Purchased)**
```
┌─────────────────────────────────────────┐
│ ✓ Go to Course                           │
│ (Green checkmark, clickable)             │
└─────────────────────────────────────────┘
```

#### TRY DEMO BUTTON - States

**Normal State**
```
┌─────────────────────────────────────────┐
│ ▶ Try Course Demo                        │
│ (White outline, hover effect)            │
└─────────────────────────────────────────┘
```

**Hover State**
```
┌─────────────────────────────────────────┐
│ ▶ Try Course Demo                        │
│ (Brighter outline, light background)    │
└─────────────────────────────────────────┘
```

**When Hidden (Already Purchased)**
```
[Button doesn't appear]
```

---

### 3. Toast Notifications - What You'll See

#### Demo Button Toast
```
╔════════════════════════════════════════════╗
║ ℹ️  Demo Access Enabled                    ║
║                                            ║
║ You can now preview the course content.   ║
║ Purchase to unlock full access and earn   ║
║ certificates.                             ║
║                                            ║
║ [Auto-close in 3 seconds]                 ║
╚════════════════════════════════════════════╝
```
Position: Top-right corner

#### Buy Button - Start Toast
```
╔════════════════════════════════════════════╗
║ ℹ️  Demo Purchase Mode                     ║
║                                            ║
║ In production, this would redirect to     ║
║ payment gateway. Purchase recorded for    ║
║ testing.                                   ║
║                                            ║
║ [Auto-close in 3 seconds]                 ║
╚════════════════════════════════════════════╝
```

#### Buy Button - Success Toast
```
╔════════════════════════════════════════════╗
║ ✓ Course unlocked!                         ║
║                                            ║
║ You now have full access to all modules.  ║
║ Complete the course to earn your          ║
║ certificate!                              ║
║                                            ║
║ [Auto-close in 3 seconds]                 ║
╚════════════════════════════════════════════╝
```

---

### 4. Lesson Completion Flow

#### Lesson View (Two-Column Layout)
```
┌────────────────────────────────────────────────────────┐
│           Lesson View                                  │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────┐  ┌─────────┐   │
│  │                                   │  │ Modules │   │
│  │      VIDEO PLAYER                 │  │ ──────  │   │
│  │   (with watermark)                │  │ ✓ Intro│   │
│  │                                   │  │ ✓ Part1│   │
│  │  ▶  ⏸  🔊  ────●──── ⛶          │  │ ⟳ Part2│   │
│  │  0:00        5:00    10:00        │  │ • Part3│   │
│  │                                   │  │         │   │
│  │ [Mark Complete Button]            │  │ ────────│   │
│  │                                   │  │ Notes:  │   │
│  └──────────────────────────────────┘  │ Panel   │   │
│                                         │ ────────│   │
│                                         └─────────┘   │
│                                                         │
└────────────────────────────────────────────────────────┘
```

#### Watermark on Video
```
┌──────────────────────────────────────────┐
│ 📧 student@example.com                    │
│ Sabka Pro Logo                            │
│                                           │
│  [Video Content Area]                     │
│                                           │
│  [Video continues...]                     │
│                                           │
└──────────────────────────────────────────┘
(Shows at top-left, semi-transparent, during playback)
```

---

### 5. Certificate Modal - On Completion

#### When Last Lesson Completed
```
╔════════════════════════════════════════════════════════╗
║                  Certificate Modal                    ║
║                                                        ║
║                     🎓 CERTIFICATE                    ║
║                    OF COMPLETION                      ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │                                                   │ ║
║  │    ★  This is to certify that  ★                │ ║
║  │                                                   │ ║
║  │       John Doe                                    │ ║
║  │                                                   │ ║
║  │    Has Successfully Completed the Course         │ ║
║  │                                                   │ ║
║  │       React Fundamentals                         │ ║
║  │                                                   │ ║
║  │    Completion Date: December 28, 2024            │ ║
║  │    Certificate ID: CERT-1735376402               │ ║
║  │                                                   │ ║
║  │    Sabka Pro Hiring                              │ ║
║  │                                                   │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  [Download as PDF] [Download as PNG]                  ║
║                                                        ║
║  ✓ Course Completed Successfully!                     ║
║    Share your achievement with others.               ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

#### Certificate Design Elements
- **Background:** Golden/Amber gradient (parchment effect)
- **Border:** Decorative corner elements
- **Icons:** Award and certificate icons
- **Text:** Professional serif font
- **Colors:** Gold, cream, and dark text
- **Layout:** Centered, balanced, professional

---

### 6. Certificates Page - `/skill-academy/certificates`

#### Desktop View (3 Columns)
```
┌──────────────────────────────────────────────────────┐
│  My Certificates                                     │
│  View and download all your earned certificates     │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────┐  ┌──────────────────┐         │
│  │  🎓             │  │  🎓             │         │
│  │                │  │                │         │
│  │ React          │  │ Node.js       │         │
│  │ Fundamentals  │  │ Mastery       │         │
│  │                │  │                │         │
│  │ Completed:    │  │ Completed:    │         │
│  │ Dec 28, 2024  │  │ Dec 20, 2024  │         │
│  │                │  │                │         │
│  │ [PDF] [PNG]    │  │ [PDF] [PNG]    │         │
│  └──────────────────┘  └──────────────────┘         │
│                                                      │
│  ┌──────────────────┐                                │
│  │  🎓             │                                │
│  │                │                                │
│  │ JavaScript     │                                │
│  │ Advanced       │                                │
│  │                │                                │
│  │ Completed:    │                                │
│  │ Dec 15, 2024  │                                │
│  │                │                                │
│  │ [PDF] [PNG]    │                                │
│  └──────────────────┘                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### Mobile View (1 Column)
```
┌────────────────────────┐
│ My Certificates        │
│ View and download all  │
│ your earned certs      │
├────────────────────────┤
│                        │
│ ┌──────────────────────┐
│ │  🎓                 │
│ │                     │
│ │ React Foundation   │
│ │                     │
│ │ Completed:         │
│ │ Dec 28, 2024       │
│ │                     │
│ │ [PDF] [PNG]        │
│ └──────────────────────┘
│                        │
│ ┌──────────────────────┐
│ │  🎓                 │
│ │                     │
│ │ Node.js Mastery    │
│ │                     │
│ │ Completed:         │
│ │ Dec 20, 2024       │
│ │                     │
│ │ [PDF] [PNG]        │
│ └──────────────────────┘
│                        │
└────────────────────────┘
```

#### Empty State (No Certificates)
```
┌────────────────────────────────────────┐
│  My Certificates                       │
├────────────────────────────────────────┤
│                                        │
│                 🎓                     │
│                                        │
│    No certificates yet                 │
│                                        │
│  Complete a course to earn your first │
│  certificate                           │
│                                        │
│  [Browse Courses →]                    │
│                                        │
└────────────────────────────────────────┘
```

---

### 7. Download File Names

#### PDF Download
```
When you download, you get file:

📄 John_Doe_Certificate_React_Fundamentals.pdf

Opens with: PDF Reader (Adobe, Preview, etc.)
Size: ~200KB
Format: A4 Landscape
```

#### PNG Download
```
When you download, you get file:

🖼️ John_Doe_Certificate_React_Fundamentals.png

Opens with: Image viewer, browser, etc.
Size: ~300-400KB
Format: High-resolution image (1200×850px)
```

---

### 8. Complete User Flow (Visual)

```
STUDENT JOURNEY - Visual Timeline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. BROWSE COURSE
   ↓
   [Course Detail Page]
   ├─ Try Demo Button ↓
   │  └─ Toast: "Demo Access Enabled"
   │
   └─ Buy Button ↓
      └─ Toast: "Demo Purchase Mode"
      └─ Processing spinner
      └─ Toast: "Course Unlocked!"
      └─ Navigate to Course View

2. LEARN COURSE
   ↓
   [View Each Lesson]
   ├─ See Video Player
   ├─ See Watermark (email + logo)
   ├─ Mark Lesson Complete
   └─ Toast: "Lesson Complete"
   
   (Repeat for each lesson)

3. COMPLETE COURSE
   ↓
   [Last Lesson Complete]
   ├─ API checks course completion
   └─ 🎓 Certificate Modal appears
      ├─ Shows student name
      ├─ Shows course title
      ├─ Shows completion date
      └─ Shows certificate ID

4. DOWNLOAD CERTIFICATE
   ↓
   [In Certificate Modal]
   ├─ Click "Download PDF"
   │  └─ FileDownload: studentname_cert.pdf
   │
   └─ Click "Download PNG"
      └─ FileDownload: studentname_cert.png

5. VIEW ANYTIME
   ↓
   [/skill-academy/certificates]
   ├─ See all earned certificates
   ├─ View certificate cards
   └─ Download again anytime

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### 9. Color & Style Reference

#### Buttons
```
Buy Complete Bundle (Primary)
┌────────────────────────────┐
│ 🛒 Buy Complete Bundle     │
│ (Purple gradient)           │
│ Background: #692c7a → #9463a8
│ Text: White                │
│ Shadow: Purple glow        │
└────────────────────────────┘

Try Demo (Secondary)
┌────────────────────────────┐
│ ▶ Try Course Demo          │
│ (Outlined white)            │
│ Border: white/30% opacity   │
│ Text: White                │
│ Hover: Slight background   │
└────────────────────────────┘
```

#### Toasts
```
Info Toast (Blue)
╔────────────────────────╗
║ ℹ️  Title              ║
║ Message text here      ║
║ [3 second auto-close]  ║
╚────────────────────────╝

Success Toast (Green)
╔────────────────────────╗
║ ✓ Title               ║
║ Message text here      ║
║ [3 second auto-close]  ║
╚────────────────────────╝
```

#### Certificate Colors
```
Main Certificate:
- Background: Amber gradient (gold parchment effect)
- Text: Dark brown/black for contrast
- Borders: Gold decorative elements
- Icons: Warm gold/amber tones
- Overall: Professional, elegant, celebratory
```

---

### 10. Responsive Breakpoints

#### Mobile (< 768px)
- Buttons stack vertically
- One column certificate grid
- Sidebar on lesson view stacks below video
- Full-width components
- Larger touch targets

#### Tablet (768px - 1024px)
- Buttons side-by-side (if space allows)
- Two column certificate grid
- Lesson view: video top, sidebar below (or side by side)
- Better spacing

#### Desktop (> 1024px)
- Buttons horizontal layout
- Three column certificate grid
- Two-column lesson layout (video 2/3, sidebar 1/3)
- Full sidebar navigation

---

### 11. Animation Examples

#### Button Hover Effects
```
Buy Button:
  Hover → Darker gradient + Larger shadow

Demo Button:
  Hover → Brighter border + Light background tint

Processing:
  Spinner → Continuous rotation
  Duration → Until API responds (~2-3 seconds)
```

#### Toast Animations
```
Appearance:
  Slide-in from top-right
  Duration: 200ms spring animation

Disappearance:
  Fade out
  Duration: 300ms
  After: 3 seconds of display
```

#### Modal Animations
```
Certificate Modal:
  Spring animation on appear
  Spring bounce effect
  Staggered animations for content

Download Button:
  Spinner during conversion
  Smooth fade on completion
```

---

### 12. Error States

#### Network Error
```
╔════════════════════════════════════════╗
║ ✗ Error                                ║
║                                        ║
║ Could not complete purchase.           ║
║ Please check your connection and try   ║
║ again.                                 ║
║                                        ║
║ [Retry] [Cancel]                       ║
╚════════════════════════════════════════╝
```

#### Download Error
```
╔════════════════════════════════════════╗
║ ✗ Download Failed                      ║
║                                        ║
║ Could not generate certificate.        ║
║ Try again or contact support.          ║
╚════════════════════════════════════════╝
```

---

## 🎬 Animation Timing

| Animation | Duration | Type |
|-----------|----------|------|
| Button hover | 200ms | Spring |
| Toast appear | 200ms | Spring |
| Toast disappear | 300ms | Fade |
| Modal appear | 300ms | Spring |
| Spinner | Continuous | Rotate |
| Download status | Instant | Spinner → Done |

---

## 📱 Screen Sizes Tested

- ✅ Mobile: 375px width (iPhone SE)
- ✅ Mobile: 414px width (iPhone 12)
- ✅ Tablet: 768px width (iPad)
- ✅ Laptop: 1024px width (Small laptop)
- ✅ Desktop: 1440px width (Standard monitor)
- ✅ Large: 1920px width (Large monitor)

---

## ✅ You're All Set!

This is what your students will see. Everything is visually polished, responsive, and professional. Start testing now! 🚀
