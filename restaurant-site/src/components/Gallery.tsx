'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY } from '@/lib/data';
import type { GalleryImage } from '@/lib/data';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = activeIndex !== null;

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? i : (i + 1) % GALLERY.length));
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a, [tabindex]',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, goPrev, goNext, close]);

  const active: GalleryImage | null = open ? GALLERY[activeIndex] : null;

  return (
    <section
      id="gallery"
      className="section bg-bg-primary"
      aria-labelledby="gallery-title"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="section-kicker">Snapshots</p>
          <h2 id="gallery-title" className="section-title">
            Inside the room
          </h2>
          <p className="section-lede">
            Warm corners, live fire and late-night light — a look around the
            restaurant. Select a photo to view it closer.
          </p>
        </div>

        <ul className="mt-xl grid grid-cols-2 gap-md sm:grid-cols-3 sm:gap-lg">
          {GALLERY.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group block w-full overflow-hidden rounded-xl shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift-lg"
                aria-label={`Enlarge: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt=""
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/90 p-md backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Image lightbox: ${active.alt}`}
          onClick={close}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="relative max-h-full w-full max-w-3xl rounded-xl bg-bg-primary p-lg outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              width={800}
              height={800}
              className="mx-auto max-h-[70vh] w-auto rounded-md object-contain"
            />
            <p className="mt-md text-center text-sm text-text-secondary">
              {active.caption} — {activeIndex + 1} of {GALLERY.length}
            </p>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-sm top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary text-text-primary transition-colors hover:bg-brand-200"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-sm top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg-secondary text-text-primary transition-colors hover:bg-brand-200"
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={close}
              className="absolute -top-sm right-sm flex h-11 w-11 items-center justify-center rounded-full bg-bg-secondary text-text-primary transition-colors hover:bg-brand-200"
              aria-label="Close lightbox"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path
                  d="M18 6 6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}