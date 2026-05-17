'use client';

import { create } from 'zustand';

export interface Participant {
  id: string;
  pseudo: string;
  gender: 'male' | 'female';
  status: 'pending' | 'admitted' | 'refused';
  color: string;
  joinedAt: number;
}

export interface SessionConfig {
  maxParticipants: number;
  balloonRule: 'female' | 'male';
  rounds: number;
  presentationDuration: number;
  voteVisibility: 'anonymous' | 'public';
}

interface SessionState {
  config: SessionConfig | null;
  participants: Participant[];
  setConfig: (c: SessionConfig) => void;
  admitParticipant: (id: string) => void;
  refuseParticipant: (id: string) => void;
  addPendingParticipant: (p: Omit<Participant, 'status' | 'joinedAt'>) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>()((set, get) => ({
  config: null,
  participants: [],

  setConfig: (config) => set({ config }),

  admitParticipant: (id) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? { ...p, status: 'admitted' as const } : p
      ),
    })),

  refuseParticipant: (id) =>
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? { ...p, status: 'refused' as const } : p
      ),
    })),

  addPendingParticipant: (p) => {
    const existing = get().participants.find((x) => x.id === p.id);
    if (existing) return;
    set((state) => ({
      participants: [
        ...state.participants,
        { ...p, status: 'pending', joinedAt: Date.now() },
      ],
    }));
  },

  reset: () => set({ config: null, participants: [] }),
}));
