'use client';

import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Accessible confirmation dialog built on the native <dialog> element
 * (focus trap + Escape handling come for free).
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onCancel();
      }}
      className="m-auto w-[92vw] max-w-md rounded-xl border border-border bg-white p-6 shadow-lift backdrop:bg-brand-900/40"
      aria-labelledby="confirm-title"
    >
      <h2 id="confirm-title" className="text-xl font-semibold text-text-primary">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{message}</p>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button type="button" className="btn btn-secondary" onClick={onCancel} autoFocus>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}