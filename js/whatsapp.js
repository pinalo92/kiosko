/**
 * ============================================
 * INTEGRACIÓN CON WHATSAPP
 * Archivo: whatsapp.js
 * ============================================
 */

/**
 * Generar mensaje para WhatsApp
 */
function generateWhatsAppMessage() {
    const total = calculateTotal();
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    
    let message = `¡Hola! Quiero hacer un pedido desde Pica Pica 🍬\n\n`;
    
    // Agregar productos
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        message += `${index + 1}. ${item.name}\n`;
        message += `   Cantidad: ${item.quantity} x $${item.price.toFixed(2)} = $${itemTotal.toFixed(2)}\n\n`;
    });
    
    // Agregar totales
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `Subtotal: $${subtotal.toFixed(2)}\n`;
    message += `Envío: ${shipping > 0 ? `$${shipping.toFixed(2)}` : 'Gratis'}\n`;
    message += `Total: $${total.toFixed(2)}\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Información adicional
    message += `📅 Horarios de entrega:\n`;
    message += `• Lunes a Viernes: ${CONFIG.schedules.weekdays}\n`;
    message += `• Sábado y Domingo: ${CONFIG.schedules.weekend}\n\n`;
    
    message += `📍 Dirección de entrega: __________________\n\n`;
    message += `📞 Teléfono de contacto: __________________\n\n`;
    message += `¡Gracias! Espero su confirmación. 🙏`;
    
    return message;
}

/**
 * Codificar mensaje para URL
 */
function encodeWhatsAppMessage(message) {
    return encodeURIComponent(message);
}

/**
 * Generar URL de WhatsApp
 */
function generateWhatsAppURL() {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeWhatsAppMessage(message);
    const whatsappNumber = getWhatsAppNumber();
    
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Abrir WhatsApp con el pedido
 */
function openWhatsApp() {
    const whatsappURL = generateWhatsAppURL();
    window.open(whatsappURL, '_blank');
}

/**
 * Procesar checkout y enviar a WhatsApp
 */
function checkout() {
    if (cart.length === 0) {
        showNotification("El carrito está vacío", "warning");
        return;
    }
    
    if (!validateCartMinimum()) {
        showNotification(`Pedido mínimo: $${CONFIG.minimumOrder}`, "error");
        return;
    }
    
    // Abrir WhatsApp
    openWhatsApp();
    
    // Mostrar mensaje de confirmación
    showNotification("¡Pedido enviado! Revisa WhatsApp para confirmar tu compra.", "success");
    
    // Opcional: Limpiar carrito después de 3 segundos
    setTimeout(() => {
        // cart = [];
        // updateCartDisplay();
        // saveCartToLocalStorage();
    }, 3000);
}

/**
 * Compartir en WhatsApp (versión alternativa)
 */
function shareOnWhatsApp() {
    if (navigator.share) {
        // Usar Web Share API si está disponible
        const message = generateWhatsAppMessage();
        navigator.share({
            title: 'Mi pedido - Pica Pica',
            text: message,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback a WhatsApp Web
        openWhatsApp();
    }
}

/**
 * Copiar mensaje de WhatsApp al portapapeles
 */
async function copyWhatsAppMessage() {
    const message = generateWhatsAppMessage();
    
    try {
        await navigator.clipboard.writeText(message);
        showNotification("Mensaje copiado al portapapeles", "success");
    } catch (err) {
        showNotification("Error al copiar mensaje", "error");
        console.error('Error al copiar:', err);
    }
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.checkout = checkout;
    window.openWhatsApp = openWhatsApp;
    window.shareOnWhatsApp = shareOnWhatsApp;
    window.copyWhatsAppMessage = copyWhatsAppMessage;
}