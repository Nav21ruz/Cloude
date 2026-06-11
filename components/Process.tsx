const steps = [
  {
    step: "01",
    title: "Заявка и осмотр",
    description:
      "Оставляете заявку или звоните. Наш специалист приезжает на объект в удобное время и проводит бесплатный замер.",
    duration: "1–2 дня",
  },
  {
    step: "02",
    title: "Смета и договор",
    description:
      "Составляем подробную смету с разбивкой по видам работ и материалам. Согласовываем, подписываем договор с фиксированной ценой.",
    duration: "2–3 дня",
  },
  {
    step: "03",
    title: "Проектирование",
    description:
      "Разрабатываем дизайн-проект и рабочую документацию. Согласовываем планировку, материалы и сроки выполнения каждого этапа.",
    duration: "3–7 дней",
  },
  {
    step: "04",
    title: "Ремонтные работы",
    description:
      "Работаем по графику. Прораб на объекте ежедневно. Фотоотчёты каждые 2 дня. Вы видите прогресс в реальном времени.",
    duration: "по плану",
  },
  {
    step: "05",
    title: "Контроль качества",
    description:
      "Приёмка каждого этапа нашим техническим директором. Устраняем замечания до передачи объекта.",
    duration: "постоянно",
  },
  {
    step: "06",
    title: "Сдача и гарантия",
    description:
      "Совместная приёмка с вами. Подписываем акт приёмки. Передаём гарантийный талон на 5 лет и всю документацию.",
    duration: "1 день",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Как мы работаем
            </span>
          </div>
          <h2
            className="section-title mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Прозрачный процесс
            <span className="text-gradient block">от А до Я</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Каждый этап зафиксирован в договоре. Никаких сюрпризов — только
            предсказуемый результат.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div key={step.step} className="relative group">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="text-5xl font-black text-orange-100 group-hover:text-orange-200 transition-colors"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {step.step}
                  </div>
                  <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-orange-600 text-xs font-semibold">
                      {step.duration}
                    </span>
                  </div>
                </div>

                <h3
                  className="text-slate-900 font-bold text-lg mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Connector arrow for last item in row */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    {(idx + 1) % 3 !== 0 && (
                      <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-white text-2xl font-black mb-2"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Готовы начать?
            </h3>
            <p className="text-orange-100 text-base">
              Бесплатный выезд специалиста и смета — в течение 24 часов
            </p>
          </div>
          <a
            href="#contact"
            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors whitespace-nowrap flex-shrink-0 text-base"
          >
            Заказать осмотр
          </a>
        </div>
      </div>
    </section>
  );
}
