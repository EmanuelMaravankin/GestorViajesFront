import React, { useState, useEffect } from 'react';
import useVuelos from '../../../hooks/useVuelos';
import VuelosPresentation from './VuelosPresentation';

const VuelosContainer = () => {
  const {
    vuelos,
    loading,
    error,
    buscarVuelos,
    cargarTodosLosVuelos,
    aplicarFiltros,
    toggleFavorito,
    esFavorito,
    estadisticas,
    limpiarResultados
  } = useVuelos();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [parametrosBusqueda, setParametrosBusqueda] = useState(null);

  // Manejar búsqueda de vuelos
  const handleBuscarVuelos = async (parametros) => {
    // Si no hay parámetros válidos o están vacíos, cargar todos los vuelos
    if (!parametros || 
        !parametros.origen || 
        !parametros.destino || 
        parametros.origen.trim() === '' || 
        parametros.destino.trim() === '') {
      setParametrosBusqueda({ mostrarTodos: true });
      await cargarTodosLosVuelos();
    } else {
      setParametrosBusqueda(parametros);
      await buscarVuelos(parametros);
    }
    
    setMostrarFiltros(true);
  };

  // Cargar todos los vuelos disponibles
  const handleCargarTodosVuelos = async () => {
    setParametrosBusqueda({ mostrarTodos: true }); // Indicador para mostrar todos
    await cargarTodosLosVuelos();
    setMostrarFiltros(true);
  };

  // Manejar cambio de filtros
  const handleFiltrosChange = (filtros) => {
    aplicarFiltros(filtros);
  };

  // Manejar selección de vuelo
  const handleSeleccionarVuelo = (vuelo) => {
    setVueloSeleccionado(vuelo);
    // Aquí podrías navegar a una página de reserva o abrir un modal
    console.log('Vuelo seleccionado:', vuelo);
  };

  // Manejar favoritos
  const handleToggleFavorito = (vuelo) => {
    toggleFavorito(vuelo);
  };

  // Limpiar búsqueda
  const handleLimpiarBusqueda = () => {
    limpiarResultados();
    setMostrarFiltros(false);
    setVueloSeleccionado(null);
    setParametrosBusqueda(null);
  };

  // Nueva búsqueda
  const handleNuevaBusqueda = () => {
    handleLimpiarBusqueda();
  };

  return (
    <VuelosPresentation
      // Estado
      vuelos={vuelos}
      loading={loading}
      error={error}
      mostrarFiltros={mostrarFiltros}
      vueloSeleccionado={vueloSeleccionado}
      parametrosBusqueda={parametrosBusqueda}
      estadisticas={estadisticas}
      
      // Acciones
      onBuscarVuelos={handleBuscarVuelos}
      onCargarTodosVuelos={handleCargarTodosVuelos}
      onFiltrosChange={handleFiltrosChange}
      onSeleccionarVuelo={handleSeleccionarVuelo}
      onToggleFavorito={handleToggleFavorito}
      onLimpiarBusqueda={handleLimpiarBusqueda}
      onNuevaBusqueda={handleNuevaBusqueda}
      
      // Utilidades
      esFavorito={esFavorito}
    />
  );
};

export default VuelosContainer;