import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NivelSelector.css';

function NivelSelector() {
  const navigate = useNavigate();

  const handleSelection = (nivel) => {
    // Redirecciona al primer nivel de cada grupo
    if (nivel === 'principiante') navigate('/actividad/1');
    else if (nivel === 'intermedio') navigate('/actividad/4');
    else if (nivel === 'avanzado') navigate('/actividad/7');
  };

  return (
    <div className="selector-container">
      <div className="duo-bot">
        <p>¿Qué tanto sabes sobre educación financiera?</p>
      </div>

      <div className="niveles-grid">
        <button onClick={() => handleSelection('principiante')}>
          🐣 Recién empiezo a aprender
        </button>
        <button onClick={() => handleSelection('intermedio')}>
          💡 Conozco algunos conceptos
        </button>
        <button onClick={() => handleSelection('avanzado')}>
          🧠 Puedo tomar decisiones financieras
        </button>
      </div>

      <div className="continuar-footer">
        <p>Selecciona una opción para comenzar</p>
      </div>
    </div>
  );
}

export default NivelSelector;
