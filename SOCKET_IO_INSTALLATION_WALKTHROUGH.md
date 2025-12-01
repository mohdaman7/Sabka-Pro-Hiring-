# Socket.io Notification System - Installation Walkthrough

## Step-by-Step Installation Guide

### ✅ Prerequisites

- Backend directory exists: `backend/`
- Frontend root has `package.json`
- Node.js and npm installed
- MongoDB running (local or cloud)
- Git repository initialized (optional)

---

## Phase 1: Install Dependencies (5 minutes)

### 1.1 Install Backend Socket.io

```bash
# Navigate to backend directory
cd backend

# Install socket.io
npm install socket.io

# Verify installation
npm list socket.io
# Should show: socket.io@4.8.1
```

**Verification:**

- Check `backend/package.json` has `"socket.io": "^4.8.1"`
- Check `backend/node_modules/socket.io` directory exists
- No errors in console

### 1.2 Install Frontend Socket.io Client

```bash
# Navigate to frontend root
cd ..

# Install socket.io-client
npm install socket.io-client

# Verify installation
npm list socket.io-client
# Should show: socket.io-client@4.8.1
```

**Verification:**

- Check `package.json` has `"socket.io-client": "^4.8.1"`
- Check `node_modules/socket.io-client` directory exists

---

## Phase 2: Backend Configuration (3 minutes)

### 2.1 Verify Backend Files Exist

```bash
ls -la backend/src/models/NotificationModel.js
ls -la backend/src/socket/notificationSocket.js
ls -la backend/src/routes/notifications.js
```

**Expected output:** Files exist and show file size

### 2.2 Verify Backend Server Updated

Check `backend/src/index.js` has these imports at the top:

```javascript
import { initializeSocket } from "./socket/notificationSocket.js";
import notificationRoutes from "./routes/notifications.js";
```

Check these lines after `server.listen()`:

```javascript
const io = initializeSocket(server);
console.log("🔌 Socket.io initialized successfully!");
app.io = io;
app.use("/api/notifications", notificationRoutes);
```

---

## Phase 3: Frontend Configuration (2 minutes)

### 3.1 Verify Frontend Files Exist

```bash
ls -la context/SocketContext.jsx
```

**Expected output:** File exists

### 3.2 Verify Layout Updated

Check `app/skill-academy/layout.jsx` has:

```javascript
import { SocketProvider, useSocket } from "@/context/SocketContext";
```

And the main return is wrapped:

```javascript
return (
  <SocketProvider>
    <div className={styles.skillAcademyLayout}>{/* ... */}</div>
  </SocketProvider>
);
```

### 3.3 Set Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

**Note:** For production, change to your deployed backend URL

---

## Phase 4: Startup Verification (5 minutes)

### 4.1 Start Backend Server

```bash
cd backend
npm run dev
```

**Expected output:**

```
[nodemon] restarting due to changes...
[nodemon] starting `node src/index.js`
Express server running on port 4000
MongoDB connected
🔌 Socket.io initialized successfully!
```

**If errors occur:**

- Check MongoDB connection: `mongodb://localhost:27017/skillacademy`
- Check port 4000 is not in use: `lsof -i :4000`
- Check all files exist and have correct syntax

### 4.2 Start Frontend Server (New Terminal)

```bash
npm run dev
```

**Expected output:**

```
> next dev
  ▲ Next.js 14.2.16
  - Local: http://localhost:3000
```

**If errors occur:**

- Check no TypeScript errors: `npm run build`
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### 4.3 Browser Verification

1. Open browser to `http://localhost:3000`
2. Navigate to Skill Academy section
3. Open Developer Tools (F12)
4. Go to Console tab
5. Look for these messages:
   - ✅ "✅ Connected to notifications server"
   - No red CORS errors

**If connection fails:**

- Check NEXT_PUBLIC_SOCKET_URL is correct
- Verify backend is running
- Check Network tab for WebSocket connection
- Try `ws://localhost:4000` in browser console: `new WebSocket('ws://localhost:4000')`

---

## Phase 5: Feature Testing (3 minutes)

### 5.1 Test Notification Display

In browser console, run:

```javascript
// Check socket connection status
window.socket?.connected;

// Check notifications array
window.socket?.notifications;

// Check unread count
window.socket?.unreadCount;
```

**Expected output:**

```javascript
connected: true;
notifications: []; // or with notifications
unreadCount: 0; // or higher number
```

### 5.2 Test Mark as Read

In browser console:

```javascript
// If you have notifications, mark first one as read
if (window.socket?.notifications?.length) {
  const notifId = window.socket.notifications[0]._id;
  window.socket.markAsRead(notifId);
}

// Check for success event
window.socket?.on("notification:read:success", (data) => {
  console.log("Mark read successful:", data);
});
```

### 5.3 Test API Endpoints

Using curl or Postman:

```bash
# Get unread count (replace TOKEN and USER_ID)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:4000/api/notifications/count/unread

# Get all notifications
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:4000/api/notifications?limit=10

# Mark notification as read
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  http://localhost:4000/api/notifications/NOTIFICATION_ID/read
```

