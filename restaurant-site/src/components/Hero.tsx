export default function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[88svh] overflow-hidden bg-brand-900">
      <img
        src="/images/hero.svg"
        alt=""
        width={1600}
        height={900}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/55 to-brand-900/20"
      />
      <div className="container-page relative flex min-h-[88svh] items-end pb-2xl pt-28 sm:pb-3xl">
        <div className="max-w-2xl">
          <p className="section-kicker text-brand-200">Wood-fired modern American</p>
          <h1 className="mt-md font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Fire, wood &amp; honest ingredients.
          </h1>
          <p className="mt-lg max-w-xl text-lg text-brand-100 sm:text-xl">
            Ember &amp; Wood is a small wood-fired room in Portland where dinner
            is slow, warm and quietly serious. Reserve a table or peek at the
            menu.
          </p>
          <div className="mt-xl flex flex-col gap-md sm:flex-row sm:gap-lg">
            <a href="#reserve" className="btn btn-on-dark">
              Reserve a Table
            </a>
            <a
              href="#menu"
              className="btn border border-brand-300/60 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              View the Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}