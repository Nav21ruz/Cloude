"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", area: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
              <span className="text-orange-300 text-sm font-semibold uppercase tracking-wider">
                Связаться с нами
              </span>
            </div>
            <h2 className="section-title text-white mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>
              Получите бесплатный
              <span className="text-gradient block">замер и расчёт</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Оставьте заявку — перезвоним в течение 15 минут. Выедем на замер в удобное время.
              Смета и расчёт стоимости — бесплатно и без обязательств.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  label: "Телефон",
                  value: "+7 (351) 200-00-00",
                  href: "tel:+73512000000",
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  ),
                  label: "WhatsApp",
                  value: "+7 (351) 200-00-00",
                  href: "https://wa.me/73512000000",
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: "Email",
                  value: "info@mехштукатур74.рф",
                  href: "mailto:info@mehshtukatyr74.ru",
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: "Адрес",
                  value: "Челябинск, ул. Труда, 156, офис 4",
                  href: "#",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-orange-500/15 border border-orange-500/25 rounded-xl flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-white font-semibold group-hover:text-orange-400 transition-colors">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
              <h4 className="text-white font-bold mb-3">Время работы</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Пн – Пт</span>
                  <span className="text-white font-medium">8:00 – 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Суббота</span>
                  <span className="text-white font-medium">9:00 – 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Воскресенье</span>
                  <span className="text-orange-400 font-medium">по договорённости</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-10">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 gradient-orange rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Заявка принята!
                </h3>
                <p className="text-slate-500 text-lg">
                  Перезвоним в течение 15 минут и договоримся о замере
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Оставить заявку
                </h3>
                <p className="text-slate-500 mb-7">Перезвоним в течение 15 минут</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 bg-slate-50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (351) ___-__-__"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 bg-slate-50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Площадь (м²)</label>
                    <input
                      type="text"
                      placeholder="Например: 80 м²"
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 bg-slate-50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Комментарий</label>
                    <textarea
                      rows={3}
                      placeholder="Адрес объекта, тип работ, сроки..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 bg-slate-50 resize-none transition-all"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                    Записаться на бесплатный замер
                  </button>

                  <p className="text-slate-400 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
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
