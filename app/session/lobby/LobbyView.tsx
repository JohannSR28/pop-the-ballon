'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Users, Video, LogOut } from 'lucide-react';
import { useSessionStore } from '../../../store/session';
import { useOnboardingStore } from '../../../store/onboarding';
import { useMockParticipants } from '../../../hooks/useMockParticipants';
import { VideoGrid } from '../../../components/lobby/VideoGrid';
import { ParticipantCount } from '../../../components/lobby/ParticipantCount';
import { RequestList } from '../../../components/lobby/RequestList';
import { AdmittedList } from '../../../components/lobby/AdmittedList';
import { Spinner } from '../../../components/ui/Spinner';
import { Toast } from '../../../components/ui/Toast';
import { Button } from '../../../components/ui/Button';

// ── Shared host tile config ──────────────────────────────────────────────────
const HOST_TILE = { pseudo: 'Moi', color: '#F43F5E' };

// ─────────────────────────────────────────────────────────────────────────────
// HOST VIEW
// ─────────────────────────────────────────────────────────────────────────────
function HostLobbyView() {
  const router = useRouter();
  const { participants, config, admitParticipant, refuseParticipant } = useSessionStore();
  const [activeTab, setActiveTab] = useState<'video' | 'lobby'>('video');

  useMockParticipants(true);

  const pending = participants.filter((p) => p.status === 'pending');
  const admitted = participants.filter((p) => p.status === 'admitted');
  const maxParticipants = config?.maxParticipants ?? 8;
  const canLaunch = admitted.length >= 2;

  const handleLaunch = useCallback(() => {
    // Phase C — not implemented yet
    alert('Phase C (Jeu) n\'est pas encore implémentée.');
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between h-12 px-4 border-b border-border shrink-0 z-20 bg-bg-base">
        <div className="flex items-center gap-1">
          <span className="font-serif italic text-[18px] text-t1 tracking-[-0.01em]">Poppit</span>
          <span className="text-[14px] leading-none" aria-hidden="true">🎈</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
          <span className="font-display font-medium text-[13px] text-t2">Session ouverte</span>
        </div>

        <Button
          variant="primary"
          disabled={!canLaunch}
          onClick={handleLaunch}
          className="text-[13px] px-4 py-2"
        >
          Lancer le jeu →
        </Button>
      </header>

      {/* Desktop layout: split — Video | Management */}
      <div className="flex-1 flex overflow-hidden">

        {/* Video zone (always visible desktop, tab-toggled mobile) */}
        <div
          className={[
            'flex-1 min-w-0 overflow-y-auto bg-bg-base',
            'lg:block',
            activeTab === 'video' ? 'block' : 'hidden lg:block',
          ].join(' ')}
        >
          <VideoGrid host={HOST_TILE} admitted={admitted} />
        </div>

        {/* Management panel (right side desktop, full-screen mobile tab) */}
        <div
          className={[
            'lg:w-[300px] lg:shrink-0 lg:border-l lg:border-border lg:flex lg:flex-col lg:overflow-hidden',
            'bg-bg-surface',
            activeTab === 'lobby' ? 'flex flex-col flex-1' : 'hidden lg:flex lg:flex-col',
          ].join(' ')}
        >
          <ParticipantCount admitted={admitted.length} max={maxParticipants} />
          <RequestList
            pending={pending}
            onAdmit={admitParticipant}
            onRefuse={refuseParticipant}
          />
          <AdmittedList admitted={admitted} />
        </div>
      </div>

      {/* Mobile tab bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-bg-surface border-t border-border flex z-30">
        <button
          onClick={() => setActiveTab('video')}
          className={[
            'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors',
            activeTab === 'video' ? 'text-accent' : 'text-t3',
          ].join(' ')}
        >
          <Video size={18} strokeWidth={2} />
          <span className="font-display font-medium text-[11px]">Vidéo</span>
        </button>

        <div className="w-px bg-border self-stretch my-2" />

        <button
          onClick={() => setActiveTab('lobby')}
          className={[
            'flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative',
            activeTab === 'lobby' ? 'text-accent' : 'text-t3',
          ].join(' ')}
        >
          <Users size={18} strokeWidth={2} />
          <span className="font-display font-medium text-[11px]">Lobby</span>
          {pending.length > 0 && (
            <span className="absolute top-2 right-[calc(50%-18px)] w-4 h-4 rounded-full bg-accent text-white font-display font-bold text-[10px] flex items-center justify-center">
              {pending.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile bottom padding so content isn't hidden behind tab bar */}
      <div className="lg:hidden h-14 shrink-0" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PENDING VIEW
// ─────────────────────────────────────────────────────────────────────────────
function PendingLobbyView() {
  const router = useRouter();
  const { pseudo } = useOnboardingStore();
  const { addPendingParticipant, participants } = useSessionStore();
  const [admittedCount, setAdmittedCount] = useState(1);

  // Add current user to session store as pending
  useEffect(() => {
    addPendingParticipant({
      id: 'self',
      pseudo: pseudo || 'Moi',
      gender: 'male',
      color: '#60A5FA',
    });
  }, [addPendingParticipant, pseudo]);

  // Watch own status → redirect when admitted
  useEffect(() => {
    const me = participants.find((p) => p.id === 'self');
    if (me?.status === 'admitted') {
      router.replace('/session/lobby?role=admitted');
    }
  }, [participants, router]);

  // Simulate fluctuating admitted count
  useEffect(() => {
    const interval = setInterval(() => {
      setAdmittedCount((c) => Math.max(1, Math.min(8, c + (Math.random() > 0.5 ? 1 : -1))));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Demo: auto-admit after 12s so the flow can be tested
  useEffect(() => {
    const t = setTimeout(() => {
      useSessionStore.getState().admitParticipant('self');
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between h-12 px-4 border-b border-border">
        <div className="flex items-center gap-1">
          <span className="font-serif italic text-[18px] text-t1 tracking-[-0.01em]">Poppit</span>
          <span className="text-[14px] leading-none" aria-hidden="true">🎈</span>
        </div>
        <Button variant="ghost" onClick={() => router.push('/')} className="text-[13px] px-3 py-1.5">
          <LogOut size={14} strokeWidth={2} />
          Quitter
        </Button>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center gap-7 px-5 text-center">
        {/* Self camera tile */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-[260px] aspect-square rounded-2xl bg-bg-surface border border-border overflow-hidden flex flex-col"
        >
          <div className="flex-1 flex items-center justify-center bg-[#60A5FA18]">
            <div className="w-16 h-16 rounded-full bg-[#60A5FA] flex items-center justify-center font-display font-bold text-[22px] text-white">
              {(pseudo || 'Mo').slice(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="bg-black/50 px-3 py-2">
            <span className="font-display font-semibold text-[13px] text-white">{pseudo || 'Moi'}</span>
          </div>
        </motion.div>

        {/* Waiting indicator */}
        <div className="flex flex-col items-center gap-3">
          <Spinner size={22} />
          <div>
            <p className="font-display font-semibold text-[18px] text-t1 tracking-[-0.01em] mb-1">
              En attente d&apos;admission
            </p>
            <p className="font-display font-medium text-[14px] text-t2 max-w-[240px] leading-[1.6]">
              Le Host peut t&apos;admettre à tout moment.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => router.push('/')}
            className="text-[13px] px-4 py-2 mt-1"
          >
            Quitter la file
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 flex items-center justify-center border-t border-border">
        <p className="font-display font-medium text-[13px] text-t3">
          {admittedCount} personne{admittedCount > 1 ? 's' : ''} déjà admise{admittedCount > 1 ? 's' : ''}
        </p>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMITTED VIEW
// ─────────────────────────────────────────────────────────────────────────────
function AdmittedLobbyView() {
  const router = useRouter();
  const { participants } = useSessionStore();
  const { pseudo } = useOnboardingStore();
  const [showToast, setShowToast] = useState(true);

  const admitted = participants.filter((p) => p.status === 'admitted');

  useEffect(() => {
    const t = setTimeout(() => setShowToast(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between h-12 px-4 border-b border-border shrink-0">
        <div className="flex items-center gap-1">
          <span className="font-serif italic text-[18px] text-t1 tracking-[-0.01em]">Poppit</span>
          <span className="text-[14px] leading-none" aria-hidden="true">🎈</span>
        </div>
        <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot" />
          <span className="font-display font-medium text-[12px] text-t2">Dans le lobby</span>
        </div>
      </header>

      {/* Video grid */}
      <main className="flex-1 overflow-y-auto">
        <VideoGrid
          host={HOST_TILE}
          admitted={admitted}
          selfId="self"
        />
      </main>

      {/* Footer */}
      <footer className="h-14 border-t border-border flex items-center justify-between px-4 shrink-0">
        <p className="font-display font-medium text-[13px] text-t2">
          En attente du lancement par le host...
        </p>
        <Button variant="ghost" onClick={() => router.push('/')} className="text-[13px] px-3 py-1.5">
          <LogOut size={14} strokeWidth={2} />
          Quitter
        </Button>
      </footer>

      {showToast && <Toast message="Vous avez été admis dans le lobby 🎈" duration={3500} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTER
// ─────────────────────────────────────────────────────────────────────────────
export function LobbyView() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  return (
    <AnimatePresence mode="wait">
      {role === 'host' && (
        <motion.div key="host" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <HostLobbyView />
        </motion.div>
      )}
      {role === 'pending' && (
        <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <PendingLobbyView />
        </motion.div>
      )}
      {role === 'admitted' && (
        <motion.div key="admitted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <AdmittedLobbyView />
        </motion.div>
      )}
      {!role && (
        <div className="min-h-screen bg-bg-base flex items-center justify-center">
          <p className="font-display text-t3">Paramètre manquant — retourne à l&apos;accueil.</p>
        </div>
      )}
    </AnimatePresence>
  );
}
