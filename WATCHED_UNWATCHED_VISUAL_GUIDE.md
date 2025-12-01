# Professional Watched/Unwatched Lesson Indicators - Visual Guide

## Course Detail Page - Lesson List

```
╔═══════════════════════════════════════════════════════════════════════════╗
║  COURSE: Advanced Next.js Mastery                                         ║
╚═══════════════════════════════════════════════════════════════════════════╝

MODULE 1: Fundamentals
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 ✓   [Lesson 1: Getting Started (COMPLETED)]
 ┌─────────────────────────────────────────────────────────────────────┐
 │                                                                     │
 │  [✓] Setup Your Environment                           23:45 [✓] ✓  │  ← 100% opacity
 │      ✓ Completed                                                   │      Bright text & badge
 │                                                                     │
 │  [◯] Installation & Dependencies                     15:20 [◯] ▶   │  ← 75% opacity
 │      ◯ Unwatched                                                   │      Muted text & badge
 │                                                                     │
 │  [🔒] Advanced Configuration                         18:30 [🔒] 🔒  │  ← 60% opacity
 │       (Locked)                                                     │      Faded text
 │                                                                     │
 │  [▶] First App Creation                              42:15 [🆓] 🆓   │  ← 100% opacity
 │      🆓 Free Preview                                               │      Free badge
 │                                                                     │
 └─────────────────────────────────────────────────────────────────────┘

MODULE 2: Advanced Patterns
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 ◯   [Lesson 2: Server Components (NOT STARTED)]
 ┌─────────────────────────────────────────────────────────────────────┐
 │                                                                     │
 │  [◯] Understanding Server Components                 28:15 [◯] ▶   │  ← 75% opacity
 │      ◯ Unwatched                                                   │      Muted
 │                                                                     │
 │  [◯] State Management in Server                      19:45 [◯] ▶   │  ← 75% opacity
 │      ◯ Unwatched                                                   │      Muted
 │                                                                     │
 │  [🔒] Advanced Patterns                              35:50 [🔒] 🔒  │  ← 60% opacity
 │       (Locked)                                                     │      Faded
 │                                                                     │
 └─────────────────────────────────────────────────────────────────────┘
```

## Key Visual Elements Explained

### Opacity Levels

```
LOCKED (60%)                    UNWATCHED (75%)                COMPLETED (100%)
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│ ░░░░░░░░░░░░░░░ │           │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │           │ ████████████████ │
│ Setup Environment│ Faded     │ Your First App   │ Muted     │ Getting Started  │ Bright
│                  │           │                  │           │                  │
│ ░░░░░░░░░░░░░░░ │           │ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │           │ ████████████████ │
│   (Locked) [🔒] │           │ Unwatched [◯] ▶ │           │ Completed ✓ [✓] │
└──────────────────┘           └──────────────────┘           └──────────────────┘
```

### Status Icons (Right Side)

```
LOCKED                          UNWATCHED                       COMPLETED
┌─────────────────┐            ┌─────────────────┐            ┌─────────────────┐
│ [🔴 🔒]         │ Red Lock   │ [🟢 ▶]          │ Green      │ [🟢 ✓]          │ Green
│ Strongly        │ (stop)     │ Play Icon       │ (ready)    │ Checkmark       │ (done)
│ Indicates       │            │ (watch)         │            │ (completed)     │
│ Restricted      │            │                 │            │                 │
│ Access          │            │                 │            │                 │
└─────────────────┘            └─────────────────┘            └─────────────────┘

COLORS:
Red:        #dc2626 (Red-500) - Cannot access
Green:      #10b981 (Emerald-500) - Can access
Gray:       #6b7280 (Gray-500) - Locked text
```

### Badge System

```
COMPLETED BADGE                 UNWATCHED BADGE                FREE PREVIEW BADGE
┌──────────────────────────┐    ┌──────────────────────────┐    ┌──────────────────┐
│ ✓ Completed              │    │ ◯ Unwatched              │    │ 🆓 Free Preview  │
│ [Emerald-200 text]       │    │ [Gray-300 text]          │    │ [Blue-200 text]  │
│ Background:              │    │ Background:              │    │ Background:      │
│ emerald-500/30           │    │ gray-500/20              │    │ blue-500/20      │
│ Border: emerald-500/50   │    │ Border: gray-500/40      │    │ Border:          │
│                          │    │                          │    │ blue-500/40      │
└──────────────────────────┘    └──────────────────────────┘    └──────────────────┘
```

## Lesson States Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION FLOW                             │
└─────────────────────────────────────────────────────────────────────────┘

START: User opens course
  │
  ├─ Load course data + progress
  │
  ├─ For each lesson, determine state:
  │  │
  │  ├─ Is locked? (No access + Not free preview)
  │  │  │
  │  │  ├─ YES → LOCKED STATE
  │  │  │         • Icon: Lock (Red)
  │  │  │         • Opacity: 60%
  │  │  │         • Color: Gray-500
  │  │  │         • Badge: None
  │  │  │         • Click: Disabled
  │  │  │
  │  │  └─ NO → Can access
  │  │         │
  │  │         ├─ Is completed?
  │  │         │  │
  │  │         │  ├─ YES → COMPLETED STATE
  │  │         │  │         • Icon: Checkmark (Emerald)
  │  │         │  │         • Opacity: 100%
  │  │         │  │         • Color: White
  │  │         │  │         • Badge: ✓ Completed
  │  │         │  │         • Click: Navigate to lesson
  │  │         │  │
  │  │         │  └─ NO → UNWATCHED STATE
  │  │         │          • Icon: Play (Emerald)
  │  │         │          • Opacity: 75%
  │  │         │          • Color: Gray-300
  │  │         │          • Badge: ◯ Unwatched
  │  │         │          • Click: Navigate to lesson
  │  │
  │  └─ Special case: Free preview?
  │     If free → Always accessible
  │     Add "Free Preview" badge
  │
  └─ Render with styling
