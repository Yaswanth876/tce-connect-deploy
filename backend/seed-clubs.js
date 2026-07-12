require('dotenv').config();
const mongoose = require('mongoose');
const Club = require('./src/models/Club');

const MONGODB_URI = process.env.MONGODB_URI;

// Actual TCE clubs data from clubs.tceapps.in
const clubsData = [
  {
    name: "AI Consortium",
    description: "Student-driven club dedicated to exploring AI and Machine Learning",
    members: 450,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/35"
  },
  {
    name: "Algo Geeks Club",
    description: "Department of CSE - Competitive programming and algorithms",
    members: 389,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/12"
  },
  {
    name: "AR/VR Club",
    description: "Exploring Augmented and Virtual Reality technologies at TCE",
    members: 325,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/4"
  },
  {
    name: "App Development Club",
    description: "Department of IT - Building innovative mobile applications",
    members: 412,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/3"
  },
  {
    name: "Andhadhi - Music Club",
    description: "Classical melodies, rock anthems, and soulful compositions",
    members: 298,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/82"
  },
  {
    name: "Anything for Dance (AFD)",
    description: "From classical to contemporary dance styles at TCE",
    members: 267,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/61"
  },
  {
    name: "All About Art",
    description: "Sketching workshops, exhibitions, and collaborative art projects",
    members: 178,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/78"
  },
  {
    name: "Book Readers Club",
    description: "Fostering a vibrant community of literature enthusiasts",
    members: 156,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/86"
  },
  {
    name: "Anglophile Lounge",
    description: "Department of English - Literature and language excellence",
    members: 234,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/75"
  },
  {
    name: "Cinemates",
    description: "Film appreciation and cinematography club at TCE",
    members: 189,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/80"
  },
  {
    name: "Ascenders - Aerial Vehicle Club",
    description: "Department of EEE - UAVs, drones, and aerial innovations",
    members: 201,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/14"
  },
  {
    name: "IoT Club",
    description: "Internet of Things and embedded systems innovation",
    members: 345,
    portalUrl: "https://clubs.tceapps.in/tce/student/clubs/1"
  }
];

async function seedClubs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Optional: Clear existing clubs
    const shouldClear = process.argv.includes('--clear');
    if (shouldClear) {
      await Club.deleteMany({});
      console.log('🗑️  Cleared existing clubs');
    }

    // Create clubs
    const createdClubs = await Club.insertMany(clubsData);
    console.log(`\n✅ Successfully created ${createdClubs.length} TCE clubs\n`);

    // Display created clubs
    console.log('🎯 TCE CLUBS LIST (from clubs.tceapps.in):');
    createdClubs.forEach((club, index) => {
      console.log(`   ${index + 1}. ${club.name}`);
      console.log(`      Members: ${club.members}`);
      console.log(`      Description: ${club.description}`);
    });

    console.log('\n🎉 Clubs seeded successfully!');
    console.log('💡 Tip: Run with --clear flag to remove existing clubs before seeding\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding clubs:', error);
    process.exit(1);
  }
}

// Run the seed function
seedClubs();
