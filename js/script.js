// ============================================
// CONFIGURACIÓN INICIAL
// ============================================

// Número de WhatsApp del kiosco (¡REEMPLAZA CON TU NÚMERO REAL!)
const whatsappNumber = "+34665020257";

// Pedido mínimo en euros
const minimumOrder = 5;

// Carrito de compras (array vacío al inicio)
let cart = [];

// ============================================
// BASE DE DATOS DE PRODUCTOS
// ============================================

// Array con todos los productos disponibles
const products = [
    {
        id: 1,                    // Identificador único
        name: "Pack Niño",        // Nombre del producto
        price: 5,                 // Precio en euros
        description: "2 chupetines, 1 alfajor y 1 refresco de 250ml",  // Descripción
        image: "https://images.unsplash.com/photo-1602099553382-7c35b5b4b38c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        name: "Pack Finde",
        price: 12,
        description: "4 chupetines, 2 alfajores, 2 gaseosas de 500ml y 1 paquete de papas",
        image: "https://images.unsplash.com/photo-1602099553382-7c35b5b4b38c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 3,
        name: "Pack Amigos",
        price: 18,
        description: "8 chupetines, 4 alfajores, 4 gaseosas de 500ml y 2 paquetes de papas",
        image: "https://images.unsplash.com/photo-1602099553382-7c35b5b4b38c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 4,
        name: "Pack Pinalo",
        price: 0,
        description: "redbull pal body",
        image: "https://images.unsplash.com/photo-1602099553382-7c35b5b4b38c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
];

// ============================================
// FUNCIÓN DE INICIALIZACIÓN
// ============================================

// Se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar los productos en la página
    renderProducts();
    
    // Actualizar la visualización del carrito
    updateCartDisplay();
});

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

// Función para mostrar los productos en la página
function renderProducts() {
    // Obtener el contenedor donde se mostrarán los productos
    const packsGrid = document.getElementById('packsGrid');
    
    // Limpiar el contenedor antes de agregar productos
    packsGrid.innerHTML = '';
    
    // Recorrer cada producto del array
    products.forEach(product => {
        // Crear un elemento div para la tarjeta del producto
        const packCard = document.createElement('div');
        packCard.className = 'pack-card';
        
        // Establecer el contenido HTML de la tarjeta
        packCard.innerHTML = `
            <div class="pack-header">${product.name}</div>
            <div class="pack-content">
                <div class="pack-description">${product.description}</div>
                <div class="pack-price">$${product.price}</div>
                <div class="pack-actions">
                    <button class="btn btn-outline" onclick="viewPack(${product.id})">Ver pack</button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Añadir</button>
                </div>
            </div>
        `;
        
        // Agregar la tarjeta al contenedor
        packsGrid.appendChild(packCard);
    });
}

// ============================================
// FUNCIONES DEL CARRITO
// ============================================

// Función para agregar un producto al carrito
function addToCart(productId) {
    // Buscar el producto por su ID
    const product = products.find(p => p.id === productId);
    
    // Si no se encuentra el producto, salir de la función
    if (!product) return;
    
    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    // Si el producto ya existe, aumentar la cantidad
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Si es nuevo, agregarlo al carrito
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    // Actualizar la visualización del carrito
    updateCartDisplay();
    
    // Mostrar notificación al usuario
    showNotification(`${product.name} añadido al carrito`);
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    // Obtener elementos del DOM
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Calcular el total de productos en el carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Actualizar el contador del carrito flotante
    cartCount.textContent = totalItems;
    
    // Si el carrito está vacío
    if (cart.length === 0) {
        emptyCart.style.display = 'block';  // Mostrar mensaje "carrito vacío"
        cartItems.innerHTML = '';           // Limpiar items
        cartTotal.textContent = 'Total: $0'; // Resetear total
        checkoutBtn.disabled = true;        // Deshabilitar botón de compra
        return;
    }
    
    // Si hay productos en el carrito
    emptyCart.style.display = 'none';  // Ocultar mensaje "carrito vacío"
    let cartHTML = '';
    
    // Generar HTML para cada producto del carrito
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <div>
                    <div class="cart-item-name">${item.name} x ${item.quantity}</div>
                    <div style="color: #666; font-size: 0.9rem;">$${item.price} cada uno</div>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
    });
    
    // Insertar el HTML generado en el contenedor
    cartItems.innerHTML = cartHTML;
    
    // Calcular el total del pedido
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Mostrar el total formateado
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    
    // Habilitar/deshabilitar botón según el mínimo de pedido
    checkoutBtn.disabled = total < minimumOrder;
    
    // Mostrar advertencia si el pedido es menor al mínimo
    if (total < minimumOrder && cart.length > 0) {
        showNotification(`Pedido mínimo: $${minimumOrder}. Añade más productos.`);
    }
}

// ============================================
// FUNCIONES DE COMPRA
// ============================================

// Función para ver detalles de un pack
function viewPack(productId) {
    // Buscar el producto
    const product = products.find(p => p.id === productId);
    
    // Mostrar alerta con información del producto
    if (product) {
        alert(`Detalles del ${product.name}:\n\n${product.description}\n\nPrecio: $${product.price}`);
    }
}

// Función para procesar el pedido por WhatsApp
function checkout() {
    // Si el carrito está vacío, salir
    if (cart.length === 0) return;
    
    // Calcular el total del pedido
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Crear el mensaje para WhatsApp
    let message = `¡Hola! Quiero hacer un pedido desde Pica Pica:\n\n`;
    
    // Agregar cada producto al mensaje
    cart.forEach(item => {
        message += `• ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    // Agregar total y información adicional
    message += `\nTotal: $${total.toFixed(2)}`;
    message += `\n\nPedido mínimo: $${minimumOrder}`;
    message += `\n\n¡Gracias!`;
    
    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crear la URL de WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappURL, '_blank');
    
    // Limpiar el carrito después de enviar el pedido
    cart = [];
    
    // Actualizar la visualización
    updateCartDisplay();
    
    // Mostrar notificación de éxito
    showNotification('¡Pedido enviado! Revisa WhatsApp para confirmar tu compra.');
}

// ============================================
// FUNCIONES DE INTERFAZ DE USUARIO
// ============================================

// Función para mostrar/ocultar el carrito
function toggleCart() {
    // Obtener elementos del DOM
    const cartModal = document.getElementById('cartModal');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Alternar las clases "active" para mostrar/ocultar
    cartModal.classList.toggle('active');
    modalOverlay.classList.toggle('active');
}

// Función para mostrar notificaciones al usuario
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'linear-gradient(to right, #FF6B6B, #FF8E8E)';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'fadeInOut 3s forwards';
    notification.innerHTML = message;
    
    // Crear estilo para la animación
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
    `;
    
    // Agregar el estilo al head del documento
    document.head.appendChild(style);
    
    // Agregar la notificación al body
    document.body.appendChild(notification);
    
    // Eliminar la notificación después de la animación
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Función para cambiar entre secciones (simulación)
function showSection(section) {
    // Quitar clase "active" de todos los botones
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase "active" al botón clickeado
    event.target.classList.add('active');
    
    // Si se selecciona el carrito, mostrarlo
    if (section === 'cart') {
        toggleCart();
    }
}