/**
 * ============================================
 * BASE DE DATOS DE PRODUCTOS
 * Solo Packs - Versión simplificada
 * ============================================
 */

// ============================================
// ARRAY DE PACKS (solo packs)
// ============================================
const PRODUCTS = [
    // ============================================
    //                  PACKS
    // ============================================
    {
        id: 1,
        name: "Pack Niño",
        price: 5,
        description: "1 osito, 1 Nubes, 1 KitKat y 1 agua",
        category: "packs",
        featured: true,
        image: "https://images.unsplash.com/photo-1602099553382-7c35b5b4b38c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        badge: "🔥 Popular",
        products: [
            { name: "ositos", quantity: 1 },
            { name: "Nubes", quantity: 1 },
            { name: "KitKat", quantity: 1 },
            { name: "agua", quantity: 1 }
        ]
    },
    {
        id: 2,
        name: "Pack Finde",
        price: 12,
        description: "4 chupetines, 2 alfajores, 2 gaseosas de 500ml y 1 paquete de papas",
        category: "packs",
        featured: true,
        image: "https://images.unsplash.com/photo-1594381890743-88f34e28c37c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        badge: "⭐ Ahorro"
    },
    {
        id: 3,
        name: "Pack Amigos",
        price: 18,
        description: "8 chupetines, 4 alfajores, 4 gaseosas de 500ml y 2 paquetes de papas",
        category: "packs",
        featured: true,
        image: "https://images.unsplash.com/photo-1602099553382-7c35b5b4b38c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        badge: "🎉 Fiesta"
    },
    {
        id: 4,
        name: "Pack Vicio",
        price: 10,
        description: "redbull pal body",
        category: "packs",
        featured: true,
        image: "https://images.unsplash.com/photo-1602099553382-7c35b5b4b38c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        badge: "⚡ Energía"
    },

    // ============================================
    //                 GOMINOLAS
    // ============================================
    {
        id: 5,
        name: "Ositos de Gominola",
        price: 2.5,
        description: "Bolsa de ositos de gominola suave",
        category: "gominolas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        name: "Serpientes de Gominola",
        price: 3,
        description: "Serpientes grandes y coloridas",
        category: "gominolas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 7,
        name: "Botellas de Gominola",
        price: 2,
        description: "Botellas de gominola sabor cola",
        category: "gominolas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },

    // ============================================
    //            GOMINOLAS ÁCIDAS
    // ============================================
    {
        id: 8,
        name: "Ácidas Picantes",
        price: 3.5,
        description: "Gominolas ácidas super picantes",
        category: "gominolas-cidas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 9,
        name: "Lengüetas Ácidas",
        price: 3,
        description: "Lengüetas de gominola ácida",
        category: "gominolas-cidas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 10,
        name: "Sours Mix",
        price: 4,
        description: "Mezcla de gominolas ácidas variadas",
        category: "gominolas-cidas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },

    // ============================================
    //                 ARAZULES
    // ============================================
    {
        id: 11,
        name: "Arazules Grandes",
        price: 2.5,
        description: "Arazules grandes y blandos",
        category: "arazules",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 12,
        name: "Arazules Mix",
        price: 3,
        description: "Mezcla de sabores de arazules",
        category: "arazules",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 13,
        name: "Arazules Premium",
        price: 4.5,
        description: "Arazules de calidad premium",
        category: "arazules",
        featured: true,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        badge: "✨ Premium"
    },

    // ============================================
    //               CHOCOLATES
    // ============================================
    {
        id: 14,
        name: "Chocolate con Almendras",
        price: 3.5,
        description: "Tableta de chocolate con almendras",
        category: "chocolates",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 15,
        name: "Bonbones de Chocolate",
        price: 5,
        description: "Caja de bonbones de chocolate variados",
        category: "chocolates",
        featured: true,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        badge: "💝 Regalos"
    },
    {
        id: 16,
        name: "Chocolate Oscuro",
        price: 3,
        description: "Barra de chocolate oscuro 70%",
        category: "chocolates",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },

    // ============================================
    //                  SNACKS
    // ============================================
    {
        id: 17,
        name: "Papas Clásicas",
        price: 2,
        description: "Bolsa de papas fritas clásicas 130g",
        category: "snaks",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 18,
        name: "Nachos Queso",
        price: 3,
        description: "Nachos crujientes con sabor a queso",
        category: "snaks",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 19,
        name: "Mix de Frutos Secos",
        price: 4.5,
        description: "Almendras, nueces y pasas",
        category: "snaks",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },

    // ============================================
    //                 BEBIDAS
    // ============================================
    {
        id: 20,
        name: "Redbull 250ml",
        price: 2.5,
        description: "Bebida energética Redbull lata",
        category: "bebidas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 21,
        name: "Coca Cola 500ml",
        price: 2,
        description: "Coca Cola botella 500ml",
        category: "bebidas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 22,
        name: "Jugo Natural Naranja",
        price: 3,
        description: "Jugo natural de naranja 1L",
        category: "bebidas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 23,
        name: "Agua Mineral",
        price: 1.5,
        description: "Agua mineral botella 1.5L",
        category: "bebidas",
        featured: false,
        image: "https://images.unsplash.com/photo-1599599810694-e5eef8fe8e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
];

/**
 * Obtener todos los productos
 */
function getAllProducts() {
    return PRODUCTS;
}

/**
 * Obtener producto por ID
 */
function getProductById(id) {
    return PRODUCTS.find(product => product.id === id);
}

/**
 * Obtener productos por categoría
 */
function getProductsByCategory(category) {
    if (category === "all") {
        return PRODUCTS;
    }
    return PRODUCTS.filter(product => product.category === category);
}

/**
 * Obtener productos destacados
 */
function getFeaturedProducts() {
    return PRODUCTS.filter(product => product.featured === true);
}

/**
 * Obtener packs de oferta
 */
function getPackProducts() {
    return PRODUCTS.filter(product => product.category === "packs");
}

/**
 * Buscar productos por término
 */
function searchProductsByName(term) {
    const searchTerm = term.toLowerCase();
    return PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

/**
 * Ordenar productos por precio
 */
function sortProductsByPrice(order = "asc") {
    return [...PRODUCTS].sort((a, b) => {
        if (order === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getAllProducts,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        getPackProducts,
        searchProductsByName,
        sortProductsByPrice
    };
}

// Exponer funciones globalmente
if (typeof window !== 'undefined') {
    window.getAllProducts = getAllProducts;
    window.getProductById = getProductById;
    window.getProductsByCategory = getProductsByCategory;
    window.getFeaturedProducts = getFeaturedProducts;
    window.getPackProducts = getPackProducts;
    window.searchProductsByName = searchProductsByName;
    window.sortProductsByPrice = sortProductsByPrice;
}