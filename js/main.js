/* ============================================================
   RADHERATAN AGARBATTI — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const nav = document.querySelector('.navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Scroll Reveal (IntersectionObserver) ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.11 });
  document.querySelectorAll('.rv, .rv-l, .rv-r, .st').forEach(el => io.observe(el));

  /* ── 3D Tilt on cards ── */
  document.querySelectorAll('.pcard, .ccard, .why-card, .wcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / r.height) * -9;
      const ry = ((x - r.width  / 2) / r.width)  *  9;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px) scale(1.025)`;
      card.style.boxShadow = `${-ry * 2}px ${rx * 2 + 16}px 44px rgba(62,31,0,0.22), 0 0 0 2px rgba(201,144,58,0.3)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  /* ── Ripple on all buttons ── */
  document.querySelectorAll('.btn, .btn-see-all, .btn-wa-nav, .filter-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const span = document.createElement('span');
      span.className = 'ripple';
      const sz = Math.max(r.width, r.height) * 2;
      span.style.cssText = `
        width: ${sz}px; height: ${sz}px;
        left: ${e.clientX - r.left - sz / 2}px;
        top:  ${e.clientY - r.top  - sz / 2}px;
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.35);
        transform: scale(0); animation: ripple-out 0.6s linear;
        pointer-events: none;
      `;
      btn.style.position = btn.style.position || 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(span);
      span.addEventListener('animationend', () => span.remove());
    });
  });

  /* ── Hero parallax ── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.14}px)`;
    }, { passive: true });
  }

  /* ── Active nav link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── Smooth page fade transition ── */
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.cssText = 'opacity:1;transition:opacity 0.4s ease';
  });
  document.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', function (e) {
      const h = this.getAttribute('href') || '';
      if (!h.endsWith('.html') || h.startsWith('http') || h.startsWith('//') || h.startsWith('tel') || h.startsWith('mailto')) return;
      e.preventDefault();
      document.body.style.cssText = 'opacity:0;transition:opacity 0.25s ease';
      setTimeout(() => { location.href = h; }, 250);
    });
  });

  /* ── Catalog filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        document.querySelectorAll('.catalog-section[data-cat]').forEach(sec => {
          sec.style.display = (cat === 'all' || sec.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }

  /* ── Contact form ── */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formSubmit = document.getElementById('formSubmit');
  if (formSubmit) {
    formSubmit.addEventListener('click', e => {
      e.preventDefault();
      const name  = document.getElementById('fname')?.value;
      const phone = document.getElementById('phone')?.value;
      if (!name || !phone) { alert('Please fill in your name and phone number.'); return; }
      if (form) form.style.display = 'none';
      if (formSuccess) { formSuccess.style.display = 'block'; }
    });
  }

  /* ── Stagger delays for why icons float ── */
  document.querySelectorAll('.why-icon, .wicon').forEach((ic, i) => {
    ic.style.animationDelay = `${i * 0.55}s`;
  });

});


const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
