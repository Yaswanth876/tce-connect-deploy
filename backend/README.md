# 🔧 TCE Connect Backend# TCE Connect Backend



> RESTful API server built with Node.js, Express.js, and MongoDB AtlasThis is a Node.js + Express.js backend API for TCE Connect, using MongoDB Atlas as the cloud database.



![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)## Features

![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)- REST API for users and events

![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)- MongoDB Atlas integration

![JWT](https://img.shields.io/badge/JWT-9.x-red?logo=jsonwebtokens)- Environment variable support via `.env`

- Ready for deployment

---

## Getting Started

## 📖 Table of Contents

1. **Install dependencies:**

- [Overview](#-overview)   ```bash

- [Features](#-features)   npm install

- [Tech Stack](#-tech-stack)   ```

- [Project Structure](#-project-structure)

- [Getting Started](#-getting-started)2. **Configure environment variables:**

- [API Documentation](#-api-documentation)   - Copy `.env.example` to `.env`

- [Database Schema](#-database-schema)   - Set your `MONGODB_URI` to your MongoDB Atlas connection string

- [Authentication](#-authentication)   - Optionally set `PORT` (default is 5000)

- [Environment Variables](#-environment-variables)

- [Scripts](#-scripts)3. **Run the server:**

- [Deployment](#-deployment)   ```bash

   npm run dev

---   ```

   or

## 🎯 Overview   ```bash

   npm start

The TCE Connect backend is a robust RESTful API server that powers the campus event management platform. It handles user authentication, event management, club information, and provides secure endpoints for all frontend operations.   ```



### Key Features## MongoDB Atlas Setup

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

- ✅ **RESTful API Design**: Clean, intuitive endpoints- Create a cluster and database

- ✅ **JWT Authentication**: Secure token-based auth- Get your connection string and set it in `.env`

- ✅ **Role-Based Access**: Student and organizer permissions

- ✅ **MongoDB Integration**: Cloud-hosted NoSQL database## API Endpoints

- ✅ **Input Validation**: Request validation with express-validator- `GET /api/users` - List all users

- ✅ **Error Handling**: Comprehensive error responses- `POST /api/users` - Create a user

- ✅ **CORS Support**: Cross-origin resource sharing enabled- `GET /api/events` - List all events

- ✅ **Middleware Stack**: Auth, validation, and error middleware- `POST /api/events` - Create an event



---## Folder Structure

```

## ✨ Featuresbackend/

  src/

### Authentication & Authorization    models/

      User.js

- User registration with password hashing (bcryptjs)      Event.js

- JWT-based login system    routes/

- Token validation middleware      user.js

- Role-based access control (student/organizer)      event.js

- Protected routes for authenticated users    index.js

  .env.example

### Event Management  package.json

  README.md

- Create, read, update, delete (CRUD) operations```

- Event filtering by type, department, date
- Participant tracking and registration
- Google Forms integration for external registration
- Event owner verification

### User Management

- User profile creation and updates
- Password encryption
- Email validation
- Role assignment (student/organizer)

### Club Management

- Club directory endpoints
- Club information retrieval
- Portal link management

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 22.x | JavaScript runtime |
| **Express.js** | 4.x | Web framework |
| **MongoDB** | Atlas Cloud | NoSQL database |
| **Mongoose** | 7.x | ODM (Object Data Modeling) |
| **JWT** | 9.x | Authentication tokens |
| **bcryptjs** | 3.x | Password hashing |
| **express-validator** | 7.x | Request validation |
| **CORS** | 2.x | Cross-origin requests |
| **dotenv** | 16.x | Environment variables |
| **nodemon** | 3.x | Development auto-reload |

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/              # MongoDB schemas
│   │   ├── User.js         # User model
│   │   ├── Event.js        # Event model
│   │   └── Club.js         # Club model
│   │
│   ├── routes/             # API route handlers
│   │   ├── user.js         # User endpoints
│   │   ├── event.js        # Event endpoints
│   │   └── club.js         # Club endpoints
│   │
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   └── validation.js   # Input validation
│   │
│   └── index.js            # Server entry point
│
├── seed.js                 # Database seeding script
├── .env                    # Environment variables (create this)
├── .env.example            # Environment template
├── package.json            # Dependencies & scripts
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ installed
- **npm** or **yarn** package manager
- **MongoDB Atlas** account ([Sign up free](https://www.mongodb.com/cloud/atlas))

### Installation

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tce-connect?retryWrites=true&w=majority

# Server Port
PORT=5000

# JWT Secret Key (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Node Environment
NODE_ENV=development
```

#### 3. Seed Database (Optional)

Populate the database with sample events:

```bash
npm run seed
```

This will create 5 sample events:
- Tech Symposium 2025
- Cultural Fest - Kaleidoscope
- Inter-Department Cricket Tournament
- AI & Machine Learning Workshop
- Annual Day Celebration

#### 4. Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

#### 5. Verify Installation

Visit `http://localhost:5000` in your browser. You should see:
```
TCE Connect Backend API is running
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### 🔐 User Routes

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@tce.edu",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "6547...",
    "name": "John Doe",
    "email": "john@tce.edu",
    "role": "student"
  }
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@tce.edu",
  "password": "password123"
}
```

#### Get User Profile (Protected)
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile (Protected)
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@tce.edu"
}
```

---

### 📅 Event Routes

#### Get All Events (Public)
```http
GET /api/events
```

**Response:**
```json
[
  {
    "_id": "6547...",
    "title": "Tech Symposium 2025",
    "description": "Annual technical symposium...",
    "date": "2025-12-15T00:00:00.000Z",
    "venue": "Main Auditorium",
    "department": "Computer Science",
    "type": "technical",
    "registrationLink": "https://forms.gle/...",
    "organizer": "6547...",
    "participants": [],
    "createdAt": "2025-11-12T...",
    "updatedAt": "2025-11-12T..."
  }
]
```

#### Get Single Event (Public)
```http
GET /api/events/:id
```

#### Create Event (Protected - Organizer Only)
```http
POST /api/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Hackathon 2025",
  "description": "24-hour coding challenge",
  "date": "2025-12-20",
  "venue": "CS Lab",
  "department": "Computer Science",
  "type": "technical",
  "registrationLink": "https://forms.gle/abc123"
}
```

#### Update Event (Protected - Owner Only)
```http
PUT /api/events/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Event Title",
  "description": "Updated description",
  "venue": "New Venue"
}
```

#### Delete Event (Protected - Owner Only)
```http
DELETE /api/events/:id
Authorization: Bearer <token>
```

#### Register for Event (Protected - Student)
```http
POST /api/events/:id/register
Authorization: Bearer <token>
```

#### Cancel Registration (Protected - Student)
```http
DELETE /api/events/:id/register
Authorization: Bearer <token>
```

---

### 🏛️ Club Routes

#### Get All Clubs (Public)
```http
GET /api/clubs
```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['student', 'organizer'], default: 'student'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Event Model

```javascript
{
  title: String (required),
  description: String,
  date: Date (required),
  venue: String (default: 'TBA'),
  department: String (default: 'General'),
  type: String (enum: ['technical', 'cultural', 'sports'], default: 'technical'),
  registrationLink: String (Google Form URL),
  organizer: ObjectId (ref: 'User'),
  participants: [ObjectId] (ref: 'User'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Club Model

```javascript
{
  name: String (required),
  description: String,
  icon: String,
  portalUrl: String,
  members: Number,
  category: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🔐 Authentication

### JWT Token Flow

1. **User Registration/Login**
   - User provides credentials
   - Server validates and creates JWT token
   - Token returned to client

2. **Protected Requests**
   - Client sends token in Authorization header
   - Middleware verifies token
   - Request proceeds if valid

3. **Token Payload**
```javascript
{
  userId: "6547...",
  email: "user@tce.edu",
  role: "student",
  iat: 1699876543,
  exp: 1700481343
}
```

### Password Security

- Passwords hashed using **bcryptjs** (10 salt rounds)
- Never stored in plain text
- Compared securely during login

---

## ⚙️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `PORT` | Server port | `5000` |
| `JWT_SECRET` | Secret key for JWT signing | `your_random_secret_key_here` |
| `NODE_ENV` | Environment mode | `development` or `production` |

---

## 📜 Scripts

```json
{
  "start": "node src/index.js",      // Start production server
  "dev": "nodemon src/index.js",     // Start development server
  "seed": "node seed.js"              // Seed database with sample data
}
```

### Usage

```bash
# Development server (auto-reload on changes)
npm run dev

# Production server
npm start

# Seed database
npm run seed
```

---

## 🚀 Deployment

### Recommended Platforms

1. **Render** - [render.com](https://render.com)
   - Free tier available
   - Auto-deploy from GitHub
   - Built-in environment variables

2. **Railway** - [railway.app](https://railway.app)
   - Simple deployment
   - Good for Node.js apps

3. **Heroku** - [heroku.com](https://heroku.com)
   - Popular platform
   - Easy scaling

4. **AWS EC2** - For custom deployments

### Deployment Steps

#### 1. Prepare for Production

Ensure `.env` has production values:
```env
NODE_ENV=production
MONGODB_URI=<production_db_connection>
JWT_SECRET=<strong_random_secret>
PORT=5000
```

#### 2. Deploy to Render (Example)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect Render to your repository
# 3. Add environment variables in Render dashboard
# 4. Deploy!
```

#### 3. Database Setup

- Use MongoDB Atlas production cluster
- Whitelist deployment server IP
- Set up backups
- Enable monitoring

### Production Checklist

- ✅ Environment variables configured
- ✅ MongoDB Atlas production cluster
- ✅ Strong JWT secret
- ✅ CORS configured for production domain
- ✅ Error logging enabled
- ✅ HTTPS enabled
- ✅ Rate limiting configured (optional)
- ✅ Database backups scheduled

---

## 🔧 Development Tips

### Testing API Endpoints

**Using cURL:**
```bash
# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@tce.edu","password":"test123","role":"student"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@tce.edu","password":"test123"}'

# Get events
curl http://localhost:5000/api/events
```

**Using PowerShell:**
```powershell
# Register user
Invoke-RestMethod -Uri "http://localhost:5000/api/users/register" `
  -Method POST `
  -Body (@{name="Test User"; email="test@tce.edu"; password="test123"; role="student"} | ConvertTo-Json) `
  -ContentType "application/json"
```

### Debugging

1. **Enable detailed logging:**
   ```javascript
   console.log('Request:', req.method, req.path);
   ```

2. **Check MongoDB connection:**
   ```bash
   # Monitor connection status in server logs
   npm run dev
   ```

3. **Validate JWT tokens:**
   - Use [jwt.io](https://jwt.io) to decode tokens

---

## 🐛 Troubleshooting

### Common Issues

**❌ "MongoDB connection failed"**
- Check MongoDB URI in `.env`
- Verify network access in MongoDB Atlas
- Whitelist IP: `0.0.0.0/0` for testing

**❌ "Port already in use"**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <process_id> /F

# Change port in .env
PORT=5001
```

**❌ "JWT token invalid"**
- Ensure token is passed correctly
- Check JWT_SECRET matches
- Token may be expired (check expiration time)

**❌ "CORS error"**
- Verify frontend URL in CORS configuration
- Check request headers

---

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review API logs for errors

---

## 📄 License

MIT License - see main project README

---

<div align="center">
  <p>Built with ❤️ for TCE Connect</p>
  <p><a href="../README.md">← Back to Main README</a></p>
</div>
