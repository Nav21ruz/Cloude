import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { formatDate, TASK_STATUS_LABELS, PRIORITY_LABELS, PRIORITY_COLORS } from "@/lib/utils";
import { updateTaskStatus } from "@/actions/tasks";
import { CheckSquare, Clock, AlertCircle } from "lucide-react";

const STATUS_BG: Record<string, string> = {
  TODO: "bg-slate-50 border-slate-200",
  IN_PROGRESS: "bg-blue-50 border-blue-200",
  REVIEW: "bg-yellow-50 border-yellow-200",
  DONE: "bg-green-50 border-green-200",
};

const NEXT_STATUS: Record<string, string> = {
  TODO: "IN_PROGRESS",
  IN_PROGRESS: "REVIEW",
  REVIEW: "DONE",
};

const NEXT_STATUS_LABEL: Record<string, string> = {
  TODO: "→ В работу",
  IN_PROGRESS: "→ На проверку",
  REVIEW: "→ Готово",
};

export default async function TasksPage() {
  const session = await auth();
  const isManager = session?.user.role === "ADMIN" || session?.user.role === "MANAGER";

  const tasks = await prisma.task.findMany({
    where: isManager ? {} : { assigneeId: session?.user.id },
    include: { project: true, assignee: true, stage: true },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
  });

  const grouped = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    REVIEW: tasks.filter((t) => t.status === "REVIEW"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };

  const overdue = tasks.filter((t) => t.status !== "DONE" && t.dueDate && new Date(t.dueDate) < new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Задачи</h1>
          <p className="text-slate-500 text-sm mt-1">
            {tasks.filter((t) => t.status !== "DONE").length} открытых · {tasks.filter((t) => t.status === "DONE").length} выполнено
          </p>
        </div>
        {overdue.length > 0 && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm">
            <AlertCircle className="w-4 h-4" />
            Просрочено: {overdue.length}
          </div>
        )}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {(["TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const).map((status) => (
          <div key={status} className={`rounded-2xl border p-4 ${STATUS_BG[status]}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-slate-500" />
                <span className="font-medium text-sm text-slate-700">{TASK_STATUS_LABELS[status]}</span>
              </div>
              <span className="bg-white text-slate-500 text-xs px-2 py-0.5 rounded-full border border-slate-200">
                {grouped[status].length}
              </span>
            </div>

            <div className="space-y-2">
              {grouped[status].length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-4">Нет задач</div>
              ) : (
                grouped[status].map((task) => {
                  const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "DONE";
                  return (
                    <div key={task.id} className="bg-white rounded-xl p-3 shadow-sm border border-white space-y-2">
                      <div className="text-sm font-medium text-slate-900 leading-tight">{task.title}</div>

                      <div className="text-xs text-slate-500 font-medium">{task.project.title}</div>

                      {task.stage && (
                        <div className="text-xs text-slate-400">Этап: {task.stage.name}</div>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
                          {PRIORITY_LABELS[task.priority]}
                        </span>
                        {task.dueDate && (
                          <span className={`text-xs flex items-center gap-0.5 ${overdue ? "text-red-500 font-medium" : "text-slate-400"}`}>
                            <Clock className="w-3 h-3" />
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                      </div>

                      {task.assignee && (
                        <div className="text-xs text-slate-400">{task.assignee.name}</div>
                      )}

                      {status !== "DONE" && NEXT_STATUS[status] && (
                        <form action={updateTaskStatus.bind(null, task.id, NEXT_STATUS[status] as any, task.projectId)}>
                          <button type="submit" className="text-xs text-orange-500 hover:text-orange-700 font-medium transition-colors">
                            {NEXT_STATUS_LABEL[status]}
                          </button>
                        </form>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
