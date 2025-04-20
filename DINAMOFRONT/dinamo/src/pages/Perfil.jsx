"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/Dashboard.css"
import "./Perfil.css"

export default function Perfil() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("perfil")
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  // Datos de usuario de ejemplo
  const [userData, setUserData] = useState({
    nombre: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    nivel: "Principiante",
    telefono: "",
    fechaNacimiento: "",
    ocupacion: "",
    intereses: ["Ahorro", "Inversiones"],
    progreso: 35,
    actividades: 8,
    diasConsecutivos: 5,
    avatarUrl: null,
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

  // Añadir estos nuevos estados después de los estados existentes
  const [theme, setTheme] = useState("claro")
  const [language, setLanguage] = useState("es")
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Efecto para simular la carga de datos
  useEffect(() => {
    // Simular carga de datos del usuario
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])

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

  // Manejar cambios en el formulario de contraseña
  const handlePasswordChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    })
  }

  // Función para cambiar la foto de perfil
  const handleChangeAvatar = () => {
    // Simular la selección de un archivo
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        // Simular carga de imagen
        setIsLoading(true)
        setTimeout(() => {
          // En una implementación real, aquí se subiría la imagen a un servidor
          // y se obtendría la URL
          const reader = new FileReader()
          reader.onload = (event) => {
            setUserData({
              ...userData,
              avatarUrl: event.target.result,
            })
            setIsLoading(false)
            showToastMessage("Imagen de perfil actualizada correctamente")
          }
          reader.readAsDataURL(file)
        }, 1000)
      }
    }
    input.click()
  }

  // Función para cambiar el tema
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
    // En una implementación real, aquí se aplicaría el tema a toda la aplicación
    document.documentElement.setAttribute("data-theme", selectedTheme)
    showToastMessage(`Tema cambiado a: ${selectedTheme}`)
  }

  // Función para cambiar el idioma
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
    // En una implementación real, aquí se cambiaría el idioma de la aplicación
    showToastMessage(`Idioma cambiado a: ${e.target.options[e.target.selectedIndex].text}`)
  }

  // Función para cambiar la contraseña
  const handleChangePassword = () => {
    setShowPasswordModal(true)
  }

  // Función para enviar el formulario de cambio de contraseña
  const handleSubmitPasswordChange = (e) => {
    e.preventDefault()

    // Validación básica
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showToastMessage("Por favor, completa todos los campos")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToastMessage("Las contraseñas nuevas no coinciden")
      return
    }

    // Simular cambio de contraseña
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowPasswordModal(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      showToastMessage("Contraseña actualizada correctamente")
    }, 1000)
  }

  // Función para activar la autenticación de dos factores
  const handleTwoFactorAuth = () => {
    setShowTwoFactorModal(true)
  }

  // Función para cerrar sesión en todos los dispositivos
  const handleLogoutAllDevices = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión en todos los dispositivos?")) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        showToastMessage("Se ha cerrado sesión en todos los dispositivos")
      }, 1000)
    }
  }

  // Función para mostrar mensajes toast
  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // Guardar cambios
  const handleSaveChanges = () => {
    // Simular guardado
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      showToastMessage("Cambios guardados correctamente")
    }, 1000)
  }

  return (
    <div className="dashboard-container">
      {/* Overlay de carga */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      )}

      {/* Toast de notificación */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
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
              className="toast-icon"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Modal de cambio de contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cambiar Contraseña</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
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
            <form onSubmit={handleSubmitPasswordChange} className="password-form">
              <div className="form-group">
                <label htmlFor="current-password">Contraseña actual</label>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    id="current-password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                    required
                  />
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
                    className="password-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="new-password">Nueva contraseña</label>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    id="new-password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    required
                  />
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
                    className="password-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirmar nueva contraseña</label>
                <div className="password-input-wrapper">
                  <input
                    type="password"
                    id="confirm-password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    required
                  />
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
                    className="password-icon"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <div className="password-strength">
                <div className="strength-label">Seguridad de la contraseña:</div>
                <div className="strength-meter">
                  <div
                    className="strength-bar"
                    style={{
                      width: passwordData.newPassword.length > 8 ? "100%" : `${passwordData.newPassword.length * 10}%`,
                    }}
                  ></div>
                </div>
                <div className="strength-text">
                  {passwordData.newPassword.length === 0 && "Ingresa una contraseña"}
                  {passwordData.newPassword.length > 0 && passwordData.newPassword.length < 6 && "Débil"}
                  {passwordData.newPassword.length >= 6 && passwordData.newPassword.length < 10 && "Media"}
                  {passwordData.newPassword.length >= 10 && "Fuerte"}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowPasswordModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de autenticación de dos factores */}
      {showTwoFactorModal && (
        <div className="modal-overlay" onClick={() => setShowTwoFactorModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Autenticación de Dos Factores</h3>
              <button className="modal-close" onClick={() => setShowTwoFactorModal(false)}>
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
            <div className="two-factor-content">
              <div className="qr-code-container">
                <div className="qr-code-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="150"
                    height="150"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <rect x="7" y="7" width="3" height="3"></rect>
                    <rect x="14" y="7" width="3" height="3"></rect>
                    <rect x="7" y="14" width="3" height="3"></rect>
                    <rect x="14" y="14" width="3" height="3"></rect>
                  </svg>
                </div>
                <p className="qr-code-text">Escanea este código QR con tu aplicación de autenticación</p>
              </div>
              <div className="verification-code">
                <p>O ingresa este código en tu aplicación:</p>
                <div className="code-display">DINM-ABCD-1234-5678</div>
              </div>
              <div className="two-factor-steps">
                <h4>Pasos para activar:</h4>
                <ol>
                  <li>Descarga una aplicación de autenticación como Google Authenticator o Authy</li>
                  <li>Escanea el código QR o ingresa el código manualmente</li>
                  <li>Ingresa el código de verificación generado por la aplicación</li>
                </ol>
              </div>
              <div className="verification-input">
                <label htmlFor="verification-code">Código de verificación:</label>
                <input type="text" id="verification-code" placeholder="Ingresa el código de 6 dígitos" />
              </div>
              <div className="modal-actions">
                <button className="cancel-button" onClick={() => setShowTwoFactorModal(false)}>
                  Cancelar
                </button>
                <button
                  className="save-button"
                  onClick={() => {
                    setShowTwoFactorModal(false)
                    showToastMessage("Autenticación de dos factores activada correctamente")
                  }}
                >
                  Verificar y Activar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <div className="profile-avatar" onClick={handleChangeAvatar}>
                {userData.avatarUrl ? (
                  <img src={userData.avatarUrl || "/placeholder.svg"} alt="Avatar" className="avatar-image" />
                ) : (
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
                )}
                <div className="avatar-overlay">
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
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              </div>
              <button className="change-avatar-btn" onClick={handleChangeAvatar}>
                Cambiar foto
              </button>
            </div>

            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-value">{userData.progreso}%</div>
                <div className="stat-label">Progreso</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userData.actividades}</div>
                <div className="stat-label">Actividades</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{userData.diasConsecutivos}</div>
                <div className="stat-label">Días</div>
              </div>
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
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h-.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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
                    <button className="security-button" onClick={handleChangePassword}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="button-icon"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Cambiar contraseña
                    </button>
                    <button className="security-button" onClick={handleTwoFactorAuth}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="button-icon"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      Activar autenticación de dos factores
                    </button>
                    <button className="security-button danger" onClick={handleLogoutAllDevices}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="button-icon"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Cerrar sesión en todos los dispositivos
                    </button>
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
                      <button
                        className={`theme-option ${theme === "claro" ? "active" : ""}`}
                        onClick={() => handleThemeChange("claro")}
                      >
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
                          className="theme-icon"
                        >
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        Claro
                      </button>
                      <button
                        className={`theme-option ${theme === "oscuro" ? "active" : ""}`}
                        onClick={() => handleThemeChange("oscuro")}
                      >
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
                          className="theme-icon"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        Oscuro
                      </button>
                      <button
                        className={`theme-option ${theme === "sistema" ? "active" : ""}`}
                        onClick={() => handleThemeChange("sistema")}
                      >
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
                          className="theme-icon"
                        >
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        Sistema
                      </button>
                    </div>
                  </div>
                  <div className="settings-item">
                    <div className="settings-item-info">
                      <h4>Idioma</h4>
                      <p>Selecciona el idioma de la aplicación</p>
                    </div>
                    <select className="language-select" value={language} onChange={handleLanguageChange}>
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="pt">Português</option>
                      <option value="fr">Français</option>
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
