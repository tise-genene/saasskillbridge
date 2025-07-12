import { AppError } from '@/types';
import { ERROR_MESSAGES } from '@/constants';

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: AppError[] = [];
  private maxQueueSize = 100;

  private constructor() {}

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  // Create standardized error
  createError(
    code: string,
    message: string,
    details?: any,
    statusCode?: number
  ): AppError {
    const error: AppError = {
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
    };

    if (statusCode !== undefined) {
      error.statusCode = statusCode;
    }

    return error;
  }

  // Handle different types of errors
  handleError(error: any, context?: string): AppError {
    let appError: AppError;

    if (this.isAppError(error)) {
      appError = error;
    } else if (error instanceof Error) {
      appError = this.createError(
        'GENERIC_ERROR',
        error.message,
        { stack: error.stack, context },
        500
      );
    } else if (typeof error === 'string') {
      appError = this.createError('STRING_ERROR', error, { context }, 400);
    } else {
      appError = this.createError(
        'UNKNOWN_ERROR',
        'An unknown error occurred',
        { error, context },
        500
      );
    }

    // Log the error
    this.logError(appError, context);

    // Add to queue for potential reporting
    this.addToQueue(appError);

    return appError;
  }

  // Check if error is AppError
  private isAppError(error: any): error is AppError {
    return (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error &&
      'timestamp' in error
    );
  }

  // Log error based on environment
  private logError(error: AppError, context?: string): void {
    const logData = {
      ...error,
      context,
      userAgent:
        typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    };

    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error: ${error.code}`);
      console.error('Message:', error.message);
      console.error('Details:', error.details);
      if (context) console.error('Context:', context);
      console.error('Timestamp:', error.timestamp);
      console.groupEnd();
    } else {
      // In production, send to logging service
      this.sendToLoggingService(logData);
    }
  }

  // Add error to queue for batch processing
  private addToQueue(error: AppError): void {
    this.errorQueue.push(error);

    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift(); // Remove oldest error
    }
  }

  // Send error to external logging service
  private async sendToLoggingService(error: any): Promise<void> {
    try {
      // Example: Send to Sentry, LogRocket, or custom logging service
      if (process.env.SENTRY_DSN) {
        // Sentry integration would go here
        console.error('Error logged to Sentry:', error);
      }

      // You can also send to your own logging endpoint
      if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
        await fetch('/api/logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(error),
        });
      }
    } catch (loggingError) {
      console.error('Failed to send error to logging service:', loggingError);
    }
  }

  // Get user-friendly error message
  getUserFriendlyMessage(error: AppError): string {
    const errorMessages: Record<string, string> = {
      NETWORK_ERROR: ERROR_MESSAGES.NETWORK_ERROR,
      UNAUTHORIZED: ERROR_MESSAGES.UNAUTHORIZED,
      FORBIDDEN: ERROR_MESSAGES.FORBIDDEN,
      NOT_FOUND: ERROR_MESSAGES.NOT_FOUND,
      VALIDATION_ERROR: ERROR_MESSAGES.VALIDATION_ERROR,
      SERVER_ERROR: ERROR_MESSAGES.SERVER_ERROR,
      SESSION_EXPIRED: ERROR_MESSAGES.SESSION_EXPIRED,
    };

    return (
      errorMessages[error.code] ||
      error.message ||
      'An unexpected error occurred'
    );
  }

  // Handle API errors
  handleApiError(response: Response, data?: any): AppError {
    const statusCode = response.status;
    let code = 'API_ERROR';
    let message = 'API request failed';

    switch (statusCode) {
      case 400:
        code = 'BAD_REQUEST';
        message = data?.message || 'Invalid request';
        break;
      case 401:
        code = 'UNAUTHORIZED';
        message = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case 403:
        code = 'FORBIDDEN';
        message = ERROR_MESSAGES.FORBIDDEN;
        break;
      case 404:
        code = 'NOT_FOUND';
        message = ERROR_MESSAGES.NOT_FOUND;
        break;
      case 422:
        code = 'VALIDATION_ERROR';
        message = data?.message || ERROR_MESSAGES.VALIDATION_ERROR;
        break;
      case 429:
        code = 'RATE_LIMIT_EXCEEDED';
        message = 'Too many requests. Please try again later.';
        break;
      case 500:
        code = 'SERVER_ERROR';
        message = ERROR_MESSAGES.SERVER_ERROR;
        break;
      case 503:
        code = 'SERVICE_UNAVAILABLE';
        message = 'Service temporarily unavailable. Please try again later.';
        break;
      default:
        code = 'HTTP_ERROR';
        message = `HTTP Error ${statusCode}`;
    }

    return this.createError(
      code,
      message,
      { statusCode, response: data },
      statusCode
    );
  }

  // Handle Supabase errors
  handleSupabaseError(error: any): AppError {
    if (error?.code) {
      switch (error.code) {
        case 'PGRST116':
          return this.createError('NOT_FOUND', 'Record not found', error);
        case '23505':
          return this.createError(
            'DUPLICATE_ERROR',
            'Record already exists',
            error
          );
        case '23503':
          return this.createError(
            'FOREIGN_KEY_ERROR',
            'Referenced record not found',
            error
          );
        case '42501':
          return this.createError(
            'PERMISSION_DENIED',
            'Permission denied',
            error
          );
        default:
          return this.createError(
            'DATABASE_ERROR',
            error.message || 'Database error',
            error
          );
      }
    }

    return this.createError(
      'SUPABASE_ERROR',
      error.message || 'Supabase error',
      error
    );
  }

  // Handle form validation errors
  handleValidationError(errors: Record<string, string[]>): AppError {
    const firstError = Object.values(errors)[0]?.[0];
    return this.createError(
      'VALIDATION_ERROR',
      firstError || 'Validation failed',
      errors,
      400
    );
  }

  // Clear error queue
  clearQueue(): void {
    this.errorQueue = [];
  }

  // Get error queue for debugging
  getErrorQueue(): AppError[] {
    return [...this.errorQueue];
  }

  // Report error to external service
  async reportError(error: AppError, userFeedback?: string): Promise<void> {
    try {
      const reportData = {
        ...error,
        userFeedback,
        reportedAt: new Date().toISOString(),
      };

      await this.sendToLoggingService(reportData);
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Utility functions for common error scenarios
export const createNetworkError = (message?: string): AppError => {
  return errorHandler.createError(
    'NETWORK_ERROR',
    message || ERROR_MESSAGES.NETWORK_ERROR,
    undefined,
    0
  );
};

export const createValidationError = (
  field: string,
  message: string
): AppError => {
  return errorHandler.createError('VALIDATION_ERROR', message, { field }, 400);
};

export const createUnauthorizedError = (message?: string): AppError => {
  return errorHandler.createError(
    'UNAUTHORIZED',
    message || ERROR_MESSAGES.UNAUTHORIZED,
    undefined,
    401
  );
};

export const createNotFoundError = (resource: string): AppError => {
  return errorHandler.createError(
    'NOT_FOUND',
    `${resource} not found`,
    { resource },
    404
  );
};

// Global error boundary helper
export const handleGlobalError = (error: any, errorInfo?: any): void => {
  const appError = errorHandler.handleError(error, 'GlobalErrorBoundary');

  // You might want to show a toast notification here
  console.error('Global error caught:', appError);

  // Report to error monitoring service
  errorHandler.reportError(appError, errorInfo?.componentStack);
};

// Async error wrapper
export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  context?: string
): T => {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw errorHandler.handleError(error, context);
    }
  }) as T;
};

// React error boundary hook
export const useErrorHandler = () => {
  const handleError = (error: any, context?: string) => {
    return errorHandler.handleError(error, context);
  };

  const reportError = (error: AppError, feedback?: string) => {
    return errorHandler.reportError(error, feedback);
  };

  const getUserFriendlyMessage = (error: AppError) => {
    return errorHandler.getUserFriendlyMessage(error);
  };

  return {
    handleError,
    reportError,
    getUserFriendlyMessage,
  };
};
