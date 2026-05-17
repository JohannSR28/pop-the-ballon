'use client';

import { cn } from '../../lib/utils';

interface PillOption<T extends string> {
  value: T;
  label: string;
}

interface PillToggleProps<T extends string> {
  options: PillOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function PillToggle<T extends string>({
  options,
  value,
  onChange,
  className,
}: PillToggleProps<T>) {
  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'px-4 py-2 rounded-[10px] font-display font-semibold text-[14px] transition-all duration-200 border',
              active
                ? 'bg-accent text-white border-accent'
                : 'bg-bg-surface text-t2 border-border hover:border-border-strong hover:text-t1'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
