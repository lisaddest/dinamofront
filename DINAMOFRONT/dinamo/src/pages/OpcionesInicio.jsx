"use client"
import { useLocation, useNavigate } from "react-router-dom"
import "./OpcionesInicio.css"

function OpcionesInicio() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const nivel = state?.nivel || "principiante"

  const empezarDesdeInicio = () => {
    if (nivel === "principiante") navigate("/actividad/1")
    else if (nivel === "intermedio") navigate("/actividad/4")
    else if (nivel === "avanzado") navigate("/actividad/7")
  }

  const descubrirNivel = () => {
    navigate("/test-nivel")
  }

  return (
    <div className="opciones-container">
      <div className="opciones-content">
        <div className="mascot-container">
          <img src="../assets/logo.jpeg" alt="DINAMO mascota" className="mascot" />
        </div>
        <h2 className="opciones-title">¿Dónde quieres comenzar?</h2>
        <div className="opciones-botones">
          <button className="opcion-button" onClick={empezarDesdeInicio}>
            <div className="opcion-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div className="opcion-text">
              <span className="opcion-title">Desde el principio</span>
              <span className="opcion-description">Comienza con los conceptos básicos de finanzas personales</span>
            </div>
          </button>

          <button className="opcion-button" onClick={descubrirNivel}>
            <div className="opcion-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <div className="opcion-text">
              <span className="opcion-title">Descubrir mi nivel</span>
              <span className="opcion-description">Realiza un test para determinar tu nivel de conocimiento</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OpcionesInicio
