import { Crown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VideoTileProps {
  pseudo: string;
  gender: 'male' | 'female';
  color: string;
  isHost?: boolean;
  isSelf?: boolean;
  className?: string;
}

function initials(pseudo: string): string {
  return pseudo.slice(0, 2).toUpperCase();
}

function genderSymbol(gender: 'male' | 'female'): string {
  return gender === 'female' ? '♀' : '♂';
}

export function VideoTile({ pseudo, gender, color, isHost, isSelf, className }: VideoTileProps) {
  const label = isSelf && isHost ? 'Toi (Host)' : isSelf ? `${pseudo} (toi)` : pseudo;

  return (
    <div
      className={cn(
        'relative rounded-[12px] overflow-hidden bg-bg-surface aspect-square flex flex-col',
        isHost && 'ring-2 ring-accent/40',
        className
      )}
    >
      {/* Color background fill */}
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-[20px] text-white"
          style={{ backgroundColor: color }}
        >
          {initials(pseudo)}
        </div>
      </div>

      {/* Bottom label */}
      <div className="bg-black/50 backdrop-blur-sm px-2 py-1.5 flex items-center justify-between gap-1">
        <span className="font-display font-semibold text-[12px] text-white truncate">{label}</span>
        <span className="flex items-center gap-1 shrink-0">
          {isHost && <Crown size={10} className="text-accent" />}
          <span className="font-display text-[11px] text-white/60">{genderSymbol(gender)}</span>
        </span>
      </div>
    </div>
  );
}
