const advantages = [
  {
    number: "01",
    title: "Фиксированная смета",
    description:
      "Прописываем стоимость в договоре. Никаких доплат в процессе работы — цена не меняется без вашего согласия.",
    icon: "📋",
  },
  {
    number: "02",
    title: "Сдача в срок",
    description:
      "Опаздываем — возвращаем 30% стоимости работ. За 12 лет просрочки более 2 недель не допустили ни разу.",
    icon: "⏱️",
  },
  {
    number: "03",
    title: "Гарантия 5 лет",
    description:
      "Официальная гарантия на все виды работ. Устраняем дефекты бесплатно в течение гарантийного срока.",
    icon: "🛡️",
  },
  {
    number: "04",
    title: "Собственные бригады",
    description:
      "Не нанимаем субподрядчиков — работаем своими проверенными специалистами. Полная ответственность за качество.",
    icon: "👷",
  },
  {
    number: "05",
    title: "Авторский надзор",
    description:
      "Прораб на объекте ежедневно. Фотоотчёты каждые 2 дня. Вы всегда знаете, что происходит на вашем объекте.",
    icon: "📸",
  },
  {
    number: "06",
    title: "Работаем с НДС",
    description:
      "Официальная компания, все документы для бухгалтерии. Закрывающие документы, акты, счета-фактуры.",
    icon: "✅",
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-wider">
                Почему выбирают нас
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Мы не обещаем —
              <span className="text-gradient block">мы гарантируем</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              КомСтрой74 — это команда из 85 профессионалов. С 2012 года сдаём
              коммерческие объекты в Челябинске и области. Наши клиенты
              возвращаются снова и рекомендуют нас партнёрам.
            </p>

            {/* Big stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { n: "380+", l: "Проектов" },
                { n: "85", l: "Специалистов" },
                { n: "12", l: "Лет опыта" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center"
                >
                  <div
                    className="text-3xl font-black text-orange-400"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {s.n}
                  </div>
                  <div className="text-slate-400 text-xs mt-1 uppercase tracking-wide">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary inline-flex">
              Получить коммерческое предложение
            </a>
          </div>

          {/* Right: advantages grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv) => (
              <div
                key={adv.number}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-orange-500/40 hover:bg-slate-800 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{adv.icon}</span>
                  <span
                    className="text-orange-500/40 text-xs font-black mt-1"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {adv.number}
                  </span>
                </div>
                <h3
                  className="text-white font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {adv.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
