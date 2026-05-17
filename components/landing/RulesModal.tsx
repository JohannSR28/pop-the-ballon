'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserCircle, Video, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { ROUTES } from '../../lib/constants';

const STEPS = [
  {
    icon: <UserCircle size={22} strokeWidth={1.5} />,
    number: '01',
    title: 'Choisis ton rôle',
    description: 'Host pour créer et animer, Participant pour jouer.',
  },
  {
    icon: <Video size={22} strokeWidth={1.5} />,
    number: '02',
    title: 'Rejoins la session',
    description: 'Connexion vidéo instantanée avec les autres participants.',
  },
  {
    icon: <ThumbsUp size={22} strokeWidth={1.5} />,
    number: '03',
    title: 'Vote à chaque tour',
    description: 'Garder le ballon ou l\'éclater — la salle décide.',
  },
];

interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

export function RulesModal({ open, onClose }: RulesModalProps) {
  const router = useRouter();

  function handlePlay() {
    onClose();
    router.push(ROUTES.GENDER);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />

          <motion.div
            key="modal"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-bg-surface border-t border-border rounded-t-[24px] p-6 pb-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="w-8 h-1 rounded-full bg-border-strong mx-auto mb-7" />

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-[22px] text-t1 tracking-[-0.02em]">
                  Comment jouer ?
                </h2>
                <p className="font-display font-medium text-[14px] text-t2 mt-1">
                  3 étapes, 30 secondes.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-bg-elevated text-t3 hover:text-t2 transition-colors border border-border"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>

            {/* Steps */}
            <div className="flex flex-col mb-8">
              {STEPS.map((step, i) => (
                <div key={i} className="flex gap-4">
                  {/* Left: number + connector */}
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-accent shrink-0">
                      {step.icon}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="w-px flex-1 bg-border my-2" />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className={i < STEPS.length - 1 ? 'pb-6' : ''}>
                    <p className="font-display font-bold text-[15px] text-t1 leading-none mb-1">
                      {step.title}
                    </p>
                    <p className="font-display font-medium text-[14px] text-t2 leading-[1.5]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="primary" fullWidth onClick={handlePlay}>
              Jouer maintenant
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
