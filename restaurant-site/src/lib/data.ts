export type Dish = {
  name: string;
  description: string;
  price: string;
  image: string;
  alt: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const STATS = [
  { value: 'Est. 2012', label: 'neighborhood favorite' },
  { value: 'James Beard', label: 'semifinalist, 2023' },
  { value: '48 Seats', label: 'intimate wood-fire room' },
];

export const DISHES: Dish[] = [
  {
    name: 'Ember-Crusted Ribeye',
    description:
      'Slow-roasted over oak coals, brown butter jus, charred scallion and smoked salt.',
    price: '$48',
    image: '/images/dish-1.svg',
    alt: 'Ember-crusted ribeye steak on a dark stoneware plate with jus',
  },
  {
    name: 'Wood-Fired Salmon',
    description:
      'Cedar-planked salmon, blistered cherry tomato, fennel and lemon-herb oil.',
    price: '$34',
    image: '/images/dish-2.svg',
    alt: 'Wood-fired salmon fillet with blistered tomatoes and herbs',
  },
  {
    name: 'Burrata & Heirloom Tomato',
    description:
      'Creamy burrata, late-summer heirloom tomatoes, basil oil and grilled sourdough.',
    price: '$19',
    image: '/images/dish-3.svg',
    alt: 'Burrata and heirloom tomato salad drizzled with basil oil',
  },
  {
    name: 'Mushroom Tagliatelle',
    description:
      'Hand-cut tagliatelle, chanterelle and porcini ragout, aged parmesan, thyme.',
    price: '$24',
    image: '/images/dish-4.svg',
    alt: 'Hand-cut tagliatelle with a mushroom ragout and parmesan',
  },
  {
    name: "Duck à l'Orange",
    description:
      'Crispy-skin duck breast, burnt orange glaze, farro and charred radicchio.',
    price: '$42',
    image: '/images/dish-5.svg',
    alt: 'Duck breast glazed with burnt orange sauce on a plate',
  },
  {
    name: 'Miso Crème Brûlée',
    description:
      'White miso crème brûlée, toasted sugar crust, sesame praline and black sesame.',
    price: '$14',
    image: '/images/dish-6.svg',
    alt: 'Miso crème brûlée in a dark ramekin with a caramelized top',
  },
];

export const GALLERY: GalleryImage[] = [
  {
    src: '/images/gallery-1.svg',
    alt: 'Warm dining room with exposed brick and glowing pendant lamps',
    caption: 'The dining room at dusk',
  },
  {
    src: '/images/gallery-2.svg',
    alt: 'Open kitchen flames rising from the wood-fired grill',
    caption: 'Live fire, all night',
  },
  {
    src: '/images/gallery-3.svg',
    alt: 'Overhead view of a rustic table set with small plates',
    caption: 'A table for two',
  },
  {
    src: '/images/gallery-4.svg',
    alt: 'Sourdough bread and whipped butter on a dark board',
    caption: 'Bread service',
  },
  {
    src: '/images/gallery-5.svg',
    alt: 'Bartender pouring a cocktail at the amber-lit bar',
    caption: 'The bar program',
  },
  {
    src: '/images/gallery-6.svg',
    alt: 'Cocoa-dusted dessert plated on dark ceramics',
    caption: 'Something sweet',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'The ribeye was the best piece of meat I have eaten in years — genuinely wood-fired, perfectly rested, unforgettable.',
    name: 'Mara Jenkins',
    role: 'Food columnist, Portland Eats',
    rating: 5,
  },
  {
    quote:
      'Warm, unhurried, and beautifully lit. The burrata course alone is worth the reservation.',
    name: 'Devon Patel',
    role: 'Regular since 2019',
    rating: 5,
  },
  {
    quote:
      'We booked for an anniversary and the staff made it feel like a private dinner. The kitchen is doing real craft.',
    name: 'Lucía Herrera',
    role: 'Anniversary dinner, June',
    rating: 5,
  },
];

export const HOURS = [
  { days: 'Monday — Thursday', hours: '5:00 PM – 10:00 PM' },
  { days: 'Friday — Saturday', hours: '5:00 PM – 11:00 PM' },
  { days: 'Sunday', hours: '4:00 PM – 9:00 PM' },
];

export const RESTAURANT = {
  name: 'Ember & Wood',
  address: '412 Firelight Avenue, Portland, OR 97209',
  phone: '(503) 555-0142',
  phoneHref: 'tel:+15035550142',
  email: 'connect@dkservers.space',
};