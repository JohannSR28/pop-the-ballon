import { cn } from '../../lib/utils';

interface BalloonIconProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

export function BalloonIcon({
  size = 40,
  color = 'var(--accent-primary)',
  className,
  animate = true,
}: BalloonIconProps) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 40 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(animate && 'animate-float', className)}
      aria-hidden="true"
    >
      {/* Balloon body */}
      <ellipse cx="20" cy="19" rx="17" ry="19" fill={color} opacity="0.85" />
      {/* Highlight */}
      <ellipse cx="13" cy="10" rx="5" ry="7" fill="white" opacity="0.18" />
      {/* Knot */}
      <path
        d="M18 38 Q20 40 22 38"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* String */}
      <path
        d="M20 40 Q18 44 20 48 Q22 44 20 40"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}
