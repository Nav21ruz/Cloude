"use client";

import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  user: { name: string; email: string; role: string };
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  FOREMAN: "Прораб",
  WORKER: "Рабочий",
};

export function Header({ user }: HeaderProps) {
  return (
    <header className="px-6 py-4" style={{ background: '#111', borderBottom: '1px solid #2a2a2a' }}>
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.15)' }}>
              <User className="w-5 h-5" style={{ color: '#C9A84C' }} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: '#fff' }}>{user.name}</div>
              <div className="text-xs" style={{ color: '#666' }}>{ROLE_LABELS[user.role] ?? user.role}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-sm transition-colors px-3 py-2 rounded-lg"
            style={{ color: '#666' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#666'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
}
