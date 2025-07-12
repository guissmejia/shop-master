# ShopMaster - Prueba Técnica Integral

## 🌟 Descripción del Proyecto

ShopMaster es una tienda ficticia que desea desarrollar un portal web donde los usuarios puedan:

1. **Buscar productos:** Consultar el catálogo de productos, con filtros por categoría o precio.

2. **Agregar productos al carrito:** Seleccionar productos y añadirlos al carrito de compras, visualizando un resumen de la selección.

3. **Recibir notificaciones seguras y tolerantes a fallos:** Mostrar mensajes claros de éxito o error en las interacciones, simulando fallos en la red para evaluar la resiliencia de la aplicación.

## ✅ Objetivo

Construir una aplicación funcional que integre React, Python (Flask) y Jinja2 con el siguiente flujo:

### Catálogo de Productos y Carrito (React):

- Mostrar un listado de productos.
- Permitir filtrar productos por categoría o precio.
- Agregar productos al carrito y mostrar el resumen.
- Validaciones básicas en el frontend.
- Enviar el carrito mediante API REST al backend.

### Backend (Flask):

- API REST para recibir los productos seleccionados.
- Almacenar temporalmente las compras o productos seleccionados.
- Renderizar los productos agregados al carrito de compras mediante Jinja2 en una ruta específica con los detalles pertinentes.

### Objetivo General:

El proyecto debe permitir navegar el catálogo, seleccionar productos y visualizar el carrito de compras (con los productos agregados), garantizando una experiencia de usuario funcional, segura y adaptable a distintos dispositivos.

## ✅ Estructura del Proyecto Implementada

```
/shop-master
|-- backend/                     # Flask backend
|   |-- app.py                   # Flask app with API and Jinja2 views
|   |-- requirements.txt         # Python dependencies
|   |-- templates/               # Jinja2 templates
|       |-- base.html            # Base template
|       |-- in_cart.html         # Template for products in cart
|   |-- venv/                    # Python virtual environment (auto-created)
|   |-- purchases.json           # File for storing purchase history
|-- src/                         # React source code
|   |-- components/              # React components
|   |   |-- ProductCatalog.jsx   # Product listing and filtering component
|   |   |-- ShoppingCart.jsx     # Shopping cart component
|   |-- MainApp.jsx              # Main React component
|   |-- main.js                  # React entry point
|   |-- styles.css               # React-specific styles
|-- static/                      # Directory for compiled React build
|   |-- index.html               # Main HTML file
|   |-- js/                      # Compiled JavaScript
|   |-- css/                     # Compiled CSS
|-- package.json                 # Node.js dependencies
|-- vite.config.js               # Vite configuration
|-- start.sh                     # Automation script
|-- REQUISITOS_NO_FUNCIONALES.md # Non-functional requirements documentation
|-- README.md                    # This instruction file
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- **Python 3.8+** instalado en el sistema
- **Node.js 16+** instalado en el sistema
- **npm** (incluido con Node.js)

### Ejecución Automática (Recomendado)

El proyecto incluye un script de automatización que maneja todo el proceso:

```bash
# Dar permisos de ejecución (solo la primera vez)
chmod +x start.sh

# Ejecutar la aplicación completa
./start.sh
```

Este script:
1. ✅ Verifica las dependencias del sistema
2. ✅ Crea el entorno virtual de Python
3. ✅ Instala dependencias de Python (Flask, Flask-CORS)
4. ✅ Instala dependencias de Node.js (React, Vite)
5. ✅ Compila la aplicación React
6. ✅ Verifica que el build se creó correctamente
7. ✅ Inicia el servidor Flask

### Opciones del Script

```bash
# Solo instalar dependencias
./start.sh --install-only

# Solo compilar React
./start.sh --build-only

# Ver ayuda
./start.sh --help
```

### Ejecución Manual

Si prefieres ejecutar los pasos manualmente:

#### 1. Configurar Backend (Python/Flask)

```bash
# Crear entorno virtual
python3 -m venv backend/venv

# Activar entorno virtual
source backend/venv/bin/activate  # En macOS/Linux
# backend\venv\Scripts\activate   # En Windows

# Instalar dependencias
pip install -r backend/requirements.txt
```

#### 2. Configurar Frontend (React)

```bash
# Instalar dependencias
npm install

# Compilar React
npm run build
```

#### 3. Ejecutar la Aplicación

```bash
# Activar entorno virtual (si no está activado)
source backend/venv/bin/activate

