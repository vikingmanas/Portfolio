// Contact Modal Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.getElementById("contact-button");
  const modal = document.getElementById("contact-modal");
  const closeBtn = document.getElementById("close-modal-button");

  contactBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close when clicking outside modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
