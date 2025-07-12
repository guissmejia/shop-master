import React from 'react';
import { Button, InputNumber, Space, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CartQuantityControl = ({ 
  quantity, 
  onUpdateQuantity, 
  productId, 
  isDarkMode = false 
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <Text strong style={{ fontSize: '12px' }}>Cantidad</Text>
      <Space size="small">
        <Button
          type="text"
          icon={<MinusOutlined />}
          onClick={() => onUpdateQuantity(productId, Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          size="small"
        />
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => onUpdateQuantity(productId, value)}
          style={{ width: 50 }}
          size="small"
        />
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => onUpdateQuantity(productId, quantity + 1)}
          size="small"
        />
      </Space>
    </div>
  );
};

export default CartQuantityControl; 