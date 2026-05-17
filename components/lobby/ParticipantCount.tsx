interface ParticipantCountProps {
  admitted: number;
  max: number;
}

export function ParticipantCount({ admitted, max }: ParticipantCountProps) {
  const remaining = max - admitted;
  const percent = Math.min((admitted / max) * 100, 100);

  return (
    <div className="px-4 py-3 border-b border-border">
      <p className="font-display font-bold text-[22px] text-t1 tracking-[-0.02em] mb-2">
        {admitted} <span className="text-t3 font-semibold text-[16px]">/ {max}</span>
      </p>
      <div className="h-1 bg-border rounded-full overflow-hidden mb-1.5">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="font-display font-medium text-[12px] text-t2">
        {remaining > 0
          ? `${remaining} place${remaining > 1 ? 's' : ''} disponible${remaining > 1 ? 's' : ''}`
          : 'Session complète'}
      </p>
    </div>
  );
}
