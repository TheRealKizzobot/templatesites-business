'use client';

import { motion, useReducedMotion } from 'framer-motion';

const HEADLINE: { text: string; accent?: boolean }[] = [
  { text: 'Your' },
  { text: 'work,' },
  { text: 'finally' },
  { text: 'in' },
  { text: 'flow.', accent: true },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: reduce
      ? { transition: { staggerChildren: 0 } }
      : { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
  };

  const item = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
      }
    : {
        hidden: { opacity: 0, y: '0.4em', rotate: 2 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { duration: 0.45, ease: 'easeOut' as const },
        },
      };

  return (
    <section id="top" aria-label="Hero" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,#f0ece8_0%,transparent_70%)]"
      />

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 text-center sm:px-6 sm:pt-24 lg:px-8">
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0.01 } : { duration: 0.4, ease: 'easeOut' }}
          className="mx-auto inline-flex min-h-11 items-center rounded-full bg-brand-100 px-lg text-sm font-medium text-brand-600"
        >
          Built for calm productivity
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto mt-md max-w-3xl font-display text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl"
        >
          {HEADLINE.map((word) => (
            <motion.span
              key={word.text}
              variants={item}
              className={
                word.accent
                  ? 'inline-block bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text pr-[0.08em] text-transparent'
                  : 'mr-[0.24em] inline-block'
              }
            >
              {word.text}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.45, duration: reduce ? 0.01 : 0.45, ease: 'easeOut' }}
          className="mx-auto mt-xl max-w-xl text-base leading-relaxed text-text-secondary sm:text-md"
        >
          TaskFlow is the simple, private task app that turns scattered to-dos into a focused
          plan. Capture tasks in seconds, watch progress move, and end each day knowing what
          actually got done.
        </motion.p>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.6, duration: reduce ? 0.01 : 0.45, ease: 'easeOut' }}
          className="mt-xl flex flex-col items-center justify-center gap-sm sm:flex-row"
        >
          <a
            href="#demo"
            className="inline-flex min-h-11 w-full items-center justify-center gap-sm rounded-full bg-brand-600 px-lg text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-700 sm:w-auto"
          >
            Try the Demo
          </a>
          <a
            href="#pricing"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border bg-bg-primary px-lg text-sm font-medium text-text-primary transition-colors hover:bg-brand-100 sm:w-auto"
          >
            View Pricing
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduce ? 0 : 0.75,
            duration: reduce ? 0.01 : 0.5,
            ease: 'easeOut',
          }}
          className="relative mx-auto mt-3xl max-w-md"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -top-8 -bottom-8 rounded-full bg-gradient-to-br from-brand-200/70 via-brand-100/60 to-transparent blur-2xl"
          />
          <motion.div
            aria-hidden="true"
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={
              reduce ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative pt-lg"
          >
            <MockWindow />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MockWindow() {
  const fakeTasks = [
    { label: 'Draft weekly report', done: true },
    { label: 'Review onboarding copy', done: false },
    { label: 'Sync metrics dashboard', done: true },
    { label: 'Book 1:1s for the week', done: false },
  ];

  return (
    <div className="rounded-xl bg-bg-primary p-md text-left shadow-lift ring-1 ring-border/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-sm" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-brand-200" />
          <span className="size-2.5 rounded-full bg-brand-300" />
          <span className="size-2.5 rounded-full bg-brand-400" />
        </div>
        <span className="text-xs font-medium text-text-secondary">Today · 2 of 4 done</span>
      </div>

      <div className="mt-md h-2 overflow-hidden rounded-full bg-brand-100">
        <div className="h-full w-1/2 rounded-full bg-brand-600" />
      </div>

      <ul className="mt-lg space-y-sm">
        {fakeTasks.map((task) => (
          <li
            key={task.label}
            className="flex items-center gap-sm rounded-md border border-border/60 bg-bg-primary px-sm py-sm"
          >
            <span
              className={`grid size-5 place-items-center rounded-full border-2 ${
                task.done ? 'border-brand-600 bg-brand-600' : 'border-brand-300 bg-bg-primary'
              }`}
            >
              {task.done && (
                <svg viewBox="0 0 24 24" className="size-3 text-white" fill="none">
                  <path
                    d="M6 12.5 10 16.5 18 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span
              className={`text-sm ${
                task.done ? 'text-text-secondary line-through' : 'text-text-primary'
              }`}
            >
              {task.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}