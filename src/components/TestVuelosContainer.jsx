import React from 'react';
import useVuelos from '../hooks/useVuelos';

const TestVuelosContainer = () => {
  console.log('TestVuelosContainer renderizado');
  
  try {
    const {
      vuelos,
      loading,
      error,
      cargarTodosLosVuelos
    } = useVuelos();

    console.log('Hook useVuelos ejecutado');
    console.log('Vuelos:', vuelos);
    console.log('Loading:', loading);
    console.log('Error:', error);

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Test VuelosContainer</h1>
        <div className="space-y-4">
          <p>Loading: {loading ? 'Sí' : 'No'}</p>
          <p>Error: {error || 'Ninguno'}</p>
          <p>Total vuelos: {vuelos.length}</p>
          
          <button 
            onClick={cargarTodosLosVuelos}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cargar Todos los Vuelos
          </button>

          <div className="mt-4">
            {vuelos.map((vuelo, index) => (
              <div key={vuelo._id} className="border p-2 mb-2">
                <p>{vuelo.aerolinea}: {vuelo.origen.nombre} → {vuelo.destino.nombre} (${vuelo.costo})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error('Error en TestVuelosContainer:', err);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>Error: {err.message}</p>
      </div>
    );
  }
};

export default TestVuelosContainer;