# 🎨 TCE Connect Frontend# TCE-Connect



> Modern, responsive React application built with TypeScript, Vite, and Tailwind CSS## About TCE-Connect



![React](https://img.shields.io/badge/React-18.3-blue?logo=react)**TCE-Connect** is a centralized web platform designed exclusively for **Thiagarajar College of Engineering (TCE)** to streamline event communication and student engagement. It serves as a digital bridge between students and clubs, bringing all departmental and club activities under one interactive interface.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)

![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)### Key Features

![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-cyan?logo=tailwindcss)

- **🎯 For Students:**

---  - Browse and explore all campus events through Home, Events, and Clubs sections

  - Easy event registration with one-click functionality

## 📖 Table of Contents  - View detailed event information including date, time, venue, and requirements

  - Save and bookmark favorite events

- [Overview](#-overview)  - Track registered events in personal dashboard

- [Features](#-features)  - Share events with peers

- [Tech Stack](#-tech-stack)

- [Project Structure](#-project-structure)- **🎪 For Event Organizers:**

- [Getting Started](#-getting-started)  - Dedicated organizer dashboard for event management

- [Pages & Routes](#-pages--routes)  - Create, update, and manage events

- [Components](#-components)  - Track event registrations and participant analytics

- [Authentication](#-authentication)  - Monitor event success rates

- [State Management](#-state-management)

- [Styling](#-styling)- **🏛️ For Clubs:**

- [Build & Deploy](#-build--deploy)  - Direct links to TCE Club Portal for detailed club information

  - Display club activities and upcoming events

---  - Easy access to club resources



## 🎯 Overview### User Roles



The TCE Connect frontend is a modern, responsive web application that provides an intuitive interface for students and organizers to manage campus events. Built with cutting-edge technologies, it offers a seamless user experience with real-time updates and beautiful UI components.1. **Students**: Register for events, explore clubs, and stay updated on campus activities

2. **Event Organizers**: Create and manage events, track registrations, and engage with participants

### Key Highlights

### Tech Stack

- ⚡ **Lightning Fast**: Vite-powered development with HMR

- 🎨 **Beautiful UI**: shadcn/ui components with Tailwind CSSBuilt with modern web technologies for a responsive and intuitive user experience:

- 📱 **Fully Responsive**: Mobile-first design with bottom navigation

- 🔐 **Secure**: JWT-based authentication with protected routes**Frontend:**

- 🎭 **Role-Based**: Separate dashboards for students and organizers- **React** - UI component library

- ♿ **Accessible**: ARIA-compliant components- **TypeScript** - Type-safe JavaScript

- 🌙 **Modern Design**: Clean, intuitive interface- **Tailwind CSS** - Utility-first CSS framework

- **Vite** - Fast build tool and dev server

---- **React Router** - Client-side routing

- **Lucide React** - Icon library

## ✨ Features- **shadcn/ui** - Accessible component library



### For Students**Backend:**

- **Supabase** - PostgreSQL database with real-time capabilities

- ✅ Browse upcoming events (Technical, Cultural, Sports)- **Supabase Auth** - Authentication and user management

- ✅ Filter events by type and department- **Row Level Security** - Database-level access control

- ✅ View detailed event information

- ✅ Register for events via Google Forms## Project info

- ✅ Track registered events on dashboard

- ✅ Explore campus clubs and communities**Repository**: tce-connect-v2  

- ✅ Update profile information**Owner**: Yaswanth876



### For Organizers## Getting Started



- ✅ Create and manage events### Prerequisites

- ✅ Add Google Form registration links

- ✅ Edit event details- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

- ✅ Delete events

- ✅ View participant lists### Installation

- ✅ Dashboard with event statistics

- ✅ Publish events instantly```sh

# Step 1: Clone the repository

### General Featuresgit clone <YOUR_GIT_URL>



- ✅ User authentication (Login/Register)# Step 2: Navigate to the project directory

- ✅ Responsive design (Desktop, Tablet, Mobile)cd tce-connect/frontend

- ✅ Toast notifications for user feedback

- ✅ Error handling with error boundaries# Step 3: Install dependencies

- ✅ Loading states for async operationsnpm install

- ✅ 404 page for invalid routes

- ✅ Settings page for customization# Step 4: Set up environment variables

cp .env.example .env

---# Edit .env and add your Supabase credentials



## 🛠️ Tech Stack# Step 5: Start the development server

npm run dev

| Technology | Version | Purpose |```

|------------|---------|---------|

| **React** | 18.3 | UI library |The application will be available at `http://localhost:5173`

| **TypeScript** | 5.x | Type-safe JavaScript |

| **Vite** | 5.x | Build tool & dev server |### Supabase Backend Setup

| **Tailwind CSS** | 3.x | Utility-first CSS |

| **React Router** | 6.x | Client-side routing |TCE-Connect uses Supabase for backend services. Follow these guides:

| **shadcn/ui** | Latest | UI component library |

| **Lucide React** | Latest | Icon library |1. **Quick Start**: See [`SUPABASE_QUICK_START.md`](../SUPABASE_QUICK_START.md) for a checklist

| **Sonner** | Latest | Toast notifications |2. **Detailed Setup**: See [`SUPABASE_SETUP.md`](../SUPABASE_SETUP.md) for complete instructions

| **date-fns** | Latest | Date formatting |3. **Integration Guide**: See [`SUPABASE_INTEGRATION.md`](./SUPABASE_INTEGRATION.md) for API usage



### Development Tools**Important**: You must set up Supabase and create the database schema before the application can work with real data.



- **ESLint** - Code linting## Project Structure

- **PostCSS** - CSS processing

- **TypeScript** - Type checking```

- **Bun** - Package manager (optional)frontend/

├── src/

---│   ├── components/        # Reusable UI components

│   │   ├── ui/           # shadcn/ui components

## 📁 Project Structure│   │   ├── Navbar.tsx    # Navigation bar

│   │   ├── Footer.tsx    # Footer component

```│   │   ├── EventCard.tsx # Event display card

frontend/│   │   └── ClubCard.tsx  # Club display card

├── src/│   ├── pages/            # Application pages

│   ├── components/          # Reusable components│   │   ├── Home.tsx      # Landing page

│   │   ├── ui/             # shadcn/ui components (37 components)│   │   ├── Events.tsx    # Events listing

│   │   ├── Navbar.tsx      # Top navigation│   │   ├── EventDetails.tsx # Individual event page

│   │   ├── BottomNav.tsx   # Mobile bottom nav│   │   ├── Community.tsx # Clubs page

│   │   ├── Footer.tsx      # Page footer│   │   ├── Login.tsx     # Authentication

│   │   ├── EventCard.tsx   # Event display card│   │   ├── StudentDashboard.tsx

│   │   ├── ClubCard.tsx    # Club display card│   │   ├── OrganizerDashboard.tsx

│   │   ├── ProtectedRoute.tsx  # Auth guard│   │   ├── Profile.tsx

│   │   ├── ErrorBoundary.tsx   # Error handler│   │   └── Settings.tsx

│   │   └── LoadingSpinner.tsx  # Loading state│   ├── hooks/            # Custom React hooks

│   ││   ├── lib/              # Utility functions

│   ├── pages/              # Page components│   └── App.tsx           # Main application component

│   │   ├── Home.tsx        # Landing page├── public/               # Static assets

│   │   ├── Login.tsx       # Login page└── package.json          # Dependencies

│   │   ├── Register.tsx    # Registration page```

│   │   ├── Events.tsx      # Event listing

│   │   ├── EventDetails.tsx # Event detail view## Features in Detail

│   │   ├── Community.tsx   # Clubs listing

│   │   ├── StudentDashboard.tsx    # Student dashboard### Event Management

│   │   ├── OrganizerDashboard.tsx  # Organizer dashboard- **Event Discovery**: Browse 22+ campus events across Technical, Cultural, and Sports categories

│   │   ├── Profile.tsx     # User profile- **Advanced Filtering**: Filter events by category (All, Technical, Cultural, Sports)

│   │   ├── Settings.tsx    # Settings page- **Search Functionality**: Quickly find events by title or description

│   │   └── NotFound.tsx    # 404 page- **Event Details**: Comprehensive information for each event including highlights, requirements, and registration status

│   │- **Registration System**: Simple registration process with capacity tracking

│   ├── lib/                # Utilities

│   │   ├── utils.ts        # Helper functions### Club Integration

│   │   └── auth.ts         # Auth utilities- **12+ Active Clubs**: Direct access to TCE's vibrant club ecosystem

│   │- **Club Portal Links**: Each club card links to the official TCE Club Portal

│   ├── hooks/              # Custom React hooks- **Club Categories**: Technical, Cultural, and Sports clubs organized for easy discovery

│   │   ├── use-toast.ts    # Toast hook

│   │   └── use-mobile.tsx  # Mobile detection### User Experience

│   │- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

│   ├── App.tsx             # Root component- **Role-Based Access**: Separate interfaces for students and event organizers

│   ├── main.tsx            # Entry point- **Intuitive Navigation**: Easy-to-use navbar with quick access to all sections

│   └── index.css           # Global styles- **Modern UI**: Clean, professional design with smooth animations

│

├── public/                 # Static assets## Available Scripts

│   └── robots.txt

│```sh

├── index.html              # HTML template# Development server

├── vite.config.ts          # Vite configurationnpm run dev

├── tailwind.config.ts      # Tailwind configuration

├── tsconfig.json           # TypeScript config# Build for production

├── components.json         # shadcn/ui confignpm run build

└── package.json            # Dependencies

```# Preview production build

npm run preview

---

# Run linter

## 🚀 Getting Startednpm run lint

```

### Prerequisites

- **Node.js** v16+ or **Bun** runtime
- **npm**, **yarn**, or **bun** package manager
- Backend server running (see [backend README](../backend/README.md))

### Installation

#### 1. Install Dependencies

**Using npm:**
```bash
npm install
```

**Using bun:**
```bash
bun install
```

#### 2. Configure Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=TCE Connect
```

#### 3. Start Development Server

**Using npm:**
```bash
npm run dev
```

**Using bun:**
```bash
bun run dev
```

The app will start on `http://localhost:5173`

#### 4. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

#### 5. Preview Production Build

```bash
npm run preview
```

---

## 🗺️ Pages & Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home.tsx` | Landing page with hero section |
| `/login` | `Login.tsx` | User login form |
| `/register` | `Register.tsx` | User registration form |
| `/events` | `Events.tsx` | Public event listing |
| `/events/:id` | `EventDetails.tsx` | Event detail view |
| `/community` | `Community.tsx` | Campus clubs directory |

### Protected Routes (Require Authentication)

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/dashboard` | `StudentDashboard.tsx` | Student | Student dashboard |
| `/dashboard` | `OrganizerDashboard.tsx` | Organizer | Organizer dashboard |
| `/profile` | `Profile.tsx` | All | User profile page |
| `/settings` | `Settings.tsx` | All | Settings page |

### Error Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `*` | `NotFound.tsx` | 404 page |

---

## 🧩 Components

### Core Components

#### Navbar
```tsx
// Top navigation with logo, links, and auth buttons
<Navbar />
```

Features:
- Responsive design
- User menu dropdown
- Active link highlighting
- Logout functionality

#### BottomNav
```tsx
// Mobile bottom navigation
<BottomNav />
```

Features:
- Fixed bottom position
- Icon-based navigation
- Active state indicators
- Responsive (mobile only)

#### EventCard
```tsx
<EventCard
  id="123"
  title="Tech Symposium"
  description="Annual event..."
  date="2025-12-15"
  venue="Auditorium"
  type="technical"
/>
```

Features:
- Event type badge
- Date formatting
- Venue display
- View details button

#### ClubCard
```tsx
<ClubCard
  name="Code Club"
  description="Programming community"
  icon="💻"
  members={150}
  portalUrl="/portal/code-club"
/>
```

#### ProtectedRoute
```tsx
<ProtectedRoute>
  <StudentDashboard />
</ProtectedRoute>
```

Features:
- JWT token validation
- Automatic redirect to login
- Token refresh handling

### UI Components (shadcn/ui)

Available components in `src/components/ui/`:
- `button`, `card`, `input`, `label`, `textarea`
- `dialog`, `alert-dialog`, `sheet`, `drawer`
- `dropdown-menu`, `navigation-menu`, `menubar`
- `tabs`, `accordion`, `collapsible`
- `badge`, `avatar`, `separator`
- `toast`, `sonner` (notifications)
- `table`, `pagination`, `scroll-area`
- `calendar`, `form`, `select`, `checkbox`, `switch`
- And 20+ more...

---

## 🔐 Authentication

### Auth Flow

1. **Registration**
   - User fills registration form
   - POST to `/api/users/register`
   - JWT token stored in localStorage

2. **Login**
   - User enters credentials
   - POST to `/api/users/login`
   - Token stored, user redirected

3. **Protected Routes**
   - ProtectedRoute checks for token
   - Token sent in Authorization header
   - Redirects to login if missing/invalid

4. **Logout**
   - Remove token from localStorage
   - Redirect to home page

### Auth Utilities

```typescript
// lib/auth.ts

// Get stored token
const token = getToken();

// Set token
setToken('jwt_token_here');

// Remove token
removeToken();

// Check if authenticated
const isAuthenticated = !!getToken();

// Get user from token
const user = getUserFromToken();
```

---

## 📊 State Management

### Local State

Uses React hooks:
- `useState` - Component state
- `useEffect` - Side effects
- `useContext` - Global state (if needed)

### Form State

Forms managed with controlled components:
```tsx
const [formData, setFormData] = useState({
  title: '',
  description: '',
  date: ''
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

### API State

```tsx
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  fetchEvents();
}, []);
```

---

## 🎨 Styling

### Tailwind CSS

Utility-first CSS framework configured in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: { /* custom colors */ },
        secondary: { /* custom colors */ }
      }
    }
  }
}
```

### CSS Variables

Defined in `src/index.css`:
```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  /* ... more variables */
}
```

### Component Styling

```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

---

## 🔧 Development

### Scripts

```json
{
  "dev": "vite",              // Start dev server
  "build": "tsc && vite build", // Build for production
  "preview": "vite preview",  // Preview production build
  "lint": "eslint ."          // Lint code
}
```

### Hot Module Replacement (HMR)

Vite provides instant HMR:
- Save a file → See changes immediately
- No full page reload
- Preserves component state

### Type Checking

```bash
# Run TypeScript type checking
npx tsc --noEmit
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

---

## 📦 Build & Deploy

### Production Build

```bash
npm run build
```

Output directory: `dist/`

Build includes:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps (optional)

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### 2. Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### 3. GitHub Pages

```bash
# Add to package.json
"homepage": "https://username.github.io/tce-connect"

# Build
npm run build

# Deploy (manual)
# Copy dist/ to gh-pages branch
```

#### 4. Static Server

```bash
# Serve dist/ folder
npx serve dist
```

### Environment Variables for Production

```env
VITE_API_URL=https://your-api.com/api
VITE_APP_NAME=TCE Connect
```

**Important**: Rebuild after changing environment variables!

---

## 🧪 Testing

### Manual Testing Checklist

- ✅ User registration and login
- ✅ Event listing and filtering
- ✅ Event details page
- ✅ Event creation (organizer)
- ✅ Event registration (student)
- ✅ Dashboard functionality
- ✅ Mobile responsiveness
- ✅ Toast notifications
- ✅ Error handling
- ✅ Protected routes

### Browser Testing

Test on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎨 Customization

### Adding New Pages

1. Create page component in `src/pages/`
```tsx
// src/pages/NewPage.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
```

2. Add route in `App.tsx`
```tsx
<Route path="/new-page" element={<NewPage />} />
```

### Adding UI Components

```bash
# Add shadcn/ui component
npx shadcn@latest add button
npx shadcn@latest add card
```

### Customizing Theme

Edit `tailwind.config.ts` and `src/index.css`:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'brand': '#ff6b6b'
      }
    }
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

**❌ "Vite server not starting"**
```bash
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <process_id> /F

# Or change port
npm run dev -- --port 3000
```

**❌ "Module not found"**
```bash
# Clear node_modules and reinstall
Remove-Item -Recurse node_modules, package-lock.json
npm install
```

**❌ "TypeScript errors"**
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**❌ "Build fails"**
```bash
# Check for type errors
npx tsc --noEmit

# Check for linting errors
npm run lint
```

**❌ "API calls failing"**
- Check backend is running on port 5000
- Verify VITE_API_URL in `.env`
- Check CORS configuration in backend
- Inspect network tab in browser DevTools

---

## 📱 Responsive Design

### Breakpoints

```typescript
// Tailwind default breakpoints
sm:  640px   // Small devices
md:  768px   // Medium devices
lg:  1024px  // Large devices
xl:  1280px  // Extra large
2xl: 1536px  // 2X Extra large
```

### Mobile-First Approach

```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## 🔗 Related Documentation

- [Main README](../README.md) - Project overview
- [Backend README](../backend/README.md) - API documentation
- [Testing Guide](../TESTING_GUIDE.md) - Testing instructions
- [Authentication Guide](./AUTHENTICATION.md) - Auth implementation
- [Project Overview](./PROJECT_OVERVIEW.md) - Feature details
- [Implementation Checklist](./IMPLEMENTATION_CHECKLIST.md) - Development tracking

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

## 📄 License

MIT License - see main project README

---

<div align="center">
  <p>Built with ❤️ for TCE Connect</p>
  <p><a href="../README.md">← Back to Main README</a></p>
  <p>Happy Coding! 🚀</p>
</div>
