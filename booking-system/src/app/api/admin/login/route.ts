import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  adminPassword,
  makeAdminToken,
  safeStrEqual,
  SESSION_MAX_AGE,
} from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      body = null;
    }
    const password = typeof (body as { password?: unknown })?.password === 'string' ? (body as { password: string }).password : '';
    const expected = adminPassword();

    if (!safeStrEqual(password, expected)) {
      return NextResponse.json(
        { ok: false, error: 'Incorrect password.' },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, makeAdminToken(), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE,
      secure: process.env.NODE_ENV === 'production',
    });
    return res;
  } catch (err) {
    console.error('[admin/login]', err);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}