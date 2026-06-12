"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ProjectType, ProjectStatus } from "@prisma/client";

const ProjectSchema = z.object({
  title: z.string().min(1),
  address: z.string().min(1),
  area: z.coerce.number().optional(),
  type: z.nativeEnum(ProjectType),
  status: z.nativeEnum(ProjectStatus),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.coerce.number().optional(),
  description: z.string().optional(),
  clientId: z.string().min(1),
});

export async function createProject(formData: FormData) {
  const data = ProjectSchema.parse({
    title: formData.get("title"),
    address: formData.get("address"),
    area: formData.get("area") || undefined,
    type: formData.get("type"),
    status: formData.get("status"),
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    budget: formData.get("budget") || undefined,
    description: formData.get("description") || undefined,
    clientId: formData.get("clientId"),
  });

  const project = await prisma.project.create({
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  revalidatePath("/projects");
  redirect(`/projects/${project.id}`);
}

export async function updateProject(id: string, formData: FormData) {
  const data = ProjectSchema.parse({
    title: formData.get("title"),
    address: formData.get("address"),
    area: formData.get("area") || undefined,
    type: formData.get("type"),
    status: formData.get("status"),
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    budget: formData.get("budget") || undefined,
    description: formData.get("description") || undefined,
    clientId: formData.get("clientId"),
  });

  await prisma.project.update({
    where: { id },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  redirect(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  redirect("/projects");
}

export async function createStage(projectId: string, formData: FormData) {
  const lastStage = await prisma.stage.findFirst({
    where: { projectId },
    orderBy: { order: "desc" },
  });

  await prisma.stage.create({
    data: {
      projectId,
      name: formData.get("name") as string,
      order: (lastStage?.order ?? 0) + 1,
      startDate: formData.get("startDate") ? new Date(formData.get("startDate") as string) : null,
      endDate: formData.get("endDate") ? new Date(formData.get("endDate") as string) : null,
    },
  });

  revalidatePath(`/projects/${projectId}`);
}

export async function updateStageStatus(stageId: string, status: string, projectId: string) {
  await prisma.stage.update({
    where: { id: stageId },
    data: { status: status as any },
  });
  revalidatePath(`/projects/${projectId}`);
}
