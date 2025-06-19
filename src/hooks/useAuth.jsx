import { useState, useEffect, createContext, useContext } from 'react';
import { post } from '../services/apiClient';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const datosUsuario = await post('/auth/verificar', {}, true);
          setUsuario(datosUsuario);
        } catch (error) {
          console.error('Error verificando sesión:', error);
          localStorage.removeItem('token');
        }
      }
      setCargando(false);
    };

    verificarSesion();
  }, []);


  const login = async (email, password) => {
    try {
      const respuesta = await post('/auth/login', { email, password }, false);
      localStorage.setItem('token', respuesta.token);
      setUsuario(respuesta.usuario);
      return respuesta;
    } catch (error) {
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  const registrar = async (datosUsuario) => {
    try {
      const respuesta = await post('/auth/registrar', datosUsuario, false);
      return respuesta;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};