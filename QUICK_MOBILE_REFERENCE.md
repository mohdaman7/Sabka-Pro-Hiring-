# 📱 Quick Mobile Responsive Reference Card

## 🎯 Copy-Paste Patterns

### 1. Responsive Container
```jsx
<div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">
  {/* Your content */}
</div>
```

### 2. Responsive Grid (1-2-3 columns)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
  {items.map(item => (
    <div key={item.id}>Card</div>
  ))}
</div>
```

### 3. Responsive Stats Grid (2-4 columns)
```jsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
  {stats.map(stat => (
    <div key={stat.id} className="p-4 md:p-6">Stat</div>
  ))}
</div>
```

### 4. Responsive Header
```jsx
<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">
  <div>
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Title</h1>
    <p className="text-sm md:text-base text-white/75">Description</p>
  </div>
  <div className="flex gap-2 md:gap-3">
    {/* Buttons */}
  </div>
</div>
```

### 5. Mobile Button (Icon + Text)
```jsx
<button className="px-4 py-2 md:px-6 md:py-3 flex items-center gap-2">
  <Icon className="w-4 h-4 md:w-5 md:h-5" />
  <span className="hidden sm:inline">Button Text</span>
</button>
```

### 6. Responsive Card
```jsx
<div className="rounded-xl md:rounded-2xl p-4 md:p-6 bg-white/5 border border-white/10">
  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Card Title</h3>
  <p className="text-xs md:text-sm text-white/75">Card content</p>
</div>
```

### 7. Mobile Table Alternative
```jsx
{/* Desktop Table */}
<div className="hidden md:block overflow-x-auto">
  <table className="w-full">
    {/* Table content */}
  </table>
</div>

{/* Mobile Card View */}
<div className="md:hidden space-y-3">
  {items.map(item => (
    <div key={item.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
      <div className="flex justify-between mb-2">
        <h4 className="text-sm font-semibold">{item.name}</h4>
        <span className="text-xs text-white/60">{item.date}</span>
      </div>
      <p className="text-xs text-white/75">{item.description}</p>
    </div>
  ))}
</div>
```

### 8. Responsive Search Bar
```jsx
<div className="flex-1 relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/70" />
  <input
    type="text"
    placeholder="Search..."
    className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-sm md:text-base"
  />
</div>
```

### 9. Horizontal Scroll Tabs (Mobile)
```jsx
<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
  {tabs.map(tab => (
    <button
      key={tab.id}
      className="px-4 py-3 md:px-6 md:py-4 rounded-xl whitespace-nowrap flex items-center gap-2"
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
      <span className="hidden sm:inline">{tab.label}</span>
    </button>
  ))}
</div>
```

### 10. Responsive Modal
```jsx
<div className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                bg-white/10 backdrop-blur-xl rounded-none md:rounded-2xl 
                w-full md:w-auto md:max-w-2xl p-4 md:p-6">
  {/* Modal content */}
</div>
```

---

## 🎨 Common Responsive Classes

### Spacing
```
p-3 md:p-6           → Padding
gap-2 md:gap-4       → Gap
space-y-3 md:space-y-6 → Vertical spacing
mb-3 md:mb-4         → Margin bottom
```

### Typography
```
text-xs md:text-sm   → Extra small → Small
text-sm md:text-base → Small → Base
text-base md:text-lg → Base → Large
text-lg md:text-xl   → Large → Extra large
text-2xl md:text-3xl → 2XL → 3XL
```

### Icons
```
w-4 h-4 md:w-5 md:h-5 → Small → Medium
w-8 h-8 md:w-10 md:h-10 → Medium → Large
```

### Borders & Radius
```
rounded-lg md:rounded-xl   → Medium → Large
rounded-xl md:rounded-2xl  → Large → Extra large
border md:border-2         → Thin → Thick
```

### Display
```
hidden md:block      → Hide mobile, show desktop
md:hidden            → Show mobile, hide desktop
hidden sm:inline     → Hide mobile, show tablet+
flex-col md:flex-row → Stack mobile, row desktop
```

---

## ⚡ Quick Fixes

### Problem: Text too large on mobile
```jsx
// Before
<h1 className="text-4xl">

// After
<h1 className="text-2xl md:text-4xl">
```

### Problem: Too much padding on mobile
```jsx
// Before
<div className="p-8">

// After
<div className="p-4 md:p-8">
```

### Problem: Grid too many columns on mobile
```jsx
// Before
<div className="grid grid-cols-4">

// After
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

### Problem: Button text causes overflow
```jsx
// Before
<button>
  <Icon />
  <span>Long Button Text</span>
</button>

// After
<button>
  <Icon />
  <span className="hidden sm:inline">Long Button Text</span>
</button>
```

### Problem: Table not readable on mobile
```jsx
// Add mobile card alternative (see pattern #7 above)
```

---

## 🎯 Breakpoint Reference

```
Default (Mobile)  →  0px - 639px
sm:              →  640px+  (Small tablets)
md:              →  768px+  (Tablets)
lg:              →  1024px+ (Desktops)
xl:              →  1280px+ (Large desktops)
2xl:             →  1536px+ (Extra large)
```

---

## 📏 Size Guidelines

### Touch Targets (Mobile)
- Minimum: 44px × 44px
- Recommended: 48px × 48px
- Use: `p-2` or `p-3` for buttons

### Font Sizes
- Mobile body: `text-sm` (14px)
- Mobile headings: `text-xl` to `text-2xl`
- Desktop body: `text-base` (16px)
- Desktop headings: `text-2xl` to `text-4xl`

### Spacing
- Mobile: `gap-2` (8px), `gap-3` (12px)
- Desktop: `gap-4` (16px), `gap-6` (24px)

---

## ✅ Quick Checklist

Before deploying:
- [ ] All grids are responsive
- [ ] Text sizes scale properly
- [ ] Buttons are touch-friendly (44px+)
- [ ] Tables have mobile alternatives
- [ ] No horizontal scrolling
- [ ] Sidebar works on mobile
- [ ] Forms are usable
- [ ] Images are responsive
- [ ] Modals work on mobile
- [ ] Test on real devices

---

## 🚀 Apply to Any Component in 5 Steps

1. **Wrap in responsive container**
   ```jsx
   <div className="p-3 md:p-6 space-y-4 md:space-y-6">
   ```

2. **Make grids responsive**
   ```jsx
   grid-cols-1 md:grid-cols-2 lg:grid-cols-3
   ```

3. **Scale text sizes**
   ```jsx
   text-sm md:text-base lg:text-lg
   ```

4. **Adjust spacing**
   ```jsx
   gap-3 md:gap-6, p-4 md:p-6
   ```

5. **Hide/show elements**
   ```jsx
   hidden md:block, md:hidden
   ```

---

**Done! Your component is now mobile-responsive! 🎉**
