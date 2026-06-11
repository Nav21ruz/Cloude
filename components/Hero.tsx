"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/97 via-slate-900/80 to-slate-900/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 gradient-orange" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-300 text-sm font-medium tracking-wide uppercase">
              №1 по механизированной штукатурке в Челябинской области
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Механизированная
            <span className="block text-gradient">штукатурка</span>
            <span className="block text-white">стен и потолков</span>
          </h1>

          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
            Профессиональная машинная штукатурка в Челябинске и области. В 4 раза быстрее ручного труда,
            идеально ровная поверхность. Гарантия качества —{" "}
            <span className="text-orange-400 font-semibold">или переделаем бесплатно</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a href="#contact" className="btn-primary text-base py-4 px-8">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Получить бесплатный замер
            </a>
            <a href="tel:+73512000000" className="btn-outline text-base py-4 px-8">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Позвонить нам
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: "🏆", text: "8 лет опыта" },
              { icon: "✅", text: "500+ объектов" },
              { icon: "⚡", text: "В 4× быстрее" },
              { icon: "🛡️", text: "Гарантия 3 года" },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2">
                <span className="text-xl">{badge.icon}</span>
                <span className="text-slate-300 text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 bg-slate-900/80 backdrop-blur-sm border-t border-white/10">
            {[
              { number: "500+", label: "Объектов сдано" },
              { number: "8 лет", label: "На рынке" },
              { number: "от 350₽", label: "Цена за м²" },
              { number: "3 года", label: "Гарантия" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-6 px-4 text-center">
                <span className="text-3xl font-black text-orange-400 leading-none" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {stat.number}
                </span>
                <span className="text-slate-400 text-xs mt-1 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
