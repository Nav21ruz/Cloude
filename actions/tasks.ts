"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TaskStatus, Priority } from "@prisma/client";

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.nativeEnum(TaskStatus).default("TODO"),
  priority: z.nativeEnum(Priority).default("MEDIUM"),
  dueDate: z.string().optional(),
  projectId: z.string().min(1),
  stageId: z.string().optional(),
  assigneeId: z.string().optional(),
});

export async function createTask(formData: FormData) {
  const data = TaskSchema.parse({
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    status: formData.get("status") || "TODO",
    priority: formData.get("priority") || "MEDIUM",
    dueDate: formData.get("dueDate") || undefined,
    projectId: formData.get("projectId"),
    stageId: formData.get("stageId") || undefined,
    assigneeId: formData.get("assigneeId") || undefined,
  });

  await prisma.task.create({
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });

  revalidatePath("/tasks");
  revalidatePath(`/projects/${data.projectId}`);
}

export async function updateTaskStatus(taskId: string, status: TaskStatus, projectId?: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status },
  });

  revalidatePath("/tasks");
  if (projectId) revalidatePath(`/projects/${projectId}`);
}

export async function deleteTask(taskId: string, projectId?: string) {
  await prisma.task.delete({ where: { id: taskId } });
  revalidatePath("/tasks");
  if (projectId) revalidatePath(`/projects/${projectId}`);
}
