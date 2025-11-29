# Purchase & Certificate Testing Guide

## Overview

Complete end-to-end testing flow for the course purchase, completion, and certificate system.

## Test Scenario 1: Try Demo Button

### Steps:

1. Navigate to any course detail page: `/skill-academy/courses/[courseId]`
2. Scroll to the right sidebar with pricing
3. Click the **"Try Course Demo"** button
4. **Expected Result:**
   - Toast notification appears: "Demo Access Enabled"
   - Message: "You can now preview the course content. Purchase to unlock full access and earn certificates."
   - Page scrolls to course content section

### What It Tests:

- Demo button renders correctly
- Toast notification displays properly
- UI/UX for trying course before purchasing

---

## Test Scenario 2: Buy Complete Bundle

### Prerequisites:

- You're logged in as a student
- You don't have the course purchased yet
- Course has modules and lessons

### Steps:

1. Navigate to course detail page
2. Click **"Buy Complete Bundle"** button
3. **Expected Results:**
   - Button shows "Processing..." with spinner
   - Toast notification: "Demo Purchase Mode" appears
   - Message: "In production, this would redirect to payment gateway..."
   - After ~2 seconds, button changes to "Go to Course"
   - Another toast appears: "Course unlocked! You now have full access..."
   - Page redirects to `/student/courses/[courseId]`

### What It Tests:

- Purchase handler executes correctly
- Multiple toast notifications display in sequence
- Success animation triggers
- Navigation to student course view works
- Purchase state management (purchasingBundle flag)

---

## Test Scenario 3: View Course After Purchase

### Prerequisites:

- Completed Test Scenario 2 (course purchased)

### Steps:

1. You should be on `/student/courses/[courseId]` page
2. **Expected Results:**
   - Course modules and lessons display
   - Can click on any lesson to enter
   - Back button works to return to course view

### What It Tests:

- Post-purchase course access
- Course navigation structure

---

## Test Scenario 4: Complete a Lesson

### Prerequisites:

- Completed Test Scenario 3 (viewing course)

### Steps:

1. Click on the first lesson to enter
2. You should see the LessonView with video player and course outline
3. Watch at least a portion of the video (or skip to end)
4. Look for a "Mark as Complete" button or similar
5. Click to mark lesson as complete
6. **Expected Results:**
   - Lesson marked as complete in course outline (check mark appears)
   - Sidebar lesson list updates
   - Toast shows completion message

### What It Tests:

- Video player functionality
- Lesson completion tracking
- Progress updates in sidebar

---

## Test Scenario 5: Complete All Lessons & Get Certificate

### Prerequisites:

- Completed Test Scenario 4 (have completed lessons)
- Course has multiple lessons (complete them all or modify test)

### Steps:

1. Complete all remaining lessons in the course
2. When you mark the LAST lesson as complete:
3. **Expected Results:**
   - Certificate Modal appears with golden certificate design
   - Modal shows:
     - Your student name
     - Course name
     - Completion date
     - "Certificate of Completion" heading
     - Award icon
     - Success message
   - Two download buttons visible:
     - "Download as PDF"
     - "Download as PNG"

### What It Tests:

- Course completion detection
- Certificate modal integration
- Certificate display with correct data
- Modal animations and appearance

---

## Test Scenario 6: Download Certificate (PDF)

### Prerequisites:

- Certificate Modal is open (from Test Scenario 5)

### Steps:

1. Click **"Download as PDF"** button
2. **Expected Results:**
   - Button shows loading spinner during download
   - PDF file downloads to your Downloads folder
   - Filename format: `{StudentName}_Certificate_{CourseName}.pdf`
   - Example: `John_Doe_Certificate_React_Fundamentals.pdf`
   - PDF opens and shows:
     - Professional certificate layout
     - Student name
     - Course title
     - Completion date
     - Certificate ID
     - Sabka Pro Hiring branding

### What It Tests:

- PDF generation functionality
- File naming convention
- Download mechanism
- Canvas → PDF conversion

---

## Test Scenario 7: Download Certificate (PNG)

### Prerequisites:

- Certificate Modal is open (from Test Scenario 5)

### Steps:

1. Click **"Download as PNG"** button
2. **Expected Results:**
   - Button shows loading spinner during download
   - PNG image file downloads to your Downloads folder
   - Filename format: `{StudentName}_Certificate_{CourseName}.png`
   - Example: `John_Doe_Certificate_React_Fundamentals.png`
   - Image shows the certificate as a high-quality screenshot

### What It Tests:

- PNG download functionality
- Image quality from canvas
- Alternative format download

---

## Test Scenario 8: View Certificates Page

### Prerequisites:

- Completed at least one course (Test Scenario 5)

### Steps:

1. Navigate to `/skill-academy/certificates`
2. **Expected Results:**
   - Page loads with "My Certificates" heading
   - Certificate cards display in a responsive grid:
     - 1 column on mobile
     - 2 columns on tablet
     - 3 columns on desktop
   - Each certificate card shows:
     - Award icon
     - Course name
     - Completion date
     - "Download PDF" button
     - "Download PNG" button
   - If no certificates exist, shows:
     - Empty state message
     - "Browse Courses" button with link to `/skill-academy/courses`

### What It Tests:

- Certificates page rendering
- API call to `/api/progress/completed-courses`
- Certificate listing
- Download buttons functionality
- Responsive layout
- Empty state handling

---

## Test Scenario 9: Download from Certificates Page

### Prerequisites:

- On Certificates Page (Test Scenario 8)
- At least one certificate card visible

### Steps:

1. On a certificate card, click **"Download PDF"** or **"Download PNG"**
2. **Expected Results:**
   - Same download behavior as Test Scenario 6-7
   - File downloads with proper naming
   - File opens successfully

### What It Tests:

- Download functionality from certificates page
- Alternative access point for certificate downloads

---

## Test Scenario 10: Multiple Purchases

### Prerequisites:

- Completed Test Scenarios 2-5 (first course purchased and completed)

### Steps:

1. Navigate to a different course
2. Repeat Test Scenario 2 (purchase different course)
3. Complete this course (Test Scenario 4-5)
4. **Expected Results:**
   - Multiple purchases work smoothly
   - Each course has separate purchase entry
   - Certificate modal appears for second course
   - Second certificate includes correct course name
   - Go to `/skill-academy/certificates` page
   - Both certificates appear in the grid

### What It Tests:

- Multiple purchase handling
- Independent course completion tracking
- Certificate uniqueness per course
- Certificates page with multiple entries

---

## Debugging Checklist

If tests fail, check:

### Certificate Modal Not Appearing

- [ ] Verify `checkCourseCompletion()` API call returns `courseCompleted: true`
- [ ] Check browser console for API errors
- [ ] Verify `CertificateModal.jsx` is imported in lesson page
- [ ] Check `showCertificate` state is being set to true

### Toast Notifications Not Showing

- [ ] Verify `customToast` is imported from `/components/ui/toast`
- [ ] Check toast component is visible (z-index issue?)
- [ ] Look for console errors related to toast
- [ ] Verify `customToast.success()` and `customToast.info()` methods exist

### Certificate Not Downloading

- [ ] Check browser console for html2canvas errors
- [ ] Verify jsPDF library is installed: `npm ls jspdf html2canvas`
- [ ] Check if browser allows downloads
- [ ] Verify filename generation logic

### API Errors

- [ ] Check `/api/progress/mark-complete` endpoint exists
- [ ] Check `/api/progress/course/[courseId]` endpoint exists
- [ ] Check `/api/progress/completed-courses` endpoint exists
- [ ] Verify authentication token is being sent

### Purchase Not Working

- [ ] Check `/api/purchases` endpoint exists
- [ ] Verify `purchaseService.create()` is making correct API calls
- [ ] Check response includes success status
- [ ] Verify user is authenticated before purchase attempt

---

## Toast Messages Reference

### Info Toasts

- **Demo Course Button**: "Demo Access Enabled - You can now preview the course content..."
- **Buy Button (Start)**: "Demo Purchase Mode - In production, this would redirect..."

### Success Toasts

- **Buy Button (Complete)**: "Course unlocked! - You now have full access to all modules..."
- **Lesson Complete**: "Great! Lesson marked as complete"

### Error Toasts

- **API Failure**: "Error - Could not complete this action"

---

## Performance Notes

- Certificate PDF generation typically takes 2-3 seconds
- Certificate PNG generation typically takes 1-2 seconds
- Course completion API call should complete within 1 second
- Certificate modal animation should be smooth and fast (spring animation)

---

## User Data Flow

```
Student Logs In
    ↓
Navigates to Course → Course Detail Page
    ↓
Clicks "Buy Complete Bundle"
    ↓
Purchase Handler Executes → API Call to /api/purchases
    ↓
Toast: "Demo Purchase Mode"
    ↓
API Response Success
    ↓
Toast: "Course unlocked!"
    ↓
Navigate to /student/courses/[courseId]
    ↓
Student Views Course & Lessons
    ↓
Click Lesson → LessonView
    ↓
Watch Video & Click "Mark Complete"
    ↓
API Call to /api/progress/mark-complete
    ↓
API Call to /api/progress/course/[courseId] (check completion)
    ↓
If courseCompleted = true:
  Show Certificate Modal
    ↓
  Download PDF or PNG
    ↓
Visit /skill-academy/certificates
    ↓
See Certificate in List
```

---

## Notes for Development

1. **Demo Mode**: The purchase currently shows a "Demo Purchase Mode" toast. In production, replace this with actual payment gateway integration (Stripe, Razorpay, etc.)

2. **Course Completion Logic**: Uses API response flag `courseCompleted`. Verify backend logic determines this correctly when `completedLessons === totalLessons`.

3. **User Name Source**: Currently reads from `localStorage.skillAcademyUser.name`. Ensure this is populated during login.

4. **User Email**: Also from localStorage, used for watermark and potentially certificate footer.

5. **Certificate Naming**: Uses pattern `{StudentName}_Certificate_{CourseName}`. Adjust in `CertificateModal.jsx` if different format needed.

---

## Success Criteria

All tests pass when:

- ✅ Demo button shows toast correctly
- ✅ Buy button processes and redirects
- ✅ Lessons can be marked complete
- ✅ Certificate modal appears on course completion
- ✅ PDF and PNG downloads work
- ✅ Certificates page shows all completed courses
- ✅ Multiple purchases and completions work independently
- ✅ All toast notifications display properly
- ✅ All redirects work correctly
