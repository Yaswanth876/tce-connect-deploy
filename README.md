# TCE Connect - Production Deployment

## ⚠️ Important Notice

This repository is configured **ONLY for production deployment** on:
- **Backend**: Render
- **Frontend**: Vercel

**DO NOT run this project locally for development.**

---

## 🚀 Quick Deployment Guide

### Prerequisites
1. MongoDB Atlas account with production cluster
2. Render account
3. Vercel account
4. GitHub repository

### Step 1: Generate JWT Secret
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```
Save the output!

### Step 2: Push to GitHub
```powershell
git add .
git commit -m "Production deployment"
git push origin main
```

### Step 3: Deploy to Render
1. Go to https://dashboard.render.com
2. New Web Service → Connect GitHub repo
3. Configure:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add Environment Variables (from `backend/.env`):
   ```
   MONGODB_URI=<your-production-mongodb-uri>
   JWT_SECRET=<generated-secret-from-step-1>
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://tce-connect.vercel.app
   ```

### Step 4: Deploy to Vercel
```powershell
cd frontend
npm install -g vercel
vercel --prod
```
Or use Vercel Dashboard

### Step 5: Update URLs
1. Update `FRONTEND_URL` in Render with your Vercel URL
2. Verify `frontend/.env.production` has your Render backend URL

---

## 📚 Full Documentation
- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Complete deployment guide
- [`PRODUCTION_CHECKLIST.md`](PRODUCTION_CHECKLIST.md) - Step-by-step checklist

## 🎯 Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB Atlas
- **Deployment**: Vercel (Frontend) + Render (Backend)


- [License](#-license)### 2. Backend Setup

- See `backend/README.md` for instructions

---

## Development

## 🎯 About- Run frontend and backend servers separately for local development

- Environment variables are managed via `.env` files in each folder

**TCE Connect** is a comprehensive full-stack web platform designed to streamline campus event management and student engagement at Thiagarajar College of Engineering. It serves as a centralized hub for students, event organizers, and clubs to connect, collaborate, and stay informed about campus activities.

## Deployment

### 🌟 Why TCE Connect?- Frontend can be deployed to Vercel, Netlify, etc.

- Backend can be deployed to Render, Heroku, etc.

- **Centralized Platform**: All campus events and club information in one place- Use MongoDB Atlas for cloud database

- **Role-Based Access**: Tailored experiences for students and organizers

- **Real-Time Updates**: Stay informed about upcoming events and registrations## License

- **Modern UI/UX**: Responsive design that works seamlessly on all devicesMIT

- **Easy Registration**: Simple event registration via Google Forms integration

- **Analytics Dashboard**: Track event participation and engagement---

For more details, see the individual README files in `frontend/` and `backend/`.

---

## ✨ Features

### 👨‍🎓 For Students

- 🔍 **Event Discovery**: Browse technical, cultural, and sports events
- 📝 **Quick Registration**: Register for events via Google Forms
- 📊 **Personal Dashboard**: Track registered events and participation
- 🏛️ **Club Directory**: Explore 14+ campus clubs with detailed information
- 🔔 **Real-Time Updates**: Get notified about new events and updates
- 🎯 **Event Filters**: Filter events by type, department, and date
- 🔖 **Bookmarks**: Save favorite events for later
- 📱 **Mobile Responsive**: Access from any device

### 🎪 For Event Organizers

- ➕ **Event Creation**: Create and publish events with full details
- 📝 **Event Management**: Edit, update, or delete events
- 🔗 **Google Forms Integration**: Add registration form links
- 📊 **Analytics**: Track registrations and participant counts
- 📅 **Event Scheduling**: Set dates, venues, and capacity
- 🏷️ **Categorization**: Tag events as Technical/Cultural/Sports
- 👥 **Participant Tracking**: Monitor who registered for events
- 📈 **Dashboard Insights**: View active, past, and upcoming events

### 🏛️ For Clubs

- 📋 **Club Profiles**: Showcase club information and activities
- 🔗 **Direct Links**: Link to external club portals
- 🎨 **Custom Icons**: Unique visual identity for each club
- 📊 **Member Count**: Display club popularity

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 18.3+ |
| **TypeScript** | Type Safety | 5.x |
| **Vite** | Build Tool | 5.x |
| **Tailwind CSS** | Styling | 3.x |
| **shadcn/ui** | Component Library | Latest |
| **React Router** | Routing | 6.x |
| **Lucide React** | Icons | Latest |
| **Sonner** | Toast Notifications | Latest |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 22.x |
| **Express.js** | Web Framework | 4.x |
| **MongoDB** | Database | Atlas Cloud |
| **Mongoose** | ODM | 7.x |
| **JWT** | Authentication | 9.x |
| **bcryptjs** | Password Hashing | 3.x |
| **CORS** | Cross-Origin | 2.x |
| **express-validator** | Validation | 7.x |

---

## 📁 Project Structure

```
tce-connect/
├── frontend/                 # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── EventCard.tsx
│   │   │   └── ClubCard.tsx
│   │   ├── pages/          # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── EventDetails.tsx
│   │   │   ├── Community.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   └── OrganizerDashboard.tsx
│   │   ├── lib/            # Utilities
│   │   │   ├── auth.ts     # Auth helpers
│   │   │   └── utils.ts
│   │   ├── hooks/          # Custom hooks
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   └── README.md
│
├── backend/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── models/         # MongoDB schemas
│   │   │   ├── User.js
│   │   │   ├── Event.js
│   │   │   └── Club.js
│   │   ├── routes/         # API routes
│   │   │   ├── user.js
│   │   │   ├── event.js
│   │   │   └── club.js
│   │   ├── middleware/     # Express middleware
│   │   │   ├── auth.js
│   │   │   └── validation.js
│   │   └── index.js        # Server entry point
│   ├── seed.js             # Database seeding
│   ├── .env                # Environment variables
│   ├── package.json
│   └── README.md
│
├── TESTING_GUIDE.md        # Comprehensive testing guide
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **bun** - Comes with Node.js
- **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Yaswanth876/tce-connect.git
cd tce-connect
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB connection string
# MONGODB_URI=your_mongodb_atlas_connection_string
# PORT=5000
# JWT_SECRET=your_secret_key

