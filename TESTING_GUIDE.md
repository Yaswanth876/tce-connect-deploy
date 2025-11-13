# TCE Connect - Testing Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or bun
- MongoDB Atlas account (for backend testing)

---

## 📋 Step-by-Step Testing Instructions

### Option 1: Test Frontend Only (Recommended to Start)

Since the Community page doesn't need backend, you can test the frontend immediately:

#### 1. Navigate to Frontend Directory
```powershell
cd D:\tce-connect\frontend
```

#### 2. Install Dependencies (if not already done)
```powershell
npm install
```

#### 3. Start the Development Server
```powershell
npm run dev
```

#### 4. Open in Browser
- The terminal will show a URL (usually `http://localhost:5173`)
- Open this URL in your browser
- You should see the TCE Connect homepage

#### 5. Test Frontend Features (No Backend Required)
- ✅ **Home Page**: Should load with hero section and features
- ✅ **Community Page**: Should show all 14 clubs (hardcoded data)
- ✅ **Navigation**: Test all navbar links
- ✅ **Responsive Design**: Resize browser window to test mobile view
- ✅ **Bottom Navigation**: Should appear on mobile view

---

### Option 2: Full Stack Testing (Frontend + Backend)

To test features that require backend (user authentication, events, dashboards):

#### Backend Setup

##### 1. Navigate to Backend Directory
```powershell
cd D:\tce-connect\backend
```

##### 2. Install Dependencies
```powershell
npm install
```

##### 3. Configure Environment Variables
Create a `.env` file in the backend directory:
```powershell
# In D:\tce-connect\backend\.env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
```

**Get MongoDB Connection String:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you don't have one)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with your database name (e.g., `tce-connect`)

##### 4. Start Backend Server
```powershell
npm run dev
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
```

#### Frontend Setup (with Backend)

##### 1. Open New Terminal
Keep the backend terminal running, open a new PowerShell terminal

##### 2. Navigate to Frontend
```powershell
cd D:\tce-connect\frontend
```

##### 3. Start Frontend Dev Server
```powershell
npm run dev
```

##### 4. Open in Browser
- Go to `http://localhost:5173` (or the URL shown in terminal)

---

## 🧪 Feature Testing Checklist

### Public Pages (No Authentication Required)

#### Home Page (`/`)
- [ ] Hero section loads with TCE logo
- [ ] Feature cards display (Event Discovery, Club Connect, Dashboard)
- [ ] Footer displays correctly
- [ ] Navigation works

#### Community Page (`/community`)
- [ ] All 14 clubs display with icons
- [ ] Search functionality works
- [ ] Club cards are clickable
- [ ] Responsive design works on mobile

#### Events Page (`/events`)
- [ ] Events load from backend (if backend running)
- [ ] Events display in card format
- [ ] Can click "View Details" on each event

#### Event Details Page (`/events/:id`)
- [ ] Event details load
- [ ] Register button appears (if logged in)
- [ ] Shows event date, venue, description

### Authentication Pages

#### Register Page (`/register`)
- [ ] Form displays all fields (Name, Email, Password, Confirm Password, Role)
- [ ] Email validation works (shows error for invalid email)
- [ ] Password validation works (min 6 characters)
- [ ] Password confirmation works (passwords must match)
- [ ] Name validation works (min 2 characters)
- [ ] Loading spinner shows during registration
- [ ] Success toast appears on successful registration
- [ ] Error toast appears on failure
- [ ] Redirects to appropriate dashboard after registration

#### Login Page (`/login`)
- [ ] Form displays email, password, and role fields
- [ ] Email validation works
- [ ] Password validation works
- [ ] Loading spinner shows during login
- [ ] Success toast appears on successful login
- [ ] Error toast appears on failure
- [ ] Redirects to appropriate dashboard based on role

### Protected Pages (Authentication Required)

