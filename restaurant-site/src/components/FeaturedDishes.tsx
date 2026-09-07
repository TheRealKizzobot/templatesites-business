import { DISHES } from '@/lib/data';
import type { Dish } from '@/lib/data';

function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-bg-primary shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift-lg">
      <div className="overflow-hidden">
        <img
          src={dish.image}
          alt={dish.alt}
          width={600}
          height={480}
          loading="lazy"
          className="aspect-[5/4] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-lg pb-xl pt-md">
        <div className="flex items-baseline justify-between gap-md">
          <h3 className="font-display text-xl text-text-primary">{dish.name}</h3>
          <p className="font-display text-lg text-brand-600">{dish.price}</p>
        </div>
        <p className="mt-sm text-sm leading-relaxed text-text-secondary">
          {dish.description}
        </p>
      </div>
    </article>
  );
}

export default function FeaturedDishes() {
  return (
    <section
      id="menu"
      className="section bg-bg-secondary"
      aria-labelledby="menu-title"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="section-kicker">From the hearth</p>
          <h2 id="menu-title" className="section-title">
            Featured dishes
          </h2>
          <p className="section-lede">
            A few favorites from the current menu, cooked over oak and served in
            small, honest portions.
          </p>
        </div>

        <ul className="mt-xl grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {DISHES.map((dish) => (
            <li key={dish.name}>
              <DishCard dish={dish} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}