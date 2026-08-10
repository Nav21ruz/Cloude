/* Калькулятор стоимости механизированной штукатурки.
   Ставки работы — прайс сайта. Цены материалов — средние розничные по
   строймагазинам Челябинска (Сатурн, август 2026), для ориентира; закупочная
   цена у исполнителя может отличаться — заменить на реальную при уточнении. */
(function () {
  'use strict';

  var form = document.getElementById('calc');
  if (!form) return;

  var RATES = {
    mix: { gypsum: 460, cement: 440 },          // ₽/м² — базовая работа со смесью
    surface: { walls: 0, ceiling: 90 },         // надбавка за потолок, ₽/м²
    beacons: { with: 0, without: -60 },         // без маяков дешевле
    finish: { paint: 70, wallpaper: 0, tile: 0 } // точные углы 90° и более тщательное заглаживание
  };

  /* Расход и цена материалов — ориентир, не привязан к базовой ставке работы. */
  var MATERIALS = {
    // кг сухой смеси на 1 м² при слое 10 мм — типовые значения производителей
    mixKgPerM2Per10mm: { gypsum: 8.5, cement: 17 },
    // ₽/кг — Сатурн, Челябинск: гипсовая ~470 ₽/30 кг, цементная ~340 ₽/25 кг
    mixPricePerKg: { gypsum: 470 / 30, cement: 340 / 25 },
    primerLPerM2: 0.15,   // л/м² на один слой грунтовки глубокого проникновения
    primerPricePerL: 70,  // ₽/л — Сатурн, Челябинск, среднее по бюджетным-средним маркам
    cornerPricePerM: 15   // ₽/пог. м защитного перфорированного уголка
  };

  var MIN_AREA = 30;   // м², минимальный выезд
  var DELIVERY = 4000; // ₽, доставка оборудования за пределы Челябинска

  var fmt = new Intl.NumberFormat('ru-RU');
  var fmt1 = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 });

  var out = {
    total: document.getElementById('calc-total'),
    rate: document.getElementById('calc-rate'),
    area: document.getElementById('calc-area'),
    laborTotal: document.getElementById('calc-labor-total'),
    extra: document.getElementById('calc-extra'),
    note: document.getElementById('calc-note'),
    mixKg: document.getElementById('calc-mix-kg'),
    mixCost: document.getElementById('calc-mix-cost'),
    primerL: document.getElementById('calc-primer-l'),
    primerCost: document.getElementById('calc-primer-cost'),
    cornerRow: document.getElementById('calc-corner-row'),
    cornerM: document.getElementById('calc-corner-m'),
    cornerCost: document.getElementById('calc-corner-cost'),
    materialsTotal: document.getElementById('calc-materials-total')
  };

  function pick(name) {
    var el = form.querySelector('input[name=' + name + ']:checked');
    return el ? el.value : null;
  }

  function recalc() {
    var area = parseFloat(form.elements.area.value);
    if (!isFinite(area) || area <= 0) area = 0;

    var thickness = parseFloat(form.elements.thickness.value);
    if (!isFinite(thickness) || thickness <= 0) thickness = 15;

    var corners = parseFloat(form.elements.corners.value);
    if (!isFinite(corners) || corners < 0) corners = 0;

    var mix = pick('mix');

    var rate = RATES.mix[mix] +
               RATES.surface[pick('surface')] +
               RATES.beacons[pick('beacons')] +
               RATES.finish[pick('finish')];

    var billable = Math.max(area, area > 0 ? MIN_AREA : 0);
    var extra = form.elements.outside.checked ? DELIVERY : 0;
    var laborTotal = billable * rate;

    var mixKg = billable * MATERIALS.mixKgPerM2Per10mm[mix] * (thickness / 10);
    var mixCost = mixKg * MATERIALS.mixPricePerKg[mix];
    var primerL = billable * MATERIALS.primerLPerM2;
    var primerCost = primerL * MATERIALS.primerPricePerL;
    var cornerCost = corners * MATERIALS.cornerPricePerM;
    var materialsTotal = mixCost + primerCost + cornerCost;

    var total = laborTotal + materialsTotal + extra;

    out.total.textContent = area ? fmt.format(Math.round(total)) + ' ₽' : '— ₽';
    out.rate.textContent = fmt.format(rate) + ' ₽/м²';
    out.area.textContent = area ? fmt.format(billable) + ' м²' : '—';
    out.laborTotal.textContent = area ? fmt.format(Math.round(laborTotal)) + ' ₽' : '—';
    out.extra.textContent = extra ? fmt.format(extra) + ' ₽' : 'нет';

    out.mixKg.textContent = area ? fmt1.format(mixKg) : '—';
    out.mixCost.textContent = area ? fmt.format(Math.round(mixCost)) + ' ₽' : '—';
    out.primerL.textContent = area ? fmt1.format(primerL) : '—';
    out.primerCost.textContent = area ? fmt.format(Math.round(primerCost)) + ' ₽' : '—';
    out.materialsTotal.textContent = area ? fmt.format(Math.round(materialsTotal)) + ' ₽' : '—';

    if (corners > 0) {
      out.cornerRow.hidden = false;
      out.cornerM.textContent = fmt1.format(corners);
      out.cornerCost.textContent = fmt.format(Math.round(cornerCost)) + ' ₽';
    } else {
      out.cornerRow.hidden = true;
    }

    out.note.textContent = area && area < MIN_AREA
      ? 'Объём меньше минимального: расчёт по ' + MIN_AREA + ' м².'
      : '';
  }

  form.addEventListener('input', recalc);
  form.addEventListener('change', recalc);
  recalc();
})();
