#!/bin/bash

# ShopMaster - Script de Inicialización y Ejecución
# Este script automatiza todo el proceso de instalación y ejecución de la aplicación

set -e  # Salir si cualquier comando falla

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  ShopMaster - Inicialización${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Función para verificar si un comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Función para verificar Python
check_python() {
    if ! command_exists python3; then
        print_error "Python 3 no está instalado. Por favor, instálalo primero."
        exit 1
    fi
    
    PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
    print_message "Python $PYTHON_VERSION detectado"
}

# Función para verificar Node.js
check_node() {
    if ! command_exists node; then
        print_error "Node.js no está instalado. Por favor, instálalo primero."
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_message "Node.js $NODE_VERSION detectado"
}

# Función para crear entorno virtual de Python
setup_python_env() {
    print_message "Configurando entorno virtual de Python..."
    
    if [ ! -d "backend/venv" ]; then
        python3 -m venv backend/venv
        print_message "Entorno virtual creado"
    else
        print_message "Entorno virtual ya existe"
    fi
    
    # Activar entorno virtual
    source backend/venv/bin/activate
    
    # Actualizar pip
    pip install --upgrade pip
    
    # Instalar dependencias
    print_message "Instalando dependencias de Python..."
    pip install -r backend/requirements.txt
    
    print_message "Dependencias de Python instaladas correctamente"
}

# Función para instalar dependencias de Node.js
setup_node_deps() {
    print_message "Instalando dependencias de Node.js..."
    
    if [ ! -d "node_modules" ]; then
        npm install
        print_message "Dependencias de Node.js instaladas"
    else
        print_message "Dependencias de Node.js ya están instaladas"
    fi
}

# Función para compilar React
build_react() {
    print_message "Compilando aplicación React..."
    
    # Limpiar build anterior si existe
    if [ -d "static" ]; then
        rm -rf static/*
        print_message "Build anterior limpiado"
    fi
    
    # Compilar React
    npm run build
    
    if [ $? -eq 0 ]; then
        print_message "Aplicación React compilada correctamente"
    else
        print_error "Error al compilar React"
        exit 1
    fi
}

# Función para verificar que el build se creó correctamente
verify_build() {
    if [ ! -f "static/index.html" ]; then
        print_error "El archivo index.html no se generó correctamente"
        exit 1
    fi
    
    if [ ! -f "static/js/main.js" ]; then
        print_error "El archivo main.js no se generó correctamente"
        exit 1
    fi
    
    print_message "Build verificado correctamente"
}

# Función para ejecutar la aplicación
run_application() {
    print_message "Iniciando aplicación ShopMaster..."
    
    # Activar entorno virtual
    source backend/venv/bin/activate
    
    # Ejecutar Flask
    print_message "Servidor Flask iniciado en http://localhost:5000"
    print_message "Presiona Ctrl+C para detener el servidor"
    
    cd backend
    python app.py
}

# Función principal
main() {
    print_header
    
    # Verificar dependencias del sistema
    print_message "Verificando dependencias del sistema..."
    check_python
    check_node
    
    # Configurar entorno de Python
    setup_python_env
    
    # Configurar dependencias de Node.js
    setup_node_deps
    
    # Compilar React
    build_react
    
    # Verificar build
    verify_build
    
    print_message "¡Todo listo! Iniciando aplicación..."
    echo ""
    
    # Ejecutar aplicación
    run_application
}

# Función para mostrar ayuda
show_help() {
    echo "Uso: $0 [OPCIÓN]"
    echo ""
    echo "Opciones:"
    echo "  -h, --help     Mostrar esta ayuda"
    echo "  --build-only   Solo compilar React sin ejecutar"
    echo "  --install-only Solo instalar dependencias sin ejecutar"
    echo ""
    echo "Ejemplos:"
    echo "  $0              Instalar todo y ejecutar"
    echo "  $0 --build-only Solo compilar React"
    echo "  $0 --install-only Solo instalar dependencias"
}

# Procesar argumentos
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    --build-only)
        print_header
        check_node
        setup_node_deps
        build_react
        verify_build
        print_message "Build completado. Ejecuta '$0' para iniciar la aplicación."
        exit 0
        ;;
    --install-only)
        print_header
        check_python
        check_node
        setup_python_env
        setup_node_deps
        print_message "Instalación completada. Ejecuta '$0' para compilar y ejecutar."
        exit 0
        ;;
    "")
        main
        ;;
    *)
        print_error "Opción desconocida: $1"
        show_help
        exit 1
        ;;
esac 