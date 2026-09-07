import Link from 'next/link';
import ProductCard from '@/components/site/product-card';
import { getFeaturedProducts } from '@/lib/store';

export const metadata = {
  title: 'Home',
  description:
    'Furniture, lighting, textiles, tableware and decor for slower, warmer homes. Free shipping on orders over $100.',
};

export default function HomePage() {
  const featured = getFeaturedProducts(4);

  return (
    <main id="main">
      {/* Hero */}
      <section className="bg-brand-800 text-brand-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-300">
              Northlight Goods · Home goods, carefully made
            </p>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Shop our collection.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-brand-100">
              Furniture, lighting, textiles, tableware and decor for slower, warmer homes —
              every piece chosen to outlast trends and built to be lived with.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn bg-brand-50 text-brand-900 hover:bg-white">
                Browse products
              </Link>
              <Link
                href="#featured"
                className="btn border border-brand-500 text-brand-100 hover:bg-brand-700"
              >
                View featured
              </Link>
            </div>
          </div>
          <div className="hidden lg:block" aria-hidden="true">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/products/chair.svg"
                alt=""
                width={400}
                height={400}
                className="rounded-xl shadow-lift"
              />
              <img
                src="/images/products/lamp.svg"
                alt=""
                width={400}
                height={400}
                className="mt-8 rounded-xl shadow-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-border bg-bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              About the collection
            </p>
            <h2 className="mt-3 text-3xl">Made to be lived with</h2>
          </div>
          <div className="space-y-4 text-text-secondary">
            <p className="leading-relaxed">
              We started Northlight Goods with a simple idea: the things in your home should
              earn their place. That means honest materials, considered proportions, and
              finishes that get better with use instead of wearing out.
            </p>
            <p className="leading-relaxed">
              Every piece in the collection is chosen for how it settles into daily life —
              a mug that fits a full four-finger grip, a throw heavy enough to count, a lamp
              that makes a room feel finished. Furniture, lighting, textiles, tableware and
              decor that work together, quietly.
            </p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Featured
            </p>
            <h2 className="mt-3 text-3xl">Bestsellers &amp; staff picks</h2>
          </div>
          <Link href="/shop" className="btn btn-secondary">
            View all products
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}