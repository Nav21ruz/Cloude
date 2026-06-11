const reviews = [
  {
    name: "Андрей Соловьёв",
    role: "Застройщик, ООО «УралСтрой»",
    avatar: "АС",
    text: "Сотрудничаем с МехШтукатур74 уже третий год. Сдали три жилых комплекса суммарно 18 000 м². Всегда в срок, качество стабильное. Цена на 15% ниже, чем у конкурентов за то же самое. Рекомендуем всем застройщикам.",
    rating: 5,
    project: "ЖК «Северный парк», 4 800 м²",
  },
  {
    name: "Елена Крылова",
    role: "Владелец квартиры",
    avatar: "ЕК",
    text: "Делали штукатурку в новой квартире 94 м². Приехали на следующий день после звонка, всё измерили, сделали смету. За 4 дня — всё готово. Стены идеально ровные, прораб показал как проверить уровнем. Очень довольна.",
    rating: 5,
    project: "Квартира 94 м², Северо-Запад",
  },
  {
    name: "Игорь Петренко",
    role: "Прораб, строительная компания",
    avatar: "ИП",
    text: "Работаем с ребятами на коммерческих объектах. Торговый центр 2200 м² сделали за 12 дней — это нереальный темп для ручного труда. Документация в порядке, акты подписываем без замечаний. Буду обращаться ещё.",
    rating: 5,
    project: "ТЦ «Горки», 2 200 м²",
  },
  {
    name: "Марина Тихонова",
    role: "Хозяйка коттеджа",
    avatar: "МТ",
    text: "Строили коттедж в Сосновом Бору, нужна была штукатурка внутри и фасад. Бригада приехала вовремя, работали аккуратно. Особенно понравился фасад — декоративная штукатурка под шубу смотрится отлично. Гарантийный талон выдали.",
    rating: 5,
    project: "Коттедж 320 м², Сосновый Бор",
  },
  {
    name: "Дмитрий Захаров",
    role: "Технадзор, ЖСК",
    avatar: "ДЗ",
    text: "Проверял качество работ на сдаче. Отклонение не более 1,5 мм на 2 м — это очень хороший результат. Все углы ровные, поверхность однородная. Документация соответствует требованиям. Рекомендую как технадзорщик.",
    rating: 5,
    project: "ЖК «Видный», Магнитогорск",
  },
  {
    name: "Ольга Сергеева",
    role: "Дизайнер интерьеров",
    avatar: "ОС",
    text: "Часто рекомендую клиентам МехШтукатур74. Стены получаются действительно готовые под покраску — без дополнительного шпатлевания. Это экономит время и деньги. Сотрудничаем уже 2 года, ни разу не подвели.",
    rating: 5,
    project: "Несколько квартир, Челябинск",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Отзывы клиентов
            </span>
          </div>
          <h2 className="section-title mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
            Нас рекомендуют
            <span className="text-gradient block">застройщики и жители</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            97% клиентов оценивают нашу работу на «отлично». Вот что они говорят.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.name} className="bg-slate-50 rounded-2xl p-7 border border-slate-100 card-hover flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f97316" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">"{review.text}"</p>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 gradient-orange rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                    <div className="text-slate-400 text-xs">{review.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-orange-500 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                  {review.project}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-slate-900 rounded-3xl p-10 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#f97316" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-3xl font-black text-white mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
            4.9 / 5 — средняя оценка
          </p>
          <p className="text-slate-400 mb-8">На основе 200+ отзывов на Яндекс.Картах, 2ГИС и авито</p>
          <a href="#contact" className="btn-primary inline-flex">
            Стать нашим клиентом
          </a>
        </div>
      </div>
    </section>
  );
}
