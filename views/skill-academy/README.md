# Skill Academy Components

Professional, modular component structure for the Sabka Skill Academy website.

## 📁 Folder Structure

```
views/skill-academy/
├── components/          # Reusable UI components
│   ├── FloatingElement.jsx      # Floating animation wrapper
│   ├── MagneticButton.jsx       # Interactive magnetic button
│   ├── ParallaxSection.jsx      # Parallax scroll effect
│   ├── MouseFollower.jsx        # Mouse tracking cursor
│   └── FAQItem.jsx              # FAQ accordion item
├── sections/            # Page sections
│   ├── Hero.jsx                 # Hero section with CTA
│   ├── Stats.jsx                # Statistics cards
│   ├── FeaturedCourses.jsx      # Featured courses grid
│   ├── Features.jsx             # Features showcase
│   ├── FAQ.jsx                  # FAQ section
│   ├── CTA.jsx                  # Call-to-action section
│   └── Footer.jsx               # Footer with links
├── index.js             # Barrel export file
└── README.md            # This file
```

## 🎯 Components

### Reusable Components

#### FloatingElement
Wraps children with floating animation effect.
```jsx
<FloatingElement delay={0} duration={3}>
  <div>Content</div>
</FloatingElement>
```

#### MagneticButton
Interactive button with magnetic cursor effect.
```jsx
<MagneticButton href="/path" className="...">
  Button Text
</MagneticButton>
```

#### ParallaxSection
Applies parallax scroll effect to children.
```jsx
<ParallaxSection speed={0.3}>
  <section>Content</section>
</ParallaxSection>
```

#### MouseFollower
Animated cursor that follows mouse movement.
```jsx
<MouseFollower mousePosition={mousePosition} />
```

#### FAQItem
Single FAQ accordion item.
```jsx
<FAQItem 
  faq={faqData}
  index={0}
  isOpen={true}
  onToggle={() => {}}
/>
```

### Page Sections

#### Hero
Full-screen hero section with:
- Animated background elements
- Two-column layout (text + image)
- CTA buttons
- Scroll indicator

#### Stats
Statistics showcase with:
- 4 stat cards
- Animated icons
- Parallax effect

#### FeaturedCourses
Featured courses grid with:
- Course cards with images
- Floating animated icons
- Course metadata
- Enroll buttons

#### Features
Features showcase with:
- 4 feature cards
- Rotating icons
- Hover effects

#### FAQ
FAQ section with:
- Expandable FAQ items
- Smooth animations
- Contact support link

#### CTA
Call-to-action section with:
- Animated background
- Primary and secondary buttons
- Engaging copy

#### Footer
Footer with:
- Brand information
- Social links
- Link sections (Courses, Company, Support, Legal)
- Contact information
- Copyright notice

## 🚀 Usage

### Import All Components
```jsx
import {
  MouseFollower,
  Hero,
  Stats,
  FeaturedCourses,
  Features,
  FAQ,
  CTA,
  Footer,
} from "@/views/skill-academy";
```

### Use in Page
```jsx
export default function SkillAcademyHome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative">
      <MouseFollower mousePosition={mousePosition} />
      <Hero />
      <Stats />
      <FeaturedCourses />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
```

## 🎨 Design System

- **Colors**: Purple/Pink gradients with gray accents
- **Spacing**: Full-width sections with `max-w-[95%]` containers
- **Animations**: Framer Motion for smooth effects
- **Responsive**: Mobile-first design with Tailwind CSS
- **Professional**: Solid design (no glassmorphism)

## 📦 Dependencies

- `framer-motion` - Animations
- `next/link` - Navigation
- `lucide-react` - Icons
- `tailwindcss` - Styling

## ✨ Features

- ✅ Fully responsive design
- ✅ Smooth animations
- ✅ Professional appearance
- ✅ Modular structure
- ✅ Easy to customize
- ✅ Performance optimized
- ✅ Accessibility friendly

## 🔧 Customization

Each component can be customized by:
1. Modifying component props
2. Updating Tailwind classes
3. Changing animation timings
4. Adjusting data arrays

## 📝 Notes

- All components use `"use client"` directive for Next.js
- Components are self-contained and reusable
- Data is defined within each section component
- Styling uses Tailwind CSS utility classes
- Animations use Framer Motion

## 🎯 Best Practices

1. Keep components focused and single-purpose
2. Use meaningful prop names
3. Document complex animations
4. Test responsive behavior
5. Maintain consistent styling
6. Use semantic HTML
7. Optimize images and assets

---

**Last Updated**: November 13, 2025  
**Version**: 1.0.0
