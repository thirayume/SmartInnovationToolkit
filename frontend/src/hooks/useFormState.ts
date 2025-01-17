// frontend/src/hooks/useFormState.ts
import { useState } from 'react';
import { z } from 'zod';
import { showError } from '../utils/error';

interface UseFormStateOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: () => void;
}

export function useFormState<T extends Record<string, any>>({ 
  schema, 
  onSubmit,
  onSuccess 
}: UseFormStateOptions<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (data: T): boolean => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce((acc, curr) => {
          const path = curr.path[0] as keyof T;
          acc[path] = curr.message;
          return acc;
        }, {} as Record<keyof T, string>);
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (data: T) => {
    if (!validate(data)) return;

    setIsLoading(true);
    try {
      await onSubmit(data);
      onSuccess?.();
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    handleSubmit
  };
}