"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./TestNivel.css"

const preguntas = [
  {
    pregunta: "¿Qué es un presupuesto?",
    opciones: [
      { texto: "Una lista de compras para el mes", nivel: "principiante" },
      { texto: "Un plan detallado para administrar ingresos, gastos y ahorros a largo plazo", nivel: "intermedio" },
      {
        texto:
          "Una herramienta que permite analizar el flujo de efectivo y tomar decisiones estratégicas sobre inversiones",
        nivel: "avanzado",
      },
    ],
  },
  {
    pregunta: "¿Qué entiendes por tasa de interés?",
    opciones: [
      { texto: "El porcentaje que el banco cobra por un servicio de transferencia", nivel: "principiante" },
      {
        texto: "El porcentaje adicional que se paga sobre el monto prestado o invertido durante un período determinado",
        nivel: "intermedio",
      },
      {
        texto:
          "El rendimiento neto sobre una inversión o el costo de un préstamo, teniendo en cuenta la inflación, el riesgo y otros factores financieros",
        nivel: "avanzado",
      },
    ],
  },
  {
    pregunta: "¿Cuál de estas es una buena práctica financiera?",
    opciones: [
      { texto: "Gastar solo lo que se gana cada mes, sin considerar ahorros o inversión", nivel: "principiante" },
      {
        texto: "Ahorrar un porcentaje variable según los ingresos y destinarlo a un fondo de inversión o ahorro",
        nivel: "intermedio",
      },
      {
        texto:
          "Mantener un porcentaje fijo del ingreso destinado al ahorro y la inversión, diversificando las fuentes de ingreso y asegurando un fondo de emergencia",
        nivel: "avanzado",
      },
    ],
  },
  {
    pregunta: "¿Sabes cómo funciona una tarjeta de crédito?",
    opciones: [
      { texto: "No la he usado, pero entiendo que se paga a fin de mes", nivel: "principiante" },
      {
        texto: "Sí, pero no sé exactamente cómo se calcula la tasa de interés si no se paga el total",
        nivel: "intermedio",
      },
      {
        texto: "Sí, conozco el cálculo del interés compuesto y cómo influye el plazo de pago en la deuda acumulada",
        nivel: "avanzado",
      },
    ],
  },
  {
    pregunta: "¿Tienes metas financieras definidas?",
    opciones: [
      { texto: "No, nunca me lo había planteado", nivel: "principiante" },
      { texto: "Sí, pero no son específicas ni medibles", nivel: "intermedio" },
      {
        texto:
          "Sí, tengo metas SMART (específicas, medibles, alcanzables, relevantes y con tiempo determinado) para ahorro, inversión y retiro",
        nivel: "avanzado",
      },
    ],
  },
]

const TestNivel = () => {
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null))
  const [nivelRecomendado, setNivelRecomendado] = useState(null)
  const [preguntaActual, setPreguntaActual] = useState(0)
  const navigate = useNavigate()

  const contarNiveles = () => {
    const contador = { principiante: 0, intermedio: 0, avanzado: 0 }
    respuestas.forEach((nivel) => {
      if (nivel) contador[nivel]++
    })
    const mayor = Object.entries(contador).reduce((a, b) => (a[1] > b[1] ? a : b))
    setNivelRecomendado(mayor[0])
  }

  const handleRespuesta = (nivel) => {
    const nuevasRespuestas = [...respuestas]
    nuevasRespuestas[preguntaActual] = nivel
    setRespuestas(nuevasRespuestas)
  }

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      contarNiveles()
    }
  }

  return (
    <div className="test-container">
      <div className="test-content">
        <div className="test-header">
          <img src="../assets/logo.jpeg" alt="DINAMO mascota" className="test-mascot" />
          <h1 className="test-title">Descubre tu nivel</h1>
          <p className="test-subtitle">Responde la siguiente pregunta para saber tu nivel de educación financiera.</p>
        </div>

        {nivelRecomendado ? (
          <div className="resultado-container">
            <div className="resultado-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="resultado-title">¡Test completado!</h2>
            <p className="resultado-text">Basado en tus respuestas, tu nivel es:</p>
            <div className="nivel-badge">{nivelRecomendado}</div>

            <div className="resultado-botones">
              <button
                className="button-primary"
                onClick={() =>
                  navigate(
                    `/actividad/${nivelRecomendado === "principiante" ? 1 : nivelRecomendado === "intermedio" ? 4 : 7}`,
                  )
                }
              >
                Comenzar en este nivel
              </button>
              <button className="button-secondary" onClick={() => navigate("/dashboard")}>
                Ir a la página Inicio
              </button>
            </div>
          </div>
        ) : (
          <div className="pregunta-container">
            <div className="pregunta-progress">
              <div className="progress-text">
                Pregunta {preguntaActual + 1} de {preguntas.length}
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="pregunta-content">
              <h2 className="pregunta-text">{preguntas[preguntaActual].pregunta}</h2>

              <div className="opciones-list">
                {preguntas[preguntaActual].opciones.map((opcion, i) => (
                  <button
                    key={i}
                    className={`opcion-button ${respuestas[preguntaActual] === opcion.nivel ? "seleccionada" : ""}`}
                    onClick={() => handleRespuesta(opcion.nivel)}
                  >
                    {opcion.texto}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={`siguiente-button ${!respuestas[preguntaActual] ? "disabled" : ""}`}
              onClick={siguientePregunta}
              disabled={!respuestas[preguntaActual]}
            >
              {preguntaActual < preguntas.length - 1 ? "Siguiente" : "Ver mi nivel"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TestNivel
