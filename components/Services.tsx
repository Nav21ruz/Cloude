const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Офисные помещения",
    description: "Open space, кабинеты, переговорные комнаты, ресепшн. Современные планировки под любой бизнес-процесс.",
    features: ["Зонирование пространства", "Акустические решения", "Системы кондиционирования", "Корпоративный стиль"],
    price: "от 4 500 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "Торговые площади",
    description: "Магазины, супермаркеты, шоурумы. Ремонт с учётом торгового оборудования и потоков покупателей.",
    features: ["Усиленные полы", "Торговое освещение", "Витринные зоны", "Системы безопасности"],
    price: "от 5 200 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Рестораны и кафе",
    description: "Кухонные зоны, обеденные залы, бары. Соответствие СанПиН, пожарным нормам и требованиям Роспотребнадзора.",
    features: ["Вентиляция кухни", "Водоснабжение", "Пожарная безопасность", "Дизайн интерьера"],
    price: "от 6 000 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Медицинские центры",
    description: "Клиники, стоматологии, лаборатории. Строгое соответствие санитарным нормам и требованиям лицензирования.",
    features: ["Бактерицидные покрытия", "Асептические зоны", "Мед. газы", "Требования СНиП"],
    price: "от 7 500 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Склады и производства",
    description: "Промышленные полы, ворота, эпоксидные покрытия. Ремонт под хранение, логистику и производство.",
    features: ["Наливные полы", "Противопожарные системы", "Промышленные ворота", "Стеллажные зоны"],
    price: "от 2 800 ₽/м²",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Банки и финансы",
    description: "Отделения банков, страховые офисы, кассовые зоны. Бронированные конструкции и системы доступа.",
    features: ["Защитные стекла", "Сейфовые комнаты", "СКУД системы", "Представительский вид"],
    price: "от 8 000 ₽/м²",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Наши услуги
            </span>
          </div>
          <h2
            className="section-title mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Ремонтируем любые
            <span className="text-gradient block">коммерческие объекты</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Комплексный ремонт под ключ — от разработки проекта до сдачи объекта.
            Работаем с объектами площадью от 50 до 5 000 м².
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-7 border border-slate-100 card-hover group"
            >
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-5 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>

              <h3
                className="text-xl font-bold text-slate-900 mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-orange-500 font-bold text-base">
                  {service.price}
                </span>
                <a
                  href="#contact"
                  className="text-slate-700 hover:text-orange-500 text-sm font-semibold flex items-center gap-1 transition-colors"
                >
                  Узнать больше
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-slate-500 mb-6">
            Не нашли свой тип объекта?{" "}
            <span className="text-slate-700 font-medium">
              Свяжитесь с нами — мы беремся за любые задачи.
            </span>
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Обсудить проект
          </a>
        </div>
      </div>
    </section>
  );
}
