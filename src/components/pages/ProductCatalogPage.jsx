import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Spin, 
  Button,
  Row, 
  Statistic, 
  Empty,
  Typography
} from 'antd';
import { 
  ShoppingCartOutlined, 
  ExclamationCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { COLORS } from '../../config/colors';
import { useProducts } from '../../hooks/useProducts';
import { useCartContext } from '../../hooks/useCartContext';
import { useFilters } from '../../hooks/useFilters';
import FilterControls from '../molecules/FilterControls';
import ProductCard from '../organisms/ProductCard';
import ProductModal from '../organisms/ProductModal';

const { Title, Text, Paragraph } = Typography;

const ProductCatalogPage = ({ isDarkMode = false }) => {
  const { products, categories, loading, error, retryCount, handleRetry } = useProducts();
  const { 
    addingToCart, 
    quantities, 
    handleAddToCart, 
    updateQuantity, 
    initializeQuantities 
  } = useCartContext();
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange, 
    searchTerm, 
    setSearchTerm, 
    clearFilters, 
    filterProducts 
  } = useFilters();

  // Modal de detalles
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Inicializar cantidades cuando se cargan los productos
  useEffect(() => {
    if (products.length > 0) {
      initializeQuantities(products);
    }
  }, [products, initializeQuantities]);

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const filteredProducts = filterProducts(products);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">Cargando productos...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <Card style={{ 
          background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card,
          border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
        }}>
          <ExclamationCircleOutlined style={{ fontSize: 48, color: COLORS.status.info, marginBottom: 16 }} />
          <Title level={4} style={{ color: COLORS.status.info }}>Error al cargar productos</Title>
          <Paragraph style={{ color: isDarkMode ? COLORS.text.light : COLORS.text.secondary }}>{error}</Paragraph>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={handleRetry}
            style={{
              background: COLORS.gradients.button,
              border: 'none',
              color: COLORS.text.white
            }}
          >
            Reintentar ({retryCount + 1})
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Header del catálogo */}
      <Card 
        style={{ 
          marginBottom: 24,
          background: isDarkMode ? COLORS.gradients.catalogDark : COLORS.gradients.catalog,
          border: 'none'
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Title level={2} style={{ marginBottom: 24, color: COLORS.text.white }}>
          <ShoppingCartOutlined style={{ marginRight: 8 }} />
          Catálogo de Productos
        </Title>
        
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
          clearFilters={clearFilters}
          isDarkMode={isDarkMode}
        />
      </Card>

      {/* Resultados */}
      <Card style={{ 
        marginBottom: 24, 
        background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card 
      }}>
        <Statistic 
          title="Productos encontrados" 
          value={filteredProducts.length} 
          suffix={`de ${products.length}`}
          valueStyle={{ color: isDarkMode ? COLORS.primary.light : COLORS.primary.main }}
        />
      </Card>

      {/* Grid de productos */}
      {filteredProducts.length === 0 ? (
        <Card>
          <Empty
            description="No se encontraron productos"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Text type="secondary">Intenta ajustar los filtros de búsqueda</Text>
          </Empty>
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              onQuantityChange={(value) => {
                updateQuantity(product.id, value);
              }}
              onAddToCart={handleAddToCart}
              onViewDetails={showProductDetails}
              addingToCart={addingToCart}
              isDarkMode={isDarkMode}
            />
          ))}
        </Row>
      )}

      {/* Modal de detalles del producto */}
      <ProductModal
        visible={modalVisible}
        product={selectedProduct}
        quantity={selectedProduct ? quantities[selectedProduct.id] || 1 : 1}
        onQuantityChange={(value) => {
          if (selectedProduct) {
            updateQuantity(selectedProduct.id, value);
          }
        }}
        onAddToCart={handleAddToCart}
        onClose={() => setModalVisible(false)}
        addingToCart={addingToCart}
        isDarkMode={isDarkMode}
      />
      
      {/* Estilos CSS para eliminar márgenes de ant-card-actions */}
      <style jsx>{`
        .ant-card-actions > li {
          margin: 0 !important;
        }
        
        .ant-card-actions {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        @media (max-width: 767px) {
          .ant-card-actions > li {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .ant-card-actions {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCatalogPage; 