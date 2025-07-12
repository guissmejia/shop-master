# Requisitos No Funcionales - ShopMaster

## Documentación de Requisitos No Funcionales (ISO 25010)

### 1. **Funcionalidad (Functional Suitability)**

#### 1.1 Completitud Funcional
- **Requisito**: La aplicación debe permitir todas las operaciones básicas de una tienda online.
- **Implementación**: 
  - Catálogo completo de productos con filtros
  - Sistema de carrito de compras funcional
  - API REST completa para comunicación frontend-backend
  - Validaciones en frontend y backend
- **Justificación**: Garantiza que los usuarios puedan realizar todas las operaciones esperadas sin limitaciones.

#### 1.2 Corrección Funcional
- **Requisito**: Los cálculos de precios y cantidades deben ser precisos.
- **Implementación**:
  - Validaciones de entrada en frontend y backend
  - Cálculos de subtotales, impuestos y totales verificados
  - Manejo de errores para datos inválidos
- **Justificación**: Evita errores en transacciones y mantiene la confianza del usuario.

### 2. **Rendimiento (Performance Efficiency)**

#### 2.1 Comportamiento Temporal
- **Requisito**: La aplicación debe responder en menos de 2 segundos para operaciones normales.
- **Implementación**:
  - Simulación de latencia controlada (0.1-0.5 segundos)
  - Carga asíncrona de productos
  - Optimización de imágenes con placeholders
  - Compilación optimizada con Vite
- **Justificación**: Mejora la experiencia del usuario y reduce la tasa de abandono.

#### 2.2 Utilización de Recursos
- **Requisito**: Uso eficiente de memoria y CPU.
- **Implementación**:
  - Lazy loading de componentes
  - Optimización de bundle con Vite
  - Gestión eficiente del estado en React
  - Almacenamiento JSON ligero para datos
- **Justificación**: Permite que la aplicación funcione en dispositivos con recursos limitados.

### 3. **Compatibilidad (Compatibility)**

#### 3.1 Coexistencia
- **Requisito**: La aplicación debe funcionar junto con otras aplicaciones web.
- **Implementación**:
  - Uso de puertos específicos (5000 para Flask, 3000 para desarrollo)
  - Configuración CORS para evitar conflictos
  - Namespacing de rutas (/api para backend)
- **Justificación**: Evita conflictos en entornos de desarrollo y producción.

#### 3.2 Interoperabilidad
- **Requisito**: Comunicación efectiva entre frontend y backend.
- **Implementación**:
  - API REST estándar
  - Formato JSON para intercambio de datos
  - Headers HTTP apropiados
  - Manejo de errores HTTP estándar
- **Justificación**: Facilita la integración y mantenimiento del sistema.

### 4. **Usabilidad (Usability)**

#### 4.1 Comprensibilidad
- **Requisito**: La interfaz debe ser intuitiva y fácil de entender.
- **Implementación**:
  - Diseño consistente con iconografía clara
  - Mensajes de error descriptivos
  - Navegación intuitiva
  - Textos en español
- **Justificación**: Reduce la curva de aprendizaje y mejora la adopción.

#### 4.2 Aprendizaje
- **Requisito**: Los usuarios deben poder usar la aplicación sin capacitación previa.
- **Implementación**:
  - Interfaz familiar tipo e-commerce
  - Botones con iconos reconocibles
  - Flujo de compra estándar
  - Tooltips y ayudas contextuales
- **Justificación**: Reduce costos de soporte y mejora la satisfacción del usuario.

#### 4.3 Operabilidad
- **Requisito**: La aplicación debe ser fácil de operar.
- **Implementación**:
  - Diseño responsive para múltiples dispositivos
  - Accesibilidad con navegación por teclado
  - Estados de carga claros
  - Confirmaciones para acciones importantes
- **Justificación**: Incluye a usuarios con diferentes capacidades y dispositivos.

### 5. **Confiabilidad (Reliability)**

#### 5.1 Madurez
- **Requisito**: La aplicación debe funcionar sin fallos frecuentes.
- **Implementación**:
  - Manejo exhaustivo de errores
  - Validaciones en múltiples capas
  - Logging detallado para debugging
  - Simulación controlada de fallos (30% de probabilidad)
- **Justificación**: Proporciona una experiencia estable y predecible.

