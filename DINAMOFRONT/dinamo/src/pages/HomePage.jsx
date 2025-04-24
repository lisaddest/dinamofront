"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./HomePage.css"
import logo from "../assets/gif1.gif"

export default function HomePage() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)
  const [hoverButton, setHoverButton] = useState(false)
  const [animateBackground, setAnimateBackground] = useState(false)

  // Frases para el carrusel
  const phrases = [
    "Aprende finanzas de forma divertida",
    "Construye tu futuro financiero",
    "Toma el control de tu dinero",
    "Invierte con conocimiento",
    "Ahorra de manera inteligente",
  ]

  const [currentPhrase, setCurrentPhrase] = useState(0)

  useEffect(() => {
    // Activar animaciones después de cargar
    setTimeout(() => {
      setLoaded(true)
    }, 300)

    // Activar animación de fondo
    setTimeout(() => {
      setAnimateBackground(true)
    }, 800)

    // Carrusel de frases
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleRegisterClick = () => {
    navigate("/register")
  }

  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById("features")
    featuresSection.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="home-page">
      {/* Burbujas animadas de fondo */}
      <div className="bubbles-container">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              "--size": `${Math.random() * 120 + 40}px`,
              "--left": `${Math.random() * 100}%`,
              "--delay": `${Math.random() * 5}s`,
              "--duration": `${Math.random() * 10 + 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Formas geométricas flotantes */}
      <div className="shapes-container">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Sección Hero */}
      <section className={`hero-section ${loaded ? "loaded" : ""}`}>
        <div className="hero-content">
          <div className="logo-container">
            <img src={logo || "/placeholder.svg"} alt="DINAMO Logo" className="logo-img" />
            <div className="logo-glow"></div>
          </div>

          <h1 className="hero-title">DINAMO</h1>

          <div className="tagline-container">
            {phrases.map((phrase, index) => (
              <p key={index} className={`tagline ${currentPhrase === index ? "active" : ""}`}>
                {phrase}
              </p>
            ))}
          </div>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onClick={handleLoginClick}
            >
              <span className="button-text">Iniciar Sesión</span>
              <span className="button-icon">
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
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </span>
            </button>

            <button className="secondary-button" onClick={handleRegisterClick}>
              <span className="button-text">Registrarse</span>
              <span className="button-icon">
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </span>
            </button>
          </div>

          <div className="scroll-indicator" onClick={handleLearnMoreClick}>
            <span>Descubre más</span>
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
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* Sección de características */}
      <section id="features" className="features-section">
        <h2 className="section-title">¿Por qué elegir DINAMO?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>Aprendizaje Interactivo</h3>
            <p>Aprende conceptos financieros a través de actividades divertidas y juegos educativos.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
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
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3>Seguimiento de Progreso</h3>
            <p>Visualiza tu avance y desbloquea nuevos niveles mientras mejoras tus habilidades financieras.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
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
                <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"></path>
                <path d="M2 9v1c0 1.1.9 2 2 2h1"></path>
                <path d="M16 11h0"></path>
              </svg>
            </div>
            <h3>Herramientas Financieras</h3>
            <p>Accede a calculadoras, planificadores y simuladores para poner en práctica lo aprendido.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
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
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <h3>Logros y Recompensas</h3>
            <p>Gana insignias y puntos mientras mejoras tus conocimientos financieros.</p>
          </div>
        </div>

        <div className="cta-container">
          <h3>¿Listo para comenzar tu viaje financiero?</h3>
          <button className="cta-button" onClick={handleRegisterClick}>
            Comenzar Ahora
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
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo || "/placeholder.svg"} alt="DINAMO Logo" className="footer-logo-img" />
            <span>DINAMO</span>
          </div>

          <div className="footer-links">
            <a href="#">Acerca de</a>
            <a href="#">Contacto</a>
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
          </div>

          <div className="footer-social">
            <a href="#" className="social-icon">
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
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="social-icon">
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
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="social-icon">
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
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-copyright">© {new Date().getFullYear()} DINAMO. Todos los derechos reservados.</div>
      </footer>
    </div>
  )
}
