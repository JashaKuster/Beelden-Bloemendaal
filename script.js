const cards = document.querySelectorAll(".card");
const backdrop = document.querySelector(".modal-backdrop");
if (backdrop) backdrop.hidden = true;
const modal = document.querySelector(".modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const closeButton = document.querySelector(".close-button");
const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

let lastFocusedCard = null;
let currentImages = [];
let currentImageIndex = 0;

function setModalImage(index) {
  if (!currentImages[index]) {
    return;
  }
  modalImage.src = currentImages[index].src;
  modalImage.alt = currentImages[index].alt;
}

// Vorige-knop
const prevButton = document.createElement("button");
prevButton.type = "button";
prevButton.className = "prev-button";
prevButton.textContent = "Vorige";

// Volgende-knop
const nextButton = document.createElement("button");
nextButton.type = "button";
nextButton.className = "next-button";
nextButton.textContent = "Volgende";

// Voeg knoppen toe in de modal alleen als ze nog niet staan
if (modal && !modal.querySelector(".prev-button")) {
  modal.insertBefore(prevButton, modalImage);
}
if (modal && !modal.querySelector(".next-button")) {
  modal.insertBefore(nextButton, modalImage.nextSibling);
}

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

function openModal(card, imageIndex = 0) {
  // Alle afbeeldingen van deze kaart verzamelen:
  const images = card.querySelectorAll(".card-image");
  currentImages = Array.from(images);
  if (currentImages.length === 0) {
    return;
  }
  currentImageIndex = imageIndex;
  setModalImage(currentImageIndex);
  modalTitle.textContent = card.dataset.title || "";
  modalDescription.textContent = card.dataset.description || "";
  backdrop.hidden = false;
  // Knoppen tonen of verbergen
  if (currentImages.length > 1) {
    prevButton.style.display = "";
    nextButton.style.display = "";
    updateNavButtons();
  } else {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }
  closeButton.focus();
}

function closeModal() {
  if (backdrop) backdrop.hidden = true;
  if (modalImage) { modalImage.src = ""; modalImage.alt = ""; }
  if (modalTitle) modalTitle.textContent = "";
  if (modalDescription) modalDescription.textContent = "";
  currentImages = [];
  currentImageIndex = 0;
  prevButton.style.display = "none";
  nextButton.style.display = "none";
  if (lastFocusedCard) {
    lastFocusedCard.focus();
    lastFocusedCard = null;
  }
}

function updateNavButtons() {
  prevButton.disabled = currentImageIndex === 0;
  nextButton.disabled = currentImageIndex === currentImages.length - 1;
}

prevButton.addEventListener("click", () => {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    setModalImage(currentImageIndex);
    updateNavButtons();
  }
});

nextButton.addEventListener("click", () => {
  if (currentImageIndex < currentImages.length - 1) {
    currentImageIndex++;
    setModalImage(currentImageIndex);
    updateNavButtons();
  }
});

if (closeButton) closeButton.addEventListener("click", closeModal);

if (backdrop) {
  backdrop.addEventListener("click", (event) => {
    if (!modal.contains(event.target)) {
      closeModal();
    }
  });
  backdrop.addEventListener("keydown", trapFocus);
}

document.addEventListener("keydown", (event) => {
  if (backdrop && !backdrop.hidden) {
    if (event.key === "Escape") {
      closeModal();
    }
    if (event.key === "ArrowRight" && nextButton.style.display !== "none" && !nextButton.disabled) {
      nextButton.click();
    }
    if (event.key === "ArrowLeft" && prevButton.style.display !== "none" && !prevButton.disabled) {
      prevButton.click();
    }
  }
});

// Klik op afbeelding in de kaart opent modaal, met juiste index
cards.forEach((card) => {
  const cardImages = card.querySelectorAll(".card-image");
  cardImages.forEach((img, imgIdx) => {
    img.addEventListener("click", (event) => {
      event.stopPropagation();
      lastFocusedCard = card;
      openModal(card, imgIdx);
    });
    img.style.cursor = "pointer"; // visuele hint
  });

  // Optioneel: klik overal op kaart (niet op img) blijft de eerste afbeelding openen
  card.addEventListener("click", (event) => {
    if (event.target.tagName !== "IMG") {
      lastFocusedCard = card;
      openModal(card, 0);
    }
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      lastFocusedCard = card;
      openModal(card, 0);
    }
  });
});
