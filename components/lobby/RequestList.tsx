'use client';

import { AnimatePresence } from 'framer-motion';
import { RequestCard } from '../ui/RequestCard';
import { Participant } from '../../store/session';

interface RequestListProps {
  pending: Participant[];
  onAdmit: (id: string) => void;
  onRefuse: (id: string) => void;
}

export function RequestList({ pending, onAdmit, onRefuse }: RequestListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {pending.length > 0 && (
        <>
          <div className="px-4 py-2 border-b border-border">
            <p className="font-display font-semibold text-[11px] text-t3 uppercase tracking-[0.06em]">
              Demandes ({pending.length})
            </p>
          </div>
          <div className="flex flex-col gap-1.5 p-3">
            <AnimatePresence initial={false}>
              {pending.map((p) => (
                <RequestCard
                  key={p.id}
                  participant={p}
                  onAdmit={onAdmit}
                  onRefuse={onRefuse}
                />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {pending.length === 0 && (
        <div className="flex items-center justify-center py-10 px-4">
          <p className="font-display font-medium text-[13px] text-t3 text-center italic">
            En attente de connexions...
          </p>
        </div>
      )}
    </div>
  );
}
