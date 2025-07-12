from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import json
import os
import random
from datetime import datetime
import logging

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, 
            static_folder='../static',
            template_folder='templates')

# Habilitar CORS para desarrollo
CORS(app)

# Archivo para almacenar las compras
PURCHASES_FILE = 'purchases.json'

# Datos de productos de ejemplo
PRODUCTS = [
    {
        "id": 1,
        "name": "MacBook Pro 14\" M3 Pro",
        "category": "Laptops",
        "price": 10000000,  # $2,499.99 USD * 4000 COP
        "description": "Potente laptop con chip M3 Pro, 18GB RAM, 512GB SSD. Perfecta para desarrollo y diseño profesional. Pantalla Liquid Retina XDR de 14 pulgadas.",
        "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        "specs": {
            "processor": "Apple M3 Pro",
            "ram": "18GB",
            "storage": "512GB SSD",
            "display": "14\" Liquid Retina XDR",
            "battery": "Hasta 22 horas"
        }
    },
    {
        "id": 2,
        "name": "iPhone 15 Pro Max",
        "category": "Smartphones",
        "price": 4800000,  # $1,199.99 USD * 4000 COP
        "description": "El iPhone más avanzado con chip A17 Pro, cámara de 48MP, y diseño en titanio. Incluye Dynamic Island y carga inalámbrica.",
        "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        "specs": {
            "processor": "Apple A17 Pro",
            "ram": "8GB",
            "storage": "256GB",
            "display": "6.7\" Super Retina XDR",
            "camera": "48MP Triple Camera"
        }
    },
    {
        "id": 3,
        "name": "Sony WH-1000XM5",
        "category": "Audio",
        "price": 1600000,  # $399.99 USD * 4000 COP
        "description": "Auriculares inalámbricos premium con cancelación de ruido líder en la industria. 30 horas de batería y sonido Hi-Res Audio.",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        "specs": {
            "type": "Over-ear",
            "connectivity": "Bluetooth 5.2",
            "battery": "30 horas",
            "noise_cancellation": "Adaptive NC",
            "weight": "250g"
        }
    },
    {
        "id": 4,
        "name": "iPad Pro 12.9\" M2",
        "category": "Tablets",
        "price": 4400000,  # $1,099.99 USD * 4000 COP
        "description": "Tablet profesional con chip M2, pantalla Liquid Retina XDR de 12.9 pulgadas. Compatible con Apple Pencil y Magic Keyboard.",
        "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
        "specs": {
            "processor": "Apple M2",
            "ram": "8GB",
            "storage": "256GB",
            "display": "12.9\" Liquid Retina XDR",
            "pencil": "Apple Pencil compatible"
        }
    },
    {
        "id": 5,
        "name": "Sony A7 IV",
        "category": "Fotografía",
        "price": 10000000,  # $2,499.99 USD * 4000 COP
        "description": "Cámara mirrorless full-frame con sensor de 33MP, grabación 4K 60fps y estabilización de imagen de 5 ejes. Perfecta para fotografía profesional.",
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
        "specs": {
            "sensor": "33MP Full-frame",
            "video": "4K 60fps",
            "stabilization": "5-axis IBIS",
            "autofocus": "Real-time Eye AF",
            "connectivity": "Wi-Fi 5GHz"
        }
    },
    {
        "id": 6,
        "name": "Apple Watch Series 9",
        "category": "Wearables",
        "price": 1600000,  # $399.99 USD * 4000 COP
        "description": "Smartwatch con chip S9, pantalla Always-On Retina, y nuevas funciones de salud. Monitoreo de ECG y detección de caídas.",
        "image": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
        "specs": {
            "processor": "Apple S9",
            "display": "Always-On Retina",
            "battery": "18 horas",
            "health": "ECG, SpO2",
            "water_resistance": "50m"
        }
    },
    {
        "id": 7,
        "name": "Bose QuietComfort 45",
        "category": "Audio",
        "price": 1320000,  # $329.99 USD * 4000 COP
        "description": "Auriculares con cancelación de ruido acústica activa, sonido equilibrado y comodidad excepcional. 24 horas de batería.",
        "image": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        "specs": {
            "type": "Over-ear",
            "connectivity": "Bluetooth 5.1",
            "battery": "24 horas",
            "noise_cancellation": "Acoustic Noise Cancelling",
            "weight": "240g"
        }
    },
    {
        "id": 8,
        "name": "Logitech MX Master 3S",
        "category": "Accesorios",
        "price": 400000,  # $99.99 USD * 4000 COP
        "description": "Mouse inalámbrico premium con sensor de 8000 DPI, scroll MagSpeed y hasta 70 días de batería. Diseñado para productividad.",
        "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        "specs": {
            "sensor": "8000 DPI",
            "connectivity": "Bluetooth/Unifying",
            "battery": "70 días",
            "buttons": "7 programmables",
            "scroll": "MagSpeed"
        }
    },
    {
        "id": 9,
        "name": "Samsung Odyssey G9",
        "category": "Monitores",
        "price": 5200000,  # $1,299.99 USD * 4000 COP
        "description": "Monitor gaming ultrawide de 49 pulgadas con resolución 5120x1440, 240Hz de refresco y curvatura 1000R. Experiencia inmersiva.",
        "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        "specs": {
            "size": "49\"",
            "resolution": "5120x1440",
            "refresh_rate": "240Hz",
            "curvature": "1000R",
            "response_time": "1ms"
        }
    },
    {
        "id": 10,
        "name": "DJI Mini 3 Pro",
        "category": "Drones",
        "price": 3040000,  # $759.99 USD * 4000 COP
        "description": "Drone compacto con cámara de 4K, peso inferior a 250g, y hasta 34 minutos de vuelo. Perfecto para fotografía aérea.",
        "image": "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop",
        "specs": {
            "weight": "<250g",
            "camera": "4K/60fps",
            "flight_time": "34 minutos",
            "range": "12km",
            "wind_resistance": "Nivel 5"
        }
    }
]

