const cards = document.querySelectorAll(".card");
const backdrop = document.querySelector(".modal-backdrop");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const closeButton = document.querySelector(".close-button");
const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

let lastFocusedCard = null;

if (
  cards.length === 0 ||
  !backdrop ||
  !modal ||
  !modalImage ||
  !modalTitle ||
  !modalDescription ||
  !closeButton
) {
  console.warn("Galerij-interactie kon niet volledig worden geïnitialiseerd.");
} else {
  function trapFocus(event) {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = [...modal.querySelectorAll(focusableSelector)];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

function openModal(card) {
  const image = card.querySelector("img");
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalTitle.textContent = card.dataset.title || "";
  modalDescription.textContent = card.dataset.description || "";
  backdrop.hidden = false;
  closeButton.focus();
}

function closeModal() {
  backdrop.hidden = true;
  if (lastFocusedCard) {
    lastFocusedCard.focus();
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    lastFocusedCard = card;
    openModal(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      lastFocusedCard = card;
      openModal(card);
    }
  });
});

closeButton.addEventListener("click", closeModal);

backdrop.addEventListener("click", (event) => {
  if (!modal.contains(event.target)) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !backdrop.hidden) {
    closeModal();
  }
});
  backdrop.addEventListener("keydown", trapFocus);
}
