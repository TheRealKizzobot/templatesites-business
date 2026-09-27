export default function Contact() {
  return (
    <section id="contact" className="section bg-bg-dark py-20 sm:py-24" aria-labelledby="contact-title">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker text-brand-light">Get in Touch</p>
          <h2
            id="contact-title"
            className="section-title mt-2 text-white"
          >
            Have a project in mind?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Tell me about what you need — a template adaptation, a custom build, or just some code
            review. I reply within 24 hours.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:connect@dkservers.space"
              className="btn btn-brand text-base px-8"
            >
              Email Me
            </a>
            <a
              href="https://github.com/TheRealKizzobot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/20 bg-white/5 text-base px-8 text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
            >
              View on GitHub
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </span>
            <span className="h-4 w-px bg-white/10" />
            <a
              href="mailto:connect@dkservers.space"
              className="flex items-center gap-2 transition-colors hover:text-white/70"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="currentColor">
                <path d="M1 2.5C1 1.67 1.67 1 2.5 1h11C14.33 1 15 1.67 15 2.5v11c0 .83-.67 1.5-1.5 1.5h-11C1.67 15 1 14.33 1 13.5v-11zM2.5 2c-.28 0-.5.22-.5.5v.29l5.5 3.8 5.5-3.8V2.5c0-.28-.22-.5-.5-.5h-11zm11.25 2.05L8 8.3l-5.75-4.25-.02.01-.23.17v6.67c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5v-6.67l-.23-.17-.25-.18z" />
              </svg>
              connect@dkservers.space
            </a>
            <span className="h-4 w-px bg-white/10" />
            <span>Raleigh, NC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
