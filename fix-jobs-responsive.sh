#!/bin/bash

# Fix remaining responsive issues in jobs page
FILE="app/student/jobs/page.jsx"

echo "🔧 Fixing job cards responsive..."

# Job cards container
sed -i 's/className="space-y-6">/className="space-y-4 sm:space-y-5 md:space-y-6">/g' "$FILE"

# Job card main container
sed -i 's/className="group relative rounded-3xl p-8 shadow-2xl/className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl/g' "$FILE"

# Job card flex layout
sed -i 's/className="relative flex flex-col sm:flex-row gap-6">/className="relative flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">/g' "$FILE"

# Company logo
sed -i 's/className="relative w-24 h-24 rounded-3xl/className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl/g' "$FILE"

# Job title
sed -i 's/className="text-3xl font-black text-white/className="text-xl sm:text-2xl md:text-3xl font-black text-white/g' "$FILE"

# Company name text
sed -i 's/className="text-lg font-black text-white/className="text-sm sm:text-base md:text-lg font-black text-white/g' "$FILE"

# Buttons and actions
sed -i 's/className="flex items-center justify-between gap-4 mb-5">/className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">/g' "$FILE"

# Pagination
sed -i 's/className="flex justify-center items-center gap-4 mt-12">/className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-10 md:mt-12">/g' "$FILE"

echo "✅ Jobs page responsive fixes applied!"
