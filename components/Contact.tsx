"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "",
    area: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
                Связаться с нами
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Получите бесплатную
              <span className="text-gradient block">смету за 24 часа</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Оставьте заявку, и наш специалист свяжется с вами в течение 30
              минут. Выезд на объект и предварительная смета — бесплатно.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              <a
                href="tel:+73512000000"
                className="flex items-center gap-4 text-white group"
              >
                <div className="w-12 h-12 bg-orange-500/15 border border-orange-500/25 rounded-xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Телефон</div>
                  <div className="text-lg font-bold group-hover:text-orange-400 transition-colors">
                    +7 (351) 200-00-00
                  </div>
                </div>
              </a>

              <a
                href="mailto:info@komstroy74.ru"
                className="flex items-center gap-4 text-white group"
              >
                <div className="w-12 h-12 bg-orange-500/15 border border-orange-500/25 rounded-xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Email</div>
                  <div className="text-lg font-bold group-hover:text-orange-400 transition-colors">
                    info@komstroy74.ru
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-orange-500/15 border border-orange-500/25 rounded-xl flex items-center justify-center text-orange-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Адрес</div>
                  <div className="text-base font-medium">
                    г. Челябинск, ул. Труда, 164, оф. 301
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-orange-500/15 border border-orange-500/25 rounded-xl flex items-center justify-center text-orange-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wide">Режим работы</div>
                  <div className="text-base font-medium">
                    Пн–Пт: 9:00–18:00 · Сб: 10:00–15:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/30">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-black text-slate-900 mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Заявка отправлена!
                </h3>
                <p className="text-slate-500 text-base">
                  Мы свяжемся с вами в течение 30 минут в рабочее время.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="text-2xl font-black text-slate-900 mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Оставить заявку
                </h3>
                <p className="text-slate-500 text-sm mb-6">
                  Заполните форму — перезвоним за 30 минут
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Тип объекта
                      </label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm bg-white transition-all"
                      >
                        <option value="">Выберите...</option>
                        <option>Офис</option>
                        <option>Магазин</option>
                        <option>Ресторан/кафе</option>
                        <option>Медицина</option>
                        <option>Склад</option>
                        <option>Банк</option>
                        <option>Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        Площадь (м²)
                      </label>
                      <input
                        type="text"
                        value={form.area}
                        onChange={(e) => setForm({ ...form, area: e.target.value })}
                        placeholder="например, 500"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Описание задачи
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Расскажите о вашем объекте и пожеланиях..."
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm resize-none transition-all"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    Получить бесплатную смету
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <p className="text-slate-400 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="#" className="text-orange-500 hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
