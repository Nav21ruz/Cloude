"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  Receipt,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/projects", label: "Объекты", icon: FolderKanban },
  { href: "/clients", label: "Клиенты", icon: Users },
  { href: "/tasks", label: "Задачи", icon: CheckSquare },
  { href: "/finances", label: "Финансы", icon: Receipt },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen flex flex-col" style={{ background: '#111', borderRight: '1px solid #2a2a2a' }}>
      {/* Logo */}
      <div className="p-6" style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-black text-sm" style={{ background: '#C9A84C' }}>
            D
          </div>
          <div>
            <div className="font-black text-sm tracking-widest" style={{ color: '#fff', letterSpacing: '0.15em' }}>DUMAEV</div>
            <div className="text-xs" style={{ color: '#666' }}>CRM система</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              )}
              style={active
                ? { background: '#C9A84C', color: '#000' }
                : { color: '#888' }
              }
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; (e.currentTarget as HTMLElement).style.color = '#fff'; } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#888'; } }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4" style={{ borderTop: '1px solid #2a2a2a' }}>
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
          style={pathname === "/settings"
            ? { background: '#C9A84C', color: '#000' }
            : { color: '#888' }
          }
          onMouseEnter={e => { if (pathname !== "/settings") { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; (e.currentTarget as HTMLElement).style.color = '#fff'; } }}
          onMouseLeave={e => { if (pathname !== "/settings") { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#888'; } }}
        >
          <Settings className="w-5 h-5" />
          Настройки
        </Link>
      </div>
    </aside>
  );
}
