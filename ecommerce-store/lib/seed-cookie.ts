import { getProducts, setProducts, type StoredProduct } from './cookie-store';

export async function seedProducts(): Promise<void> {
  const existing = await getProducts();
  if (existing.length > 0) return;
  
  const products: StoredProduct[] = [
    {
      id: 1,
      name: 'Wool Throw Blanket',
      slug: 'wool-throw-blanket',
      description: 'Luxuriously soft merino wool throw, perfect for cozy evenings by the fire.',
      price_cents: 14900,
      category: 'Home',
      image: '/images/products/throw-blanket.svg',
      stock: 25,
      rating: 4.8,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Ceramic Mug Set',
      slug: 'ceramic-mug-set',
      description: 'Handcrafted ceramic mugs with a beautiful matte finish. Set of 4.',
      price_cents: 6800,
      category: 'Kitchen',
      image: '/images/products/mug-set.svg',
      stock: 40,
      rating: 4.9,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      name: 'Leather Wallet',
      slug: 'leather-wallet',
      description: 'Genuine full-grain leather wallet with RFID protection and multiple card slots.',
      price_cents: 8900,
      category: 'Accessories',
      image: '/images/products/leather-wallet.svg',
      stock: 30,
      rating: 4.7,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      name: 'Candle Set',
      slug: 'candle-set',
      description: 'Soy wax candles with natural essential oils. Set of 3 in calming scents.',
      price_cents: 4500,
      category: 'Home',
      image: '/images/products/candle-set.svg',
      stock: 60,
      rating: 4.6,
      created_at: new Date().toISOString(),
    },
    {
      id: 5,
      name: 'Bamboo Cutting Board',
      slug: 'bamboo-cutting-board',
      description: 'Sustainable bamboo cutting board with juice groove and built-in handle.',
      price_cents: 5200,
      category: 'Kitchen',
      image: '/images/products/cutting-board.svg',
      stock: 35,
      rating: 4.8,
      created_at: new Date().toISOString(),
    },
  ];
  
  await setProducts(products);
}
