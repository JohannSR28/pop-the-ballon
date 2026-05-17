'use client';

import { useEffect } from 'react';
import { useSessionStore } from '../store/session';
import { MOCK_PARTICIPANTS } from '../lib/mock-participants';

/**
 * Simulates participants arriving progressively in the lobby.
 * First request arrives ~2s after mount, then ~3.5s between each.
 */
export function useMockParticipants(enabled: boolean) {
  const addPendingParticipant = useSessionStore((s) => s.addPendingParticipant);

  useEffect(() => {
    if (!enabled) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    MOCK_PARTICIPANTS.forEach((p, i) => {
      const delay = 2000 + i * 3500;
      timers.push(
        setTimeout(() => {
          addPendingParticipant(p);
        }, delay)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [enabled, addPendingParticipant]);
}
