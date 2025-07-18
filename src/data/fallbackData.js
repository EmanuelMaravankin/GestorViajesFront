// Datos de fallback para mostrar en el frontend cuando no hay conexión con el backend

export const ubicacionesFallback = [
  {
    _id: "ubicacion1",
    nombre: "Buenos Aires",
    pais: "Argentina",
    ciudad: "Buenos Aires",
    codigoPostal: "C1000"
  },
  {
    _id: "ubicacion2", 
    nombre: "Bariloche",
    pais: "Argentina",
    ciudad: "San Carlos de Bariloche",
    codigoPostal: "R8400"
  },
  {
    _id: "ubicacion3",
    nombre: "Mendoza",
    pais: "Argentina", 
    ciudad: "Mendoza",
    codigoPostal: "M5500"
  },
  {
    _id: "ubicacion4",
    nombre: "Madrid",
    pais: "España",
    ciudad: "Madrid",
    codigoPostal: "28001"
  },
  {
    _id: "ubicacion5",
    nombre: "París",
    pais: "Francia",
    ciudad: "París", 
    codigoPostal: "75001"
  },
  {
    _id: "ubicacion6",
    nombre: "Roma",
    pais: "Italia",
    ciudad: "Roma",
    codigoPostal: "00100"
  }
];

export const hotelesFallback = [
  {
    _id: "hotel1",
    nombre: "Hotel Plaza Buenos Aires",
    ubicacion: ubicacionesFallback[0],
    direccion: "Av. Corrientes 1234",
    estrellas: 5,
    servicios: ["WiFi", "Piscina", "Gimnasio", "Spa", "Restaurante", "Bar", "Room service"],
    precioPorNoche: 180
  },
  {
    _id: "hotel2", 
    nombre: "Grand Hotel Bariloche",
    ubicacion: ubicacionesFallback[1],
    direccion: "Av. San Martín 567",
    estrellas: 4,
    servicios: ["WiFi", "Piscina", "Gimnasio", "Restaurante", "Estacionamiento"],
    precioPorNoche: 120
  },
  {
    _id: "hotel3",
    nombre: "Hotel Mendoza Wine Resort",
    ubicacion: ubicacionesFallback[2], 
    direccion: "Ruta del Vino 890",
    estrellas: 4,
    servicios: ["WiFi", "Piscina", "Spa", "Restaurante", "Bar", "Centro de negocios"],
    precioPorNoche: 95
  },
  {
    _id: "hotel4",
    nombre: "Hotel Ritz Madrid",
    ubicacion: ubicacionesFallback[3],
    direccion: "Plaza de la Lealtad 5",
    estrellas: 5,
    servicios: ["WiFi", "Gimnasio", "Spa", "Restaurante", "Bar", "Room service", "Lavandería"],
    precioPorNoche: 280
  },
  {
    _id: "hotel5",
    nombre: "Le Bristol Paris",
    ubicacion: ubicacionesFallback[4],
    direccion: "112 Rue du Faubourg Saint-Honoré",
    estrellas: 5,
    servicios: ["WiFi", "Piscina", "Gimnasio", "Spa", "Restaurante", "Bar", "Room service"],
    precioPorNoche: 450
  },
  {
    _id: "hotel6",
    nombre: "Hotel de Russie Roma",
    ubicacion: ubicacionesFallback[5],
    direccion: "Via del Babuino 9",
    estrellas: 5,
    servicios: ["WiFi", "Gimnasio", "Spa", "Restaurante", "Bar", "Centro de negocios"],
    precioPorNoche: 320
  },
  {
    _id: "hotel7",
    nombre: "Hotel Urbano Buenos Aires",
    ubicacion: ubicacionesFallback[0],
    direccion: "Av. Santa Fe 2456",
    estrellas: 3,
    servicios: ["WiFi", "Gimnasio", "Desayuno", "Aire acondicionado"],
    precioPorNoche: 75
  },
  {
    _id: "hotel8",
    nombre: "Cabañas del Lago Bariloche",
    ubicacion: ubicacionesFallback[1],
    direccion: "Av. Ezequiel Bustillo Km 7",
    estrellas: 3,
    servicios: ["WiFi", "Estacionamiento", "Desayuno", "Aire acondicionado"],
    precioPorNoche: 65
  }
];

// Definir ubicaciones por separado para evitar referencias circulares
const buenosAires = {
  _id: "ubicacion1",
  nombre: "Buenos Aires",
  pais: "Argentina",
  ciudad: "Buenos Aires",
  codigoPostal: "C1000"
};

