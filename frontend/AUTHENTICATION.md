# Authentication & Protected Routes

## Overview
The TCE Connect application implements a robust JWT-based authentication system with protected routes, automatic token validation, and role-based access control.

## Features

### 1. JWT Token Authentication
- **Secure Authentication**: Uses JWT (JSON Web Tokens) for secure user authentication
- **Token Storage**: Tokens stored in localStorage for persistence
- **Automatic Validation**: Validates tokens with backend on protected route access
- **Expiration Handling**: Automatically detects and handles expired tokens

### 2. Protected Routes
- **Route Protection**: Restricts access to authenticated users only
- **Role-Based Access**: Different access levels for students and organizers
- **Loading States**: Shows loading spinner during validation
- **Redirect Support**: Remembers original destination and redirects after login

### 3. Token Expiration Handling
- **Client-Side Check**: Quick token expiration check before API calls
- **Backend Validation**: Verifies token validity with server
- **Auto-Logout**: Clears credentials when token expires
- **User Notification**: Toast notification for expired sessions

### 4. Role-Based Access Control
- **Student Routes**: `/student-dashboard` - Only accessible to students
- **Organizer Routes**: `/organizer-dashboard` - Only accessible to organizers
- **Shared Protected Routes**: `/profile`, `/settings` - Any authenticated user

## Implementation

### Protected Route Component
```tsx
// Usage in App.tsx
<Route 
  path="/student-dashboard" 
  element={
    <ProtectedRoute requiredRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  } 
/>
```

### Auth Utility Functions
Located in `src/lib/auth.ts`:

- `isAuthenticated()` - Check if user has valid token
- `isTokenExpired()` - Check if JWT token is expired
- `clearAuth()` - Clear all authentication data
- `handleTokenExpired()` - Handle token expiration
- `getUserRole()` - Get current user's role
- `getToken()` - Get current JWT token
- `authenticatedFetch()` - Make authenticated API requests

### Example Usage

#### Making Authenticated API Calls
```typescript
import { authenticatedFetch } from '@/lib/auth';

try {
  const response = await authenticatedFetch('http://localhost:5000/api/users/me', {
    method: 'GET',
  });
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Request failed:', error);
}
```

#### Checking Authentication Status
```typescript
import { isAuthenticated, isTokenExpired } from '@/lib/auth';

// Quick client-side check
if (isTokenExpired()) {
  console.log('Token is expired');
}

// Backend validation
const isValid = await isAuthenticated();
if (isValid) {
  console.log('User is authenticated');
}
```

## Protected Routes

### Public Routes (No Authentication Required)
- `/` - Home page
- `/events` - Events listing
- `/events/:id` - Event details
- `/community` - Community/Clubs page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Authentication Required)
- `/profile` - User profile (any authenticated user)
- `/settings` - User settings (any authenticated user)

### Role-Specific Routes
- `/student-dashboard` - Student-only dashboard
- `/organizer-dashboard` - Organizer-only dashboard

## Security Features

### 1. Token Validation Flow
1. User attempts to access protected route
2. ProtectedRoute component checks for token
3. Client-side expiration check (JWT decode)
4. Backend validation via `/api/users/me`
5. Grant or deny access based on response

### 2. Automatic Cleanup
- Expired tokens automatically removed
- All auth data cleared on logout
- Storage events notify components of auth changes

### 3. Error Handling
- Toast notifications for auth errors
- Graceful degradation on validation failures
- Redirect to login with return URL

### 4. Role Validation
- Prevents role escalation
- Redirects to appropriate dashboard if wrong role
- Server-side role validation on all API endpoints

## Testing

### Test Protected Routes
1. **Without Login**: Try accessing `/profile` → Should redirect to `/login`
2. **After Login**: Access `/profile` → Should show profile page
3. **Token Expiration**: Wait for token to expire → Should auto-redirect to login
4. **Wrong Role**: Student trying to access `/organizer-dashboard` → Redirect to student dashboard

### Test Token Expiration
1. Login to the application
2. Manually expire token (or wait for natural expiration)
3. Try to access protected route
4. Should see "Session expired" toast and redirect to login

### Test Role-Based Access
1. Login as student
2. Try to access `/organizer-dashboard`
3. Should see "Access denied" toast and redirect to student dashboard

## Environment Configuration

### Frontend
- API Base URL: `http://localhost:5000`
- Token Storage: localStorage
- Token Key: `tce_token`

### Backend (Already Configured)
- JWT Secret: Set in `.env` as `JWT_SECRET`
- Token Expiration: 24 hours (default)
- Protected endpoints use `authMiddleware`

## Best Practices

1. **Always Use authenticatedFetch**: For API calls requiring authentication
2. **Check Token Before Operations**: Use `isTokenExpired()` for quick checks
3. **Handle 401 Responses**: Always handle unauthorized responses
4. **Clear Auth on Logout**: Use `clearAuth()` utility function
5. **Validate Roles**: Check user role before showing role-specific content

## Troubleshooting

### Common Issues

**1. "Session expired" appearing immediately**
- Check backend JWT_SECRET is set
- Verify token expiration time in backend
- Check system clock synchronization

**2. Protected routes not working**
- Verify token is stored correctly
- Check backend `/api/users/me` endpoint
- Verify CORS settings in backend

**3. Role-based access not working**
- Verify role is stored in localStorage
- Check backend role validation
- Ensure role matches exactly ("student" or "organizer")

## Future Enhancements

- [ ] Refresh token implementation
- [ ] Remember me functionality
- [ ] Session timeout warning
- [ ] Multi-factor authentication
- [ ] OAuth integration (Google, GitHub)
- [ ] Rate limiting for login attempts
