# Socket.io Notification System - Setup Guide

## Overview

This guide walks through the complete Socket.io notification system implementation for the Skill Academy platform.

## Installation

### 1. Backend Dependencies

```bash
cd backend
npm install socket.io
```

**Updated `backend/package.json` dependencies:**

```json
{
  "dependencies": {
    "socket.io": "^4.8.1"
  }
}
```

### 2. Frontend Dependencies

```bash
npm install socket.io-client
```

**Updated `package.json` dependencies:**

```json
{
  "dependencies": {
    "socket.io-client": "^4.8.1"
  }
}
```

## Backend Integration

### Step 1: Create Notification Model

**File:** `backend/src/models/NotificationModel.js`

Features:

- Store user notifications with metadata
- Track read/unread status
- Support different notification types
- Related entity linking (course, module, lesson, certificate)
- Automatic timestamps

Key methods:

```javascript
- markAsRead() - Mark single notification as read
- createNotification(userId, data) - Create new notification
- getUnreadCount(userId) - Get unread count
- getRecentNotifications(userId, limit) - Get recent notifications
```

### Step 2: Socket.io Configuration

**File:** `backend/src/socket/notificationSocket.js`

Initialization:

```javascript
const io = initializeSocket(server);
```

Features:

- Authentication via token + userId
- User connection tracking
- Event handlers for notifications
- Online/offline status tracking
- Error handling

### Step 3: Notification Routes

**File:** `backend/src/routes/notifications.js`

Endpoints:

```
GET    /api/notifications              - Get all notifications
GET    /api/notifications/count/unread - Get unread count
PUT    /api/notifications/:id/read     - Mark as read
PUT    /api/notifications/read-all     - Mark all as read
DELETE /api/notifications/:id          - Delete notification
DELETE /api/notifications              - Delete all notifications
```

### Step 4: Update Backend Server

**File:** `backend/src/index.js`

Changes made:

1. Import Socket.io:

```javascript
import { initializeSocket } from "./socket/notificationSocket.js";
import notificationRoutes from "./routes/notifications.js";
```

2. Initialize Socket.io:

```javascript
const io = initializeSocket(server);
console.log("🔌 Socket.io initialized successfully!");
app.io = io;
```

3. Register notification routes:

```javascript
app.use("/api/notifications", notificationRoutes);
```

## Frontend Integration

### Step 1: Socket Context

**File:** `context/SocketContext.jsx`

Provides:

- Socket connection management
- Notification state management
- Helper functions for marking notifications
- Online users tracking

Hooks:

```javascript
useSocket()            - Full socket context
useNotifications()     - Simplified notifications hook
```

### Step 2: Environment Configuration

**File:** `.env.local` or `.env`

Add:

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

For production:

```
NEXT_PUBLIC_SOCKET_URL=https://your-api-domain.com
```

### Step 3: Layout Integration

**File:** `app/skill-academy/layout.jsx`

Changes:

1. Import SocketProvider:

```javascript
import { SocketProvider, useSocket } from "@/context/SocketContext";
```

2. Wrap layout with provider:

```javascript
export default function SkillAcademyLayout({ children }) {
  return (
    <SocketProvider>
      <div>{/* content */}</div>
    </SocketProvider>
  );
}
```

### Step 4: Use in Components

**Example:**

```javascript
import { useSocket } from "@/context/SocketContext";

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, isConnected } = useSocket();

  return (
    <div>
      <BellIcon count={unreadCount} />
      {notifications.map((notif) => (
        <div onClick={() => markAsRead(notif._id)}>{notif.message}</div>
      ))}
    </div>
  );
}
```

## Socket Events

### Client Events (Frontend → Backend)

```javascript
// Mark notification as read
socket.emit("notification:read", { notificationId });

// Mark all notifications as read
socket.emit("notification:read-all", {});
```

### Server Events (Backend → Frontend)

