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
      hamburger.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNav.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  }

  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.remove('hidden');
    else backToTop.classList.add('hidden');
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const openBtn = document.getElementById('contact-button');
  const openBtnMobile = document.getElementById('contact-button-mobile');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal-button');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  const copyEmailBtn = document.getElementById('copy-email');
  const mailtoLink = document.getElementById('mailto-link');

  let previouslyFocused = null;
  const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function openModal() {
    previouslyFocused = document.activeElement;
    modal.classList.remove('hidden');
    setTimeout(() => {
      const focusable = modal.querySelectorAll(focusableSelector);
      if (focusable.length) focusable[0].focus();
    }, 50);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', trapTabKey);
    document.addEventListener('keydown', escKeyClose);
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    previouslyFocused?.focus();
    document.removeEventListener('keydown', trapTabKey);
    document.removeEventListener('keydown', escKeyClose);
  }

  function escKeyClose(e) {
    if (e.key === 'Escape') {
      if (!document.getElementById('resume-modal').classList.contains('hidden')) closeResumeModal();
      else closeModal();
    }
  }

  function trapTabKey(e) {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(modal.querySelectorAll(focusableSelector));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (openBtnMobile) openBtnMobile.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('manasdubey2709@gmail.com');
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(() => (copyEmailBtn.textContent = 'Copy email'), 1800);
    } catch {
      mailtoLink.click();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please complete all fields.';
      status.classList.remove('hidden');
      setTimeout(() => status.classList.add('hidden'), 3000);
      return;
    }

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.remove('hidden');
      setTimeout(() => status.classList.add('hidden'), 3000);
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:manasdubey2709@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = 'Opening email client...';
    status.classList.remove('hidden');
    setTimeout(() => {
      status.classList.add('hidden');
      closeModal();
    }, 1500);
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (mobileNav && !mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
        navToggle.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });

  const resumeButton = document.getElementById('resume-button');
  const resumeModal = document.getElementById('resume-modal');
  const closeResume = document.getElementById('close-resume');
  const resumeFrame = document.getElementById('resume-frame');

  function openResumeModal() {
    resumeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      resumeFrame.focus();
    }, 60);
  }

  function closeResumeModal() {
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
    const resumeOpenNew = document.getElementById('resume-open-new');
    resumeOpenNew?.focus();
  }

  resumeButton.addEventListener('click', () => {
    openResumeModal();
  });

  closeResume.addEventListener('click', () => {
    closeResumeModal();
  });

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });

});
