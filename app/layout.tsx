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
  title: "МехШтукатур74 — Механизированная штукатурка в Челябинской области",
  description:
    "Профессиональная машинная штукатурка стен, потолков и фасадов в Челябинске и Челябинской области. 8 лет опыта, 500+ объектов. Гарантия 3 года. Бесплатный замер.",
  keywords:
    "механизированная штукатурка Челябинск, машинная штукатурка, штукатурка стен Челябинск, штукатурка цена, фасадная штукатурка Челябинская область",
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