const bariloche = {
  _id: "ubicacion2", 
  nombre: "Bariloche",
  pais: "Argentina",
  ciudad: "San Carlos de Bariloche",
  codigoPostal: "R8400"
};

const mendoza = {
  _id: "ubicacion3",
  nombre: "Mendoza",
  pais: "Argentina", 
  ciudad: "Mendoza",
  codigoPostal: "M5500"
};

const madrid = {
  _id: "ubicacion4",
  nombre: "Madrid",
  pais: "España",
  ciudad: "Madrid",
  codigoPostal: "28001"
};

const paris = {
  _id: "ubicacion5",
  nombre: "París",
  pais: "Francia",
  ciudad: "París", 
  codigoPostal: "75001"
};

const roma = {
  _id: "ubicacion6",
  nombre: "Roma",
  pais: "Italia",
  ciudad: "Roma",
  codigoPostal: "00100"
};

export const vuelosFallback = [
  {
    _id: "vuelo1",
    aerolinea: "Aerolíneas Argentinas",
    origen: buenosAires,
    destino: bariloche,
    fechaHoraSalida: new Date("2024-12-25T08:30:00").toISOString(),
    fechaHoraLlegada: new Date("2024-12-25T10:45:00").toISOString(),
    costo: 180,
    asientosDisponibles: 45,
    activo: true,
    numeroVuelo: "AR1234"
  },
  {
    _id: "vuelo2",
    aerolinea: "LATAM Airlines",
    origen: buenosAires,
    destino: mendoza,
    fechaHoraSalida: new Date("2024-12-26T14:15:00").toISOString(), 
    fechaHoraLlegada: new Date("2024-12-26T16:30:00").toISOString(),
    costo: 220,
    asientosDisponibles: 28,
    activo: true,
    numeroVuelo: "LA5678"
  },
  {
    _id: "vuelo3",
    aerolinea: "Iberia",
    origen: buenosAires,
    destino: madrid,
    fechaHoraSalida: new Date("2024-12-28T22:45:00").toISOString(),
    fechaHoraLlegada: new Date("2024-12-29T15:20:00").toISOString(),
    costo: 850,
    asientosDisponibles: 12,
    activo: true,
    numeroVuelo: "IB6789"
  },
  {
    _id: "vuelo4",
    aerolinea: "Air France",
    origen: buenosAires,
    destino: paris,
    fechaHoraSalida: new Date("2024-12-30T18:30:00").toISOString(),
    fechaHoraLlegada: new Date("2024-12-31T12:15:00").toISOString(),
    costo: 920,
    asientosDisponibles: 8,
    activo: true,
    numeroVuelo: "AF2345"
  },
  {
    _id: "vuelo5",
    aerolinea: "Alitalia",
    origen: buenosAires,
    destino: roma,
    fechaHoraSalida: new Date("2025-01-02T16:00:00").toISOString(),
    fechaHoraLlegada: new Date("2025-01-03T09:30:00").toISOString(),
    costo: 780,
    asientosDisponibles: 22,
    activo: true,
    numeroVuelo: "AZ3456"
  },
  {
    _id: "vuelo6",
    aerolinea: "Aerolíneas Argentinas",
    origen: bariloche,
    destino: buenosAires,
    fechaHoraSalida: new Date("2024-12-27T19:15:00").toISOString(),
    fechaHoraLlegada: new Date("2024-12-27T21:30:00").toISOString(),
    costo: 180,
    asientosDisponibles: 38,
    activo: true,
    numeroVuelo: "AR4321"
  },
  {
    _id: "vuelo7",
    aerolinea: "JetSMART",
    origen: buenosAires,
    destino: mendoza,
    fechaHoraSalida: new Date("2025-01-05T11:00:00").toISOString(),
    fechaHoraLlegada: new Date("2025-01-05T13:15:00").toISOString(),
    costo: 95,
    asientosDisponibles: 67,
    activo: true,
    numeroVuelo: "JA7890"
  },
  {
    _id: "vuelo8",
    aerolinea: "Flybondi",
    origen: buenosAires,
    destino: bariloche,
    fechaHoraSalida: new Date("2025-01-07T06:45:00").toISOString(),
    fechaHoraLlegada: new Date("2025-01-07T09:00:00").toISOString(),
    costo: 85,
    asientosDisponibles: 52,
    activo: true,
    numeroVuelo: "FO1122"
  }
];