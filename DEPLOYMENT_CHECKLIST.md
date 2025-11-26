# Video Player Deployment Checklist

## Pre-Deployment Setup

### 1. Backend API Preparation

- [ ] Ensure all courses have `videoUrl` field populated
- [ ] Ensure all lessons have:
  - [ ] `videoUrl` - video file URL
  - [ ] `durationSec` - video duration in seconds
  - [ ] `title` - lesson title
  - [ ] `description` - lesson description (optional)
  - [ ] `isFreePreview` - boolean for access control
  - [ ] `resources` - array of downloadable files (optional)
- [ ] Configure CORS headers on video hosting server
- [ ] Test all video endpoints return proper data structure
- [ ] Verify `/api/progress/mark-complete` endpoint exists
- [ ] Test purchase check endpoint works

### 2. Frontend Dependencies

- [ ] Verify Framer Motion is installed: `npm ls framer-motion`
- [ ] Verify Lucide React is installed: `npm ls lucide-react`
- [ ] Verify Next.js version is 14.x or higher
- [ ] Run `npm install` to ensure all dependencies

### 3. Environment Variables

- [ ] Set `NEXT_PUBLIC_API_URL` in `.env.local`

```env
NEXT_PUBLIC_API_URL=http://your-backend-url.com
```

- [ ] Verify variables are accessible in browser console

### 4. Video Hosting

- [ ] Choose video hosting service:
  - [ ] Self-hosted server (with CORS enabled)
  - [ ] AWS S3 (with CORS configuration)
  - [ ] Cloudflare Stream
  - [ ] Vimeo API
  - [ ] YouTube API
- [ ] Ensure HTTPS is enabled (required for fullscreen)
- [ ] Test video streaming with actual files
- [ ] Verify Range requests are supported

### 5. Code Review

- [ ] Review `/components/ui/VideoPlayer.jsx`
- [ ] Review `/components/ui/LessonView.jsx`
- [ ] Review `/app/skill-academy/courses/[id]/lesson/[lessonId]/page.jsx`
- [ ] Review updates to `/app/skill-academy/courses/[id]/page.jsx`
- [ ] Check for any console warnings
- [ ] Verify no TypeScript errors: `npm run type-check`

## Testing

### Functional Testing

- [ ] Video plays on course detail page
- [ ] Video plays on lesson detail page
- [ ] Play/pause button works
- [ ] Progress bar seeks correctly
- [ ] Volume control adjusts volume
- [ ] Speed selector works (0.5x to 2x)
- [ ] Skip buttons work (±10 seconds)
- [ ] Fullscreen toggle works
- [ ] Controls auto-hide after 3 seconds
- [ ] Lesson navigation works (previous/next)
- [ ] Module expand/collapse works
- [ ] Lesson completion is tracked
- [ ] Bookmarking works
- [ ] Sharing button works

### Device Testing

- [ ] Mobile (iPhone 12/13/14/15)
- [ ] Android phones (Samsung, Pixel)
- [ ] Tablets (iPad, Samsung Tab)
- [ ] Desktop (1920x1080, 1440x900, 2560x1440)
- [ ] Ultra-wide monitors (3440x1440)

### Browser Testing

- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Testing

- [ ] Load time < 3 seconds
- [ ] Video start time < 2 seconds (on broadband)
- [ ] No memory leaks (check DevTools)
- [ ] No layout shifts (Lighthouse CLS < 0.1)
- [ ] CPU usage stays < 30% during playback

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader detects video controls
- [ ] High contrast mode works
- [ ] Touch targets are >= 44x44px
- [ ] Focus indicators visible

### Error Handling

- [ ] Invalid video URL shows error
- [ ] Missing lesson shows error
- [ ] Network error shows retry option
- [ ] Backend API down shows offline message
- [ ] Graceful fallback if video codec unsupported

## Deployment Steps

### 1. Build Process

```bash
# Build the Next.js application
npm run build

# Check for build errors
echo "Build Status: $?"

# Test build locally
npm start
```

### 2. Deploy to Production

```bash
# Stage 1: Deploy to staging environment
# Deploy to your hosting platform (Vercel, AWS, etc.)

# Stage 2: Run smoke tests
# Visit /skill-academy/courses/[courseId]
# Visit /skill-academy/courses/[courseId]/lesson/[lessonId]
# Test video playback

# Stage 3: Deploy to production
# After smoke tests pass on staging
```

