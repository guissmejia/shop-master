import { createContext, useContext, useState, useCallback } from 'react';
import { message } from 'antd';

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [addingToCart, setAddingToCart] = useState({});
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = useCallback(async (product, quantity = 1) => {
    if (quantity <= 0) {
      message.error('La cantidad debe ser mayor a 0');
      return;
    }

    setAddingToCart(prev => ({ ...prev, [product.id]: true }));

    try {
      // Simular latencia de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });
      
      message.success(`${product.name} agregado al carrito (${quantity} unidad${quantity > 1 ? 'es' : ''})`);
      
    } catch (err) {
      message.error('Error al agregar al carrito');
    } finally {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  }, []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = useCallback((productId, value) => {
    // Manejar valores null, undefined o inválidos
    let validValue = 1;
    
    if (value !== null && value !== undefined && !isNaN(value)) {
      validValue = Math.max(1, Math.floor(Number(value)));
    }
    
    setQuantities(prev => ({
      ...prev,
      [productId]: validValue
    }));
  }, []);

  const initializeQuantities = useCallback((products) => {
    const initialQuantities = {};
    products.forEach(product => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cartItems,
    addingToCart,
    quantities,
    cartItemCount,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    updateQuantity,
    initializeQuantities
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 