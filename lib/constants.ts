export const ROUTES = {
  HOME: '/',
  GENDER: '/gender',
  ROLE: '/role',
  LOGIN: '/login',
} as const;

export const ACTIVE_SESSIONS = 42;

export const GAME_STATS = [
  { emoji: '🎈', label: 'Ballons', value: '1' },
  { emoji: '👥', label: 'Joueurs max', value: '2–20' },
  { emoji: '⚡', label: 'Temps moyen', value: '8 min' },
] as const;

export const ONBOARDING_STEPS = 3;

export const SESSION_CODE_MIN_LENGTH = 4;
export const RECONNECT_TOKEN_MIN_LENGTH = 8;

export const FAKE_DELAY_MS = 800;
