import Link from 'next/link';
import { formatCents } from '@/lib/format';
import type { Product } from '@/lib/store';
import Stars from '@/components/site/stars';

export default function ProductCard({ product }: { product: Product }) {
  const out = product.stock <= 0;
  return (
    <article className="card product-card-hover group flex flex-col overflow-hidden">
      <Link href={`/product/${product.id}`} className="block bg-bg-secondary" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04] bg-bg-secondary"
          />
          {out && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-800/85 px-3 py-1 text-xs font-semibold text-white">
              Out of stock
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">{product.category}</span>
          <Stars rating={product.rating} size="sm" />
        </div>
        <Link href={`/product/${product.id}`} className="font-display text-xl font-semibold line-clamp-2 text-text-primary hover:text-brand-600">
          {product.name}
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">{product.description.split('\n\n')[0]}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-brand-500">{formatCents(product.price_cents)}</p>
          <Link
            href={`/product/${product.id}`}
            aria-label={`View details for ${product.name}`}
            className="btn btn-secondary btn-sm"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}