```

## Real Code Output Example

### HTML Structure (Simplified)

```html
<!-- COMPLETED LESSON -->
<div class="flex items-center gap-3 p-4 rounded-lg opacity-100">
  <!-- Icon Circle -->
  <div
    class="w-10 h-10 rounded-lg bg-emerald-500/40 border border-emerald-500/60"
  >
    <!-- Checkmark Icon -->
  </div>

  <!-- Info Section -->
  <div class="flex-1 opacity-100">
    <div class="flex items-center gap-2">
      <h4 class="text-white">Getting Started</h4>
      <span class="badge emerald">✓ Completed</span>
    </div>
    <span class="text-gray-300">23:45</span>
  </div>

  <!-- Status Icon -->
  <div class="w-8 h-8 rounded-lg bg-emerald-500/40">
    <!-- Checkmark Icon -->
  </div>
</div>

<!-- UNWATCHED LESSON -->
<div class="flex items-center gap-3 p-4 rounded-lg opacity-75">
  <!-- Icon Circle -->
  <div
    class="w-10 h-10 rounded-lg bg-emerald-500/30 border border-emerald-500/50"
  >
    <!-- Play Icon -->
  </div>

  <!-- Info Section -->
  <div class="flex-1 opacity-75">
    <div class="flex items-center gap-2">
      <h4 class="text-gray-300">Your First App</h4>
      <span class="badge gray">◯ Unwatched</span>
    </div>
    <span class="text-gray-400">42:15</span>
  </div>

  <!-- Status Icon -->
  <div class="w-8 h-8 rounded-lg bg-emerald-500/30">
    <!-- Play Icon -->
  </div>
</div>

<!-- LOCKED LESSON -->
<div class="flex items-center gap-3 p-4 rounded-lg opacity-60">
  <!-- Icon Circle -->
  <div class="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40">
    <!-- Lock Icon -->
  </div>

  <!-- Info Section -->
  <div class="flex-1 opacity-60">
    <div class="flex items-center gap-2">
      <h4 class="text-gray-500">Advanced Config</h4>
    </div>
    <span class="text-gray-500">18:30</span>
  </div>

  <!-- Status Icon -->
  <div class="w-8 h-8 rounded-lg bg-red-500/20">
    <!-- Lock Icon -->
  </div>
</div>
```

## Color Palette

### Emerald (Accessible/Completed)

```
Text:              #10b981 (emerald-500)
Light Text:        #a7f3d0 (emerald-200)
Background:        rgba(16, 185, 129, 0.3) or 0.4
Border:            rgba(16, 185, 129, 0.5) or 0.6
Hover:             rgba(16, 185, 129, 0.5)
Shadow:            rgba(16, 185, 129, 0.3)
```

### Red (Locked)

```
Text:              #ef4444 (red-500)
Light Text:        #fca5a5 (red-200)
Background:        rgba(239, 68, 68, 0.2)
Border:            rgba(239, 68, 68, 0.4)
```

### Gray (Muted/Disabled)

```
Text (Locked):     #6b7280 (gray-500)
Text (Unwatched):  #d1d5db (gray-300)
Text (Duration):   #9ca3af (gray-400)
```

### Blue (Free Preview)

```
Text:              #3b82f6 (blue-500)
Light Text:        #93c5fd (blue-200)
Background:        rgba(59, 130, 246, 0.2)
Border:            rgba(59, 130, 246, 0.4)
```

## Accessibility Features

✅ **High Contrast:**

- White text on dark backgrounds
- Color-coded icons (red/green/gray)
- Opacity levels provide visual hierarchy

✅ **Icons + Text:**

- Never rely on color alone
- Icons + badges provide meaning
- Text labels always present

✅ **Interactive Feedback:**

- Hover effects (background brightens)
- Smooth transitions (300ms)
- Clear cursor changes (clickable vs locked)

✅ **Screen Readers:**

- Semantic HTML structure
- Meaningful alt text on icons
- Badge text provides context

## Responsive Design

### Desktop (>1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│ [ICON] Lesson Title         [BADGE] [DURATION] [STATUS ICON]   │
└─────────────────────────────────────────────────────────────────┘
Full spacing, all elements visible
```

### Tablet (768px-1024px)

```
┌──────────────────────────────────────────────────────────────┐
│ [ICON] Lesson Title    [BADGE] [DURATION] [STATUS ICON]    │
└──────────────────────────────────────────────────────────────┘
Slightly condensed spacing
```

### Mobile (<768px)

```
┌────────────────────────────────────┐
│ [ICON] Lesson Title                │
│        [BADGE]                     │
│        [DURATION]                  │
│        [STATUS]                    │
└────────────────────────────────────┘
Stacked layout, simplified display
```

## Animation Timing

```
Opacity Transition:     300ms ease-in-out
Hover Effect:           300ms ease-in-out
Background Change:      300ms ease-in-out
Border Change:          300ms ease-in-out
Icon Color Change:      300ms ease-in-out
```

## Performance Impact

✅ **Minimal:**

- No animation heavy effects
- Set-based lookups (O(1))
- Single progress API call per course load
- CSS transitions (GPU accelerated)
- No layout shifts

## Browser Support

✅ **All Modern Browsers:**

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

CSS Features Used:

- `opacity` - Full support
- `transition` - Full support
- `background-gradient` - Full support
- `border` - Full support
