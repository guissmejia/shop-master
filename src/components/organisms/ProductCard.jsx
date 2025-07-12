import React from 'react';
import { Card, Col } from 'antd';
import { COLORS } from '../../config/colors';
import ProductImage from '../atoms/ProductImage';
import ProductInfo from '../molecules/ProductInfo';
import ProductActions from '../molecules/ProductActions';

const ProductCard = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  onViewDetails, 
  addingToCart, 
  isDarkMode = false 
}) => {
  return (
    <Col xs={24} sm={12} lg={8}>
      <Card
        hoverable
        cover={
          <ProductImage 
            src={product.image} 
            alt={product.name} 
            height={250}
          />
        }
        actions={[
          <ProductActions
            key="actions"
            onAddToCart={() => onAddToCart(product)}
            onViewDetails={() => onViewDetails(product)}
            loading={addingToCart[product.id]}
            isDarkMode={isDarkMode}
          />
        ]}
        style={{ 
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card
        }}
        bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}
      >
        <Card.Meta
          title={
            <ProductInfo
              product={product}
              quantity={quantity}
              onQuantityChange={onQuantityChange}
              isDarkMode={isDarkMode}
            />
          }
        />
      </Card>
    </Col>
  );
};

export default ProductCard; 