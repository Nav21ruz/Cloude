/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) {
      pre.classList.add('done');
      setTimeout(() => pre.remove(), 700);
    }
  }, 1400);
});

/* ===== CUSTOM CURSOR (desktop only) ===== */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (isTouch) {
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';
  document.body.style.cursor = 'auto';
} else {
  let ringX = 0, ringY = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    const x = e.clientX, y = e.clientY;
    if (dot) { dot.style.left = x + 'px'; dot.style.top = y + 'px'; }
    ringX += (x - ringX) * 0.15;
    ringY += (y - ringY) * 0.15;
  });

  function animateCursor() {
    if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
    rafId = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* Скрыть курсор когда мышь покидает окно */
  document.addEventListener('mouseleave', () => {
    if (dot) dot.style.opacity = '0';
    if (ring) ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (dot) dot.style.opacity = '1';
    if (ring) ring.style.opacity = '1';
  });
}

/* ===== SCROLL PROGRESS ===== */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

/* ===== NAV SCROLL ===== */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ===== MOBILE MENU ===== */
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.nav-mobile');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

/* ===== ACTIVE NAV LINK ===== */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, suffix, duration = 1800) {
  let start = 0;
  const startTime = performance.now();
  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(ease * target);
    el.innerHTML = current + '<span class="stat-suffix">' + suffix + '</span>';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      el.parentElement.classList.add('counted');
      animateCounter(el, target, suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ===== PROJECT FILTER ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectItems.forEach(item => {
      const cat = item.dataset.cat;
      const show = filter === 'all' || cat === filter;
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.display = show ? '' : 'none';
        item.classList.toggle('project-item-hidden', !show);
        if (show) {
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        }
      }, 200);
    });
  });
});

projectItems.forEach(item => {
  item.style.transition = 'opacity 0.3s, transform 0.3s';
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Отправляем...';
    btn.disabled = true;

    setTimeout(() => {
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
      btn.textContent = 'Отправлено';
      contactForm.reset();
    }, 1500);
  });
}

/* ===== PARALLAX HERO ===== */
const heroBg = document.querySelector('.hero-bg-grid');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }, { passive: true });
}
