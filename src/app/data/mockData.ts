// Mock Data for Municipality Admin Application - Ward 5, Thiruvottiyur

export interface Citizen {
  id: string;
  name: string;
  address: string;
  ward: string;
  phone: string;
  email: string;
  registrationDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
  serviceProvided: boolean;
  serviceType?: string;
  businessName?: string;
  profilePhoto?: string;
  pastRequests?: number;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Health' | 'Water' | 'Electricity' | 'Community' | 'Emergency';
  description: string;
  pdfUrl?: string;
  targetWard: string;
  status: 'Published' | 'Draft' | 'Archived';
  publishedDate: string;
}

export interface SOSAlert {
  id: string;
  citizenName: string;
  ward: string;
  location: string;
  time: string;
  emergencyContact: string;
  status: 'Active' | 'Acknowledged' | 'Resolved' | 'Escalated';
  type?: string;
}

export interface HelpRequest {
  id: string;
  type: string;
  description: string;
  location: string;
  citizenName: string;
  status: 'Open' | 'In Progress' | 'Closed';
  submittedDate: string;
  photoUrl?: string;
  assignedTo?: string;
}

export interface VolunteerEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  requiredVolunteers: number;
  registeredVolunteers: number;
  organizerName: string;
  volunteers?: { name: string; contact: string; attendance: 'Confirmed' | 'Pending' }[];
}

export interface ServiceProvider {
  id: string;
  businessName: string;
  category: 'Plumber' | 'Electrician' | 'Medical' | 'Others';
  phone: string;
  location: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface SafetyAlert {
  id: string;
  type: 'Road Closure' | 'Power Outage' | 'Water Supply' | 'Weather Warning';
  message: string;
  affectedArea: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Expired';
  createdDate: string;
}

export interface Poll {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  targetWard: string;
  duration: string;
  status: 'Active' | 'Closed';
  totalVotes: number;
  adminDecision?: string;
  closedDate?: string;
}

export interface AdminLog {
  id: string;
  action: string;
  timestamp: string;
  admin: string;
  details: string;
  actionType: 'Critical' | 'Normal';
}

// Mock Data - Ward 5, Thiruvottiyur
export const mockCitizens: Citizen[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    address: 'No. 45, Kamaraj Nagar, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    registrationDate: '2025-01-01',
    status: 'Pending',
    serviceProvided: false,
    pastRequests: 0
  },
  {
    id: '2',
    name: 'Priya Sharma',
    address: 'No. 78, Gandhi Street, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43211',
    email: 'priya.sharma@email.com',
    registrationDate: '2025-01-02',
    status: 'Approved',
    serviceProvided: false,
    pastRequests: 3
  },
  {
    id: '3',
    name: 'Kumar Plumbing Services',
    address: 'No. 12, Market Road, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43212',
    email: 'kumar.plumbing@email.com',
    registrationDate: '2024-12-15',
    status: 'Approved',
    serviceProvided: true,
    serviceType: 'Plumber',
    businessName: 'Kumar Plumbing Services',
    pastRequests: 0
  },
  {
    id: '4',
    name: 'Lakshmi Devi',
    address: 'No. 56, Anna Nagar, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43213',
    email: 'lakshmi.devi@email.com',
    registrationDate: '2025-01-03',
    status: 'Pending',
    serviceProvided: false,
    pastRequests: 0
  },
  {
    id: '5',
    name: 'Ravi Electricals',
    address: 'No. 89, Bus Stand Road, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43214',
    email: 'ravi.electricals@email.com',
    registrationDate: '2024-12-20',
    status: 'Pending',
    serviceProvided: true,
    serviceType: 'Electrician',
    businessName: 'Ravi Electricals',
    pastRequests: 0
  },
  {
    id: '6',
    name: 'Sunita Reddy',
    address: 'No. 34, Lake View Road, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43215',
    email: 'sunita.reddy@email.com',
    registrationDate: '2024-12-28',
    status: 'Approved',
    serviceProvided: false,
    pastRequests: 5
  },
  {
    id: '7',
    name: 'Vijay Clinic',
    address: 'No. 23, Hospital Road, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43216',
    email: 'vijay.clinic@email.com',
    registrationDate: '2024-12-10',
    status: 'Approved',
    serviceProvided: true,
    serviceType: 'Medical',
    businessName: 'Vijay Clinic',
    pastRequests: 0
  },
  {
    id: '8',
    name: 'Arun Mohan',
    address: 'No. 67, Temple Street, Thiruvottiyur',
    ward: 'Ward 5',
    phone: '+91 98765 43217',
    email: 'arun.mohan@email.com',
    registrationDate: '2025-01-04',
    status: 'Rejected',
    rejectionReason: 'Incomplete documentation',
    serviceProvided: false,
    pastRequests: 0
  }
];

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Water Supply Disruption - January 10',
    category: 'Water',
    description: 'Water supply will be disrupted on January 10 from 10 AM to 4 PM for maintenance work',
    targetWard: 'Ward 5',
    status: 'Published',
    publishedDate: '2025-01-02',
    pdfUrl: 'notice_water_supply.pdf'
  },
  {
    id: '2',
    title: 'Community Health Camp - Free Check-up',
    category: 'Health',
    description: 'Free health check-up camp organized at Ward 5 Community Center on January 15',
    targetWard: 'Ward 5',
    status: 'Published',
    publishedDate: '2025-01-03',
    pdfUrl: 'notice_health_camp.pdf'
  },
  {
    id: '3',
    title: 'Property Tax Payment Reminder',
    category: 'Community',
    description: 'Last date to pay property tax without penalty is January 31',
    targetWard: 'Ward 5',
    status: 'Draft',
    publishedDate: '2025-01-04'
  }
];

