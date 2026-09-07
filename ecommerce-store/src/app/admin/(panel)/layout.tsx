import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminToken } from '@/lib/auth';
import AdminShell from '@/components/admin/admin-shell';

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('ADMIN_TOKEN')?.value;
  if (!verifyAdminToken(token)) {
    redirect('/admin/login');
  }
  return <AdminShell>{children}</AdminShell>;
}