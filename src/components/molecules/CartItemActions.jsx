import React from 'react';
import { Button, Popconfirm, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';

const { Text } = Typography;

const CartItemActions = ({ item, onRemoveItem }) => {
  return (
    <Popconfirm
      title="¿Eliminar este producto?"
      onConfirm={() => {
        onRemoveItem(item.id);
        message.info(`${item.name} eliminado del carrito`);
      }}
      okText="Sí"
      cancelText="No"
    >
      <Button 
        danger 
        type="text" 
        icon={<DeleteOutlined />}
        size="small"
        style={{ margin: 0 }}
      >
        <span style={{ display: 'none', '@media (min-width: 768px)': { display: 'inline' } }}>
          Eliminar
        </span>
      </Button>
    </Popconfirm>
  );
};

export default CartItemActions; 