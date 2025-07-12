import React from 'react';
import { Typography } from 'antd';
import { COLORS } from '../../config/colors';
import { formatCurrency, getQuantityDiscount } from '../../utils/formatters';

const { Text } = Typography;

const CartItemTotal = ({ price, quantity, isDarkMode = false }) => {
  const discount = getQuantityDiscount(quantity);
  const discountedPrice = price * (1 - discount);
  const totalItemPrice = discountedPrice * quantity;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <Text strong style={{ fontSize: '12px' }}>Total</Text>
      <div style={{ color: isDarkMode ? COLORS.primary.light : COLORS.primary.main, fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}>
        {formatCurrency(totalItemPrice)}
      </div>
    </div>
  );
};

export default CartItemTotal; 