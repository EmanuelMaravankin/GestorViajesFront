# Documentación Frontend - Ivan Zarate

## 📋 Resumen del Proyecto

**Proyecto:** Gestor de Viajes Frontend  
**Tecnologías:** React 19, Vite, TailwindCSS, Supabase, React Router  
**Patrón Arquitectónico:** Container-Presentation + Custom Hooks  
**Integración:** Backend APIs (Ubicaciones, Hoteles, Excursiones)

---

## ✅ Funcionalidades Implementadas

### 🏗️ **1. Arquitectura y Componentes Base**

#### **Componentes Atómicos (Atomic Design)**
- ✅ [`Button.jsx`](src/components/atoms/Button.jsx) - Botón reutilizable con múltiples variantes
- ✅ [`Input.jsx`](src/components/atoms/Input.jsx) - Input con validaciones y estados de error
- ✅ [`Card.jsx`](src/components/atoms/Card.jsx) - Contenedor base con diferentes estilos
- ✅ [`Loading.jsx`](src/components/atoms/Loading.jsx) - Indicador de carga configurable

#### **Componentes Moleculares**
- ✅ [`SearchForm.jsx`](src/components/molecules/SearchForm.jsx) - Formulario de búsqueda con validaciones
- ✅ [`VueloCard.jsx`](src/components/molecules/VueloCard.jsx) - Tarjeta de vuelo con información completa
- ✅ [`HotelCard.jsx`](src/components/molecules/HotelCard.jsx) - Tarjeta de hotel con servicios y calificación
- ✅ [`FilterPanel.jsx`](src/components/molecules/FilterPanel.jsx) - Panel de filtros avanzados

### 🎣 **2. Custom Hooks (Según Buenas Prácticas de la Cátedra)**

#### **useVuelos Hook**
- ✅ [`useVuelos.js`](src/hooks/useVuelos.js) - Gestión completa de vuelos
  - Búsqueda de vuelos con API externa
  - Sistema de filtros avanzados
  - Gestión de favoritos con localStorage
  - Estados de loading/error
  - Estadísticas automáticas

#### **useHoteles Hook**
- ✅ [`useHoteles.js`](src/hooks/useHoteles.js) - Integración con backend de hoteles
  - Conexión con API de ubicaciones y hoteles (backend de Ivan)
  - Filtros por precio, estrellas, servicios
  - Búsqueda por ubicación
  - Manejo de errores y fallbacks

#### **useReservas Hook**
- ✅ [`useReservas.js`](src/hooks/useReservas.js) - Sistema de reservas
  - CRUD completo de reservas
  - Integración con Supabase Auth
  - Fallback a localStorage
  - Estados de reserva (pendiente, confirmada, cancelada)

### 🏛️ **3. Patrón Container-Presentation Implementado**

#### **Módulo Vuelos**
- ✅ [`VuelosContainer.jsx`](src/features/vuelos/components/VuelosContainer.jsx) - Lógica de negocio
- ✅ [`VuelosPresentation.jsx`](src/features/vuelos/components/VuelosPresentation.jsx) - UI pura
- **Funcionalidades:**
  - Búsqueda avanzada con filtros
  - Sistema de favoritos
  - Estadísticas en tiempo real
  - Responsive design

#### **Módulo Hoteles**
- ✅ [`HotelesContainer.jsx`](src/features/hoteles/components/HotelesContainer.jsx) - Lógica de negocio
- ✅ [`HotelesPresentation.jsx`](src/features/hoteles/components/HotelesPresentation.jsx) - UI pura
- **Funcionalidades:**
  - Integración con backend de ubicaciones
  - Filtros por precio, estrellas, servicios
  - Destinos populares
  - Grid responsive de hoteles

#### **Dashboard de Usuario**
- ✅ [`DashboardContainer.jsx`](src/features/dashboard/components/DashboardContainer.jsx) - Lógica de negocio
- ✅ [`DashboardPresentation.jsx`](src/features/dashboard/components/DashboardPresentation.jsx) - UI pura
- **Funcionalidades:**
  - Estadísticas de usuario
  - Reservas recientes
  - Vuelos favoritos
  - Acciones rápidas
  - Próximo viaje

