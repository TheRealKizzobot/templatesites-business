'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORIES, PRODUCT_IMAGES } from '@/lib/catalog';
import { formatCents } from '@/lib/format';
import type { Product } from '@/lib/store';
import ConfirmDialog from '@/components/admin/confirm-dialog';

interface ProductFormState {
  name: string;
  price: string; // dollars, e.g. "49.00"
  category: string;
  stock: string;
  rating: string;
  image: string;
  description: string;
}

const EMPTY_FORM: ProductFormState = {
  name: '',
  price: '',
  category: CATEGORIES[0],
  stock: '10',
  rating: '4.5',
  image: PRODUCT_IMAGES[0],
  description: '',
};

const ERROR_KEYS = ['name', 'price', 'stock', 'rating', 'description'] as const;
type ErrorKey = (typeof ERROR_KEYS)[number];
type FormErrors = Partial<Record<ErrorKey, string>>;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const load = useCallback(() => {
    fetch('/api/products?pageSize=48')
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) setProducts(json.data.items as Product[]);
        else setError(json.error ?? 'Failed to load products.');
      })
      .catch(() => setError('Could not load products.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Keep the native dialog in sync with formOpen.  We don't rely on the
  // <dialog> close event here — the dialog is fully controlled.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (formOpen && !dialog.open) dialog.showModal();
    if (!formOpen && dialog.open) dialog.close();
  }, [formOpen]);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setActionError(null);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: (product.price_cents / 100).toFixed(2),
      category: product.category,
      stock: String(product.stock),
      rating: String(product.rating),
      image: product.image,
      description: product.description,
    });
    setFormErrors({});
    setActionError(null);
    setFormOpen(true);
  };

  const setField = (key: keyof ProductFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if ((ERROR_KEYS as readonly string[]).includes(key)) {
      const errKey = key as ErrorKey;
      setFormErrors((prev) => {
        if (!prev[errKey]) return prev;
        const next = { ...prev };
        delete next[errKey];
        return next;
      });
    }
  };

  const validate = (): FormErrors => {
    const errors: FormErrors = {};
    if (form.name.trim().length < 2) errors.name = 'Please enter a product name.';
    const priceNum = Number(form.price);
    if (!Number.isFinite(priceNum) || priceNum <= 0) errors.price = 'Please enter a valid price.';
    const stockNum = Number(form.stock);
    if (!Number.isInteger(stockNum) || stockNum < 0) errors.stock = 'Stock must be a whole number ≥ 0.';
    const ratingNum = Number(form.rating);
    if (!Number.isFinite(ratingNum) || ratingNum < 0 || ratingNum > 5) errors.rating = 'Rating must be between 0 and 5.';
    if (form.description.trim().length < 10) errors.description = 'Please add a description (at least 10 characters).';
    return errors;
  };

  const handleSave = async () => {
    if (saving) return;
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);
    setActionError(null);
    const payload = {
      name: form.name.trim(),
      price_cents: Math.round(Number(form.price) * 100),
      category: form.category,
      stock: Number(form.stock),
      rating: Number(form.rating),
      image: form.image,
      description: form.description.trim(),
    };

    try {
      const res = await fetch(editing ? `/api/admin/products/${editing.id}` : '/api/admin/products', {
        method: editing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.ok) {
        setActionError(json.error ?? 'Could not save the product.');
        return;
      }
      setFormOpen(false);
      load();
    } catch {
      setActionError('Network error — the product was not saved.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || busyId) return;
    setBusyId(deleteTarget.id);
    try {
      const res = await fetch(`/api/admin/products/${deleteTarget.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      } else {
        setError(json.error ?? 'Could not delete the product.');
      }
    } catch {
      setError('Network error — the product was not deleted.');
    } finally {
      setBusyId(null);
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">Products</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {products.length} products in the catalog.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          + Add product
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-error/25 bg-error/5 p-4 text-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-text-secondary">Loading products…</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-white shadow-soft">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-bg-secondary text-xs uppercase tracking-wide text-text-secondary">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Product</th>
                <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                <th scope="col" className="px-4 py-3 font-semibold">Price</th>
                <th scope="col" className="px-4 py-3 font-semibold">Stock</th>
                <th scope="col" className="px-4 py-3 font-semibold">Rating</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-brand-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-md bg-bg-secondary object-cover"
                      />
                      <span className="font-medium text-text-primary">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{product.category}</td>
                  <td className="px-4 py-3 font-semibold">{formatCents(product.price_cents)}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock <= 0 ? 'pill bg-error/10 text-error' : 'pill bg-success/10 text-success'}>
                      {product.stock <= 0 ? 'Out of stock' : `${product.stock} in stock`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{product.rating.toFixed(1)} ★</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEdit(product)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        disabled={busyId === product.id}
                        onClick={() => setDeleteTarget(product)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="px-4 py-10 text-center text-text-secondary">No products yet. Add your first one!</p>
          )}
        </div>
      )}

      {/* Add / edit dialog */}
      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          e.preventDefault();
          setFormOpen(false);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setFormOpen(false);
        }}
        className="m-auto w-[94vw] max-w-xl rounded-xl border border-border bg-white p-6 shadow-lift backdrop:bg-brand-900/40"
        aria-labelledby="product-dialog-title"
      >
        <h2 id="product-dialog-title" className="text-xl font-semibold text-text-primary">
          {editing ? `Edit ${editing.name}` : 'Add product'}
        </h2>

        {actionError && (
          <div className="mt-4 rounded-md border border-error/25 bg-error/5 p-3 text-sm text-error" role="alert">
            {actionError}
          </div>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="product-name" className="label">
              Name
            </label>
            <input
              id="product-name"
              className={`field ${formErrors.name ? 'field-error' : ''}`}
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              aria-invalid={Boolean(formErrors.name)}
            />
            {formErrors.name && <span className="mt-1 block text-sm text-error">{formErrors.name}</span>}
          </div>

          <div>
            <label htmlFor="product-price" className="label">
              Price (USD)
            </label>
            <input
              id="product-price"
              inputMode="decimal"
              className={`field ${formErrors.price ? 'field-error' : ''}`}
              value={form.price}
              onChange={(e) => setField('price', e.target.value)}
              placeholder="49.00"
              aria-invalid={Boolean(formErrors.price)}
            />
            {formErrors.price && <span className="mt-1 block text-sm text-error">{formErrors.price}</span>}
          </div>

          <div>
            <label htmlFor="product-category" className="label">
              Category
            </label>
            <select
              id="product-category"
              className="field"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="product-stock" className="label">
              Stock
            </label>
            <input
              id="product-stock"
              inputMode="numeric"
              className={`field ${formErrors.stock ? 'field-error' : ''}`}
              value={form.stock}
              onChange={(e) => setField('stock', e.target.value)}
              aria-invalid={Boolean(formErrors.stock)}
            />
            {formErrors.stock && <span className="mt-1 block text-sm text-error">{formErrors.stock}</span>}
          </div>

          <div>
            <label htmlFor="product-rating" className="label">
              Rating (0–5)
            </label>
            <input
              id="product-rating"
              inputMode="decimal"
              className={`field ${formErrors.rating ? 'field-error' : ''}`}
              value={form.rating}
              onChange={(e) => setField('rating', e.target.value)}
              aria-invalid={Boolean(formErrors.rating)}
            />
            {formErrors.rating && <span className="mt-1 block text-sm text-error">{formErrors.rating}</span>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="product-image" className="label">
              Image
            </label>
            <div className="flex items-center gap-4">
              <img
                src={form.image}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 rounded-lg border border-border bg-bg-secondary object-cover"
              />
              <select
                id="product-image"
                className="field flex-1"
                value={form.image}
                onChange={(e) => setField('image', e.target.value)}
              >
                {PRODUCT_IMAGES.map((img) => (
                  <option key={img} value={img}>
                    {img.replace('/images/products/', '').replace('.svg', '')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="product-description" className="label">
              Description (separate paragraphs with a blank line)
            </label>
            <textarea
              id="product-description"
              rows={5}
              className={`field resize-y ${formErrors.description ? 'field-error' : ''}`}
              value={form.description}
              onChange={(e) => setField('description', e.target.value)}
              aria-invalid={Boolean(formErrors.description)}
            />
            {formErrors.description && (
              <span className="mt-1 block text-sm text-error">{formErrors.description}</span>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFormOpen(false)}
            autoFocus
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Add product'}
          </button>
        </div>
      </dialog>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this product?"
        message={
          deleteTarget
            ? `"${deleteTarget.name}" will be removed from the catalog permanently. This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}