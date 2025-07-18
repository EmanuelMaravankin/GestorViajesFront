import { useState, useEffect, useCallback } from 'react';
import { hotelesFallback, ubicacionesFallback } from '../data/fallbackData';

const API_BASE_URL = 'http://localhost:3000/api'; // Ajustar según configuración del backend
const USE_FALLBACK_DATA = true; // Cambiar a false cuando el backend esté disponible

const useHoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [hotelesFiltrados, setHotelesFiltrados] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({});

  // Cargar datos iniciales cuando se usa fallback
  useEffect(() => {
    if (USE_FALLBACK_DATA) {
      setHoteles(hotelesFallback);
      setHotelesFiltrados(hotelesFallback);
    }
  }, []);

  // Cargar ubicaciones al inicializar
  useEffect(() => {
    cargarUbicaciones();
  }, []);

  // Función para cargar ubicaciones
  const cargarUbicaciones = useCallback(async () => {
    if (USE_FALLBACK_DATA) {
      setUbicaciones(ubicacionesFallback);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/ubicaciones`);
      if (response.ok) {
        const data = await response.json();
        setUbicaciones(data);
      } else {
        // Fallback en caso de error
        setUbicaciones(ubicacionesFallback);
      }
    } catch (err) {
      console.error('Error al cargar ubicaciones:', err);
      setUbicaciones(ubicacionesFallback);
    }
  }, []);

  // Función para cargar hoteles
  const cargarHoteles = useCallback(async (ubicacionId = null) => {
    setLoading(true);
    setError(null);
    
    if (USE_FALLBACK_DATA) {
      // Simular delay de red
      setTimeout(() => {
        let hotelesData = hotelesFallback;
        if (ubicacionId) {
          hotelesData = hotelesFallback.filter(hotel => hotel.ubicacion._id === ubicacionId);
        }
        setHoteles(hotelesData);
        setHotelesFiltrados(hotelesData);
        setLoading(false);
      }, 500);
      return;
    }
    
    try {
      let url = `${API_BASE_URL}/hoteles`;
      if (ubicacionId) {
        url += `?ubicacion=${ubicacionId}`;
      }
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setHoteles(data);
        setHotelesFiltrados(data);
      } else {
        throw new Error('Error al cargar hoteles');
      }
    } catch (err) {
      console.error('Error al cargar hoteles:', err);
      // Usar datos fallback en caso de error
      setHoteles(hotelesFallback);
      setHotelesFiltrados(hotelesFallback);
      setError('Usando datos de ejemplo (sin conexión al servidor)');
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar hoteles por criterios
  const buscarHoteles = useCallback(async (criterios) => {
    setLoading(true);
    setError(null);
    
    if (USE_FALLBACK_DATA) {
      // Simular delay de red
      setTimeout(() => {
        let hotelesEncontrados = hotelesFallback;
        
        // Aplicar filtros del lado cliente con datos fallback
        if (criterios.ubicacion) {
          hotelesEncontrados = hotelesEncontrados.filter(
            hotel => hotel.ubicacion._id === criterios.ubicacion
          );
        }
        
        if (criterios.precioMin) {
          hotelesEncontrados = hotelesEncontrados.filter(
            hotel => hotel.precioPorNoche >= parseFloat(criterios.precioMin)
          );
        }
        
        if (criterios.precioMax) {
          hotelesEncontrados = hotelesEncontrados.filter(
            hotel => hotel.precioPorNoche <= parseFloat(criterios.precioMax)
          );
        }
        
        if (criterios.estrellas) {
          hotelesEncontrados = hotelesEncontrados.filter(
            hotel => hotel.estrellas >= parseInt(criterios.estrellas)
          );
        }
        
        if (criterios.servicios && criterios.servicios.length > 0) {
          hotelesEncontrados = hotelesEncontrados.filter(hotel =>
            criterios.servicios.every(servicio =>
              hotel.servicios && hotel.servicios.includes(servicio)
            )
          );
        }
        
        setHoteles(hotelesEncontrados);
        setHotelesFiltrados(hotelesEncontrados);
        setLoading(false);
      }, 800);
      return;
    }
    
    try {
      let url = `${API_BASE_URL}/hoteles`;
      const params = new URLSearchParams();
      
      if (criterios.ubicacion) {
        params.append('ubicacion', criterios.ubicacion);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        let hotelesEncontrados = data;
        
        // Aplicar filtros adicionales del lado cliente
        if (criterios.precioMin) {
          hotelesEncontrados = hotelesEncontrados.filter(
            hotel => hotel.precioPorNoche >= parseFloat(criterios.precioMin)
          );
        }
        
        if (criterios.precioMax) {
          hotelesEncontrados = hotelesEncontrados.filter(
            hotel => hotel.precioPorNoche <= parseFloat(criterios.precioMax)
          );
        }
        
        if (criterios.estrellas) {
          hotelesEncontrados = hotelesEncontrados.filter(
            hotel => hotel.estrellas >= parseInt(criterios.estrellas)
          );
        }
        
        if (criterios.servicios && criterios.servicios.length > 0) {
          hotelesEncontrados = hotelesEncontrados.filter(hotel =>
            criterios.servicios.every(servicio =>
              hotel.servicios && hotel.servicios.includes(servicio)
            )
          );
        }
        
        setHoteles(hotelesEncontrados);
        setHotelesFiltrados(hotelesEncontrados);
      } else {
        throw new Error('Error al buscar hoteles');
      }
    } catch (err) {
      console.error('Error al buscar hoteles:', err);
      // Usar datos fallback en caso de error
      setHoteles(hotelesFallback);
      setHotelesFiltrados(hotelesFallback);
      setError('Usando datos de ejemplo (sin conexión al servidor)');
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros
  const aplicarFiltros = useCallback((nuevosFiltros) => {
    setFiltros(nuevosFiltros);
    
    let hotelesFiltered = [...hoteles];

    // Filtro por precio
    if (nuevosFiltros.precioMin) {
      hotelesFiltered = hotelesFiltered.filter(
        hotel => hotel.precioPorNoche >= parseFloat(nuevosFiltros.precioMin)
      );
    }
    
    if (nuevosFiltros.precioMax) {
      hotelesFiltered = hotelesFiltered.filter(
        hotel => hotel.precioPorNoche <= parseFloat(nuevosFiltros.precioMax)
      );
    }

    // Filtro por estrellas
    if (nuevosFiltros.estrellas) {
      hotelesFiltered = hotelesFiltered.filter(
        hotel => hotel.estrellas >= parseInt(nuevosFiltros.estrellas)
      );
    }

    // Filtro por servicios
    if (nuevosFiltros.servicios && nuevosFiltros.servicios.length > 0) {
      hotelesFiltered = hotelesFiltered.filter(hotel =>
        nuevosFiltros.servicios.every(servicio =>
          hotel.servicios && hotel.servicios.includes(servicio)
        )
      );
    }

    // Filtro por nombre
    if (nuevosFiltros.nombre) {
      hotelesFiltered = hotelesFiltered.filter(hotel =>
        hotel.nombre.toLowerCase().includes(nuevosFiltros.nombre.toLowerCase())
      );
    }

    // Ordenamiento
    if (nuevosFiltros.ordenarPor) {
      hotelesFiltered.sort((a, b) => {
        switch (nuevosFiltros.ordenarPor) {
          case 'precio':
            return a.precioPorNoche - b.precioPorNoche;
          case 'precio-desc':
            return b.precioPorNoche - a.precioPorNoche;
          case 'estrellas':
            return b.estrellas - a.estrellas;
          case 'nombre':
            return a.nombre.localeCompare(b.nombre);
          default:
            return 0;
        }
      });
    }

    setHotelesFiltrados(hotelesFiltered);
  }, [hoteles]);

  // Obtener hotel por ID
  const obtenerHotelPorId = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hoteles/${id}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('Hotel no encontrado');
    } catch (err) {
      console.error('Error al obtener hotel:', err);
      throw err;
    }
  }, []);

  // Limpiar resultados
  const limpiarResultados = useCallback(() => {
    setHoteles([]);
    setHotelesFiltrados([]);
    setError(null);
    setFiltros({});
  }, []);

  // Obtener estadísticas
  const estadisticas = useCallback(() => {
    if (hotelesFiltrados.length === 0) return null;

    const precios = hotelesFiltrados.map(hotel => hotel.precioPorNoche);
    const precioMin = Math.min(...precios);
    const precioMax = Math.max(...precios);
    const precioPromedio = precios.reduce((sum, precio) => sum + precio, 0) / precios.length;

    const estrellas = hotelesFiltrados.map(hotel => hotel.estrellas);
    const estrellasPromedio = estrellas.reduce((sum, estrella) => sum + estrella, 0) / estrellas.length;

    return {
      total: hotelesFiltrados.length,
      precioMin,
      precioMax,
      precioPromedio: Math.round(precioPromedio),
      estrellasPromedio: Math.round(estrellasPromedio * 10) / 10
    };
  }, [hotelesFiltrados]);

  return {
    // Estado
    hoteles: hotelesFiltrados,
    hotelesOriginales: hoteles,
    ubicaciones,
    loading,
    error,
    filtros,
    
    // Acciones
    cargarHoteles,
    buscarHoteles,
    aplicarFiltros,
    obtenerHotelPorId,
    limpiarResultados,
    cargarUbicaciones,
    
    // Utilidades
    estadisticas: estadisticas()
  };
};

export default useHoteles;