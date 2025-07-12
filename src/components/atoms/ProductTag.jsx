import React from 'react';
import { Tag } from 'antd';
import { StarFilled, ThunderboltOutlined, FireOutlined } from '@ant-design/icons';
import { getCategoryColor } from '../../utils/formatters';

const ProductTag = ({ category, size = 'default' }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'Laptops': <ThunderboltOutlined />,
      'Smartphones': <FireOutlined />,
      'Audio': <StarFilled />,
      'Tablets': <StarFilled />,
      'Fotografía': <StarFilled />,
      'Wearables': <StarFilled />,
      'Accesorios': <StarFilled />,
      'Monitores': <StarFilled />,
      'Drones': <StarFilled />
    };
    return icons[category] || <StarFilled />;
  };

  return (
    <Tag 
      color={getCategoryColor(category)}
      icon={getCategoryIcon(category)}
      style={{ 
        fontSize: size === 'small' ? '10px' : '12px', 
        padding: size === 'small' ? '2px 6px' : '4px 8px' 
      }}
    >
      {category}
    </Tag>
  );
};

export default ProductTag; 