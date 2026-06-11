const CAT_LABELS = {
  office: 'Офис', retail: 'Магазин', restaurant: 'Ресторан',
  medical: 'Медицина', warehouse: 'Склад', horeca: 'HoReCa'
};

function gdrive(url) {
  if (!url) return '';
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w800`;
  return url;
}

function projectCardHome(p) {
  const bg = gdrive(p.image);
  const bgStyle = bg ? `background-image:url('${bg}');background-size:cover;background-position:center;` : '';
  return `
    <div class="proj-card-bg" style="${bgStyle}"></div>
    <div class="proj-card-overlay"></div>
    <div class="proj-card-content">
      <div class="proj-card-cat">${CAT_LABELS[p.category] || p.category}</div>
      <h3>${p.title}</h3>
      <div class="proj-card-meta">
        ${p.area ? `<span>${p.area}</span>` : ''}
        ${p.location || p.year ? `<span>${[p.location, p.year].filter(Boolean).join(', ')}</span>` : ''}
      </div>
    </div>`;
}

function projectCardMasonry(p) {
  const bg = gdrive(p.image);
  const bgStyle = bg ? `background-image:url('${bg}');background-size:cover;background-position:center;` : '';
  const heightStyle = p.tall ? 'padding-bottom:140%' : '';
  return `
    <div class="project-item${p.tall ? ' tall' : ''}" data-cat="${p.category}" style="transition:opacity 0.3s,transform 0.3s;">
      <div class="project-item-bg" style="${bgStyle}${heightStyle ? ';' + heightStyle : ''}"></div>
      <div class="project-item-overlay"></div>
      <div class="project-item-info">
        <div class="project-item-cat">${CAT_LABELS[p.category] || p.category}</div>
        <h3>${p.title}</h3>
        <div class="project-item-meta">
          ${p.area ? `<span>${p.area}</span>` : ''}
          ${p.year ? `<span>${p.year}</span>` : ''}
          ${p.duration ? `<span>${p.duration}</span>` : ''}
        </div>
      </div>
    </div>`;
}

fetch('https://raw.githubusercontent.com/Nav21ruz/Cloude/main/data/content.json?t=' + Date.now())
  .then(r => r.ok ? r.json() : null)
  .catch(() => null)
  .then(data => {
    if (!data) return;

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
      /* сначала проекты с фото, потом без */
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
  });
