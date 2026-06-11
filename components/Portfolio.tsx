"use client";

import { useState } from "react";

const categories = ["Все объекты", "Квартиры", "Новостройки", "Коммерция", "Фасады", "Коттеджи"];

const projects = [
  {
    title: "ЖК «Северный парк», Челябинск",
    category: "Новостройки",
    area: "4 800 м²",
    duration: "18 дней",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    tag: "Новостройка",
  },
  {
    title: "Квартира на Северо-Западе",
    category: "Квартиры",
    area: "94 м²",
    duration: "4 дня",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    tag: "Квартира",
  },
  {
    title: "Торговый центр «Горки»",
    category: "Коммерция",
    area: "2 200 м²",
    duration: "12 дней",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80",
    tag: "Коммерция",
  },
  {
    title: "Коттедж в Сосновом Бору",
    category: "Коттеджи",
    area: "320 м²",
    duration: "7 дней",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    tag: "Коттедж",
  },
  {
    title: "ЖК «Видный», Магнитогорск",
    category: "Новостройки",
    area: "6 100 м²",
    duration: "24 дня",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    tag: "Новостройка",
  },
  {
    title: "Фасад бизнес-центра",
    category: "Фасады",
    area: "1 400 м²",
    duration: "10 дней",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    tag: "Фасад",
  },
  {
    title: "Офис в центре Челябинска",
    category: "Коммерция",
    area: "560 м²",
    duration: "5 дней",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
    tag: "Коммерция",
  },
  {
    title: "Трёхкомнатная квартира, Копейск",
    category: "Квартиры",
    area: "78 м²",
    duration: "3 дня",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    tag: "Квартира",
  },
  {
    title: "Фасад школы №77",
    category: "Фасады",
    area: "2 800 м²",
    duration: "20 дней",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    tag: "Фасад",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("Все объекты");

  const filtered =
    active === "Все объекты"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Наши объекты
            </span>
          </div>
          <h2 className="section-title mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
            Выполненные работы
            <span className="text-gradient block">в Челябинской области</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Более 500 объектов за 8 лет. Жилые, коммерческие и фасадные работы по всему региону.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? "gradient-orange text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.title}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-base leading-snug" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {project.title}
                </h3>
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                    <span className="font-semibold text-slate-700">{project.area}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span>{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-6">
            Хотите увидеть больше примеров?{" "}
            <span className="text-slate-700 font-medium">Пришлём фото по WhatsApp.</span>
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Получить больше примеров работ
          </a>
        </div>
      </div>
    </section>
  );
}
