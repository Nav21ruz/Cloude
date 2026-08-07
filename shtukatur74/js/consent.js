/* Cookie-баннер с реальным гейтингом аналитики.
   Яндекс.Метрика подключается ТОЛЬКО после явного согласия — ни строчки
   её кода не выполняется до клика «Принять». */
(function () {
  'use strict';

  var KEY = 'sh74_cookie_consent';
  var metrikaLoaded = false;

  function loadMetrika() {
    var id = (window.SITE && SITE.metrikaId || '').trim();
    if (!id || metrikaLoaded) return;
    metrikaLoaded = true;

    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); };
    window.ym.l = +new Date();

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://mc.yandex.ru/metrika/tag.js';
    document.head.appendChild(s);

    ym(id, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      referrer: document.referrer,
      url: location.href,
      // Вебвизор пишет движения мыши и содержимое страницы — это заметно
      // больше данных о посетителе, чем нужно для статистики. Включать
      // осознанно и после того, как это отражено в политике.
      webvisor: false
    });
  }

  function decide(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* приватный режим — решение живёт до перезагрузки */ }
    var bar = document.getElementById('cookie-bar');
    if (bar) bar.remove();
    document.body.classList.remove('has-cookie-bar');
    document.documentElement.style.removeProperty('--cookie-h');
    if (value === 'accepted') loadMetrika();
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* ignore */ }

  if (saved === 'accepted') { loadMetrika(); return; }
  if (saved === 'declined') return;

  var bar = document.createElement('div');
  bar.id = 'cookie-bar';
  bar.innerHTML =
    '<div class="cookie-inner">' +
      '<p>Мы используем cookie и сервис веб-аналитики Яндекс.Метрика, чтобы понимать, как посетители пользуются сайтом. ' +
      'Аналитика запускается только после вашего согласия. Подробнее — в ' +
      '<a href="privacy.html">политике конфиденциальности</a>.</p>' +
      '<div class="cookie-btns">' +
        '<button id="cookie-accept" type="button">Принять</button>' +
        '<button id="cookie-decline" type="button">Только необходимые</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(bar);
  document.body.classList.add('has-cookie-bar');

  function syncHeight() {
    document.documentElement.style.setProperty('--cookie-h', bar.offsetHeight + 'px');
  }
  syncHeight();
  window.addEventListener('resize', syncHeight);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHeight);

  document.getElementById('cookie-accept').addEventListener('click', function () { decide('accepted'); });
  document.getElementById('cookie-decline').addEventListener('click', function () { decide('declined'); });
})();
