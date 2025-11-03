#!/bin/bash

echo "🚀 Making Settings and History components responsive..."

# Settings Component
FILE_SETTINGS="views/student/StudentSettings.jsx"

if [ -f "$FILE_SETTINGS" ]; then
  echo "📝 Updating StudentSettings.jsx..."
  
  # Main container
  sed -i 's/className="relative min-h-screen p-6/className="relative min-h-screen p-3 sm:p-4 md:p-6/g' "$FILE_SETTINGS"
  sed -i 's/className="relative min-h-screen p-8/className="relative min-h-screen p-4 sm:p-6 md:p-8/g' "$FILE_SETTINGS"
  
  # Background effects
  sed -i 's/className="absolute -top-24 -left-24 w-96 h-96/className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96/g' "$FILE_SETTINGS"
  sed -i 's/className="absolute -bottom-32 -right-32 w-96 h-96/className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96/g' "$FILE_SETTINGS"
  
  # Header
  sed -i 's/className="rounded-3xl p-10/className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10/g' "$FILE_SETTINGS"
  sed -i 's/className="rounded-3xl p-8/className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8/g' "$FILE_SETTINGS"
  sed -i 's/className="text-5xl/className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl/g' "$FILE_SETTINGS"
  sed -i 's/className="text-4xl/className="text-xl sm:text-2xl md:text-3xl lg:text-4xl/g' "$FILE_SETTINGS"
  sed -i 's/className="text-3xl/className="text-lg sm:text-xl md:text-2xl lg:text-3xl/g' "$FILE_SETTINGS"
  sed -i 's/className="text-2xl/className="text-base sm:text-lg md:text-xl lg:text-2xl/g' "$FILE_SETTINGS"
  sed -i 's/className="text-xl/className="text-sm sm:text-base md:text-lg lg:text-xl/g' "$FILE_SETTINGS"
  
  # Grid layouts
  sed -i 's/className="grid grid-cols-4/className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4/g' "$FILE_SETTINGS"
  sed -i 's/className="grid grid-cols-3/className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/g' "$FILE_SETTINGS"
  sed -i 's/className="grid grid-cols-2/className="grid grid-cols-1 sm:grid-cols-2/g' "$FILE_SETTINGS"
  sed -i 's/className="grid lg:grid-cols-2/className="grid grid-cols-1 lg:grid-cols-2/g' "$FILE_SETTINGS"
  
  # Gaps
  sed -i 's/ gap-8/ gap-4 sm:gap-6 md:gap-8/g' "$FILE_SETTINGS"
  sed -i 's/ gap-6/ gap-3 sm:gap-4 md:gap-6/g' "$FILE_SETTINGS"
  sed -i 's/space-y-8/space-y-4 sm:space-y-6 md:space-y-8/g' "$FILE_SETTINGS"
  sed -i 's/space-y-6/space-y-4 sm:space-y-5 md:space-y-6/g' "$FILE_SETTINGS"
  
  # Buttons
  sed -i 's/className="px-8 py-4/className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4/g' "$FILE_SETTINGS"
  sed -i 's/className="px-6 py-3/className="px-4 py-2 sm:px-6 sm:py-3/g' "$FILE_SETTINGS"
  
  # Icons
  sed -i 's/className="w-8 h-8/className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8/g' "$FILE_SETTINGS"
  sed -i 's/className="w-6 h-6/className="w-5 h-5 sm:w-6 sm:h-6/g' "$FILE_SETTINGS"
  sed -i 's/className="w-12 h-12/className="w-10 h-10 sm:w-12 sm:h-12/g' "$FILE_SETTINGS"
  sed -i 's/className="w-16 h-16/className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16/g' "$FILE_SETTINGS"
  
  # Flex layouts
  sed -i 's/className="flex items-center gap-4/className="flex items-center gap-2 sm:gap-3 md:gap-4/g' "$FILE_SETTINGS"
  sed -i 's/className="flex items-center gap-3/className="flex items-center gap-2 sm:gap-3/g' "$FILE_SETTINGS"
  sed -i 's/className="flex gap-6/className="flex flex-col sm:flex-row gap-4 sm:gap-6/g' "$FILE_SETTINGS"
  
  echo "✅ StudentSettings.jsx updated!"
else
  echo "⚠️  StudentSettings.jsx not found"
fi

