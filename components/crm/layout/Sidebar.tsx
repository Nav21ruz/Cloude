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
  Building2,
} from "lucide-react";

const navItems = [
  { href: "/crm/dashboard", label: "Дашборд", icon: LayoutDashboard },
  { href: "/crm/projects", label: "Объекты", icon: FolderKanban },
  { href: "/crm/clients", label: "Клиенты", icon: Users },
  { href: "/crm/tasks", label: "Задачи", icon: CheckSquare },
  { href: "/crm/finances", label: "Финансы", icon: Receipt },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">КомСтрой74</div>
            <div className="text-slate-400 text-xs">CRM система</div>
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
                active
                  ? "bg-orange-500 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-slate-800">
        <Link
          href="/crm/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
            pathname === "/crm/settings"
              ? "bg-orange-500 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          )}
        >
          <Settings className="w-5 h-5" />
          Настройки
        </Link>
      </div>
    </aside>
  );
}