def simulate_failure():
    """Simula fallos con 30% de probabilidad"""
    return random.random() < 0.3

def load_purchases():
    """Carga las compras desde el archivo JSON"""
    try:
        if os.path.exists(PURCHASES_FILE):
            with open(PURCHASES_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        return []
    except Exception as e:
        logger.error(f"Error cargando compras: {e}")
        return []

def save_purchases(purchases):
    """Guarda las compras en el archivo JSON"""
    try:
        with open(PURCHASES_FILE, 'w', encoding='utf-8') as f:
            json.dump(purchases, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        logger.error(f"Error guardando compras: {e}")
        return False

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('../static/js', filename)

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('../static/css', filename)

@app.route('/')
def index():
    """Ruta principal que sirve la aplicación React"""
    return send_from_directory('../static', 'index.html')

@app.route('/api/products')
def get_products():
    """API para obtener el catálogo de productos"""
    try:
        # Simular fallo con 30% de probabilidad
        if simulate_failure():
            logger.warning("Simulando fallo en obtención de productos")
            return jsonify({
                "error": "Error temporal del servidor",
                "message": "No se pudieron cargar los productos. Inténtalo de nuevo."
            }), 500
        
        # Simular latencia de red
        import time
        time.sleep(random.uniform(0.1, 0.5))
        
        return jsonify({
            "success": True,
            "products": PRODUCTS,
            "categories": list(set(product["category"] for product in PRODUCTS))
        })
    except Exception as e:
        logger.error(f"Error obteniendo productos: {e}")
        return jsonify({
            "error": "Error interno del servidor",
            "message": "Ocurrió un error inesperado"
        }), 500

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    """API para agregar productos al carrito"""
    try:
        # Simular fallo con 30% de probabilidad
        if simulate_failure():
            logger.warning("Simulando fallo al agregar al carrito")
            return jsonify({
                "error": "Error temporal del servidor",
                "message": "No se pudo agregar el producto. Inténtalo de nuevo."
            }), 500
        
        data = request.get_json()
        
        # Validaciones básicas
        if not data or 'items' not in data:
            return jsonify({
                "error": "Datos inválidos",
                "message": "Se requieren los productos a agregar"
            }), 400
        
        items = data['items']
        if not isinstance(items, list) or len(items) == 0:
            return jsonify({
                "error": "Carrito vacío",
                "message": "Debes agregar al menos un producto"
            }), 400
        
        # Validar que los productos existen
        for item in items:
            if not all(key in item for key in ['id', 'quantity']):
                return jsonify({
                    "error": "Datos de producto incompletos",
                    "message": "Cada producto debe tener id y cantidad"
                }), 400
            
            if item['quantity'] <= 0:
                return jsonify({
                    "error": "Cantidad inválida",
                    "message": "La cantidad debe ser mayor a 0"
                }), 400
        
        # Cargar compras existentes
        purchases = load_purchases()
        
        # Crear nueva compra
        new_purchase = {
            "id": len(purchases) + 1,
            "timestamp": datetime.now().isoformat(),
            "items": items,
            "total": sum(item.get('price', 0) * item['quantity'] for item in items)
        }
        
        # Agregar a las compras
        purchases.append(new_purchase)
        
        # Guardar en archivo
        if save_purchases(purchases):
            return jsonify({
                "success": True,
                "message": "Productos agregados al carrito exitosamente",
                "purchase_id": new_purchase["id"]
            })
        else:
            return jsonify({
                "error": "Error al guardar",
                "message": "No se pudo guardar la compra"
            }), 500
            
    except Exception as e:
        logger.error(f"Error agregando al carrito: {e}")
        return jsonify({
            "error": "Error interno del servidor",
            "message": "Ocurrió un error inesperado"
        }), 500

@app.route('/in_cart')
def in_cart():
    """Vista Jinja2 para mostrar productos en el carrito"""
    try:
        purchases = load_purchases()
        
        # Obtener la última compra (la más reciente)
        if purchases:
            latest_purchase = purchases[-1]
            
            # Enriquecer los items con información del producto
            enriched_items = []
            for item in latest_purchase['items']:
                product = next((p for p in PRODUCTS if p['id'] == item['id']), None)
                if product:
                    enriched_items.append({
                        **item,
                        'name': product['name'],
                        'category': product['category'],
                        'description': product['description'],
                        'image': product['image'],
                        'price': product['price']
                    })
            
            latest_purchase['enriched_items'] = enriched_items
            
            return render_template('in_cart.html', 
                                 purchase=latest_purchase,
                                 total_items=len(enriched_items))
        else:
            return render_template('in_cart.html', 
                                 purchase=None,
                                 total_items=0)
                                 
    except Exception as e:
        logger.error(f"Error renderizando carrito: {e}")
        return render_template('in_cart.html', 
                             purchase=None,
                             total_items=0,
                             error="Error cargando el carrito")

@app.route('/api/health')
def health_check():
    """Endpoint de salud para verificar que el servidor funciona"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3002) 