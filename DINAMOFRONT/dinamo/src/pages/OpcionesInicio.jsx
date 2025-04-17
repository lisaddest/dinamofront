import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OpcionesInicio.css';

function OpcionesInicio() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const nivel = state?.nivel || 'principiante';

  const empezarDesdeInicio = () => {
    if (nivel === 'principiante') navigate('/actividad/1');
    else if (nivel === 'intermedio') navigate('/actividad/4');
    else if (nivel === 'avanzado') navigate('/actividad/7');
  };

  const descubrirNivel = () => {
    navigate('/test-nivel');
  };

  return (
    <div className="opciones-container">
      <h2>¿Dónde quieres comenzar?</h2>
      <div className="opciones-botones">
        <button onClick={empezarDesdeInicio}>Desde el principio</button>
        <button onClick={descubrirNivel}>Descubrir mi nivel</button>
      </div>
    </div>
  );
}

export default OpcionesInicio;
