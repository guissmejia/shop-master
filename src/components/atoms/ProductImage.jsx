import React from 'react';

const ProductImage = ({ src, alt, height = 250, style = {} }) => {
  return (
    <img 
      alt={alt} 
      src={src}
      style={{ 
        height, 
        objectFit: 'cover', 
        width: '100%',
        ...style
      }}
    />
  );
};

export default ProductImage; 