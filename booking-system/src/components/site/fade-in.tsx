'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Fades/slides content up when it enters the viewport.
 * - SSR / no-JS: renders fully visible (fallback).
 * - prefers-reduced-motion: stays visible, no animation.
 * - Otherwise unhides once IntersectionObserver fires.
 */
export default function FadeIn({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'visible'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setState('visible');
      return;
    }
    setState('hidden');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setState('visible');
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = state === 'hidden';

  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-700 ease-out${
        hidden ? ' translate-y-4 opacity-0' : ' translate-y-0 opacity-100'
      }`}
    >
      {children}
    </div>
  );
}