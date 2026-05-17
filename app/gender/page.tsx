'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { OnboardingShell } from '../../components/layout/OnboardingShell';
import { CardSelect } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore } from '../../store/onboarding';
import { ROUTES } from '../../lib/constants';

const OPTIONS = [
  { value: 'male' as const,   label: 'Homme',  emoji: '♂' },
  { value: 'female' as const, label: 'Femme',  emoji: '♀' },
] as const;

export default function GenderPage() {
  const router = useRouter();
  const { setGender } = useOnboardingStore();
  const [selected, setSelected] = useState<'male' | 'female' | null>(null);

  function handleContinue() {
    if (!selected) return;
    setGender(selected);
    router.push(ROUTES.ROLE);
  }

  return (
    <OnboardingShell currentStep={1}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Step label */}
        <p className="font-display font-semibold text-[11px] text-accent tracking-[0.1em] uppercase mb-5">
          Étape 1 — Identité
        </p>

        <h2 className="font-display font-extrabold text-[36px] sm:text-[42px] text-t1 tracking-[-0.03em] leading-[1.05] mb-3">
          Tu es...
        </h2>
        <p className="font-display font-medium text-[15px] text-t2 mb-10 leading-[1.6]">
          Ce choix est requis pour participer.
        </p>

        {/* Two-card grid */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {OPTIONS.map((opt) => (
            <CardSelect
              key={opt.value}
              selected={selected === opt.value}
              onClick={() => setSelected(opt.value)}
            >
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div
                  className={[
                    'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200',
                    selected === opt.value ? 'bg-accent/15' : 'bg-bg-elevated',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'font-display font-bold text-[32px] leading-none transition-colors duration-200',
                      selected === opt.value ? 'text-accent' : 'text-t3',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {opt.emoji}
                  </span>
                </div>
                <p
                  className={[
                    'font-display font-bold text-[18px] tracking-[-0.01em] transition-colors duration-200',
                    selected === opt.value ? 'text-t1' : 'text-t2',
                  ].join(' ')}
                >
                  {opt.label}
                </p>
              </div>
            </CardSelect>
          ))}
        </div>

        <Button
          variant="primary"
          fullWidth
          disabled={!selected}
          onClick={handleContinue}
        >
          Continuer
        </Button>
      </motion.div>
    </OnboardingShell>
  );
}
