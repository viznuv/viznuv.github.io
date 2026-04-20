/* Vishnu Prasad V - Academic Website
   Mobile nav + smooth scroll + active section + print
   ==================================================== */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var navToggle = document.querySelector('.nav-toggle');
    var navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var open = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        navMenu.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var id = link.getAttribute('href');
            if (id.length < 2) return;
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            var navEl = document.querySelector('.nav');
            var offset = navEl ? navEl.offsetHeight + 12 : 0;
            var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: top,
                behavior: reduceMotion ? 'auto' : 'smooth'
            });
            history.pushState(null, '', id);
        });
    });

    var nav = document.querySelector('.nav');
    if (nav) {
        var onScroll = function () {
            if (window.pageYOffset > 8) nav.classList.add('is-scrolled');
            else nav.classList.remove('is-scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
        var byId = {};
        navLinks.forEach(function (link) {
            var hash = link.getAttribute('href');
            if (hash && hash.charAt(0) === '#') byId[hash.slice(1)] = link;
        });
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var link = byId[entry.target.id];
                if (!link) return;
                if (entry.isIntersecting) {
                    navLinks.forEach(function (l) { l.classList.remove('is-active'); });
                    link.classList.add('is-active');
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
        sections.forEach(function (s) { observer.observe(s); });
    }

    document.querySelectorAll('[data-print]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            window.print();
        });
    });

    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
})();
