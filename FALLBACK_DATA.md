# Datos de Fallback - Frontend

Este archivo explica cómo usar los datos de fallback para mostrar contenido en el frontend cuando el backend no está disponible.

## ¿Qué son los datos de fallback?

Los datos de fallback son datos de ejemplo que se muestran en el frontend cuando:
- El backend no está ejecutándose
- Hay problemas de conexión con la API
- Se quiere ver la aplicación funcionando sin configurar el backend

## Configuración

### Activar/Desactivar datos de fallback

En los archivos de hooks, puedes cambiar la variable `USE_FALLBACK_DATA`:

**Para usar datos de ejemplo (sin backend):**
```javascript
const USE_FALLBACK_DATA = true;
```

**Para usar datos reales del backend:**
```javascript
const USE_FALLBACK_DATA = false;
```

### Archivos que incluyen datos de fallback:

1. **`src/data/fallbackData.js`** - Contiene todos los datos de ejemplo
2. **`src/hooks/useHoteles.js`** - Hook de hoteles con fallback
3. **`src/hooks/useVuelos.js`** - Hook de vuelos con fallback

## Datos disponibles

### Hoteles (8 hoteles de ejemplo)
- Hotel Plaza Buenos Aires (5 estrellas, $180/noche)
- Grand Hotel Bariloche (4 estrellas, $120/noche)
- Hotel Mendoza Wine Resort (4 estrellas, $95/noche)
- Hotel Ritz Madrid (5 estrellas, $280/noche)
- Le Bristol Paris (5 estrellas, $450/noche)
- Hotel de Russie Roma (5 estrellas, $320/noche)
- Hotel Urbano Buenos Aires (3 estrellas, $75/noche)
- Cabañas del Lago Bariloche (3 estrellas, $65/noche)

### Vuelos (18 vuelos de ejemplo)
**Vuelos nacionales:**
- Buenos Aires ↔ Bariloche ($85-$180)
- Buenos Aires ↔ Mendoza ($95-$220) 
- Bariloche → Mendoza ($120)

**Vuelos internacionales populares:**
- Buenos Aires → Nueva York ($1,250, American Airlines)
- Buenos Aires → Londres ($680-$1,180, British Airways/Norwegian)
- Buenos Aires → Tokio ($1,680, Japan Airlines)
- Buenos Aires → Cancún ($890, Aeromexico)
- Buenos Aires → Miami ($950, American Airlines)
- Buenos Aires → Barcelona ($820, Vueling)
- Buenos Aires → Madrid ($850-$890, Iberia)
- Buenos Aires → París ($920, Air France)
- Buenos Aires → Roma ($780, Alitalia)

**Aerolíneas incluidas:**
- Nacionales: Aerolíneas Argentinas, LATAM, JetSMART, Flybondi
- Internacionales: American Airlines, British Airways, Japan Airlines, Aeromexico, Vueling, Iberia, Air France, Alitalia, Norwegian

### Ubicaciones (12 ubicaciones)
**Argentina:**
- Buenos Aires, Argentina
- Bariloche, Argentina  
- Mendoza, Argentina

**Europa:**
- Madrid, España
- París, Francia
- Roma, Italia
- Londres, Reino Unido
- Barcelona, España

**América:**
- Nueva York, Estados Unidos
- Miami, Estados Unidos
- Cancún, México

**Asia:**
- Tokio, Japón

## Funcionalidades que funcionan con datos de fallback

✅ **Funcionan completamente:**
- Visualización de hoteles y vuelos
- **Botón "Ver Todos los Vuelos"** - Muestra los 18 vuelos disponibles
- **Búsqueda sin criterios** - Al hacer clic en "Buscar Vuelos" sin origen/destino muestra todos
- Filtros por precio, estrellas, servicios, aerolínea
- Búsqueda por ubicación específica
- Ordenamiento por precio, fecha, aerolínea
- Favoritos de vuelos (se guardan en localStorage)
- Responsive design
- Loading states (simulados)

✅ **Parcialmente funcionales:**
- Búsqueda de vuelos (filtra por texto en origen/destino)
- API calls (devuelven datos de ejemplo)

## Cómo funciona

Cuando `USE_FALLBACK_DATA = true`:

1. **Carga inicial**: Los hooks cargan automáticamente los datos de ejemplo
2. **Simula delays**: Se añaden delays para simular llamadas a API reales
3. **Filtros funcionan**: Todos los filtros del lado cliente funcionan normalmente
4. **Mensajes informativos**: Se muestra "Usando datos de ejemplo" en caso de error

## Para desarrolladores

### Agregar más datos de ejemplo

Edita `src/data/fallbackData.js` y agrega más elementos a los arrays:
- `ubicacionesFallback`
- `hotelesFallback` 
- `vuelosFallback`

### Cambiar a datos reales

1. Asegúrate de que el backend esté corriendo
2. Cambia `USE_FALLBACK_DATA = false` en los hooks
3. Verifica que las URLs de la API sean correctas

## Troubleshooting

**Problema**: No se muestran datos
- **Solución**: Verifica que `USE_FALLBACK_DATA = true`

**Problema**: Los filtros no funcionan  
- **Solución**: Los filtros funcionan con datos fallback, verifica la consola del navegador

**Problema**: Error en las llamadas API
- **Solución**: Con fallback activado, los errores se manejan automáticamente mostrando datos de ejemplo

---

*Nota: Los datos de fallback son solo para desarrollo y demostración. En producción, siempre usar `USE_FALLBACK_DATA = false`*