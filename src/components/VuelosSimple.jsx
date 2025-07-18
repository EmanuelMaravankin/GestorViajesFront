import React, { useState } from 'react';
import { vuelosFallback } from '../data/fallbackData';
import Card from './atoms/Card';
import Button from './atoms/Button';
import Input from './atoms/Input';
import VueloCard from './molecules/VueloCard';
import Loading from './atoms/Loading';

const VuelosSimple = () => {
  const [vuelos, setVuelos] = useState(vuelosFallback);
  const [vuelosFiltrados, setVuelosFiltrados] = useState(vuelosFallback);
  const [loading, setLoading] = useState(false);
  const [mostrarTodos, setMostrarTodos] = useState(true);
  const [busqueda, setBusqueda] = useState({
    origen: '',
    destino: '',
    fechaSalida: '',
    pasajeros: 1
  });

  const handleBuscar = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (!busqueda.origen.trim() && !busqueda.destino.trim()) {
        // Si no hay criterios, mostrar todos
        setVuelosFiltrados(vuelosFallback);
        setMostrarTodos(true);
      } else {
        // Filtrar por criterios
        const filtrados = vuelosFallback.filter(vuelo => {
          const origenMatch = !busqueda.origen.trim() || 
            vuelo.origen.nombre.toLowerCase().includes(busqueda.origen.toLowerCase()) ||
            vuelo.origen.ciudad.toLowerCase().includes(busqueda.origen.toLowerCase());
          
          const destinoMatch = !busqueda.destino.trim() || 
            vuelo.destino.nombre.toLowerCase().includes(busqueda.destino.toLowerCase()) ||
            vuelo.destino.ciudad.toLowerCase().includes(busqueda.destino.toLowerCase());
          
          return origenMatch && destinoMatch;
        });
        
        setVuelosFiltrados(filtrados);
        setMostrarTodos(false);
      }
      setLoading(false);
    }, 1000);
  };

  const handleVerTodos = () => {
    setLoading(true);
    setTimeout(() => {
      setVuelosFiltrados(vuelosFallback);
      setMostrarTodos(true);
      setBusqueda({ origen: '', destino: '', fechaSalida: '', pasajeros: 1 });
      setLoading(false);
    }, 800);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusqueda(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSeleccionarVuelo = (vuelo) => {
    console.log('Vuelo seleccionado:', vuelo);
  };

  const handleToggleFavorito = (vuelo) => {
    console.log('Toggle favorito:', vuelo);
  };

  const estadisticas = vuelosFiltrados.length > 0 ? {
    total: vuelosFiltrados.length,
    precioMin: Math.min(...vuelosFiltrados.map(v => v.costo)),
    precioMax: Math.max(...vuelosFiltrados.map(v => v.costo))
  } : null;

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buscar vuelos
          </h1>
          <p className="text-gray-600">
            Encuentra los mejores vuelos para tu próximo viaje
          </p>
        </div>

        <Card className="mb-6">
          <form onSubmit={handleBuscar} className="space-y-4 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="origen"
                label="Origen (opcional para ver todos)"
                placeholder="Ej: Buenos Aires"
                value={busqueda.origen}
                onChange={handleInputChange}
              />

              <Input
                name="destino"
                label="Destino (opcional para ver todos)"
                placeholder="Ej: Madrid"
                value={busqueda.destino}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="date"
                name="fechaSalida"
                label="Fecha de Salida (opcional)"
                value={busqueda.fechaSalida}
                onChange={handleInputChange}
              />

              <Input
                type="date"
                name="fechaRegreso"
                label="Fecha de Regreso (opcional)"
                value={busqueda.fechaRegreso || ''}
                onChange={handleInputChange}
              />

              <Input
                type="number"
                name="pasajeros"
                label="Pasajeros"
                min="1"
                max="9"
                value={busqueda.pasajeros}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8"
              >
                {loading ? 'Buscando...' : 'Buscar Vuelos'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleVerTodos}
                disabled={loading}
                className="w-full sm:w-auto px-8"
              >
                Ver Todos los Vuelos
              </Button>
            </div>
          </form>
        </Card>

        {/* Resultados */}
        {(mostrarTodos || vuelosFiltrados.length > 0) && (
          <div className="space-y-6">
            {/* Header de resultados */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {mostrarTodos ? 'Todos los vuelos disponibles' : 'Resultados de búsqueda'}
                </h2>
                {estadisticas && (
                  <p className="text-sm text-gray-600">
                    {estadisticas.total} vuelos encontrados
                    <span>
                      {' '}• Desde ${estadisticas.precioMin} hasta ${estadisticas.precioMax}
                    </span>
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setBusqueda({ origen: '', destino: '', fechaSalida: '', pasajeros: 1 });
                    setMostrarTodos(false);
                    setVuelosFiltrados([]);
                  }}
                >
                  Nueva búsqueda
                </Button>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-8">
                <Loading />
              </div>
            )}

            {/* Lista de vuelos */}
            {!loading && (
              <div className="grid grid-cols-1 gap-6">
                {vuelosFiltrados.map((vuelo) => (
                  <VueloCard
                    key={vuelo._id}
                    vuelo={vuelo}
                    onSelect={handleSeleccionarVuelo}
                    onFavorite={handleToggleFavorito}
                    isFavorite={false}
                    showActions={true}
                  />
                ))}
              </div>
            )}

            {/* Sin resultados */}
            {!loading && vuelosFiltrados.length === 0 && !mostrarTodos && (
              <Card className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  No se encontraron vuelos para los criterios especificados
                </p>
                <Button onClick={handleVerTodos}>
                  Ver todos los vuelos disponibles
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VuelosSimple;