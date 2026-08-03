/* Карта зоны выезда грузится только по клику: до этого момента
   Яндекс.Карты не получают ни одного запроса от посетителя. */
(function () {
  'use strict';

  var box = document.getElementById('map-box');
  if (!box) return;

  var btn = box.querySelector('#map-load');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var frame = document.createElement('iframe');
    // TODO: заменить на ссылку конструктора карт с отмеченной зоной выезда
    frame.src = 'https://yandex.ru/map-widget/v1/?ll=61.402554%2C55.159902&z=8';
    frame.title = 'Карта зоны выезда по Челябинской области';
    frame.loading = 'lazy';
    frame.allowFullscreen = true;
    frame.style.cssText = 'width:100%;height:420px;border:0;display:block';
    box.replaceChildren(frame);
  });
})();