### 🛣️ **4. Navegación y Rutas**
- ✅ Actualización de [`Routing.jsx`](src/app/Routing.jsx) con nuevas rutas
- ✅ Mejora del [`NavBar.jsx`](src/components/NavBar.jsx) con navegación completa
- **Rutas implementadas:**
  - `/dashboard` - Dashboard principal
  - `/vuelos` - Búsqueda de vuelos
  - `/hoteles` - Búsqueda de hoteles

---

## 🎯 Buenas Prácticas Aplicadas

### **1. Patrón Container-Presentation**
```javascript
// Container: Maneja la lógica
const VuelosContainer = () => {
  const { vuelos, loading, buscarVuelos } = useVuelos();
  return <VuelosPresentation vuelos={vuelos} onBuscar={buscarVuelos} />;
};

// Presentation: Solo UI
const VuelosPresentation = ({ vuelos, onBuscar }) => {
  return <div>{/* UI pura */}</div>;
};
```

### **2. Custom Hooks para Reutilización**
```javascript
// Hook reutilizable con toda la lógica encapsulada
const useVuelos = () => {
  const [vuelos, setVuelos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const buscarVuelos = useCallback(async (params) => {
    // Lógica de búsqueda
  }, []);
  
  return { vuelos, loading, buscarVuelos };
};
```

### **3. Atomic Design**
```
atoms/ (Button, Input, Card, Loading)
  ↓
molecules/ (SearchForm, VueloCard, FilterPanel)
  ↓
organisms/ (VuelosList, HotelesList)
  ↓
pages/ (VuelosContainer + VuelosPresentation)
```

### **4. Manejo de Estados y Errores**
- Estados de loading consistentes
- Manejo de errores user-friendly
- Fallbacks para APIs no disponibles
- Validaciones de formularios

### **5. Integración con Backend**
- Conexión con APIs existentes del equipo
- Fallback a localStorage cuando el backend no está disponible
- Manejo de diferentes formatos de datos

---

## 🔗 Integración con Backend del Equipo

### **APIs Utilizadas:**
- ✅ **Ubicaciones API** - `GET /api/ubicaciones`
- ✅ **Hoteles API** - `GET /api/hoteles`
- ✅ **Excursiones API**  - `GET /api/excursiones`
- 🔄 **Vuelos API**  - Integración pendiente
- 🔄 **Reservas API** - Pendiente (Fallback a localStorage)

### **Configuración de API:**
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
// Configurado en hooks para fácil cambio
```

---

## 📊 Estadísticas de Implementación


### **Funcionalidades Completadas:** 
- ✅ Búsqueda de vuelos
- ✅ Gestión de hoteles
- ✅ Dashboard de usuario
- ✅ Sistema de favoritos
- ✅ Navegación completa

---

## ❌ Funcionalidades Pendientes (Para el Equipo)


1. **Sistema Completo de Reservas**
   - Formulario de pasajeros
   - Proceso de pago
   - Confirmación por email
 

2. **Gestión de Paquetes**
   - Combinación vuelo + hotel
   - Descuentos por paquete


3. **Backend de Vuelos**
   - API CRUD completa
   - Integración con servicios externos


4. **Sistema de Notificaciones**
   - Alertas de precio
   - Recordatorios de viaje


5. **Gestión de Clientes Completa**
   - Perfil extendido
   - Preferencias de viaje


6. **PWA Features**
   - Offline functionality
   - Push notifications

7. **Testing**
   - Unit tests
   - Integration tests


---

## 🚀 Instrucciones de Desarrollo



### **Estructura de Archivos:**
```
src/
├── components/
│   ├── atoms/          # Componentes básicos reutilizables
│   └── molecules/      # Componentes compuestos
├── features/
│   ├── vuelos/         # Módulo de vuelos
│   ├── hoteles/        # Módulo de hoteles
│   └── dashboard/      # Dashboard de usuario
├── hooks/              # Custom hooks
└── app/                # Configuración de rutas
```

