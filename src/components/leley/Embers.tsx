import { useMemo } from "react";

/** Lightweight CSS-only ember particles. Default 14 particles. */
export function Embers({ count = 14, className = "" }: { count?: number; className?: string }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 3 + Math.random() * 5;
        const duration = 4 + Math.random() * 5;
        const delay = -Math.random() * duration;
        const drift = (Math.random() - 0.5) * 80;
        return { i, left, size, duration, delay, drift };
      }),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <span
          key={p.i}
          className="ember"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--ember-x" as any]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}