### 3. Post-Deployment Verification

- [ ] Videos load correctly in production
- [ ] All controls work in production
- [ ] No JavaScript errors in console
- [ ] Analytics data is collected
- [ ] Error tracking is working

### 4. Monitoring

- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor video playback errors
- [ ] Track completion rates
- [ ] Monitor API response times
- [ ] Track user engagement metrics

## Rollback Plan

If issues occur after deployment:

1. **Stop affected service**

   ```bash
   # Stop video player from serving
   # Redirect to old lesson view if available
   ```

2. **Revert deployment**

   ```bash
   # Revert to previous version
   git revert <commit-hash>
   npm run build
   npm start
   ```

3. **Notify users**

   - Post notification about maintenance
   - Estimate time to fix

4. **Debug and fix**

   - Check error logs
   - Review recent changes
   - Fix in development
   - Test thoroughly

5. **Re-deploy**
   - Deploy fixed version
   - Verify functionality
   - Monitor for 24 hours

## Documentation Deployment

- [ ] Update main README.md
- [ ] Add link to VIDEO_PLAYER_IMPLEMENTATION_SUMMARY.md
- [ ] Add link to VIDEO_PLAYER_INTEGRATION_GUIDE.md
- [ ] Add link to VIDEO_PLAYER_QUICK_REFERENCE.md
- [ ] Update API documentation
- [ ] Update deployment guide

## Performance Optimization

### For Production

- [ ] Enable video compression
- [ ] Use CDN for video delivery
- [ ] Implement adaptive bitrate streaming
- [ ] Cache video metadata
- [ ] Lazy load video elements
- [ ] Minify component code
- [ ] Remove dev-only console logs

### Configuration for Scaling

```javascript
// Recommended settings for production
const PRODUCTION_CONFIG = {
  VIDEO_BUFFER_SIZE: 30, // seconds
  CONTROLS_AUTO_HIDE: 3000, // milliseconds
  PRELOAD: "metadata", // or 'none' for mobile
  MAX_CONCURRENT_DOWNLOADS: 3,
};
```

## Database Migrations (if needed)

- [ ] Ensure all courses have video URLs
- [ ] Ensure all lessons have duration data
- [ ] Backfill missing thumbnail URLs
- [ ] Update user progress schema if needed
- [ ] Create completion tracking indexes

## Security Considerations

- [ ] Video URLs are not exposed in client code
- [ ] Authentication required to watch premium content
- [ ] Rate limiting on progress endpoints
- [ ] CORS headers properly configured
- [ ] HTTPS enforced in production
- [ ] No sensitive data in video metadata

## Support & Troubleshooting

### Common Production Issues

1. **Video Won't Load**

   - Check video URL is correct
   - Verify CORS headers
   - Check browser network tab
   - Try different video format

2. **Controls Not Responding**

   - Clear browser cache
   - Check for JavaScript errors
   - Verify all dependencies installed
   - Check CSS not overridden

3. **Playback Stuttering**

   - Check network speed
   - Reduce video bitrate
   - Enable video buffering
   - Close other bandwidth-heavy apps

4. **Fullscreen Not Working**
   - Verify HTTPS enabled
   - Check browser fullscreen permissions
   - Try different browser

### Support Resources

- Documentation: See `/docs/` folder
- Error logs: Check server logs
- User reports: Create support tickets
- Community: GitHub issues

## Success Criteria

✅ **Deployment is successful when:**

- [ ] All tests pass (functional, browser, device)
- [ ] No console errors in production
- [ ] Video playback works smoothly
- [ ] All features work as intended
- [ ] Performance metrics within target
- [ ] User feedback is positive
- [ ] Error tracking shows no critical issues
- [ ] Completion tracking data is accurate

## Post-Deployment Monitoring (30 days)

- [ ] Track video completion rates
- [ ] Monitor error rates
- [ ] Analyze user engagement
- [ ] Collect user feedback
- [ ] Track performance metrics
- [ ] Update documentation based on issues

## Sign-Off

- [ ] **Developer**: ********\_******** Date: **\_\_\_**
- [ ] **QA Lead**: ********\_******** Date: **\_\_\_**
- [ ] **Product Manager**: ********\_******** Date: **\_\_\_**
- [ ] **DevOps/Deployment**: ********\_******** Date: **\_\_\_**

---

**Deployment Version**: 1.0  
**Last Updated**: 2024  
**Status**: Ready for Deployment ✅
