"use client"
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"

// Imágenes de actividades
import actividad1 from "../assets/actividad1.jpeg"
import actividad2 from "../assets/actividad2.jpeg"
import actividad3 from "../assets/actividad3.jpeg"
import actividad4 from "../assets/actividad4.jpeg"
import actividad5 from "../assets/actividad5.jpeg"
import actividad6 from "../assets/actividad6.jpeg"
import actividad7 from "../assets/actividad7.jpeg"
import actividad8 from "../assets/actividad8.jpeg"
import actividad9 from "../assets/actividad9.jpeg"
import actividad10 from "../assets/actividad10.jpeg"

const imagenes = [
  actividad1,
  actividad2,
  actividad3,
  actividad4,
  actividad5,
  actividad6,
  actividad7,
  actividad8,
  actividad9,
  actividad10,
]

export default function Dashboard() {
  const navigate = useNavigate()

  const handleClick = (route) => {
    navigate(route)
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-logo">
          <img src="../assets/logo.jpeg" alt="DINAMO Logo" className="header-logo-img" />
          <h1 className="header-title">DINAMO</h1>
        </div>

        <div className="header-user">
          <div className="user-level">Nivel: Principiante</div>
          <div className="user-avatar">
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h2 className="welcome-title">¡Bienvenido a DINAMO!</h2>
            <p className="welcome-subtitle">Continúa tu aprendizaje financiero</p>
          </div>
          <div className="welcome-mascot">
            <img src="../assets/logo.jpeg" alt="DINAMO mascota" className="welcome-mascot-img" />
          </div>
        </div>

        <h2 className="activities-title">Actividades disponibles</h2>

        <div className="grid-container">
          {imagenes.map((imagen, index) => (
            <div key={index} className="activity-card" onClick={() => handleClick(`/actividad/${index + 1}`)}>
              <div className="activity-image-container">
                <img src={imagen || "/placeholder.svg"} alt={`Actividad ${index + 1}`} className="activity-image" />
              </div>
              <div className="activity-content">
                <h3 className="activity-title">Actividad {index + 1}</h3>
                <div className="activity-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "0%" }}></div>
                  </div>
                  <span className="progress-text">0% completado</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="bottom-nav">
        <div className="nav-item active" onClick={() => handleClick("/dashboard")}>
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
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="nav-label">Inicio</span>
          <div className="nav-indicator"></div>
        </div>

        <div className="nav-item" onClick={() => handleClick("/informacion")}>
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
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span className="nav-label">Información</span>
        </div>

        <div className="nav-item" onClick={() => handleClick("/presupuesto")}>
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
            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
          </svg>
          <span className="nav-label">Gastos</span>
        </div>

        <div className="nav-item" onClick={() => handleClick("/perfil")}>
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="nav-label">Perfil</span>
        </div>
      </nav>
    </div>
  )
}
