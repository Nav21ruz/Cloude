"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.nativeEnum(Role),
  phone: z.string().optional(),
  password: z.string().min(6).optional(),
});

export async function createUser(formData: FormData) {
  const password = formData.get("password") as string;
  const data = UserSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    role: formData.get("role"),
    phone: formData.get("phone") || undefined,
    password,
  });

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { ...data, password: hashed } });
  revalidatePath("/settings");
}

export async function updateUser(id: string, formData: FormData) {
  const password = formData.get("password") as string;
  const data: Record<string, string> = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as string,
    phone: (formData.get("phone") as string) || "",
  };

  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  await prisma.user.update({ where: { id }, data: data as any });
  revalidatePath("/settings");
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/settings");
}
