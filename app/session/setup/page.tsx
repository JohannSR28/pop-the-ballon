'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Stepper } from '../../../components/ui/Stepper';
import { PillToggle } from '../../../components/ui/PillToggle';
import { Button } from '../../../components/ui/Button';
import { useSessionStore, SessionConfig } from '../../../store/session';

const DURATION_OPTIONS = [
  { value: '30', label: '30 s' },
  { value: '45', label: '45 s' },
  { value: '60', label: '60 s' },
  { value: '90', label: '90 s' },
];

const BALLOON_RULE_OPTIONS = [
  { value: 'female', label: 'Les femmes' },
  { value: 'male', label: 'Les hommes' },
];

const VOTE_OPTIONS = [
  { value: 'anonymous', label: 'Anonyme' },
  { value: 'public', label: 'Public' },
];

const DEFAULTS: SessionConfig = {
  maxParticipants: 8,
  balloonRule: 'female',
  rounds: 5,
  presentationDuration: 60,
  voteVisibility: 'anonymous',
};

export default function SetupPage() {
  const router = useRouter();
  const { setConfig } = useSessionStore();

  const [maxParticipants, setMaxParticipants] = useState(DEFAULTS.maxParticipants);
  const [balloonRule, setBalloonRule] = useState<'female' | 'male'>(DEFAULTS.balloonRule);
  const [rounds, setRounds] = useState(DEFAULTS.rounds);
  const [duration, setDuration] = useState(String(DEFAULTS.presentationDuration));
  const [voteVisibility, setVoteVisibility] = useState<'anonymous' | 'public'>(DEFAULTS.voteVisibility);

  function handleLaunch() {
    setConfig({
      maxParticipants,
      balloonRule,
      rounds,
      presentationDuration: Number(duration),
      voteVisibility,
    });
    router.push('/session/lobby?role=host');
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Subtle glow */}
      <div className="pointer-events-none fixed top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[320px] rounded-full opacity-[0.06] bg-accent blur-[120px]" />

      {/* Header */}
      <header className="relative z-10 flex items-center h-14 px-4 sm:px-6 border-b border-border">
        <button
          onClick={() => router.back()}
          aria-label="Retour"
          className="flex items-center gap-1.5 text-t2 hover:text-t1 transition-colors font-display font-medium text-sm"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          Retour
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
          <span className="font-serif italic text-[19px] text-t1 tracking-[-0.01em]">Poppit</span>
          <span className="text-[14px] leading-none" aria-hidden="true">🎈</span>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-5 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-[480px] flex flex-col gap-8"
        >
          {/* Title */}
          <div>
            <p className="font-display font-semibold text-[11px] text-accent tracking-[0.1em] uppercase mb-3">
              Nouvelle session
            </p>
            <h2 className="font-display font-bold text-[28px] text-t1 tracking-[-0.02em] mb-1">
              Configure ta session
            </h2>
            <p className="font-display font-medium text-[14px] text-t2">
              Ces règles s&apos;appliquent à tous les rounds.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Max participants */}
          <div className="flex flex-col gap-3">
            <label className="font-display font-semibold text-[11px] text-t2 uppercase tracking-[0.06em]">
              Participants max
            </label>
            <Stepper
              value={maxParticipants}
              min={4}
              max={20}
              onChange={setMaxParticipants}
              helperText={`Tu pourras en admettre jusqu'à ${maxParticipants} dans le lobby`}
            />
          </div>

          {/* Balloon rule */}
          <div className="flex flex-col gap-3">
            <label className="font-display font-semibold text-[11px] text-t2 uppercase tracking-[0.06em]">
              Qui garde le ballon ?
            </label>
            <PillToggle
              options={BALLOON_RULE_OPTIONS as { value: 'female' | 'male'; label: string }[]}
              value={balloonRule}
              onChange={setBalloonRule}
            />
          </div>

          {/* Presentation duration */}
          <div className="flex flex-col gap-3">
            <label className="font-display font-semibold text-[11px] text-t2 uppercase tracking-[0.06em]">
              Temps par présentation
            </label>
            <PillToggle
              options={DURATION_OPTIONS}
              value={duration}
              onChange={setDuration}
            />
          </div>

          {/* Rounds */}
          <div className="flex flex-col gap-3">
            <label className="font-display font-semibold text-[11px] text-t2 uppercase tracking-[0.06em]">
              Nombre de rounds
            </label>
            <Stepper
              value={rounds}
              min={3}
              max={10}
              onChange={setRounds}
              helperText={`${rounds} participants seront présentés`}
            />
          </div>

          {/* Vote visibility */}
          <div className="flex flex-col gap-3">
            <label className="font-display font-semibold text-[11px] text-t2 uppercase tracking-[0.06em]">
              Visibilité du vote
            </label>
            <PillToggle
              options={VOTE_OPTIONS as { value: 'anonymous' | 'public'; label: string }[]}
              value={voteVisibility}
              onChange={setVoteVisibility}
            />
          </div>

          <div className="h-px bg-border" />

          <Button variant="primary" fullWidth onClick={handleLaunch}>
            Ouvrir le lobby →
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
