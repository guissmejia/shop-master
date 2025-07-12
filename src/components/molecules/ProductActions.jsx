import React from 'react';
import { Button, Space } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { COLORS } from '../../config/colors';

const ProductActions = ({ 
  onAddToCart, 
  onViewDetails, 
  loading = false, 
  isDarkMode = false 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      width: '100%', 
      justifyContent: 'space-between',
      background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card,
      padding: '16px',
      margin: '0'
    }}>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        loading={loading}
        onClick={onAddToCart}
        style={{ 
          width: '50%', 
          background: COLORS.gradients.button,
          border: 'none',
          marginLeft: '16px'
        }}
        size="large"
      >
        {loading ? 'Agregando...' : 'Agregar al carrito'}
      </Button>
      <Button
        type="default"
        icon={<EyeOutlined />}
        onClick={onViewDetails}
        style={{ 
          width: '50%', 
          background: COLORS.gradients.buttonSecondary,
          border: 'none',
          color: COLORS.text.white,
          marginRight: '16px'
        }}
        size="large"
      >
        Ver Detalles
      </Button>
    </div>
  );
};

export default ProductActions; 