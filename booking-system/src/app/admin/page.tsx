import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, verifyAdminToken } from '@/lib/auth';
import LoginForm from '@/components/admin/login-form';
import AdminDashboard from '@/components/admin/admin-dashboard';

export const metadata: Metadata = {
  title: 'Admin — Ember & Wood Bookings',
};

export default function AdminPage() {
  const authed = verifyAdminToken(cookies().get(ADMIN_COOKIE)?.value);

  return (
    <main className="min-h-screen bg-bg-secondary">
      {authed ? <AdminDashboard /> : <LoginForm />}
    </main>
  );
}