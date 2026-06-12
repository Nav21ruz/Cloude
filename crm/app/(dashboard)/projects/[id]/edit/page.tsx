import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateProject, deleteProject } from "@/actions/projects";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, clients] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!project) notFound();

  const action = updateProject.bind(null, id);
  const toDate = (d: Date | null) => d ? new Date(d).toISOString().split("T")[0] : "";

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/projects/${id}`} className="text-slate-400 hover:text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Редактировать объект</h1>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <form action={action} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Название *</label>
              <input name="title" required defaultValue={project.title} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Клиент *</label>
              <select name="clientId" required defaultValue={project.clientId} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Адрес *</label>
              <input name="address" required defaultValue={project.address} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Тип</label>
              <select name="type" defaultValue={project.type} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
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
              <select name="status" defaultValue={project.status} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white">
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
              <input name="area" type="number" step="0.1" defaultValue={project.area ?? ""} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Бюджет, ₽</label>
              <input name="budget" type="number" defaultValue={project.budget ?? ""} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Начало</label>
              <input name="startDate" type="date" defaultValue={toDate(project.startDate)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Срок сдачи</label>
              <input name="endDate" type="date" defaultValue={toDate(project.endDate)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Описание</label>
              <textarea name="description" rows={3} defaultValue={project.description ?? ""} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
              Сохранить
            </button>
            <Link href={`/projects/${id}`} className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              Отмена
            </Link>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <form action={deleteProject.bind(null, id)}>
            <button type="submit" className="text-sm text-red-500 hover:text-red-700 transition-colors">
              Удалить объект
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
