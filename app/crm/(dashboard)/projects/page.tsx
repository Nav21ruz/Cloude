import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Plus, MapPin, Calendar } from "lucide-react";
import { formatDate, formatCurrency, PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS, STATUS_COLORS } from "@/lib/utils";

const STATUS_ORDER = ["ACTIVE", "NEGOTIATION", "LEAD", "ON_HOLD", "COMPLETED", "CANCELLED"];

export default async function ProjectsPage() {
  const session = await auth();
  const isManager = session?.user.role === "ADMIN" || session?.user.role === "MANAGER";

  const projects = await prisma.project.findMany({
    where: isManager
      ? {}
      : { members: { some: { userId: session?.user.id } } },
    include: {
      client: true,
      _count: { select: { tasks: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const sorted = [...projects].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Объекты</h1>
          <p className="text-slate-500 text-sm mt-1">{projects.length} объектов</p>
        </div>
        {isManager && (
          <Link
            href="/crm/projects/new"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Новый объект
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sorted.length === 0 ? (
          <div className="col-span-3 bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-slate-400">Нет объектов</p>
          </div>
        ) : (
          sorted.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-orange-200 hover:shadow-sm transition-all cursor-pointer h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[project.status]}`}>
                    {PROJECT_STATUS_LABELS[project.status]}
                  </span>
                  <span className="text-xs text-slate-400">{PROJECT_TYPE_LABELS[project.type]}</span>
                </div>

                <h3 className="font-semibold text-slate-900 mb-1">{project.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{project.client.name}</p>

                <div className="space-y-2 text-xs text-slate-500 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{project.address}</span>
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(project.startDate)} — {formatDate(project.endDate)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  {project.area && (
                    <span className="text-sm font-medium text-slate-700">{project.area} м²</span>
                  )}
                  {project.budget && (
                    <span className="text-sm font-semibold text-orange-600">{formatCurrency(project.budget)}</span>
                  )}
                  <span className="text-xs text-slate-400 ml-auto">{project._count.tasks} задач</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
