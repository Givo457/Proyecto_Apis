import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function ProductList({ refreshKey }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [refreshKey]);

  if (loading) return <div>Cargando productos...</div>;

  return (
    <div style={{ marginTop: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Precio</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>${product.price}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <Link 
                  to={`/products/${product.id}/edit`}
                  style={{ marginRight: '10px', color: '#0066cc' }}
                >
                  Editar
                </Link>
                <button
                  onClick={async () => {
                    if (window.confirm('¿Eliminar este producto?')) {
                      await api.delete(`/products/${product.id}`);
                      setProducts(products.filter(p => p.id !== product.id));
                    }
                  }}
                  style={{
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}