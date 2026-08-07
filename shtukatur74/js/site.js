/* Единая точка правки контактов — используется в шапке, футере и плавающих кнопках.
   Пустое значение = блок с этим контактом просто не выводится. */
window.SITE = {
  phone: '+7 (909) 085-64-51',
  phoneRaw: '+79090856451',
  whatsapp: '79090856451',
  telegram: '',                       // TODO: username Telegram без «@»
  email: 'info@tektonpro.ru',
  /* Заготовка первого сообщения в WhatsApp. Пустое значение = ссылка без текста. */
  waText: 'Здравствуйте! Нужна механизированная штукатурка. Объект: ___, площадь стен примерно ___ м².',
  metrikaId: '',                      // TODO: номер счётчика Яндекс.Метрики (пусто = не подключать)

  /* Плавающая круглая кнопка WhatsApp отключена: в закреплённых остаётся
     только звонок. Ссылки на WhatsApp в тексте страниц при этом работают. */
  floatingWhatsapp: false,

  /* Формы сбора персональных данных.
     false — на сайте нет ни одной формы: заявки принимаются только по телефону
     и в мессенджерах. Переключать на true ТОЛЬКО после подачи уведомления
     в Роскомнадзор об обработке ПД. Серверная часть блокируется отдельно —
     константой FORMS_ENABLED в api/request.php, её нужно переключить тоже. */
  formsEnabled: true
};

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      var wt = el.dataset.waText || SITE.waText || '';
      el.href = 'https://wa.me/' + SITE.whatsapp + (wt ? '?text=' + encodeURIComponent(wt) : '');
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

  /* ---------- Плавный переход по якорю ----------
     После прокрутки ставим фокус в первое поле формы: посетитель, пришедший
     по кнопке «Оставить заявку», сразу печатает, а не ищет курсором поле.
     Клавиатурная навигация и скринридеры получают то же самое. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]:not([href="#"])');
    if (!a) return;
    var target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    var field = target.querySelector('input:not([type=hidden]):not([tabindex="-1"]), textarea');
    if (field) setTimeout(function () { field.focus({ preventScroll: true }); }, calm ? 0 : 500);
  });

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
    // Кнопку-CTA не помечаем: правило .active перекрасило бы её текст
    // в цвет заливки, и надпись пропала бы.
    if (a.classList.contains('btn')) return;
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  /* ---------- Плавающие кнопки мессенджеров ---------- */
  if (!document.getElementById('messengers')) {
    var buttons = '';
    if (SITE.whatsapp && SITE.floatingWhatsapp) {
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

  /* ---------- Липкая панель действия на мобильных ----------
     Пока форм нет, звонок — основной способ оставить заявку,
     поэтому кнопка всегда под большим пальцем. */
  if (!document.getElementById('sticky-cta') && SITE.phoneRaw) {
    var bar = document.createElement('div');
    bar.id = 'sticky-cta';
    bar.innerHTML = '<a class="sticky-call" href="tel:' + SITE.phoneRaw + '">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>' +
      'Позвонить ' + SITE.phone + '</a>';
    document.body.appendChild(bar);
    document.body.classList.add('has-sticky-cta');
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

  /* ---------- Первый экран ---------- */
  var hero = document.querySelector('.hero');
  if (hero) requestAnimationFrame(function () { hero.classList.add('hero-ready'); });

  /* ---------- Цифры в первом экране набегают ----------
     Анимируем только числовую часть, остальное («м²», «от», «₽») остаётся
     как есть, поэтому разметку менять не нужно. */
  document.querySelectorAll('.hero-stat b').forEach(function (el) {
    var raw = el.textContent;
    var nums = raw.match(/\d+/g);
    if (!nums || calm) return;

    var targets = nums.map(Number);
    var parts = raw.split(/\d+/);
    var started = false;

    function render(progress) {
      var out = '';
      for (var i = 0; i < parts.length; i++) {
        out += parts[i];
        if (i < targets.length) out += Math.round(targets[i] * progress);
      }
      el.textContent = out;
    }

    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || started) return;
        started = true;
        seen.unobserve(el);
        var t0 = performance.now(), dur = 900;
        (function step(now) {
          var p = Math.min((now - t0) / dur, 1);
          render(1 - Math.pow(1 - p, 3));          // замедление к концу
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = raw;               // возвращаем исходный текст
        })(t0);
      });
    }, { threshold: .6 });
    seen.observe(el);
  });

  /* ---------- Полоса прочитанного и уплотнение шапки ---------- */
  var nav = document.querySelector('.nav');
  var progress = null;
  if (!calm) {
    progress = document.createElement('div');
    progress.id = 'read-progress';
    document.body.appendChild(progress);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      }
      if (nav) nav.classList.toggle('scrolled', y > 80);
      // закреплённая кнопка выезжает, когда первый экран прокручен
      document.body.classList.toggle('sticky-shown', y > 240);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
