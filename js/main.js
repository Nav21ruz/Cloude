window.addEventListener('load', () => {
setTimeout(() => {
const pre = document.getElementById('preloader');
if (pre) {
pre.classList.add('done');
setTimeout(() => pre.remove(), 700);
}
}, 300);
});
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
const scrollTop = window.scrollY;
const docHeight = document.documentElement.scrollHeight - window.innerHeight;
const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });
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
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
const href = a.getAttribute('href');
if (href === currentPage || (currentPage === '' && href === 'index.html')) {
a.classList.add('active');
}
});
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
if (show) requestAnimationFrame(() => {
item.style.opacity = '1';
item.style.transform = 'scale(1)';
});
}, 200);
});
});
});
projectItems.forEach(item => {
item.style.transition = 'opacity 0.3s, transform 0.3s';
});
const contactForm = document.getElementById('contact-form');
if (contactForm) {
contactForm.addEventListener('submit', async (e) => {
e.preventDefault();
const consentBox = document.getElementById('consent');
const consentErr = document.getElementById('consent-error');
if (consentBox && !consentBox.checked) {
if (consentErr) consentErr.style.display = 'block';
consentBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
return;
}
if (consentErr) consentErr.style.display = 'none';
const btn = contactForm.querySelector('button[type="submit"]');
const originalHTML = btn.innerHTML;
btn.innerHTML = '<span>Отправляем…</span>';
btn.disabled = true;
const data = {};
new FormData(contactForm).forEach((v, k) => { data[k] = v; });
const errEl = document.getElementById('form-error');
const successEl = document.getElementById('form-success');
try {
const res = await fetch('/api/telegram.php', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});
if (res.ok) {
if (successEl) successEl.style.display = 'block';
if (errEl) errEl.style.display = 'none';
contactForm.reset();
btn.innerHTML = '<span>✓ Отправлено</span>';
setTimeout(() => { btn.innerHTML = originalHTML; btn.disabled = false; }, 4000);
} else {
throw new Error('Server error ' + res.status);
}
} catch (err) {
console.error(err);
if (errEl) errEl.style.display = 'block';
btn.innerHTML = originalHTML;
btn.disabled = false;
}
});
}
const heroBg = document.querySelector('.hero-bg-grid');
if (heroBg) {
window.addEventListener('scroll', () => {
heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
}, { passive: true });
}
// Floating messenger buttons — injected once per page
(function(){
if (document.querySelector('.float-messengers')) return;
const wrap = document.createElement('div');
wrap.className = 'float-messengers';
wrap.innerHTML =
'<a href="https://t.me/imovv" class="float-btn float-btn--tg" target="_blank" rel="noopener" aria-label="Написать в Telegram">' +
'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.737 13.4l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.834.952l-.42.207z"/></svg>' +
'</a>' +
'<a href="https://wa.me/79090856451?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%BE%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C%20%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82%D0%B0." class="float-btn float-btn--wa" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">' +
'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
'</a>';
document.body.appendChild(wrap);
})();