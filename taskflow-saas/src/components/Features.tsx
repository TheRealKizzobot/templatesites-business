import {
  BoltIcon,
  ChartIcon,
  FocusIcon,
  InboxIcon,
  KeyboardIcon,
  LockIcon,
} from '@/components/icons';

const FEATURES = [
  {
    title: 'Capture in seconds',
    body: 'A quiet input that never fights you. Type a task, press Enter, move on — the braindump stays in the box.',
    icon: InboxIcon,
  },
  {
    title: 'Focus mode',
    body: 'Filter to today with one tap. The noise disappears and your most important work floats to the top.',
    icon: FocusIcon,
  },
  {
    title: 'Progress that moves',
    body: 'Watch a live counter turn “done” from a number into a feeling. Small wins compound into momentum.',
    icon: ChartIcon,
  },
  {
    title: 'Lightning fast',
    body: 'Instant add, instant edit, instant feel. No loaders, no waiting, no ceremony between you and done.',
    icon: BoltIcon,
  },
  {
    title: 'Keyboard-first',
    body: 'Build muscle memory with shortcuts for everything. Your hands never have to leave the keyboard.',
    icon: KeyboardIcon,
  },
  {
    title: 'Private by design',
    body: 'No accounts, no tracking, no cloud hostage. Your list lives in your browser and nowhere else.',
    icon: LockIcon,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="bg-bg-secondary py-3xl"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Features
          </p>
          <h2
            id="features-title"
            className="mt-sm font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="mt-md text-md text-text-secondary">
            TaskFlow stays out of your way so the work speaks for itself.
          </p>
        </div>

        <ul className="mt-3xl grid gap-md sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <li key={feature.title}>
              <article className="group h-full rounded-xl bg-bg-primary p-xl shadow-soft ring-1 ring-border/60 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lift">
                <span className="grid size-11 place-items-center rounded-full bg-brand-100 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <feature.icon className="size-5" />
                </span>
                <h3 className="mt-lg font-display text-xl font-semibold tracking-tight text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-sm text-md text-text-secondary">{feature.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}