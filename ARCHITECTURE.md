# Arquitectura ShopMaster

## 🏗️ Estructura del Proyecto

ShopMaster ha sido refactorizado siguiendo los principios de **Atomic Design** y **Clean Architecture** para garantizar escalabilidad, mantenibilidad y reutilización de código.

## 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── atoms/           # Componentes atómicos (botones, inputs, etc.)
│   ├── molecules/       # Componentes moleculares (formularios, cards, etc.)
│   ├── organisms/       # Componentes organismos (secciones complejas)
│   ├── pages/           # Páginas completas
│   └── index.js         # Exportaciones centralizadas
├── hooks/               # Hooks personalizados
│   └── index.js         # Exportaciones centralizadas
├── utils/               # Utilidades y helpers
│   └── index.js         # Exportaciones centralizadas
├── config/              # Configuraciones (colores, temas)
└── MainApp.jsx          # Componente principal
```

## 🧩 Atomic Design

### Atoms (Átomos)
Componentes básicos e indivisibles:
- `ProductImage` - Imagen de producto
- `ProductTag` - Etiqueta de categoría
- `PriceDisplay` - Visualización de precios
- `QuantityInput` - Input de cantidad
- `CartItemImage` - Imagen del item del carrito
- `CartQuantityControl` - Control de cantidad del carrito
- `CartItemPrice` - Precio del item del carrito
- `CartItemTotal` - Total del item del carrito

### Molecules (Moléculas)
Combinaciones de átomos con funcionalidad específica:
- `ProductActions` - Botones de acción del producto
- `ProductInfo` - Información del producto
- `FilterControls` - Controles de filtrado
- `CartItemActions` - Acciones del item del carrito
- `CartItemInfo` - Información del item del carrito

### Organisms (Organismos)
Secciones complejas que combinan moléculas:
- `ProductCard` - Tarjeta completa de producto
- `ProductModal` - Modal de detalles del producto
- `CartItem` - Item completo del carrito

### Pages (Páginas)
Vistas completas de la aplicación:
- `ProductCatalogPage` - Página del catálogo
- `ShoppingCartPage` - Página del carrito

## 🪝 Hooks Personalizados

### `useProducts`
Maneja la lógica de carga y gestión de productos:
- Carga de productos desde la API
- Manejo de estados de loading y error
- Reintentos automáticos

### `useCart`
Gestiona el estado del carrito de compras:
- Agregar/remover productos
- Actualizar cantidades
- Cálculo de totales

### `useFilters`
Maneja los filtros del catálogo:
- Filtros por categoría, precio y búsqueda
- Lógica de filtrado
- Limpieza de filtros

### `useTheme`
Gestiona el tema de la aplicación:
- Modo claro/oscuro
- Persistencia en localStorage
- Toggle de tema

### `useCartContext`
Contexto global para el carrito:
- Estado compartido entre componentes
- Funciones de manipulación del carrito
- Provider para toda la aplicación

## 🛠️ Utilidades

### `formatters.js`
Funciones de formateo:
- `formatCurrency` - Formateo de moneda colombiana
- `getCategoryColor` - Colores por categoría
- `getQuantityDiscount` - Cálculo de descuentos por cantidad

## 🎨 Configuración

### `colors.js`
Configuración centralizada de colores:
- Paleta de colores principal
- Gradientes
- Colores por tema (claro/oscuro)
- Colores por categoría

## 🔄 Flujo de Datos

1. **Estado Global**: El carrito se maneja a través de `CartProvider`
2. **Hooks**: Cada funcionalidad tiene su hook personalizado
3. **Componentes**: Se componen siguiendo Atomic Design
4. **Utilidades**: Funciones reutilizables para formateo y cálculos

## 📦 Beneficios de la Nueva Arquitectura

### ✅ Escalabilidad
- Componentes modulares y reutilizables
- Fácil agregar nuevas funcionalidades
- Separación clara de responsabilidades

### ✅ Mantenibilidad
- Código organizado y documentado
- Hooks personalizados para lógica compleja
- Utilidades centralizadas

### ✅ Reutilización
- Componentes atómicos reutilizables
- Hooks compartidos entre componentes
- Configuración centralizada

### ✅ Testing
- Componentes pequeños y enfocados
- Hooks aislados y testeables
- Lógica separada de presentación

## 🚀 Uso

### Importar Componentes
```javascript
import { ProductCard, ProductModal } from './components';
```

### Importar Hooks
```javascript
import { useProducts, useCart } from './hooks';
```

### Importar Utilidades
```javascript
import { formatCurrency } from './utils';
```

## 🔧 Desarrollo

Para agregar nuevos componentes:

1. **Atoms**: Crear en `components/atoms/`
2. **Molecules**: Crear en `components/molecules/`
3. **Organisms**: Crear en `components/organisms/`
4. **Pages**: Crear en `components/pages/`
5. **Hooks**: Crear en `hooks/`
6. **Utilidades**: Crear en `utils/`
7. **Exportar**: Agregar al archivo `index.js` correspondiente

Esta arquitectura garantiza que ShopMaster sea un proyecto robusto, escalable y fácil de mantener. 