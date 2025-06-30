
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"
import mascota from "../assets/DINAMO.png"
import mascota1 from "../assets/DINAMO.png"
import educacionFinancieraImg from "../assets/conceptosF.jpeg"
import desicionFinancieraImg from "../assets/decisiones.jpeg"
import ahorroFinancieraImg from "../assets/ahorro.jpeg"
import dino1 from "../assets/dino1.jpeg"
import dino2 from "../assets/dino2.jpeg"
import dino3 from "../assets/dino3.jpeg"
import dino4 from "../assets/dino4.jpeg"
import dino5 from "../assets/dino5.jpeg"
import dino6 from "../assets/dino6.jpeg"
import dino7 from "../assets/dino7.jpeg"
import dino8 from "../assets/presupuestoSemanal.png"
import dino9 from "../assets/fundamentosDino.png"
import dino10 from "../assets/estrategiasDino.png"
import ActivitiesSection from "../components/ActivitiesSection";



export default function Dashboard() {
  const navigate = useNavigate()
  const [activeLevel, setActiveLevel] = useState("principiante")
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const [userProgress, setUserProgress] = useState({
    overall: 25,
    principiante: 40,
    intermedio: 15,
    avanzado: 5,
    experto: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Simular carga de datos
useEffect(() => {
  const alreadyVisited = localStorage.getItem("dinamo-welcome-shown")
  if (alreadyVisited) {
    setShowWelcomeModal(false)
  }

  // Simular carga
  setTimeout(() => {
    setIsLoading(false)
  }, 800)
}, [])

  // Datos de niveles
  const levels = [
    {
      id: "principiante",
      name: "Principiante",
      description: "Conceptos básicos de finanzas personales",
      color: "var(--primary)",
      icon: (
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
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      progress: 40,
      unlocked: true,
    },
    {
      id: "intermedio",
      name: "Intermedio",
      description: "Ahorro e inversiones básicas",
      color: "var(--secondary)",
      icon: (
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
          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"></path>
          <path d="M2 9v1c0 1.1.9 2 2 2h1"></path>
          <path d="M16 11h0"></path>
        </svg>
      ),
      progress: 15,
      unlocked: true,
    },
    {
      id: "avanzado",
      name: "Avanzado",
      description: "Estrategias de inversión y planificación",
      color: "var(--accent)",
      icon: (
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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
      progress: 5,
      unlocked: true,
    },
    {
      id: "experto",
      name: "Experto",
      description: "Gestión patrimonial y finanzas avanzadas",
      color: "#9333ea",
      icon: (
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
          <path d="M8.56 3.69a9 9 0 0 0-2.92 1.95"></path>
          <path d="M3.69 8.56A9 9 0 0 0 3 12"></path>
          <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92"></path>
          <path d="M8.56 20.31A9 9 0 0 0 12 21"></path>
          <path d="M15.44 20.31a9 9 0 0 0 2.92-1.95"></path>
          <path d="M20.31 15.44A9 9 0 0 0 21 12"></path>
          <path d="M20.31 8.56a9 9 0 0 0-1.95-2.92"></path>
          <path d="M15.44 3.69A9 9 0 0 0 12 3"></path>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
      progress: 0,
      unlocked: false,
    },
  ]

  // Actividades por nivel
  const activities = {
    principiante: [
      {
        id: 1,
        title: "Conceptos Básicos de Finanzas",
        description: "Aprende los términos financieros fundamentales",
        type: "Lección interactiva",
        duration: "15 min",
        points: 50,
        progress: 100,
        image: dino1,
        color: "var(--primary)",
        featured: true,
        tags: ["Básico", "Educativo"],
      },
      {
        id: 2,
        title: "Creando tu Primer Presupuesto",
        description: "Guía paso a paso para organizar tus finanzas",
        type: "Taller práctico",
        duration: "25 min",
        points: 75,
        progress: 60,
        image: dino2,
        color: "var(--secondary)",
        featured: false,
        tags: ["Presupuesto", "Práctico"],
      },
      {
        id: 3,
        title: "Hábitos de Ahorro",
        description: "Técnicas simples para comenzar a ahorrar",
        type: "Quiz interactivo",
        duration: "10 min",
        points: 40,
        progress: 0,
        image: dino3,
        color: "var(--secondary)",
        featured: false,
        tags: ["Ahorro", "Quiz"],
      },
      {
        id: 4,
        title: "Entendiendo las Deudas",
        description: "Aprende a manejar y reducir tus deudas",
        type: "Video tutorial",
        duration: "20 min",
        points: 60,
        progress: 0,
        image: dino4,
        color: "#9333ea",
        featured: false,
        tags: ["Deudas", "Video"],
      },
      {
        id: 5,
        title: "Juego: Decisiones Financieras",
        description: "Pon a prueba tus conocimientos en situaciones reales",
        type: "Juego interactivo",
        duration: "30 min",
        points: 100,
        progress: 0,
        image: dino5,
        color: "#f97316",
        featured: true,
        tags: ["Juego", "Simulación"],
      },
      {
        id: 6,
        title: "Metas Financieras a Corto Plazo",
        description: "Establece y alcanza objetivos financieros",
        type: "Planificador",
        duration: "15 min",
        points: 50,
        progress: 0,
        image: dino6,
        color: "#06b6d4",
        featured: false,
        tags: ["Metas", "Planificación"],
      },
    ],
    intermedio: [
      {
        id: 7,
        title: "Introducción a las Inversiones",
        description: "Conceptos básicos para comenzar a invertir",
        type: "Curso interactivo",
        duration: "45 min",
        points: 120,
        progress: 30,
        image: dino7,
        color: "var(--primary-dark)",
        featured: true,
        tags: ["Inversiones", "Educativo"],
      },
      {
        id: 8,
        title: "Estrategias de Ahorro Avanzadas",
        description: "Métodos efectivos para maximizar tus ahorros",
        type: "Taller práctico",
        duration: "30 min",
        points: 90,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "var(--secondary-dark)",
        featured: false,
        tags: ["Ahorro", "Estrategia"],
      },
      {
        id: 9,
        title: "Simulador de Inversiones",
        description: "Practica tus decisiones de inversión sin riesgo",
        type: "Simulación",
        duration: "40 min",
        points: 150,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#0284c7",
        featured: true,
        tags: ["Simulación", "Inversiones"],
      },
      {
        id: 10,
        title: "Entendiendo el Mercado de Valores",
        description: "Conceptos básicos de la bolsa de valores",
        type: "Lección interactiva",
        duration: "35 min",
        points: 100,
        progress: 0,
        image: "/assets/educacionFinanciera.jpg?height=200&width=300",
        color: "#7c3aed",
        featured: false,
        tags: ["Mercado", "Educativo"],
      },
      {
        id: 11,
        title: "Planificación para Emergencias",
        description: "Cómo crear un fondo de emergencia efectivo",
        type: "Guía práctica",
        duration: "20 min",
        points: 70,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#ea580c",
        featured: false,
        tags: ["Emergencias", "Planificación"],
      },
      {
        id: 12,
        title: "Quiz: Conocimientos de Inversión",
        description: "Pon a prueba lo que has aprendido",
        type: "Quiz avanzado",
        duration: "15 min",
        points: 80,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#0ea5e9",
        featured: false,
        tags: ["Quiz", "Evaluación"],
      },
    ],
    avanzado: [
      {
        id: 13,
        title: "Diversificación de Portafolio",
        description: "Estrategias para balancear tus inversiones",
        type: "Curso especializado",
        duration: "60 min",
        points: 200,
        progress: 15,
        image: "/placeholder.svg?height=200&width=300",
        color: "#0891b2",
        featured: true,
        tags: ["Portafolio", "Estrategia"],
      },
      {
        id: 14,
        title: "Análisis Técnico de Mercados",
        description: "Aprende a leer gráficos y tendencias",
        type: "Taller avanzado",
        duration: "75 min",
        points: 250,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#4f46e5",
        featured: true,
        tags: ["Análisis", "Técnico"],
      },
      {
        id: 15,
        title: "Planificación para el Retiro",
        description: "Estrategias a largo plazo para tu jubilación",
        type: "Planificador",
        duration: "45 min",
        points: 180,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#0d9488",
        featured: false,
        tags: ["Retiro", "Planificación"],
      },
      {
        id: 16,
        title: "Inversiones Alternativas",
        description: "Explora opciones más allá de las acciones y bonos",
        type: "Seminario virtual",
        duration: "50 min",
        points: 190,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#7e22ce",
        featured: false,
        tags: ["Alternativas", "Inversiones"],
      },
      {
        id: 17,
        title: "Simulador de Mercado Avanzado",
        description: "Practica estrategias complejas de inversión",
        type: "Simulación avanzada",
        duration: "90 min",
        points: 300,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#c2410c",
        featured: true,
        tags: ["Simulación", "Avanzado"],
      },
      {
        id: 18,
        title: "Impuestos y Estrategias Fiscales",
        description: "Optimiza tu carga fiscal legalmente",
        type: "Guía especializada",
        duration: "40 min",
        points: 170,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#0369a1",
        featured: false,
        tags: ["Impuestos", "Estrategia"],
      },
    ],
    experto: [
      {
        id: 19,
        title: "Gestión Patrimonial Integral",
        description: "Estrategias holísticas para grandes patrimonios",
        type: "Masterclass",
        duration: "120 min",
        points: 400,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#6d28d9",
        featured: true,
        tags: ["Patrimonio", "Avanzado"],
        locked: true,
      },
      {
        id: 20,
        title: "Inversiones Internacionales",
        description: "Diversificación global de activos",
        type: "Seminario especializado",
        duration: "90 min",
        points: 350,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#0e7490",
        featured: true,
        tags: ["Internacional", "Diversificación"],
        locked: true,
      },
      {
        id: 21,
        title: "Estrategias de Cobertura",
        description: "Protege tu portafolio contra la volatilidad",
        type: "Taller experto",
        duration: "75 min",
        points: 320,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#1e40af",
        featured: false,
        tags: ["Cobertura", "Riesgo"],
        locked: true,
      },
      {
        id: 22,
        title: "Planificación Patrimonial y Sucesoria",
        description: "Estrategias para la transferencia de riqueza",
        type: "Consultoría virtual",
        duration: "100 min",
        points: 380,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#b45309",
        featured: false,
        tags: ["Sucesión", "Planificación"],
        locked: true,
      },
      {
        id: 23,
        title: "Inversiones en Capital Privado",
        description: "Oportunidades en empresas no cotizadas",
        type: "Curso especializado",
        duration: "110 min",
        points: 390,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#4338ca",
        featured: true,
        tags: ["Capital", "Privado"],
        locked: true,
      },
      {
        id: 24,
        title: "Estrategias Avanzadas de Trading",
        description: "Técnicas profesionales de operativa bursátil",
        type: "Bootcamp virtual",
        duration: "150 min",
        points: 450,
        progress: 0,
        image: "/placeholder.svg?height=200&width=300",
        color: "#0f766e",
        featured: false,
        tags: ["Trading", "Profesional"],
        locked: true,
      },
    ],
  }

  // Recomendaciones personalizadas
  const recommendations = [
    {
      id: 101,
      title: "Presupuesto Semanal",
      description: "Mejora tu control de gastos con esta actividad",
      level: "Principiante",
      image: dino8,
    },
    {
      id: 102,
      title: "Fundamentos de Inversión",
      description: "El siguiente paso en tu educación financiera",
      level: "Intermedio",
      image: dino9,
    },
    {
      id: 103,
      title: "Estrategias de Ahorro",
      description: "Técnicas probadas para maximizar tu ahorro",
      level: "Principiante",
      image: dino10,
    },
  ]

  // Logros recientes
  const achievements = [
    {
      id: 201,
      title: "Primera Lección",
      description: "Completaste tu primera actividad",
      icon: "🏆",
      date: "Hace 2 días",
    },
    {
      id: 202,
      title: "Ahorrador Novato",
      description: "Creaste tu primer plan de ahorro",
      icon: "💰",
      date: "Hace 1 semana",
    },
  ]

  // Cerrar modal de bienvenida
const handleCloseWelcomeModal = () => {
  setShowWelcomeModal(false)
  localStorage.setItem("dinamo-welcome-shown", "true")
}

  // Navegar a una actividad
  const handleActivityClick = (levelId, activityId) => {
    navigate(`/actividad/${activityId}?nivel=${levelId}`)
  }

  // Cambiar de nivel
  const handleLevelChange = (levelId) => {
    setActiveLevel(levelId)
  }

  return (
    <div className="dashboard-container">
      {/* Overlay de carga */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Cargando tu experiencia financiera...</p>
        </div>
      )}

      {/* Modal de bienvenida */}
      {showWelcomeModal && (
        <div className="welcome-modal-overlay" onClick={handleCloseWelcomeModal}>
          <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
            <div className="welcome-modal-header">
              <h2>¡Bienvenido a DINAMO!</h2>
              <button className="modal-close-btn" onClick={handleCloseWelcomeModal}>
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="welcome-modal-content">
              <div className="welcome-modal-mascot">
                <img src={mascota} alt="Mascota Dinamo" />

              </div>
              <p>
                ¡Estamos emocionados de tenerte aquí! DINAMO es tu compañero en el viaje hacia la educación financiera.
              </p>
              <div className="welcome-features">
                <div className="welcome-feature">
                  <div className="feature-icon">🎮</div>
                  <div className="feature-text">
                    <h4>Actividades Interactivas</h4>
                    <p>Aprende jugando con nuestras actividades diseñadas para todos los niveles</p>
                  </div>
                </div>
                <div className="welcome-feature">
                  <div className="feature-icon">📊</div>
                  <div className="feature-text">
                    <h4>Seguimiento de Progreso</h4>
                    <p>Visualiza tu avance y desbloquea nuevos niveles</p>
                  </div>
                </div>
                <div className="welcome-feature">
                  <div className="feature-icon">🏆</div>
                  <div className="feature-text">
                    <h4>Logros y Recompensas</h4>
                    <p>Gana insignias y puntos mientras mejoras tus conocimientos</p>
                  </div>
                </div>
              </div>
              <div className="welcome-actions">
                <button className="primary-button" onClick={handleCloseWelcomeModal}>
                  ¡Comenzar mi viaje financiero!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      

      <header className="dashboard-header">
        <div className="header-logo">
          <img src="/src/assets/logo.jpeg" alt="DINAMO Logo" className="header-logo-img" />
          <h1 className="header-title">DINAMO</h1>
        </div>

        <div className="header-user">
          <div className="user-points">
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 64 64"
  fill="none"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  {/* Contorno del huevo */}
  <path
    d="M32 4C20 4 10 20 10 36c0 12 10 22 22 22s22-10 22-22C54 20 44 4 32 4z"
    fill="#d3f9ff"
    stroke="#1e293b"
    strokeWidth="2"
  />


  {/* Detalle interior */}
  <circle cx="32" cy="51" r="5" fill="#002a8b" />
  <circle cx="46" cy="38" r="5" fill="#002a8b" />
  <circle cx="35" cy="12" r="5" fill="#002a8b" />
  <circle cx="15" cy="40" r="4" fill="#002a8b" />
  <circle cx="25" cy="29" r="4" fill="#002a8b" />


</svg>
            <span>1,250 pts</span>
          </div>
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
          <img src={mascota1} alt="Mascota Dinamo" style={{height:"100px"}}/>
          </div>
        </div>

        <div className="dashboard-overview">
          <div className="overview-card progress-card">
            <h3 className="card-title">Tu progreso general</h3>
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${userProgress.overall}%` }}></div>
              </div>
              <div className="progress-text">{userProgress.overall}% completado</div>
            </div>
            <div className="progress-details">
              <div className="progress-item">
                <div className="progress-label">Principiante</div>
                <div className="progress-mini-bar">
                  <div className="mini-bar-fill" style={{ width: `${userProgress.principiante}%` }}></div>
                </div>
                <div className="progress-value">{userProgress.principiante}%</div>
              </div>
              <div className="progress-item">
                <div className="progress-label">Intermedio</div>
                <div className="progress-mini-bar">
                  <div className="mini-bar-fill" style={{ width: `${userProgress.intermedio}%` }}></div>
                </div>
                <div className="progress-value">{userProgress.intermedio}%</div>
              </div>
              <div className="progress-item">
                <div className="progress-label">Avanzado</div>
                <div className="progress-mini-bar">
                  <div className="mini-bar-fill" style={{ width: `${userProgress.avanzado}%` }}></div>
                </div>
                <div className="progress-value">{userProgress.avanzado}%</div>
              </div>
            </div>
          </div>

          <div className="overview-card recommendations-card">
            <h3 className="card-title">Recomendado para ti</h3>
            <div className="recommendations-list">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id} className="recommendation-item">
                  <img
                    src={recommendation.image || "/placeholder.svg"}
                    alt={recommendation.title}
                    className="recommendation-image"
                  />
                  <div className="recommendation-content">
                    <h4 className="recommendation-title">{recommendation.title}</h4>
                    <p className="recommendation-description">{recommendation.description}</p>
                    <span className="recommendation-level">{recommendation.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overview-card achievements-card">
            <h3 className="card-title">Logros recientes</h3>
            <div className="achievements-list">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="achievement-item">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <p className="achievement-description">{achievement.description}</p>
                    <span className="achievement-date">{achievement.date}</span>
                  </div>
                </div>
              ))}
              <button className="view-all-btn">Ver todos los logros</button>
            </div>
          </div>
        </div>

        <div className="levels-navigation">
          <h2 className="section-title">Niveles de Aprendizaje</h2>
          <div className="levels-tabs">
            {levels.map((level) => (
              <button
                key={level.id}
                className={`level-tab ${activeLevel === level.id ? "active" : ""} ${!level.unlocked ? "locked" : ""}`}
                onClick={() => level.unlocked && handleLevelChange(level.id)}
                style={{ "--level-color": level.color }}
              >
                <div className="level-tab-icon">{level.icon}</div>
                <div className="level-tab-content">
                  <h3 className="level-name">{level.name}</h3>
                  <div className="level-progress">
                    <div className="level-progress-bar">
                      <div className="level-progress-fill" style={{ width: `${level.progress}%` }}></div>
                    </div>
                    <span className="level-progress-text">{level.progress}%</span>
                  </div>
                </div>
                {!level.unlocked && (
                  <div className="level-lock">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="activities-section">
          <div className="activities-header">
            <h2 className="section-title">Actividades de {levels.find((l) => l.id === activeLevel)?.name}</h2>
            <div className="activities-filters">
              <button className="filter-btn active">Todas</button>
              <button className="filter-btn">No completadas</button>
              <button className="filter-btn">Completadas</button>
              <select className="filter-select">
                <option value="">Ordenar por</option>
                <option value="newest">Más recientes</option>
                <option value="popular">Más populares</option>
                <option value="duration">Duración</option>
              </select>
            </div>
          </div>
          <div className="featured-activities">
            {activities[activeLevel]
              .filter((activity) => activity.featured)
              .map((activity) => (
                <div
                  key={activity.id}
                  className={`featured-activity ${activity.locked ? "locked" : ""}`}
                  style={{ "--activity-color": activity.color }}
                  onClick={() => !activity.locked && handleActivityClick(activeLevel, activity.id)}
                >
                  <div className="featured-activity-image">
                    <img src={activity.image || "/placeholder.svg"} alt={activity.title} />
                    {activity.locked && (
                      <div className="activity-lock-overlay">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <p>Completa el nivel anterior para desbloquear</p>
                      </div>
                    )}
                  </div>
                  <div className="featured-activity-content">
                    <div className="activity-meta">
                      <span className="activity-type">{activity.type}</span>
                      <span className="activity-duration">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {activity.duration}
                      </span>
                    </div>
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-description">{activity.description}</p>
                    <div className="activity-footer">
                      <div className="activity-tags">
                        {activity.tags.map((tag, index) => (
                          <span key={index} className="activity-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="activity-points">
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 64 64"
  fill="none"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  {/* Contorno del huevo */}
  <path
    d="M32 4C20 4 10 20 10 36c0 12 10 22 22 22s22-10 22-22C54 20 44 4 32 4z"
    fill="#d3f9ff"
    stroke="#1e293b"
    strokeWidth="2"
  />


  {/* Detalle interior */}
  <circle cx="32" cy="51" r="5" fill="#002a8b" />
  <circle cx="46" cy="38" r="5" fill="#002a8b" />
  <circle cx="35" cy="12" r="5" fill="#002a8b" />
  <circle cx="15" cy="40" r="4" fill="#002a8b" />
  <circle cx="25" cy="29" r="4" fill="#002a8b" />


</svg>
                        {activity.points} pts
                      </div>
                    </div>
                    <div className="activity-progress">
                      <div className="activity-progress-bar">
                        <div className="activity-progress-fill" style={{ width: `${activity.progress}%` }}></div>
                      </div>
                      <span className="activity-progress-text">
                        {activity.progress === 0
                          ? "No iniciada"
                          : activity.progress === 100
                            ? "Completada"
                            : `${activity.progress}% completada`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="activities-grid">
            {activities[activeLevel]
              .filter((activity) => !activity.featured)
              .map((activity) => (
                <div
                  key={activity.id}
                  className={`activity-card ${activity.locked ? "locked" : ""}`}
                  style={{ "--activity-color": activity.color }}
                  onClick={() => !activity.locked && handleActivityClick(activeLevel, activity.id)}
                >
                  <div className="activity-card-image">
                    <img src={activity.image || "/placeholder.svg"} alt={activity.title} />
                    <div className="activity-type-badge">{activity.type}</div>
                    {activity.locked && (
                      <div className="activity-lock-overlay">
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
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="activity-card-content">
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-description">{activity.description}</p>
                    <div className="activity-meta">
                      <span className="activity-duration">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {activity.duration}
                      </span>
                      <span className="activity-points">
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 64 64"
  fill="none"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  {/* Contorno del huevo */}
  <path
    d="M32 4C20 4 10 20 10 36c0 12 10 22 22 22s22-10 22-22C54 20 44 4 32 4z"
    fill="#d3f9ff"
    stroke="#1e293b"
    strokeWidth="2"
  />


  {/* Detalle interior */}
  <circle cx="32" cy="51" r="5" fill="#002a8b" />
  <circle cx="46" cy="38" r="5" fill="#002a8b" />
  <circle cx="35" cy="12" r="5" fill="#002a8b" />
  <circle cx="15" cy="40" r="4" fill="#002a8b" />
  <circle cx="25" cy="29" r="4" fill="#002a8b" />


</svg>
                        {activity.points} pts
                      </span>
                    </div>
                    <div className="activity-progress">
                      <div className="activity-progress-bar">
                        <div className="activity-progress-fill" style={{ width: `${activity.progress}%` }}></div>
                      </div>
                      <span className="activity-progress-text">
                        {activity.progress === 0
                          ? "No iniciada"
                          : activity.progress === 100
                            ? "Completada"
                            : `${activity.progress}%`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <div className="nav-item active" onClick={() => navigate("/dashboard")}>
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

        <div className="nav-item" onClick={() => navigate("/informacion")}>
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
