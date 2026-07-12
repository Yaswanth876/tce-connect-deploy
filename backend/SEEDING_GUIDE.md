# Database Seeding Guide

This guide explains how to populate the TCE Connect database with demo data for testing and development.

**🌐 Environment Support:**
- ✅ Works with localhost development (http://localhost:5000)
- ✅ Works with production deployment (Render/Vercel)
- ✅ Uses actual TCE club data from clubs.tceapps.in

**📌 Important:** All seeded data uses real TCE club names and structures from the official TCE clubs portal.

---

## Available Seed Scripts

### 1. Create Admin User
Creates the main admin user for accessing the admin dashboard.

```bash
npm run create-admin
```

**Admin Credentials:**
- Email: `admin@tce.edu`
- Password: `admin123`

---

### 2. Seed Events
Populates the database with 18 demo events using actual TCE clubs categorized as:
- **Today's Events** (3 events) - For testing current day dashboard
- **Upcoming Events** (9 events) - Future events across December 2025
- **Past Events** (6 events) - Historical events from October-November 2025

```bash
npm run seed:events
# or simply
npm run seed
```

**Event Breakdown:**
- 🔧 Technical Events: 9 (AI/ML, IoT, Hackathon, VR, etc.)
- 🎭 Cultural Events: 9 (Music, Dance, Art, Literature, Films)
- All events are linked to actual TCE clubs from clubs.tceapps.in

To clear existing events before seeding:
```bash
node seed.js --clear
```

---

### 3. Seed Clubs
Populates the database with 12 actual TCE clubs from clubs.tceapps.in

```bash
npm run seed:clubs
```

**Created Clubs:**
1. AI Consortium (450 members)
2. Algo Geeks Club (389 members)
3. AR/VR Club (325 members)
4. App Development Club (412 members)
5. Andhadhi - Music Club (298 members)
6. Anything for Dance (AFD) (267 members)
7. All About Art (178 members)
8. Book Readers Club (156 members)
9. Anglophile Lounge (234 members)
10. Cinemates (189 members)
11. Ascenders - Aerial Vehicle Club (201 members)
12. IoT Club (345 members)

Each club includes:
- Name, description, member count
- Portal URL linking to clubs.tceapps.in

To clear existing clubs before seeding:
```bash
node seed-clubs.js --clear
```

---

### 4. Seed Organizers (Staff Coordinators)
Creates 12 staff coordinator accounts representing actual TCE clubs from clubs.tceapps.in

```bash
npm run seed:organizers
```

**Created Organizers (Actual TCE Clubs):**
1. Dr. Rajesh Kumar - AI Consortium
2. Prof. Priya Sharma - Algo Geeks Club
3. Dr. Arun Patel - Andhadhi - Music Club
4. Ms. Lakshmi Nair - IoT Club
5. Prof. Vikram Singh - App Development Club
6. Dr. Meera Reddy - AR/VR Club
7. Prof. Suresh Iyer - Anglophile Lounge
8. Ms. Anjali Verma - All About Art
9. Dr. Karthik Raman - Anything for Dance (AFD)
10. Prof. Divya Menon - Book Readers Club
11. Dr. Ashwin Kumar - Cinemates
12. Ms. Kavitha Suresh - Ascenders - Aerial Vehicle Club

**Default Password:** `organizer123`

To clear existing organizers before seeding:
```bash
node seed-organizers.js --clear
```

---

### 5. Seed Everything
Runs all seed scripts in sequence: admin → clubs → organizers → events

```bash
npm run seed:all
```

This will create:
- 1 Admin user
- 12 TCE Clubs
- 12 Staff coordinators (one per club)
- 18 Events (today's, upcoming, and past)

---

## What Gets Seeded

### Events Data Structure
Each event includes:
- Title and detailed description
- Date and time
- Venue location
- Department/Club affiliation (using actual TCE clubs)
- Event type (technical/cultural)
- Maximum participants
- Organizer reference (if available)

### Sample Event Categories

**Today's Events (Nov 27, 2025):**
- AI & Machine Learning Workshop (AI Consortium) - 09:00 AM - 12:00 PM
- Inter-College Debate Competition (Anglophile Lounge) - 02:00 PM - 05:00 PM
- Classical Music Evening (Andhadhi - Music Club) - 06:00 PM - 08:00 PM

**Upcoming Events:**
- Mobile App Development Bootcamp (App Development Club) - Nov 28, 2025
- IoT & Smart Home Workshop (IoT Club) - Dec 01, 2025
- Code Sprint - Hackathon 2025 (Algo Geeks Club) - Dec 05, 2025
- Virtual Reality Gaming Tournament (AR/VR Club) - Dec 08, 2025
- Literary Fest - Words Unlimited (Book Readers Club) - Dec 10, 2025
- Art Exhibition & Live Sketching (All About Art) - Dec 12, 2025
- Dance Fusion - Inter-College Competition (Anything for Dance) - Dec 15, 2025
- Short Film Festival (Cinemates) - Dec 18, 2025
- Drone Racing Championship (Ascenders - Aerial Vehicle Club) - Dec 20, 2025

**Past Events:**
- Freshers' Cultural Night (Anything for Dance) - Oct 28, 2025
- Book Reading & Author Meet (Book Readers Club) - Nov 05, 2025
- Competitive Programming Contest (Algo Geeks Club) - Nov 10, 2025
- Battle of Bands (Andhadhi - Music Club) - Nov 15, 2025
- Cybersecurity Awareness Seminar (AI Consortium) - Nov 20, 2025
- AR/VR Tech Demo Day (AR/VR Club) - Nov 26, 2025

---

## Testing the Admin Dashboard

After seeding, login to the admin dashboard at `/admin/login`:

**Credentials:** `admin@tce.edu` / `admin123`

**You should see:**
- ✅ Total statistics (users, events, clubs)
- ✅ 3 events in "Today's Events" section
- ✅ 9 events in "Upcoming Events" section
- ✅ 6 events in "Past Events" section
- ✅ 12 staff coordinators with their respective TCE clubs (AI Consortium, Algo Geeks Club, Andhadhi, IoT Club, etc.)

---

## Important Notes

1. **Production Warning:** Never run seed scripts on production databases
2. **Password Security:** Change default passwords after seeding
3. **Date Context:** Events are seeded relative to Nov 27, 2025
4. **Clear Flag:** Use `--clear` to remove existing data before seeding
5. **Organizer Linking:** Events automatically link to organizers if they exist

---

## Troubleshooting

### "Admin already exists"
The admin user can only be created once. To recreate:
```bash
# Manually delete from MongoDB or use a different email
```

### "No organizer found" warning
Run `npm run seed:organizers` before seeding events to link events to organizers.

### Events not showing in dashboard
1. Check MongoDB Atlas connection
2. Verify environment variables in `.env`
3. Check admin token is valid
4. Refresh the admin dashboard

---

## Development Workflow

For a fresh start:
```bash
# 1. Create admin
npm run create-admin

# 2. Seed organizers
npm run seed:organizers

# 3. Seed events (with clear flag)
node seed.js --clear

# Or all at once
npm run seed:all
```

---

## File Structure

```
backend/
├── seed.js              # Event seeding script
├── seed-organizers.js   # Organizer seeding script
├── create-admin.js      # Admin creation script
└── package.json         # NPM scripts configuration
```
