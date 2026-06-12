import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  LEAD: "Лид",
  NEGOTIATION: "Переговоры",
  ACTIVE: "В работе",
  ON_HOLD: "Приостановлен",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
};

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  OFFICE: "Офис",
  RETAIL: "Торговый",
  RESTAURANT: "Ресторан",
  MEDICAL: "Медицина",
  WAREHOUSE: "Склад",
  OTHER: "Другое",
};

export const TASK_STATUS_LABELS: Record<string, string> = {
  TODO: "К выполнению",
  IN_PROGRESS: "В процессе",
  REVIEW: "На проверке",
  DONE: "Готово",
};

export const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Низкий",
  MEDIUM: "Средний",
  HIGH: "Высокий",
  URGENT: "Срочно",
};

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Администратор",
  MANAGER: "Менеджер",
  FOREMAN: "Прораб",
  WORKER: "Рабочий",
};

export const STATUS_COLORS: Record<string, string> = {
  LEAD: "bg-gray-100 text-gray-700",
  NEGOTIATION: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-green-100 text-green-700",
  ON_HOLD: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-600",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};
