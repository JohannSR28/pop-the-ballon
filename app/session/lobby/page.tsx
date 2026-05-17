import { Suspense } from 'react';
import { LobbyView } from './LobbyView';

function LobbyFallback() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <span className="w-5 h-5 rounded-full border-2 border-border-strong border-t-accent animate-spin" />
    </div>
  );
}

export default function LobbyPage() {
  return (
    <Suspense fallback={<LobbyFallback />}>
      <LobbyView />
    </Suspense>
  );
}
