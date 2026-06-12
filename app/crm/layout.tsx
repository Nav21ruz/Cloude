import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "КомСтрой74 — CRM",
  description: "Система управления строительными проектами",
};

export default function CrmRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
