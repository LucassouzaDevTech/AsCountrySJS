// Base de dados de produtos
const products = [
  // CHAPÉUS
  {
    id: 1,
    name: "Chapéu Country Tradicional",
    description: "Chapéu de feltro de alta qualidade, modelo clássico country",
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=500",
    category: "chapeus",
  },
  {
    id: 2,
    name: "Chapéu de Palha Premium",
    description: "Chapéu de palha natural, perfeito para o dia a dia",
    image: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=500",
    category: "chapeus",
  },
  {
    id: 3,
    name: "Chapéu Texano Original",
    description: "Modelo texano autêntico com acabamento em couro",
    image: "https://images.unsplash.com/photo-1619784299634-d7a93d954ab8?w=500",
    category: "chapeus",
  },

  // BOTAS
  {
    id: 4,
    name: "Bota Texana Masculina",
    description: "Bota em couro legítimo com solado antiderrapante",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
    category: "botas",
  },
  {
    id: 5,
    name: "Bota Texana Feminina",
    description: "Bota feminina em couro com design elegante",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500",
    category: "botas",
  },
  {
    id: 6,
    name: "Botas",
    description: "Bota texana tradicional com bordados artesanais",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    category: "botas",
  },

  // CINTOS
  {
    id: 7,
    name: "Cinto de Couro com Fivela",
    description: "Cinto em couro genuíno com fivela country",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=500",
    category: "cintos",
  },
  {
    id: 8,
    name: "Cinto Rústico Artesanal",
    description: "Cinto artesanal em couro rústico com detalhes",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "cintos",
  },
  {
    id: 9,
    name: "Cinto com Fivela Texana",
    description: "Cinto largo com fivela grande estilo texano",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500",
    category: "cintos",
  },

  // CAMISAS
  {
    id: 10,
    name: "Camisa Xadrez Country",
    description: "Camisa xadrez 100% algodão, estilo country",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    category: "camisas",
  },
  {
    id: 11,
    name: "Camiseta Country Estampada",
    description: "Camiseta com estampa country, tecido premium",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "camisas",
  },
  {
    id: 12,
    name: "Camisa Social Country",
    description: "Camisa social com detalhes bordados",
    image: "https://images.unsplash.com/photo-1602810318660-d8cc8bbb7e28?w=500",
    category: "camisas",
  },

  // CALÇAS
  {
    id: 13,
    name: "Calça Jeans Masculina",
    description: "Calça jeans tradicional, corte country",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    category: "calcas",
  },
  {
    id: 14,
    name: "Calça Jeans Feminina",
    description: "Jeans feminino com modelagem country",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
    category: "calcas",
  },
  {
    id: 15,
    name: "Calça de Couro Premium",
    description: "Calça em couro legítimo, estilo rodeio",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    category: "calcas",
  },

  // ACESSÓRIOS
  {
    id: 16,
    name: "Fivela Country Premium",
    description: "Fivela trabalhada em metal, design country",
    image: "https://images.unsplash.com/photo-1535632788-0d8e23f82338?w=500",
    category: "acessorios",
  },
  {
    id: 17,
    name: "Carteira de Couro",
    description: "Carteira em couro legítimo com gravação",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    category: "acessorios",
  },
  {
    id: 18,
    name: "Lenço Country",
    description: "Lenço tradicional em tecido de qualidade",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",
    category: "acessorios",
  },
];

// Renderiza os produtos no catálogo
function renderProducts(filter = "todos") {
  const catalog = document.getElementById("productCatalog");
  catalog.innerHTML = "";

  const filteredProducts =
    filter === "todos"
      ? products
      : products.filter((p) => p.category === filter);

  filteredProducts.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "catalog-item fade-in";
    productCard.style.animationDelay = `${index * 0.1}s`;

    productCard.innerHTML = `
      <div class="catalog-item-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="catalog-item-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
          <i class="fas fa-shopping-cart"></i>
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    `;

    catalog.appendChild(productCard);
  });

  // Trigger fade-in animation
  setTimeout(() => {
    document.querySelectorAll(".catalog-item").forEach((item) => {
      item.classList.add("visible");
    });
  }, 100);
}

// Filtro de categorias
document.addEventListener("DOMContentLoaded", () => {
  // Renderiza todos os produtos inicialmente
  renderProducts();

  // Event listeners para os botões de categoria
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active de todos os botões
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Adiciona active no botão clicado
      button.classList.add("active");

      // Filtra os produtos
      const category = button.getAttribute("data-category");
      renderProducts(category);
    });
  });
});

// Exporta para uso em outros arquivos
window.products = products;
