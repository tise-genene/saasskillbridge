import { Subject, GradeLevel, AddisAbabaSubcity, LearningStyle } from '@/types';

// Ethiopian Education System Constants
export const SUBJECTS: Subject[] = [
  'Mathematics',
  'English',
  'Amharic',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'Civics',
  'Computer Science',
  'Art',
  'Music',
];

export const GRADE_LEVELS: GradeLevel[] = [
  'Pre-K',
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
];

export const LEARNING_STYLES: {
  value: LearningStyle;
  label: string;
  description: string;
}[] = [
  {
    value: 'visual',
    label: 'Visual Learner',
    description: 'Learns best through seeing and visual aids',
  },
  {
    value: 'auditory',
    label: 'Auditory Learner',
    description: 'Learns best through listening and discussion',
  },
  {
    value: 'kinesthetic',
    label: 'Kinesthetic Learner',
    description: 'Learns best through hands-on activities',
  },
  {
    value: 'mixed',
    label: 'Mixed Learner',
    description: 'Combines multiple learning styles',
  },
];

// Subject-Grade Level Mapping
export const SUBJECT_GRADE_MAPPING: Record<Subject, GradeLevel[]> = {
  Mathematics: [
    'Pre-K',
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ],
  English: [
    'Pre-K',
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ],
  Amharic: [
    'Pre-K',
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ],
  Physics: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
  Chemistry: ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
  Biology: [
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ],
  History: [
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ],
  Geography: [
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ],
  Civics: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'],
  'Computer Science': [
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
  ],
  Art: [
    'Pre-K',
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
  ],
  Music: [
    'Pre-K',
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
  ],
};

// Addis Ababa Location Constants
export const ADDIS_ABABA_SUBCITIES: AddisAbabaSubcity[] = [
  'Addis Ketema',
  'Akaky Kaliti',
  'Arada',
  'Bole',
  'Gullele',
  'Kirkos',
  'Kolfe Keranio',
  'Lideta',
  'Nifas Silk-Lafto',
  'Yeka',
];

// Common Kebeles by Subcity (sample data)
export const KEBELES_BY_SUBCITY: Record<AddisAbabaSubcity, string[]> = {
  'Addis Ketema': [
    'Kebele 01',
    'Kebele 02',
    'Kebele 03',
    'Kebele 04',
    'Kebele 05',
  ],
  'Akaky Kaliti': [
    'Kebele 01',
    'Kebele 02',
    'Kebele 03',
    'Kebele 04',
    'Kebele 05',
  ],
  Arada: ['Kebele 01', 'Kebele 02', 'Kebele 03', 'Kebele 04', 'Kebele 05'],
  Bole: ['Kebele 01', 'Kebele 02', 'Kebele 03', 'Kebele 04', 'Kebele 05'],
  Gullele: ['Kebele 01', 'Kebele 02', 'Kebele 03', 'Kebele 04', 'Kebele 05'],
  Kirkos: ['Kebele 01', 'Kebele 02', 'Kebele 03', 'Kebele 04', 'Kebele 05'],
  'Kolfe Keranio': [
    'Kebele 01',
    'Kebele 02',
    'Kebele 03',
    'Kebele 04',
    'Kebele 05',
  ],
  Lideta: ['Kebele 01', 'Kebele 02', 'Kebele 03', 'Kebele 04', 'Kebele 05'],
  'Nifas Silk-Lafto': [
    'Kebele 01',
    'Kebele 02',
    'Kebele 03',
    'Kebele 04',
    'Kebele 05',
  ],
  Yeka: ['Kebele 01', 'Kebele 02', 'Kebele 03', 'Kebele 04', 'Kebele 05'],
};

// Session Types
export const SESSION_TYPES = [
  {
    value: 'online',
    label: 'Online Session',
    description: 'Virtual tutoring via video call',
  },
  {
    value: 'home',
    label: 'Home Tutoring',
    description: 'Tutor comes to your location',
  },
  {
    value: 'flexible',
    label: 'Flexible',
    description: 'Either online or in-person',
  },
] as const;

// Urgency Levels
export const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', description: 'Can wait a few days' },
  { value: 'medium', label: 'Medium', description: 'Need within 1-2 days' },
  { value: 'high', label: 'High', description: 'Need immediately' },
] as const;

// User Type Configurations
export const USER_TYPE_CONFIG = {
  parent: {
    label: 'Parent',
    description: 'Find qualified tutors for your children',
    icon: '👨‍👩‍👧‍👦',
    color: 'bg-blue-500',
  },
  student: {
    label: 'Student',
    description: 'Get personalized tutoring support',
    icon: '🎓',
    color: 'bg-green-500',
  },
  tutor: {
    label: 'Tutor',
    description: 'Share your knowledge and earn income',
    icon: '👨‍🏫',
    color: 'bg-purple-500',
  },
} as const;

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'telebirr', label: 'Telebirr', icon: '📱' },
  { value: 'cbe_birr', label: 'CBE Birr', icon: '🏦' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '💳' },
] as const;

// App Configuration
export const APP_CONFIG = {
  name: 'Eagle Tutorials Services',
  shortName: 'Eagle Tutorials',
  description: 'Quality tutoring services in Addis Ababa',
  version: '1.0.0',
  supportEmail: 'support@eagletutorials.et',
  supportPhone: '+251-911-123456',
  address: 'Addis Ababa, Ethiopia',
  social: {
    facebook: 'https://facebook.com/eagletutorials',
    telegram: 'https://t.me/eagletutorials',
    instagram: 'https://instagram.com/eagletutorials',
  },
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

// Validation Constants
export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  phoneNumber: {
    pattern: /^(\+251|0)(9|7)\d{8}$/,
    message: 'Please enter a valid Ethiopian phone number',
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  age: {
    min: 3,
    max: 25,
    message: 'Age must be between 3 and 25 years',
  },
  hourlyRate: {
    min: 50,
    max: 1000,
    message: 'Hourly rate must be between 50 and 1000 ETB',
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to access this feature.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  CHILD_ADDED: 'Child added successfully!',
  CHILD_UPDATED: 'Child information updated successfully!',
  CHILD_DELETED: 'Child removed successfully!',
  REQUEST_SUBMITTED: 'Tutor request submitted successfully!',
  PROPOSAL_SENT: 'Proposal sent successfully!',
  SESSION_SCHEDULED: 'Session scheduled successfully!',
  PAYMENT_COMPLETED: 'Payment completed successfully!',
} as const;

// Time Constants
export const TIME_CONSTANTS = {
  DAYS_OF_WEEK: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  MONTHS: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  TIME_SLOTS: [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'eagle_auth_token',
  USER_PROFILE: 'eagle_user_profile',
  THEME: 'eagle_theme',
  LANGUAGE: 'eagle_language',
  RECENT_SEARCHES: 'eagle_recent_searches',
} as const;
