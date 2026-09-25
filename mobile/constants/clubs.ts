// Static club list mirroring the web app's Community.tsx
// Backend /api/clubs may have dynamic data; this acts as fallback static data
import type { Club } from '../types';

export const STATIC_CLUBS: Club[] = [
  {
    name: 'AI Consortium',
    description: 'Student-driven club dedicated to exploring AI and Machine Learning',
    members: 450,
    icon: 'bulb-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/35',
  },
  {
    name: 'Algo Geeks Club',
    description: 'Department of CSE - Competitive programming and algorithms',
    members: 389,
    icon: 'code-slash-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/12',
  },
  {
    name: 'AR/VR Club',
    description: 'Exploring Augmented and Virtual Reality technologies at TCE',
    members: 325,
    icon: 'glasses-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/4',
  },
  {
    name: 'App Development Club',
    description: 'Department of IT - Building innovative mobile applications',
    members: 412,
    icon: 'phone-portrait-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/3',
  },
  {
    name: 'Andhadhi - Music Club',
    description: 'Classical melodies, rock anthems, and soulful compositions',
    members: 298,
    icon: 'musical-notes-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/82',
  },
  {
    name: 'Anything for Dance (AFD)',
    description: 'From classical to contemporary dance styles at TCE',
    members: 267,
    icon: 'body-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/61',
  },
  {
    name: 'All About Art',
    description: 'Sketching workshops, exhibitions, and collaborative art projects',
    members: 178,
    icon: 'color-palette-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/78',
  },
  {
    name: 'Book Readers Club',
    description: 'Fostering a vibrant community of literature enthusiasts',
    members: 156,
    icon: 'book-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/86',
  },
  {
    name: 'Anglophile Lounge',
    description: 'Department of English - Literature and language excellence',
    members: 234,
    icon: 'library-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/75',
  },
  {
    name: 'Cinemates',
    description: 'Film appreciation and cinematography club at TCE',
    members: 189,
    icon: 'film-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/80',
  },
  {
    name: 'Ascenders - Aerial Vehicle Club',
    description: 'Department of EEE - UAVs, drones, and aerial innovations',
    members: 201,
    icon: 'airplane-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/14',
  },
  {
    name: 'IoT Club',
    description: 'Internet of Things and embedded systems innovation',
    members: 345,
    icon: 'radio-outline',
    portalUrl: 'https://clubs.tceapps.in/tce/student/clubs/1',
  },
];

export const EVENT_FILTERS = ['All', 'Technical', 'Cultural', 'Sports'] as const;

export const DEPARTMENTS = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'General',
];

export const YEARS = ['1st', '2nd', '3rd', '4th'];
