/* =============================================
   Automate305 — Main JavaScript
   Handles: rotating text, particle bg, hamburger nav, marquee
   ============================================= */

(function () {
  'use strict';

  /* =============================================
     1. Rotating Subheadline
     Swaps text in #rotating-text every 3 seconds
     with a fade in/out transition
     ============================================= */
  function initRotatingText() {
    var el = document.getElementById('rotating-text');
    if (!el) return;

    var texts = ['More Revenue', 'More Repeat Clients', 'More Free Time'];
    var currentIndex = 0;

    function rotate() {
      // Fade out
      el.style.opacity = '0';

      setTimeout(function () {
        // Update text
        currentIndex = (currentIndex + 1) % texts.length;
        el.textContent = texts[currentIndex];

        // Fade in
        el.style.opacity = '1';
      }, 300);
    }

    // Set initial transition
    el.style.transition = 'opacity 0.3s ease';
    el.style.opacity = '1';

    setInterval(rotate, 3000);
  }

  /* =============================================
     2. Mobile Hamburger Nav Toggle
     Button #hamburger toggles class "nav-open"
     on the <nav> element and shows .nav-links
     ============================================= */
  function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var nav = document.querySelector('.nav');
    var navLinks = document.querySelector('.nav-links');
    if (!hamburger || !nav || !navLinks) return;

    hamburger.addEventListener('click', function () {
      var isOpen = nav.classList.contains('nav-open');

      if (isOpen) {
        nav.classList.remove('nav-open');
        navLinks.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        nav.classList.add('nav-open');
        navLinks.classList.add('nav-open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    });

    // Close nav when a link is clicked
    var links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        navLinks.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        nav.classList.remove('nav-open');
        navLinks.classList.remove('nav-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =============================================
     3. Smooth Scroll for Anchor Links
     ============================================= */
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        var navHeight = 72;
        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      });
    });
  }

  /* =============================================
     4. Logo Marquee
     Duplicates items for seamless infinite loop.
     Pauses animation on hover.
     ============================================= */
  function initMarquee() {
    var marqueeContent = document.getElementById('marquee-content');
    if (!marqueeContent) return;

    // Duplicate the marquee content for seamless looping
    var clone = marqueeContent.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marqueeContent.parentNode.appendChild(clone);

    // Pause on hover of the marquee wrapper
    var marqueeWrapper = document.querySelector('.marquee-wrapper');
    if (marqueeWrapper) {
      marqueeWrapper.addEventListener('mouseenter', function () {
        marqueeContent.style.animationPlayState = 'paused';
        clone.style.animationPlayState = 'paused';
      });
      marqueeWrapper.addEventListener('mouseleave', function () {
        marqueeContent.style.animationPlayState = 'running';
        clone.style.animationPlayState = 'running';
      });
    }
  }

  /* =============================================
     5. Canvas Particle Background (Hero)
     ~80 purple dots with connecting lines,
     animated with requestAnimationFrame.
     canvas id="hero-canvas"
     ============================================= */
  function initParticleBackground() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var particles = [];
    var PARTICLE_COUNT = 80;
    var CONNECTION_DISTANCE = 120;
    var PARTICLE_COLOR = 'rgba(109, 40, 217, 0.6)';
    var LINE_COLOR_BASE = 'rgba(109, 40, 217, ';

    // Resize canvas to fill hero section
    function resize() {
      var hero = canvas.parentElement;
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', function () {
      resize();
      // Reposition particles that are now outside canvas
      particles.forEach(function (p) {
        if (p.x > canvas.width) p.x = Math.random() * canvas.width;
        if (p.y > canvas.height) p.y = Math.random() * canvas.height;
      });
    });

    // Create particles
    function createParticles() {
      particles = [];
      for (var i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1
        });
      }
    }

    createParticles();

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(function (p) {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Clamp to bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.fill();
      });

      // Draw connecting lines
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            var opacity = (1 - dist / CONNECTION_DISTANCE) * 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = LINE_COLOR_BASE + opacity + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* =============================================
     Active Nav Link Highlighting
     Marks current page link as active
     ============================================= */
  function initActiveNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* =============================================
     Init on DOM Ready
     ============================================= */
  function init() {
    initRotatingText();
    initHamburger();
    initSmoothScroll();
    initMarquee();
    initParticleBackground();
    initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
