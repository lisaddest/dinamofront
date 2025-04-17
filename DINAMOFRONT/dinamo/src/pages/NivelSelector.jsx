import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NivelSelector.css';

function NivelSelector() {
  const navigate = useNavigate();

  const handleSelection = (nivel) => {
    navigate('/opciones-inicio', { state: { nivel } });
  };

  return (
    <div className="selector-container">
      <div className="duo-bot">
        <p>Y...¿Qué tanto sabes sobre educación financiera?</p>
      </div>

      <div className="niveles-grid">
        <button onClick={() => handleSelection('principiante')}>
          Recién empiezo a aprender
        </button>
        <button onClick={() => handleSelection('intermedio')}>
          Conozco algunos conceptos
        </button>
        <button onClick={() => handleSelection('avanzado')}>
          Puedo tomar decisiones financieras
        </button>
      </div>

      <div className="continuar-footer">
        <p>Selecciona una opción para comenzar</p>
      </div>
    </div>
  );
}

export default NivelSelector;