#### Student Dashboard (`/student-dashboard`)
- [ ] Requires student login
- [ ] Shows "My Registered Events" section
- [ ] Displays stats (Total Events, Upcoming, Completed)
- [ ] Shows list of registered events
- [ ] Can unregister from events
- [ ] Toast notifications work for actions

#### Organizer Dashboard (`/organizer-dashboard`)
- [ ] Requires organizer login
- [ ] Shows "My Created Events" section
- [ ] Can create new events
- [ ] Can edit existing events
- [ ] Can delete events
- [ ] Can view registered participants list
- [ ] Participant details show correctly (name, email, role)
- [ ] Can export participants to CSV
- [ ] Registration count displays correctly
- [ ] Toast notifications work for actions

### Event Registration Testing

#### Student Registration Flow
1. **Login as Student**
   - Navigate to `/login`
   - Use student credentials
   - Should redirect to student dashboard

2. **Browse Events**
   - Go to `/events` page
   - Click on any event card
   - Should show event details

3. **Register for Event (Database Storage)**
   - [ ] Click "Register" button on event details page
   - [ ] Success toast appears
   - [ ] Registration is stored in database
   - [ ] Button changes to "Cancel Registration"
   - [ ] Event appears in student dashboard

4. **Register for Event (with Google Form)**
   - [ ] If event has Google Form link, after DB registration:
   - [ ] Google Form opens in new tab automatically
   - [ ] Toast shows "Complete your registration"
   - [ ] Student fills Google Form separately

5. **Cancel Registration**
   - [ ] Click "Cancel Registration" button
   - [ ] Success toast appears
   - [ ] Event removed from student dashboard
   - [ ] Registration removed from database

#### Organizer Registration Management
1. **Create Event with Registration Options**
   - Login as organizer
   - Click "Create Event"
   - [ ] Form includes all fields (title, description, date, venue, department, type)
   - [ ] Registration Link field for Google Form (optional)
   - [ ] Can save event without Google Form link
   - [ ] Can save event with Google Form link

2. **View Participants**
   - [ ] Click "View Participants" (eye icon) on event card
   - [ ] Dialog opens with participant list
   - [ ] Shows total participant count
   - [ ] Displays event date and type
   - [ ] Each participant shows: number, name, email, role
   - [ ] Empty state shows when no participants

3. **Export Participants**
   - [ ] Click "Export to CSV" button
   - [ ] CSV file downloads automatically
   - [ ] File named correctly (event_title_participants.csv)
   - [ ] CSV contains: No., Name, Email, Role columns
   - [ ] All participant data is included

#### Database Verification
- [ ] Participants array populated in Event model
- [ ] User ObjectId stored in participants array
- [ ] Population works (participant details retrieved)
- [ ] Duplicate registration prevented
- [ ] Registration removal works correctly

#### Profile Page (`/profile`)
- [ ] Shows user information
- [ ] Can edit profile details
- [ ] Toast notification on successful update

#### Settings Page (`/settings`)
- [ ] Settings page loads
- [ ] Can modify settings

### Security Testing

#### Protected Routes
- [ ] Accessing `/student-dashboard` without login redirects to login
- [ ] Accessing `/organizer-dashboard` without login redirects to login
- [ ] Students cannot access organizer dashboard
- [ ] Organizers cannot access student dashboard
- [ ] Token expiration is handled correctly

#### Error Handling
- [ ] Error boundary catches React errors
- [ ] Toast notifications show for API errors
- [ ] Network errors are handled gracefully
- [ ] Invalid routes show 404 page

### UI/UX Testing

#### Loading States
- [ ] Loading spinners appear during API calls
- [ ] Forms are disabled during submission
- [ ] Loading text shows appropriate messages

#### Form Validation
- [ ] Real-time validation on input fields
- [ ] Error messages display correctly
- [ ] Error borders appear on invalid fields
- [ ] Validation clears when user corrects input

#### Responsive Design
- [ ] Desktop view works (1920x1080)
- [ ] Tablet view works (768x1024)
- [ ] Mobile view works (375x667)
- [ ] Bottom navigation appears on mobile
- [ ] Forms are mobile-friendly

