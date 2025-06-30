"use client"

import { useNavigate } from "react-router-dom"
import "../pages/Dashboard.css"
import "./Informacion.css"

export default function Informacion() {
  const navigate = useNavigate()

  // Datos para las tarjetas de información
  const infoCards = [
    {
      id: 1,
      title: "Cursos Financieros",
      description: "Aprende los fundamentos de las finanzas personales",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 0 0 1 4 19.5v-15A2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
      color: "var(--primary)",
    },
    {
      id: 2,
      title: "Libros Recomendados",
      description: "Bibliografía esencial para tu educación financiera",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      color: "var(--secondary)",
    },
    {
      id: 3,
      title: "Conceptos Básicos",
      description: "Términos y conceptos fundamentales de finanzas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
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
      ),
      color: "var(--accent)",
    },
    {
      id: 4,
      title: "Inversiones",
      description: "Aprende a invertir y hacer crecer tu dinero",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
      color: "var(--primary-dark)",
    },
    {
      id: 5,
      title: "Ahorro",
      description: "Estrategias efectivas para ahorrar dinero",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"></path>
          <path d="M2 9v1c0 1.1.9 2 2 2h1"></path>
          <path d="M16 11h0"></path>
        </svg>
      ),
      color: "var(--secondary-dark)",
    },
    {
      id: 6,
      title: "Deudas",
      description: "Cómo manejar y eliminar deudas eficientemente",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
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
      ),
      color: "var(--dark)",
    },
  ]

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-logo">
          <img src="/src/assets/logo.jpeg" alt="DINAMO Logo" className="header-logo-img" />
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
            <h2 className="welcome-title">Centro de Información Financiera</h2>
            <p className="welcome-subtitle">Explora recursos para mejorar tus conocimientos financieros</p>
          </div>
          <div className="welcome-mascot">
            <img src="/src/assets/DINAMO.png" alt="DINAMO mascota" className="welcome-mascot-img" />
          </div>
        </div>

        <h2 className="activities-title">Recursos Disponibles</h2>

        <div className="info-grid-container">
          {infoCards.map((card) => (
            <div key={card.id} className="info-card" onClick={() => navigate(`/informacion/${card.id}`)}>
              <div className="info-card-icon" style={{ backgroundColor: card.color }}>
                {card.icon}
              </div>
              <div className="info-card-content">
                <h3 className="info-card-title">{card.title}</h3>
                <p className="info-card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/dashboard")}>
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
        </div>

        <div className="nav-item active" onClick={() => navigate("/informacion")}>
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
          <div className="nav-indicator"></div>
        </div>

        <div className="nav-item" onClick={() => navigate("/presupuesto")}>
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

        <div className="nav-item" onClick={() => navigate("/perfil")}>
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
