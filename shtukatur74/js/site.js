/* Единая точка правки контактов — используется в шапке, футере и плавающих кнопках.
   Пустое значение = блок с этим контактом просто не выводится. */
window.SITE = {
  phone: '+7 (909) 085-64-51',
  phoneRaw: '+79090856451',
  whatsapp: '79090856451',
  telegram: '',                       // TODO: username Telegram без «@»
  email: 'navruz@dumaev.ru',          // TODO: перевести на ящик домена shtukatur74.ru
  metrikaId: '',                      // TODO: номер счётчика Яндекс.Метрики (пусто = не подключать)

  /* Формы сбора персональных данных.
     false — на сайте нет ни одной формы: заявки принимаются только по телефону
     и в мессенджерах. Переключать на true ТОЛЬКО после подачи уведомления
     в Роскомнадзор об обработке ПД. Серверная часть блокируется отдельно —
     константой FORMS_ENABLED в api/request.php, её нужно переключить тоже. */
  formsEnabled: false
};

(function () {
  'use strict';

  /* ---------- Контакты в разметке ----------
     Любой элемент с data-site="phone|email|whatsapp|telegram" получает
     нужный href/текст — номер меняется в одном месте, а не в шести файлах. */
  document.querySelectorAll('[data-site]').forEach(function (el) {
    var key = el.dataset.site;
    var value = key === 'phone' ? SITE.phoneRaw : SITE[key];

    if (!value) {
      // Контакт не заполнен — убираем ссылку вместе с её блоком, если он размечен.
      (el.closest('[data-site-item]') || el).remove();
      return;
    }

    if (key === 'phone') {
      el.href = 'tel:' + SITE.phoneRaw;
      if (!el.dataset.keepText) el.textContent = SITE.phone;
    } else if (key === 'email') {
      el.href = 'mailto:' + SITE.email;
      if (!el.dataset.keepText) el.textContent = SITE.email;
    } else if (key === 'whatsapp') {
      el.href = 'https://wa.me/' + SITE.whatsapp;
    } else if (key === 'telegram') {
      el.href = 'https://t.me/' + SITE.telegram;
    }
  });

  /* ---------- Формы заявки ----------
     Разметка формы лежит в <template> и попадает в страницу только при
     formsEnabled === true. Пока флаг выключен, формы нет в DOM вообще —
     отправить её нечем, а не «спрятана стилями». */
  document.querySelectorAll('[data-form-slot]').forEach(function (slot) {
    var tpl = document.querySelector('[data-form-template]');
    if (!SITE.formsEnabled || !tpl) return;
    slot.replaceChildren(tpl.content.cloneNode(true));
  });

  /* ---------- Навигация ----------
     Источник истины — <ul class="nav-links"> в шапке страницы (она в HTML,
     значит индексируется поисковиками). Мобильное меню и меню в футере
     клонируются из неё, поэтому рассинхрон при добавлении страницы невозможен. */
  var navLinks = document.querySelector('.nav-links');
  var mobileMenu = document.querySelector('.nav-mobile');
  var footerNav = document.getElementById('footer-nav');

  function cloneLinks(target, cls) {
    if (!navLinks || !target) return;
    target.innerHTML = '';
    navLinks.querySelectorAll('a').forEach(function (a) {
      var copy = document.createElement('a');
      copy.href = a.getAttribute('href');
      copy.textContent = a.textContent;
      if (cls) copy.className = cls;
      target.appendChild(copy);
    });
  }

  cloneLinks(mobileMenu);
  cloneLinks(footerNav);

  if (mobileMenu) {
    var cta = document.createElement('a');
    cta.href = 'contacts.html';
    cta.className = 'btn btn-primary nav-mobile-cta';
    cta.textContent = SITE.formsEnabled ? 'Оставить заявку' : 'Связаться с нами';
    mobileMenu.appendChild(cta);

    var phone = document.createElement('a');
    phone.href = 'tel:' + SITE.phoneRaw;
    phone.className = 'nav-mobile-cta btn btn-ghost';
    phone.textContent = SITE.phone;
    mobileMenu.appendChild(phone);
  }

  var burger = document.querySelector('.nav-burger');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var open = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  }

  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  /* ---------- Плавающие кнопки мессенджеров ---------- */
  if (!document.getElementById('messengers')) {
    var buttons = '';
    if (SITE.whatsapp) {
      buttons +=
        '<a class="msg-wa" href="https://wa.me/' + SITE.whatsapp + '" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.4.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.3-2.8-1.3-4.4 0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.5 8.3-8 8.3z"/></svg></a>';
    }
    if (SITE.telegram) {
      buttons +=
        '<a class="msg-tg" href="https://t.me/' + SITE.telegram + '" target="_blank" rel="noopener" aria-label="Написать в Telegram">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.6 6.9-1.6 7.5c-.1.5-.4.7-.9.4l-2.5-1.8-1.2 1.1c-.1.1-.3.3-.6.3l.2-2.5 4.6-4.1c.2-.2 0-.3-.3-.1L8.6 13l-2.4-.8c-.5-.2-.5-.5.1-.8l9.4-3.6c.4-.1.8.1.9.6z"/></svg></a>';
    }
    if (buttons) {
      var box = document.createElement('div');
      box.id = 'messengers';
      box.innerHTML = buttons;
      document.body.appendChild(box);
    }
  }

  /* ---------- Появление блоков при скролле ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
})();
