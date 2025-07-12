import React from 'react';

const CartItemImage = ({ src, alt, size = 80 }) => {
  return (
    <img 
      src={src} 
      alt={alt}
      style={{ 
        width: size, 
        height: size, 
        objectFit: 'cover',
        borderRadius: '8px'
      }}
    />
  );
};

export default CartItemImage; 