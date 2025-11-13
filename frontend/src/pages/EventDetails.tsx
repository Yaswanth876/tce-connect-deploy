import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  Bookmark,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Mock event data - matching all events from Events page
const mockEvents = [
  {
    id: "1",
    title: "AI Sprint - AI Consortium",
    date: "2025-06-02",
    time: "9:00 AM - 5:00 PM",
    venue: "CSE Department, Main Building",
    category: "Technical",
    organizer: "AI Consortium",
    description:
      "Join us for an intensive AI Sprint where you'll dive deep into cutting-edge artificial intelligence technologies. This comprehensive program covers machine learning algorithms, neural networks, and practical AI applications. Perfect for students looking to enhance their AI skills and work on real-world projects.",
    maxParticipants: 120,
    registered: 87,
    highlights: [
      "Hands-on AI/ML workshops",
      "Industry expert sessions",
      "Collaborative projects",
      "Certificate of participation",
      "Networking opportunities",
    ],
    requirements: [
      "Laptop with Python installed",
      "Basic programming knowledge",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
  {
    id: "2",
    title: "Field Visit - AR/VR Club",
    date: "2025-06-13",
    time: "8:00 AM - 6:00 PM",
    venue: "Industry Location (TBA)",
    category: "Technical",
    organizer: "AR/VR Club",
    description:
      "Experience the future of technology with our exclusive AR/VR industry field visit. Tour cutting-edge facilities, interact with professionals, and witness real-world applications of augmented and virtual reality technologies. This is a unique opportunity to see how AR/VR is transforming various industries.",
    maxParticipants: 50,
    registered: 38,
    highlights: [
      "Industry facility tour",
      "Meet AR/VR professionals",
      "Live demonstrations",
      "Q&A sessions",
      "Transportation provided",
    ],
    requirements: [
      "Valid student ID",
      "Registration fee: ₹200",
      "Parental consent (if required)",
    ],
    image: "https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800",
  },
  {
    id: "3",
    title: "Connexions - IoT Workshop",
    date: "2025-05-09",
    time: "10:00 AM - 4:00 PM",
    venue: "IoT Lab, ECE Block",
    category: "Technical",
    organizer: "IoT Club",
    description:
      "Discover the world of Internet of Things in this hands-on workshop. Learn to build smart devices, understand sensor networks, and create IoT applications. From basics to advanced concepts, this workshop covers everything you need to start your IoT journey.",
    maxParticipants: 80,
    registered: 65,
    highlights: [
      "Build IoT devices",
      "Arduino and Raspberry Pi training",
      "Sensor integration",
      "Cloud connectivity",
      "Free IoT starter kit",
    ],
    requirements: [
      "Laptop required",
      "Basic electronics knowledge helpful",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  },
  {
    id: "4",
    title: "Inauguration of AI Consortium - Gen AI in Action",
    date: "2025-04-02",
    time: "11:00 AM - 2:00 PM",
    venue: "Main Auditorium",
    category: "Technical",
    organizer: "AI Consortium",
    description:
      "Be part of history as we inaugurate the AI Consortium at TCE! This landmark event features keynote speeches from AI industry leaders, demonstrations of generative AI technologies, and the unveiling of our state-of-the-art AI lab. Don't miss this opportunity to witness the future of AI education at TCE.",
    maxParticipants: 300,
    registered: 245,
    highlights: [
      "Keynote by AI industry leaders",
      "Gen AI demonstrations",
      "AI lab inauguration",
      "Networking lunch",
      "Special guest performances",
    ],
    requirements: [
      "Student ID card",
      "Free entry",
    ],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
  },
  {
    id: "5",
    title: "CodeFest - Programming Competition",
    date: "2025-11-07",
    time: "9:00 AM - 6:00 PM",
    venue: "CSE Lab",
    category: "Technical",
    organizer: "Algo Geeks Club",
    description:
      "Test your coding skills in this intense programming competition! Solve algorithmic challenges, compete with peers, and showcase your problem-solving abilities. Perfect for students preparing for technical interviews and coding competitions.",
    maxParticipants: 100,
    registered: 78,
    highlights: [
      "Multiple difficulty levels",
      "Cash prizes worth ₹25,000",
      "Certificates for winners",
      "Real-time leaderboard",
      "Refreshments provided",
    ],
    requirements: [
      "Laptop required",
      "Knowledge of any programming language",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
  },
  {
    id: "6",
    title: "HackFest - 24 Hour Hackathon",
    date: "2025-11-07",
    time: "8:00 AM - Next day 8:00 AM",
    venue: "Innovation Center",
    category: "Technical",
    organizer: "App Development Club",
    description:
      "24-hour hackathon challenging students to build innovative solutions to real-world problems. Form teams, code together, and compete for exciting prizes and internship opportunities. This is your chance to turn ideas into reality!",
    maxParticipants: 100,
    registered: 85,
    highlights: [
      "24-hour coding marathon",
      "Mentorship from industry experts",
      "Cash prizes worth ₹50,000",
      "Internship opportunities",
      "Free meals and refreshments",
    ],
    requirements: [
      "Team of 2-4 members",
      "Laptop required",
      "Prior coding experience",
    ],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
  },
  {
    id: "7",
    title: "App Mentor - Mobile Dev Workshop",
    date: "2025-11-07",
    time: "10:00 AM - 5:00 PM",
    venue: "IT Department",
    category: "Technical",
    organizer: "App Development Club",
    description:
      "Learn mobile app development from scratch! This comprehensive workshop covers both Android and iOS development, UI/UX principles, and deployment strategies. Build your first mobile app and publish it to app stores.",
    maxParticipants: 60,
    registered: 45,
    highlights: [
      "Android & iOS development",
      "React Native and Flutter",
      "UI/UX best practices",
      "App deployment guide",
      "Free development tools access",
    ],
    requirements: [
      "Laptop with 8GB RAM minimum",
      "Android Studio or Xcode installed",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
  },
  {
    id: "8",
    title: "Sensor Hunts - IoT Challenge",
    date: "2025-11-07",
    time: "9:00 AM - 4:00 PM",
    venue: "ECE Lab",
    category: "Technical",
    organizer: "IoT Club",
    description:
      "An exciting treasure hunt combined with IoT technology! Use sensors, microcontrollers, and your problem-solving skills to complete challenges and find hidden clues. A fun and educational event for all IoT enthusiasts.",
    maxParticipants: 80,
    registered: 62,
    highlights: [
      "Interactive IoT challenges",
      "Team-based competition",
      "Prizes for top teams",
      "Learn while having fun",
      "Hands-on sensor experience",
    ],
    requirements: [
      "Team of 3-4 members",
      "Basic IoT knowledge",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800",
  },
  {
    id: "9",
    title: "AI Week - Machine Learning Workshop",
    date: "2025-11-07",
    time: "9:00 AM - 6:00 PM",
    venue: "AI Lab",
    category: "Technical",
    organizer: "AI Consortium",
    description:
      "Dive deep into machine learning with this intensive week-long program condensed into one power-packed day! Learn regression, classification, neural networks, and deep learning with hands-on projects and real datasets.",
    maxParticipants: 100,
    registered: 88,
    highlights: [
      "ML algorithms explained",
      "Hands-on Python projects",
      "Real-world datasets",
      "Neural network basics",
      "Certificate of completion",
    ],
    requirements: [
      "Laptop with Python and Jupyter",
      "Basic Python knowledge",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
  },
  {
    id: "10",
    title: "Crime Scene - Cyber Security Event",
    date: "2025-11-07",
    time: "10:00 AM - 5:00 PM",
    venue: "CSE Department",
    category: "Technical",
    organizer: "Algo Geeks Club",
    description:
      "Become a cyber detective! Learn about cybersecurity threats, ethical hacking, and digital forensics. Solve simulated cyber crimes, understand security vulnerabilities, and learn how to protect digital assets.",
    maxParticipants: 70,
    registered: 54,
    highlights: [
      "Ethical hacking workshop",
      "Digital forensics training",
      "Capture the flag competition",
      "Security tools demonstration",
      "Certificate of participation",
    ],
    requirements: [
      "Laptop with Kali Linux or VM",
      "Basic networking knowledge",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
  },
  {
    id: "11",
    title: "CRAFT THE CORE - Logo Design Contest",
    date: "2025-11-07",
    time: "10:00 AM - 4:00 PM",
    venue: "Design Studio",
    category: "Cultural",
    organizer: "All About Art",
    description:
      "Unleash your creativity in this logo design competition! Create unique and memorable logos for various themes. Showcase your design skills and win exciting prizes. All design enthusiasts are welcome!",
    maxParticipants: 50,
    registered: 35,
    highlights: [
      "Multiple theme categories",
      "Professional judging panel",
      "Cash prizes and certificates",
      "Portfolio building opportunity",
      "Design software tutorials",
    ],
    requirements: [
      "Laptop with design software (Adobe Illustrator, Figma, etc.)",
      "Original designs only",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
  },
  {
    id: "12",
    title: "TCE Cultural Fest 2025",
    date: "2025-04-10",
    time: "9:00 AM - 6:00 PM",
    venue: "Main Ground",
    category: "Cultural",
    organizer: "Cultural Society",
    description:
      "Experience the vibrant colors of our annual cultural festival featuring dance, music, drama, and art competitions. Celebrate diversity and showcase your talent in front of the entire college community. A day filled with performances, food, and fun!",
    maxParticipants: 500,
    registered: 342,
    highlights: [
      "Multiple competition categories",
      "Live performances",
      "Food stalls from different cultures",
      "Prize distribution ceremony",
      "Cultural exhibitions",
    ],
    requirements: [
      "Student ID card",
      "Registration fee: ₹50",
    ],
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
  },
  {
    id: "13",
    title: "Dance Competition - AFD",
    date: "2025-02-28",
    time: "2:00 PM - 7:00 PM",
    venue: "Student Activity Center",
    category: "Cultural",
    organizer: "Anything for Dance",
    description:
      "Show off your dance moves in this spectacular dance competition! From classical to contemporary, hip-hop to folk, all dance styles are welcome. Compete solo or in groups and win amazing prizes!",
    maxParticipants: 150,
    registered: 98,
    highlights: [
      "Multiple dance categories",
      "Professional choreographers as judges",
      "Cash prizes and trophies",
      "Live DJ music",
      "Professional photography",
    ],
    requirements: [
      "Team or solo entry",
      "Own music track (if required)",
      "Student ID card",
      "Registration fee: ₹100 per team",
    ],
    image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800",
  },
  {
    id: "14",
    title: "Music Fest - Andhadhi",
    date: "2025-03-05",
    time: "5:00 PM - 9:00 PM",
    venue: "Auditorium",
    category: "Cultural",
    organizer: "Andhadhi Music Club",
    description:
      "An evening of melodious music featuring classical melodies, rock anthems, and soulful compositions. Participate in singing competitions or simply enjoy performances by talented musicians from our college and beyond.",
    maxParticipants: 200,
    registered: 134,
    highlights: [
      "Live band performances",
      "Singing competitions",
      "Multiple music genres",
      "Professional sound system",
      "Prizes for best performers",
    ],
    requirements: [
      "Student ID card for entry",
      "Participants need to register separately",
      "Own instruments (if performing)",
    ],
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800",
  },
  {
    id: "15",
    title: "Book Reading Session",
    date: "2025-03-15",
    time: "3:00 PM - 5:00 PM",
    venue: "TCE Library",
    category: "Cultural",
    organizer: "Book Readers Club",
    description:
      "Join fellow book lovers for an afternoon of reading, discussing, and sharing favorite books. This month's theme focuses on contemporary fiction. Bring your favorite book and be ready to engage in thoughtful discussions.",
    maxParticipants: 40,
    registered: 28,
    highlights: [
      "Book discussions and reviews",
      "Author spotlight sessions",
      "Reading recommendations",
      "Tea and snacks provided",
      "Book exchange corner",
    ],
    requirements: [
      "Bring a book to discuss",
      "Student ID card",
      "Love for reading",
    ],
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
  },
  {
    id: "16",
    title: "Film Screening - Cinemates",
    date: "2025-03-20",
    time: "6:00 PM - 9:00 PM",
    venue: "Mini Auditorium",
    category: "Cultural",
    organizer: "Cinemates",
    description:
      "Film appreciation and cinematography club presents a special screening of an acclaimed international film followed by a discussion on filmmaking techniques, storytelling, and cinematography. Perfect for cinema enthusiasts!",
    maxParticipants: 100,
    registered: 67,
    highlights: [
      "International film screening",
      "Post-screening discussion",
      "Cinematography analysis",
      "Free popcorn and drinks",
      "Q&A with film experts",
    ],
    requirements: [
      "Student ID card",
      "Free entry",
    ],
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800",
  },
  {
    id: "17",
    title: "Fashion Show - Always on Trend",
    date: "2025-04-05",
    time: "6:00 PM - 9:00 PM",
    venue: "Main Stage",
    category: "Cultural",
    organizer: "Always on Trend",
    description:
      "Walk the ramp and showcase the latest fashion trends! This glamorous fashion show features student designers and models presenting creative collections. From traditional to contemporary, witness fashion at its finest.",
    maxParticipants: 80,
    registered: 56,
    highlights: [
      "Professional runway setup",
      "Multiple fashion themes",
      "Best designer awards",
      "Photography and videography",
      "Styling workshops",
    ],
    requirements: [
      "Models and designers register separately",
      "Portfolio submission (for models)",
      "Student ID card",
      "Registration fee: ₹150",
    ],
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800",
  },
  {
    id: "18",
    title: "Literary Fest - Anglophile Lounge",
    date: "2025-04-15",
    time: "10:00 AM - 5:00 PM",
    venue: "English Department",
    category: "Cultural",
    organizer: "Anglophile Lounge",
    description:
      "Celebrate the beauty of literature and language at our annual literary festival. Participate in debates, poetry slams, story writing contests, and more. A must-attend event for all language and literature enthusiasts.",
    maxParticipants: 120,
    registered: 89,
    highlights: [
      "Poetry slam competition",
      "Creative writing workshops",
      "Debate competitions",
      "Book stalls",
      "Guest authors and poets",
    ],
    requirements: [
      "Student ID card",
      "Register for specific events",
      "Original content for competitions",
    ],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
  },
  {
    id: "19",
    title: "Inter-College Sports Meet",
    date: "2025-03-20",
    time: "8:00 AM - 6:00 PM",
    venue: "TCE Sports Complex",
    category: "Sports",
    organizer: "Sports Committee",
    description:
      "TCE hosts the annual inter-college sports meet featuring athletics, team sports, and individual competitions. Compete against the best athletes from colleges across the region and bring glory to TCE!",
    maxParticipants: 200,
    registered: 145,
    highlights: [
      "Multiple sports categories",
      "Inter-college competition",
      "Medals and trophies",
      "Professional sports facilities",
      "Refreshments and lunch provided",
    ],
    requirements: [
      "College sports team selection",
      "Medical fitness certificate",
      "Sports attire and equipment",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
  },
  {
    id: "20",
    title: "Cricket Tournament",
    date: "2025-02-15",
    time: "7:00 AM - 6:00 PM",
    venue: "Cricket Ground",
    category: "Sports",
    organizer: "Sports Committee",
    description:
      "Annual cricket tournament bringing together the best cricket talent from different departments. Form your team, strategize, and compete for the championship trophy in this exciting tournament!",
    maxParticipants: 150,
    registered: 112,
    highlights: [
      "Knockout tournament format",
      "Professional umpires",
      "Championship trophy and medals",
      "Man of the match awards",
      "Live commentary",
    ],
    requirements: [
      "Team of 11 players + 4 reserves",
      "Cricket whites or colored kit",
      "Own cricket equipment",
      "Registration fee: ₹500 per team",
    ],
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
  },
  {
    id: "21",
    title: "Basketball Championship",
    date: "2025-03-01",
    time: "9:00 AM - 5:00 PM",
    venue: "Basketball Court",
    category: "Sports",
    organizer: "Sports Committee",
    description:
      "Show your basketball skills in this thrilling championship! Fast-paced games, intense competition, and incredible athleticism. Whether you're a seasoned player or just love the game, this tournament is for you!",
    maxParticipants: 80,
    registered: 64,
    highlights: [
      "3-on-3 and 5-on-5 formats",
      "Professional court and equipment",
      "Trophies for winners",
      "MVP awards",
      "Energy drinks and snacks",
    ],
    requirements: [
      "Team registration",
      "Sports shoes and proper attire",
      "Student ID card",
      "Registration fee: ₹300 per team",
    ],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
  },
  {
    id: "22",
    title: "Athletic Meet 2025",
    date: "2025-04-25",
    time: "7:00 AM - 4:00 PM",
    venue: "Athletic Track",
    category: "Sports",
    organizer: "Sports Committee",
    description:
      "The annual athletic meet showcasing track and field events. From sprints to marathons, high jump to shot put, this event celebrates athletic excellence. Compete, set records, and represent your department with pride!",
    maxParticipants: 180,
    registered: 127,
    highlights: [
      "Multiple track and field events",
      "Department-wise competition",
      "Record-breaking opportunities",
      "Medals for top 3 in each event",
      "Sports day celebrations",
    ],
    requirements: [
      "Department nomination",
      "Medical fitness certificate",
      "Athletic wear and shoes",
      "Student ID card",
    ],
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  // Fetch event from API
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Event not found (Status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        // Format the event data
        const formattedEvent = {
          ...data,
          id: data._id,
          date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'TBA',
          time: data.time || 'TBA',
          category: data.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : 'General',
          organizer: data.organizer?.name || data.organizer?.email || 'TCE Administration',
          organizerId: data.organizer?._id || data.organizer,
          club: data.club || '',
          maxParticipants: data.maxParticipants || 100,
          registered: data.participants?.length || 0,
          highlights: data.highlights || [],
          requirements: data.requirements || [],
          image: data.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
        };
        
        setEvent(formattedEvent);
        
        // Check if user is registered
        const token = localStorage.getItem("tce_token");
        const userId = localStorage.getItem("tce_user_id");
        if (token && userId && data.participants) {
          setIsRegistered(data.participants.some((p: any) => p._id === userId || p === userId));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading event:", err);
        toast.error("Failed to load event", {
          description: err.message || "Please check if the backend is running and try again.",
        });
        setLoading(false);
      });
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("tce_token");
    
    if (!token) {
      toast.error("Authentication required", {
        description: "Please login to register for events.",
      });
      navigate("/login");
      return;
    }

    setRegistering(true);

    try {
      const url = `http://localhost:5000/api/events/${id}/register`;
      const method = isRegistered ? "DELETE" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || "Registration failed");
      
      // Format the event data the same way as initial fetch
      const formattedEvent = {
        ...data,
        id: data._id,
        date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 'TBA',
        time: data.time || 'TBA',
        category: data.type ? data.type.charAt(0).toUpperCase() + data.type.slice(1) : 'General',
        organizer: data.organizer?.name || data.organizer?.email || 'TCE Administration',
        organizerId: data.organizer?._id || data.organizer,
        club: data.club || '',
        maxParticipants: data.maxParticipants || 100,
        registered: data.participants?.length || 0,
        highlights: data.highlights || [],
        requirements: data.requirements || [],
        image: data.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
      };
      
      setEvent(formattedEvent);
      setIsRegistered(!isRegistered);
      
      // Show success toast
      if (isRegistered) {
        toast.success("Registration cancelled", {
          description: "You have been removed from this event.",
        });
      } else {
        toast.success("Successfully registered!", {
          description: "You're now registered for this event.",
        });
      }
      
      setRegistering(false);
    } catch (err: any) {
      toast.error(isRegistered ? "Failed to cancel registration" : "Failed to register", {
        description: err.message || "Please try again.",
      });
      setRegistering(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading event...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Event not found
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <Button onClick={() => navigate("/events")}>Back to Events</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    }
  };

  const participantCount = event.participants?.length || 0;
  const maxParticipants = event.maxParticipants || 100;
  const progressPercentage = (participantCount / maxParticipants) * 100;
  
  // Check if current user is the organizer
  const userId = localStorage.getItem("tce_user_id");
  const isOrganizer = event.organizerId === userId;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 pb-20 lg:pb-0">
        {/* Back Button */}
        <div className="max-w-5xl mx-auto px-4 lg:px-6 pt-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/events")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>

        {/* Event Header with Image */}
        <div className="relative h-64 lg:h-96 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
            <div className="max-w-5xl mx-auto">
              <Badge className="mb-2">{event.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {event.title}
              </h1>
              <p className="text-white/90 text-sm lg:text-base">
                Organized by {event.organizer}
              </p>
            </div>
          </div>
        </div>

        {/* Event Details Content */}
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Info */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-sm text-muted-foreground">
                        {event.venue}
                      </p>
                    </div>
                  </div>

                  {event.club && (
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Club</p>
                        <p className="text-sm text-muted-foreground">
                          {event.club}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Participants</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {participantCount} / {maxParticipants} registered
                      </p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </Card>

              {/* Highlights */}
              {event?.highlights && event.highlights.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Event Highlights</h2>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Requirements */}
              {event?.requirements && event.requirements.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

            {/* Sidebar - Registration Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                {isOrganizer ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Your Event</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                      <p className="text-blue-800 font-medium">
                        You are the organizer
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Organizers cannot register for their own events
                      </p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Registrations</span>
                        <span className="font-semibold">{participantCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Available Seats</span>
                        <span className="font-semibold">
                          {maxParticipants - participantCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold mb-4">
                      {isRegistered ? "You're Registered!" : "Register for Event"}
                    </h3>

                    {isRegistered ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                          <p className="text-green-800 font-medium">
                            Registration Successful!
                          </p>
                          <p className="text-sm text-green-600 mt-1">
                            Check your email for confirmation
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full text-red-600 hover:text-red-700"
                          onClick={handleRegister}
                          disabled={registering}
                        >
                          {registering ? "Processing..." : "Cancel Registration"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Available Seats</span>
                            <span className="font-semibold">
                              {maxParticipants - participantCount}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Registration Fee</span>
                            <span className="font-semibold text-green-600">Free</span>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          onClick={handleRegister}
                          disabled={participantCount >= maxParticipants || registering}
                        >
                          {registering
                            ? "Processing..."
                            : participantCount >= maxParticipants
                            ? "Event Full"
                            : "Register Now"}
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsSaved(!isSaved)}
                          >
                            <Bookmark
                              className={`h-4 w-4 mr-2 ${
                                isSaved ? "fill-current" : ""
                              }`}
                            />
                            {isSaved ? "Saved" : "Save"}
                          </Button>
                          <Button variant="outline" className="flex-1" onClick={handleShare}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-2 text-sm">Contact Organizer</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.organizer}
                  </p>
                  <Button variant="link" className="px-0 mt-2 text-sm">
                    Send Message
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
      <Footer />
    </div>
  );
}
