/* Калькулятор стоимости механизированной штукатурки.
   Ставки предварительные — заменить на согласованный прайс перед публикацией. */
(function () {
  'use strict';

  var form = document.getElementById('calc');
  if (!form) return;

  var RATES = {
    mix: { gypsum: 460, cement: 440 },          // ₽/м² — базовая работа со смесью
    surface: { walls: 0, ceiling: 90 },         // надбавка за потолок, ₽/м²
    beacons: { with: 0, without: -60 },         // без маяков дешевле
    finish: { paint: 70, wallpaper: 0, tile: 0 } // под покраску нужно заглаживание
  };

  var MIN_AREA = 30;   // м², минимальный выезд
  var DELIVERY = 4000; // ₽, доставка оборудования за пределы Челябинска

  var fmt = new Intl.NumberFormat('ru-RU');

  var out = {
    total: document.getElementById('calc-total'),
    rate: document.getElementById('calc-rate'),
    area: document.getElementById('calc-area'),
    extra: document.getElementById('calc-extra'),
    note: document.getElementById('calc-note')
  };

  function pick(name) {
    var el = form.querySelector('input[name=' + name + ']:checked');
    return el ? el.value : null;
  }

  function recalc() {
    var area = parseFloat(form.elements.area.value);
    if (!isFinite(area) || area <= 0) area = 0;

    var rate = RATES.mix[pick('mix')] +
               RATES.surface[pick('surface')] +
               RATES.beacons[pick('beacons')] +
               RATES.finish[pick('finish')];

    var billable = Math.max(area, area > 0 ? MIN_AREA : 0);
    var extra = form.elements.outside.checked ? DELIVERY : 0;
    var total = billable * rate + extra;

    out.total.textContent = area ? fmt.format(Math.round(total)) + ' ₽' : '— ₽';
    out.rate.textContent = fmt.format(rate) + ' ₽/м²';
    out.area.textContent = area ? fmt.format(billable) + ' м²' : '—';
    out.extra.textContent = extra ? fmt.format(extra) + ' ₽' : 'нет';

    out.note.textContent = area && area < MIN_AREA
      ? 'Объём меньше минимального: расчёт по ' + MIN_AREA + ' м².'
      : '';
  }

  form.addEventListener('input', recalc);
  form.addEventListener('change', recalc);
  recalc();
})();
