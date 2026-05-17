'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Participant } from '../../store/session';

interface RequestCardProps {
  participant: Participant;
  onAdmit: (id: string) => void;
  onRefuse: (id: string) => void;
}

function initials(pseudo: string): string {
  return pseudo.slice(0, 2).toUpperCase();
}

export function RequestCard({ participant, onAdmit, onRefuse }: RequestCardProps) {
  return (
    <motion.div
      layout
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="bg-bg-base border border-border rounded-[12px] p-3 flex items-center gap-3"
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-[13px] text-white shrink-0"
        style={{ backgroundColor: participant.color }}
      >
        {initials(participant.pseudo)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-[14px] text-t1 truncate leading-tight">
          {participant.pseudo}
        </p>
        <p className="font-display font-medium text-[12px] text-t3 leading-tight mt-0.5">
          {participant.gender === 'female' ? '♀ Femme' : '♂ Homme'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onRefuse(participant.id)}
          aria-label="Refuser"
          className="w-8 h-8 rounded-[8px] bg-bg-elevated border border-border flex items-center justify-center text-t3 hover:text-t1 hover:border-border-strong transition-all"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => onAdmit(participant.id)}
          aria-label="Admettre"
          className="w-8 h-8 rounded-[8px] bg-accent border border-accent flex items-center justify-center text-white hover:bg-[#E11D48] transition-all"
        >
          <Check size={14} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}
