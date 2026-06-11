const steps = [
  {
    step: "01",
    title: "Звонок и замер",
    description:
      "Вы звоните или оставляете заявку. Выезжаем на объект в удобное время, замеряем площадь, оцениваем состояние поверхностей и сложность работ. Замер — бесплатно.",
    duration: "1 день",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Смета и договор",
    description:
      "Составляем детальную смету с перечнем работ и материалов. Фиксируем стоимость, сроки и гарантии в договоре. Никаких скрытых платежей — только то, что прописано.",
    duration: "1–2 дня",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Подготовка поверхности",
    description:
      "Грунтуем стены и потолки для лучшей адгезии. Устанавливаем маяки по уровню. При необходимости армируем поверхность сеткой. Готовим объект к нанесению штукатурки.",
    duration: "1 день",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Машинное нанесение",
    description:
      "Станок замешивает и подаёт смесь под давлением. Мастер равномерно наносит штукатурку на поверхность. За один день — до 300 м². Постоянный контроль качества по уровню.",
    duration: "1–5 дней",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Затирка и выравнивание",
    description:
      "После схватывания выполняем финишную затирку правилом и тёркой. Добиваемся отклонения не более 2 мм на 2 метра. Проверяем каждый участок уровнем.",
    duration: "1–2 дня",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    step: "06",
    title: "Сдача объекта",
    description:
      "Проверяем качество вместе с вами, убираем после работ. Подписываем акт выполненных работ. Выдаём гарантийный талон на 3 года. Поверхность готова под чистовую отделку.",
    duration: "1 день",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Как мы работаем
            </span>
          </div>
          <h2 className="section-title mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
            6 шагов от заявки
            <span className="text-gradient block">до сдачи объекта</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Прозрачный процесс на каждом этапе. Вы всегда знаете, что происходит
            на вашем объекте и когда будет готово.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-8 h-0.5 bg-orange-200 z-10 -translate-x-4" />
              )}
              <div className="bg-slate-50 rounded-2xl p-7 h-full border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 gradient-orange rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-orange-400 text-xs font-bold tracking-widest">ШАГ {step.step}</div>
                    <div className="text-slate-400 text-xs">~ {step.duration}</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-10 text-white text-center">
          <h3 className="text-2xl font-black mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
            Готовы начать? Замер — бесплатно
          </h3>
          <p className="text-orange-100 mb-7 text-lg">
            Оставьте заявку — выедем в удобное время, замерим и рассчитаем стоимость без обязательств
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold py-4 px-10 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            Заказать бесплатный замер
          </a>
        </div>
      </div>
    </section>
  );
}
