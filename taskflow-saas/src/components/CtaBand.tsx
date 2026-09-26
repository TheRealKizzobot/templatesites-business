'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, CheckCircleIcon, LogoMark } from '@/components/icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function CtaBand() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const reduce = useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setDone(true);
  };

  const fadeIn = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section id="cta" aria-labelledby="cta-title" className="bg-bg-primary pb-3xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 px-md py-3xl text-center shadow-lift sm:px-lg">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-brand-500/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-brand-400/30 blur-3xl"
          />

          <motion.div
            {...fadeIn}
            transition={{ duration: reduce ? 0.01 : 0.4, ease: 'easeOut' }}
            className="relative"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-white/15 text-white">
              <LogoMark className="size-6 text-white" />
            </span>
            <h2
              id="cta-title"
              className="mt-lg font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Ready to feel the flow?
            </h2>
            <p className="mx-auto mt-md max-w-md text-md text-brand-100">
              Join 40,000+ people who end each day knowing what got done. Get a 14-day Pro
              trial — no credit card required.
            </p>

            {done ? (
              <div
                className="mx-auto mt-xl flex max-w-md items-center justify-center gap-sm rounded-full bg-white/15 px-lg py-md text-white"
                role="status"
                aria-live="polite"
              >
                <CheckCircleIcon className="size-5 text-brand-100" />
                <p className="text-sm font-medium">
                  You&apos;re in! Watch your inbox for your magic link.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mx-auto mt-xl flex max-w-md flex-col gap-sm sm:flex-row"
              >
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (invalid) setInvalid(false);
                  }}
                  placeholder="you@company.com"
                  aria-invalid={invalid}
                  aria-describedby={invalid ? 'cta-email-error' : undefined}
                  className={`h-11 min-w-0 flex-1 rounded-full bg-bg-primary/95 px-lg text-md text-text-primary placeholder:text-text-secondary/60 focus:bg-bg-primary ${
                    invalid ? 'ring-2 ring-white' : ''
                  }`}
                />
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-sm rounded-full bg-white px-lg text-sm font-semibold text-brand-700 shadow-soft transition-colors hover:bg-brand-100"
                >
                  Get started
                  <ArrowRightIcon className="size-4" />
                </button>
              </form>
            )}

            <p
              id="cta-email-error"
              role="alert"
              className={
                invalid
                  ? 'mt-sm text-sm font-medium text-white'
                  : 'sr-only'
              }
            >
              Please enter a valid email address.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}