#### Accessibility
- [ ] Can navigate with keyboard (Tab key)
- [ ] Form labels are properly associated
- [ ] ARIA attributes are present
- [ ] Color contrast is sufficient

---

## 🐛 Common Issues & Solutions

### Frontend Issues

**Issue: `npm run dev` fails**
- Solution: Delete `node_modules` and `package-lock.json`, then run `npm install`

**Issue: Page not loading**
- Check browser console for errors (F12)
- Ensure dev server is running
- Try clearing browser cache

**Issue: Styles not applying**
- Check if Tailwind CSS is configured correctly
- Restart dev server

### Backend Issues

**Issue: "MongoDB connection failed"**
- Check your `.env` file has correct `MONGODB_URI`
- Ensure IP address is whitelisted in MongoDB Atlas (Network Access)
- Verify database user credentials

**Issue: "Port 5000 already in use"**
- Change port in `.env` file: `PORT=5001`
- Or kill the process using port 5000

**Issue: "Cannot POST /api/..."**
- Ensure backend server is running
- Check if route exists in backend
- Verify CORS is configured

### Authentication Issues

**Issue: "Token expired"**
- Logout and login again
- Token should refresh automatically
- Check JWT_SECRET in backend `.env`

**Issue: "User not found"**
- Register a new user
- Check MongoDB Atlas to see if users are being created

---

## 🧑‍💻 Development Testing

### Test User Accounts

Create these test accounts for testing:

**Student Account:**
- Email: `student@tce.edu`
- Password: `student123`
- Role: Student

**Organizer Account:**
- Email: `organizer@tce.edu`
- Password: `organizer123`
- Role: Organizer

### API Testing (Optional)

You can test backend APIs directly using:

#### Using Browser
- GET requests: Open in browser
  - `http://localhost:5000/api/users`
  - `http://localhost:5000/api/events`

#### Using PowerShell (curl)
```powershell
# Register a user
Invoke-RestMethod -Uri "http://localhost:5000/api/users/register" -Method POST -Body (@{name="Test User"; email="test@tce.edu"; password="test123"; role="student"} | ConvertTo-Json) -ContentType "application/json"

# Login
Invoke-RestMethod -Uri "http://localhost:5000/api/users/login" -Method POST -Body (@{email="test@tce.edu"; password="test123"; role="student"} | ConvertTo-Json) -ContentType "application/json"

# Get all events
Invoke-RestMethod -Uri "http://localhost:5000/api/events" -Method GET
```

---

## 📊 Performance Testing

- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] Smooth animations
- [ ] No console errors
- [ ] No memory leaks

---

## ✅ Final Checklist Before Deployment

- [ ] All features working
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Authentication working
- [ ] Protected routes secured
- [ ] Error handling implemented
- [ ] Toast notifications working
- [ ] Loading states present
- [ ] Forms validated
- [ ] Environment variables set

---

## 🆘 Getting Help

If you encounter issues:

1. **Check Console Errors**
   - Browser: Press F12 → Console tab
   - Terminal: Check backend terminal for errors

2. **Check Network Requests**
   - Browser: F12 → Network tab
   - Look for failed requests (red)

3. **Verify Configuration**
   - Frontend: Check `vite.config.ts`
   - Backend: Check `.env` file

4. **Common Debug Commands**
   ```powershell
   # Check Node version
   node --version
   
   # Check npm version
   npm --version
   
   # Check what's running on port 5000
   netstat -ano | findstr :5000
   
   # Check what's running on port 5173
   netstat -ano | findstr :5173
   ```

---

## 🎉 Success Indicators

Your app is working correctly if:

✅ Frontend dev server starts without errors
✅ Backend connects to MongoDB successfully
✅ You can register and login
✅ Dashboard shows your data
✅ Toast notifications appear
✅ Protected routes redirect properly
✅ Community page shows all clubs
✅ Mobile view works correctly

---

**Happy Testing! 🚀**
