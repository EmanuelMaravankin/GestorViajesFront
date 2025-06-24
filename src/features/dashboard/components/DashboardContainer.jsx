import React, { useState, useEffect } from 'react';
import useReservas from '../../../hooks/useReservas';
import useVuelos from '../../../hooks/useVuelos';
import DashboardPresentation from './DashboardPresentation';

const DashboardContainer = () => {
  const {
    reservas,
    estadisticas: estadisticasReservas,
    loading: loadingReservas,
    cargarReservas
  } = useReservas();

  const {
    favoritos
  } = useVuelos();

  const [datosUsuario, setDatosUsuario] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  // Datos de muestra para reservas
  const reservasMuestra = [
    {
      id: 1,
      origen: 'Buenos Aires',
      destino: 'Madrid',
      fechaCreacion: '2025-06-20',
      fechaViaje: '2025-08-17',
      estado: 'confirmada',
      montoTotal: 850
    },
    {
      id: 2,
      origen: 'Buenos Aires',
      destino: 'Miami',
      fechaCreacion: '2025-06-18',
      fechaViaje: '2025-08-20',
      estado: 'pendiente',
      montoTotal: 1200
    },
    {
      id: 3,
      origen: 'Buenos Aires',
      destino: 'París',
      fechaCreacion: '2025-06-15',
      fechaViaje: '2025-06-10',
      estado: 'confirmada',
      montoTotal: 950
    }
  ];

  // Datos de muestra para favoritos
  const favoritosMuestra = [
    {
      id: 1,
      airline: 'Aerolíneas Argentinas',
      origen: 'EZE',
      destino: 'MAD',
      price: 850,
      fechaAgregado: '2025-06-20'
    },
    {
      id: 2,
      airline: 'LATAM',
      origen: 'EZE',
      destino: 'MIA',
      price: 1200,
      fechaAgregado: '2025-06-19'
    },
    {
      id: 3,
      airline: 'Air France',
      origen: 'EZE',
      destino: 'CDG',
      price: 950,
      fechaAgregado: '2025-06-18'
    }
  ];

  // Usar datos reales si existen, sino usar datos de muestra
  const reservasActuales = reservas.length > 0 ? reservas : reservasMuestra;
  const favoritosActuales = favoritos.length > 0 ? favoritos : favoritosMuestra;

  // Obtener reservas recientes (últimas 5)
  const reservasRecientes = reservasActuales
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
    .slice(0, 5);

  // Obtener vuelos favoritos recientes (últimos 5)
  const favoritosRecientes = favoritosActuales
    .sort((a, b) => new Date(b.fechaAgregado) - new Date(a.fechaAgregado))
    .slice(0, 5);

  // Calcular estadísticas del dashboard
  const estadisticasDashboard = {
    totalReservas: reservasActuales.length,
    reservasPendientes: reservasActuales.filter(r => r.estado === 'pendiente').length,
    reservasConfirmadas: reservasActuales.filter(r => r.estado === 'confirmada').length,
    totalFavoritos: favoritosActuales.length,
    montoTotalGastado: reservasActuales.reduce((total, r) => total + (r.montoTotal || 0), 0),
    proximoViaje: reservasActuales
      .filter(r => r.estado === 'confirmada' && r.fechaViaje && new Date(r.fechaViaje) > new Date())
      .sort((a, b) => new Date(a.fechaViaje) - new Date(b.fechaViaje))[0]
  };

  // Datos para gráficos (simulados)
  const datosGraficos = {
    reservasPorMes: [
      { mes: 'Ene', reservas: 2 },
      { mes: 'Feb', reservas: 1 },
      { mes: 'Mar', reservas: 3 },
      { mes: 'Abr', reservas: 0 },
      { mes: 'May', reservas: 1 },
      { mes: 'Jun', reservas: 2 }
    ],
    destinosPopulares: [
      { destino: 'Miami', viajes: 3 },
      { destino: 'Madrid', viajes: 2 },
      { destino: 'París', viajes: 1 },
      { destino: 'Roma', viajes: 1 }
    ]
  };

  return (
    <DashboardPresentation
      // Estado
      reservasRecientes={reservasRecientes}
      favoritosRecientes={favoritosRecientes}
      estadisticas={estadisticasDashboard}
      datosGraficos={datosGraficos}
      loading={loadingReservas}
      
      // Datos del usuario
      datosUsuario={datosUsuario}
    />
  );
};

export default DashboardContainer;