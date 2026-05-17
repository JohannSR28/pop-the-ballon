import { BalloonIcon } from '../ui/BalloonIcon';

const BALLOONS = [
  { size: 52, color: 'var(--accent-primary)', top: '8%',  left: '5%',  delay: '0s',    opacity: 0.5 },
  { size: 32, color: 'var(--accent-warm)',    top: '15%', left: '88%', delay: '1.2s',  opacity: 0.45 },
  { size: 44, color: 'var(--accent-glow)',    top: '35%', left: '92%', delay: '2.1s',  opacity: 0.4 },
  { size: 28, color: 'var(--accent-primary)', top: '60%', left: '3%',  delay: '0.7s',  opacity: 0.35 },
  { size: 60, color: 'var(--accent-warm)',    top: '70%', left: '85%', delay: '3.4s',  opacity: 0.5 },
  { size: 36, color: 'var(--accent-glow)',    top: '80%', left: '12%', delay: '1.8s',  opacity: 0.4 },
  { size: 24, color: 'var(--accent-primary)', top: '25%', left: '78%', delay: '2.9s',  opacity: 0.3 },
  { size: 48, color: 'var(--accent-warm)',    top: '55%', left: '55%', delay: '0.4s',  opacity: 0.25 },
  { size: 30, color: 'var(--accent-glow)',    top: '5%',  left: '55%', delay: '3.8s',  opacity: 0.35 },
  { size: 42, color: 'var(--accent-primary)', top: '88%', left: '65%', delay: '1.5s',  opacity: 0.4 },
];

export function FloatingBalloons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: b.top,
            left: b.left,
            opacity: b.opacity,
            animationDelay: b.delay,
          }}
        >
          <BalloonIcon size={b.size} color={b.color} animate />
        </div>
      ))}
    </div>
  );
}
