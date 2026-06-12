"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PaymentType } from "@prisma/client";

const PaymentSchema = z.object({
  type: z.nativeEnum(PaymentType),
  amount: z.coerce.number().positive(),
  date: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string().min(1),
});

export async function createPayment(formData: FormData) {
  const data = PaymentSchema.parse({
    type: formData.get("type"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    description: formData.get("description") || undefined,
    projectId: formData.get("projectId"),
  });

  await prisma.payment.create({
    data: { ...data, date: new Date(data.date) },
  });

  revalidatePath("/finances");
  revalidatePath(`/projects/${data.projectId}`);
}

export async function deletePayment(id: string, projectId: string) {
  await prisma.payment.delete({ where: { id } });
  revalidatePath("/finances");
  revalidatePath(`/projects/${projectId}`);
}

const EstimateItemSchema = z.object({
  name: z.string().min(1),
  unit: z.string().min(1),
  quantity: z.coerce.number().positive(),
  price: z.coerce.number().positive(),
});

export async function createEstimate(projectId: string, name: string, items: z.infer<typeof EstimateItemSchema>[]) {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  await prisma.estimate.create({
    data: {
      projectId,
      name,
      total,
      items: {
        create: items.map((item) => ({
          ...item,
          total: item.quantity * item.price,
        })),
      },
    },
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/finances");
}

export async function deleteEstimate(id: string, projectId: string) {
  await prisma.estimate.delete({ where: { id } });
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/finances");
}
