import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NivelSelector.css';

function ResultadoNivel() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const nivel = state?.nivel || 'principiante';

  const iniciar = () => {
    if (nivel === 'principiante') navigate('/actividad/1');
    else if (nivel === 'intermedio') navigate('/actividad/4');
    else if (nivel === 'avanzado') navigate('/actividad/7');
  };

  return (
    <div className="selector-container">
      <div className="duo-bot">
        <p>¡Tu nivel recomendado es: <strong>{nivel.toUpperCase()}</strong>!</p>
      </div>
      <div className="niveles-grid">
        <button onClick={iniciar}>Comenzar en este nivel</button>
        <button onClick={() => navigate('/dashboard')}>Ir al dashboard</button>
      </div>
    </div>
  );
}

export default ResultadoNivel;
