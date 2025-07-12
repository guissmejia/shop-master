// Configuración de colores para ShopMaster
export const COLORS = {
  // Colores principales
  primary: {
    main: '#0D5EA6', // Azul principal para encabezado y navegación
    light: '#3b82f6',
    dark: '#1e40af',
    contrast: '#ffffff'
  },
  
  // Colores de acción
  action: {
    buy: '#EAA64D', // Dorado principal para botones de compra
    buyHover: '#C78A3B', // Dorado más oscuro para hover
    secondary: '#A16D28', // Terracota para acciones secundarias
    secondaryHover: '#8B5A2B'
  },
  
  // Colores de precio y descuentos
  price: {
    main: '#EAA64D', // Dorado para precios
    discount: '#C78A3B', // Dorado oscuro para descuentos
    original: '#6b7280' // Gris para precios tachados
  },
  
  // Colores de fondo
  background: {
    main: '#f8fafc', // Gris claro / Blanco para fondo general
    card: '#ffffff',
    dark: '#1f2937', // Para modo oscuro
    cardDark: '#374151'
  },
  
  // Colores de texto
  text: {
    primary: '#1f2937', // Negro / Gris oscuro para texto principal
    secondary: '#6b7280',
    light: '#9ca3af',
    white: '#ffffff'
  },
  
  // Colores de estado
  status: {
    success: '#EAA64D', // Dorado para éxito
    error: '#ef4444', // Rojo más suave para errores
    warning: '#C78A3B', // Dorado oscuro para advertencias
    info: '#0D5EA6' // Azul principal para información
  },
  
  // Gradientes
  gradients: {
    header: 'linear-gradient(135deg, #0D5EA6 0%, #1e40af 100%)',
    headerDark: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    catalog: 'linear-gradient(135deg, #0D5EA6 0%, #1e40af 100%)',
    catalogDark: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
    cart: 'linear-gradient(135deg, #EAA64D 0%, #C78A3B 100%)',
    cartDark: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
    button: 'linear-gradient(135deg, #EAA64D 0%, #C78A3B 100%)',
    buttonSecondary: 'linear-gradient(135deg, #0D5EA6 0%, #1e40af 100%)'
  },
  
  // Colores de categorías
  categories: {
    'Laptops': '#0D5EA6',
    'Smartphones': '#EAA64D',
    'Audio': '#C78A3B',
    'Tablets': '#A16D28',
    'Fotografía': '#8B5A2B',
    'Wearables': '#0D5EA6',
    'Accesorios': '#EAA64D',
    'Monitores': '#C78A3B',
    'Drones': '#A16D28'
  }
};

// Configuración del tema
export const THEME_CONFIG = {
  light: {
    algorithm: 'default',
    token: {
      colorPrimary: COLORS.primary.main,
      colorSuccess: COLORS.status.success,
      colorWarning: COLORS.status.warning,
      colorError: COLORS.status.error,
      colorInfo: COLORS.status.info,
      borderRadius: 8,
    },
  },
  dark: {
    algorithm: 'dark',
    token: {
      colorPrimary: COLORS.primary.light,
      colorSuccess: COLORS.status.success,
      colorWarning: COLORS.status.warning,
      colorError: COLORS.status.error,
      colorInfo: COLORS.status.info,
      borderRadius: 8,
    },
  }
}; 