import { prisma } from "@/lib/db";
import { createProject } from "@/actions/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<{ clientId?: string }> }) {
  const { clientId } = await searchParams;
  const clients = await prisma.client.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/crm/projects" className="text-slate-400 hover:text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Новый объект</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <form action={createProject} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Название объекта *</label>
              <input name="title" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ремонт офиса — ООО «Название»" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Клиент *</label>
              <select name="clientId" required defaultValue={clientId ?? ""} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                <option value="">Выберите клиента</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}{c.company ? ` — ${c.company}` : ""}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Адрес *</label>
              <input name="address" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Челябинск, ул. Примерная, 1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Тип помещения *</label>
              <select name="type" required className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                <option value="OFFICE">Офис</option>
                <option value="RETAIL">Торговый</option>
                <option value="RESTAURANT">Ресторан</option>
                <option value="MEDICAL">Медицина</option>
                <option value="WAREHOUSE">Склад</option>
                <option value="OTHER">Другое</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Статус</label>
              <select name="status" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                <option value="LEAD">Лид</option>
                <option value="NEGOTIATION">Переговоры</option>
                <option value="ACTIVE">В работе</option>
                <option value="ON_HOLD">Приостановлен</option>
                <option value="COMPLETED">Завершён</option>
                <option value="CANCELLED">Отменён</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Площадь, м²</label>
              <input name="area" type="number" step="0.1" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="100" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Бюджет, ₽</label>
              <input name="budget" type="number" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="1000000" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Начало работ</label>
              <input name="startDate" type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Сдача объекта</label>
              <input name="endDate" type="date" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
              <textarea name="description" rows={3} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" placeholder="Краткое описание объекта..." />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
              Создать объект
            </button>
            <Link href="/crm/projects" className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              Отмена
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
