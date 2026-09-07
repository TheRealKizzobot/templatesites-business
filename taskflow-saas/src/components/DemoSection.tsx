import TaskWidget from '@/components/TaskWidget';

export default function DemoSection() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="bg-bg-primary py-3xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Live demo
          </p>
          <h2
            id="demo-title"
            className="mt-sm font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Go on, try it live
          </h2>
          <p className="mt-md text-md text-text-secondary">
            This is the real widget. Add, complete, and delete tasks — your list is saved in
            this browser, no account needed.
          </p>
        </div>

        <div className="mx-auto mt-3xl max-w-xl">
          <TaskWidget />
        </div>

        <p className="mt-lg text-center text-sm text-text-secondary">
          Tasks persist in your browser with localStorage. Refresh and they&apos;re still here.
        </p>
      </div>
    </section>
  );
}