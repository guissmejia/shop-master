import React from 'react';
import { List } from 'antd';
import CartItemImage from '../atoms/CartItemImage';
import CartItemInfo from '../molecules/CartItemInfo';
import CartQuantityControl from '../atoms/CartQuantityControl';
import CartItemPrice from '../atoms/CartItemPrice';
import CartItemTotal from '../atoms/CartItemTotal';
import CartItemActions from '../molecules/CartItemActions';

const CartItem = ({ 
  item, 
  onUpdateQuantity, 
  onRemoveItem, 
  isDarkMode = false 
}) => {
  return (
    <List.Item
      style={{ 
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0'
      }}
      actions={[
        <CartQuantityControl
          key="quantity"
          quantity={item.quantity}
          onUpdateQuantity={onUpdateQuantity}
          productId={item.id}
          isDarkMode={isDarkMode}
        />,
        <CartItemPrice
          key="price"
          price={item.price}
          quantity={item.quantity}
          isDarkMode={isDarkMode}
        />,
        <CartItemTotal
          key="total"
          price={item.price}
          quantity={item.quantity}
          isDarkMode={isDarkMode}
        />,
        <CartItemActions
          key="delete"
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ]}
    >
      <List.Item.Meta
        avatar={
          <CartItemImage 
            src={item.image} 
            alt={item.name}
          />
        }
        title={
          <CartItemInfo
            item={item}
            isDarkMode={isDarkMode}
          />
        }
      />
    </List.Item>
  );
};

export default CartItem; 