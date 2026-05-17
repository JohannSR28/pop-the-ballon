import { Participant } from '../../store/session';

interface AdmittedListProps {
  admitted: Participant[];
}

function initials(pseudo: string): string {
  return pseudo.slice(0, 2).toUpperCase();
}

export function AdmittedList({ admitted }: AdmittedListProps) {
  if (admitted.length === 0) return null;

  return (
    <div>
      <div className="px-4 py-2 border-t border-border">
        <p className="font-display font-semibold text-[11px] text-t3 uppercase tracking-[0.06em]">
          Dans le lobby ({admitted.length})
        </p>
      </div>
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        {admitted.map((p) => (
          <div key={p.id} className="flex items-center gap-2.5 px-2 py-1.5 rounded-[8px] hover:bg-bg-elevated transition-colors">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-display font-bold text-[10px] text-white shrink-0"
              style={{ backgroundColor: p.color }}
            >
              {initials(p.pseudo)}
            </div>
            <span className="font-display font-medium text-[13px] text-t1 truncate flex-1">
              {p.pseudo}
            </span>
            <span className="font-display text-[12px] text-t3 shrink-0">
              {p.gender === 'female' ? '♀' : '♂'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
