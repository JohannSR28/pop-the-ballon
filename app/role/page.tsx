'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Crown, Users } from 'lucide-react';
import { OnboardingShell } from '../../components/layout/OnboardingShell';
import { CardSelect } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useOnboardingStore } from '../../store/onboarding';
import { ROUTES } from '../../lib/constants';

const ROLES = [
  {
    value: 'host' as const,
    icon: <Crown size={22} strokeWidth={1.5} />,
    label: 'Host',
    sublabel: 'Créer une session',
    description: 'Tu configures les règles, gères les admissions et animes les tours.',
  },
  {
    value: 'participant' as const,
    icon: <Users size={22} strokeWidth={1.5} />,
    label: 'Joueur',
    sublabel: 'Rejoindre une session',
    description: 'Tu envoies une demande. Le Host t\'accepte à l\'entrée.',
  },
] as const;

export default function RolePage() {
  const router = useRouter();
  const { setRole } = useOnboardingStore();
  const [selected, setSelected] = useState<'host' | 'participant' | null>(null);

  function handleContinue() {
    if (!selected) return;
    setRole(selected);
    router.push(ROUTES.LOGIN);
  }

  return (
    <OnboardingShell currentStep={2}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Step label */}
        <p className="font-display font-semibold text-[11px] text-accent tracking-[0.1em] uppercase mb-5">
          Étape 2 — Rôle
        </p>

        <h2 className="font-display font-extrabold text-[36px] sm:text-[42px] text-t1 tracking-[-0.03em] leading-[1.05] mb-3">
          Ton rôle ce soir ?
        </h2>
        <p className="font-display font-medium text-[15px] text-t2 mb-10 leading-[1.6]">
          Le Host crée et anime. Les joueurs participent.
        </p>

        {/* Role cards */}
        <div className="flex flex-col gap-3 mb-10">
          {ROLES.map((role) => (
            <CardSelect
              key={role.value}
              selected={selected === role.value}
              onClick={() => setSelected(role.value)}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={[
                    'w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors duration-200',
                    selected === role.value
                      ? 'bg-accent text-white'
                      : 'bg-bg-elevated text-t2 border border-border',
                  ].join(' ')}
                >
                  {role.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="font-display font-bold text-[17px] text-t1 tracking-[-0.01em]">
                      {role.sublabel}
                    </p>
                    <span className="font-display font-semibold text-[11px] text-t3 uppercase tracking-[0.06em]">
                      {role.label}
                    </span>
                  </div>
                  <p className="font-display font-medium text-[14px] text-t2 leading-[1.55]">
                    {role.description}
                  </p>
                </div>
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
