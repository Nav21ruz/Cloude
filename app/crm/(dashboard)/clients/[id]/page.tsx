import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Edit, Plus } from "lucide-react";
import { formatDate, PROJECT_STATUS_LABELS, STATUS_COLORS, formatCurrency } from "@/lib/utils";
import { deleteClient } from "@/actions/clients";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      projects: {
        include: { _count: { select: { tasks: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) notFound();

  const totalBudget = client.projects.reduce((sum, p) => sum + (p.budget ?? 0), 0);

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/crm/clients" className="text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">{client.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/projects/new?clientId=${client.id}`}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Новый объект
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Контакты</h2>
            <Link href={`/clients/${id}/edit`} className="text-slate-400 hover:text-orange-500">
              <Edit className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {client.company && (
              <div className="text-sm">
                <span className="text-slate-400">Компания:</span>
                <div className="font-medium text-slate-900 mt-0.5">{client.company}</div>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{client.phone}</span>
            </div>
            {client.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{client.email}</span>
              </div>
            )}
            {client.address && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <span>{client.address}</span>
              </div>
            )}
            {client.notes && (
              <div className="pt-3 border-t border-slate-100 text-sm text-slate-600">
                {client.notes}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <form action={deleteClient.bind(null, id)}>
              <button
                type="submit"
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
                onClick={(e) => {
                  if (!confirm("Удалить клиента? Все связанные объекты также будут удалены.")) e.preventDefault();
                }}
              >
                Удалить клиента
              </button>
            </form>
          </div>
        </div>

        {/* Projects */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{client.projects.length}</div>
              <div className="text-sm text-slate-500">Объектов</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{formatCurrency(totalBudget)}</div>
              <div className="text-sm text-slate-500">Общий бюджет</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Объекты</h2>
            {client.projects.length === 0 ? (
              <p className="text-slate-400 text-sm">Нет объектов</p>
            ) : (
              <div className="space-y-3">
                {client.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-sm text-slate-900">{project.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {project.area ? `${project.area} м²` : "—"} · {formatDate(project.startDate)} — {formatDate(project.endDate)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.budget && (
                        <span className="text-sm font-medium text-slate-700">{formatCurrency(project.budget)}</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[project.status]}`}>
                        {PROJECT_STATUS_LABELS[project.status]}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
