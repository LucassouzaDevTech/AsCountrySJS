// Controle de navegação entre páginas
let currentPage = "home";

// Mostra página específica
function showPage(pageName) {
  // Esconde todas as páginas
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Mostra a página selecionada
  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.classList.add("active");
    currentPage = pageName;

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Remove active dos links do menu
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.classList.remove("active");
    });

    // Adiciona active no link atual
    const activeLink = document.querySelector(
      `.nav-menu a[onclick*="${pageName}"]`,
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }

    // Fecha menu mobile se estiver aberto
    closeMobileMenu();
  }
}

// Scroll suave para seção
function scrollToSection(sectionId) {
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Altura da navbar
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, 100);
}

// Filtra categoria e vai para produtos
function filterCategory(category) {
  setTimeout(() => {
    // Remove active de todos os botões
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Adiciona active no botão da categoria
    const categoryBtn = document.querySelector(
      `.category-btn[data-category="${category}"]`,
    );
    if (categoryBtn) {
      categoryBtn.classList.add("active");
    }

    // Renderiza os produtos filtrados
    renderProducts(category);
  }, 300);
}

// Toggle menu mobile
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");

  // Alterna ícone
  const icon = menuToggle.querySelector("i");
  if (navMenu.classList.contains("active")) {
    icon.className = "fas fa-times";
  } else {
    icon.className = "fas fa-bars";
  }
}

// Fecha menu mobile
function closeMobileMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.className = "fas fa-bars";
  }
}

// Fecha menu ao clicar fora
document.addEventListener("click", (e) => {
  const navMenu = document.querySelector(".nav-menu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (navMenu && menuToggle) {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// Inicializa na home
document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
  console.log("✅ Navegação inicializada");
});

// Função especial para menu mobile - fecha IMEDIATAMENTE
window.mobileNav = function(pageName) {
  // Fecha o menu mobile instantaneamente
  const menu = document.getElementById('mm');
  if (menu) {
    menu.classList.remove('open');
  }
  
  // Navega para a página
  showPage(pageName);
  
  return false;
};
