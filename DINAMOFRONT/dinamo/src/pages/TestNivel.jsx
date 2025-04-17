import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestNivel.css';

const preguntas = [
  {
    pregunta: "¿Qué es un presupuesto?",
    opciones: [
      { texto: "Una lista de compras para el mes", nivel: "principiante" },
      { texto: "Un plan detallado para administrar ingresos, gastos y ahorros a largo plazo", nivel: "intermedio" },
      { texto: "Una herramienta que permite analizar el flujo de efectivo y tomar decisiones estratégicas sobre inversiones", nivel: "avanzado" },
    ]
  },
  {
    pregunta: "¿Qué entiendes por tasa de interés?",
    opciones: [
      { texto: "El porcentaje que el banco cobra por un servicio de transferencia", nivel: "principiante" },
      { texto: "El porcentaje adicional que se paga sobre el monto prestado o invertido durante un período determinado", nivel: "intermedio" },
      { texto: "El rendimiento neto sobre una inversión o el costo de un préstamo, teniendo en cuenta la inflación, el riesgo y otros factores financieros", nivel: "avanzado" },
    ]
  },
  {
    pregunta: "¿Cuál de estas es una buena práctica financiera?",
    opciones: [
      { texto: "Gastar solo lo que se gana cada mes, sin considerar ahorros o inversión", nivel: "principiante" },
      { texto: "Ahorrar un porcentaje variable según los ingresos y destinarlo a un fondo de inversión o ahorro", nivel: "intermedio" },
      { texto: "Mantener un porcentaje fijo del ingreso destinado al ahorro y la inversión, diversificando las fuentes de ingreso y asegurando un fondo de emergencia", nivel: "avanzado" },
    ]
  },
  {
    pregunta: "¿Sabes cómo funciona una tarjeta de crédito?",
    opciones: [
      { texto: "No la he usado, pero entiendo que se paga a fin de mes", nivel: "principiante" },
      { texto: "Sí, pero no sé exactamente cómo se calcula la tasa de interés si no se paga el total", nivel: "intermedio" },
      { texto: "Sí, conozco el cálculo del interés compuesto y cómo influye el plazo de pago en la deuda acumulada", nivel: "avanzado" },
    ]
  },
  {
    pregunta: "¿Tienes metas financieras definidas?",
    opciones: [
      { texto: "No, nunca me lo había planteado", nivel: "principiante" },
      { texto: "Sí, pero no son específicas ni medibles", nivel: "intermedio" },
      { texto: "Sí, tengo metas SMART (específicas, medibles, alcanzables, relevantes y con tiempo determinado) para ahorro, inversión y retiro", nivel: "avanzado" },
    ]
  }
];

const TestNivel = () => {
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const [nivelRecomendado, setNivelRecomendado] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(0); // Nuevo estado para manejar la pregunta actual
  const navigate = useNavigate();

  const contarNiveles = () => {
    const contador = { principiante: 0, intermedio: 0, avanzado: 0 };
    respuestas.forEach((nivel) => {
      if (nivel) contador[nivel]++;
    });
    const mayor = Object.entries(contador).reduce((a, b) => (a[1] > b[1] ? a : b));
    setNivelRecomendado(mayor[0]);
  };

  const handleRespuesta = (nivel) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = nivel;
    setRespuestas(nuevasRespuestas);
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      contarNiveles();
    }
  };

  return (
    <div className="test-container">
      <h2>Descubre tu nivel</h2>
      <p>Responde la siguiente pregunta para saber tu nivel de educación financiera.</p>

      <div className="pregunta">
        <h3>{preguntas[preguntaActual].pregunta}</h3>
        {preguntas[preguntaActual].opciones.map((opcion, i) => (
          <button
            key={i}
            className={`opcion ${respuestas[preguntaActual] === opcion.nivel ? 'seleccionada' : ''}`}
            onClick={() => handleRespuesta(opcion.nivel)}
          >
            {opcion.texto}
          </button>
        ))}
      </div>

      <button className="finalizar-btn" onClick={siguientePregunta}>
        {preguntaActual < preguntas.length - 1 ? 'Siguiente' : 'Ver mi nivel'}
      </button>

      {nivelRecomendado && (
        <div className="resultado">
          <h3>Se recomienda el nivel: <span className="nivel">{nivelRecomendado}</span></h3>
          <button onClick={() => navigate(`/actividad/${nivelRecomendado === 'principiante' ? 1 : nivelRecomendado === 'intermedio' ? 4 : 7}`)}>
            Comenzar en este nivel
          </button>
          <button onClick={() => navigate('/dashboard')}>
            Ir al dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default TestNivel;
