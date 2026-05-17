'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface OnboardingShellProps {
  currentStep: 1 | 2 | 3;
  totalSteps?: number;
  onBack?: () => void;
  children: React.ReactNode;
}

export function OnboardingShell({
  currentStep,
  totalSteps = 3,
  onBack,
  children,
}: OnboardingShellProps) {
  const router = useRouter();

  function handleBack() {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* Subtle glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[640px] h-[400px] rounded-full opacity-[0.06] bg-accent blur-[120px]" />

      {/* Header */}
      <header className="relative z-10 flex items-center h-14 px-4 sm:px-6 border-b border-border">
        <button
          onClick={handleBack}
          aria-label="Retour"
          className="flex items-center gap-1.5 text-t2 hover:text-t1 transition-colors font-display font-medium text-sm"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span>Retour</span>
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
          <span className="font-serif italic text-[19px] text-t1 tracking-[-0.01em]">
            Poppit
          </span>
          <span className="text-[14px] leading-none" aria-hidden="true">🎈</span>
        </div>

        {/* Step indicator */}
        <div className="ml-auto font-display text-[13px] text-t3 font-medium tracking-wide">
          {currentStep} / {totalSteps}
        </div>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 h-[2px] bg-border w-full">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Content */}
      <main className="relative z-10 flex-1 flex items-start justify-center p-6 pt-10 sm:pt-16">
        <div className="w-full max-w-[480px]">
          {children}
        </div>
      </main>
    </div>
  );
}
