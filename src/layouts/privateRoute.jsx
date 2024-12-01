// PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Verifica si el usuario tiene un token en el localStorage (puedes ajustar esto si usas otro método de autenticación)
  const token = localStorage.getItem('authToken');

  // Si no hay token, redirige a la página de login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si hay token, renderiza la ruta protegida
  return children;
};

export default PrivateRoute;
