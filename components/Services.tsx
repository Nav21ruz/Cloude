const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="8" y1="21" x2="8" y2="3" />
      </svg>
    ),
    title: "Машинная штукатурка стен",
    description: "Нанесение цементно-песчаных и гипсовых штукатурок машинным способом. Толщина слоя 5–50 мм. Идеально ровная поверхность без маяков на глаз.",
    features: ["Гипсовые смеси Knauf, Волма", "Точность ±2 мм/2 м", "Скорость до 300 м²/день", "Жилые и коммерческие объекты"],
    price: "от 350 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="1" />
        <path d="M2 14h20M2 20h20" />
      </svg>
    ),
    title: "Машинная штукатурка потолков",
    description: "Нанесение гипсовой штукатурки на потолки с последующим затиранием. Идеально для жилых квартир, офисов и торговых помещений.",
    features: ["Финишная затирка", "Адгезионная грунтовка", "Без трещин и отслоений", "Подготовка под покраску"],
    price: "от 450 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Штукатурка фасадов",
    description: "Фасадная механизированная штукатурка жилых домов, коттеджей и коммерческих зданий. Стойкость к перепадам температур уральского климата.",
    features: ["Цементно-песчаные смеси", "Декоративная штукатурка", "Морозостойкие составы", "Утепление фасада (мокрый фасад)"],
    price: "от 420 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12L5 7M12 12l7-5" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Штукатурка новостроек",
    description: "Массовая машинная штукатурка квартир в новых домах. Работаем с застройщиками и управляющими компаниями. Потоковый метод — несколько бригад одновременно.",
    features: ["Работа по договору с застройщиком", "Несколько бригад параллельно", "Соответствие СП 71.13330", "Акты скрытых работ"],
    price: "от 320 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Срочная штукатурка",
    description: "Выезд бригады в день обращения. Ускоренное выполнение при сжатых сроках сдачи объекта. Круглосуточная работа при необходимости.",
    features: ["Выезд в течение 24 часов", "Работа в выходные и праздники", "Ночные смены по согласованию", "Доплата за срочность — от 20%"],
    price: "от 480 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "Штукатурка под ключ",
    description: "Полный комплекс работ: замер, доставка материалов, штукатурка, затирка и грунтовка. Сдаём готовую поверхность под чистовую отделку.",
    features: ["Замер и смета бесплатно", "Доставка материалов включена", "Уборка после работ", "Сдача под финишную отделку"],
    price: "от 550 ₽/м²",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Наши услуги
            </span>
          </div>
          <h2 className="section-title mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
            Механизированная штукатурка
            <span className="text-gradient block">любых поверхностей</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Профессиональное оборудование Knauf PFT, Putzmeister и m-tec. Работаем с жилыми, коммерческими
            и промышленными объектами в Челябинске и по всей области.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-7 border border-slate-100 card-hover group"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-orange-500 font-bold text-base">{service.price}</span>
                <a
                  href="#contact"
                  className="text-slate-700 hover:text-orange-500 text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  Заказать
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-slate-500 mb-6">
            Нужна нестандартная задача?{" "}
            <span className="text-slate-700 font-medium">Звоните — оценим и возьмёмся.</span>
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Получить расчёт стоимости
          </a>
        </div>
      </div>
    </section>
  );
}
