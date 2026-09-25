import { test, expect } from '@playwright/test';

test.describe('Portfolio - https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    expect(errors.length).toBe(0);
  });

  test('privacy policy accessible', async ({ page }) => {
    await page.goto('https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app/privacy', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Privacy Policy');
  });

  test('terms of service accessible', async ({ page }) => {
    await page.goto('https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app/terms', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('cookie policy accessible', async ({ page }) => {
    await page.goto('https://moshine-portfolio-93cya41yr-therealkizzobots-projects.vercel.app/cookies', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Cookie Policy');
  });
});

test.describe('Restaurant - https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    expect(errors.length).toBe(0);
  });

  test('privacy policy accessible', async ({ page }) => {
    await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app/privacy', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Privacy Policy');
  });

  test('terms of service accessible', async ({ page }) => {
    await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app/terms', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('cookie policy accessible', async ({ page }) => {
    await page.goto('https://restaurant-site-i0ohcnv5o-therealkizzobots-projects.vercel.app/cookies', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Cookie Policy');
  });
});

test.describe('TaskFlow - https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    expect(errors.length).toBe(0);
  });

  test('privacy policy accessible', async ({ page }) => {
    await page.goto('https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app/privacy', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Privacy Policy');
  });

  test('terms of service accessible', async ({ page }) => {
    await page.goto('https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app/terms', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('cookie policy accessible', async ({ page }) => {
    await page.goto('https://taskflow-saas-iv2o8mnxg-therealkizzobots-projects.vercel.app/cookies', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Cookie Policy');
  });
});

test.describe('Booking - https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    expect(errors.length).toBe(0);
  });

  test('privacy policy accessible', async ({ page }) => {
    await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app/privacy', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Privacy Policy');
  });

  test('terms of service accessible', async ({ page }) => {
    await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app/terms', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('cookie policy accessible', async ({ page }) => {
    await page.goto('https://booking-system-qy0lo5jiy-therealkizzobots-projects.vercel.app/cookies', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Cookie Policy');
  });
});

test.describe('Shop - https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    expect(errors.length).toBe(0);
  });

  test('privacy policy accessible', async ({ page }) => {
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/privacy', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Privacy Policy');
  });

  test('terms of service accessible', async ({ page }) => {
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/terms', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('cookie policy accessible', async ({ page }) => {
    await page.goto('https://ecommerce-store-fpm2jmhl5-therealkizzobots-projects.vercel.app/cookies', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Cookie Policy');
  });
});

test.describe('Analytics - https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app', { waitUntil: 'networkidle' });
    expect(errors.length).toBe(0);
  });

  test('privacy policy accessible', async ({ page }) => {
    await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app/privacy', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Privacy Policy');
  });

  test('terms of service accessible', async ({ page }) => {
    await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app/terms', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('cookie policy accessible', async ({ page }) => {
    await page.goto('https://analytics-dashboard-l8d23xnk8-therealkizzobots-projects.vercel.app/cookies', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Cookie Policy');
  });
});