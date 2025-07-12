// User Types
export type UserType = 'parent' | 'student' | 'tutor';

export interface BaseUser {
  id: string;
  email: string;
  fullName: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface Profile extends BaseUser {
  phoneNumber?: string;
  profilePicture?: string;
  bio?: string;
  location?: {
    subcity: string;
    kebele: string;
    details?: string;
  };
  isVerified: boolean;
  isActive: boolean;
}

// Parent-specific types
export interface ParentProfile extends Profile {
  userType: 'parent';
  children: Child[];
  preferences?: {
    maxBudgetPerHour: number;
    preferredSessionType: SessionType;
    communicationPreferences: string[];
  };
}

// Student-specific types
export interface StudentProfile extends Profile {
  userType: 'student';
  gradeLevel: GradeLevel;
  school?: string;
  parentId?: string;
  subjects: Subject[];
  learningStyle?: LearningStyle;
  specialNeeds?: string;
}

// Tutor-specific types
export interface TutorProfile extends Profile {
  userType: 'tutor';
  qualifications: Qualification[];
  subjects: TutorSubject[];
  experience: number;
  hourlyRate: number;
  availability: Availability[];
  sessionTypes: SessionType[];
  rating: number;
  totalSessions: number;
  verificationStatus: VerificationStatus;
  bankDetails?: BankDetails;
}

// Child Management
export interface Child {
  id: string;
  parentId: string;
  name: string;
  age: number;
  gradeLevel: GradeLevel;
  school?: string;
  subjects: Subject[];
  learningStyle?: LearningStyle;
  specialNeeds?: string;
  createdAt: string;
  updatedAt: string;
}

// Education System
export type GradeLevel =
  | 'Pre-K'
  | 'Kindergarten'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'Grade 6'
  | 'Grade 7'
  | 'Grade 8'
  | 'Grade 9'
  | 'Grade 10'
  | 'Grade 11'
  | 'Grade 12';

export type Subject =
  | 'Mathematics'
  | 'English'
  | 'Amharic'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'History'
  | 'Geography'
  | 'Civics'
  | 'Computer Science'
  | 'Art'
  | 'Music';

export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic' | 'mixed';

export interface TutorSubject {
  subject: Subject;
  gradeLevels: GradeLevel[];
  hourlyRate: number;
  experience: number;
}

// Session Management
export type SessionType = 'online' | 'home' | 'flexible';
export type SessionStatus =
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface TutorRequest {
  id: string;
  parentId: string;
  childId?: string;
  subject: Subject;
  gradeLevel: GradeLevel;
  sessionType: SessionType;
  budget: number;
  location?: {
    subcity: string;
    kebele: string;
    details?: string;
  };
  description: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'matched' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface TutorProposal {
  id: string;
  tutorId: string;
  requestId: string;
  message: string;
  proposedRate: number;
  availability: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface TutoringSession {
  id: string;
  tutorId: string;
  studentId: string;
  parentId: string;
  subject: Subject;
  sessionType: SessionType;
  scheduledAt: string;
  duration: number;
  status: SessionStatus;
  location?: {
    subcity: string;
    kebele: string;
    details?: string;
  };
  meetingLink?: string;
  notes?: string;
  rating?: number;
  feedback?: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

// Verification and Qualifications
export type VerificationStatus =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'suspended';

export interface Qualification {
  id: string;
  type: 'degree' | 'certificate' | 'experience';
  title: string;
  institution: string;
  year: number;
  verified: boolean;
  documentUrl?: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  branchCode?: string;
}

// Availability
export interface Availability {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

// Location
export type AddisAbabaSubcity =
  | 'Addis Ketema'
  | 'Akaky Kaliti'
  | 'Arada'
  | 'Bole'
  | 'Gullele'
  | 'Kirkos'
  | 'Kolfe Keranio'
  | 'Lideta'
  | 'Nifas Silk-Lafto'
  | 'Yeka';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  userType: UserType;
  phoneNumber?: string;
}

export interface ChildForm {
  name: string;
  age: number;
  gradeLevel: GradeLevel;
  school?: string;
  subjects: Subject[];
  learningStyle?: LearningStyle;
  specialNeeds?: string;
}

export interface TutorRequestForm {
  childId?: string;
  subject: Subject;
  gradeLevel: GradeLevel;
  sessionType: SessionType;
  budget: number;
  location?: {
    subcity: AddisAbabaSubcity;
    kebele: string;
    details?: string;
  };
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

// Dashboard Types
export interface DashboardStats {
  parent: {
    childrenCount: number;
    activeSessions: number;
    monthlySpending: number;
    tutorsWorkedWith: number;
  };
  student: {
    activeSessions: number;
    completedSessions: number;
    averageRating: number;
    subjectsStudying: number;
  };
  tutor: {
    activeSessions: number;
    completedSessions: number;
    averageRating: number;
    monthlyEarnings: number;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  statusCode?: number;
  timestamp: string;
}

// Notification Types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

// Payment Types
export type PaymentMethod = 'telebirr' | 'cbe_birr' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  sessionId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
}
