import { useState, useCallback } from 'react';
import { errorHandler } from '@/lib/error-handler';
import { AppError } from '@/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

export function useApi<T = any>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (url: string, options: RequestInit = {}): Promise<T | null> => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const error = errorHandler.handleApiError(response, errorData);
          setState({ data: null, loading: false, error });
          return null;
        }

        const data = await response.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const appError = errorHandler.handleError(error, 'useApi');
        setState({ data: null, loading: false, error: appError });
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
