"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import "./ChatButton.css"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Lista de rutas donde el botón no debe aparecer
  const hiddenRoutes = ["/", "/login", "/register", "/test-nivel", "/resultado-nivel"]
  // También ocultar en rutas que contengan /actividad/
  const isActivityPage = location.pathname.includes("/actividad/")

  // Si estamos en una ruta donde el botón debe ocultarse, no renderizar nada
  if (hiddenRoutes.includes(location.pathname) || isActivityPage) {
    return null
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const closeChat = () => {
    setIsOpen(false)
  }

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Asistente DINAMO</h3>
            <button className="close-chat" onClick={closeChat}>
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
          <div className="chat-messages">
            <div className="message assistant">
              <div className="message-content">
                <p>¡Hola! Soy tu asistente financiero. ¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Escribe tu pregunta aquí..." />
            <button className="send-button">
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
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
      <button className="chat-button" onClick={toggleChat}>
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
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  )
}
