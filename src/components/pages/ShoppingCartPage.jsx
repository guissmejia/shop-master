import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  List, 
  Space, 
  Typography, 
  Divider, 
  Statistic, 
  Alert, 
  Empty,
  Popconfirm,
  Row,
  Col,
  Progress,
  Badge,
  message
} from 'antd';
import { 
  ShoppingCartOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  FireOutlined
} from '@ant-design/icons';
import { COLORS } from '../../config/colors';
import { formatCurrency } from '../../utils/formatters';
import { useCartContext } from '../../hooks/useCartContext';
import CartItem from '../organisms/CartItem';

const { Title, Text } = Typography;

const ShoppingCartPage = ({ 
  onContinueShopping,
  isDarkMode = false
}) => {
  const [sending, setSending] = useState(false);
  const { 
    cartItems, 
    handleUpdateQuantity, 
    handleRemoveItem, 
    handleClearCart 
  } = useCartContext();

  // Calcular totales
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.16); // 16% IVA
  const shipping = cartItems.length > 0 && subtotal > 4000000 ? 0 : (cartItems.length > 0 ? 120000 : 0);
  const total = subtotal + tax + shipping;

  const handleProcessPayment = async () => {
    if (cartItems.length === 0) {
      message.error('El carrito está vacío');
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al procesar el pago');
      }

      message.success('¡Pago procesado exitosamente! Tu orden ha sido confirmada.');
      
      setTimeout(() => {
        handleClearCart();
      }, 2000);

    } catch (err) {
      message.error(`Error al procesar el pago: ${err.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Header del carrito */}
      <Card 
        style={{ 
          marginBottom: 24,
          background: isDarkMode ? COLORS.gradients.cartDark : COLORS.gradients.cart,
          border: 'none'
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <Title level={2} style={{ marginBottom: 24, color: COLORS.text.white }}>
          <ShoppingCartOutlined style={{ marginRight: 8 }} />
          Tu Carrito de Compras
        </Title>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Statistic
              title="Productos"
              value={cartItems.length}
              valueStyle={{ color: COLORS.text.white, fontSize: 24 }}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="Total"
              value={total}
              precision={0}
              prefix=""
              suffix=" COP"
              valueStyle={{ color: COLORS.text.white, fontSize: 24 }}
              formatter={(value) => formatCurrency(value)}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Statistic
              title="Items"
              value={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              valueStyle={{ color: COLORS.text.white, fontSize: 24 }}
            />
          </Col>
        </Row>
      </Card>

      {/* Carrito vacío */}
      {cartItems.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '50px 0' }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Tu carrito está vacío"
          >
            <Button 
              type="primary" 
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={onContinueShopping}
              style={{
                background: COLORS.gradients.buttonSecondary,
                border: 'none',
                color: COLORS.text.white
              }}
            >
              Ir a Comprar
            </Button>
          </Empty>
        </Card>
      ) : (
        <>
          {/* Lista de productos */}
          <Card 
            title={
              <Space>
                <ShoppingCartOutlined style={{ color: '#ff6b6b' }} />
                <span>Productos en el Carrito</span>
                <Badge count={cartItems.length} style={{ backgroundColor: '#52c41a' }} />
              </Space>
            }
            style={{ marginBottom: 24 }}
            extra={
              <Popconfirm
                title="¿Estás seguro?"
                description="Esto eliminará todos los productos del carrito"
                onConfirm={() => {
                  handleClearCart();
                  message.info('Carrito vaciado');
                }}
                okText="Sí"
                cancelText="No"
              >
                <Button 
                  danger 
                  icon={<DeleteOutlined />}
                  size="small"
                >
                  Vaciar Carrito
                </Button>
              </Popconfirm>
            }
          >
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  isDarkMode={isDarkMode}
                />
              )}
            />
          </Card>

          {/* Resumen de compra */}
          <Card 
            title={
              <Space>
                <DollarOutlined style={{ color: COLORS.status.success }} />
                <span>Resumen de Compra</span>
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Subtotal:</Text>
                    <Text>{formatCurrency(subtotal)}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>IVA (16%):</Text>
                    <Text>{formatCurrency(tax)}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Envío:</Text>
                    <Text style={{ color: shipping === 0 ? COLORS.status.success : COLORS.text.secondary }}>
                      {shipping === 0 ? 'GRATIS' : formatCurrency(shipping)}
                    </Text>
                  </div>
                  <Divider />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong style={{ fontSize: '18px' }}>Total:</Text>
                    <Text strong style={{ fontSize: '18px', color: COLORS.price.main }}>
                      {formatCurrency(total)}
                    </Text>
                  </div>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {shipping > 0 && (
                    <Alert
                      message={`¡Compra ${formatCurrency(4000000 - subtotal)} más para envío GRATIS!`}
                      type="info"
                      showIcon
                      icon={<FireOutlined />}
                    />
                  )}
                  {shipping === 0 && (
                    <Alert
                      message="¡Envío GRATIS aplicado!"
                      type="success"
                      showIcon
                      icon={<CheckCircleOutlined />}
                    />
                  )}
                  <Progress 
                    percent={Math.min((subtotal / 4000000) * 100, 100)} 
                    status={shipping === 0 ? 'success' : 'active'}
                    format={() => `${formatCurrency(subtotal)} / ${formatCurrency(4000000)}`}
                  />
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Botones de acción */}
          <Card style={{ 
            textAlign: 'center',
            background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card
          }}>
            <Space size="large" wrap>
              <Button
                type="default"
                size="large"
                icon={<ArrowLeftOutlined />}
                onClick={onContinueShopping}
                style={{ 
                  minWidth: 150,
                  height: 48,
                  fontSize: '16px',
                  background: COLORS.gradients.buttonSecondary,
                  border: 'none',
                  color: COLORS.text.white
                }}
              >
                Seguir Comprando
              </Button>
              
              <Button
                type="primary"
                size="large"
                icon={<CreditCardOutlined />}
                loading={sending}
                onClick={handleProcessPayment}
                disabled={cartItems.length === 0 || sending}
                style={{ 
                  minWidth: 150,
                  height: 48,
                  fontSize: '16px',
                  background: COLORS.gradients.button,
                  border: 'none',
                  color: COLORS.text.white
                }}
              >
                {sending ? 'Procesando...' : 'Ir a Pagar'}
              </Button>
            </Space>
          </Card>
        </>
      )}
      
      {/* Estilos CSS para responsividad del carrito */}
      <style jsx>{`
        @media (max-width: 767px) {
          .ant-list-item-actions {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            gap: 8px !important;
            margin-top: 12px !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            width: 100% !important;
            flex-wrap: wrap !important;
          }
          
          .ant-list-item-actions > li {
            margin: 0 !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding: 4px !important;
            flex: 1 !important;
            min-width: 0 !important;
            display: flex !important;
            justify-content: center !important;
          }
          
          .ant-list-item-meta {
            width: 100% !important;
          }
          
          .ant-list-item-meta-avatar {
            margin-right: 12px !important;
            margin-bottom: 0 !important;
          }
          
          .ant-list-item {
            padding: 12px 0 !important;
          }
          
          .ant-card-body {
            padding: 16px !important;
          }
          
          .ant-input-number {
            width: 35px !important;
          }
          
          .ant-btn {
            padding: 4px 8px !important;
            font-size: 12px !important;
          }
          
          .ant-space {
            gap: 4px !important;
          }
        }
        
        @media (max-width: 480px) {
          .ant-list-item-actions {
            gap: 4px !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .ant-list-item-actions > li {
            padding: 2px !important;
            min-width: 60px !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .ant-list-item-meta-avatar img {
            width: 60px !important;
            height: 60px !important;
          }
          
          .ant-list-item-meta-title {
            font-size: 14px !important;
          }
          
          .ant-list-item-meta-description {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ShoppingCartPage; 