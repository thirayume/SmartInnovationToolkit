export const states = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  idle: 'idle'
} as const;

export type States = typeof states[keyof typeof states];

export const common = {
  states
};
