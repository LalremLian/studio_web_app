'use client';

import { Home, Upload } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

const navLinks = [
  { href: '/', icon: Home, label: 'Dashboard', tooltip: 'Dashboard' },
  { href: '/upload', icon: Upload, label: 'Upload Content', tooltip: 'Upload' },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.tooltip}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
