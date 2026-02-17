// Масив з товарами
const products = [
  {
    id: 1,
    name: "Echoes Of Valor",
    price: 52.98,
    image: "./img/game-1.webp",
    discount: 56.67,
    platform: "PS5",
    icon: "🎮",
    tagline: "Honor. Betrayal. Glory.",
    shortDescription: "Lead your army to victory in an epic medieval battlefield full of honor, betrayal, and glory.",
    fullDescription: "Step into a war-torn kingdom where ancient legends and political intrigue collide. Echoes of Valor places you in the boots of a reluctant hero forced to rally warring factions and restore peace to the realm. With dynamic large-scale battles, branching storylines, and immersive dialogue choices, every decision shapes your legacy.\n\nThe game masterfully blends real-time combat with strategic command elements. Whether you're leading troops across muddy fields or negotiating uneasy truces, the depth of gameplay and narrative will keep you coming back. Enhanced for PS5, expect breathtaking visuals, fast loading, and rich haptic feedback."
  },
  {
    id: 2,
    name: "Iron Horizon",
    price: 58.16,
    image: "./img/game-2.webp",
    discount: 72.56,
    platform: "Xbox",
    icon: "🚀",
    tagline: "Command. Conquer. Explore.",
    shortDescription: "Command a fleet of warships across galaxies in this cinematic sci-fi strategy adventure.",
    fullDescription: "In Iron Horizon, humanity has reached the stars—but not peace. As a Fleet Commander navigating interstellar conflict, you'll forge alliances, wage tactical battles, and uncover a mysterious alien technology that could shift the balance of power. The storyline is packed with high-stakes drama and moral dilemmas.\n\nFeaturing deep customization systems for your ships and crew, the game offers both action-packed missions and thoughtful exploration. Whether you're fighting pirates in asteroid fields or uncovering ancient ruins on forgotten moons, Iron Horizon delivers cinematic sci-fi at its best. Optimized for Xbox Series X with 4K support and enhanced performance."
  },
  {
    id: 3,
    name: "Skyfall Chronicles",
    price: 50.73,
    image: "./img/game-3.webp",
    discount: 59.47,
    platform: "PC",
    icon: "☁️",
    tagline: "Discover. Explore. Soar.",
    shortDescription: "Discover floating cities and lost civilizations in this breathtaking steampunk fantasy RPG.",
    fullDescription: "Skyfall Chronicles invites you into a floating world where islands drift above the clouds, and airships are the only way to travel. You play as an archivist turned adventurer, unraveling the mystery of a long-lost civilization. The game combines classic JRPG vibes with modern design and vibrant worldbuilding.\n\nCombat is turn-based but tactical, with elemental synergies and airship battles that add a fresh twist. Exploration is richly rewarded—every sky island holds secrets, puzzles, and lore. From haunting ruins to bustling cloud cities, this game is a love letter to fantasy storytelling and indie creativity."
  }
];


// Функції для роботи з localStorage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Оновлення кількості товарів в вішлісті
function updateWishlistCount() {
  const wishlist = getFromLocalStorage("wishlist");
  const wishlistCountElement = document.getElementById("wishlist-count");
  if (wishlistCountElement) {
    wishlistCountElement.textContent = wishlist.length;
  }
  // Оновлюємо також favorites-count для хедера
  const favoritesCountElement = document.getElementById("favorites-count");
  if (favoritesCountElement) {
    favoritesCountElement.textContent = wishlist.length;
  }
}

// Оновлення кількості товарів у кошику
function updateCartCount() {
  const cart = getFromLocalStorage("cart");
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

// Додавання до вішлісту
function addToWishlist(productId) {
  const wishlist = getFromLocalStorage("wishlist");
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.error("Product not found");
    return;
  }

  if (!wishlist.some((item) => item.id === productId)) {
    wishlist.push(product);
    saveToLocalStorage("wishlist", wishlist);
    updateWishlistCount();
    alert(`${product.name} added to your wishlist!`);
  } else {
    alert(`${product.name} is already in your wishlist`);
  }
}

