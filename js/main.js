/* =============================================
   Automate305 — Main JavaScript
   Handles: rotating text, particle bg, hamburger nav, marquee
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initRotatingText();
  initParticles();
  initSmoothScroll();
});

/* --- Hamburger Nav --- */
function initHamburger() {
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* --- Rotating Subheadline --- */
function initRotatingText() {
  const el = document.getElementById('rotating-text');
  if (!el) return;

  const phrases = ['More Revenue', 'More Repeat Clients', 'More Free Time'];
  let idx = 0;

  setInterval(() => {
    el.classList.add('fade-out');
    setTimeout(() => {
      idx = (idx + 1) % phrases.length;
      el.textContent = phrases[idx];
      el.classList.remove('fade-out');
    }, 400);
  }, 3000);
}

/* --- Particle Background (canvas) --- */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  function initParticleArray() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(109, 40, 217, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(109, 40, 217, ${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    resize();
    initParticleArray();
    draw();
  });

  resize();
  initParticleArray();
  draw();
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
