import { useEffect, useState } from 'react';
import api from '../../api';

export default function StatsCard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/products/stats');
        setStats(data);
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Cargando estadísticas...</div>;

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', margin: '20px 0' }}>
      <h3>Estadísticas de Productos</h3>
      <p>Total: {stats.total_products}</p>
      <p>Precio promedio: ${stats.avg_price?.toFixed(2)}</p>
      <p>Stock total: {stats.total_stock}</p>
    </div>
  );
}