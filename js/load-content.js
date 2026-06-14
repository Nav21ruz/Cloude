let CAT_LABELS = {
  office: 'Офис', retail: 'Магазин', restaurant: 'Ресторан',
  medical: 'Медицина', warehouse: 'Склад', horeca: 'HoReCa'
};

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function gdrive(url) {
  if (!url) return '';
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w800`;
  return url;
}

function projectCardHome(p) {
  const bg = gdrive(p.image);
  const bgStyle = bg ? `background-image:url('${esc(bg)}');background-size:cover;background-position:center;` : '';
  const cat = esc(CAT_LABELS[p.category] || p.category);
  const loc = [p.location, p.year].filter(Boolean).map(esc).join(', ');
  return `
    <div class="proj-card-bg" style="${bgStyle}"></div>
    <div class="proj-card-overlay"></div>
    <div class="proj-card-content">
      <div class="proj-card-cat">${cat}</div>
      <h3>${esc(p.title)}</h3>
      <div class="proj-card-meta">
        ${p.area ? `<span>${esc(p.area)}</span>` : ''}
        ${loc ? `<span>${loc}</span>` : ''}
      </div>
    </div>`;
}

function projectCardMasonry(p) {
  const bg = gdrive(p.image);
  const bgStyle = bg ? `background-image:url('${esc(bg)}');background-size:cover;background-position:center;` : '';
  const heightStyle = p.tall ? 'padding-bottom:140%' : '';
  const cat = esc(CAT_LABELS[p.category] || p.category);
  return `
    <div class="project-item${p.tall ? ' tall' : ''}" data-cat="${esc(p.category)}" style="transition:opacity 0.3s,transform 0.3s;">
      <div class="project-item-bg" style="${bgStyle}${heightStyle ? ';' + heightStyle : ''}"></div>
      <div class="project-item-overlay"></div>
      <div class="project-item-info">
        <div class="project-item-cat">${cat}</div>
        <h3>${esc(p.title)}</h3>
        <div class="project-item-meta">
          ${p.area ? `<span>${esc(p.area)}</span>` : ''}
          ${p.year ? `<span>${esc(p.year)}</span>` : ''}
          ${p.duration ? `<span>${esc(p.duration)}</span>` : ''}
        </div>
      </div>
    </div>`;
}

const sf = (field, val) => {
  if (val == null || val === '') return;
  document.querySelectorAll(`[data-field="${field}"]`).forEach(el => el.textContent = val);
};

fetch('/data/content.json?t=' + Date.now())
  .then(r => r.ok ? r.json() : null)
  .catch(() => null)
  .then(data => {
    if (!data) return;

    /* ── CATEGORIES ── */
    if (data.categories) {
      Object.assign(CAT_LABELS, data.categories);
      document.querySelectorAll('[data-filter-label]').forEach(btn => {
        const key = btn.dataset.filterLabel;
        if (data.categories[key]) btn.textContent = data.categories[key];
      });
    }

    /* ── HERO IMAGE ── */
    if (data.hero && data.hero.image) {
      const bg = gdrive(data.hero.image);
      if (bg) {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
          heroBg.style.backgroundImage = `url('${bg}')`;
          heroBg.style.backgroundSize = 'cover';
          heroBg.style.backgroundPosition = 'center';
        }
      }
    }

    /* ── ABOUT IMAGE ── */
    if (data.about && data.about.image) {
      const bg = gdrive(data.about.image);
      if (bg) {
        const el = document.querySelector('.about-visual-img');
        if (el) {
          el.style.backgroundImage = `url('${bg}')`;
          el.style.backgroundSize = 'cover';
          el.style.backgroundPosition = 'center';
        }
      }
    }

    /* ── PROJECTS HOME ── */
    const homeGrid = document.getElementById('projects-home-grid');
    if (homeGrid && data.projects) {
      const featured = data.projects
        .filter(p => p.featured)
        .sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0));
      if (featured.length >= 1) {
        homeGrid.innerHTML = `
          <div class="proj-card large reveal-left">${projectCardHome(featured[0])}</div>
          <div class="reveal">
            ${featured[1] ? `<div class="proj-card" style="margin-bottom:16px;">${projectCardHome(featured[1])}</div>` : ''}
            ${featured[2] ? `<div class="proj-card">${projectCardHome(featured[2])}</div>` : ''}
          </div>`;
        homeGrid.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => el.classList.add('visible'));
      }
    }

    /* ── PROJECTS MASONRY ── */
    const masonry = document.getElementById('projects-masonry-grid');
    if (masonry && data.projects) {
      masonry.innerHTML = data.projects.map(projectCardMasonry).join('');
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const f = btn.dataset.filter;
          masonry.querySelectorAll('.project-item').forEach(item => {
            const show = f === 'all' || item.dataset.cat === f;
            item.style.opacity = '0'; item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = show ? '' : 'none';
              if (show) requestAnimationFrame(() => {
                item.style.opacity = '1'; item.style.transform = 'scale(1)';
              });
            }, 200);
          });
        });
      });
    }

    /* ── CONTACTS ── */
    const set = (sel, val) => { document.querySelectorAll(sel).forEach(el => { if (val) el.textContent = val; }); };
    const setHref = (sel, val) => { document.querySelectorAll(sel).forEach(el => { if (val) el.href = val; }); };

    if (data.contacts) {
      const c = data.contacts;
      set('[data-field="phone"]', c.phone);
      set('[data-field="address"]', c.address);
      set('[data-field="email"]', c.email);
      set('[data-field="address-note"]', c.addressNote);
      setHref('[data-field="phone-link"]', `tel:${c.phoneRaw}`);
      setHref('[data-field="email-link"]', `mailto:${c.email}`);
      setHref('[data-field="wa-link"]', `https://wa.me/${c.whatsapp}`);
      setHref('[data-field="tg-link"]', `https://t.me/${c.telegram}`);
      if (c.vk) setHref('[data-field="vk-link"]', c.vk);
      if (c.hours) {
        set('[data-field="hours-weekdays"]', c.hours.weekdays);
        set('[data-field="hours-saturday"]', c.hours.saturday);
        set('[data-field="hours-sunday"]', c.hours.sunday);
      }
    }

    /* ── STATS ── */
    if (data.stats) {
      const s = data.stats;
      document.querySelectorAll('.counter').forEach(el => {
        const field = el.dataset.statField;
        if (field && s[field] !== undefined) {
          el.dataset.target = s[field];
          const suffix = el.dataset.suffix || '';
          if (typeof animateCounter === 'function') {
            animateCounter(el, s[field], suffix);
          } else {
            el.textContent = s[field] + suffix;
          }
        }
      });
    }

    /* ── PAGES (home about + about story) ── */
    if (data.pages) {
      const h = data.pages.home || {};
      const a = data.pages.about || {};

      sf('home-about-label', h.about_label);
      sf('home-about-heading', h.about_heading);
      sf('home-about-tagline', h.about_tagline);
      if (h.about_desc) {
        document.querySelectorAll('[data-field="home-about-desc"]').forEach(el => {
          el.textContent = h.about_desc;
          el.style.display = '';
        });
      }
      sf('home-feat1-title', h.feat1_title);
      sf('home-feat1-desc', h.feat1_desc);
      sf('home-feat2-title', h.feat2_title);
      sf('home-feat2-desc', h.feat2_desc);
      sf('home-feat3-title', h.feat3_title);
      sf('home-feat3-desc', h.feat3_desc);

      sf('about-story-label', a.story_label);
      sf('about-story-heading-em', a.story_heading_em);
      sf('about-story-quote', a.story_quote);
      sf('about-story-p1', a.story_p1);
      sf('about-story-p2', a.story_p2);
      sf('about-story-p3', a.story_p3);

      if (data.stats && data.stats.years) {
        document.querySelectorAll('[data-field="about-story-heading"]').forEach(el => {
          el.textContent = data.stats.years + ' ' + (a.story_heading || 'лет строим');
        });
        document.querySelectorAll('[data-field="about-badge-years"]').forEach(el => {
          el.textContent = data.stats.years;
        });
      }
    }

    /* ── HOME PAGE EXTRA ── */
    if (data.homePage) {
      const hp = data.homePage;
      for (let i = 1; i <= 4; i++) {
        const s = hp[`stat${i}`] || {};
        sf(`stat${i}-label`, s.label);
        sf(`stat${i}-desc`, s.desc);
      }
      sf('process-label', hp.process_label);
      sf('process-heading', hp.process_heading);
      for (let i = 1; i <= 6; i++) {
        const s = hp[`process${i}`] || {};
        sf(`process${i}-title`, s.title);
        sf(`process${i}-desc`, s.desc);
      }
      sf('services-label', hp.services_label);
      sf('services-heading', hp.services_heading);
      for (let i = 1; i <= 6; i++) {
        const s = hp[`svcCard${i}`] || {};
        sf(`svc-card${i}-title`, s.title);
        sf(`svc-card${i}-desc`, s.desc);
      }
      sf('cta-label', hp.cta_label);
      sf('cta-heading', hp.cta_heading);
      sf('cta-heading-em', hp.cta_heading_em);
      sf('cta-desc', hp.cta_desc);
    }

    /* ── ABOUT PAGE EXTRA ── */
    if (data.aboutPage) {
      const ap = data.aboutPage;
      const tl = ap.timeline || {};
      for (let i = 1; i <= 6; i++) {
        const t = tl[`item${i}`] || {};
        sf(`timeline${i}-year`, t.year);
        sf(`timeline${i}-title`, t.title);
        sf(`timeline${i}-desc`, t.desc);
      }
      sf('values-label', ap.values_label);
      sf('values-heading', ap.values_heading);
      for (let i = 1; i <= 4; i++) {
        const v = ap[`value${i}`] || {};
        sf(`value${i}-title`, v.title);
        sf(`value${i}-desc`, v.desc);
      }
      sf('whyus-label', ap.whyus_label);
      sf('whyus-heading', ap.whyus_heading);
      for (let i = 1; i <= 4; i++) {
        const w = ap[`whyus${i}`] || {};
        sf(`whyus${i}-title`, w.title);
        sf(`whyus${i}-desc`, w.desc);
      }
    }

    /* ── SERVICES PAGE ── */
    if (data.services) {
      const sv = data.services;
      for (let i = 1; i <= 5; i++) {
        const s = sv[`svc${i}`] || {};
        sf(`svc${i}-heading`, s.heading);
        sf(`svc${i}-desc`, s.desc);
        for (let j = 1; j <= 6; j++) sf(`svc${i}-check${j}`, s[`check${j}`]);
      }
      const steps = sv.steps || {};
      for (let i = 1; i <= 7; i++) {
        sf(`svc-step${i}-title`, steps[`step${i}_title`]);
        sf(`svc-step${i}-desc`, steps[`step${i}_desc`]);
      }
      const g = sv.guarantee || {};
      for (let i = 1; i <= 3; i++) {
        const gi = g[`item${i}`] || {};
        sf(`guarantee${i}-num`, gi.num);
        sf(`guarantee${i}-title`, gi.title);
        sf(`guarantee${i}-desc`, gi.desc);
      }
    }

    /* ── CONTACT PAGE ── */
    if (data.contactPage) {
      const cp = data.contactPage;
      sf('contact-heading', cp.heading);
      sf('contact-quick-heading', cp.quickHeading);
      for (let i = 1; i <= 3; i++) {
        const r = cp[`reason${i}`] || {};
        sf(`reason${i}-title`, r.title);
        sf(`reason${i}-desc`, r.desc);
        const q = cp[`quick${i}`] || {};
        sf(`quick${i}-title`, q.title);
        sf(`quick${i}-desc`, q.desc);
      }
    }
  });
