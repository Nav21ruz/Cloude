export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <div
                  className="text-white font-black text-xl leading-none"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  КомСтрой<span className="text-orange-400">74</span>
                </div>
                <div className="text-slate-500 text-xs tracking-widest uppercase mt-0.5">
                  Челябинск
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Профессиональный ремонт коммерческих помещений в Челябинске с 2012
              года. Офисы, магазины, рестораны, медицинские центры.
            </p>
            <div className="flex gap-3">
              {/* VK */}
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="ВКонтакте"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.579 6.855c.14-.465 0-.806-.666-.806h-2.193c-.558 0-.816.295-.956.620 0 0-1.116 2.719-2.695 4.482-.512.513-.745.677-1.024.677-.139 0-.341-.164-.341-.629V6.855c0-.558-.161-.806-.626-.806H9.73c-.348 0-.558.259-.558.504 0 .528.79.651.871 2.139v3.233c0 .707-.128.836-.407.836-.745 0-2.557-2.731-3.631-5.858-.209-.611-.42-.855-.98-.855H2.832c-.627 0-.752.295-.752.620 0 .582.745 3.462 3.466 7.273 1.816 2.604 4.371 4.016 6.697 4.016 1.395 0 1.568-.314 1.568-.854v-1.969c0-.628.133-.753.576-.753.326 0 .885.163 2.191 1.42 1.493 1.493 1.739 2.156 2.578 2.156h2.194c.626 0 .939-.314.759-.933-.198-.617-.911-1.513-1.857-2.574-.512-.605-1.281-1.256-1.513-1.582-.326-.42-.233-.605 0-.977 0 0 2.674-3.765 2.952-5.044z"/>
                </svg>
              </a>
              {/* Telegram */}
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="#"
                className="w-9 h-9 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white font-bold text-base mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Услуги
            </h4>
            <ul className="space-y-2.5">
              {[
                "Ремонт офисов",
                "Ремонт магазинов",
                "Ремонт ресторанов",
                "Медицинские объекты",
                "Склады и производства",
                "Банки и финансы",
                "Дизайн-проект",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-white font-bold text-base mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Компания
            </h4>
            <ul className="space-y-2.5">
              {[
                { l: "О компании", h: "#about" },
                { l: "Портфолио", h: "#portfolio" },
                { l: "Отзывы", h: "#testimonials" },
                { l: "Этапы работы", h: "#process" },
                { l: "Контакты", h: "#contact" },
              ].map((item) => (
                <li key={item.l}>
                  <a
                    href={item.h}
                    className="text-sm hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full flex-shrink-0" />
                    {item.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4
              className="text-white font-bold text-base mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Контакты
            </h4>
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Телефон</div>
                <a href="tel:+73512000000" className="text-white font-bold text-lg hover:text-orange-400 transition-colors">
                  +7 (351) 200-00-00
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Email</div>
                <a href="mailto:info@komstroy74.ru" className="hover:text-orange-400 transition-colors text-sm">
                  info@komstroy74.ru
                </a>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Адрес</div>
                <p className="text-sm">г. Челябинск,<br />ул. Труда, 164, оф. 301</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Работаем</div>
                <p className="text-sm">Пн–Пт: 9:00–18:00<br />Сб: 10:00–15:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© 2024 КомСтрой74. Все права защищены. ИНН 7451234567</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-400 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-orange-400 transition-colors">
              Реквизиты
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