# Ejecutar Flask
cd backend
python app.py
```

La aplicación estará disponible en: **http://localhost:3002**

## 🎯 Funcionalidades Implementadas

### ✅ Catálogo de Productos
- **Filtros avanzados**: por categoría, rango de precio y búsqueda por texto
- **Diseño responsive** que se adapta a móviles, tablets y desktop
- **Animaciones suaves** y efectos hover para mejor UX

### ✅ Sistema de Carrito
- **Agregar productos** con cantidades personalizables
- **Gestión completa**: modificar cantidades, eliminar productos, vaciar carrito
- **Cálculos automáticos**: subtotal, impuestos (16%), total final
- **Persistencia local** durante la sesión

### ✅ API REST Completa
- **GET /api/products**: Obtener catálogo de productos
- **POST /api/cart**: Enviar productos al carrito
- **GET /api/health**: Verificar estado del servidor
- **Validaciones robustas** en frontend y backend

### ✅ Tolerancia a Fallos
- **Simulación de fallos** con 30% de probabilidad
- **Mensajes de error claros** y descriptivos
- **Botones de reintento** para operaciones fallidas
- **Estados de carga** con spinners animados

### ✅ Vista Jinja2 del Carrito
- **Ruta /in_cart** que muestra productos agregados
- **Resumen de compra** con totales y fechas

### ✅ Características Adicionales
- **Notificaciones toast** para feedback inmediato
- **Accesibilidad** con navegación por teclado
- **SEO optimizado** con meta tags apropiados

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: #0D5EA6 (Azul principal)
- **Acción**: #EAA64D (Dorado para botones de compra)
- **Secundario**: #C78A3B (Dorado oscuro)
- **Terracota**: #A16D28 (Acciones secundarias)
- **Éxito**: #EAA64D (Dorado)
- **Advertencia**: #C78A3B (Dorado oscuro)
- **Error**: #ef4444 (Rojo)
- **Información**: #0D5EA6 (Azul principal)

### Características de Diseño
- **Gradientes modernos** para fondos y botones
- **Efectos glassmorphism** con backdrop-filter
- **Animaciones CSS** suaves y profesionales
- **Tipografía clara** con Segoe UI
- **Espaciado consistente** siguiendo principios de diseño

### Responsive Design
- **Mobile-first approach**
- **Breakpoints**: 576px, 768px, 992px, 1200px
- **Grid system** flexible con Bootstrap 5
- **Imágenes adaptativas** con object-fit
- **Navegación optimizada** para touch

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18** con hooks y componentes funcionales
- **Vite** para build optimizado y desarrollo rápido
- **Bootstrap 5** para componentes UI y responsive design
- **Font Awesome 6** para iconografía
- **CSS3** con variables CSS y animaciones
- **Ant Design** Responsive y uso de componentes de aplicación

### Backend
- **Flask 2.3.3** como framework web
- **Flask-CORS** para manejo de CORS
- **Jinja2** para templates del servidor
- **JSON** para almacenamiento de datos

### Herramientas de Desarrollo
- **ESLint** para linting de JavaScript
- **Vite** para bundling y optimización
- **Script de automatización** en Bash
- **Git** para control de versiones

## 📊 Requisitos No Funcionales

La aplicación implementa requisitos no funcionales según la norma **ISO 25010**:

### ✅ Funcionalidad
- Completitud funcional con todas las operaciones de e-commerce
- Corrección funcional con validaciones exhaustivas

### ✅ Rendimiento
- Tiempo de respuesta < 2 segundos
- Uso eficiente de recursos con optimización de bundle

### ✅ Usabilidad
- Interfaz intuitiva y fácil de aprender
- Diseño responsive para múltiples dispositivos
- Accesibilidad con navegación por teclado

### ✅ Confiabilidad
- Tolerancia a fallos con simulación controlada
- Manejo robusto de errores sin crashes
- Health check endpoint para monitoreo

### ✅ Seguridad
- Validación de entrada en frontend y backend
- Sanitización de datos
- Headers de seguridad apropiados

### ✅ Mantenibilidad
- Código modular y bien organizado
- Separación clara de responsabilidades
- Documentación completa

Ver documentación completa en: [REQUISITOS_NO_FUNCIONALES.md](REQUISITOS_NO_FUNCIONALES.md)

## 🧪 Testing y Simulación

### Simulación de Fallos
La aplicación incluye simulación de fallos de red para probar la resiliencia:

- **30% de probabilidad** de fallo en llamadas a la API
- **Latencia simulada** de 0.1-0.5 segundos
- **Mensajes de error informativos** con opciones de reintento
- **Estados de carga** para feedback visual

## 🚀 Despliegue

### Desarrollo Local
```bash
./start.sh
```

### Estructura de Datos
```json
{
  "products": [
    {
      "id": 1,
      "name": "Laptop Gaming Pro",
      "category": "Electrónicos",
      "price": 1299.99,
      "description": "Laptop de alto rendimiento para gaming",
      "image": "https://via.placeholder.com/300x200?text=Laptop+Gaming"
    }
  ]
}
```

### API Endpoints
- **GET /api/products**: Retorna productos y categorías
- **POST /api/cart**: Recibe items del carrito
- **GET /in_cart**: Vista Jinja2 del carrito
- **GET /**: Aplicación React principal

### Manejo de Errores
- Validaciones en frontend y backend
- Mensajes de error descriptivos
- Logging detallado para debugging
- Estados de fallback para componentes

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.