require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./src/models/Event');
const User = require('./src/models/User');

const MONGODB_URI = process.env.MONGODB_URI;

// Get today's date for demo purposes
const today = new Date('2025-11-27'); // Current date as per context
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Sample events data with variety for dashboard using actual TCE clubs
const sampleEvents = [
  // TODAY'S EVENTS
  {
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering fundamentals of AI/ML, neural networks, and practical implementations using Python and TensorFlow",
    date: today,
    time: "09:00 AM - 12:00 PM",
    venue: "CS Lab Block A",
    department: "AI Consortium",
    club: "AI Consortium",
    type: "technical",
    maxParticipants: 50
  },
  {
    title: "Inter-College Debate Competition",
    description: "Engaging debate competition on contemporary social and political topics with renowned judges",
    date: today,
    time: "02:00 PM - 05:00 PM",
    venue: "Seminar Hall 2",
    department: "Anglophile Lounge",
    club: "Anglophile Lounge",
    type: "cultural",
    maxParticipants: 30
  },
  {
    title: "Classical Music Evening",
    description: "An evening of mesmerizing classical ragas and compositions by renowned artists",
    date: today,
    time: "06:00 PM - 08:00 PM",
    venue: "Open Air Theatre",
    department: "Andhadhi - Music Club",
    club: "Andhadhi - Music Club",
    type: "cultural",
    maxParticipants: 200
  },

  // UPCOMING EVENTS
  {
    title: "Mobile App Development Bootcamp",
    description: "Intensive 3-day bootcamp on React Native and Flutter for building cross-platform mobile applications",
    date: tomorrow,
    time: "09:00 AM - 05:00 PM",
    venue: "IT Lab Block B",
    department: "App Development Club",
    club: "App Development Club",
    type: "technical",
    maxParticipants: 40
  },
  {
    title: "Code Sprint - Hackathon 2025",
    description: "24-hour coding marathon to solve real-world problems with mentorship from industry experts and exciting prizes",
    date: new Date('2025-12-05'),
    time: "08:00 AM - 08:00 AM (24hrs)",
    venue: "Innovation Lab",
    department: "Algo Geeks Club",
    club: "Algo Geeks Club",
    type: "technical",
    maxParticipants: 80
  },
  {
    title: "IoT & Smart Home Workshop",
    description: "Practical workshop on IoT devices, sensors, and embedded programming with Arduino, Raspberry Pi, and ESP32",
    date: new Date('2025-12-01'),
    time: "10:00 AM - 04:00 PM",
    venue: "Electronics Lab",
    department: "IoT Club",
    club: "IoT Club",
    type: "technical",
    maxParticipants: 35
  },
  {
    title: "Virtual Reality Gaming Tournament",
    description: "Immersive VR gaming competition featuring latest VR titles and AR experiences with Meta Quest headsets",
    date: new Date('2025-12-08'),
    time: "02:00 PM - 06:00 PM",
    venue: "VR Lab",
    department: "AR/VR Club",
    club: "AR/VR Club",
    type: "technical",
    maxParticipants: 50
  },
  {
    title: "Literary Fest - Words Unlimited",
    description: "Celebration of literature with poetry slams, storytelling sessions, and creative writing workshops",
    date: new Date('2025-12-10'),
    time: "10:00 AM - 05:00 PM",
    venue: "Main Auditorium",
    department: "Book Readers Club",
    club: "Book Readers Club",
    type: "cultural",
    maxParticipants: 150
  },
  {
    title: "Art Exhibition & Live Sketching",
    description: "Showcase of student artworks with live sketching demonstrations, portrait sessions, and art installations",
    date: new Date('2025-12-12'),
    time: "11:00 AM - 05:00 PM",
    venue: "Art Gallery",
    department: "All About Art",
    club: "All About Art",
    type: "cultural",
    maxParticipants: 100
  },
  {
    title: "Dance Fusion - Inter-College Competition",
    description: "Grand dance competition featuring classical, contemporary, hip-hop, and fusion dance performances",
    date: new Date('2025-12-15'),
    time: "05:00 PM - 09:00 PM",
    venue: "Main Stage",
    department: "Anything for Dance (AFD)",
    club: "Anything for Dance (AFD)",
    type: "cultural",
    maxParticipants: 250
  },
  {
    title: "Short Film Festival",
    description: "Screening of student-made short films, documentaries, and film appreciation sessions with industry experts",
    date: new Date('2025-12-18'),
    time: "04:00 PM - 08:00 PM",
    venue: "Auditorium",
    department: "Cinemates",
    club: "Cinemates",
    type: "cultural",
    maxParticipants: 180
  },
  {
    title: "Drone Racing Championship",
    description: "High-speed FPV drone racing competition with obstacle courses and aerial photography showcase",
    date: new Date('2025-12-20'),
    time: "09:00 AM - 02:00 PM",
    venue: "College Ground",
    department: "Ascenders - Aerial Vehicle Club",
    club: "Ascenders - Aerial Vehicle Club",
    type: "technical",
    maxParticipants: 60
  },

  // PAST EVENTS
  {
    title: "Cybersecurity Awareness Seminar",
    description: "Expert session on cybersecurity threats, ethical hacking, prevention methods, and best practices for digital safety",
    date: new Date('2025-11-20'),
    time: "02:00 PM - 04:00 PM",
    venue: "Seminar Hall 1",
    department: "AI Consortium",
    club: "AI Consortium",
    type: "technical",
    maxParticipants: 150
  },
  {
    title: "Battle of Bands",
    description: "Electrifying music competition featuring college bands performing rock, pop, and fusion genres",
    date: new Date('2025-11-15'),
    time: "06:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    department: "Andhadhi - Music Club",
    club: "Andhadhi - Music Club",
    type: "cultural",
    maxParticipants: 300
  },
  {
    title: "Competitive Programming Contest",
    description: "Algorithmic problem-solving competition with challenges from easy to advanced levels for coding enthusiasts",
    date: new Date('2025-11-10'),
    time: "10:00 AM - 04:00 PM",
    venue: "Computer Lab 3",
    department: "Algo Geeks Club",
    club: "Algo Geeks Club",
    type: "technical",
    maxParticipants: 120
  },
  {
    title: "Book Reading & Author Meet",
    description: "Interactive session with renowned author followed by book discussions and reading recommendations",
    date: new Date('2025-11-05'),
    time: "03:00 PM - 05:00 PM",
    venue: "Library Auditorium",
    department: "Book Readers Club",
    club: "Book Readers Club",
    type: "cultural",
    maxParticipants: 80
  },
  {
    title: "Freshers' Cultural Night",
    description: "Grand welcome celebration for first-year students with cultural performances, music, dance, and entertainment",
    date: new Date('2025-10-28'),
    time: "05:00 PM - 10:00 PM",
    venue: "College Lawn",
    department: "Anything for Dance (AFD)",
    club: "Anything for Dance (AFD)",
    type: "cultural",
    maxParticipants: 500
  },
  {
    title: "AR/VR Tech Demo Day",
    description: "Demonstration of cutting-edge AR/VR projects created by students including virtual tours and immersive experiences",
    date: yesterday,
    time: "11:00 AM - 04:00 PM",
    venue: "Innovation Center",
    department: "AR/VR Club",
    club: "AR/VR Club",
    type: "technical",
    maxParticipants: 100
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Optional: Clear existing events (uncomment to start fresh)
    const shouldClearEvents = process.argv.includes('--clear');
    if (shouldClearEvents) {
      await Event.deleteMany({});
      console.log('🗑️  Cleared existing events');
    }

    // Find an organizer user (or use null if none exists)
    let organizer = await User.findOne({ role: 'organizer' });
    if (!organizer) {
      console.log('⚠️  No organizer found. Events will be created without organizer reference.');
    }

    // Add organizer to events if available
    const eventsWithOrganizer = sampleEvents.map(event => ({
      ...event,
      organizer: organizer ? organizer._id : null
    }));

    // Create sample events
    const createdEvents = await Event.insertMany(eventsWithOrganizer);
    console.log(`\n✅ Successfully created ${createdEvents.length} sample events\n`);

    // Categorize and display created events
    const todayEvents = createdEvents.filter(e => 
      e.date.toDateString() === today.toDateString()
    );
    const upcomingEvents = createdEvents.filter(e => 
      e.date > today
    );
    const pastEvents = createdEvents.filter(e => 
      e.date < today
    );

    console.log(`📅 TODAY'S EVENTS (${todayEvents.length}):`);
    todayEvents.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title} - ${event.time} @ ${event.venue}`);
    });

    console.log(`\n🔮 UPCOMING EVENTS (${upcomingEvents.length}):`);
    upcomingEvents.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title} - ${event.date.toDateString()} @ ${event.venue}`);
    });

    console.log(`\n📜 PAST EVENTS (${pastEvents.length}):`);
    pastEvents.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title} - ${event.date.toDateString()}`);
    });

    console.log('\n📊 EVENT BREAKDOWN BY TYPE:');
    const technical = createdEvents.filter(e => e.type === 'technical').length;
    const cultural = createdEvents.filter(e => e.type === 'cultural').length;
    const sports = createdEvents.filter(e => e.type === 'sports').length;
    console.log(`   🔧 Technical: ${technical}`);
    console.log(`   🎭 Cultural: ${cultural}`);
    console.log(`   ⚽ Sports: ${sports}`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n💡 Tip: Run with --clear flag to remove existing events before seeding');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
