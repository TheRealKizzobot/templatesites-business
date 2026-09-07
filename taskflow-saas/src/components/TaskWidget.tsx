'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckIcon, PlusIcon, TrashIcon } from '@/components/icons';

type Task = {
  id: string;
  text: string;
  done: boolean;
};

const STORAGE_KEY = 'taskflow.tasks.v1';

const STARTER_TASKS: Task[] = [
  { id: 'seed-1', text: 'Outline the onboarding flow', done: false },
  { id: 'seed-2', text: 'Sync notes with the team', done: true },
  { id: 'seed-3', text: 'Book 1:1s for the week', done: false },
];

function uid(): string {
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadTasks(): Task[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const valid = parsed.filter(
      (t): t is Task =>
        typeof t === 'object' &&
        t !== null &&
        typeof (t as Task).id === 'string' &&
        typeof (t as Task).text === 'string' &&
        typeof (t as Task).done === 'boolean',
    );
    return valid;
  } catch {
    return null;
  }
}

export default function TaskWidget() {
  const reduce = useReducedMotion();
  const [tasks, setTasks] = useState<Task[]>(STARTER_TASKS);
  const [input, setInput] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadTasks();
    if (stored !== null) setTasks(stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Storage may be unavailable (private mode / quota) — demo still works in memory.
    }
  }, [tasks, hydrated]);

  const doneCount = tasks.filter((t) => t.done).length;
  const percent = tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  const easeOut = { ease: 'easeOut' as const };

  const entry = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -10, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, x: 32 },
      };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: uid(), text, done: false }]);
    setInput('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const resetDemo = () => {
    setTasks(STARTER_TASKS);
  };

  return (
    <div
      role="region"
      aria-label="Interactive task demo"
      className="rounded-xl bg-bg-primary p-md shadow-lift ring-1 ring-border/70 sm:p-lg"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary">
          Try it live
        </h3>
        <span className="rounded-full bg-brand-100 px-md py-xs text-xs font-medium text-brand-600">
          3 starter tasks included
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-lg flex gap-sm">
        <label htmlFor="task-input" className="sr-only">
          New task
        </label>
        <input
          id="task-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a task, e.g. “Outline onboarding plan”"
          autoComplete="off"
          className="h-11 min-w-0 flex-1 rounded-md border border-border bg-white px-md text-md text-text-primary placeholder:text-text-secondary/60 focus:border-brand-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="inline-flex min-h-11 items-center gap-sm rounded-full bg-brand-600 px-lg text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <PlusIcon className="size-4" />
          <span>Add</span>
        </button>
      </form>

      <div className="mt-lg flex items-center justify-between text-sm">
        <p className="font-medium text-text-primary" aria-live="polite">
          {doneCount} of {tasks.length} done
        </p>
        <p className="text-xs text-text-secondary">{percent}% complete</p>
      </div>

      <div
        role="progressbar"
        aria-label="Task completion"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-sm h-2 overflow-hidden rounded-full bg-brand-100"
      >
        <motion.div
          className="h-full rounded-full bg-brand-600"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={
            reduce ? { duration: 0.01 } : { duration: 0.3, ease: 'easeOut' as const }
          }
        />
      </div>

      {tasks.length === 0 ? (
        <div className="mt-lg rounded-xl border border-dashed border-brand-300 bg-bg-secondary py-3xl text-center">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto size-10 text-brand-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6.5h11M3 12h11M3 17.5h7" />
            <path d="m16.5 13.5 2 2 3.5-3.5" />
          </svg>
          <p className="mt-md font-display text-lg font-semibold text-text-primary">
            All clear!
          </p>
          <p className="mx-auto mt-sm max-w-xs text-sm text-text-secondary">
            You finished every task. Add a new one above or reset the demo.
          </p>
          <button
            type="button"
            onClick={resetDemo}
            className="mt-lg inline-flex min-h-11 items-center rounded-full bg-brand-600 px-lg text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-700"
          >
            Reset with starter tasks
          </button>
        </div>
      ) : (
        <ul className="mt-lg space-y-sm" aria-label="Your tasks">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                layout
                {...entry}
                transition={{
                  ...easeOut,
                  duration: reduce ? 0.01 : 0.2,
                  layout: reduce ? { duration: 0.01 } : { duration: 0.2, ease: 'easeOut' },
                }}
                className="group flex items-center gap-sm rounded-md border border-border/60 bg-white p-xs shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-pressed={task.done}
                  aria-label={
                    task.done
                      ? `Mark "${task.text}" as not done`
                      : `Mark "${task.text}" as done`
                  }
                  className="grid size-11 shrink-0 place-items-center rounded-full text-brand-600 hover:bg-brand-100"
                >
                  <span
                    className={`grid size-6 place-items-center rounded-full border-2 transition-colors ${
                      task.done
                        ? 'border-brand-600 bg-brand-600'
                        : 'border-brand-300 bg-white'
                    }`}
                  >
                    {task.done && <CheckIcon className="size-3.5 text-white" />}
                  </span>
                </button>

                <span
                  className={`min-w-0 flex-1 text-md ${
                    task.done ? 'text-text-secondary line-through' : 'text-text-primary'
                  }`}
                >
                  {task.text}
                </span>

                <button
                  type="button"
                  onClick={() => removeTask(task.id)}
                  aria-label={`Delete "${task.text}"`}
                  className="grid size-11 shrink-0 place-items-center rounded-md text-text-secondary hover:bg-error/10 hover:text-error"
                >
                  <TrashIcon className="size-4" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}