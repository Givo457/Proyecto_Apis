import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando...</div>;
  if (!product) return <div style={{ padding: '20px' }}>Producto no encontrado</div>;

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        {product.name}
      </h2>
      <div style={{ marginTop: '15px' }}>
        <p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> {product.stock_quantity}</p>
        <p><strong>Categoría:</strong> {product.category || 'N/A'}</p>
        <p><strong>Descripción:</strong> {product.description || 'Sin descripción'}</p>
      </div>
      <Link
        to="/products"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '8px 16px',
          background: '#6c757d',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none'
        }}
      >
        Volver a la lista
      </Link>
    </div>
  );
}