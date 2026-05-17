import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'neutral' | 'success';
  className?: string;
  dot?: boolean;
}

export function Badge({ children, variant = 'neutral', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
        'font-display font-semibold text-[11px] uppercase tracking-[0.06em]',
        variant === 'accent' && 'bg-accent-sub text-accent border border-accent/20',
        variant === 'neutral' && 'bg-bg-elevated text-t2 border border-border',
        variant === 'success' && 'bg-success/10 text-success border border-success/20',
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-blink-dot shrink-0" />
      )}
      {children}
    </span>
  );
}
