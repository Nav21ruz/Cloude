import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "КомСтрой74 — Ремонт коммерческих помещений в Челябинске",
  description:
    "Профессиональный ремонт офисов, магазинов, ресторанов и коммерческих помещений в Челябинске. Опыт более 12 лет. Гарантия 5 лет. Бесплатная смета.",
  keywords:
    "ремонт коммерческих помещений Челябинск, ремонт офисов Челябинск, ремонт магазинов, отделка помещений Челябинск",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${inter.variable} scroll-smooth`}
    >
      <body
        className="min-h-screen antialiased"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
