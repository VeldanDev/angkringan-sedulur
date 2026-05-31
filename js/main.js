/* ============================================================
   ANGKRINGAN SEDULUR — main.js
   ============================================================ */

/* ===== 1. SMOOTH SCROLL (native CSS scroll-behavior: smooth) ===== */
gsap.ticker.lagSmoothing(0);

/* ===== 2. PRELOADER ===== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const svgPaths = preloader.querySelectorAll('svg path, svg line, svg circle, svg rect, svg ellipse');

  svgPaths.forEach(el => {
    const len = el.getTotalLength ? el.getTotalLength() : 100;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
  });

  const tl = gsap.timeline({
    onComplete: () => {
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';
        initHeroReveal();
      }, { once: true });
    }
  });

  tl.to(svgPaths, {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power2.inOut',
    stagger: 0.015,
  })
  .to(preloader, {
    y: '-100%',
    duration: 0.8,
    ease: 'power3.inOut',
    delay: 0.4,
    onStart: () => {
      preloader.style.transition = 'none';
    }
  });
}

/* ===== 3. HERO TEXT REVEAL ===== */
function initHeroReveal() {
  const targets = [
    '.hero-badge',
    '.hero-title-1',
    '.hero-title-2',
    '.hero-tagline',
    '.hero-sub',
    '.hero-btns',
  ];

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.14,
  });
}

/* ===== 4. MAGNETIC BUTTONS ===== */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-magnetic');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 70;

      if (dist < radius) {
        const factor = (radius - dist) / radius;
        const mx = dx * factor * 0.4;
        const my = dy * factor * 0.4;
        gsap.to(btn, {
          x: mx,
          y: my,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}

/* ===== 5. SCROLL REVEAL (.reveal elements) ===== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  revealEls.forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });
}

/* ===== 6. ABOUT SECTION ANIMATIONS ===== */
function initAboutAnimations() {
  const leftPanel = document.querySelector('.about-left');
  const rightPanel = document.querySelector('.about-right');

  if (leftPanel) {
    gsap.from(leftPanel, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#tentang',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }

  if (rightPanel) {
    gsap.from(rightPanel, {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.15,
      scrollTrigger: {
        trigger: '#tentang',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  }
}

/* ===== 7. MENU CARDS (tab filter + initial reveal) ===== */
function initMenuCards() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;
      const visibleCards = [];

      menuCards.forEach(card => {
        const cardCat = card.dataset.category;
        if (category === 'all' || cardCat === category) {
          card.classList.remove('hidden');
          visibleCards.push(card);
        } else {
          card.classList.add('hidden');
        }
      });

      if (visibleCards.length) {
        gsap.fromTo(visibleCards, {
          opacity: 0,
          y: 20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.08,
        });
      }
    });
  });

  gsap.from(menuCards, {
    opacity: 0,
    y: 28,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.07,
    scrollTrigger: {
      trigger: '.menu-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

/* ===== 8. GALLERY STAGGER ===== */
function initGalleryAnimations() {
  const galleryCells = document.querySelectorAll('.gallery-cell');

  gsap.from(galleryCells, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
}

/* ===== 9. ACTIVE NAV LINKS (IntersectionObserver) ===== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '-60px 0px -40% 0px',
  });

  sections.forEach(section => observer.observe(section));
}

/* ===== 10. MOBILE DRAWER ===== */
function initMobileDrawer() {
  const hamburger = document.getElementById('btn-hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.getElementById('btn-close-drawer');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ===== NAV SCROLL BEHAVIOR ===== */
function initNavScroll() {
  const navbar = document.getElementById('navbar');

  ScrollTrigger.create({
    start: 100,
    onUpdate: self => {
      if (self.progress > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    },
  });
}

/* ===== SMOOTH SCROLL FOR NAV LINKS ===== */
function initSmoothScrollLinks() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

/* ===== INIT ALL ===== */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initMagneticButtons();
  initScrollReveal();
  initAboutAnimations();
  initMenuCards();
  initGalleryAnimations();
  initActiveNav();
  initMobileDrawer();
  initNavScroll();
  initSmoothScrollLinks();

  ScrollTrigger.refresh();
});
