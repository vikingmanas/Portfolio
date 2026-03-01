document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const hamburger = document.getElementById('hamburger');
  const closeIcon = document.getElementById('close-icon');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mobileNav.classList.toggle('hidden');
      hamburger?.classList.toggle('hidden');
      closeIcon?.classList.toggle('hidden');
    });

    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNav.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
        hamburger?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
      }
    });
  }

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      }
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('opacity-0'); // ensure it is hidden before scroll
    scrollObserver.observe(el);
  });

  const mouseGlow = document.getElementById('mouse-glow');
  const cursor = document.getElementById('magnetic-cursor');
  const follower = document.getElementById('magnetic-cursor-follower');

  // Track continuous position for the follower
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower) {
    // Only apply custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      document.body.classList.add('cursor-none');
      cursor.classList.remove('hidden');
      follower.classList.remove('hidden');

      // Add robust hover states
      const addHoverToCursor = () => {
        cursor.classList.add('cursor-hover');
        follower.classList.add('cursor-hover');
      };

      const removeHoverFromCursor = () => {
        cursor.classList.remove('cursor-hover');
        follower.classList.remove('cursor-hover');
      };

      // Apply to all interactive elements statically present
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', addHoverToCursor);
        el.addEventListener('mouseleave', removeHoverFromCursor);
      });

      // Also use event delegation for dynamically added or deeply nested elements
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, input, textarea, [role="button"]')) {
          addHoverToCursor();
        }
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, input, textarea, [role="button"]')) {
          removeHoverFromCursor();
        }
      });

      // Simple animation loop for the delayed follower
      const renderFollower = () => {
        // Easing interpolation
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderFollower);
      };
      requestAnimationFrame(renderFollower);
    }
  }

  if (mouseGlow || (cursor && follower)) {
    document.addEventListener('mousemove', (e) => {
      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        if (mouseGlow) {
          mouseGlow.style.left = `${e.clientX}px`;
          mouseGlow.style.top = `${e.clientY}px`;
        }

        if (cursor && follower) {
          // Direct transform for the main dot to eliminate lag
          cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          mouseX = e.clientX;
          mouseY = e.clientY;
        }
      });
    });
  }

  const contactBtn = document.getElementById('contact-button');
  const contactBtnMobile = document.getElementById('contact-button-mobile');
  const contactModal = document.getElementById('contact-modal');
  const contactClose = document.getElementById('close-modal-button');
  const contactForm = document.getElementById('contact-form');
  const contactStatus = document.getElementById('contact-status');
  const copyEmailBtn = document.getElementById('copy-email');
  const mailtoLink = document.getElementById('mailto-link');

  let lastFocusedBeforeModal = null;
  const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function trapTab(container, e) {
    if (e.key !== 'Tab') return;
    const focusables = Array.from(container.querySelectorAll(focusableSelector));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openContact() {
    if (!contactModal) return;
    lastFocusedBeforeModal = document.activeElement;
    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const focusables = contactModal.querySelectorAll(focusableSelector);
      if (focusables.length) focusables[0].focus();
    }, 50);
    document.addEventListener('keydown', escContactHandler);
    document.addEventListener('keydown', (e) => trapTab(contactModal, e));
  }

  function closeContact() {
    if (!contactModal) return;
    contactModal.classList.add('hidden');
    document.body.style.overflow = '';
    try { lastFocusedBeforeModal?.focus(); } catch (e) { }
    document.removeEventListener('keydown', escContactHandler);
  }

  function escContactHandler(e) {
    if (e.key === 'Escape') {
      if (!resumeModal || resumeModal.classList.contains('hidden')) closeContact();
      else closeResumeModal();
    }
  }

  if (contactBtn) contactBtn.addEventListener('click', openContact);
  if (contactBtnMobile) contactBtnMobile.addEventListener('click', openContact);
  if (contactClose) contactClose.addEventListener('click', closeContact);
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContact();
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('manasdubey2709@gmail.com');
        copyEmailBtn.textContent = 'Copied!';
        setTimeout(() => (copyEmailBtn.textContent = 'Copy email'), 1500);
      } catch (err) {
        mailtoLink?.click();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim() || '';
      const email = document.getElementById('contact-email')?.value.trim() || '';
      const message = document.getElementById('contact-message')?.value.trim() || '';
      if (!name || !email || !message) {
        if (contactStatus) {
          contactStatus.textContent = 'Please complete all fields.';
          contactStatus.classList.remove('hidden');
          setTimeout(() => contactStatus.classList.add('hidden'), 2500);
        }
        return;
      }
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
        if (contactStatus) {
          contactStatus.textContent = 'Please enter a valid email.';
          contactStatus.classList.remove('hidden');
          setTimeout(() => contactStatus.classList.add('hidden'), 2500);
        }
        return;
      }
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:manasdubey2709@gmail.com?subject=${subject}&body=${body}`;
      if (contactStatus) {
        contactStatus.textContent = 'Opening email client...';
        contactStatus.classList.remove('hidden');
        setTimeout(() => {
          contactStatus.classList.add('hidden');
          closeContact();
        }, 1200);
      } else {
        closeContact();
      }
    });
  }

  const resumeButton = document.getElementById('resume-button');
  const resumeModal = document.getElementById('resume-modal');
  const closeResume = document.getElementById('close-resume');

  function openResumeModal() {
    if (!resumeModal) return;
    lastFocusedBeforeModal = document.activeElement;
    resumeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const frame = resumeModal.querySelector('iframe');
      if (frame) frame.focus();
    }, 50);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeResumeModal();
    });
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
    try { lastFocusedBeforeModal?.focus(); } catch (e) { }
  }

  if (resumeButton) resumeButton.addEventListener('click', openResumeModal);
  if (closeResume) closeResume.addEventListener('click', closeResumeModal);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (mobileNav && !mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
        navToggle?.setAttribute('aria-expanded', 'false');
        hamburger?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
      }
    });
  });

  window.addEventListener('error', (e) => {
    console.warn('JS runtime error:', e);
  });
});
