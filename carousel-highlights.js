// Controle do Carrossel de Destaques
let currentHighlightSlide = 0;
let highlightInterval;
const highlightSlideInterval = 5000; // 5 segundos
let cardsPerView = 3; // Padrão: 3 cards por vez em desktop

// Calcula quantos cards mostrar por vez baseado na largura da tela
function updateCardsPerView() {
  const width = window.innerWidth;

  if (width < 768) {
    cardsPerView = 1; // Mobile: 1 card
  } else if (width < 1024) {
    cardsPerView = 2; // Tablet: 2 cards
  } else {
    cardsPerView = 3; // Desktop: 3 cards
  }

  updateHighlightCarousel();
}

// Atualiza a posição do carrossel
function updateHighlightCarousel() {
  const track = document.getElementById("highlightsTrack");
  const cards = document.querySelectorAll(".highlight-card");
  const totalCards = cards.length;

  if (!track || totalCards === 0) return;

  // Calcula o número total de "slides" (grupos de cards)
  const totalSlides = Math.ceil(totalCards / cardsPerView);

  // Garante que o slide atual está dentro dos limites
  if (currentHighlightSlide >= totalSlides) {
    currentHighlightSlide = 0;
  }

  // Calcula o deslocamento
  const offset = currentHighlightSlide * -100;
  track.style.transform = `translateX(${offset}%)`;

  // Atualiza indicadores
  updateHighlightIndicators();
}

// Atualiza os indicadores
function updateHighlightIndicators() {
  const indicators = document.querySelectorAll(".indicator-dot");
  const cards = document.querySelectorAll(".highlight-card");
  const totalCards = cards.length;
  const totalSlides = Math.ceil(totalCards / cardsPerView);

  indicators.forEach((indicator, index) => {
    if (index < totalSlides) {
      indicator.style.display = "block";
      if (index === currentHighlightSlide) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    } else {
      indicator.style.display = "none";
    }
  });
}

// Move o carrossel
function moveHighlightCarousel(direction) {
  const cards = document.querySelectorAll(".highlight-card");
  const totalCards = cards.length;
  const totalSlides = Math.ceil(totalCards / cardsPerView);

  currentHighlightSlide += direction;

  // Loop infinito
  if (currentHighlightSlide < 0) {
    currentHighlightSlide = totalSlides - 1;
  } else if (currentHighlightSlide >= totalSlides) {
    currentHighlightSlide = 0;
  }

  updateHighlightCarousel();

  // Reinicia o timer automático
  stopHighlightCarousel();
  startHighlightCarousel();
}

// Vai para um slide específico
function goToHighlightSlide(slideIndex) {
  currentHighlightSlide = slideIndex;
  updateHighlightCarousel();

  // Reinicia o timer
  stopHighlightCarousel();
  startHighlightCarousel();
}

// Inicia o carrossel automático
function startHighlightCarousel() {
  highlightInterval = setInterval(() => {
    moveHighlightCarousel(1);
  }, highlightSlideInterval);
}

// Para o carrossel automático
function stopHighlightCarousel() {
  clearInterval(highlightInterval);
}

// Controles de teclado
document.addEventListener("keydown", (e) => {
  // Só funciona se estiver na página home
  const homePage = document.getElementById("page-home");
  if (!homePage || !homePage.classList.contains("active")) return;

  if (e.key === "ArrowLeft") {
    moveHighlightCarousel(-1);
  } else if (e.key === "ArrowRight") {
    moveHighlightCarousel(1);
  }
});

// Pausa ao passar o mouse
const highlightWrapper = document.querySelector(".highlights-carousel-wrapper");
if (highlightWrapper) {
  highlightWrapper.addEventListener("mouseenter", stopHighlightCarousel);
  highlightWrapper.addEventListener("mouseleave", startHighlightCarousel);
}

// Touch/Swipe para mobile
let touchStartX = 0;
let touchEndX = 0;

const highlightCarousel = document.querySelector(".highlights-carousel");

if (highlightCarousel) {
  highlightCarousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  highlightCarousel.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleHighlightSwipe();
    },
    { passive: true },
  );
}

function handleHighlightSwipe() {
  const swipeThreshold = 50; // Distância mínima para considerar um swipe

  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe para esquerda - próximo slide
    moveHighlightCarousel(1);
  }

  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe para direita - slide anterior
    moveHighlightCarousel(-1);
  }
}

// Recalcula ao redimensionar a janela
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    updateCardsPerView();
  }, 250);
});

// Inicializa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  updateCardsPerView();
  startHighlightCarousel();
  console.log("✨ Carrossel de destaques iniciado com sucesso!");
});

// Para o carrossel quando sair da página
window.addEventListener("beforeunload", () => {
  stopHighlightCarousel();
});

// Pausa o carrossel quando a aba não está ativa (economiza recursos)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopHighlightCarousel();
  } else {
    // Só reinicia se estiver na página home
    const homePage = document.getElementById("page-home");
    if (homePage && homePage.classList.contains("active")) {
      startHighlightCarousel();
    }
  }
});

// Para o carrossel ao mudar de página
const originalShowPage = window.showPage;
if (originalShowPage) {
  window.showPage = function (pageName) {
    originalShowPage(pageName);

    if (pageName === "home") {
      startHighlightCarousel();
    } else {
      stopHighlightCarousel();
    }
  };
}
