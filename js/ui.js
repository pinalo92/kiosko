/**
 * ============================================
 * FUNCIONES DE INTERFAZ DE USUARIO
 * Solo Packs - Versión simplificada
 * ============================================
 */

/**
 * Ocultar preloader cuando la página carga
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DOMContentLoaded fired ===');
    
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 500);
    
    // Cargar productos al inicio
    loadProducts();
    
    // DEBUG: Verificar que las funciones estén disponibles
    console.log('Funciones disponibles:', {
        increaseQuantity: typeof window.increaseQuantity,
        decreaseQuantity: typeof window.decreaseQuantity,
        clearCart: typeof window.clearCart,
        checkout: typeof window.checkout,
        addToCart: typeof window.addToCart
    });
    
    // Inicializar carrito después de que todo esté listo
    setTimeout(() => {
        console.log('Inicializando carrito...');
        if (typeof window.initCart === 'function') {
            window.initCart();
        }
    }, 100);
});

/**
 * Cargar y mostrar productos
 */
function loadProducts() {
    // Solo mostramos packs
    const packsContainer = document.getElementById('packsProducts');
    if (packsContainer) {
        renderProducts(packsContainer, getPackProducts());
    }
}

/**
 * Renderizar productos en un contenedor
 */
function renderProducts(container, products) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No hay packs disponibles</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <div class="product-header">
                <h3 class="product-name">${product.name}</h3>
            </div>
            <div class="product-content">
                <p class="product-description">${product.description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="showProductDetails(${product.id})">Ver más</button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Añadir</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Category click handling (visual only). If you want filtering, I can wire this to filter products.
document.addEventListener('click', function (e) {
    const cat = e.target.closest('.category-item');
    if (!cat) return;
    document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
    cat.classList.add('active');
});

/**
 * Mostrar detalles de producto
 */
function showProductDetails(productId) {
    const product = getProductById(productId);
    if (product) {
        showNotification(`${product.name}\n\n${product.description}\n\nPrecio: ${formatPrice(product.price)}`, "info");
    }
}

/**
 * Buscar productos
 */
let searchTimeout;
function searchProducts(event) {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        const searchTerm = event.target.value.trim();
        
        if (searchTerm.length < CONFIG.search.minChars) {
            loadProducts(); // Resetear a productos originales
            return;
        }
        
        const results = searchProductsByName(searchTerm);
        
        // Actualizar solo la sección de packs
        const packsContainer = document.getElementById('packsProducts');
        
        if (packsContainer) renderProducts(packsContainer, results);
        
        if (results.length === 0) {
            showNotification("No se encontraron packs", "info");
        }
    }, CONFIG.search.delay);
}

/**
 * Filtrar por categoría
 */
function filterByCategory(category) {
    // Actualizar botones activos
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    const products = getProductsByCategory(category);
    
    // Actualizar solo la sección de packs
    const packsContainer = document.getElementById('packsProducts');
    
    if (packsContainer) renderProducts(packsContainer, products);
}

/**
 * Mostrar/Ocultar carrito
 */
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    const modalOverlay = document.getElementById('modalOverlay');
    
    cartModal.classList.toggle('active');
    modalOverlay.classList.toggle('active');
}

/**
 * Mostrar notificación
 */
function showNotification(message, type = "info") {
    const container = document.getElementById('notificationContainer');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <svg class="notification-icon" viewBox="0 0 24 24">
            ${getNotificationIcon(type)}
        </svg>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Eliminar después de la duración configurada
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(00%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, CONFIG.notifications.duration);
}

/**
 * Obtener icono para notificación
 */
function getNotificationIcon(type) {
    switch(type) {
        case 'success':
            return '<path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M11 16.5L7 12.5L8.41 11.09L11 13.67L15.59 9.09L17 10.5L11 16.5Z"/>';
        case 'error':
            return '<path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12S6.47 22 12 22 22 17.53 22 12 17.53 2 12 2M13 17H11V15H13V17M13 13H11V7H13V13Z"/>';
        case 'warning':
            return '<path fill="currentColor" d="M13 13H11V7H13M13 17H11V15H13M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z"/>';
        default: // info
            return '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M13 17H11V15H13V17M13 13H11V7H13V13Z"/>';
    }
}

/**
 * Cambiar sección (navegación simulada)
 */
function showSection(section) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    if (section === 'cart') {
        toggleCart();
    }
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.loadProducts = loadProducts;
    window.renderProducts = renderProducts;
    window.showProductDetails = showProductDetails;
    window.searchProducts = searchProducts;
    window.filterByCategory = filterByCategory;
    window.toggleCart = toggleCart;
    window.showNotification = showNotification;
    window.showSection = showSection;
}