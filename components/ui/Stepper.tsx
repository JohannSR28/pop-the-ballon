'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  helperText?: string;
  className?: string;
}

export function Stepper({ value, min, max, onChange, helperText, className }: StepperProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Diminuer"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-10 h-10 rounded-[10px] bg-bg-surface border border-border flex items-center justify-center text-t2 hover:text-t1 hover:border-border-strong transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <Minus size={16} strokeWidth={2.5} />
        </button>

        <span className="font-display font-bold text-[24px] text-t1 tracking-[-0.02em] min-w-[2.5ch] text-center">
          {value}
        </span>

        <button
          type="button"
          aria-label="Augmenter"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-10 h-10 rounded-[10px] bg-bg-surface border border-border flex items-center justify-center text-t2 hover:text-t1 hover:border-border-strong transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {helperText && (
        <p className="font-display font-medium text-[12px] text-t3">{helperText}</p>
      )}
    </div>
  );
}
