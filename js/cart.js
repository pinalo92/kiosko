/**
 * ============================================
 * GESTIÓN DEL CARRITO DE COMPRAS
 * Archivo: cart.js
 * ============================================
 */

// ============================================
// VARIABLES DEL CARRITO
// ============================================
let cart = [];

/**
 * Obtener el carrito actual
 */
function getCart() {
    return cart;
}

/**
 * Limpiar el carrito
 */
function clearCart() {
    console.log('clearCart() called');
    cart = [];
    console.log('Carrito vaciado');
    updateCartDisplay();
    showNotification("Carrito vaciado", "info");
    saveCartToLocalStorage();
}

/**
 * Agregar producto al carrito
 */
function addToCart(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        showNotification("Producto no encontrado", "error");
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} cantidad actualizada`, "info");
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
        showNotification(`${product.name} agregado al carrito`, "success");
    }
    
    updateCartDisplay();
    saveCartToLocalStorage();
}

/**
 * Configurar event listeners para botones del carrito
 */
function setupCartButtons() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) {
        console.warn('cartItems element not found');
        return;
    }
    
    // Contar botones
    const buttons = cartItems.querySelectorAll('button[data-action]');
    console.log(`Setup cart buttons: encontrados ${buttons.length} botones`);
    
    // Remover listener anterior si existe
    cartItems.removeEventListener('click', cartItemsClickHandler);
    // Agregar nuevo listener
    cartItems.addEventListener('click', cartItemsClickHandler);
    console.log('Event listener agregado a cartItems');
}

/**
 * Manejador centralizado de clicks en el carrito
 */
function cartItemsClickHandler(e) {
    // Encontrar el botón que fue clickeado
    const btn = e.target.closest('button[data-action]');
    if (!btn) {
        return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    const action = btn.dataset.action;
    const productId = parseInt(btn.dataset.id);
    
    console.log('Cart button clicked:', {action, productId});
    
    if (!action || !productId) {
        console.warn('Invalid action or productId', {action, productId});
        return;
    }
    
    if (action === 'increase') {
        console.log('Aumentando cantidad del producto:', productId);
        increaseQuantity(productId);
    } else if (action === 'decrease') {
        console.log('Disminuyendo cantidad del producto:', productId);
        decreaseQuantity(productId);
    }
}

/**
 * Eliminar producto del carrito
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification("Producto eliminado", "info");
    saveCartToLocalStorage();
}

/**
 * Actualizar cantidad de producto
 */
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        saveCartToLocalStorage();
    }
}

/**
 * Aumentar cantidad
 */
function increaseQuantity(productId) {
    console.log('increaseQuantity called with ID:', productId);
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        console.log('Nueva cantidad:', item.quantity);
        saveCartToLocalStorage();
        updateCartDisplay();
    } else {
        console.warn('Producto no encontrado en carrito:', productId);
    }
}

/**
 * Disminuir cantidad
 */
function decreaseQuantity(productId) {
    console.log('decreaseQuantity called with ID:', productId);
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            console.log('Nueva cantidad:', item.quantity);
            saveCartToLocalStorage();
            updateCartDisplay();
        } else {
            removeFromCart(productId);
        }
    } else {
        console.warn('Producto no encontrado en carrito:', productId);
    }
}

/**
 * Calcular subtotal
 */
function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Calcular envío (gratis si supera mínimo)
 */
function calculateShipping() {
    const subtotal = calculateSubtotal();
    return subtotal >= CONFIG.minimumOrder ? 0 : 1.5; // 1.5€ si no llega al mínimo
}

/**
 * Calcular total
 */
function calculateTotal() {
    return calculateSubtotal() + calculateShipping();
}

/**
 * Validar si el pedido cumple con el mínimo
 */
function validateCartMinimum() {
    const total = calculateSubtotal();
    return total >= CONFIG.minimumOrder;
}

/**
 * Actualizar visualización del carrito
 */
function updateCartDisplay() {
    console.log('updateCartDisplay() called - Carrito tiene', cart.length, 'items');
    
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const subtotalAmount = document.getElementById('subtotalAmount');
    const shippingAmount = document.getElementById('shippingAmount');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Mostrar/ocultar carrito vacío
    if (cart.length === 0) {
        console.log('Carrito vacío - mostrando mensaje');
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg class="empty-cart-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                </svg>
                <p>Tu carrito está vacío</p>
                <p class="empty-cart-text">¡Agrega productos para comenzar!</p>
            </div>
        `;
        subtotalAmount.textContent = '$0.00';
        shippingAmount.textContent = 'Gratis';
        totalAmount.innerHTML = '<strong>$0.00</strong>';
        checkoutBtn.disabled = true;
        return;
    }
    
    console.log('Carrito con items - generando HTML');
    
    // Generar HTML de items
    let cartHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-quantity">€${item.price.toFixed(2)} x ${item.quantity}</div>
                    <div class="cart-item-actions">
                        <button type="button" class="quantity-btn" data-action="decrease" data-id="${item.id}">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button type="button" class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <div class="cart-item-price">€${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    console.log('HTML generado y asignado');
    
    // Agregar event listeners a los nuevos botones
    setupCartButtons();
    
    // Actualizar totales
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const total = calculateTotal();
    
    subtotalAmount.textContent = `€${subtotal.toFixed(2)}`;
    shippingAmount.textContent = shipping > 0 ? `€${shipping.toFixed(2)}` : 'Gratis';
    totalAmount.innerHTML = `<strong>€${total.toFixed(2)}</strong>`;
    
    // Habilitar/deshabilitar botón
    checkoutBtn.disabled = !validateCartMinimum();
    console.log('Botón comprar:', checkoutBtn.disabled ? 'deshabilitado' : 'habilitado');
    
    // Mostrar advertencia si no cumple mínimo
    if (!validateCartMinimum() && cart.length > 0) {
        showNotification(`Pedido mínimo: €${CONFIG.minimumOrder}. Añade más productos.`, "warning");
    }
}

/**
 * Guardar carrito en localStorage
 */
function saveCartToLocalStorage() {
    localStorage.setItem('picapica_cart', JSON.stringify(cart));
}

/**
 * Cargar carrito desde localStorage
 */
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('picapica_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

/**
 * Inicializar carrito
 */
function initCart() {
    console.log('initCart() called');
    loadCartFromLocalStorage();
    console.log('Carrito cargado:', cart);
}

// NO inicializar aquí - se hará en ui.js después de que todo esté cargado

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.increaseQuantity = increaseQuantity;
    window.decreaseQuantity = decreaseQuantity;
    window.clearCart = clearCart;
    window.updateCartDisplay = updateCartDisplay;
    window.setupCartButtons = setupCartButtons;
    window.cartItemsClickHandler = cartItemsClickHandler;
}