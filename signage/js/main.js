/* ============================================================
   SIGNUM — Наружная реклама премиум-класса в Челябинске
   main.js | Vanilla JS — No frameworks
   ============================================================ */

'use strict';

/* ---- 1. Preloader ----------------------------------------- */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 900);
  });
})();

/* ---- 2. Custom Cursor ------------------------------------- */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  // Hide on touch devices
  if (window.matchMedia('(hover: none)').matches) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
    document.body.classList.add('no-cursor');
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let animId = null;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    animId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Scale ring on clickable elements
  const clickables = 'a, button, .filter-btn, .portfolio-card, .service-card, .btn-primary, .btn-outline, input, select, textarea, label';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(clickables)) {
      ring.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(clickables)) {
      ring.classList.remove('hovered');
    }
  });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* ---- 3. Scroll Progress Bar ------------------------------- */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* ---- 4. Nav Scroll State ---------------------------------- */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function handleScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();

/* ---- 5. Mobile Hamburger ---------------------------------- */
(function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const overlay   = document.querySelector('.nav-overlay');
  const navLinks  = document.querySelectorAll('.nav-overlay a');
  if (!hamburger || !overlay) return;

  function openMenu() {
    document.body.classList.add('nav-open', 'menu-open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    document.body.classList.remove('nav-open', 'menu-open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    const isOpen = document.body.classList.contains('nav-open');
    isOpen ? closeMenu() : openMenu();
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ---- 6. Scroll Reveal ------------------------------------- */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.section-reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) { observer.observe(el); });
})();

/* ---- 7. Portfolio Filter ---------------------------------- */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const category = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Show / hide cards
      cards.forEach(function (card) {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
          // Animate in
          card.style.animation = 'none';
          requestAnimationFrame(function () {
            card.style.animation = '';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ---- 8. Counter Animation --------------------------------- */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const start    = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current  = Math.floor(easeOut(progress) * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();

/* ---- 9. Form Validation ----------------------------------- */
(function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  if (!forms.length) return;

  const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

  function showError(field, msg) {
    field.classList.add('error');
    let errEl = field.parentNode.querySelector('.field-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'field-error';
      field.parentNode.appendChild(errEl);
    }
    errEl.textContent = msg;
  }

  function clearError(field) {
    field.classList.remove('error');
    const errEl = field.parentNode.querySelector('.field-error');
    if (errEl) errEl.textContent = '';
  }

  function validateField(field) {
    const val = field.value.trim();

    if (field.hasAttribute('required') && !val) {
      showError(field, 'Это поле обязательно для заполнения');
      return false;
    }

    if (field.type === 'tel' && val) {
      if (!phoneRegex.test(val)) {
        showError(field, 'Введите корректный номер телефона (+7 *** ***-**-**)');
        return false;
      }
    }

    if (field.type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        showError(field, 'Введите корректный email адрес');
        return false;
      }
    }

    clearError(field);
    return true;
  }

  forms.forEach(function (form) {
    const fields  = form.querySelectorAll('input, select, textarea');
    const success = form.querySelector('.form-success');

    // Live validation on blur
    fields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('error')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      fields.forEach(function (field) {
        if (!validateField(field)) valid = false;
      });

      if (valid) {
        // Show success message
        if (success) {
          success.classList.add('visible');
          form.reset();
        }

        // Hide success after 6 seconds
        setTimeout(function () {
          if (success) success.classList.remove('visible');
        }, 6000);
      }
    });
  });
})();

/* ---- 10. Smooth Scroll ------------------------------------ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      const offsetY = target.getBoundingClientRect().top + window.scrollY - navH - 20;

      window.scrollTo({ top: offsetY, behavior: 'smooth' });
    });
  });
})();

/* ---- 11. Active Nav Link Highlight ----------------------- */
(function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-overlay a').forEach(function (link) {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---- 12. Hero Parallax (subtle) -------------------------- */
(function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg-text');
  if (!heroBg) return;

  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    heroBg.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
  }, { passive: true });
})();
