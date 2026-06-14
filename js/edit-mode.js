(function () {
  'use strict';

  if (location.pathname.includes('/admin')) return;

  /* ── FIELD MAP: data-field → path in content.json ── */
  const FM = {};
  FM['phone']          = ['contacts','phone'];
  FM['address']        = ['contacts','address'];
  FM['email']          = ['contacts','email'];
  FM['address-note']   = ['contacts','addressNote'];
  FM['hours-weekdays'] = ['contacts','hours','weekdays'];
  FM['hours-saturday'] = ['contacts','hours','saturday'];
  FM['hours-sunday']   = ['contacts','hours','sunday'];
  FM['home-about-label']   = ['pages','home','about_label'];
  FM['home-about-heading'] = ['pages','home','about_heading'];
  FM['home-about-tagline'] = ['pages','home','about_tagline'];
  FM['home-about-desc']    = ['pages','home','about_desc'];
  FM['home-feat1-title']   = ['pages','home','feat1_title'];
  FM['home-feat1-desc']    = ['pages','home','feat1_desc'];
  FM['home-feat2-title']   = ['pages','home','feat2_title'];
  FM['home-feat2-desc']    = ['pages','home','feat2_desc'];
  FM['home-feat3-title']   = ['pages','home','feat3_title'];
  FM['home-feat3-desc']    = ['pages','home','feat3_desc'];
  FM['about-story-label']      = ['pages','about','story_label'];
  FM['about-story-heading-em'] = ['pages','about','story_heading_em'];
  FM['about-story-quote']      = ['pages','about','story_quote'];
  FM['about-story-p1']         = ['pages','about','story_p1'];
  FM['about-story-p2']         = ['pages','about','story_p2'];
  FM['about-story-p3']         = ['pages','about','story_p3'];
  for (let i = 1; i <= 4; i++) {
    FM[`stat${i}-label`] = ['homePage',`stat${i}`,'label'];
    FM[`stat${i}-desc`]  = ['homePage',`stat${i}`,'desc'];
  }
  FM['process-label']   = ['homePage','process_label'];
  FM['process-heading'] = ['homePage','process_heading'];
  for (let i = 1; i <= 6; i++) {
    FM[`process${i}-title`] = ['homePage',`process${i}`,'title'];
    FM[`process${i}-desc`]  = ['homePage',`process${i}`,'desc'];
  }
  FM['services-label']   = ['homePage','services_label'];
  FM['services-heading'] = ['homePage','services_heading'];
  for (let i = 1; i <= 6; i++) {
    FM[`svc-card${i}-title`] = ['homePage',`svcCard${i}`,'title'];
    FM[`svc-card${i}-desc`]  = ['homePage',`svcCard${i}`,'desc'];
  }
  FM['cta-label']      = ['homePage','cta_label'];
  FM['cta-heading']    = ['homePage','cta_heading'];
  FM['cta-heading-em'] = ['homePage','cta_heading_em'];
  FM['cta-desc']       = ['homePage','cta_desc'];
  for (let i = 1; i <= 6; i++) {
    FM[`timeline${i}-year`]  = ['aboutPage','timeline',`item${i}`,'year'];
    FM[`timeline${i}-title`] = ['aboutPage','timeline',`item${i}`,'title'];
    FM[`timeline${i}-desc`]  = ['aboutPage','timeline',`item${i}`,'desc'];
  }
  FM['values-label']   = ['aboutPage','values_label'];
  FM['values-heading'] = ['aboutPage','values_heading'];
  for (let i = 1; i <= 4; i++) {
    FM[`value${i}-title`] = ['aboutPage',`value${i}`,'title'];
    FM[`value${i}-desc`]  = ['aboutPage',`value${i}`,'desc'];
  }
  FM['whyus-label']   = ['aboutPage','whyus_label'];
  FM['whyus-heading'] = ['aboutPage','whyus_heading'];
  for (let i = 1; i <= 4; i++) {
    FM[`whyus${i}-title`] = ['aboutPage',`whyus${i}`,'title'];
    FM[`whyus${i}-desc`]  = ['aboutPage',`whyus${i}`,'desc'];
  }
  for (let i = 1; i <= 5; i++) {
    FM[`svc${i}-heading`] = ['services',`svc${i}`,'heading'];
    FM[`svc${i}-desc`]    = ['services',`svc${i}`,'desc'];
    for (let j = 1; j <= 6; j++) FM[`svc${i}-check${j}`] = ['services',`svc${i}`,`check${j}`];
  }
  for (let i = 1; i <= 3; i++) {
    FM[`guarantee${i}-num`]   = ['services','guarantee',`item${i}`,'num'];
    FM[`guarantee${i}-title`] = ['services','guarantee',`item${i}`,'title'];
    FM[`guarantee${i}-desc`]  = ['services','guarantee',`item${i}`,'desc'];
  }
  FM['contact-heading']       = ['contactPage','heading'];
  FM['contact-quick-heading'] = ['contactPage','quickHeading'];
  for (let i = 1; i <= 3; i++) {
    FM[`reason${i}-title`] = ['contactPage',`reason${i}`,'title'];
    FM[`reason${i}-desc`]  = ['contactPage',`reason${i}`,'desc'];
    FM[`quick${i}-title`]  = ['contactPage',`quick${i}`,'title'];
    FM[`quick${i}-desc`]   = ['contactPage',`quick${i}`,'desc'];
  }

  /* ── UTILS ── */
  function setPath(obj, path, val) {
    let o = obj;
    for (let i = 0; i < path.length - 1; i++) {
      if (!o[path[i]]) o[path[i]] = {};
      o = o[path[i]];
    }
    o[path[path.length - 1]] = val;
  }

  function toast(msg, ok) {
    const t = document.getElementById('em-toast');
    if (!t) return;
    t.textContent = msg;
    t.style.borderColor = ok ? '#C9A84C' : '#f55';
    t.style.opacity = '1';
    setTimeout(() => { t.style.opacity = '0'; }, 3000);
  }

  /* Collect ALL unmapped text elements in document order (same logic used in load-content.js) */
  function getUnmappedEls() {
    const TAGS = new Set(['H1','H2','H3','H4','H5','H6','P','LI']);
    const seen = new Set();
    const result = [];
    document.querySelectorAll('main *, section *').forEach(el => {
      if (seen.has(el)) return;
      const tag = el.tagName;
      const hasClass = el.classList.contains('section-title') ||
                       el.classList.contains('section-label') ||
                       el.classList.contains('contact-label') ||
                       el.classList.contains('contact-note');
      if (!TAGS.has(tag) && !hasClass) return;
      if (el.closest('nav') || el.closest('footer') || el.closest('form')) return;
      if (el.closest('.modal-overlay') || el.closest('#preloader')) return;
      if (el.closest('#projects-home-grid') || el.closest('#projects-masonry-grid')) return;
      if (el.hasAttribute('data-field') || el.closest('[data-field]')) return;
      if (!el.textContent.trim()) return;
      seen.add(el);
      result.push(el);
    });
    return result;
  }

  function pageKey() {
    return location.pathname.replace(/^\/|\/$/g, '') || 'index';
  }

  let token = sessionStorage.getItem('em_pass') || '';

  function buildUI() {
    const css = document.createElement('style');
    css.textContent = `
      #em-bar{display:none;position:fixed;top:0;left:0;right:0;z-index:9901;background:#C9A84C;padding:0 20px;height:48px;align-items:center;gap:12px;font-family:Inter,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.3);}
      #em-bar-lbl{font-size:13px;font-weight:700;color:#000;flex:1;}
      .em-btn{border:none;border-radius:6px;padding:8px 18px;font:700 13px/1 Inter,sans-serif;cursor:pointer;transition:opacity .15s;}
      .em-btn:hover{opacity:.85;}
      #em-save{background:#000;color:#C9A84C;}
      #em-cancel{background:rgba(0,0,0,.15);color:#1a1a1a;}
      [contenteditable="true"]{outline:2px dashed rgba(201,168,76,.55)!important;border-radius:3px!important;min-height:1em!important;cursor:text!important;}
      [contenteditable="true"]:hover{outline:2px dashed #C9A84C!important;}
      [contenteditable="true"]:focus{outline:2px solid #C9A84C!important;background:rgba(201,168,76,.08)!important;}
      #em-overlay{display:none;position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.75);align-items:center;justify-content:center;}
      #em-box{background:#111;border:1px solid #2a2a2a;border-radius:14px;padding:32px;max-width:400px;width:90%;font-family:Inter,sans-serif;}
      #em-box h3{margin:0 0 6px;font-size:18px;color:#fff;}
      #em-box p{margin:0 0 20px;font-size:13px;color:#777;}
      #em-inp{width:100%;box-sizing:border-box;background:#0a0a0a;border:1px solid #333;border-radius:8px;padding:12px;color:#fff;font-size:14px;font-family:Inter,sans-serif;outline:none;}
      #em-inp:focus{border-color:#C9A84C;}
      #em-box-row{display:flex;gap:10px;margin-top:14px;}
      #em-ok{flex:1;background:#C9A84C;color:#000;border:none;border-radius:8px;padding:12px;font:700 14px/1 Inter,sans-serif;cursor:pointer;}
      #em-cl{background:#222;color:#888;border:none;border-radius:8px;padding:12px 18px;font:14px/1 Inter,sans-serif;cursor:pointer;}
      #em-err{display:none;color:#f66;font-size:13px;margin-top:10px;}
      #em-toast{position:fixed;bottom:24px;right:24px;z-index:9999;background:#111;color:#fff;border:1px solid #C9A84C;border-radius:8px;padding:11px 18px;font:14px/1.4 Inter,sans-serif;opacity:0;transition:opacity .3s;pointer-events:none;max-width:280px;}
    `;
    document.head.appendChild(css);

    document.body.insertAdjacentHTML('beforeend', `
      <div id="em-bar">
        <span id="em-bar-lbl">✏ Режим редактирования — кликайте на любой текст</span>
        <button class="em-btn" id="em-save">💾 Сохранить</button>
        <button class="em-btn" id="em-cancel">Отмена</button>
      </div>
      <div id="em-overlay">
        <div id="em-box">
          <h3>Пароль администратора</h3>
          <p>Введите пароль для входа в режим редактирования</p>
          <input id="em-inp" type="password" placeholder="Введите пароль">
          <div id="em-err">Неверный пароль</div>
          <div id="em-box-row">
            <button id="em-ok">Войти</button>
            <button id="em-cl">Отмена</button>
          </div>
        </div>
      </div>
      <div id="em-toast"></div>
    `);

    document.getElementById('em-save').addEventListener('click', save);
    document.getElementById('em-cancel').addEventListener('click', () => { if (confirm('Отменить все изменения?')) location.reload(); });
    document.getElementById('em-ok').addEventListener('click', tryLogin);
    document.getElementById('em-cl').addEventListener('click', closeModal);
    document.getElementById('em-inp').addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

    if (new URLSearchParams(location.search).get('edit') === '1') {
      try {
        const stored = localStorage.getItem('em_edit_pass');
        if (stored) { token = stored; sessionStorage.setItem('em_pass', stored); }
      } catch {}
      setTimeout(() => { if (token) enterEdit(); else openModal(); }, 1500);
    }
  }

  function openModal() { document.getElementById('em-overlay').style.display = 'flex'; document.getElementById('em-inp').focus(); }
  function closeModal() { document.getElementById('em-overlay').style.display = 'none'; document.getElementById('em-err').style.display = 'none'; }

  async function tryLogin() {
    const t = document.getElementById('em-inp').value.trim();
    if (!t) return;
    const btn = document.getElementById('em-ok');
    btn.textContent = 'Проверяем…'; btn.disabled = true;
    try {
      const r = await fetch('/admin/save.php?ping=1', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _pass: t }) });
      if (r.ok) { token = t; sessionStorage.setItem('em_pass', t); closeModal(); enterEdit(); }
      else { document.getElementById('em-err').style.display = 'block'; btn.textContent = 'Войти'; btn.disabled = false; }
    } catch { document.getElementById('em-err').style.display = 'block'; btn.textContent = 'Войти'; btn.disabled = false; }
  }

  function enterEdit() {
    document.getElementById('em-bar').style.display = 'flex';
    document.body.style.paddingTop = '48px';
    const nav = document.querySelector('.nav');
    if (nav) nav.style.top = '48px';

    /* 1. data-field elements (mapped directly to content.json paths) */
    document.querySelectorAll('[data-field]').forEach(el => {
      if (FM[el.dataset.field]) {
        el.contentEditable = 'true';
        el.addEventListener('paste', plainTextPaste);
      }
    });
    document.querySelectorAll('.counter[data-stat-field]').forEach(el => {
      el.textContent = (el.dataset.target || '0') + (el.dataset.suffix || '');
      el.contentEditable = 'true';
      el.addEventListener('paste', plainTextPaste);
    });

    /* 2. ALL other visible text elements (saved as page overrides) */
    getUnmappedEls().forEach((el, i) => {
      el.dataset.emN = String(i);
      el.contentEditable = 'true';
      el.addEventListener('paste', plainTextPaste);
    });
  }

  function plainTextPaste(e) { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')); }

  function exitEdit() {
    document.getElementById('em-bar').style.display = 'none';
    document.body.style.paddingTop = '';
    const nav = document.querySelector('.nav');
    if (nav) nav.style.top = '';
    document.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
      el.removeEventListener('paste', plainTextPaste);
      delete el.dataset.emN;
    });
  }

  async function save() {
    const btn = document.getElementById('em-save');
    btn.textContent = 'Сохраняем…'; btn.disabled = true;
    try {
      const r = await fetch('/data/content.json?t=' + Date.now());
      if (!r.ok) throw 0;
      const data = await r.json();

      /* Save data-field values */
      document.querySelectorAll('[data-field]').forEach(el => {
        const path = FM[el.dataset.field];
        if (path) setPath(data, path, el.textContent.trim());
      });
      document.querySelectorAll('.counter[data-stat-field]').forEach(el => {
        const field = el.dataset.statField;
        if (!field) return;
        const num = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) { data.stats = data.stats || {}; data.stats[field] = num; el.dataset.target = num; }
      });

      /* Save page overrides (unmapped elements) */
      const overrides = {};
      document.querySelectorAll('[data-em-n]').forEach(el => {
        overrides[el.dataset.emN] = el.innerHTML;
      });
      if (Object.keys(overrides).length > 0) {
        if (!data.pageOverrides) data.pageOverrides = {};
        data.pageOverrides[pageKey()] = overrides;
      }

      const pr = await fetch('/admin/save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({}, data, { _pass: token }))
      });
      if (!pr.ok) throw 0;
      toast('✓ Сохранено! Страница обновится.', true);
      setTimeout(() => { exitEdit(); location.reload(); }, 1500);
    } catch { toast('✗ Ошибка сохранения. Проверьте пароль.', false); btn.textContent = '💾 Сохранить'; btn.disabled = false; }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildUI);
  else buildUI();
})();
