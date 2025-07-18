import { useState, useEffect, useCallback } from 'react';
import { vuelosFallback } from '../data/fallbackData';

const USE_FALLBACK_DATA = true; // Cambiar a false cuando el backend esté disponible

const useVuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const [vuelosFiltrados, setVuelosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({});
  const [favoritos, setFavoritos] = useState([]);

  // Cargar datos iniciales cuando se usa fallback
  useEffect(() => {
    if (USE_FALLBACK_DATA) {
      console.log('Cargando vuelos fallback:', vuelosFallback.length, 'vuelos');
      setVuelos(vuelosFallback);
      setVuelosFiltrados(vuelosFallback);
    }
  }, []);

  // Cargar favoritos del localStorage al inicializar
  useEffect(() => {
    const favoritosGuardados = localStorage.getItem('vuelos-favoritos');
    if (favoritosGuardados) {
      try {
        setFavoritos(JSON.parse(favoritosGuardados));
      } catch (err) {
        console.error('Error al cargar favoritos:', err);
      }
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('vuelos-favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  // Buscar vuelos
  const buscarVuelos = useCallback(async (parametrosBusqueda = {}) => {
    setLoading(true);
    setError(null);
    
    if (USE_FALLBACK_DATA) {
      // Simular delay de red
      setTimeout(() => {
        let vuelosEncontrados = vuelosFallback;
        
        // Solo filtrar si se especifican origen Y destino con valores válidos
        if (parametrosBusqueda && 
            parametrosBusqueda.origen && 
            parametrosBusqueda.destino &&
            parametrosBusqueda.origen.trim() !== '' && 
            parametrosBusqueda.destino.trim() !== '') {
          
          vuelosEncontrados = vuelosFallback.filter(vuelo => {
            const origenMatch = vuelo.origen.nombre.toLowerCase().includes(parametrosBusqueda.origen.toLowerCase()) ||
                               vuelo.origen.ciudad.toLowerCase().includes(parametrosBusqueda.origen.toLowerCase());
            const destinoMatch = vuelo.destino.nombre.toLowerCase().includes(parametrosBusqueda.destino.toLowerCase()) ||
                                 vuelo.destino.ciudad.toLowerCase().includes(parametrosBusqueda.destino.toLowerCase());
            return origenMatch && destinoMatch;
          });
        }
        
        setVuelos(vuelosEncontrados);
        setVuelosFiltrados(vuelosEncontrados);
        setLoading(false);
      }, 1000);
      return;
    }
    
    try {
      // En caso real, aquí iría la llamada al API
      console.log('Buscando vuelos en el backend...');
      setVuelos(vuelosFallback);
      setVuelosFiltrados(vuelosFallback);
      setError('Usando datos de ejemplo (sin conexión al servidor)');
    } catch (err) {
      console.error('Error al buscar vuelos:', err);
      setVuelos(vuelosFallback);
      setVuelosFiltrados(vuelosFallback);
      setError('Usando datos de ejemplo (sin conexión al servidor)');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar todos los vuelos disponibles
  const cargarTodosLosVuelos = useCallback(async () => {
    console.log('Llamando cargarTodosLosVuelos...');
    setLoading(true);
    setError(null);
    
    if (USE_FALLBACK_DATA) {
      console.log('Usando fallback data, cargando', vuelosFallback.length, 'vuelos');
      // Simular delay de red
      setTimeout(() => {
        setVuelos(vuelosFallback);
        setVuelosFiltrados(vuelosFallback);
        console.log('Vuelos cargados:', vuelosFallback.length);
        setLoading(false);
      }, 800);
      return;
    }
    
    try {
      // En caso real, llamar a una API que devuelva todos los vuelos
      console.log('Cargando todos los vuelos del backend...');
      setVuelos(vuelosFallback);
      setVuelosFiltrados(vuelosFallback);
    } catch (err) {
      console.error('Error al cargar todos los vuelos:', err);
      setVuelos(vuelosFallback);
      setVuelosFiltrados(vuelosFallback);
      setError('Usando datos de ejemplo (sin conexión al servidor)');
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros
  const aplicarFiltros = useCallback((nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    
    let vuelosFiltrados = [...vuelos];

    // Filtro por precio
    if (nuevosFiltros.precioMin) {
      vuelosFiltrados = vuelosFiltrados.filter(
        vuelo => (vuelo.price || vuelo.costo || 0) >= parseFloat(nuevosFiltros.precioMin)
      );
    }
    
    if (nuevosFiltros.precioMax) {
      vuelosFiltrados = vuelosFiltrados.filter(
        vuelo => (vuelo.price || vuelo.costo || 0) <= parseFloat(nuevosFiltros.precioMax)
      );
    }

    // Filtro por aerolínea
    if (nuevosFiltros.aerolinea) {
      vuelosFiltrados = vuelosFiltrados.filter(
        vuelo => (vuelo.airline || vuelo.aerolinea || '').toLowerCase()
          .includes(nuevosFiltros.aerolinea.toLowerCase())
      );
    }

    // Ordenamiento
    if (nuevosFiltros.ordenarPor) {
      vuelosFiltrados.sort((a, b) => {
        switch (nuevosFiltros.ordenarPor) {
          case 'precio':
            return (a.price || a.costo || 0) - (b.price || b.costo || 0);
          case 'precio-desc':
            return (b.price || b.costo || 0) - (a.price || a.costo || 0);
          case 'salida':
            return new Date(a.departure_at || a.fechaHoraSalida) - 
                   new Date(b.departure_at || b.fechaHoraSalida);
          case 'llegada':
            return new Date(a.return_at || a.fechaHoraLlegada) - 
                   new Date(b.return_at || b.fechaHoraLlegada);
          case 'aerolinea':
            return (a.airline || a.aerolinea || '').localeCompare(
              b.airline || b.aerolinea || ''
            );
          default:
            return 0;
        }
      });
    }

    setVuelosFiltrados(vuelosFiltrados);
  }, [vuelos]);

  // Gestión de favoritos
  const toggleFavorito = useCallback((vuelo) => {
    const vueloId = vuelo.id || vuelo._id || `${vuelo.airline}-${vuelo.flight_number}`;
    
    setFavoritos(prev => {
      const esFavorito = prev.some(fav => 
        (fav.id || fav._id || `${fav.airline}-${fav.flight_number}`) === vueloId
      );
      
      if (esFavorito) {
        return prev.filter(fav => 
          (fav.id || fav._id || `${fav.airline}-${fav.flight_number}`) !== vueloId
        );
      } else {
        return [...prev, { ...vuelo, fechaAgregado: new Date().toISOString() }];
      }
    });
  }, []);

  const esFavorito = useCallback((vuelo) => {
    const vueloId = vuelo.id || vuelo._id || `${vuelo.airline}-${vuelo.flight_number}`;
    return favoritos.some(fav => 
      (fav.id || fav._id || `${fav.airline}-${fav.flight_number}`) === vueloId
    );
  }, [favoritos]);

  // Limpiar resultados
  const limpiarResultados = useCallback(() => {
    setVuelos([]);
    setVuelosFiltrados([]);
    setError(null);
    setFiltros({});
  }, []);

  // Obtener estadísticas
  const estadisticas = useCallback(() => {
    if (vuelosFiltrados.length === 0) return null;

    const precios = vuelosFiltrados
      .map(vuelo => vuelo.price || vuelo.costo || 0)
      .filter(precio => precio > 0);

    if (precios.length === 0) return null;

    const precioMin = Math.min(...precios);
    const precioMax = Math.max(...precios);
    const precioPromedio = precios.reduce((sum, precio) => sum + precio, 0) / precios.length;

    return {
      total: vuelosFiltrados.length,
      precioMin,
      precioMax,
      precioPromedio: Math.round(precioPromedio)
    };
  }, [vuelosFiltrados]);

  return {
    // Estado
    vuelos: vuelosFiltrados,
    vuelosOriginales: vuelos,
    loading,
    error,
    filtros,
    favoritos,
    
    // Acciones
    buscarVuelos,
    cargarTodosLosVuelos,
    aplicarFiltros,
    toggleFavorito,
    esFavorito,
    limpiarResultados,
    
    // Utilidades
    estadisticas: estadisticas()
  };
};

export default useVuelos;