import { useState } from 'react';
import api from '../../api';

export default function ProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación frontend
    if (!formData.name || !formData.price || !formData.stock_quantity || !formData.category) {
      setError('Nombre, precio, stock y categoría son obligatorios');
      return;
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description || '',
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
        category: formData.category
      };

      await api.post('/products', payload);
      onSuccess(); // Actualiza la lista de productos
      setFormData({ name: '', description: '', price: '', stock_quantity: '', category: '' }); // Reset
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar');
    }
  };

  return (
    <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Agregar Producto</h3>
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
          Guardar Producto
        </button>
      </form>
    </div>
  );
}