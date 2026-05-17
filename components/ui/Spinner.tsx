import { cn } from '../../lib/utils';

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Chargement"
      style={{ width: size, height: size }}
      className={cn(
        'inline-block rounded-full border-2 border-border-strong border-t-accent animate-spin shrink-0',
        className
      )}
    />
  );
}
