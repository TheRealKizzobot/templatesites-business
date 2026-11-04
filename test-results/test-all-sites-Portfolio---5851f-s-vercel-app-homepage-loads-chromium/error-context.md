# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test-all-sites.spec.ts >> Portfolio - https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app >> homepage loads
- Location: test-all-sites.spec.ts:15:9

# Error details

```
Error: expect(page).not.toHaveTitle(expected) failed

Expected pattern: not /error|404|500/i
Received string: "404: NOT_FOUND"
Timeout: 5000ms

Call log:
  - Expect "not toHaveTitle" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "404: NOT_FOUND"

```

```yaml
- main:
  - region "This page doesn’t exist":
    - heading "This page doesn’t exist" [level=1]
    - paragraph: It may have been moved, removed, or never existed.
    - paragraph: 404 DEPLOYMENT_NOT_FOUND
    - paragraph: iad1::v7m5t-1793763934328-42a416982e44
- link "View DEPLOYMENT_NOT_FOUND documentation":
  - /url: https://vercel.com/docs/errors/deployment_not_found
  - text: View Documentation
- button "Copy DEPLOYMENT_NOT_FOUND debugging instructions to clipboard": Copy Debug Prompt
- status
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const sites = [
  4   |   { name: 'Portfolio', url: 'https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app' },
  5   |   { name: 'Restaurant', url: 'https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app' },
  6   |   { name: 'TaskFlow', url: 'https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app' },
  7   |   { name: 'Booking', url: 'https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app' },
  8   |   { name: 'Shop', url: 'https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app' },
  9   |   { name: 'Analytics', url: 'https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app' },
  10  | ];
  11  | 
  12  | // Helper function to create tests for each site
  13  | function createSiteTests(site: { name: string; url: string }) {
  14  |   test.describe(`${site.name} - ${site.url}`, () => {
  15  |     test('homepage loads', async ({ page }) => {
  16  |       await page.goto(site.url, { waitUntil: 'networkidle' });
> 17  |       await expect(page).not.toHaveTitle(/error|404|500/i);
      |                              ^ Error: expect(page).not.toHaveTitle(expected) failed
  18  |     });
  19  | 
  20  |     test('no console errors', async ({ page }) => {
  21  |       const errors: string[] = [];
  22  |       page.on('console', msg => {
  23  |         if (msg.type() === 'error') {
  24  |           errors.push(msg.text());
  25  |         }
  26  |       });
  27  |       await page.goto(site.url, { waitUntil: 'networkidle' });
  28  |       expect(errors.length).toBe(0);
  29  |     });
  30  | 
  31  |     test('privacy policy accessible', async ({ page }) => {
  32  |       await page.goto(`${site.url}/privacy`, { waitUntil: 'networkidle' });
  33  |       await expect(page.locator('h1')).toContainText('Privacy Policy');
  34  |     });
  35  | 
  36  |     test('terms of service accessible', async ({ page }) => {
  37  |       await page.goto(`${site.url}/terms`, { waitUntil: 'networkidle' });
  38  |       await expect(page.locator('h1')).toContainText('Terms of Service');
  39  |     });
  40  | 
  41  |     test('cookie policy accessible', async ({ page }) => {
  42  |       await page.goto(`${site.url}/cookies`, { waitUntil: 'networkidle' });
  43  |       await expect(page.locator('h1')).toContainText('Cookie Policy');
  44  |     });
  45  |   });
  46  | }
  47  | 
  48  | // Create tests for each site
  49  | sites.forEach(createSiteTests);
  50  | 
  51  | // Site-specific tests
  52  | test.describe('E-commerce Site', () => {
  53  |   test('product catalog loads', async ({ page }) => {
  54  |     await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/shop', { waitUntil: 'networkidle' });
  55  |     await expect(page.locator('.product-card, [data-testid="product"]')).toHaveCount({ min: 1 });
  56  |   });
  57  | 
  58  |   test('cart functionality', async ({ page }) => {
  59  |     await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/shop', { waitUntil: 'networkidle' });
  60  |     await page.click('[data-testid="add-to-cart"]:first-child');
  61  |     await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/cart');
  62  |     await expect(page.locator('[data-testid="cart-item"]')).toHaveCount({ min: 1 });
  63  |   });
  64  | 
  65  |   test('checkout flow', async ({ page }) => {
  66  |     await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/cart', { waitUntil: 'networkidle' });
  67  |     await page.click('[data-testid="checkout"]');
  68  |     await expect(page).toHaveURL(/checkout/);
  69  |   });
  70  | });
  71  | 
  72  | test.describe('Booking System', () => {
  73  |   test('booking form submits', async ({ page }) => {
  74  |     await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
  75  |     await page.fill('[name="name"]', 'Test User');
  76  |     await page.fill('[name="email"]', 'test@example.com');
  77  |     await page.fill('[name="phone"]', '555-1234');
  78  |     await page.selectOption('[name="partySize"]', '2');
  79  |     await page.click('[type="submit"]');
  80  |     await expect(page.locator('text=confirmation, text=success, text=booked')).toBeVisible({ timeout: 10000 });
  81  |   });
  82  | 
  83  |   test('admin panel accessible', async ({ page }) => {
  84  |     await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app/admin', { waitUntil: 'networkidle' });
  85  |     await expect(page.locator('h1, h2')).toContainText(/admin|booking/i);
  86  |   });
  87  | });
  88  | 
  89  | test.describe('Analytics Dashboard', () => {
  90  |   test('dashboard loads with metrics', async ({ page }) => {
  91  |     await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
  92  |     await expect(page.locator('[data-testid="metric-card"], .metric-card')).toHaveCount({ min: 1 });
  93  |   });
  94  | 
  95  |   test('real-time updates work', async ({ page }) => {
  96  |     await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app/dashboard', { waitUntil: 'networkidle' });
  97  |     const initialValue = await page.locator('[data-testid="metric-card"]:first-child').textContent();
  98  |     await page.waitForTimeout(5000);
  99  |     const updatedValue = await page.locator('[data-testid="metric-card"]:first-child').textContent();
  100 |     // Values should change with real-time updates
  101 |     // Note: We're not asserting they're different as timing might vary
  102 |   });
  103 | });
  104 | 
  105 | test.describe('TaskFlow SaaS', () => {
  106 |   test('task widget works', async ({ page }) => {
  107 |     await page.goto('https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
  108 |     await page.fill('[data-testid="task-input"]', 'Test task');
  109 |     await page.click('[data-testid="add-task"]');
  110 |     await expect(page.locator('text=Test task')).toBeVisible();
  111 |   });
  112 | });
  113 | 
  114 | test.describe('Restaurant Site', () => {
  115 |   test('gallery lightbox works', async ({ page }) => {
  116 |     await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
  117 |     await page.click('[data-testid="gallery-image"]:first-child');
```