export const mockSOSAlerts: SOSAlert[] = [
  {
    id: '1',
    citizenName: 'Amit Patel',
    ward: 'Ward 5',
    location: 'No. 89, Gandhi Street, Thiruvottiyur',
    time: '2025-01-05 10:30 AM',
    emergencyContact: '+91 98765 43212',
    status: 'Active',
    type: 'Medical Emergency'
  },
  {
    id: '2',
    citizenName: 'Meera Nair',
    ward: 'Ward 5',
    location: 'No. 45, Market Road, Thiruvottiyur',
    time: '2025-01-05 11:15 AM',
    emergencyContact: '+91 98765 43218',
    status: 'Active',
    type: 'Fire Emergency'
  },
  {
    id: '3',
    citizenName: 'Ravi Kumar',
    ward: 'Ward 5',
    location: 'No. 23, Lake View Road, Thiruvottiyur',
    time: '2025-01-04 09:00 PM',
    emergencyContact: '+91 98765 43219',
    status: 'Resolved',
    type: 'Safety Concern'
  }
];

export const mockHelpRequests: HelpRequest[] = [
  {
    id: '1',
    type: 'Road Repair',
    description: 'Large pothole near Main Market causing accidents',
    location: 'Main Market Road, Ward 5, Thiruvottiyur',
    citizenName: 'Sunita Devi',
    status: 'Open',
    submittedDate: '2025-01-02',
    photoUrl: 'pothole_image.jpg'
  },
  {
    id: '2',
    type: 'Street Light',
    description: 'Street light not working for past 3 days',
    location: 'Anna Nagar, Ward 5, Thiruvottiyur',
    citizenName: 'Prakash Rao',
    status: 'In Progress',
    submittedDate: '2025-01-03',
    assignedTo: 'Electrician Team A',
    photoUrl: 'streetlight_issue.jpg'
  },
  {
    id: '3',
    type: 'Garbage Collection',
    description: 'Garbage not collected for 2 days',
    location: 'Temple Street, Ward 5, Thiruvottiyur',
    citizenName: 'Anita Singh',
    status: 'Open',
    submittedDate: '2025-01-04'
  },
  {
    id: '4',
    type: 'Water Leakage',
    description: 'Water pipe leaking on the road',
    location: 'Bus Stand Road, Ward 5, Thiruvottiyur',
    citizenName: 'Mohan Das',
    status: 'Closed',
    submittedDate: '2025-01-01',
    assignedTo: 'Plumber Team B'
  }
];

export const mockVolunteerEvents: VolunteerEvent[] = [
  {
    id: '1',
    name: 'Community Cleanliness Drive',
    description: 'Join us for a neighborhood cleanup activity',
    date: '2025-01-15',
    time: '8:00 AM',
    location: 'Community Park, Ward 5, Thiruvottiyur',
    requiredVolunteers: 50,
    registeredVolunteers: 32,
    organizerName: 'Ward 5 Municipality Office',
    volunteers: [
      { name: 'Rahul Sharma', contact: '+91 98765 11111', attendance: 'Confirmed' },
      { name: 'Priya Patel', contact: '+91 98765 22222', attendance: 'Confirmed' },
      { name: 'Amit Kumar', contact: '+91 98765 33333', attendance: 'Pending' }
    ]
  },
  {
    id: '2',
    name: 'Tree Plantation Drive',
    description: 'Plant trees for a greener Ward 5',
    date: '2025-01-20',
    time: '7:00 AM',
    location: 'Lake View Road, Ward 5, Thiruvottiyur',
    requiredVolunteers: 30,
    registeredVolunteers: 18,
    organizerName: 'Environmental Committee - Ward 5'
  }
];

