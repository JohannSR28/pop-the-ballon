'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { VideoTile } from '../ui/VideoTile';
import { Participant } from '../../store/session';

interface HostTile {
  pseudo: string;
  color: string;
}

interface VideoGridProps {
  host: HostTile;
  admitted: Participant[];
  selfId?: string;
}

function gridCols(count: number): string {
  if (count <= 2) return 'grid-cols-2';
  if (count <= 4) return 'grid-cols-2';
  if (count <= 9) return 'grid-cols-3';
  return 'grid-cols-4';
}

export function VideoGrid({ host, admitted, selfId }: VideoGridProps) {
  const total = 1 + admitted.length;

  return (
    <div className={`grid ${gridCols(total)} gap-2 p-3 content-start`}>
      {/* Host tile */}
      <VideoTile
        pseudo={host.pseudo}
        gender="male"
        color={host.color}
        isHost
        isSelf={!selfId}
      />

      {/* Admitted participant tiles */}
      <AnimatePresence>
        {admitted.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <VideoTile
              pseudo={p.pseudo}
              gender={p.gender}
              color={p.color}
              isSelf={p.id === selfId}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Empty state */}
      {admitted.length === 0 && (
        <div className="col-span-full flex items-center justify-center py-12">
          <p className="font-display font-medium text-[13px] text-t3 italic text-center">
            Les participants admis apparaîtront ici
          </p>
        </div>
      )}
    </div>
  );
}
