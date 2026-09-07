/**
 * Client-safe catalog constants (NO node imports).
 * Mirrors the server's PRODUCT_IMAGES / categories — imported by client pages
 * (shop filters, product gallery) and re-exported from lib/store.ts so server
 * validation and the browser agree on what images/categories exist.
 */

export const PRODUCT_IMAGES = [
  '/images/products/chair.svg',
  '/images/products/sofa.svg',
  '/images/products/sideboard.svg',
  '/images/products/lamp.svg',
  '/images/products/candle.svg',
  '/images/products/textile.svg',
  '/images/products/cup.svg',
  '/images/products/bowl.svg',
  '/images/products/vase.svg',
  '/images/products/planter.svg',
  '/images/products/floral.svg',
];

export const CATEGORIES = ['Furniture', 'Lighting', 'Textiles', 'Tableware', 'Decor'];

export const CATEGORY_IMAGES: Record<string, string[]> = {
  Furniture: ['/images/products/chair.svg', '/images/products/sofa.svg', '/images/products/sideboard.svg'],
  Lighting: ['/images/products/lamp.svg', '/images/products/candle.svg'],
  Textiles: ['/images/products/textile.svg'],
  Tableware: ['/images/products/cup.svg', '/images/products/bowl.svg'],
  Decor: ['/images/products/vase.svg', '/images/products/planter.svg', '/images/products/floral.svg'],
};

/** Main image + up to 3 more images from the same category for the detail gallery. */
export function galleryImages(image: string, category: string): string[] {
  const candidates = CATEGORY_IMAGES[category] ?? [];
  const out: string[] = [image];
  for (const img of candidates) {
    if (img !== image && out.length < 4) out.push(img);
  }
  return out;
}