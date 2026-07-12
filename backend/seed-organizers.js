require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const MONGODB_URI = process.env.MONGODB_URI;

// Sample organizer/staff coordinator data using actual TCE clubs
const organizerData = [
  {
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "AI Consortium",
    registerNumber: "STAFF001"
  },
  {
    name: "Prof. Priya Sharma",
    email: "priya.sharma@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "Algo Geeks Club",
    registerNumber: "STAFF002"
  },
  {
    name: "Dr. Arun Patel",
    email: "arun.patel@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "Andhadhi - Music Club",
    registerNumber: "STAFF003"
  },
  {
    name: "Ms. Lakshmi Nair",
    email: "lakshmi.nair@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "IoT Club",
    registerNumber: "STAFF004"
  },
  {
    name: "Prof. Vikram Singh",
    email: "vikram.singh@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "App Development Club",
    registerNumber: "STAFF005"
  },
  {
    name: "Dr. Meera Reddy",
    email: "meera.reddy@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "AR/VR Club",
    registerNumber: "STAFF006"
  },
  {
    name: "Prof. Suresh Iyer",
    email: "suresh.iyer@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "Anglophile Lounge",
    registerNumber: "STAFF007"
  },
  {
    name: "Ms. Anjali Verma",
    email: "anjali.verma@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "All About Art",
    registerNumber: "STAFF008"
  },
  {
    name: "Dr. Karthik Raman",
    email: "karthik.raman@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "Anything for Dance (AFD)",
    registerNumber: "STAFF009"
  },
  {
    name: "Prof. Divya Menon",
    email: "divya.menon@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "Book Readers Club",
    registerNumber: "STAFF010"
  },
  {
    name: "Dr. Ashwin Kumar",
    email: "ashwin.kumar@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "Cinemates",
    registerNumber: "STAFF011"
  },
  {
    name: "Ms. Kavitha Suresh",
    email: "kavitha.suresh@tce.edu",
    password: "organizer123",
    role: "organizer",
    department: "Ascenders - Aerial Vehicle Club",
    registerNumber: "STAFF012"
  }
];

async function seedOrganizers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Optional: Clear existing organizers
    const shouldClear = process.argv.includes('--clear');
    if (shouldClear) {
      await User.deleteMany({ role: 'organizer' });
      console.log('🗑️  Cleared existing organizers');
    }

    // Hash passwords and create organizers
    const organizersToCreate = await Promise.all(
      organizerData.map(async (org) => {
        const hashedPassword = await bcrypt.hash(org.password, 10);
        return {
          ...org,
          password: hashedPassword,
          year: '' // Staff don't have year
        };
      })
    );

    // Create organizers
    const createdOrganizers = await User.insertMany(organizersToCreate);
    console.log(`\n✅ Successfully created ${createdOrganizers.length} staff coordinators (TCE Club Coordinators)\n`);

    // Display created organizers
    console.log('📋 STAFF COORDINATORS LIST:');
    createdOrganizers.forEach((org, index) => {
      console.log(`   ${index + 1}. ${org.name}`);
      console.log(`      Club: ${org.department}`);
      console.log(`      Email: ${org.email}`);
    });

    console.log('\n🔑 Default Password: organizer123');
    console.log('\n🎉 Organizers seeded successfully!');
    console.log('💡 Tip: Run with --clear flag to remove existing organizers before seeding\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding organizers:', error);
    process.exit(1);
  }
}

// Run the seed function
seedOrganizers();
