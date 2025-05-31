import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './components/products/ProductDetail';
import ProductEdit from './components/products/ProductEdit';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <nav>
          <Link 
            to="/products" 
            style={{ 
              marginRight: '15px', 
              color: '#333',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Productos
          </Link>
        </nav>

        <Routes>
          {/* Ruta principal */}
          <Route 
            path="/products" 
            element={<ProductsPage />} 
          />
          
          {/* Ruta para detalle de producto */}
          <Route 
            path="/products/:id" 
            element={<ProductDetail />} 
          />
          
          {/* Ruta para editar producto */}
          <Route 
            path="/products/:id/edit" 
            element={<ProductEdit />} 
          />
          
          {/* Redirección por defecto */}
          <Route 
            path="/" 
            element={<ProductsPage />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;