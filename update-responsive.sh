#!/bin/bash

# Responsive Update Script for Student Portal Components
# Usage: ./update-responsive.sh

echo "🚀 Starting responsive updates for student portal components..."

# List of files to update
FILES=(
  "views/student/StudentProfile.jsx"
  "views/student/StudentJobs.jsx"
  "views/student/StudentCourses.jsx"
  "views/student/StudentInterviews.jsx"
  "views/student/StudentATSResume.jsx"
  "views/student/StudentVideoResume.jsx"
  "views/student/StudentAnalytics.jsx"
  "views/student/StudentSettings.jsx"
  "views/student/StudentSupport.jsx"
  "views/student/StudentUpgrade.jsx"
  "views/student/StudentHistory.jsx"
)

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "📝 Updating $FILE..."
    
    # Main container spacing
    sed -i 's/className="relative p-6 space-y-6/className="relative p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6/g' "$FILE"
    sed -i 's/className="relative p-8 space-y-8/className="relative p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8/g' "$FILE"
    
    # Background effects
    sed -i 's/className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl/className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl/g' "$FILE"
    sed -i 's/className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl/className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl/g' "$FILE"
    sed -i 's/className="absolute top-1\/3 right-1\/4 w-72 h-72 rounded-full blur-2xl/className="absolute top-1\/3 right-1\/4 w-36 h-36 md:w-72 md:h-72 rounded-full blur-xl md:blur-2xl/g' "$FILE"
    
    # Cards and containers
    sed -i 's/className="rounded-3xl p-8/className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8/g' "$FILE"
    sed -i 's/className="rounded-3xl p-6/className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6/g' "$FILE"
    sed -i 's/className="rounded-2xl p-6/className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6/g' "$FILE"
    
    # Grids
    sed -i 's/className="grid grid-cols-4 gap-6/className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6/g' "$FILE"
    sed -i 's/className="grid grid-cols-3 gap-6/className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6/g' "$FILE"
    sed -i 's/className="grid grid-cols-2 gap-6/className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6/g' "$FILE"
    sed -i 's/className="grid lg:grid-cols-3 gap-6/className="grid lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6/g' "$FILE"
    sed -i 's/className="grid lg:grid-cols-2 gap-6/className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6/g' "$FILE"
    
    # Typography
    sed -i 's/className="text-6xl/className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl/g' "$FILE"
    sed -i 's/className="text-5xl/className="text-3xl sm:text-4xl md:text-5xl/g' "$FILE"
    sed -i 's/className="text-4xl/className="text-2xl sm:text-3xl md:text-4xl/g' "$FILE"
    sed -i 's/className="text-3xl/className="text-xl sm:text-2xl md:text-3xl/g' "$FILE"
    sed -i 's/className="text-2xl/className="text-lg sm:text-xl md:text-2xl/g' "$FILE"
    sed -i 's/className="text-xl/className="text-base sm:text-lg md:text-xl/g' "$FILE"
    
    # Buttons
    sed -i 's/className="px-8 py-4/className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4/g' "$FILE"
    sed -i 's/className="px-6 py-3/className="px-4 py-2 sm:px-6 sm:py-3/g' "$FILE"
    
    # Icons
    sed -i 's/className="w-8 h-8/className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8/g' "$FILE"
    sed -i 's/className="w-12 h-12/className="w-10 h-10 sm:w-12 sm:h-12/g' "$FILE"
    sed -i 's/className="w-16 h-16/className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16/g' "$FILE"
    
    # Gaps
    sed -i 's/gap-8/gap-4 sm:gap-6 md:gap-8/g' "$FILE"
    sed -i 's/space-y-8/space-y-4 sm:space-y-6 md:space-y-8/g' "$FILE"
    
    echo "✅ Updated $FILE"
  else
    echo "⚠️  File not found: $FILE"
  fi
done

echo ""
echo "🎉 All components updated successfully!"
echo "📱 Components are now responsive for mobile, tablet, and desktop"
echo ""
echo "Next steps:"
echo "1. Review the changes in each file"
echo "2. Test on different screen sizes"
echo "3. Adjust any component-specific layouts if needed"