// Додавання до кошика з підтримкою quantity
function addToCart(productId) {
  const cart = getFromLocalStorage("cart");
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.error("Product not found");
    return;
  }

  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = (cartItem.quantity || 1) + 1;
    alert(`${product.name} quantity increased in your cart!`);
  } else {
    cart.push({ ...product, quantity: 1 });
    alert(`${product.name} added to your cart!`);
  }
  saveToLocalStorage("cart", cart);
  updateCartCount();
}

// Зменшення кількості товару у кошику
function decreaseCartQuantity(productId) {
  const cart = getFromLocalStorage("cart");
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = (cartItem.quantity || 1) - 1;
    if (cartItem.quantity <= 0) {
      // Видаляємо товар, якщо кількість стала 0
      const newCart = cart.filter((item) => item.id !== productId);
      saveToLocalStorage("cart", newCart);
    } else {
      saveToLocalStorage("cart", cart);
    }
    updateCartCount();
    if (typeof displayCart === 'function') displayCart();
    if (typeof displayCheckout === 'function') displayCheckout();
  }
}

// Збільшення кількості товару у кошику
function increaseCartQuantity(productId) {
  const cart = getFromLocalStorage("cart");
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = (cartItem.quantity || 1) + 1;
    saveToLocalStorage("cart", cart);
    updateCartCount();
    if (typeof displayCart === 'function') displayCart();
    if (typeof displayCheckout === 'function') displayCheckout();
  }
}

// Видалення товару з вішлісту
function removeFromWishlist(productId) {
  let wishlist = getFromLocalStorage("wishlist");
  wishlist = wishlist.filter((item) => item.id !== productId);
  saveToLocalStorage("wishlist", wishlist);
  if (typeof displayWishlist === 'function') {
    displayWishlist(); // Оновлюємо вішліст, якщо функція існує
  }
  updateWishlistCount();
}

// Видалення товару з кошика (повністю)
function removeFromCart(productId) {
  let cart = getFromLocalStorage("cart");
  cart = cart.filter((item) => item.id !== productId);
  saveToLocalStorage("cart", cart);
  if (typeof displayCart === 'function') {
    displayCart(); // Оновлюємо кошик, якщо функція існує
  }
  if (typeof displayCheckout === 'function') {
    displayCheckout();
  }
  updateCartCount();
}

