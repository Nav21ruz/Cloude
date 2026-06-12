import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROLE_LABELS } from "@/lib/utils";
import { createUser, deleteUser } from "@/actions/users";
import { User, Plus, Trash2 } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN" && session?.user.role !== "MANAGER") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({ orderBy: { role: "asc" } });

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Настройки</h1>
        <p className="text-slate-500 text-sm mt-1">Управление пользователями системы</p>
      </div>

      {/* User List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Пользователи ({users.length})</h2>
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{user.name}</div>
                  <div className="text-sm text-slate-500">{user.email}</div>
                  {user.phone && <div className="text-xs text-slate-400">{user.phone}</div>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
                  {ROLE_LABELS[user.role] ?? user.role}
                </span>
                {user.id !== session?.user.id && (
                  <form action={deleteUser.bind(null, user.id)}>
                    <button type="submit" className="text-slate-300 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="w-5 h-5 text-slate-500" />
          <h2 className="font-semibold text-slate-900">Добавить пользователя</h2>
        </div>
        <form action={createUser} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ФИО *</label>
            <input name="name" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
            <input name="email" type="email" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Роль *</label>
            <select name="role" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
              <option value="MANAGER">Менеджер</option>
              <option value="FOREMAN">Прораб</option>
              <option value="WORKER">Рабочий</option>
              <option value="ADMIN">Администратор</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
            <input name="phone" type="tel" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Пароль *</label>
            <input name="password" type="password" required minLength={6} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div className="col-span-2">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
              Создать пользователя
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
