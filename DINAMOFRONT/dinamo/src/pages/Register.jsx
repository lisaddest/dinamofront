"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"
import logo from "../assets/gif.gif"

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    terminos: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value

    setFormData({
      ...formData,
      [name]: newValue,
    })

    // Validar en tiempo real
    validateField(name, newValue)

    // Calcular fuerza de la contraseña si es el campo password
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  // Calcular la fuerza de la contraseña
  const calculatePasswordStrength = (password) => {
    let strength = 0

    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }

  // Validar un campo específico
  const validateField = (name, value) => {
    const newErrors = { ...errors }

    switch (name) {
      case "nombre":
        if (!value.trim()) {
          newErrors.nombre = "El nombre es obligatorio"
        } else {
          delete newErrors.nombre
        }
        break

      case "email":
        if (!value) {
          newErrors.email = "El correo electrónico es obligatorio"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "El correo electrónico no es válido"
        } else {
          delete newErrors.email
        }
        break

      case "password":
        if (!value) {
          newErrors.password = "La contraseña es obligatoria"
        } else if (value.length < 8) {
          newErrors.password = "La contraseña debe tener al menos 8 caracteres"
        } else {
          delete newErrors.password
        }
        break

      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Las contraseñas no coinciden"
        } else {
          delete newErrors.confirmPassword
        }
        break

      case "terminos":
        if (!value) {
          newErrors.terminos = "Debes aceptar los términos y condiciones"
        } else {
          delete newErrors.terminos
        }
        break

      default:
        break
    }

    setErrors(newErrors)
  }

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    if (!formData.terminos) {
      newErrors.terminos = "Debes aceptar los términos y condiciones"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setLoading(true)

      // Simulación de registro
      setTimeout(() => {
        setLoading(false)
        // Redirigir al dashboard después del registro exitoso
        navigate("/test-nivel")
      }, 1500)
    }
  }

  // Ir a la página de inicio de sesión
  const goToLogin = () => {
    navigate("/login")
  }

  return (
    <div className="register-container">
      {/* Burbujas animadas de fondo */}
      <div className="bubbles-container">
        {[...Array(10)].map((_, i) => (
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
      </div>

      <div className="register-card">
        <div className="register-header">
          <div className="logo-container">
            <img src={logo || "/placeholder.svg"} alt="DINAMO Logo" className="logo-img" />
          </div>
          <h1 className="register-title">Crear Cuenta</h1>
          <p className="register-subtitle">Únete a DINAMO y comienza tu viaje financiero</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <div className="input-wrapper">
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
                className="input-icon"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre completo"
                className={errors.nombre ? "error" : ""}
              />
            </div>
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
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
                className="input-icon"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                className={errors.email ? "error" : ""}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
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
                className="input-icon"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una contraseña segura"
                className={errors.password ? "error" : ""}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}

            {formData.password && (
              <div className="password-strength">
                <div className="strength-meter">
                  <div
                    className={`strength-bar strength-${passwordStrength}`}
                    style={{ width: `${passwordStrength * 25}%` }}
                  ></div>
                </div>
                <span className="strength-text">
                  {passwordStrength === 0 && "Muy débil"}
                  {passwordStrength === 1 && "Débil"}
                  {passwordStrength === 2 && "Media"}
                  {passwordStrength === 3 && "Fuerte"}
                  {passwordStrength === 4 && "Muy fuerte"}
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <div className="input-wrapper">
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
                className="input-icon"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirma tu contraseña"
                className={errors.confirmPassword ? "error" : ""}
              />
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="terminos" checked={formData.terminos} onChange={handleChange} />
              <span className="checkbox-text">
                Acepto los{" "}
                <a href="#" className="terms-link">
                  Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="terms-link">
                  Política de Privacidad
                </a>
              </span>
            </label>
            {errors.terminos && <span className="error-message">{errors.terminos}</span>}
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? (
              <div className="button-loader"></div>
            ) : (
              <>
                Crear cuenta
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
                  className="button-icon"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="social-register">
          <p className="social-text">O regístrate con</p>
          <div className="social-buttons">
            <button className="social-button google">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button className="social-button facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="#1877F2"
                />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <div className="login-link">
          ¿Ya tienes una cuenta?{" "}
          <button onClick={goToLogin} className="link-button">
            Iniciar sesión
          </button>
        </div>
      </div>

      <div className="back-to-home">
        <button onClick={() => navigate("/")} className="back-button">
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
