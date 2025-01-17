// frontend/src/utils/error.ts
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { t } from 'i18next';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    if (axiosError.response?.data?.errors) {
      return Object.values(axiosError.response.data.errors)
        .flat()
        .join(', ');
    }

    switch (axiosError.response?.status) {
      case 401:
        return t('errors.unauthorized');
      case 403:
        return t('errors.forbidden');
      case 404:
        return t('errors.notFound');
      case 422:
        return t('errors.validation');
      case 429:
        return t('errors.tooManyRequests');
      case 500:
        return t('errors.serverError');
      default:
        return t('errors.unknown');
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return t('errors.unknown');
};

export const showError = (error: unknown) => {
  const message = handleApiError(error);
  toast.error(message);
};

export const showSuccess = (message: string) => {
  toast.success(message);
};