let cart = [];

// Carrega carrinho do localStorage
function loadCart() {
  const saved = localStorage.getItem("asCountryCart");
  if (saved) {
    cart = JSON.parse(saved);
    updateCart();
  }
}

// Salva carrinho no localStorage
function saveCart() {
  localStorage.setItem("asCountryCart", JSON.stringify(cart));
}

// Abre/fecha carrinho
function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Adiciona produto
function addToCart(productId) {
  const product = window.products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart();
  updateCart();
  showNotification("Produto adicionado ao carrinho!");
}

// Remove produto
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCart();
}

// Atualiza quantidade
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCart();
    }
  }
}

// Atualiza UI do carrinho
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Mostra/esconde contador
  if (totalItems > 0) {
    cartCount.classList.add("show");
  } else {
    cartCount.classList.remove("show");
  }

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <p>Seu carrinho está vazio</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                <i class="fas fa-minus"></i>
              </button>
              <span class="quantity-display">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  }
}

// Limpa carrinho
function clearCart() {
  if (cart.length === 0) return;

  if (confirm("Deseja limpar todo o carrinho?")) {
    cart = [];
    saveCart();
    updateCart();
    showNotification("Carrinho limpo!");
  }
}

// Envia para WhatsApp
function sendToWhatsApp() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const phoneNumber = "5543999056364";
  let message = "*Olá! Gostaria de fazer um pedido:*%0A%0A";

  cart.forEach((item) => {
    message += `• *${item.name}*%0A`;
    message += `  Quantidade: ${item.quantity}%0A%0A`;
  });

  message += "Aguardo retorno. Obrigado!";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
}

// Notificação
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  notification.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 25px;
    background: #25d366;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 500;
    animation: slideInNotification 0.3s ease;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInNotification {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;

  if (!document.querySelector("#notification-style")) {
    style.id = "notification-style";
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideInNotification 0.3s ease reverse";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2500);
}

// Fecha carrinho com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const sidebar = document.getElementById("cartSidebar");
    if (sidebar && sidebar.classList.contains("active")) {
      toggleCart();
    }
  }
});

// Inicializa ao carregar
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});

// Salva antes de sair
window.addEventListener("beforeunload", () => {
  saveCart();
});
