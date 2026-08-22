/* ==========================================================================
   TeoTim Trstenik — main.js
   --------------------------------------------------------------------------
   Tri nezavisne funkcije, sve opcione. Ako se ovaj fajl ne izvrši, sajt
   ostaje potpuno čitljiv: klasa `no-js` na <html> drži sav sadržaj vidljivim,
   FAQ odgovori su otvoreni, a sve reference prikazane.

     revealOnScroll()  — ulazna animacija elemenata sa [data-rise]
     initFaq()         — akordeon na početnoj strani
     initFilters()     — filter referenci po tipu mašine
   ========================================================================== */
(function () {
  'use strict';

  // Sadržaj se od ovog trenutka oslanja na JS za prikaz [data-rise] elemenata.
  document.documentElement.classList.remove('no-js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- 1. Ulazna animacija pri skrolu ---------------------------------- */
  function revealOnScroll() {
    var items = document.querySelectorAll('[data-rise]');
    if (!items.length) return;

    // Bez IntersectionObserver-a ili uz smanjenu animaciju: prikaži sve odmah.
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) {
      // Ono što je već u prvom ekranu prikazujemo bez čekanja.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add('is-in');
      } else {
        io.observe(el);
      }
    });
  }

  /* --- 2. FAQ akordeon -------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    function setOpen(item, open) {
      item.setAttribute('data-open', open ? 'true' : 'false');
      var btn = item.querySelector('.faq__q');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      item.querySelector('.faq__sign').textContent = open ? '\u2212' : '+';
    }

    items.forEach(function (item, i) {
      setOpen(item, i === 0);   // prvo pitanje je otvoreno
      item.querySelector('.faq__q').addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        items.forEach(function (other) { setOpen(other, false); });
        setOpen(item, !isOpen);
      });
    });
  }

  /* --- 3. Filter referenci --------------------------------------------- */
  function initFilters() {
    var buttons = document.querySelectorAll('.filters button');
    var cards = document.querySelectorAll('.ref');
    var count = document.querySelector('.filters__count strong');
    if (!buttons.length || !cards.length) return;

    function apply(type) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = type === 'sve' || card.getAttribute('data-type') === type;
        card.hidden = !match;
        if (match) shown++;
      });
      buttons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-filter') === type ? 'true' : 'false');
      });
      if (count) count.textContent = String(shown);
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () { apply(btn.getAttribute('data-filter')); });
    });
  }

  revealOnScroll();
  initFaq();
  initFilters();
})();
