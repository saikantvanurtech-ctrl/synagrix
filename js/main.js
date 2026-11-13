/* ===== Synagrix — interactions ===== */
(function () {
  'use strict';

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
  }

  /* Back to top */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 500);
    });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Generic fade slider factory */
  function makeSlider(opts) {
    var slides = [].slice.call(document.querySelectorAll(opts.slides));
    var dots = [].slice.call(document.querySelectorAll(opts.dots));
    if (!slides.length) return null;
    var idx = 0, timer;
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
    }
    function start() { stop(); timer = setInterval(function () { go(idx + 1); }, opts.delay); }
    function stop() { clearInterval(timer); }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); start(); }); });
    go(0); start();
    return { go: go, next: function () { go(idx + 1); start(); }, prev: function () { go(idx - 1); start(); } };
  }

  var hero = makeSlider({ slides: '.hero-slide', dots: '.hero-dots span', delay: 6000 });
  if (hero) {
    var prev = document.querySelector('.hero-nav .prev');
    var next = document.querySelector('.hero-nav .next');
    if (prev) prev.addEventListener('click', hero.prev);
    if (next) next.addEventListener('click', hero.next);
  }
  makeSlider({ slides: '.t-slide', dots: '.t-dots span', delay: 7000 });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Reveal on scroll + counters */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var start = null, dur = 1800;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(step); else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(animateCount);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal, .counter').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(animateCount);
  }

  /* Gallery lightbox */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    document.querySelectorAll('.g-item').forEach(function (g) {
      g.addEventListener('click', function () {
        lbImg.src = g.querySelector('img').src;
        lb.classList.add('show');
      });
    });
    lb.addEventListener('click', function () { lb.classList.remove('show'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('show'); });
  }

  /* Forms (front-end only) */
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = f.querySelector('button[type=submit]');
      var old = b.textContent;
      b.textContent = 'Thank you!';
      f.reset();
      setTimeout(function () { b.textContent = old; }, 2500);
    });
  });
})();


(function () {
    const preloader = document.querySelector(".site-preloader");

    if (preloader) {
        setTimeout(function () {
            preloader.classList.add("is-hidden");

            setTimeout(function () {
                preloader.remove();
            }, 500);

        }, 3000);
    }
})();