# History Component
FILE_HISTORY="views/student/StudentHistory.jsx"

if [ -f "$FILE_HISTORY" ]; then
  echo "📝 Updating StudentHistory.jsx..."
  
  # Main container
  sed -i 's/className="relative min-h-screen p-6/className="relative min-h-screen p-3 sm:p-4 md:p-6/g' "$FILE_HISTORY"
  sed -i 's/className="relative min-h-screen p-8/className="relative min-h-screen p-4 sm:p-6 md:p-8/g' "$FILE_HISTORY"
  
  # Background effects
  sed -i 's/className="absolute -top-24 -left-24 w-96 h-96/className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96/g' "$FILE_HISTORY"
  sed -i 's/className="absolute -bottom-32 -right-32 w-96 h-96/className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-48 h-48 md:w-96 md:h-96/g' "$FILE_HISTORY"
  
  # Cards
  sed -i 's/className="rounded-3xl p-10/className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10/g' "$FILE_HISTORY"
  sed -i 's/className="rounded-3xl p-8/className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8/g' "$FILE_HISTORY"
  sed -i 's/className="rounded-3xl p-6/className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6/g' "$FILE_HISTORY"
  sed -i 's/className="rounded-2xl p-6/className="rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6/g' "$FILE_HISTORY"
  
  # Typography
  sed -i 's/className="text-5xl/className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl/g' "$FILE_HISTORY"
  sed -i 's/className="text-4xl/className="text-xl sm:text-2xl md:text-3xl lg:text-4xl/g' "$FILE_HISTORY"
  sed -i 's/className="text-3xl/className="text-lg sm:text-xl md:text-2xl lg:text-3xl/g' "$FILE_HISTORY"
  sed -i 's/className="text-2xl/className="text-base sm:text-lg md:text-xl lg:text-2xl/g' "$FILE_HISTORY"
  sed -i 's/className="text-xl/className="text-sm sm:text-base md:text-lg lg:text-xl/g' "$FILE_HISTORY"
  
  # Grid layouts
  sed -i 's/className="grid grid-cols-4/className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4/g' "$FILE_HISTORY"
  sed -i 's/className="grid grid-cols-3/className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/g' "$FILE_HISTORY"
  sed -i 's/className="grid grid-cols-2/className="grid grid-cols-1 sm:grid-cols-2/g' "$FILE_HISTORY"
  
  # Gaps
  sed -i 's/ gap-8/ gap-4 sm:gap-6 md:gap-8/g' "$FILE_HISTORY"
  sed -i 's/ gap-6/ gap-3 sm:gap-4 md:gap-6/g' "$FILE_HISTORY"
  sed -i 's/space-y-8/space-y-4 sm:space-y-6 md:space-y-8/g' "$FILE_HISTORY"
  sed -i 's/space-y-6/space-y-4 sm:space-y-5 md:space-y-6/g' "$FILE_HISTORY"
  
  # Buttons
  sed -i 's/className="px-8 py-4/className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4/g' "$FILE_HISTORY"
  sed -i 's/className="px-6 py-3/className="px-4 py-2 sm:px-6 sm:py-3/g' "$FILE_HISTORY"
  
  # Icons
  sed -i 's/className="w-8 h-8/className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8/g' "$FILE_HISTORY"
  sed -i 's/className="w-6 h-6/className="w-5 h-5 sm:w-6 sm:h-6/g' "$FILE_HISTORY"
  sed -i 's/className="w-12 h-12/className="w-10 h-10 sm:w-12 sm:h-12/g' "$FILE_HISTORY"
  sed -i 's/className="w-16 h-16/className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:w-16/g' "$FILE_HISTORY"
  
  # Flex layouts
  sed -i 's/className="flex items-center gap-4/className="flex items-center gap-2 sm:gap-3 md:gap-4/g' "$FILE_HISTORY"
  sed -i 's/className="flex items-center gap-3/className="flex items-center gap-2 sm:gap-3/g' "$FILE_HISTORY"
  sed -i 's/className="flex gap-6/className="flex flex-col sm:flex-row gap-4 sm:gap-6/g' "$FILE_HISTORY"
  
  echo "✅ StudentHistory.jsx updated!"
else
  echo "⚠️  StudentHistory.jsx not found"
fi

echo ""
echo "🎉 All responsive updates completed!"
echo "📱 Components are now mobile-friendly"
