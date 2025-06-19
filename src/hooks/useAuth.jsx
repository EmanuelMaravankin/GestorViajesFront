/*import { useState, useEffect, createContext, useContext } from 'react';
import { post } from '../services/apiClient';
import { supabase } from "../features/auth/authClient"; 


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


  /*const login = async (email, password) => {
    try {
      const respuesta = await post('/auth/login', { email, password }, false);
      localStorage.setItem('token', respuesta.token);
      setUsuario(respuesta.usuario);
      return respuesta;
    } catch (error) {
      throw error;
    }
  };


const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
};*/

import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../features/auth/authClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    };

    obtenerSesion();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUsuario(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
