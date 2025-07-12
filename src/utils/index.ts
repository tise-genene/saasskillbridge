import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  format as dateFnsFormat,
  parseISO,
  isValid,
  differenceInYears,
} from 'date-fns';
import { VALIDATION_RULES } from '@/constants';
import { AppError, Subject, GradeLevel } from '@/types';

// Tailwind CSS utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Validation Utilities
export const validation = {
  email: (email: string): boolean => {
    return VALIDATION_RULES.email.pattern.test(email);
  },

  phoneNumber: (phone: string): boolean => {
    return VALIDATION_RULES.phoneNumber.pattern.test(phone);
  },

  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const rules = VALIDATION_RULES.password;

    if (password.length < rules.minLength) {
      errors.push(
        `Password must be at least ${rules.minLength} characters long`
      );
    }

    if (rules.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (rules.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (rules.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (rules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  age: (age: number): boolean => {
    return age >= VALIDATION_RULES.age.min && age <= VALIDATION_RULES.age.max;
  },

  hourlyRate: (rate: number): boolean => {
    return (
      rate >= VALIDATION_RULES.hourlyRate.min &&
      rate <= VALIDATION_RULES.hourlyRate.max
    );
  },
};

// Formatting Utilities
export const formatUtils = {
  currency: (amount: number, currency = 'ETB'): string => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: currency === 'ETB' ? 'USD' : currency, // Fallback since ETB might not be supported
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace('$', 'ETB ');
  },

  date: (date: string | Date, formatString = 'MMM dd, yyyy'): string => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj)
        ? dateFnsFormat(dateObj, formatString)
        : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  },

  time: (date: string | Date): string => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj)
        ? dateFnsFormat(dateObj, 'HH:mm')
        : 'Invalid time';
    } catch {
      return 'Invalid time';
    }
  },

  phoneNumber: (phone: string): string => {
    // Format Ethiopian phone numbers
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('251')) {
      return `+251 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    if (cleaned.startsWith('0')) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  },

  name: (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  initials: (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  },
};

// Date Utilities
export const dateUtils = {
  calculateAge: (birthDate: string | Date): number => {
    try {
      const dateObj =
        typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
      return isValid(dateObj) ? differenceInYears(new Date(), dateObj) : 0;
    } catch {
      return 0;
    }
  },

  isToday: (date: string | Date): boolean => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      const today = new Date();
      return (
        isValid(dateObj) &&
        dateObj.getDate() === today.getDate() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getFullYear() === today.getFullYear()
      );
    } catch {
      return false;
    }
  },

  isUpcoming: (date: string | Date): boolean => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj) && dateObj > new Date();
    } catch {
      return false;
    }
  },

  getRelativeTime: (date: string | Date): string => {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(dateObj)) return 'Invalid date';

      const now = new Date();
      const diffInMs = now.getTime() - dateObj.getTime();
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInMinutes < 1) return 'Just now';
      if (diffInMinutes < 60)
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
      if (diffInHours < 24)
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
      if (diffInDays < 7)
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

      return formatUtils.date(dateObj);
    } catch {
      return 'Invalid date';
    }
  },
};

// String Utilities
export const stringUtils = {
  truncate: (text: string, maxLength: number, suffix = '...'): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  },

  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  camelCase: (text: string): string => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  },

  kebabCase: (text: string): string => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },

  extractInitials: (text: string): string => {
    return text
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },
};

// Array Utilities
export const arrayUtils = {
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },

  groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce(
      (groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
      },
      {} as Record<string, T[]>
    );
  },

  sortBy: <T>(
    array: T[],
    key: keyof T,
    direction: 'asc' | 'desc' = 'asc'
  ): T[] => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },

  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  shuffle: <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i];
      shuffled[i] = shuffled[j]!;
      shuffled[j] = temp!;
    }
    return shuffled;
  },
};

// Object Utilities
export const objectUtils = {
  pick: <T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },

  isEmpty: (obj: any): boolean => {
    if (obj == null) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
  },

  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as any;
    if (Array.isArray(obj))
      return obj.map(item => objectUtils.deepClone(item)) as any;

    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = objectUtils.deepClone(obj[key]);
      }
    }
    return cloned;
  },
};

// Error Handling Utilities
export const errorUtils = {
  createError: (code: string, message: string, details?: any): AppError => ({
    code,
    message,
    details,
    timestamp: new Date().toISOString(),
  }),

  isAppError: (error: any): error is AppError => {
    return (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error
    );
  },

  formatError: (error: any): string => {
    if (errorUtils.isAppError(error)) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unknown error occurred';
  },

  logError: (error: any, context?: string): void => {
    const errorMessage = errorUtils.formatError(error);
    const logMessage = context ? `[${context}] ${errorMessage}` : errorMessage;

    if (process.env.NODE_ENV === 'development') {
      console.error(logMessage, error);
    }

    // In production, you might want to send to a logging service
    // Example: sendToLoggingService(error, context);
  },
};

// URL Utilities
export const urlUtils = {
  buildUrl: (
    base: string,
    path: string,
    params?: Record<string, any>
  ): string => {
    const url = new URL(path, base);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  },

  getQueryParams: (search: string): Record<string, string> => {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};

    params.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  },

  updateQueryParams: (
    currentParams: Record<string, string>,
    updates: Record<string, string | null>
  ): string => {
    const params = new URLSearchParams(currentParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    return params.toString();
  },
};

// Local Storage Utilities
export const storageUtils = {
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      errorUtils.logError(error, 'localStorage.set');
    }
  },

  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue ?? null);
    } catch (error) {
      errorUtils.logError(error, 'localStorage.get');
      return defaultValue ?? null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      errorUtils.logError(error, 'localStorage.remove');
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      errorUtils.logError(error, 'localStorage.clear');
    }
  },
};

// Subject and Grade Utilities
export const educationUtils = {
  getAvailableGrades: (subject: Subject): GradeLevel[] => {
    const gradeMapping: Record<Subject, GradeLevel[]> = {
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
      Civics: [
        'Grade 7',
        'Grade 8',
        'Grade 9',
        'Grade 10',
        'Grade 11',
        'Grade 12',
      ],
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

    return gradeMapping[subject] || [];
  },

  isValidGradeForSubject: (subject: Subject, grade: GradeLevel): boolean => {
    const availableGrades = educationUtils.getAvailableGrades(subject);
    return availableGrades.includes(grade);
  },

  getGradeLevel: (grade: string): number => {
    const gradeMap: Record<string, number> = {
      'Pre-K': 0,
      Kindergarten: 1,
      'Grade 1': 2,
      'Grade 2': 3,
      'Grade 3': 4,
      'Grade 4': 5,
      'Grade 5': 6,
      'Grade 6': 7,
      'Grade 7': 8,
      'Grade 8': 9,
      'Grade 9': 10,
      'Grade 10': 11,
      'Grade 11': 12,
      'Grade 12': 13,
    };

    return gradeMap[grade] || 0;
  },
};

// Debounce Utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle Utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Generate Random ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Sleep Utility
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
