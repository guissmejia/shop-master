import React from 'react';
import { InputNumber } from 'antd';
import { COLORS } from '../../config/colors';

const QuantityInput = ({ 
  value, 
  onChange, 
  min = 1, 
  width = 80, 
  isDarkMode = false 
}) => {
  const handleChange = (newValue) => {
    // Pasar el valor directamente al handler padre
    // La validación se hace en el contexto
    onChange(newValue);
  };

  return (
    <InputNumber
      min={min}
      value={value}
      onChange={handleChange}
      step={1}
      precision={0}
      style={{ 
        width,
        background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card
      }}
    />
  );
};

export default QuantityInput; 