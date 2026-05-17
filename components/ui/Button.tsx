'use client';

import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-display font-semibold text-[15px] tracking-[-0.01em]',
        'px-6 py-3 rounded-btn transition-all duration-150 cursor-pointer select-none',
        fullWidth && 'w-full',
        variant === 'primary' && [
          'bg-accent text-white border border-accent',
          'hover:bg-[#E11D48] hover:border-[#E11D48]',
          'active:scale-[0.97]',
          disabled && 'opacity-30 pointer-events-none',
        ],
        variant === 'secondary' && [
          'bg-transparent text-t2 border border-border',
          'hover:text-t1 hover:border-border-strong',
          'active:scale-[0.97]',
          disabled && 'opacity-30 pointer-events-none',
        ],
        variant === 'ghost' && [
          'bg-transparent text-t2 border-none px-3 py-2',
          'hover:text-t1',
          disabled && 'opacity-30 pointer-events-none',
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