```javascript
// New notification received
socket.on("notification:new", (notification) => {
  // Handle new notification
});

// Broadcast notification
socket.on("notification:broadcast", (notification) => {
  // Handle broadcast
});

// Read confirmation
socket.on("notification:read:success", (data) => {
  // Handle read confirmation
});

// User online
socket.on("user:online", (data) => {
  // User is online
});

// User offline
socket.on("user:offline", (data) => {
  // User went offline
});
```

## Sending Notifications

### From Backend Routes/Controllers

```javascript
import { sendNotificationToUser } from "../socket/notificationSocket.js";

// Send notification to single user
await sendNotificationToUser(req.app.io, userId, {
  type: "course_purchase",
  title: "Course Purchased!",
  message: "You successfully purchased 'Advanced React'",
  icon: "ShoppingCart",
  relatedEntityType: "course",
  relatedEntityId: courseId,
  actionUrl: `/skill-academy/courses/${courseId}`,
});
```

### Broadcast Notification

```javascript
import { broadcastNotification } from "../socket/notificationSocket.js";

await broadcastNotification(req.app.io, {
  type: "system",
  title: "System Update",
  message: "New courses available!",
});
```

## Notification Types

Supported types:

- `course_purchase` - Course purchased
- `course_completed` - Course completed
- `lesson_available` - New lesson available
- `module_available` - New module available
- `certificate_earned` - Certificate earned
- `course_update` - Course updated
- `promotional` - Promotional message
- `system` - System notification

## Database Indexes

For optimal performance, the following indexes are created:

```javascript
{ userId: 1, createdAt: -1 }
{ userId: 1, read: 1, createdAt: -1 }
```

## Testing

### Using Postman/Thunder Client

1. **Get unread count:**

```
GET /api/notifications/count/unread
Authorization: Bearer {token}
```

2. **Get all notifications:**

```
GET /api/notifications?limit=10&skip=0
Authorization: Bearer {token}
```

3. **Mark as read:**

```
PUT /api/notifications/{notificationId}/read
Authorization: Bearer {token}
```

### Testing Socket Connection

Open browser console on Skill Academy pages:

```javascript
// Check if socket is connected
window.socket?.connected;

// Check notifications
window.socket?.notifications;

// Listen for new notifications
window.socket?.on("notification:new", (notif) => {
  console.log("New:", notif);
});
```

## Troubleshooting

### Socket not connecting

- Check `NEXT_PUBLIC_SOCKET_URL` environment variable
- Ensure backend server is running on correct port
- Check CORS configuration in backend
- Verify token is being sent correctly

### Notifications not appearing

- Check browser console for errors
- Verify user is authenticated
- Check if userId is correct
- Verify notification route returns data

### Database issues

- Ensure MongoDB is running
- Check NotificationModel imports
- Verify schema indexes are created

## Performance Considerations

1. **Limit notification queries:**

   - Use pagination with `skip` and `limit`
   - Default limit is 20 notifications

2. **Cleanup old notifications:**

   - Consider adding TTL index for auto-deletion
   - Archive old notifications

3. **Socket room usage:**
   - Users only receive notifications for their room `user:{userId}`
   - Reduces broadcast overhead

## Future Enhancements

1. Notification preferences
2. Notification categories/filtering
3. Email notifications
4. Push notifications
5. Notification scheduling
6. Read receipts tracking
7. Notification templates

## Security Considerations

1. **Authentication:**

   - Token verified before Socket.io connection
   - User ID from auth middleware

2. **Authorization:**

   - Users can only read their own notifications
   - Users can only delete their own notifications

3. **Rate limiting:**
   - Add rate limiting to notification endpoints
   - Prevent notification spam

## Production Deployment

### Environment Variables

```env
# Backend
PORT=4000
SOCKET_PORT=4000
NODE_ENV=production

# Frontend
NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com
```

### Socket.io Configuration for Production

```javascript
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
  transports: ["websocket", "polling"],
  maxHttpBufferSize: 1e6,
  pingInterval: 25000,
  pingTimeout: 20000,
});
```

## Support

For issues or questions, refer to:

- Socket.io docs: https://socket.io/docs/
- MongoDB Mongoose: https://mongoosejs.com/
- Express.js: https://expressjs.com/