**Expected responses:**

- GET unread: `{ unreadCount: 5 }`
- GET notifications: `{ notifications: [...], unreadCount: 5, total: 10 }`
- PUT read: `{ message: "Notification marked as read", notification: {...} }`

---

## Phase 6: Integration Points (10 minutes)

### 6.1 Send Notification on Course Purchase

In course purchase route/controller:

```javascript
import { sendNotificationToUser } from "../socket/notificationSocket.js";

// After purchase is saved
await sendNotificationToUser(req.app.io, userId, {
  type: "course_purchase",
  title: "Course Purchased! 🎓",
  message: `You successfully purchased "${courseName}"`,
  icon: "ShoppingCart",
  relatedEntityType: "course",
  relatedEntityId: courseId,
  actionUrl: `/skill-academy/courses/${courseId}`,
});
```

### 6.2 Send Notification on Lesson Completion

```javascript
await sendNotificationToUser(req.app.io, userId, {
  type: "lesson_available",
  title: "Lesson Completed! ✅",
  message: `Great job completing "${lessonName}"`,
  icon: "CheckCircle",
  relatedEntityType: "lesson",
  relatedEntityId: lessonId,
  actionUrl: `/skill-academy/courses/${courseId}`,
});
```

### 6.3 Send Notification on Certificate Earned

```javascript
await sendNotificationToUser(req.app.io, userId, {
  type: "certificate_earned",
  title: "Certificate Earned! 🏆",
  message: `Congratulations! You earned a certificate for "${courseName}"`,
  icon: "Award",
  relatedEntityType: "certificate",
  relatedEntityId: certificateId,
  actionUrl: `/skill-academy/certificates/${certificateId}`,
});
```

---

## Troubleshooting Guide

### Issue: "CORS error" in browser console

**Solution:**

```javascript
// In backend notificationSocket.js, update CORS:
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
```

### Issue: "Cannot find module 'socket.io'"

**Solution:**

```bash
cd backend
npm install socket.io
npm list socket.io  # Verify installation
```

### Issue: "Socket connection hangs"

**Solution:**

```javascript
// Check if user data exists
console.log(localStorage.getItem("skillAcademyUser"));
console.log(localStorage.getItem("skillAcademyToken"));

// If empty, log in first
// Check backend is accepting connection
// Backend console should show: "User connected: userId"
```

### Issue: "Notifications not saving to database"

**Solution:**

```javascript
// Check MongoDB connection in backend
// Verify NotificationModel is imported
// Check database with MongoDB Compass
// View notifications collection
```

---

## Full Startup Command Sequence

For quick startup in future:

**Terminal 1 (Backend):**

```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**

```bash
npm run dev
```

**Browser:**

- Navigate to: `http://localhost:3000/skill-academy`
- Open DevTools (F12) → Console
- Verify: "✅ Connected to notifications server"

---

## Production Deployment

### Backend (e.g., Heroku, Railway, Render)

1. Set environment variables:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillacademy
NODE_ENV=production
PORT=4000
```

2. Update Socket.io CORS for production domain:

```javascript
cors: {
  origin: process.env.FRONTEND_URL || "https://yourdomain.com",
  credentials: true,
}
```

3. Deploy with package.json including socket.io

### Frontend (e.g., Vercel, Netlify)

1. Set environment variable in deployment platform:

```env
NEXT_PUBLIC_SOCKET_URL=https://your-api-domain.com
```

2. Deploy Next.js project

---

## Success Checklist ✅

- [x] Backend dependencies installed
- [x] Frontend dependencies installed
- [x] Backend files created/verified
- [x] Frontend files created/verified
- [x] Environment variables set
- [x] Backend server starts without errors
- [x] Frontend server starts without errors
- [x] Socket connection shows in browser console
- [x] Notification bell visible in navbar
- [x] Notification dropdown opens
- [x] Notifications display correctly
- [x] Mark as read works
- [x] Unread count badge updates
- [x] API endpoints respond correctly

---

## Estimated Timeline

| Phase     | Task                   | Time            |
| --------- | ---------------------- | --------------- |
| 1         | Install dependencies   | 5 min           |
| 2         | Backend configuration  | 3 min           |
| 3         | Frontend configuration | 2 min           |
| 4         | Startup & verification | 5 min           |
| 5         | Feature testing        | 3 min           |
| 6         | Integration points     | 10 min          |
| **Total** | **Complete Setup**     | **~28 minutes** |

---

## Support

If you encounter issues not covered above:

1. **Check backend console** for error messages
2. **Check browser console** for CORS/connection errors
3. **Check Network tab** in DevTools for WebSocket handshake
4. **Verify MongoDB** connection and collections
5. **Review Socket.io docs:** https://socket.io/docs/

---

**Status:** ✅ Ready for deployment
**Last Updated:** 2024
**Version:** Socket.io 4.8.1
