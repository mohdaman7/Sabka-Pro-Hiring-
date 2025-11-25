# Skill Academy Backend Integration Guide

## Overview

Complete integration between Skill Academy frontend login/register with backend API endpoints. Users' email, phone, name, and token are securely stored and managed.

## Data Flow Architecture

### 1. Registration Flow

```
User Registration Page
    ↓
Send OTP → Backend (/api/auth/skill-academy/send-otp)
    ↓
Verify OTP → Backend (/api/auth/skill-academy/verify-otp)
    ↓
Save to localStorage:
  - Email ✓
  - Phone ✓
  - Name ✓
    ↓
Redirect to Home → Profile shows in navbar
```

### 2. Login Flow

```
User Login Page
    ↓
Email + Password → Backend (/api/auth/login)
    ↓
Backend validates & returns:
  - User ID ✓
  - Email ✓
  - Phone ✓
  - Name ✓
  - Role ✓
  - JWT Token ✓
  - Profile data ✓
    ↓
Save to localStorage:
  - skillAcademyUser (full user data)
  - skillAcademyToken (JWT)
    ↓
Axios interceptor adds token to all API requests
    ↓
Profile shows in navbar with stored data
```

## What's Stored in localStorage

### 1. User Data (skillAcademyUser)

```json
{
  "id": "user_id_from_backend",
  "email": "john@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "role": "student",
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "...": "other profile fields"
  }
}
```

### 2. Authentication Token (skillAcademyToken)

```
JWT token from backend
Used in: Authorization: Bearer {token}
```

## Backend API Endpoints

### 1. Registration: Send OTP

**Endpoint**: `POST /api/auth/skill-academy/send-otp`

**Request**:

```json
{
  "phone": "+1234567890",
  "email": "john@example.com",
  "name": "John Doe"
}
```

**Response**:

```json
{
  "success": true,
  "message": "OTP sent successfully",
  "expiresIn": 600,
  "otp": "123456" // Only in development
}
```

### 2. Registration: Verify OTP

**Endpoint**: `POST /api/auth/skill-academy/verify-otp`

**Request**:

```json
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

**Response**:

```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

### 3. Login

**Endpoint**: `POST /api/auth/login`

**Request**:

