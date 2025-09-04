// Open/close contact modal — just wiring, no extra features
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('contact-button');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal-button');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
});
