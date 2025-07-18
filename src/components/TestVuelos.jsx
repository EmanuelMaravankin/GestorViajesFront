import React from 'react';
import { vuelosFallback } from '../data/fallbackData';

const TestVuelos = () => {
  console.log('TestVuelos renderizado');
  console.log('Vuelos fallback:', vuelosFallback);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test de Vuelos</h1>
      <p>Total de vuelos: {vuelosFallback.length}</p>
      
      <div className="mt-4">
        {vuelosFallback.map((vuelo, index) => (
          <div key={vuelo._id} className="border p-4 mb-2">
            <h3 className="font-semibold">{vuelo.aerolinea}</h3>
            <p>{vuelo.origen.nombre} → {vuelo.destino.nombre}</p>
            <p>Precio: ${vuelo.costo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestVuelos;