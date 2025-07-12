import React from 'react';
import { Statistic, Typography } from 'antd';
import { formatCurrency } from '../../utils/formatters';
import { COLORS } from '../../config/colors';

const { Text } = Typography;

const PriceDisplay = ({ 
  price, 
  discount = 0, 
  size = 'large', 
  showOriginal = true,
  isDarkMode = false 
}) => {
  const discountedPrice = price * (1 - discount);
  
  const getValueStyle = () => {
    const baseStyle = {
      color: COLORS.price.main,
      fontWeight: 'bold',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
    };

    switch (size) {
      case 'small':
        return { ...baseStyle, fontSize: 16 };
      case 'medium':
        return { ...baseStyle, fontSize: 20 };
      case 'large':
        return { ...baseStyle, fontSize: 24 };
      case 'xlarge':
        return { ...baseStyle, fontSize: 32 };
      default:
        return { ...baseStyle, fontSize: 24 };
    }
  };

  return (
    <div>
      {discount > 0 && showOriginal && (
        <Text delete style={{ color: COLORS.price.original, fontSize: '10px', display: 'block' }}>
          {formatCurrency(price)}
        </Text>
      )}
      <Statistic
        value={discountedPrice}
        precision={0}
        prefix=""
        suffix=" COP"
        valueStyle={getValueStyle()}
        formatter={(value) => formatCurrency(value)}
      />
    </div>
  );
};

export default PriceDisplay; 