// Відображення товарів у кошику з кнопками + і -
function displayCart() {
  const cart = getFromLocalStorage("cart");
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  const totalPriceElement = document.getElementById("total-price");
  cartContainer.innerHTML = ""; // Очищаємо контейнер перед додаванням товарів
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="empty-cart-message"><p>Your cart is empty</p><a href="index.html" class="game-btn">Browse Games</a></div>';
    if (document.getElementById("cart-summary")) {
      document.getElementById("cart-summary").style.display = "none"; // Приховуємо підсумок
    }
    return;
  }

  cart.forEach((item) => {
    const quantity = item.quantity || 1;
    const productElement = document.createElement("div");
    productElement.classList.add("cart-item");
    productElement.innerHTML = `
      <div class="cart-item-content">
        <div class="row align-items-center">
          <div class="col-md-2 col-sm-3">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}" class="img-fluid">
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <div class="cart-item-platform">${item.platform}</div>
              <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6">
            <div class="cart-item-quantity">
              <button class="quantity-btn" onclick="decreaseCartQuantity(${item.id})">
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" class="quantity-input" value="${quantity}" readonly>
              <button class="quantity-btn" onclick="increaseCartQuantity(${item.id})">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="col-md-2 col-sm-6">
            <div class="text-center">
              <div class="fw-bold mb-2" style="color: var(--accent); font-size: 1.1rem;">
                $${(item.price * quantity).toFixed(2)}
              </div>
            </div>
          </div>
          <div class="col-md-1 col-sm-6 text-end">
            <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove from cart">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    cartContainer.appendChild(productElement);
    totalPrice += item.price * quantity;
  });

  if (totalPriceElement) {
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    if (document.getElementById("cart-summary")) {
      document.getElementById("cart-summary").style.display = "block";
    }
  }
}

// Відображення товарів у вішлісті
function displayWishlist() {
  const wishlist = getFromLocalStorage("wishlist");
  const wishlistContainer = document.getElementById("wishlist-items");
  if (!wishlistContainer) return;

  wishlistContainer.innerHTML = ""; // Очищаємо контейнер перед додаванням товарів

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = '<div class="empty-wishlist-message"><p>Your wishlist is empty</p><a href="index.html" class="game-btn">Browse Games</a></div>';
    return;
  }

  wishlist.forEach((item) => {
    const productElement = document.createElement("div");
    productElement.classList.add("col-md-6", "col-lg-4", "mb-4");
    
    const discountPercent = Math.round(((item.discount - item.price) / item.discount) * 100);
    
    productElement.innerHTML = `
      <div class="favorite-item">
        <div class="favorite-item-image">
          <img src="${item.image}" alt="${item.name}" class="img-fluid">
          <div class="favorite-badge">
            <i class="fas fa-heart"></i>
          </div>
          <div class="favorite-platform-badge">${item.platform}</div>
        </div>
        <div class="favorite-item-content">
          <h4 class="favorite-item-title">${item.name}</h4>
          <div class="favorite-item-price">
            <span class="favorite-original-price">$${item.discount.toFixed(2)}</span>
            <span class="favorite-current-price">$${item.price.toFixed(2)}</span>
          </div>
          <p class="favorite-item-description">${item.shortDescription}</p>
          <div class="favorite-actions">
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
              <i class="fas fa-shopping-cart me-2"></i>Add to Cart
            </button>
            <button class="remove-favorite-btn" onclick="removeFromWishlist(${item.id})" title="Remove from favorites">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    wishlistContainer.appendChild(productElement);
  });
}

// Функція для продовження покупок (перенаправляє на головну сторінку)
function continueShopping() {
  window.location.href = "index.html";
}

// Функція для переходу до оформлення замовлення
function checkout() {
  window.location.href = "checkout.html";
}

// Отримання ID продукту з URL
function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id');
  return idParam ? parseInt(idParam) : null;
}

// Ініціалізація лічильників при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  updateWishlistCount();
  
  // Перевіряємо, чи це сторінка кошика
  if (document.getElementById('cart-items')) {
    displayCart();
  }
  
  // Перевіряємо, чи це сторінка вішлісту
  if (document.getElementById('wishlist-items')) {
    displayWishlist();
  }
});


