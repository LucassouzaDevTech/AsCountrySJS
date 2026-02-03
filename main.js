// Intersection Observer para animações reveal
const observerOptions = {
  threshold: 0.05,
  rootMargin: "0px 0px -30px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("vis");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observa todos os elementos com classe reveal
function initReveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
}

// Efeito de scroll na navegação
let lastScroll = 0;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Inicializa quando DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  console.log("🤠 AS Country - Site carregado!");

  // Inicializa reveal observer
  initReveal();

  // Força exibição de elementos reveal que já estão na viewport
  setTimeout(() => {
    document.querySelectorAll(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("vis");
      }
    });
  }, 100);
});

// Re-inicializa reveal quando mudar de página
const originalShowPage = window.showPage;
if (typeof originalShowPage === "function") {
  window.showPage = function (pageName) {
    originalShowPage(pageName);

    // Aguarda um pouco e inicializa reveal
    setTimeout(() => {
      initReveal();

      // Força exibição imediata dos elementos visíveis
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("vis");
        }
      });
    }, 50);
  };
}

// Console branding
console.log(
  "%cAS Country",
  "font-size: 24px; font-weight: bold; color: #c9b38c;",
);
console.log("%cSite redesenhado com ❤️", "font-size: 14px; color: #bdbdbd;");
