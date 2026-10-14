/* =========================================================
   Apple Aura — interactions
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var navList = document.getElementById('navList');

  if (menuBtn && navList) {
    menuBtn.addEventListener('click', function () {
      var open = navList.classList.toggle('open');
      menuBtn.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    // Close the menu after choosing a destination.
    navList.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && navList.classList.contains('open')) {
        navList.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Country selector ---------- */
  var countryBtn = document.getElementById('countryBtn');
  var countryList = document.getElementById('countryList');

  if (countryBtn && countryList) {
    countryBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      countryList.classList.toggle('open');
    });

    countryList.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      e.preventDefault();
      countryBtn.innerHTML = link.textContent + ' <span class="chev-sm">›</span>';
      countryList.classList.remove('open');
    });

    document.addEventListener('click', function () {
      countryList.classList.remove('open');
    });
  }

  /* ---------- Rotating columns: per-column speed ---------- */
  document.querySelectorAll('.col').forEach(function (col) {
    var speed = parseInt(col.getAttribute('data-speed'), 10);
    if (speed) col.style.setProperty('--dur', speed + 's');
  });

  /* ---------- Pause the animation when the hero is off-screen ---------- */
  var hero = document.getElementById('hero');
  var tracks = document.querySelectorAll('.col-track');

  if (hero && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          tracks.forEach(function (track) {
            track.style.animationPlayState = entry.isIntersecting ? '' : 'paused';
          });
        });
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  /* ---------- Subtle header state on scroll ---------- */
  var header = document.getElementById('siteHeader');
  var lastState = false;

  function onScroll() {
    var scrolled = window.scrollY > 8;
    if (scrolled !== lastState && header) {
      header.style.borderBottomColor = scrolled
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(255, 255, 255, 0.08)';
      lastState = scrolled;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
