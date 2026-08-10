/* Отправка заявки. Согласие на обработку ПД проверяется здесь и повторно
   на сервере (api/request.php) — без галочки заявка не уходит ни при каких условиях. */
(function () {
  'use strict';

  document.querySelectorAll('form[data-request-form]').forEach(function (form) {
    var okBox = form.querySelector('.form-msg-ok');
    var errBox = form.querySelector('.form-msg-err');
    var btn = form.querySelector('button[type=submit]');

    function show(box, text) {
      [okBox, errBox].forEach(function (b) { if (b) b.classList.remove('show'); });
      if (!box) return;
      if (text) box.textContent = text;
      box.classList.add('show');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      var consentBox = form.querySelector('input[name=consent]');
      if (!consentBox || !consentBox.checked) {
        show(errBox, 'Отметьте согласие на обработку персональных данных — без него мы не вправе принять заявку.');
        consentBox && consentBox.focus();
        return;
      }
      data.consent = '1';

      if (!String(data.name || '').trim() || String(data.phone || '').replace(/\D/g, '').length < 10) {
        show(errBox, 'Укажите имя и телефон — по нему мы свяжемся для расчёта.');
        return;
      }

      var original = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Отправляем…'; }

      fetch('api/request.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (body) {
            if (!res.ok) throw new Error(body.error || 'Ошибка сервера');
            return body;
          });
        })
        .then(function () {
          form.reset();
          show(okBox, 'Заявка отправлена. Перезвоним в течение рабочего дня.');
          if (window.ym && SITE.metrikaId) ym(SITE.metrikaId, 'reachGoal', 'form_sent');
        })
        .catch(function (err) {
          show(errBox, err.message + '. Позвоните нам: ' + SITE.phone);
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  });
})();
