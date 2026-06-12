import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { formatCurrency, formatDate, PROJECT_STATUS_LABELS, STATUS_COLORS, PRIORITY_COLORS, PRIORITY_LABELS } from "@/lib/utils";
import { FolderKanban, Users, CheckSquare, TrendingUp, Clock, AlertCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const isManager = session?.user.role === "ADMIN" || session?.user.role === "MANAGER";

  const [projects, tasks, clients, payments] = await Promise.all([
    prisma.project.findMany({
      include: { client: true, _count: { select: { tasks: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.task.findMany({
      where: isManager ? {} : { assigneeId: session?.user.id },
      include: { project: true },
      orderBy: { dueDate: "asc" },
    }),
    prisma.client.findMany(),
    prisma.payment.findMany(),
  ]);

  const activeProjects = projects.filter((p) => p.status === "ACTIVE");
  const openTasks = tasks.filter((t) => t.status !== "DONE");
  const overdueTasks = openTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date()
  );

  const totalIncome = payments
    .filter((p) => p.type === "INCOME")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalExpense = payments
    .filter((p) => p.type === "EXPENSE")
    .reduce((sum, p) => sum + p.amount, 0);

  const recentProjects = projects.slice(0, 5);
  const upcomingTasks = openTasks.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Дашборд</h1>
        <p className="text-slate-500 text-sm mt-1">Обзор текущего состояния проектов</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Активных объектов"
          value={activeProjects.length}
          icon={<FolderKanban className="w-6 h-6 text-orange-500" />}
          bg="bg-orange-50"
          href="/crm/projects"
        />
        <StatCard
          title="Открытых задач"
          value={openTasks.length}
          icon={<CheckSquare className="w-6 h-6 text-blue-500" />}
          bg="bg-blue-50"
          href="/crm/tasks"
        />
        {isManager && (
          <>
            <StatCard
              title="Клиентов"
              value={clients.length}
              icon={<Users className="w-6 h-6 text-green-500" />}
              bg="bg-green-50"
              href="/crm/clients"
            />
            <StatCard
              title="Доход / Расход"
              value={`${formatCurrency(totalIncome - totalExpense)}`}
              icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
              bg="bg-purple-50"
              href="/crm/finances"
              subtitle={`+${formatCurrency(totalIncome)} / -${formatCurrency(totalExpense)}`}
            />
          </>
        )}
        {!isManager && (
          <StatCard
            title="Просрочено"
            value={overdueTasks.length}
            icon={<AlertCircle className="w-6 h-6 text-red-500" />}
            bg="bg-red-50"
            href="/crm/tasks"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Последние объекты</h2>
            <Link href="/crm/projects" className="text-orange-500 text-sm hover:underline">
              Все объекты →
            </Link>
          </div>
          <div className="space-y-3">
            {recentProjects.length === 0 ? (
              <p className="text-slate-400 text-sm">Нет объектов</p>
            ) : (
              recentProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-slate-900 truncate">{project.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{project.client.name}</div>
                    </div>
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[project.status]}`}>
                        {PROJECT_STATUS_LABELS[project.status]}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Ближайшие задачи</h2>
            <Link href="/crm/tasks" className="text-orange-500 text-sm hover:underline">
              Все задачи →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.length === 0 ? (
              <p className="text-slate-400 text-sm">Нет открытых задач</p>
            ) : (
              upcomingTasks.map((task) => {
                const overdue = task.dueDate && new Date(task.dueDate) < new Date();
                return (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900 truncate">{task.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{task.project.title}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
                        {PRIORITY_LABELS[task.priority]}
                      </span>
                      {task.dueDate && (
                        <span className={`text-xs flex items-center gap-1 ${overdue ? "text-red-500" : "text-slate-400"}`}>
                          <Clock className="w-3 h-3" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  bg,
  href,
  subtitle,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bg: string;
  href: string;
  subtitle?: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-orange-200 hover:shadow-sm transition-all cursor-pointer">
        <div className={`inline-flex p-2.5 rounded-xl ${bg} mb-3`}>{icon}</div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500 mt-0.5">{title}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
      </div>
    </Link>
  );
}
