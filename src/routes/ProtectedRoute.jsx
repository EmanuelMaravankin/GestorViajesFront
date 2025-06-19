import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si está autenticado
 * @returns {React.ReactElement} Componente protegido o redirección
 */
const ProtectedRoute = ({ children }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return <div>Cargando...</div>; // Mostrar spinner durante la verificación
  }

  if (!usuario) {
    // Usuario no autenticado, redirigir a login
    return <Navigate to="/login" replace />;
  }

  // Usuario autenticado, renderizar componentes hijos
  return children;
};

export default ProtectedRoute;