import React from 'react';
import { Space, Typography, Divider } from 'antd';
import { COLORS } from '../../config/colors';
import ProductTag from '../atoms/ProductTag';
import PriceDisplay from '../atoms/PriceDisplay';
import QuantityInput from '../atoms/QuantityInput';

const { Text, Paragraph } = Typography;

const ProductInfo = ({ 
  product, 
  quantity, 
  onQuantityChange, 
  isDarkMode = false 
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%', flex: 1 }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color: isDarkMode ? COLORS.primary.light : COLORS.primary.main }}>
        {product.name}
      </div>
      <ProductTag category={product.category} />
      
      <Paragraph ellipsis={{ rows: 3 }} style={{ color: isDarkMode ? COLORS.text.light : COLORS.text.secondary, marginBottom: 16 }}>
        {product.description}
      </Paragraph>
      
      <PriceDisplay price={product.price} size="large" />
      
      <Divider style={{ margin: '12px 0' }} />
      
      <Space>
        <Text strong>Cantidad</Text>
        <QuantityInput
          value={quantity}
          onChange={onQuantityChange}
          isDarkMode={isDarkMode}
        />
      </Space>
    </Space>
  );
};

export default ProductInfo; 