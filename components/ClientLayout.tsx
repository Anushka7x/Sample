'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Exclude both login and reset pages
  const hideNavbar = pathname === '/' || pathname === '/reset';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="p-4">{children}</main>
    </>
  );
}
