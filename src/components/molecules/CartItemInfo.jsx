import React from 'react';
import { Space, Typography, Tag } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { COLORS } from '../../config/colors';
import { getQuantityDiscount } from '../../utils/formatters';
import ProductTag from '../atoms/ProductTag';

const { Text, Paragraph } = Typography;

const CartItemInfo = ({ item, isDarkMode = false }) => {
  const discount = getQuantityDiscount(item.quantity);
  
  return (
    <Space wrap>
      <Text strong style={{ fontSize: '16px', color: isDarkMode ? COLORS.primary.light : COLORS.primary.main }}>
        {item.name}
      </Text>
      <ProductTag category={item.category} size="small" />
      {discount > 0 && (
        <Tag color={COLORS.price.discount} icon={<GiftOutlined />}>
          -{(discount * 100).toFixed(0)}%
        </Tag>
      )}
      <Paragraph 
        ellipsis={{ rows: 2 }} 
        style={{ color: isDarkMode ? COLORS.text.light : COLORS.text.secondary, margin: 0 }}
      >
        {item.description}
      </Paragraph>
    </Space>
  );
};

export default CartItemInfo; 