export const mockServiceProviders: ServiceProvider[] = [
  {
    id: '1',
    businessName: 'Quick Fix Plumbing',
    category: 'Plumber',
    phone: '+91 98765 43213',
    location: 'Sector 10, Ward 5, Thiruvottiyur',
    status: 'Pending'
  },
  {
    id: '2',
    businessName: 'Bright Electricals',
    category: 'Electrician',
    phone: '+91 98765 43220',
    location: 'Market Road, Ward 5, Thiruvottiyur',
    status: 'Approved'
  }
];

export const mockSafetyAlerts: SafetyAlert[] = [
  {
    id: '1',
    type: 'Road Closure',
    message: 'Main Road under construction from January 10-15. Use alternate route via Lake View Road',
    affectedArea: 'Main Road, Sector 15, Ward 5',
    priority: 'High',
    status: 'Active',
    createdDate: '2025-01-02'
  },
  {
    id: '2',
    type: 'Power Outage',
    message: 'Scheduled power outage for electrical maintenance',
    affectedArea: 'Anna Nagar, Ward 5',
    priority: 'Medium',
    status: 'Active',
    createdDate: '2025-01-04'
  },
  {
    id: '3',
    type: 'Weather Warning',
    message: 'Heavy rain expected. Please stay indoors',
    affectedArea: 'All areas, Ward 5',
    priority: 'High',
    status: 'Expired',
    createdDate: '2025-01-01'
  }
];

export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'What time is best for weekly market in Ward 5?',
    options: [
      { text: 'Morning (6-10 AM)', votes: 145 },
      { text: 'Afternoon (2-6 PM)', votes: 89 },
      { text: 'Evening (6-10 PM)', votes: 76 }
    ],
    targetWard: 'Ward 5',
    duration: '7 days',
    status: 'Active',
    totalVotes: 310
  },
  {
    id: '2',
    question: 'Should Ward 5 install more CCTV cameras for safety?',
    options: [
      { text: 'Yes, definitely needed', votes: 234 },
      { text: 'No, not required', votes: 45 },
      { text: 'Not sure', votes: 21 }
    ],
    targetWard: 'Ward 5',
    duration: '10 days',
    status: 'Closed',
    totalVotes: 300,
    adminDecision: 'Based on overwhelming support (78%), Ward 5 Municipality will install 15 new CCTV cameras at key locations by February 2025.',
    closedDate: '2024-12-30'
  }
];

export const mockAdminLogs: AdminLog[] = [
  {
    id: '1',
    action: 'Citizen Approved',
    timestamp: '2025-01-05 09:15 AM',
    admin: 'Admin User',
    details: 'Approved registration for Priya Sharma',
    actionType: 'Normal'
  },
  {
    id: '2',
    action: 'SOS Alert Resolved',
    timestamp: '2025-01-05 09:45 AM',
    admin: 'Admin User',
    details: 'Resolved SOS alert for Ravi Kumar - Safety Concern',
    actionType: 'Critical'
  },
  {
    id: '3',
    action: 'Notice Published',
    timestamp: '2025-01-05 10:00 AM',
    admin: 'Admin User',
    details: 'Published notice: Community Health Camp - Free Check-up',
    actionType: 'Normal'
  },
  {
    id: '4',
    action: 'Help Request Assigned',
    timestamp: '2025-01-05 10:30 AM',
    admin: 'Admin User',
    details: 'Assigned Street Light repair to Electrician Team A',
    actionType: 'Normal'
  },
  {
    id: '5',
    action: 'Poll Closed',
    timestamp: '2024-12-30 06:00 PM',
    admin: 'Admin User',
    details: 'Closed poll: Should Ward 5 install more CCTV cameras - Decision published',
    actionType: 'Critical'
  },
  {
    id: '6',
    action: 'Help Request Closed',
    timestamp: '2025-01-04 03:00 PM',
    admin: 'Admin User',
    details: 'Closed help request: Water Leakage - Fixed by Plumber Team B',
    actionType: 'Critical'
  }
];
