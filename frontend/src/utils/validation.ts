import { z } from 'zod';
import i18next from 'i18next';

const t = i18next.t;

export const registerSchema = z.object({
  email: z.string()
    .email(t('validation.invalidEmail'))
    .min(1, t('validation.required')),
  password: z.string()
    .min(8, t('validation.passwordMin'))
    .regex(/[A-Z]/, t('validation.passwordUppercase'))
    .regex(/[a-z]/, t('validation.passwordLowercase'))
    .regex(/[0-9]/, t('validation.passwordNumber'))
    .regex(/[^A-Za-z0-9]/, t('validation.passwordSpecial')),
  title: z.string().min(1, t('validation.required')),
  first_name: z.string().min(1, t('validation.required')),
  last_name: z.string().min(1, t('validation.required')),
  phone: z.string()
    .min(1, t('validation.required'))
    .regex(/^\d{10}$/, t('validation.invalidPhone'))
});

export type RegisterFormData = z.infer<typeof registerSchema>;