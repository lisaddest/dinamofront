"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/Dashboard.css"
import "./Perfil.css"

export default function Perfil() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("perfil")

  // Datos de usuario de ejemplo
  const [userData, setUserData] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    nivel: "Principiante",
    telefono: "",
    fechaNacimiento: "",
    ocupacion: "",
    intereses: [],
  })

  // Opciones para intereses financieros
  const interesOptions = [
    "Ahorro",
    "Inversiones",
    "Presupuesto",
    "Deudas",
    "Impuestos",
    "Jubilación",
    "Bienes raíces",
    "Emprendimiento",
  ]

  // Configuración de notificaciones
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    nuevosContenidos: true,
    recordatorios: true,
    consejos: true,
  })

  // Configuración de privacidad
  const [privacySettings, setPrivacySettings] = useState({
    perfilPublico: false,
    compartirProgreso: true,
    datosAnalisis: true,
  })

  // Manejar cambios en los datos del usuario
  const handleUserDataChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    })
  }

  // Manejar cambios en intereses
  const handleInterestToggle = (interest) => {
    if (userData.intereses.includes(interest)) {
      setUserData({
        ...userData,
        intereses: userData.intereses.filter((item) => item !== interest),
      })
    } else {
      setUserData({
        ...userData,
        intereses: [...userData.intereses, interest],
      })
    }
  }

  // Manejar cambios en notificaciones
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
  }

  // Manejar cambios en privacidad
  const handlePrivacyChange = (setting) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting],
    })
  }

  // Guardar cambios
  const handleSaveChanges = () => {
    // Aquí iría la lógica para guardar los cambios en el backend
    alert("Cambios guardados correctamente")
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-logo">
          <img src="../assets/logo.jpeg" alt="DINAMO Logo" className="header-logo-img" />
          <h1 className="header-title">DINAMO</h1>
        </div>

        <div className="header-user">
          <div className="user-level">Nivel: {userData.nivel}</div>
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
            <h2 className="welcome-title">Tu Perfil</h2>
            <p className="welcome-subtitle">Administra tu información y preferencias</p>
          </div>
          <div className="welcome-mascot">
            <img src="../assets/logo.jpeg" alt="DINAMO mascota" className="welcome-mascot-img" />
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
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
              <button className="change-avatar-btn">Cambiar foto</button>
            </div>
            <div className="profile-nav">
              <button
                className={`profile-nav-item ${activeTab === "perfil" ? "active" : ""}`}
                onClick={() => setActiveTab("perfil")}
              >
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Información Personal
              </button>
              <button
                className={`profile-nav-item ${activeTab === "notificaciones" ? "active" : ""}`}
                onClick={() => setActiveTab("notificaciones")}
              >
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
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                Notificaciones
              </button>
              <button
                className={`profile-nav-item ${activeTab === "privacidad" ? "active" : ""}`}
                onClick={() => setActiveTab("privacidad")}
              >
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
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Privacidad y Seguridad
              </button>
              <button
                className={`profile-nav-item ${activeTab === "preferencias" ? "active" : ""}`}
                onClick={() => setActiveTab("preferencias")}
              >
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
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Preferencias
              </button>
            </div>
          </div>

          <div className="profile-content">
            {activeTab === "perfil" && (
              <div className="profile-section">
                <h3 className="profile-section-title">Información Personal</h3>
                <div className="profile-form">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      type="text"
                      id="nombre"
                      value={userData.nombre}
                      onChange={(e) => handleUserDataChange("nombre", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={(e) => handleUserDataChange("email", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      value={userData.telefono}
                      onChange={(e) => handleUserDataChange("telefono", e.target.value)}
                      placeholder="Opcional"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      value={userData.fechaNacimiento}
                      onChange={(e) => handleUserDataChange("fechaNacimiento", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ocupacion">Ocupación</label>
                    <input
                      type="text"
                      id="ocupacion"
                      value={userData.ocupacion}
                      onChange={(e) => handleUserDataChange("ocupacion", e.target.value)}
                      placeholder="Opcional"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Intereses financieros</label>
                    <div className="interest-tags">
                      {interesOptions.map((interes) => (
                        <div
                          key={interes}
                          className={`interest-tag ${userData.intereses.includes(interes) ? "selected" : ""}`}
                          onClick={() => handleInterestToggle(interes)}
                        >
                          {interes}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="save-button" onClick={handleSaveChanges}>
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notificaciones" && (
              <div className="profile-section">
                <h3 className="profile-section-title">Configuración de Notificaciones</h3>
                <div className="settings-list">
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Notificaciones por correo</h4>
                      <p>Recibe actualizaciones y recordatorios por correo electrónico</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email}
                        onChange={() => handleNotificationChange("email")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Notificaciones push</h4>
                      <p>Recibe notificaciones en tu dispositivo</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.push}
                        onChange={() => handleNotificationChange("push")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Nuevos contenidos</h4>
                      <p>Notificaciones sobre nuevos cursos y recursos</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.nuevosContenidos}
                        onChange={() => handleNotificationChange("nuevosContenidos")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Recordatorios</h4>
                      <p>Recordatorios para continuar tu aprendizaje</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.recordatorios}
                        onChange={() => handleNotificationChange("recordatorios")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Consejos financieros</h4>
                      <p>Recibe consejos y trucos financieros periódicamente</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.consejos}
                        onChange={() => handleNotificationChange("consejos")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="form-actions">
                    <button className="save-button" onClick={handleSaveChanges}>
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacidad" && (
              <div className="profile-section">
                <h3 className="profile-section-title">Privacidad y Seguridad</h3>
                <div className="settings-list">
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Perfil público</h4>
                      <p>Permite que otros usuarios vean tu perfil y progreso</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacySettings.perfilPublico}
                        onChange={() => handlePrivacyChange("perfilPublico")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Compartir progreso</h4>
                      <p>Comparte tu progreso en redes sociales</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacySettings.compartirProgreso}
                        onChange={() => handlePrivacyChange("compartirProgreso")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Datos para análisis</h4>
                      <p>Permite que usemos tus datos para mejorar la aplicación</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacySettings.datosAnalisis}
                        onChange={() => handlePrivacyChange("datosAnalisis")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="security-section">
                    <h4>Seguridad de la cuenta</h4>
                    <button className="security-button">Cambiar contraseña</button>
                    <button className="security-button">Activar autenticación de dos factores</button>
                    <button className="security-button danger">Cerrar sesión en todos los dispositivos</button>
                  </div>
                  <div className="form-actions">
                    <button className="save-button" onClick={handleSaveChanges}>
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferencias" && (
              <div className="profile-section">
                <h3 className="profile-section-title">Preferencias</h3>
                <div className="settings-list">
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Tema</h4>
                      <p>Elige el tema de la aplicación</p>
                    </div>
                    <div className="theme-selector">
                      <button className="theme-option active">Claro</button>
                      <button className="theme-option">Oscuro</button>
                      <button className="theme-option">Sistema</button>
                    </div>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Idioma</h4>
                      <p>Selecciona el idioma de la aplicación</p>
                    </div>
                    <select className="language-select">
                      <option value="es">Español</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button className="save-button" onClick={handleSaveChanges}>
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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

        <div className="nav-item active" onClick={() => navigate("/perfil")}>
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
          <div className="nav-indicator"></div>
        </div>
      </nav>
    </div>
  )
}
