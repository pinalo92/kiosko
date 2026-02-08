/**
 * ============================================
 * CONFIGURACIÓN GENERAL DE LA APLICACIÓN
 * Archivo: config.js
 * ============================================
 */

// ============================================
// CONFIGURACIÓN DE WHATSAPP
// ============================================
const CONFIG = {
    // Número de WhatsApp del kiosco
    whatsappNumber: "+34665020257",
    
    // Pedido mínimo para realizar compra
    minimumOrder: 5,
    
    // Moneda utilizada
    currency: "€",
    
    // Horarios de atención
    schedules: {
        weekdays: "20:00 - 21:00",
        weekend: "20:00 - 21:00"
    },
    
    // Información de contacto
    contact: {
        phone: "+34-665-020-257",
        email: "hola@picapica.com",
        address: "Calle Morón 2, la puebla de cazalla, Sevilla"
    },
    
    // Redes sociales
    social: {
        instagram: "https://www.instagram.com/kioscopicapica/",
        whatsapp: "https://wa.me/+34665020257"
    },
    
    // Configuración de notificaciones
    notifications: {
        duration: 3000, // Duración en milisegundos
        position: "top-right" // top-right, top-left, bottom-right, bottom-left
    },
    
    // Configuración de búsqueda
    search: {
        minChars: 2, // Mínimo de caracteres para buscar
        delay: 300 // Delay en milisegundos para búsqueda
    }
};

/**
 * Función para obtener el número de WhatsApp formateado
 */
function getWhatsAppNumber() {
    return CONFIG.whatsappNumber;
}

/**
 * Función para obtener el pedido mínimo
 */
function getMinimumOrder() {
    return CONFIG.minimumOrder;
}

/**
 * Función para formatear precios con moneda
 */
function formatPrice(price) {
    return `${CONFIG.currency}${price.toFixed(2)}`;
}

/**
 * Función para validar si el pedido cumple con el mínimo
 */
function validateMinimumOrder(total) {
    return total >= CONFIG.minimumOrder;
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.getWhatsAppNumber = getWhatsAppNumber;
    window.getMinimumOrder = getMinimumOrder;
    window.formatPrice = formatPrice;
    window.validateMinimumOrder = validateMinimumOrder;
}

// Exportar configuración (para uso en módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}