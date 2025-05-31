import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock_quantity: '',
    category: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get(`/products/${id}`);
        setFormData({
          name: data.name,
          price: data.price,
          stock_quantity: data.stock_quantity,
          category: data.category,
          description: data.description || ''
        });
      } catch (error) {
        setError('Error cargando producto');
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock_quantity || !formData.category) {
      setError('Nombre, precio, stock y categoría son obligatorios');
      return;
    }

    try {
      await api.put(`/products/${id}`, {
        name: formData.name,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
        category: formData.category,
        description: formData.description || ''
      });
      navigate(`/products/${id}`); // Redirige al detalle
    } catch (error) {
      setError(error.response?.data?.error || 'Error al guardar');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', marginTop: '20px' }}>
      <h2>Editar Producto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nombre*: </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Precio*: </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Stock*: </label>
          <input
            type="number"
            value={formData.stock_quantity}
            onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Categoría*: </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Seleccione...</option>
            <option value="Electrónicos">Electrónicos</option>
            <option value="Ropa">Ropa</option>
            <option value="Hogar">Hogar</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Descripción: </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '8px', minHeight: '60px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 15px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}