#### 5.2 Disponibilidad
- **Requisito**: La aplicación debe estar disponible cuando se necesite.
- **Implementación**:
  - Manejo de errores sin crashes
  - Recuperación automática de fallos
  - Estados de fallback para componentes
  - Health check endpoint (/api/health)
- **Justificación**: Mantiene la funcionalidad incluso en condiciones adversas.

#### 5.3 Tolerancia a Fallos
- **Requisito**: La aplicación debe manejar errores de red y servidor.
- **Implementación**:
  - Simulación de fallos de red
  - Botones de reintento
  - Mensajes de error informativos
  - Persistencia de datos en localStorage
- **Justificación**: Mejora la experiencia del usuario en entornos inestables.

### 6. **Seguridad (Security)**

#### 6.1 Confidencialidad
- **Requisito**: Los datos del usuario deben ser protegidos.
- **Implementación**:
  - Validación de entrada en frontend y backend
  - Sanitización de datos
  - Headers de seguridad apropiados
  - No almacenamiento de información sensible
- **Justificación**: Protege la privacidad del usuario y cumple con regulaciones.

#### 6.2 Integridad
- **Requisito**: Los datos no deben ser modificados sin autorización.
- **Implementación**:
  - Validaciones de formato y rango
  - Verificación de tipos de datos
  - Logging de operaciones críticas
  - Checksums para archivos importantes
- **Justificación**: Garantiza la precisión y confiabilidad de los datos.

### 7. **Mantenibilidad (Maintainability)**

#### 7.1 Modularidad
- **Requisito**: El código debe estar organizado en módulos reutilizables.
- **Implementación**:
  - Separación clara frontend/backend
  - Componentes React modulares
  - Funciones Python reutilizables
  - Estructura de archivos organizada
- **Justificación**: Facilita el desarrollo, testing y mantenimiento.

#### 7.2 Reutilización
- **Requisito**: Los componentes deben ser reutilizables.
- **Implementación**:
  - Componentes React genéricos
  - Funciones utilitarias
  - Plantillas Jinja2 reutilizables
  - Estilos CSS modulares
- **Justificación**: Reduce el tiempo de desarrollo y mejora la consistencia.

#### 7.3 Analizabilidad
- **Requisito**: El código debe ser fácil de analizar y debuggear.
- **Implementación**:
  - Logging estructurado
  - Mensajes de error descriptivos
  - Código comentado
  - Estructura de archivos clara
- **Justificación**: Facilita la identificación y resolución de problemas.

#### 7.4 Modificabilidad
- **Requisito**: El código debe ser fácil de modificar.
- **Implementación**:
  - Configuración externalizada
  - Separación de responsabilidades
  - APIs bien definidas
  - Documentación clara
- **Justificación**: Permite adaptaciones rápidas a nuevos requisitos.

### 8. **Portabilidad (Portability)**

#### 8.1 Adaptabilidad
- **Requisito**: La aplicación debe adaptarse a diferentes entornos.
- **Implementación**:
  - Configuración por variables de entorno
  - Script de automatización multiplataforma
  - Dependencias versionadas
  - Documentación de instalación
- **Justificación**: Facilita el despliegue en diferentes entornos.

#### 8.2 Instalabilidad
- **Requisito**: La aplicación debe ser fácil de instalar.
- **Implementación**:
  - Script de automatización completo
  - Verificación de dependencias
  - Instrucciones claras
  - Manejo de errores de instalación
- **Justificación**: Reduce el tiempo de configuración y errores de instalación.

#### 8.3 Reemplazabilidad
- **Requisito**: Los componentes deben ser reemplazables.
- **Implementación**:
  - APIs bien definidas
  - Separación de capas
  - Interfaces claras
  - Acoplamiento bajo
- **Justificación**: Permite actualizaciones y mejoras sin afectar todo el sistema.

## Métricas de Calidad

### Métricas Implementadas:
1. **Tiempo de respuesta**: < 2 segundos
2. **Tasa de errores**: < 5% (controlada con simulación)
3. **Cobertura de validaciones**: 100% en operaciones críticas
4. **Compatibilidad de navegadores**: Chrome, Firefox, Safari, Edge
5. **Responsive design**: Mobile-first approach
6. **Accesibilidad**: Navegación por teclado, contraste adecuado

### Herramientas de Medición:
- Logging detallado en backend
- Console logging en frontend
- Health check endpoint
- Métricas de rendimiento del navegador
- Validación de formularios en tiempo real
