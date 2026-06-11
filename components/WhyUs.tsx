const advantages = [
  {
    number: "01",
    title: "В 4 раза быстрее ручного труда",
    description: "Машина наносит до 300 м² штукатурки в день. Один станок заменяет бригаду из 4–5 штукатуров. Сдаём объект в разы быстрее.",
    icon: "⚡",
  },
  {
    number: "02",
    title: "Фиксированная цена в договоре",
    description: "Прописываем стоимость до начала работ. Никаких внезапных доплат. Цена не меняется без вашего письменного согласия.",
    icon: "📋",
  },
  {
    number: "03",
    title: "Гарантия качества 3 года",
    description: "Официальная гарантия на все работы. Если появятся трещины или отслоения по нашей вине — устраним бесплатно.",
    icon: "🛡️",
  },
  {
    number: "04",
    title: "Профессиональное оборудование",
    description: "Работаем на машинах Knauf PFT, Putzmeister и m-tec. Только сертифицированные смеси от ведущих производителей.",
    icon: "🔧",
  },
  {
    number: "05",
    title: "Собственные опытные бригады",
    description: "Не субподряд — только проверенные специалисты в штате. Каждый мастер прошёл обучение у производителей смесей.",
    icon: "👷",
  },
  {
    number: "06",
    title: "Работаем по всей области",
    description: "Челябинск, Магнитогорск, Миасс, Копейск, Озёрск, Снежинск и другие города. Выезд на объект по области бесплатно.",
    icon: "📍",
  },
];

export default function WhyUs() {
  return (
    <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/25 rounded-full px-4 py-2 mb-6">
              <span className="text-orange-300 text-sm font-semibold uppercase tracking-wider">
                Почему выбирают нас
              </span>
            </div>
            <h2 className="section-title text-white mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>
              Машинная штукатурка —
              <span className="text-gradient block">это другой уровень</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Мы занимаемся только механизированной штукатуркой с 2016 года. За это время
              сдали более 500 объектов в Челябинской области — от однокомнатных квартир
              до многоэтажных жилых комплексов.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { number: "500+", label: "Объектов сдано" },
                { number: "8 лет", label: "Опыт работы" },
                { number: "120 000", label: "м² оштукатурено" },
                { number: "97%", label: "Клиентов довольны" },
              ].map((s) => (
                <div key={s.label} className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/50">
                  <div className="text-3xl font-black text-orange-400 leading-none mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {s.number}
                  </div>
                  <div className="text-slate-400 text-sm">{s.label}</div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary inline-flex">
              Записаться на замер
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {advantages.map((adv) => (
              <div
                key={adv.number}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/40 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{adv.icon}</span>
                  <div>
                    <div className="text-orange-400/60 text-xs font-bold tracking-widest mb-1">{adv.number}</div>
                    <h3 className="text-white font-bold text-sm mb-2 leading-snug">{adv.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{adv.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
