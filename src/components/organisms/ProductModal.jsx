import React from 'react';
import { Modal, Row, Col, Typography, Tag, Statistic, Divider, Space, Button, Descriptions } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { COLORS } from '../../config/colors';
import { formatCurrency, getCategoryColor } from '../../utils/formatters';
import ProductImage from '../atoms/ProductImage';
import QuantityInput from '../atoms/QuantityInput';

const { Title, Text, Paragraph } = Typography;

const ProductModal = ({ 
  visible, 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  onClose, 
  addingToCart, 
  isDarkMode = false 
}) => {
  if (!product) return null;

  const spanishLabels = {
    'processor': 'Procesador',
    'ram': 'Memoria RAM',
    'storage': 'Almacenamiento',
    'display': 'Pantalla',
    'battery': 'Batería',
    'camera': 'Cámara',
    'type': 'Tipo',
    'connectivity': 'Conectividad',
    'noise_cancellation': 'Cancelación de Ruido',
    'weight': 'Peso',
    'sensor': 'Sensor',
    'video': 'Video',
    'stabilization': 'Estabilización',
    'autofocus': 'Enfoque Automático',
    'pencil': 'Lápiz',
    'health': 'Salud',
    'water_resistance': 'Resistencia al Agua',
    'buttons': 'Botones',
    'scroll': 'Scroll',
    'size': 'Tamaño',
    'resolution': 'Resolución',
    'refresh_rate': 'Tasa de Refresco',
    'curvature': 'Curvatura',
    'response_time': 'Tiempo de Respuesta',
    'flight_time': 'Tiempo de Vuelo',
    'range': 'Alcance',
    'wind_resistance': 'Resistencia al Viento'
  };

  return (
    <Modal
      title={
        <Space>
          <ShoppingCartOutlined style={{ color: COLORS.primary.main }} />
          <span>Detalles del Producto</span>
        </Space>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ 
        maxWidth: 800,
        background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card
      }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={12}>
          <ProductImage 
            src={product.image} 
            alt={product.name}
            style={{ borderRadius: '8px' }}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Title level={3} style={{ color: COLORS.primary.main }}>
            {product.name}
          </Title>
          <Tag 
            color={getCategoryColor(product.category)}
            style={{ marginBottom: 16 }}
          >
            {product.category}
          </Tag>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            {product.description}
          </Paragraph>
          <Statistic
            value={product.price}
            precision={0}
            prefix=""
            suffix=" COP"
            valueStyle={{ 
              color: COLORS.price.main, 
              fontSize: 32, 
              fontWeight: 'bold' 
            }}
            formatter={(value) => formatCurrency(value)}
          />
          <Divider />
          {product.specs && (
            <Descriptions title="Especificaciones" column={1} size="small">
              {Object.entries(product.specs).map(([key, value]) => (
                <Descriptions.Item key={key} label={spanishLabels[key] || key.replace('_', ' ').toUpperCase()}>
                  {value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          )}
          <Divider />
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
              <Text strong>Cantidad</Text>
              <QuantityInput
                value={quantity}
                onChange={onQuantityChange}
                width={100}
                isDarkMode={isDarkMode}
              />
            </Space>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              loading={addingToCart[product.id]}
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              size="large"
              style={{ 
                width: '100%',
                background: COLORS.gradients.button,
                border: 'none',
                color: COLORS.text.white
              }}
            >
              Agregar al Carrito
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  );
};

export default ProductModal; 