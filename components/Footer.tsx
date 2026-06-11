export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 12h18M3 6h18M3 18h12" />
                </svg>
              </div>
              <div>
                <div className="text-white font-black text-lg" style={{ fontFamily: "var(--font-montserrat)" }}>
                  МехШтукатур<span className="text-orange-400">74</span>
                </div>
                <div className="text-slate-500 text-xs">Челябинская область</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Профессиональная механизированная штукатурка стен, потолков и фасадов в Челябинске и по всей области с 2016 года.
            </p>
            <div className="flex gap-3">
              {[
                { label: "VK", href: "#" },
                { label: "WA", href: "https://wa.me/73512000000" },
                { label: "TG", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center text-xs font-bold text-slate-400 hover:text-white transition-all duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-3 text-sm">
              {[
                "Штукатурка стен",
                "Штукатурка потолков",
                "Фасадная штукатурка",
                "Штукатурка новостроек",
                "Штукатурка под ключ",
                "Срочная штукатурка",
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-orange-400 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Города</h4>
            <ul className="space-y-3 text-sm">
              {[
                "Челябинск",
                "Магнитогорск",
                "Миасс",
                "Копейск",
                "Озёрск",
                "Снежинск",
                "Троицк",
                "Сатка",
              ].map((c) => (
                <li key={c}>
                  <span className="hover:text-orange-400 transition-colors cursor-default">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Контакты</h4>
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs mb-1">Телефон</div>
                <a href="tel:+73512000000" className="text-white hover:text-orange-400 transition-colors font-semibold">
                  +7 (351) 200-00-00
                </a>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Email</div>
                <a href="mailto:info@mehshtukatyr74.ru" className="hover:text-orange-400 transition-colors">
                  info@мехштукатур74.рф
                </a>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Адрес</div>
                <span>Челябинск, ул. Труда, 156, офис 4</span>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Время работы</div>
                <span>Пн–Пт: 8:00–20:00</span><br />
                <span>Сб: 9:00–18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-slate-600">
          <div>© {currentYear} МехШтукатур74. Все права защищены.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
