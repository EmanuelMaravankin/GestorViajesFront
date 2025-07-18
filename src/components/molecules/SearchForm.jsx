import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchForm = ({ 
  onSearch, 
  onShowAll,
  loading = false, 
  initialValues = {},
  fields = [],
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    origen: initialValues?.origen || '',
    destino: initialValues?.destino || '',
    fechaSalida: initialValues?.fechaSalida || '',
    fechaRegreso: initialValues?.fechaRegreso || '',
    pasajeros: initialValues?.pasajeros || 1
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (requireFields = true) => {
    const newErrors = {};

    // Solo validar campos si requireFields es true
    if (requireFields) {
      if (!formData.origen.trim()) {
        newErrors.origen = 'El origen es requerido';
      }

      if (!formData.destino.trim()) {
        newErrors.destino = 'El destino es requerido';
      }

      if (!formData.fechaSalida) {
        newErrors.fechaSalida = 'La fecha de salida es requerida';
      }
    }

    if (formData.origen === formData.destino && formData.origen !== '') {
      newErrors.destino = 'El destino debe ser diferente al origen';
    }

    if (formData.pasajeros < 1 || formData.pasajeros > 9) {
      newErrors.pasajeros = 'El número de pasajeros debe estar entre 1 y 9';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si no hay origen y destino, mostrar todos los vuelos
    if (!formData.origen.trim() && !formData.destino.trim()) {
      if (typeof onShowAll === 'function') {
        onShowAll();
      } else if (typeof onSearch === 'function') {
        onSearch(formData);
      }
      return;
    }

    // Validación normal si hay campos completados
    if (validateForm() && typeof onSearch === 'function') {
      onSearch(formData);
    }
  };

  // Manejar botón "Ver todos los vuelos"
  const handleShowAll = () => {
    if (typeof onShowAll === 'function') {
      onShowAll();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 mt-20 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="origen"
          label="Origen (opcional para ver todos)"
          placeholder="Ej: Buenos Aires (EZE)"
          value={formData.origen}
          onChange={handleChange}
          error={errors.origen}
        />

        <Input
          name="destino"
          label="Destino (opcional para ver todos)"
          placeholder="Ej: Miami (MIA)"
          value={formData.destino}
          onChange={handleChange}
          error={errors.destino}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="date"
          name="fechaSalida"
          label="Fecha de Salida (opcional)"
          value={formData.fechaSalida}
          onChange={handleChange}
          error={errors.fechaSalida}
        />

        <Input
          type="date"
          name="fechaRegreso"
          label="Fecha de Regreso (Opcional)"
          value={formData.fechaRegreso}
          onChange={handleChange}
        />

        <Input
          type="number"
          name="pasajeros"
          label="Pasajeros"
          min="1"
          max="9"
          value={formData.pasajeros}
          onChange={handleChange}
          error={errors.pasajeros}
          required
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
        
        {onShowAll && (
          <Button
            type="button"
            variant="outline"
            onClick={handleShowAll}
            disabled={loading}
            className="w-full sm:w-auto px-8"
          >
            Ver Todos los Vuelos
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
