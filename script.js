const cards = document.querySelectorAll(".card");
const backdrop = document.querySelector(".modal-backdrop");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const closeButton = document.querySelector(".close-button");

let lastFocusedCard = null;

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
