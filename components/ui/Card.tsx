import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

interface CardSelectProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function CardSelect({
  selected = false,
  onClick,
  children,
  className,
}: CardSelectProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'relative bg-bg-surface border rounded-card p-5 cursor-pointer transition-all duration-200',
        'hover:border-border-strong hover:-translate-y-0.5',
        selected
          ? 'border-accent/40 bg-accent-sub shadow-[0_0_0_1px_rgba(255,41,82,0.25)] -translate-y-0.5'
          : 'border-border',
        className
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
          <Check size={11} className="text-accent" strokeWidth={3} />
        </span>
      )}
      {children}
    </div>
  );
}