# Seed the database with sample data (optional)
npm run seed

# Start the backend server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

#### 4️⃣ Access the Application

Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`)

### Quick Test

1. **Register an Account**: Go to `/register` and create a test account
2. **Login**: Use your credentials to login
3. **Explore Events**: Browse events on the Events page
4. **View Clubs**: Check out the Community page for clubs

---

## 📚 Documentation

Detailed documentation is available in separate files:

| Document | Description |
|----------|-------------|
| [`frontend/README.md`](./frontend/README.md) | Frontend setup, components, and architecture |
| [`backend/README.md`](./backend/README.md) | Backend API, routes, and database schema |
| [`TESTING_GUIDE.md`](./TESTING_GUIDE.md) | Comprehensive testing instructions |
| [`frontend/AUTHENTICATION.md`](./frontend/AUTHENTICATION.md) | Authentication implementation guide |
| [`frontend/PROJECT_OVERVIEW.md`](./frontend/PROJECT_OVERVIEW.md) | Project architecture and design |

---

## 🧪 Testing

Comprehensive testing documentation is available in [`TESTING_GUIDE.md`](./TESTING_GUIDE.md)

### Quick Test Commands

```bash
# Run frontend tests
cd frontend
npm run lint

# Build frontend for production
npm run build

# Preview production build
npm run preview

# Check backend
cd backend
npm start
```

### Manual Testing Checklist

- ✅ User registration with validation
- ✅ User login with different roles
- ✅ Event creation (organizers only)
- ✅ Event browsing and filtering
- ✅ Event registration via Google Forms
- ✅ Dashboard functionality
- ✅ Club directory display
- ✅ Responsive design on mobile

---

## 🚀 Deployment

### Frontend Deployment

**Recommended Platforms:**
- **Vercel** (Easiest for Vite/React)
- **Netlify**
- **GitHub Pages**

```bash
# Build for production
cd frontend
npm run build

# The 'dist' folder contains your production build
```

### Backend Deployment

**Recommended Platforms:**
- **Render** (Free tier available)
- **Railway**
- **Heroku**
- **AWS EC2**

**Environment Variables Required:**
- `MONGODB_URI`
- `PORT`
- `JWT_SECRET`
- `NODE_ENV=production`

### Database

Use **MongoDB Atlas** (free tier M0 cluster available):
1. Create a cluster
2. Whitelist deployment server IP
3. Get connection string
4. Update production environment variables

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript/JavaScript best practices
- Use ESLint for linting
- Format code with Prettier (if configured)
- Write meaningful commit messages
- Add comments for complex logic

### Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/Yaswanth876/tce-connect/issues)

---

## 📧 Contact

**Project Maintainer**: Yaswanth876

**Repository**: [github.com/Yaswanth876/tce-connect](https://github.com/Yaswanth876/tce-connect)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Thiagarajar College of Engineering** for inspiration
- **shadcn/ui** for beautiful components
- **MongoDB** for cloud database services
- **React** and **Node.js** communities
- All contributors and testers

---

<div align="center">
  <p>Made with ❤️ for TCE</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