```json
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7g8h9",
      "email": "john@example.com",
      "name": "John Doe",
      "phone": "+1234567890",
      "role": "student",
      "status": "active",
      "mustChangePassword": false
    },
    "profile": {
      "userId": "65f1a2b3c4d5e6f7g8h9",
      "firstName": "John",
      "lastName": "Doe",
      "bio": "...",
      "avatar": "url or path"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Frontend Implementation

### 1. Login Page (`/app/skill-academy/login/page.jsx`)

**API Call**:

```javascript
const response = await fetch(
  `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
  }/api/auth/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }
);

const data = await response.json();
```

**Data Storage**:

```javascript
const userData = {
  id: data.data.user.id,
  email: data.data.user.email,
  name: data.data.user.name,
  phone: data.data.user.phone,
  role: data.data.user.role,
  token: data.data.token,
  profile: data.data.profile,
};

localStorage.setItem("skillAcademyUser", JSON.stringify(userData));
localStorage.setItem("skillAcademyToken", data.data.token);
```

### 2. Registration Component (`/views/skill-academy/components/SkillAcademyRegister.jsx`)

**Data Storage**:

```javascript
localStorage.setItem(
  "skillAcademyUser",
  JSON.stringify({
    email: formData.email,
    name: formData.name,
    phone: formData.phone,
  })
);
```

### 3. Axios Interceptor (`/lib/axios.js`)

**Auto-adds token to requests**:

```javascript
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (!token) {
      token = localStorage.getItem("skillAcademyToken");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### 4. Navbar (`/app/skill-academy/layout.jsx`)

**Retrieves user data**:

```javascript
useEffect(() => {
  try {
    const storedUser = localStorage.getItem("skillAcademyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  } catch (error) {
    console.error("Failed to load user:", error);
  }
  // ...
}, []);
```

**Displays in profile dropdown**:

- User name (from `user.name`)
- Email (from `user.email`)
- Phone (from `user.phone`) - for future use
- Avatar initials (generated from name)

## Security Considerations

### 1. Token Management

- ✅ JWT token stored in localStorage (accessible from JavaScript)
- ✅ Token automatically added to all API requests
- ✅ Token removed on logout
- ⚠️ **Note**: For production, consider using:
  - HTTP-only cookies for token storage
  - CSRF protection
  - Token refresh strategy

### 2. Password Security

- ✅ Passwords hashed with bcrypt on backend
- ✅ Passwords validated on form submission (frontend)
- ✅ Never stored in localStorage
- ✅ HTTPS recommended for transmission

### 3. User Data Privacy

- ✅ Sensitive data encrypted in transit
- ✅ Email and phone stored (necessary for user identification)
- ✅ Profile data fetched from backend
- ✅ No passwords stored on frontend

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_connection_string
```

## Integration Checklist

### Setup Phase

- [ ] Backend API running on port 5000
- [ ] MongoDB connection configured
- [ ] JWT_SECRET set in backend .env
- [ ] CORS enabled for frontend origin

### Login Integration

- [ ] Test login with valid credentials
- [ ] Verify user data stored in localStorage
- [ ] Check token in Authorization header
- [ ] Verify profile dropdown shows user info
- [ ] Test logout clears data

### Registration Integration

- [ ] Test OTP send for valid phone/email
- [ ] Test OTP verification
- [ ] Verify user data stored after registration
- [ ] Test redirect to home after verification

### API Interceptor

- [ ] Token automatically added to requests
- [ ] Works with both "token" and "skillAcademyToken"
- [ ] Handles 401 responses appropriately
- [ ] Network errors handled gracefully

## Testing Guide

### 1. Manual Testing

**Test Login**:

```
1. Go to /skill-academy/login
2. Enter email: test@example.com
3. Enter password: (valid password)
4. Click Sign In
5. Verify localStorage:
   - skillAcademyUser contains email, name, phone
   - skillAcademyToken contains JWT
6. Verify profile shows in navbar
```

**Test Registration**:

```
1. Go to /skill-academy/register
2. Enter name, email, phone
3. Send OTP
4. Enter OTP
5. Verify localStorage populated
6. Verify redirects to home
```

**Test API Calls**:

```
1. Open browser DevTools
2. Go to Network tab
3. Make any API request
4. Verify Authorization header contains token
5. Response should contain user data
```

### 2. API Testing (Postman/Thunder Client)

**Login Test**:

```
POST http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body: {
  "email": "test@example.com",
  "password": "password123"
}
```

**Response should contain**:

- user.id ✓
- user.email ✓
- user.phone ✓
- token ✓

## Common Issues & Fixes

### Issue: Login fails with "Network error"

**Fix**: Check if backend is running

```bash
cd backend
npm run dev
# Should show: ✓ Server running on port 5000
```

### Issue: Token not added to API requests

**Fix**: Verify token is saved to localStorage

```javascript
console.log(localStorage.getItem("skillAcademyToken"));
// Should output JWT token string
```

### Issue: Phone not showing in profile

**Fix**: Verify backend returns phone in user object

```javascript
// Check API response includes phone field
console.log(data.data.user.phone);
```

### Issue: localStorage cleared on refresh

**Fix**: Normal behavior - only persists during session
**Solution**: To persist beyond browser close, use cookies or backend session

## File Structure

```
Frontend:
├── app/skill-academy/
│   ├── login/page.jsx          ← Login with API integration
│   ├── register/page.jsx       ← Registration wrapper
│   └── layout.jsx              ← Profile dropdown + navbar
├── views/skill-academy/components/
│   └── SkillAcademyRegister.jsx ← Registration with OTP
└── lib/
    └── axios.js                ← API interceptor with token

Backend:
├── src/routes/
│   └── auth.js                 ← Auth endpoints
├── src/controllers/
│   └── authController.js       ← Login/register logic
├── src/models/
│   ├── User.js
│   ├── Student.js
│   └── OTP.js
└── .env                        ← JWT_SECRET, DB_URL
```

## Next Steps

1. **Implement Backend Validation**:

   - Add email verification
   - Add phone verification
   - Add password strength validation

2. **Add Token Refresh**:

   - Implement refresh token endpoint
   - Auto-refresh expired tokens

3. **Add User Profile Management**:

   - Update profile endpoint
   - Upload avatar
   - Change phone/email

4. **Add Logout Endpoint**:

   - Optional token blacklisting
   - Track user sessions

5. **Add Error Handling**:
   - Specific error messages
   - Retry logic for network failures
   - Toast notifications

## Summary

✅ Frontend sends credentials to backend
✅ Backend validates and returns token + user data
✅ User data stored in localStorage (email, phone, name, id)
✅ Token automatically added to API requests
✅ Profile displays stored user information
✅ Logout clears all stored data
✅ Ready for production with security enhancements
