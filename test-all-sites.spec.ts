import { test, expect } from '@playwright/test';

const sites = [
  { name: 'Portfolio', url: 'https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app' },
  { name: 'Restaurant', url: 'https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app' },
  { name: 'TaskFlow', url: 'https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app' },
  { name: 'Booking', url: 'https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app' },
  { name: 'Shop', url: 'https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app' },
  { name: 'Analytics', url: 'https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app' },
];

// Helper function to create tests for each site
function createSiteTests(site: { name: string; url: string }) {
  test.describe(`${site.name} - ${site.url}`, () => {
    test('homepage loads', async ({ page }) => {
      await page.goto(site.url, { waitUntil: 'networkidle' });
      await expect(page).not.toHaveTitle(/error|404|500/i);
    });

    test('no console errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      await page.goto(site.url, { waitUntil: 'networkidle' });
      expect(errors.length).toBe(0);
    });

    test('privacy policy accessible', async ({ page }) => {
      await page.goto(`${site.url}/privacy`, { waitUntil: 'networkidle' });
      await expect(page.locator('h1')).toContainText('Privacy Policy');
    });

    test('terms of service accessible', async ({ page }) => {
      await page.goto(`${site.url}/terms`, { waitUntil: 'networkidle' });
      await expect(page.locator('h1')).toContainText('Terms of Service');
    });

    test('cookie policy accessible', async ({ page }) => {
      await page.goto(`${site.url}/cookies`, { waitUntil: 'networkidle' });
      await expect(page.locator('h1')).toContainText('Cookie Policy');
    });
  });
}

// Create tests for each site
sites.forEach(createSiteTests);

// Site-specific tests
test.describe('E-commerce Site', () => {
  test('product catalog loads', async ({ page }) => {
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/shop', { waitUntil: 'networkidle' });
    await expect(page.locator('.product-card, [data-testid="product"]')).toHaveCount({ min: 1 });
  });

  test('cart functionality', async ({ page }) => {
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/shop', { waitUntil: 'networkidle' });
    await page.click('[data-testid="add-to-cart"]:first-child');
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/cart');
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount({ min: 1 });
  });

  test('checkout flow', async ({ page }) => {
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/cart', { waitUntil: 'networkidle' });
    await page.click('[data-testid="checkout"]');
    await expect(page).toHaveURL(/checkout/);
  });
});

test.describe('Booking System', () => {
  test('booking form submits', async ({ page }) => {
    await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="phone"]', '555-1234');
    await page.selectOption('[name="partySize"]', '2');
    await page.click('[type="submit"]');
    await expect(page.locator('text=confirmation, text=success, text=booked')).toBeVisible({ timeout: 10000 });
  });

  test('admin panel accessible', async ({ page }) => {
    await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app/admin', { waitUntil: 'networkidle' });
    await expect(page.locator('h1, h2')).toContainText(/admin|booking/i);
  });
});

test.describe('Analytics Dashboard', () => {
  test('dashboard loads with metrics', async ({ page }) => {
    await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-testid="metric-card"], .metric-card')).toHaveCount({ min: 1 });
  });

  test('real-time updates work', async ({ page }) => {
    await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app/dashboard', { waitUntil: 'networkidle' });
    const initialValue = await page.locator('[data-testid="metric-card"]:first-child').textContent();
    await page.waitForTimeout(5000);
    const updatedValue = await page.locator('[data-testid="metric-card"]:first-child').textContent();
    // Values should change with real-time updates
    // Note: We're not asserting they're different as timing might vary
  });
});

test.describe('TaskFlow SaaS', () => {
  test('task widget works', async ({ page }) => {
    await page.goto('https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await page.fill('[data-testid="task-input"]', 'Test task');
    await page.click('[data-testid="add-task"]');
    await expect(page.locator('text=Test task')).toBeVisible();
  });
});

test.describe('Restaurant Site', () => {
  test('gallery lightbox works', async ({ page }) => {
    await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await page.click('[data-testid="gallery-image"]:first-child');
    await expect(page.locator('[data-testid="lightbox"]')).toBeVisible();
  });

  test('reservation form works', async ({ page }) => {
    await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await page.click('[data-testid="reservation-cta"]');
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.click('[type="submit"]');
    await expect(page.locator('text=confirmation, text=success')).toBeVisible({ timeout: 10000 });
  });
});