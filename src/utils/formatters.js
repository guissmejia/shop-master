// Función para formatear moneda colombiana
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Obtener color de categoría
export const getCategoryColor = (category) => {
  const tagColors = {
    'Laptops': '#722ed1', // Púrpura
    'Smartphones': '#13c2c2', // Cian
    'Audio': '#eb2f96', // Rosa
    'Tablets': '#fa8c16', // Naranja
    'Fotografía': '#f5222d', // Rojo
    'Wearables': '#52c41a', // Verde
    'Accesorios': '#1890ff', // Azul
    'Monitores': '#faad14', // Amarillo
    'Drones': '#722ed1' // Púrpura
  };
  return tagColors[category] || '#666666'; // Gris por defecto
};

// Obtener descuento por cantidad
export const getQuantityDiscount = (quantity) => {
  if (quantity >= 5) return 0.15; // 15% descuento
  if (quantity >= 3) return 0.10; // 10% descuento
  if (quantity >= 2) return 0.05; // 5% descuento
  return 0;
}; 