import { useState } from 'react';

export const useFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange(null);
    setSearchTerm('');
  };

  const filterProducts = (products) => {
    return products.filter(product => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesPrice = true;
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          matchesPrice = product.price >= min && product.price <= max;
        } else {
          matchesPrice = product.price >= min;
        }
      }
      
      return matchesCategory && matchesSearch && matchesPrice;
    });
  };

  return {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
    clearFilters,
    filterProducts
  };
}; 