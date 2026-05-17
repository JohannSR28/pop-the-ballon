'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
}

export function Input({
  label,
  helperText,
  error,
  className,
  id,
  value,
  onChange,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const isFilled = typeof value === 'string' ? value.length > 0 : false;
  const isFloating = focused || isFilled;

  return (
    <div className="w-full">
      <div className="relative">
        <label
          htmlFor={inputId}
          className={cn(
            'absolute left-4 pointer-events-none transition-all duration-200 font-display',
            isFloating
              ? 'top-2 text-[11px] font-semibold tracking-[0.05em] uppercase'
              : 'top-1/2 -translate-y-1/2 text-[15px] font-medium',
            focused ? 'text-accent' : 'text-t3'
          )}
        >
          {label}
        </label>
        <input
          id={inputId}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            'bg-bg-elevated rounded-input text-t1 font-display font-medium text-[15px]',
            'px-4 pt-6 pb-2.5 w-full outline-none transition-all duration-200',
            'placeholder:text-transparent',
            error
              ? 'border border-danger/50 focus:border-danger focus:shadow-[0_0_0_3px_rgba(255,41,82,0.10)]'
              : 'border border-border focus:border-accent/50 focus:shadow-[0_0_0_3px_rgba(255,41,82,0.08)]',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-[13px] font-display text-danger">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-[13px] font-display text-t3">{helperText}</p>
      )}
    </div>
  );
}
