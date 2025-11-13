require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./src/models/Event');
const User = require('./src/models/User');

const MONGODB_URI = process.env.MONGODB_URI;

// Sample events data
const sampleEvents = [
  {
    title: "Tech Symposium 2025",
    description: "Annual technical symposium featuring latest innovations in technology",
    date: new Date('2025-12-15'),
    venue: "Main Auditorium",
    department: "Computer Science",
    type: "technical"
  },
  {
    title: "Cultural Fest - Kaleidoscope",
    description: "Three-day cultural extravaganza with music, dance, and drama",
    date: new Date('2025-12-20'),
    venue: "Open Air Theatre",
    department: "Cultural Committee",
    type: "cultural"
  },
  {
    title: "Inter-Department Cricket Tournament",
    description: "Annual cricket tournament featuring teams from all departments",
    date: new Date('2025-11-25'),
    venue: "College Ground",
    department: "Sports Committee",
    type: "sports"
  },
  {
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop on AI and ML fundamentals",
    date: new Date('2025-12-01'),
    venue: "CS Lab Block A",
    department: "Computer Science",
    type: "technical"
  },
  {
    title: "Annual Day Celebration",
    description: "College annual day celebration with performances and prize distribution",
    date: new Date('2025-12-30'),
    venue: "Main Auditorium",
    department: "Administration",
    type: "cultural"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');

    // Clear existing events (optional - comment out if you want to keep existing events)
    // await Event.deleteMany({});
    // console.log('Cleared existing events');

    // Create sample events
    const createdEvents = await Event.insertMany(sampleEvents);
    console.log(`✅ Successfully created ${createdEvents.length} sample events`);

    // Display created events
    createdEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} - ${event.type} - ${event.date.toDateString()}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
