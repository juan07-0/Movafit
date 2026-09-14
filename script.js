const products = [
    { id: 1, name: "Legging de Compresión Active", price: 85000, desc: "Tejido flexible de alto rendimiento y secado rápido.", emoji: "👖", tag: "Nuevo" },
    { id: 2, name: "Top Deportivo Balance", price: 55000, desc: "Soporte medio ideal para yoga, pilates y gym.", emoji: "🎽", tag: "Popular" },
    { id: 3, name: "Camiseta Esencial Dry-Fit", price: 60000, desc: "Diseño moderno y transpirable para hombre y mujer.", emoji: "👕", tag: "Essential" },
    { id: 4, name: "Short Deportivo Running", price: 70000, desc: "Comodidad máxima y ligereza absoluta al trotar.", emoji: "🩳", tag: "Sport" },
    { id: 5, name: "Chaqueta Cortavientos Move", price: 120000, desc: "Protección ligera para tus entrenamientos al aire libre.", emoji: "🧥", tag: "Exclusivo" },
    { id: 6, name: "Termo Oficial MOVA", price: 45000, desc: "Accesorio esencial para mantenerte hidratado.", emoji: "🥤", tag: "Accesorios" }
];

let cart = [];

const productGrid = document.getElementById('productGrid');
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <span class="product-badge">${product.tag}</span>
        <div class="product-image">${product.emoji}</div>
        <div class="product-info">
            <div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
            </div>
            <div class="product-footer">
                <span class="product-price">$${product.price.toLocaleString()} COP</span>
                <button class="btn-add" onclick="addToCart(${product.id})">Agregar</button>
            </div>
        </div>
    `;
    productGrid.appendChild(card);
});

const cartOverlay = document.getElementById('cartOverlay');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCartBtn');
const toastNotification = document.getElementById('toastNotification');
const toastText = document.getElementById('toastText');

cartBtn.addEventListener('click', () => {
    cartOverlay.style.display = 'flex';
    setTimeout(() => cartOverlay.classList.add('open'), 10);
});

closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('open');
    setTimeout(() => cartOverlay.style.display = 'none', 300);
});

function showToast(productName) {
    toastText.textContent = `¡${productName} agregado al carro!`;
    toastNotification.classList.add('show');
    
    cartCount.classList.add('pulse');
    setTimeout(() => {
        cartCount.classList.remove('pulse');
    }, 300);

    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 2500);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showToast(product.name);
}

function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--gray-medium); margin-top: 2rem;">Tu carrito está vacío</p>';
        cartTotal.textContent = '$0 COP';
        clearCartBtn.style.display = 'none'; // Ocultar botón vaciar si está vacío
        return;
    }

    clearCartBtn.style.display = 'block'; // Mostrar botón vaciar si hay elementos
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = `$${total.toLocaleString()} COP`;
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCart();
}

// Función para vaciar el carrito por completo
clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
});

document.getElementById('checkoutWhatsapp').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de finalizar la compra.');
        return;
    }

    let message = "¡Hola, *MOVA*! 🖤🤍\nQuiero finalizar la compra de los siguientes productos:\n\n";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.quantity}x ${item.name} - $${subtotal.toLocaleString()} COP\n`;
    });

    message += `\n*Total a Pagar:* $${total.toLocaleString()} COP\n\nQuedo atento(a) para coordinar el pago y el envío. ¡Muévete, inspira, evoluciona! ✨`;

    const phoneNumber = "573332230640"; 
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
});

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.addEventListener('click', () => navMenu.classList.toggle('active'));

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});
