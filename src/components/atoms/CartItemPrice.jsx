import React from 'react';
import { Typography } from 'antd';
import { COLORS } from '../../config/colors';
import { formatCurrency, getQuantityDiscount } from '../../utils/formatters';

const { Text } = Typography;

const CartItemPrice = ({ price, quantity, isDarkMode = false }) => {
  const discount = getQuantityDiscount(quantity);
  const discountedPrice = price * (1 - discount);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <Text strong style={{ fontSize: '12px' }}>Precio</Text>
      <div style={{ textAlign: 'center' }}>
        {discount > 0 && (
          <Text delete style={{ color: COLORS.price.original, fontSize: '10px', display: 'block' }}>
            {formatCurrency(price)}
          </Text>
        )}
        <div style={{ color: COLORS.price.main, fontWeight: 'bold', fontSize: '12px' }}>
          {formatCurrency(discountedPrice)}
        </div>
      </div>
    </div>
  );
};

export default CartItemPrice; 