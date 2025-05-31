import { useEffect, useState } from 'react';
import api from '../api';

export default function StatsPage() {
  const [stats, setStats] = useState({ totalProducts: 0, averagePrice: 0 });

  useEffect(() => {
    api.get('/stats').then(setStats).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Estadísticas</h2>
      <p>Total productos: {stats.totalProducts}</p>
      <p>Precio promedio: ${stats.averagePrice.toFixed(2)}</p>
    </div>
  );
}