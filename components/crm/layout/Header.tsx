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
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">{user.name}</div>
              <div className="text-xs text-slate-500">{ROLE_LABELS[user.role] ?? user.role}</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/crm/login" })}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
}
