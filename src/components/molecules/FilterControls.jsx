import React from 'react';
import { Row, Col, Input, Select, Button } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { COLORS } from '../../config/colors';

const { Search } = Input;
const { Option } = Select;

const FilterControls = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  priceRange, 
  setPriceRange, 
  categories, 
  clearFilters, 
  isDarkMode = false 
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Search
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          size="large"
          style={{
            background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card
          }}
        />
      </Col>
      
      <Col xs={24} sm={12} md={8} lg={6}>
        <Select
          placeholder="Filtrar por categoría"
          value={selectedCategory}
          onChange={setSelectedCategory}
          style={{ 
            width: '100%',
            background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card
          }}
          allowClear
          size="large"
        >
          {categories.map(category => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Col>
      
      <Col xs={24} sm={12} md={8} lg={6}>
        <Select
          placeholder="Filtrar por precio"
          value={priceRange}
          onChange={setPriceRange}
          style={{ 
            width: '100%',
            background: isDarkMode ? COLORS.background.cardDark : COLORS.background.card
          }}
          allowClear
          size="large"
        >
          <Option value="0-400000">Menos de $400,000 COP</Option>
          <Option value="400000-2000000">$400,000 - $2,000,000 COP</Option>
          <Option value="2000000-4000000">$2,000,000 - $4,000,000 COP</Option>
          <Option value="4000000-">Más de $4,000,000 COP</Option>
        </Select>
      </Col>
      
      <Col xs={24} sm={12} md={8} lg={6}>
        <Button 
          icon={<ClearOutlined />}
          onClick={clearFilters}
          style={{ width: '100%' }}
          size="large"
          type="default"
        >
          Limpiar
        </Button>
      </Col>
    </Row>
  );
};

export default FilterControls; 