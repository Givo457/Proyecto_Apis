import { useState } from 'react';
import ProductForm from '../components/products/ProductForm';
import ProductList from '../components/products/ProductList';

export default function ProductsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Gestión de Productos</h1>
      <ProductForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
      <ProductList refreshKey={refreshKey} />
    </div>
  );
}