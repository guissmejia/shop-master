import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/products');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar productos');
      }

      setProducts(data.products);
      setCategories(data.categories);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    retryCount,
    handleRetry,
    loadProducts
  };
}; 