// Функція для відображення деталей продукту на сторінці
function displayProductDetails() {
  const productId = getProductIdFromUrl();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.error("Product not found");
    return;
  }

  const productDetailsSection = document.getElementById("product-details");
  if (!productDetailsSection) return;

  // Оновлюємо заголовок сторінки
  document.title = `${product.name} -  Digital Rush Play`;

  // Оновлюємо контейнер з зображенням та описом
  const productDetailsContainer = productDetailsSection.querySelector(".product-container") || productDetailsSection;
  
  if (productDetailsContainer) {
    const discountPercent = Math.round(((product.discount - product.price) / product.discount) * 100);
    
    const productContent = `
      <div class="row g-4">
        <div class="col-lg-5">
          <div class="product-image-section">
            <div class="product-main-image" style="height: 300px;">
              <img src="${product.image}" alt="${product.name}" class="img-fluid" />
              ${discountPercent > 0 ? `<div class="product-sale-badge">-${discountPercent}%</div>` : ''}
              <div class="product-platform-badge">${product.platform}</div>
            </div>
            
            <div class="product-features mt-4">
              <h5>Key Features</h5>
              <ul>
                <li>Instant digital download</li>
                <li>Full game with all DLCs included</li>
                <li>Compatible with ${product.platform}</li>
                <li>Multilingual support</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="product-details-section">
            <h1 class="product-title">${product.name}</h1>
            
            <div class="product-rating">
              <div class="product-stars">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star-half-alt"></i>
              </div>
              <span class="product-rating-text">(4.5/5 - Based on 127 reviews)</span>
            </div>
            
            <div class="product-price-section">
              ${product.discount > product.price ? `<div class="product-original-price">Was: $${product.discount.toFixed(2)}</div>` : ''}
              <div class="product-current-price">$${product.price.toFixed(2)}</div>
              ${discountPercent > 0 ? `<span class="product-discount">Save ${discountPercent}%</span>` : ''}
            </div>
            
            <div class="product-actions mb-4">
              <button onclick="addToCart(${product.id})" class="add-to-cart-product-btn">
                <i class="fas fa-shopping-cart me-2"></i>Add to Cart
              </button>
              <button onclick="addToWishlist(${product.id})" class="add-to-favorites-btn">
                <i class="fas fa-heart me-2"></i>Add to Wishlist
              </button>
            </div>
            
            <div class="product-description">
              <h5 style="color: var(--text); font-weight: 700; margin-bottom: 1rem;">Game Description</h5>
              ${product.fullDescription.replace(/\n\n/g, '<br><br>')}
            </div>
          </div>
        </div>
      </div>
    `;

    productDetailsContainer.innerHTML = productContent;
  }
}



// Функція для збереження переглянутого товару
function addToRecentlyViewed(productId) {
  let recentlyViewed = getFromLocalStorage("recentlyViewed");

  // Спочатку видаляємо поточний товар з нещодавно переглянутих, якщо він там був
  recentlyViewed = recentlyViewed.filter((item) => item.id !== productId);

  // Потім додаємо поточний товар на початок масиву
  const product = products.find((p) => p.id === productId);
  if (product) {
    recentlyViewed.unshift(product);

    // Залишаємо лише останні 3 товари
    if (recentlyViewed.length > 3) {
      recentlyViewed = recentlyViewed.slice(0, 3);
    }

    saveToLocalStorage("recentlyViewed", recentlyViewed);
  }
}

// Ініціалізація кількостей при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistCount();
  updateCartCount();

  // Якщо ми на сторінці продукту, відображаємо деталі продукту
  if (window.location.pathname.includes("product.html")) {
    displayProductDetails();
  }

  // Якщо ми на головній сторінці або на сторінці каталогу, відображаємо всі продукти
  const productsContainer = document.getElementById("products-container");
  if (productsContainer) {
    displayAllProducts();
  }
});

// Відображення товарів на сторінці оформлення замовлення з можливістю змінювати кількість
function displayCheckout() {
  const cart = getFromLocalStorage("cart");
  const checkoutContainer = document.getElementById("checkout-items");
  const totalPriceElement = document.getElementById("total-price");
  
  if (!checkoutContainer) return;

  checkoutContainer.innerHTML = "";
  if (cart.length === 0) {
    checkoutContainer.innerHTML = '<div class="empty-cart-message"><p>Your cart is empty</p><a href="index.html" class="game-btn">Browse Games</a></div>';
    if (totalPriceElement) totalPriceElement.textContent = "0";
    return;
  }

  let totalPrice = 0;
  cart.forEach((item) => {
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;
    totalPrice += itemTotal;

    const productElement = document.createElement("div");
    productElement.classList.add("checkout-item");
    productElement.innerHTML = `
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center flex-grow-1">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-platform ms-2">${item.platform}</div>
        </div>
        <div class="d-flex align-items-center">
          <span class="me-3" style="color: var(--text); opacity: 0.7;">Qty: ${quantity}</span>
          <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
        </div>
      </div>
    `;
    checkoutContainer.appendChild(productElement);
  });

  if (totalPriceElement) {
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
}
