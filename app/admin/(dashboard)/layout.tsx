import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/AdminSidebar';
import LogoutButton from '@/components/admin/LogoutButton';
import { ToastProvider } from '@/components/admin/Toast';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-surface">
        <header className="bg-ink">
          <div className="container-edge flex h-16 items-center justify-between">
            <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
              VEW Admin
            </span>
            <LogoutButton />
          </div>
        </header>
        <div className="container-edge grid grid-cols-1 gap-8 py-8 lg:grid-cols-[220px_1fr] lg:py-12">
          <aside className="rounded-xl bg-ink p-3 lg:sticky lg:top-8 lg:h-fit">
            <AdminSidebar />
          </aside>
          <div>{children}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
