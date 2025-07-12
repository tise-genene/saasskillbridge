import toast from 'react-hot-toast';
import { AppError } from '@/types';
import { errorHandler } from '@/lib/error-handler';

export function useToast() {
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (error: string | AppError) => {
    const message =
      typeof error === 'string'
        ? error
        : errorHandler.getUserFriendlyMessage(error);
    toast.error(message);
  };

  const showWarning = (message: string) => {
    toast(message, {
      icon: '⚠️',
    });
  };

  const showInfo = (message: string) => {
    toast(message, {
      icon: 'ℹ️',
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
  };
}
