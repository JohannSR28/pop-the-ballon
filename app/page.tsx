'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RulesModal } from '../components/landing/RulesModal';
import { Button } from '../components/ui/Button';
import { ROUTES, ACTIVE_SESSIONS } from '../lib/constants';

const STATS = [
  { value: '1', label: 'ballon' },
  { value: '2–20', label: 'joueurs' },
  { value: '~8 min', label: 'par session' },
];

export default function LandingPage() {
  const router = useRouter();
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col relative overflow-hidden">
      {/* Very subtle centered top glow */}
      <div className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] bg-accent blur-[140px]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <span className="font-serif italic text-[22px] text-t1 tracking-[-0.01em]">
            Poppit
          </span>
          <span className="text-[16px] leading-none" aria-hidden="true">🎈</span>
        </div>

        {/* Live sessions pill */}
        <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink-dot shrink-0" />
          <span className="font-display font-medium text-[13px] text-t2 leading-none">
            {ACTIVE_SESSIONS} en direct
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-12 sm:px-8 text-center">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-display font-semibold text-[11px] text-t3 tracking-[0.12em] uppercase mb-6"
        >
          Jeu vidéo social · En direct
        </motion.p>

        {/* Headline — Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="font-serif text-[52px] sm:text-[72px] lg:text-[88px] leading-[1.05] tracking-[-0.02em] text-t1 mb-7"
        >
          Présente-toi.<br />
          Vote.<br />
          <span className="text-accent">Survive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.28 }}
          className="font-display font-medium text-[16px] text-t2 max-w-[360px] leading-[1.6] mb-10"
        >
          Sessions vidéo en direct. Une participante se présente,
          les autres votent — garder le ballon ou l&apos;éclater.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <Button
            variant="primary"
            onClick={() => router.push(ROUTES.GENDER)}
            className="px-10 py-3.5 text-base"
          >
            Jouer maintenant
          </Button>

          <button
            onClick={() => setRulesOpen(true)}
            className="font-display font-medium text-[14px] text-t3 hover:text-t2 transition-colors"
          >
            Comment ça marche ?
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mt-16 flex items-center gap-8 sm:gap-10"
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display font-bold text-[20px] text-t1 tracking-[-0.02em]">{s.value}</p>
              <p className="font-display font-medium text-[12px] text-t3 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </main>

      <RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />
    </div>
  );
}
