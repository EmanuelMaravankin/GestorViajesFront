import React, { useState } from 'react';
import { vuelosFallback } from '../data/fallbackData';

const VuelosBasico = () => {
  console.log('VuelosBasico se está renderizando');
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [datosReserva, setDatosReserva] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    dni: '',
    fechaNacimiento: '',
    cantidadPasajeros: 1
  });

  const handleSeleccionarVuelo = (vuelo) => {
    setVueloSeleccionado(vuelo);
    setMostrarFormulario(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosReserva(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmarReserva = (e) => {
    e.preventDefault();
    setMostrarFormulario(false);
    setMostrarConfirmacion(true);
    
    // Aquí podrías enviar los datos al backend
    console.log('Reserva confirmada:', {
      vuelo: vueloSeleccionado,
      pasajero: datosReserva
    });
  };

  const handleNuevaReserva = () => {
    setVueloSeleccionado(null);
    setMostrarFormulario(false);
    setMostrarConfirmacion(false);
    setDatosReserva({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      dni: '',
      fechaNacimiento: '',
      cantidadPasajeros: 1
    });
  };
  
  try {
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

          {/* Formulario básico */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origen (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Buenos Aires"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destino (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Madrid"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setMostrarTodos(true)}
              >
                Buscar Vuelos
              </button>
              <button
                className="border border-blue-600 text-blue-600 px-8 py-2 rounded-md hover:bg-blue-50 transition-colors"
                onClick={() => setMostrarTodos(true)}
              >
                Ver Todos los Vuelos
              </button>
            </div>
          </div>

          {/* Resultados */}
          {mostrarTodos && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Todos los vuelos disponibles
                </h2>
                <p className="text-sm text-gray-600">
                  {vuelosFallback.length} vuelos encontrados
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {vuelosFallback.map((vuelo) => (
                  <div key={vuelo._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {vuelo.aerolinea}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {vuelo.numeroVuelo}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">{vuelo.origen.nombre}</p>
                        <p className="text-xs text-gray-500">{vuelo.origen.ciudad}</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="flex-1 border-t border-gray-300"></div>
                          <div className="px-2">
                            <span className="text-2xl">✈️</span>
                          </div>
                          <div className="flex-1 border-t border-gray-300"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-sm text-gray-600">{vuelo.destino.nombre}</p>
                        <p className="text-xs text-gray-500">{vuelo.destino.ciudad}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          ${vuelo.costo}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {vuelo.asientosDisponibles} asientos disponibles
                        </span>
                      </div>
                      <button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        onClick={() => handleSeleccionarVuelo(vuelo)}
                      >
                        Seleccionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal de Formulario de Reserva */}
          {mostrarFormulario && vueloSeleccionado && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Datos del Pasajero</h2>
                    <button 
                      onClick={() => setMostrarFormulario(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>

                  {/* Resumen del vuelo seleccionado */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Vuelo Seleccionado</h3>
                    <div className="text-sm text-blue-800">
                      <p><strong>{vueloSeleccionado.aerolinea}</strong> - {vueloSeleccionado.numeroVuelo}</p>
                      <p>{vueloSeleccionado.origen.nombre} → {vueloSeleccionado.destino.nombre}</p>
                      <p className="text-lg font-bold text-blue-900 mt-2">${vueloSeleccionado.costo}</p>
                    </div>
                  </div>

                  <form onSubmit={handleConfirmarReserva} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          value={datosReserva.nombre}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: Juan"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          name="apellido"
                          value={datosReserva.apellido}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: Pérez"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={datosReserva.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: juan@ejemplo.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={datosReserva.telefono}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: +54 11 1234-5678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          DNI/Pasaporte *
                        </label>
                        <input
                          type="text"
                          name="dni"
                          value={datosReserva.dni}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Ej: 12345678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Nacimiento *
                        </label>
                        <input
                          type="date"
                          name="fechaNacimiento"
                          value={datosReserva.fechaNacimiento}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                      <button
                        type="button"
                        onClick={() => setMostrarFormulario(false)}
                        className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Confirmar Reserva
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Confirmación */}
          {mostrarConfirmacion && vueloSeleccionado && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-lg w-full">
                <div className="p-6 text-center">
                  <div className="mb-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                      <span className="text-3xl">✅</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Reserva Confirmada!</h2>
                    <p className="text-gray-600">Tu reserva ha sido procesada exitosamente</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-3">Detalles de la Reserva</h3>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><strong>Pasajero:</strong> {datosReserva.nombre} {datosReserva.apellido}</p>
                      <p><strong>Email:</strong> {datosReserva.email}</p>
                      <p><strong>Vuelo:</strong> {vueloSeleccionado.aerolinea} {vueloSeleccionado.numeroVuelo}</p>
                      <p><strong>Ruta:</strong> {vueloSeleccionado.origen.nombre} → {vueloSeleccionado.destino.nombre}</p>
                      <p><strong>Total:</strong> <span className="text-lg font-bold text-blue-600">${vueloSeleccionado.costo}</span></p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Se ha enviado un email de confirmación a {datosReserva.email}
                    </p>
                    <button
                      onClick={handleNuevaReserva}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Hacer Nueva Reserva
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error en VuelosBasico:', error);
    return (
      <div style={{ padding: '20px', marginTop: '80px', color: 'red' }}>
        <h1>ERROR</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  }
};

export default VuelosBasico;