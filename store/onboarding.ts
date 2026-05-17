'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface OnboardingState {
  gender: 'male' | 'female' | 'neutral' | null;
  role: 'host' | 'participant' | null;
  pseudo: string;
  email: string;
  sessionCode: string;
  setGender: (g: OnboardingState['gender']) => void;
  setRole: (r: OnboardingState['role']) => void;
  setUser: (pseudo: string, email: string) => void;
  setSessionCode: (code: string) => void;
  reset: () => void;
}

const initialState = {
  gender: null as OnboardingState['gender'],
  role: null as OnboardingState['role'],
  pseudo: '',
  email: '',
  sessionCode: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setGender: (gender) => set({ gender }),
      setRole: (role) => set({ role }),
      setUser: (pseudo, email) => set({ pseudo, email }),
      setSessionCode: (sessionCode) => set({ sessionCode }),
      reset: () => set(initialState),
    }),
    {
      name: 'poppit-session',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : sessionStorage
      ),
    }
  )
);
