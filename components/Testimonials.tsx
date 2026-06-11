const reviews = [
  {
    name: "Андрей Митрофанов",
    role: "Генеральный директор, ООО «Синара-ТМ»",
    avatar: "АМ",
    text: "Заказывали ремонт офиса 1200 м². Сдали ровно в срок, как и договаривались. Качество работ превзошло ожидания — особенно понравились акустические решения в переговорных комнатах. Всё аккуратно, без мусора, без лишних вопросов. Рекомендую без сомнений.",
    rating: 5,
    date: "Ноябрь 2024",
    type: "Офис 1200 м²",
  },
  {
    name: "Светлана Козлова",
    role: "Владелец, кафе «Берёзка»",
    avatar: "СК",
    text: "Делали ремонт кафе 180 м² под ключ. Прораб был на связи 24/7, отвечал на любые вопросы. Очень важно было всё сделать по СанПиНу для Роспотребнадзора — с этим справились отлично. Открылись без единого замечания.",
    rating: 5,
    date: "Август 2024",
    type: "Ресторан 180 м²",
  },
  {
    name: "Игорь Степанов",
    role: "Директор по развитию, сеть «Монетка»",
    avatar: "ИС",
    text: "Уже третий магазин с КомСтрой74. Работают быстро, держат бюджет, умеют работать в сжатые сроки. Для торговых объектов это критично — каждый день простоя стоит денег. Ни разу не подвели.",
    rating: 5,
    date: "Сентябрь 2024",
    type: "Торговый объект 850 м²",
  },
  {
    name: "Марина Федорова",
    role: "Главный врач, «Евромед Клиник»",
    avatar: "МФ",
    text: "Очень сложный объект — медицинский центр с операционной зоной. Требования серьёзные. КомСтрой74 разобрались в нормативной базе лучше многих. Сдали с первого раза, лицензию получили без вопросов.",
    rating: 5,
    date: "Июнь 2024",
    type: "Медцентр 650 м²",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
            <span className="text-orange-600 text-sm font-semibold uppercase tracking-wider">
              Отзывы клиентов
            </span>
          </div>
          <h2
            className="section-title mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Нам доверяют
            <span className="text-gradient block">380+ компаний</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Реальные отзывы руководителей компаний, с которыми мы работали
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-orange-200 hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#f97316"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-slate-700 text-base leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 gradient-orange rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold text-sm">
                      {review.name}
                    </div>
                    <div className="text-slate-400 text-xs">{review.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-500 text-xs font-semibold">
                    {review.type}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-14 bg-slate-900 rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { n: "4.9/5", l: "Средняя оценка" },
            { n: "380+", l: "Отзывов написано" },
            { n: "94%", l: "Повторных заказов" },
            { n: "87%", l: "Приходят по рекомендации" },
          ].map((s) => (
            <div key={s.l}>
              <div
                className="text-2xl font-black text-orange-400 mb-1"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {s.n}
              </div>
              <div className="text-slate-400 text-xs uppercase tracking-wide">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
