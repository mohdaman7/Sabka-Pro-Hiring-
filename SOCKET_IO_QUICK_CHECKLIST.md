# Socket.io Notification System - Quick Integration Checklist

## Pre-Installation Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB running locally or cloud connection available
- [ ] Backend and frontend projects opened in editor

## Installation Steps

### Phase 1: Dependencies (5 minutes)

- [ ] Backend: `cd backend && npm install socket.io`
- [ ] Frontend: `npm install socket.io-client`
- [ ] Verify both installs completed without errors

### Phase 2: Backend Setup (2 minutes)

- [ ] NotificationModel created at `backend/src/models/NotificationModel.js`
- [ ] Socket handler created at `backend/src/socket/notificationSocket.js`
- [ ] Routes created at `backend/src/routes/notifications.js`
- [ ] Backend server updated (`backend/src/index.js`):
  - [ ] Socket.io imported
  - [ ] Routes imported
  - [ ] Socket initialized after server.listen()
  - [ ] Routes registered with app.use()

### Phase 3: Frontend Setup (2 minutes)

- [ ] Socket context created at `context/SocketContext.jsx`
- [ ] Environment variable set: `NEXT_PUBLIC_SOCKET_URL`
- [ ] Skill Academy layout updated (`app/skill-academy/layout.jsx`):
  - [ ] SocketProvider imported
  - [ ] Entire layout wrapped with SocketProvider
  - [ ] Navbar updated to use useSocket hook

## Startup Verification

### Backend Startup (Terminal 1)

```bash
cd backend
npm run dev
```

- [ ] Server starts on port 4000
- [ ] See message: "🔌 Socket.io initialized successfully!"
- [ ] No errors in console
- [ ] MongoDB connection successful

### Frontend Startup (Terminal 2)

```bash
npm run dev
```

- [ ] Frontend starts on port 3000
- [ ] No compilation errors
- [ ] Skill Academy page loads

### Browser Verification

- [ ] Open Skill Academy page
- [ ] Open browser console (F12 → Console tab)
- [ ] Look for: "✅ Connected to notifications server"
- [ ] No CORS errors in console
- [ ] Notification bell icon visible in navbar

## Feature Testing

### Notification Display

- [ ] Notification icon shows in navbar
- [ ] Unread count badge displays correctly
- [ ] Click notification dropdown opens
- [ ] Notifications list shows with title, message, timestamp

### Mark as Read

- [ ] Click notification in dropdown
- [ ] Notification should show as read
- [ ] Unread count decreases
- [ ] Visual styling changes (fade out/strikethrough)

### Backend API Testing (Postman)

- [ ] GET `/api/notifications` returns notification list
- [ ] GET `/api/notifications/count/unread` returns count
- [ ] PUT `/api/notifications/:id/read` marks as read
- [ ] DELETE `/api/notifications` clears all

## Integration Points

### Sending Notifications

- [ ] Course purchase sends notification
- [ ] Course completion sends notification
- [ ] Certificate earned sends notification

### Real-time Updates

- [ ] New notifications appear instantly
- [ ] Unread count updates in real-time
- [ ] No page refresh needed

## Browser Console Commands (Testing)

Paste in browser console to test:

```javascript
// Check socket connection
window.socket?.connected;

// View current notifications
window.socket?.notifications;

// View unread count
window.socket?.unreadCount;

// Manually mark notification as read
window.socket?.markAsRead("notificationId");

// Listen to new notifications
window.socket?.on("notification:new", (notif) => console.log("New:", notif));
```

## Common Issues & Solutions

### Issue: "Socket connection failed"

- [ ] Backend running on correct port?
- [ ] NEXT_PUBLIC_SOCKET_URL set correctly?
- [ ] Check browser console for CORS errors
- [ ] Restart both servers

### Issue: "Notifications not showing"

- [ ] User authenticated and logged in?
- [ ] userId correct in localStorage?
- [ ] Backend receiving notification creation requests?
- [ ] Check network tab in DevTools

### Issue: "Cannot connect to MongoDB"

- [ ] MongoDB service running?
- [ ] Connection string correct?
- [ ] Database credentials valid?
- [ ] Check backend console errors

## Next Steps After Setup

1. **Implement notification triggers:**

   - Course purchase flow
   - Course completion flow
   - Certificate earning flow
   - Module availability

2. **Add notification preferences:**

   - User can choose notification types
   - Mute notifications option
   - Email notification settings

3. **Test on production:**

   - Deploy backend with Socket.io
   - Deploy frontend with NEXT_PUBLIC_SOCKET_URL pointing to production
   - Verify Socket connection on production domain

4. **Optimize:**
   - Add notification caching
   - Implement notification archiving
   - Add read receipts
   - Performance monitoring

## Quick Reference

### Key Files Modified/Created

```
NEW FILES:
- backend/src/models/NotificationModel.js
- backend/src/socket/notificationSocket.js
- backend/src/routes/notifications.js
- context/SocketContext.jsx

MODIFIED FILES:
- backend/package.json
- backend/src/index.js
- package.json (frontend)
- app/skill-academy/layout.jsx
```

### Key Endpoints

```
GET    /api/notifications
GET    /api/notifications/count/unread
PUT    /api/notifications/:id/read
PUT    /api/notifications/read-all
DELETE /api/notifications/:id
DELETE /api/notifications
```

### Key Hooks (Frontend)

```javascript
useSocket(); // Full context access
useNotifications(); // Simplified notifications hook
```

### Key Environment Variables

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000  // Dev
NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com  // Prod
```

## Success Indicators

✅ System fully integrated when:

1. Backend and frontend both start without errors
2. Socket connection shows in browser console
3. Notification bell icon visible in navbar
4. Can view notifications in dropdown
5. Clicking notification marks it as read
6. Unread count updates in real-time
7. All API endpoints respond correctly
8. No errors in browser or server console

## Support Resources

- **Socket.io Documentation:** https://socket.io/docs/
- **MongoDB Mongoose:** https://mongoosejs.com/docs/
- **Express.js:** https://expressjs.com/
- **Next.js:** https://nextjs.org/docs/

---

**Estimated Total Setup Time:** 15-20 minutes

**Last Updated:** $(date)
