import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'ADMIN_TOKEN';
export const DEFAULT_ADMIN_PASSWORD = 'admin123';
export const SESSION_MAX_AGE = 60 * 60 * 8;

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

function sessionToken(): string {
  return createHmac('sha256', adminPassword())
    .update('ember-and-wood:admin-session:v1')
    .digest('hex');
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  return safeStrEqual(token, sessionToken());
}

export function isAdminRequest(req: { cookies: { get: (name: string) => { value?: string } | undefined } }): boolean {
  return verifyAdminToken(req.cookies.get(ADMIN_COOKIE)?.value);
}

export function makeAdminToken(): string {
  return sessionToken();
}

export function safeStrEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}