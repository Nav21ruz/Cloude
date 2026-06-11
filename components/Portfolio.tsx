"use client";

import { useState } from "react";

const categories = ["Все объекты", "Офисы", "Торговые", "Рестораны", "Медицина", "Склады"];

const projects = [
  {
    id: 1,
    title: "Офисный центр «Синара»",
    category: "Офисы",
    area: "1 200 м²",
    duration: "3 месяца",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    description: "Open space на 180 рабочих мест. Современный дизайн, акустические перегородки, система умного освещения.",
  },
  {
    id: 2,
    title: "Супермаркет «Монетка»",
    category: "Торговые",
    area: "850 м²",
    duration: "6 недель",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
    description: "Полный ремонт торгового зала: эпоксидные полы, торговое освещение, зоны холодильного оборудования.",
  },
  {
    id: 3,
    title: "Ресторан «Урал»",
    category: "Рестораны",
    area: "320 м²",
    duration: "10 недель",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    description: "Дизайн-проект, кухонная зона с промышленной вентиляцией, VIP-зал, барная стойка.",
  },
  {
    id: 4,
    title: "Медицинский центр «Евромед»",
    category: "Медицина",
    area: "650 м²",
    duration: "4 месяца",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
    description: "8 кабинетов, операционная зона, лаборатория. Соответствие всем нормам СанПиН.",
  },
  {
    id: 5,
    title: "Банк «Уралсиб»",
    category: "Офисы",
    area: "280 м²",
    duration: "8 недель",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    description: "Кассовая зона, ВИП-кабинеты, защитные конструкции, представительский интерьер.",
  },
  {
    id: 6,
    title: "Логистический склад ТК «Северный»",
    category: "Склады",
    area: "2 400 м²",
    duration: "2 месяца",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
    description: "Промышленные наливные полы, противопожарная система, секционные ворота, освещение 500 Лк.",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Все объекты");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered =
    activeCategory === "Все объекты"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Портфолио
            </span>
          </div>
          <h2
            className="section-title mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Наши реализованные
            <span className="text-gradient block">проекты</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            380+ завершённых объектов в Челябинске и Челябинской области
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "gradient-orange text-white shadow-lg shadow-orange-200"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-100 card-hover cursor-pointer"
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {project.category}
                </div>

                {/* Overlay on hover */}
                {hovered === project.id && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                    <div className="text-white text-center px-6">
                      <p className="text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3
                  className="text-slate-900 font-bold text-lg mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                    {project.area}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {project.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-slate-500 text-sm mb-4">Показано 6 из 380+ проектов</p>
          <a href="#contact" className="btn-primary inline-flex">
            Обсудить мой проект
          </a>
        </div>
      </div>
    </section>
  );
}
