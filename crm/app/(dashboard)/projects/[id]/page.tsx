import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, MapPin, Calendar, Users } from "lucide-react";
import {
  formatDate, formatCurrency,
  PROJECT_STATUS_LABELS, PROJECT_TYPE_LABELS, STATUS_COLORS,
  TASK_STATUS_LABELS, PRIORITY_LABELS, PRIORITY_COLORS,
} from "@/lib/utils";
import { createStage, updateStageStatus } from "@/actions/projects";
import { createTask, updateTaskStatus, deleteTask } from "@/actions/tasks";
import { createPayment, deletePayment } from "@/actions/finances";

const STAGE_STATUS_LABELS: Record<string, string> = {
  PENDING: "Ожидает",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершён",
};

const STAGE_STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-gray-100 text-gray-600",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab = "overview" } = await searchParams;
  const session = await auth();
  const isManager = session?.user.role === "ADMIN" || session?.user.role === "MANAGER";

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      stages: { orderBy: { order: "asc" } },
      tasks: {
        include: { assignee: true, stage: true },
        orderBy: { createdAt: "desc" },
      },
      estimates: { include: { items: true } },
      payments: { orderBy: { date: "desc" } },
      members: { include: { user: true } },
    },
  });

  if (!project) notFound();

  const allUsers = isManager ? await prisma.user.findMany({ orderBy: { name: "asc" } }) : [];

  const totalIncome = project.payments.filter((p) => p.type === "INCOME").reduce((s, p) => s + p.amount, 0);
  const totalExpense = project.payments.filter((p) => p.type === "EXPENSE").reduce((s, p) => s + p.amount, 0);
  const totalEstimate = project.estimates.reduce((s, e) => s + e.total, 0);

  const tasksByStatus = {
    TODO: project.tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: project.tasks.filter((t) => t.status === "IN_PROGRESS"),
    REVIEW: project.tasks.filter((t) => t.status === "REVIEW"),
    DONE: project.tasks.filter((t) => t.status === "DONE"),
  };

  const tabs = [
    { key: "overview", label: "Обзор" },
    { key: "stages", label: "Этапы" },
    { key: "tasks", label: `Задачи (${project.tasks.length})` },
    { key: "finances", label: "Финансы" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Link href="/projects" className="text-slate-400 hover:text-slate-600 mt-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">{project.title}</h1>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[project.status]}`}>
                {PROJECT_STATUS_LABELS[project.status]}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{project.client.name}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.address}</span>
              {project.type && <span>{PROJECT_TYPE_LABELS[project.type]}</span>}
            </div>
          </div>
        </div>
        {isManager && (
          <Link href={`/projects/${id}/edit`} className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
            <Edit className="w-4 h-4" />
            Редактировать
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-0">
          {tabs.map(({ key, label }) => (
            <Link
              key={key}
              href={`/projects/${id}?tab=${key}`}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === key
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-semibold text-slate-900">Информация</h2>
            <div className="space-y-3 text-sm">
              {project.area && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Площадь:</span>
                  <span className="font-medium">{project.area} м²</span>
                </div>
              )}
              {project.budget && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Бюджет:</span>
                  <span className="font-medium text-orange-600">{formatCurrency(project.budget)}</span>
                </div>
              )}
              {project.startDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Начало:</span>
                  <span className="font-medium">{formatDate(project.startDate)}</span>
                </div>
              )}
              {project.endDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Срок сдачи:</span>
                  <span className="font-medium">{formatDate(project.endDate)}</span>
                </div>
              )}
            </div>
            {project.description && (
              <div className="pt-3 border-t border-slate-100 text-sm text-slate-600">
                {project.description}
              </div>
            )}
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Команда</h2>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            {project.members.length === 0 ? (
              <p className="text-slate-400 text-sm">Нет участников</p>
            ) : (
              <div className="space-y-2">
                {project.members.map(({ user }) => (
                  <div key={user.id} className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{user.name}</div>
                      <div className="text-xs text-slate-400">{user.phone ?? user.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Finance Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Финансы</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Поступило:</span>
                <span className="font-semibold text-green-600">+{formatCurrency(totalIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Расходы:</span>
                <span className="font-semibold text-red-500">-{formatCurrency(totalExpense)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                <span className="text-slate-500">Баланс:</span>
                <span className={`font-bold ${totalIncome - totalExpense >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {formatCurrency(totalIncome - totalExpense)}
                </span>
              </div>
              {totalEstimate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">По смете:</span>
                  <span className="font-medium">{formatCurrency(totalEstimate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "stages" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
            {project.stages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">Этапы не добавлены</div>
            ) : (
              project.stages.map((stage) => (
                <div key={stage.id} className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-sm font-bold">
                      {stage.order}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{stage.name}</div>
                      {(stage.startDate || stage.endDate) && (
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {formatDate(stage.startDate)} — {formatDate(stage.endDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  {isManager ? (
                    <form action={async (fd: FormData) => {
                      "use server";
                      await updateStageStatus(stage.id, fd.get("status") as string, id);
                    }}>
                      <select
                        name="status"
                        defaultValue={stage.status}
                        onChange={() => {}}
                        className={`text-xs px-3 py-1.5 rounded-full border-0 font-medium cursor-pointer ${STAGE_STATUS_COLORS[stage.status]}`}
                      />
                    </form>
                  ) : (
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STAGE_STATUS_COLORS[stage.status]}`}>
                      {STAGE_STATUS_LABELS[stage.status]}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {isManager && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-medium text-slate-900 mb-4">Добавить этап</h3>
              <form action={createStage.bind(null, id)} className="flex flex-wrap gap-3">
                <input name="name" required placeholder="Название этапа" className="flex-1 min-w-48 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <input name="startDate" type="date" className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <input name="endDate" type="date" className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  Добавить
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {tab === "tasks" && (
        <div className="space-y-4">
          {/* Kanban */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {(["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const).map((status) => (
              <div key={status} className="bg-white rounded-2xl border border-slate-200 p-4">
                <div className="font-medium text-slate-700 text-sm mb-3 flex items-center justify-between">
                  {TASK_STATUS_LABELS[status]}
                  <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full">
                    {tasksByStatus[status].length}
                  </span>
                </div>
                <div className="space-y-2">
                  {tasksByStatus[status].map((task) => (
                    <div key={task.id} className="bg-slate-50 rounded-xl p-3 space-y-2">
                      <div className="text-sm font-medium text-slate-900">{task.title}</div>
                      {task.assignee && (
                        <div className="text-xs text-slate-400">{task.assignee.name}</div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
                          {PRIORITY_LABELS[task.priority]}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-slate-400">{formatDate(task.dueDate)}</span>
                        )}
                      </div>
                      {isManager && status !== "DONE" && (
                        <form action={updateTaskStatus.bind(null, task.id, "DONE" as any, id)}>
                          <button type="submit" className="text-xs text-green-600 hover:text-green-700">✓ Готово</button>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add Task */}
          {isManager && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-medium text-slate-900 mb-4">Добавить задачу</h3>
              <form action={createTask} className="space-y-3">
                <input type="hidden" name="projectId" value={id} />
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <input name="title" required placeholder="Название задачи" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <select name="priority" className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm">
                    <option value="LOW">Низкий</option>
                    <option value="MEDIUM" selected>Средний</option>
                    <option value="HIGH">Высокий</option>
                    <option value="URGENT">Срочно</option>
                  </select>
                  <select name="assigneeId" className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm">
                    <option value="">— Исполнитель —</option>
                    {allUsers.map((u) => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                  <select name="stageId" className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm">
                    <option value="">— Этап —</option>
                    {project.stages.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <input name="dueDate" type="date" className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  Добавить задачу
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {tab === "finances" && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
              <div className="text-xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
              <div className="text-sm text-slate-500 mt-1">Поступления</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
              <div className="text-xl font-bold text-red-500">{formatCurrency(totalExpense)}</div>
              <div className="text-sm text-slate-500 mt-1">Расходы</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
              <div className={`text-xl font-bold ${totalIncome - totalExpense >= 0 ? "text-green-600" : "text-red-500"}`}>
                {formatCurrency(totalIncome - totalExpense)}
              </div>
              <div className="text-sm text-slate-500 mt-1">Баланс</div>
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Платежи</h3>
            <div className="space-y-2 mb-4">
              {project.payments.length === 0 ? (
                <p className="text-slate-400 text-sm">Нет платежей</p>
              ) : (
                project.payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{payment.description ?? "Платёж"}</div>
                      <div className="text-xs text-slate-400">{formatDate(payment.date)}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold text-sm ${payment.type === "INCOME" ? "text-green-600" : "text-red-500"}`}>
                        {payment.type === "INCOME" ? "+" : "-"}{formatCurrency(payment.amount)}
                      </span>
                      {isManager && (
                        <form action={deletePayment.bind(null, payment.id, id)}>
                          <button type="submit" className="text-slate-300 hover:text-red-500 text-xs">✕</button>
                        </form>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {isManager && (
              <form action={createPayment} className="border-t border-slate-100 pt-4 flex flex-wrap gap-3">
                <input type="hidden" name="projectId" value={id} />
                <select name="type" className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-sm">
                  <option value="INCOME">Приход</option>
                  <option value="EXPENSE">Расход</option>
                </select>
                <input name="amount" type="number" required placeholder="Сумма, ₽" className="w-36 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <input name="date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <input name="description" placeholder="Описание" className="flex-1 min-w-40 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500" />
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  Добавить
                </button>
              </form>
            )}
          </div>

          {/* Estimates */}
          {project.estimates.map((estimate) => (
            <div key={estimate.id} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">{estimate.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{formatCurrency(estimate.total)}</span>
                  {isManager && (
                    <form action={deleteEstimate.bind(null, estimate.id, id)}>
                      <button type="submit" className="text-slate-300 hover:text-red-500 text-xs">✕ Удалить</button>
                    </form>
                  )}
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 text-xs">
                    <th className="text-left pb-2">Наименование</th>
                    <th className="text-center pb-2">Ед.</th>
                    <th className="text-right pb-2">Кол-во</th>
                    <th className="text-right pb-2">Цена</th>
                    <th className="text-right pb-2">Сумма</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {estimate.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 text-slate-900">{item.name}</td>
                      <td className="py-2 text-center text-slate-500">{item.unit}</td>
                      <td className="py-2 text-right text-slate-500">{item.quantity}</td>
                      <td className="py-2 text-right text-slate-500">{formatCurrency(item.price)}</td>
                      <td className="py-2 text-right font-medium text-slate-900">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function deleteEstimate(id: string, projectId: string) {
  "use server";
  const { deleteEstimate: del } = await import("@/actions/finances");
  await del(id, projectId);
}
