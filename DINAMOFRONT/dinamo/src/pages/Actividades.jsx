"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import "./Actividades.css"

// Importamos el logo
import logo from "../assets/logo.jpeg"

function Actividades() {
  const { id } = useParams()
  const navigate = useNavigate()
  const activityId = Number.parseInt(id) - 1

  // Estados para las diferentes actividades
  const [answer, setAnswer] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [filledAnswers, setFilledAnswers] = useState(["", ""])
  const [selectedChoice, setSelectedChoice] = useState("")
  const [dragItems, setDragItems] = useState([])
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [quizAnswers, setQuizAnswers] = useState({})
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [gameState, setGameState] = useState({
    cards: [],
    flippedIndexes: [],
    matchedPairs: [],
    moves: 0,
  })
  const [memoryCompleted, setMemoryCompleted] = useState(false)

  // Lista ampliada de actividades
  const activities = [
    // Nivel 1: Introducción al ahorro (Quiz interactivo)
    {
      title: "Introducción al ahorro",
      difficulty: 1,
      description: "Aprende los conceptos básicos del ahorro y su importancia en tus finanzas personales.",
      type: "quiz",
      questions: [
        {
          question: "¿Qué es el ahorro?",
          options: [
            "Gastar todo el dinero que ganas",
            "Reservar una parte de tus ingresos para el futuro",
            "Invertir en la bolsa de valores",
            "Pedir préstamos a familiares",
          ],
          correctAnswer: "Reservar una parte de tus ingresos para el futuro",
        },
        {
          question: "¿Por qué es importante ahorrar?",
          options: [
            "Solo es importante si ganas mucho dinero",
            "Para estar preparado ante emergencias y cumplir metas financieras",
            "Para impresionar a tus amigos",
            "No es realmente importante en la actualidad",
          ],
          correctAnswer: "Para estar preparado ante emergencias y cumplir metas financieras",
        },
        {
          question: "¿Cuál es un buen hábito de ahorro?",
          options: [
            "Ahorrar solo cuando te sobra dinero",
            "Ahorrar un porcentaje fijo de tus ingresos cada mes",
            "Ahorrar solo para compras grandes",
            "Ahorrar únicamente en efectivo",
          ],
          correctAnswer: "Ahorrar un porcentaje fijo de tus ingresos cada mes",
        },
      ],
    },
    // Nivel 2: Crear un presupuesto (Drag and Drop)
    {
      title: "Crear un presupuesto",
      difficulty: 2,
      description: "Aprende a organizar tus finanzas creando un presupuesto efectivo.",
      type: "drag-and-drop",
      question: "Arrastra cada categoría a la sección correcta de un presupuesto:",
      items: [
        { id: 1, text: "Salario", category: "Ingresos" },
        { id: 2, text: "Alquiler", category: "Gastos fijos" },
        { id: 3, text: "Comida", category: "Gastos variables" },
        { id: 4, text: "Fondo de emergencia", category: "Ahorro" },
        { id: 5, text: "Préstamo estudiantil", category: "Deudas" },
        { id: 6, text: "Freelance", category: "Ingresos" },
        { id: 7, text: "Electricidad", category: "Gastos fijos" },
        { id: 8, text: "Restaurantes", category: "Gastos variables" },
      ],
      categories: ["Ingresos", "Gastos fijos", "Gastos variables", "Ahorro", "Deudas"],
      hint: "Los ingresos son el dinero que recibes, los gastos fijos son los que pagas regularmente por la misma cantidad, los gastos variables cambian cada mes, el ahorro es lo que guardas y las deudas son lo que debes pagar a otros.",
    },
    // Nivel 3: Control de ingresos y gastos (Juego de memoria)
    {
      title: "Control de ingresos y gastos",
      difficulty: 3,
      description: "Aprende a identificar y controlar tus ingresos y gastos con este juego de memoria.",
      type: "memory-game",
      pairs: [
        { id: 1, content: "Salario", category: "Ingreso", emoji: "💰" },
        { id: 2, content: "Alquiler", category: "Gasto", emoji: "🏠" },
        { id: 3, content: "Inversiones", category: "Ingreso", emoji: "📈" },
        { id: 4, content: "Supermercado", category: "Gasto", emoji: "🛒" },
        { id: 5, content: "Freelance", category: "Ingreso", emoji: "💻" },
        { id: 6, content: "Transporte", category: "Gasto", emoji: "🚌" },
      ],
    },
    // Nivel 4: Fondo de emergencia (Simulador interactivo)
    {
      title: "Fondo de emergencia",
      difficulty: 4,
      description: "Aprende a calcular y construir tu fondo de emergencia ideal.",
      type: "simulator",
      question: "Calcula tu fondo de emergencia ideal:",
      fields: [
        { id: "monthlyExpenses", label: "Gastos mensuales", type: "number", placeholder: "Ej: 1000" },
        {
          id: "months",
          label: "Meses de cobertura (recomendado: 3-6)",
          type: "range",
          min: 1,
          max: 12,
          defaultValue: 3,
        },
      ],
      calculate: (values) => {
        const emergencyFund = values.monthlyExpenses * values.months
        return {
          result: emergencyFund,
          message: `Tu fondo de emergencia ideal es de $${emergencyFund}`,
          recommendation:
            values.months < 3
              ? "Se recomienda tener al menos 3 meses de gastos guardados."
              : values.months > 6
                ? "¡Excelente! Estás muy bien preparado para emergencias."
                : "¡Perfecto! Tienes un fondo de emergencia adecuado.",
        }
      },
    },
    // Nivel 5: Crédito y deudas (Verdadero o Falso)
    {
      title: "Crédito y deudas",
      difficulty: 5,
      description: "Aprende a manejar tus deudas de manera responsable y a entender cómo funciona el crédito.",
      type: "true-false",
      questions: [
        {
          statement: "Pagar solo el mínimo de la tarjeta de crédito es una buena estrategia financiera.",
          isTrue: false,
          explanation:
            "Pagar solo el mínimo hace que acumules intereses y la deuda crezca. Lo ideal es pagar el total cada mes.",
        },
        {
          statement:
            "Tener un buen historial crediticio puede ayudarte a conseguir mejores tasas de interés en préstamos.",
          isTrue: true,
          explanation:
            "Un buen historial crediticio demuestra que eres responsable con tus deudas y te permite acceder a mejores condiciones.",
        },
        {
          statement: "Es recomendable utilizar más del 30% del límite de tu tarjeta de crédito.",
          isTrue: false,
          explanation:
            "Utilizar más del 30% de tu límite puede afectar negativamente tu puntaje crediticio. Lo ideal es mantenerlo por debajo.",
        },
        {
          statement: "Todas las deudas son malas y deberían evitarse siempre.",
          isTrue: false,
          explanation:
            "Existen deudas 'buenas' como hipotecas o préstamos educativos que pueden ser inversiones a futuro si se manejan responsablemente.",
        },
      ],
    },
    // Nivel 6: Inversiones básicas (Juego de riesgo y recompensa)
    {
      title: "Inversiones básicas",
      difficulty: 6,
      description: "Aprende sobre diferentes tipos de inversiones y sus características de riesgo y rendimiento.",
      type: "investment-game",
      introduction:
        "Tienes $10,000 para invertir. Distribuye tu dinero entre diferentes opciones de inversión y ve cómo te va después de 5 años.",
      options: [
        {
          name: "Cuenta de ahorros",
          risk: "Muy bajo",
          returnRange: [1, 2],
          description: "Seguro pero con rendimientos muy bajos.",
        },
        {
          name: "Bonos gubernamentales",
          risk: "Bajo",
          returnRange: [2, 4],
          description: "Bastante seguros con rendimientos moderados.",
        },
        {
          name: "Fondos indexados",
          risk: "Medio",
          returnRange: [5, 8],
          description: "Riesgo moderado con buenos rendimientos a largo plazo.",
        },
        {
          name: "Acciones individuales",
          risk: "Alto",
          returnRange: [-10, 15],
          description: "Mayor riesgo pero potencial de altos rendimientos.",
        },
        {
          name: "Criptomonedas",
          risk: "Muy alto",
          returnRange: [-50, 100],
          description: "Extremadamente volátil, puedes ganar mucho o perderlo todo.",
        },
      ],
    },
    // Nivel 7: Planificación financiera (Línea de tiempo interactiva)
    {
      title: "Planificación financiera",
      difficulty: 7,
      description: "Aprende a establecer metas financieras a corto, mediano y largo plazo.",
      type: "timeline",
      introduction: "Organiza estas metas financieras en la línea de tiempo correcta:",
      goals: [
        { id: 1, text: "Crear un fondo de emergencia", timeframe: "Corto plazo" },
        { id: 2, text: "Comprar una casa", timeframe: "Largo plazo" },
        { id: 3, text: "Ahorrar para unas vacaciones", timeframe: "Corto plazo" },
        { id: 4, text: "Invertir para la jubilación", timeframe: "Largo plazo" },
        { id: 5, text: "Comprar un auto", timeframe: "Mediano plazo" },
        { id: 6, text: "Pagar deudas de tarjetas de crédito", timeframe: "Corto plazo" },
        { id: 7, text: "Financiar la educación universitaria", timeframe: "Mediano plazo" },
        { id: 8, text: "Iniciar un negocio", timeframe: "Mediano plazo" },
      ],
      timeframes: ["Corto plazo (0-1 año)", "Mediano plazo (1-5 años)", "Largo plazo (5+ años)"],
    },
    // Nivel 8: Protección financiera (Escenarios interactivos)
    {
      title: "Protección financiera",
      difficulty: 8,
      description: "Aprende sobre seguros y cómo proteger tu patrimonio ante diferentes situaciones.",
      type: "scenarios",
      introduction: "Elige la mejor opción para cada escenario:",
      scenarios: [
        {
          situation: "Tu auto se averió y necesita una reparación costosa.",
          options: [
            "Usar tu tarjeta de crédito y pagar el mínimo mensual",
            "Usar tu fondo de emergencia",
            "Pedir un préstamo personal",
            "Ignorar el problema hasta que tengas dinero",
          ],
          correctOption: "Usar tu fondo de emergencia",
          explanation: "Para esto sirve el fondo de emergencia, para cubrir gastos inesperados sin endeudarte.",
        },
        {
          situation: "Acabas de comprar una casa nueva.",
          options: [
            "No necesitas ningún seguro adicional",
            "Contratar solo un seguro contra incendios",
            "Contratar un seguro de hogar completo",
            "Esperar a que ocurra algún problema para contratar un seguro",
          ],
          correctOption: "Contratar un seguro de hogar completo",
          explanation:
            "Un seguro de hogar completo te protege contra múltiples riesgos como daños estructurales, robos, responsabilidad civil, etc.",
        },
        {
          situation: "Tienes una familia que depende de tus ingresos.",
          options: [
            "No necesitas ninguna protección adicional",
            "Contratar un seguro de vida",
            "Solo ahorrar más dinero",
            "Invertir todo en la bolsa para maximizar ganancias",
          ],
          correctOption: "Contratar un seguro de vida",
          explanation: "Un seguro de vida garantiza que tu familia esté protegida financieramente si algo te sucede.",
        },
      ],
    },
    // Nivel 9: Impuestos (Juego de clasificación)
    {
      title: "Impuestos básicos",
      difficulty: 9,
      description: "Aprende sobre los diferentes tipos de impuestos y cómo afectan tus finanzas.",
      type: "sorting-game",
      question: "Clasifica estos conceptos en la categoría correcta:",
      items: [
        { id: 1, text: "Impuesto sobre la renta", category: "Impuestos directos" },
        { id: 2, text: "IVA", category: "Impuestos indirectos" },
        { id: 3, text: "Impuesto predial", category: "Impuestos directos" },
        { id: 4, text: "Impuesto a las bebidas alcohólicas", category: "Impuestos indirectos" },
        { id: 5, text: "Impuesto sobre vehículos", category: "Impuestos directos" },
        { id: 6, text: "Impuesto al hospedaje", category: "Impuestos indirectos" },
        { id: 7, text: "Deducción por gastos médicos", category: "Deducciones fiscales" },
        { id: 8, text: "Deducción por donativos", category: "Deducciones fiscales" },
        { id: 9, text: "Deducción por intereses hipotecarios", category: "Deducciones fiscales" },
      ],
      categories: ["Impuestos directos", "Impuestos indirectos", "Deducciones fiscales"],
      hint: "Los impuestos directos se aplican directamente sobre la renta o patrimonio. Los impuestos indirectos se aplican al consumo. Las deducciones fiscales reducen la base gravable.",
    },
    // Nivel 10: Jubilación (Calculadora interactiva)
    {
      title: "Planificación para la jubilación",
      difficulty: 10,
      description: "Aprende a planificar financieramente para tu jubilación.",
      type: "retirement-calculator",
      introduction: "Calcula cuánto necesitas ahorrar para tu jubilación:",
      fields: [
        { id: "currentAge", label: "Edad actual", type: "number", placeholder: "Ej: 30" },
        { id: "retirementAge", label: "Edad de jubilación", type: "number", placeholder: "Ej: 65" },
        {
          id: "monthlyExpenses",
          label: "Gastos mensuales estimados en jubilación",
          type: "number",
          placeholder: "Ej: 2000",
        },
        { id: "currentSavings", label: "Ahorros actuales para jubilación", type: "number", placeholder: "Ej: 10000" },
        { id: "monthlySavings", label: "Ahorro mensual actual", type: "number", placeholder: "Ej: 200" },
        {
          id: "returnRate",
          label: "Tasa de rendimiento anual estimada (%)",
          type: "range",
          min: 1,
          max: 12,
          defaultValue: 5,
        },
      ],
      calculate: (values) => {
        const yearsToRetirement = values.retirementAge - values.currentAge
        const monthsToRetirement = yearsToRetirement * 12
        const monthlyReturn = values.returnRate / 100 / 12

        // Cálculo simplificado del monto necesario para jubilación
        const yearsInRetirement = 20 // Asumimos 20 años de jubilación
        const totalNeeded = values.monthlyExpenses * 12 * yearsInRetirement

        // Cálculo de cuánto tendrás al jubilarte con tus ahorros actuales
        const futureValueOfCurrentSavings = values.currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement)

        // Cálculo de cuánto tendrás al jubilarte con tus ahorros mensuales
        const futureValueOfMonthlySavings =
          values.monthlySavings * ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn)

        // Total al jubilarte
        const totalAtRetirement = futureValueOfCurrentSavings + futureValueOfMonthlySavings

        // ¿Es suficiente?
        const isEnough = totalAtRetirement >= totalNeeded

        return {
          yearsToRetirement,
          totalNeeded,
          totalAtRetirement,
          isEnough,
          shortfall: isEnough ? 0 : totalNeeded - totalAtRetirement,
          additionalMonthlySavingsNeeded: isEnough
            ? 0
            : ((totalNeeded - totalAtRetirement) * monthlyReturn) /
              (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1),
        }
      },
    },
  ]

  // Asegurarse de que el ID de actividad es válido
  const activity = activities[activityId] || activities[0]

  // Inicializar el juego de memoria
  useEffect(() => {
    if (activity.type === "memory-game") {
      // Crear pares de cartas
      const pairs = activity.pairs
      const cards = []

      // Crear cartas para cada par (concepto y categoría)
      pairs.forEach((pair) => {
        cards.push({
          id: `${pair.id}-a`,
          content: pair.content,
          pairId: pair.id,
          matched: false,
          flipped: false,
        })
        cards.push({
          id: `${pair.id}-b`,
          content: `${pair.category} ${pair.emoji}`,
          pairId: pair.id,
          matched: false,
          flipped: false,
        })
      })

      // Mezclar las cartas
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5)

      setGameState({
        ...gameState,
        cards: shuffledCards,
      })
    }
  }, [activity.type])

  // Manejar el volteo de cartas en el juego de memoria
  const handleCardFlip = (index) => {
    // Si ya hay dos cartas volteadas o esta carta ya está volteada o emparejada, no hacer nada
    if (gameState.flippedIndexes.length === 2 || gameState.cards[index].flipped || gameState.cards[index].matched) {
      return
    }

    // Voltear la carta
    const newCards = [...gameState.cards]
    newCards[index].flipped = true

    // Actualizar el estado con la nueva carta volteada
    const newFlippedIndexes = [...gameState.flippedIndexes, index]

    setGameState({
      ...gameState,
      cards: newCards,
      flippedIndexes: newFlippedIndexes,
    })

    // Si hay dos cartas volteadas, verificar si son un par
    if (newFlippedIndexes.length === 2) {
      const firstIndex = newFlippedIndexes[0]
      const secondIndex = newFlippedIndexes[1]

      if (newCards[firstIndex].pairId === newCards[secondIndex].pairId) {
        // Es un par
        newCards[firstIndex].matched = true
        newCards[secondIndex].matched = true

        // Verificar si todas las cartas están emparejadas
        const allMatched = newCards.every((card) => card.matched)

        setTimeout(() => {
          setGameState({
            cards: newCards,
            flippedIndexes: [],
            matchedPairs: [...gameState.matchedPairs, newCards[firstIndex].pairId],
            moves: gameState.moves + 1,
          })

          if (allMatched) {
            setMemoryCompleted(true)
            triggerConfetti()
          }
        }, 1000)
      } else {
        // No es un par, voltear las cartas de nuevo
        setTimeout(() => {
          newCards[firstIndex].flipped = false
          newCards[secondIndex].flipped = false

          setGameState({
            ...gameState,
            cards: newCards,
            flippedIndexes: [],
            moves: gameState.moves + 1,
          })
        }, 1000)
      }
    }
  }

  // Manejar el envío de respuestas
  const handleSubmit = (e) => {
    e.preventDefault()
    setAttempts(attempts + 1)

    switch (activity.type) {
      case "quiz":
        // Verificar si todas las respuestas son correctas
        const allCorrect = activity.questions.every((q, index) => quizAnswers[index] === q.correctAnswer)

        if (allCorrect) {
          setIsCompleted(true)
          setFeedback("¡Excelente! Has respondido correctamente todas las preguntas.")
          triggerConfetti()
        } else {
          setFeedback("Algunas respuestas no son correctas. Revisa y vuelve a intentar.")
        }
        break

      case "true-false":
        // Verificar si todas las respuestas son correctas
        const allTrueFalseCorrect =
          Object.keys(quizAnswers).length === activity.questions.length &&
          Object.entries(quizAnswers).every(([index, answer]) => answer === activity.questions[index].isTrue)

        if (allTrueFalseCorrect) {
          setIsCompleted(true)
          setFeedback("¡Excelente! Has respondido correctamente todas las afirmaciones.")
          triggerConfetti()
        } else {
          setFeedback("Algunas respuestas no son correctas. Revisa y vuelve a intentar.")
        }
        break

      case "scenarios":
        // Verificar si todas las respuestas son correctas
        const allScenariosCorrect =
          Object.keys(quizAnswers).length === activity.scenarios.length &&
          Object.entries(quizAnswers).every(([index, answer]) => answer === activity.scenarios[index].correctOption)

        if (allScenariosCorrect) {
          setIsCompleted(true)
          setFeedback("¡Excelente! Has elegido las mejores opciones para cada escenario.")
          triggerConfetti()
        } else {
          setFeedback("Algunas respuestas no son correctas. Revisa y vuelve a intentar.")
        }
        break

      default:
        // Para otros tipos de actividades
        setIsCompleted(true)
        setFeedback("¡Actividad completada con éxito!")
        triggerConfetti()
        break
    }
  }

  // Función para lanzar confeti cuando se completa una actividad
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // Renderizar la actividad según su tipo
  const renderActivity = () => {
    switch (activity.type) {
      case "quiz":
        return (
          <div className="quiz-container">
            {activity.questions.map((q, index) => (
              <motion.div
                key={index}
                className="quiz-question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h3>
                  {index + 1}. {q.question}
                </h3>
                <div className="quiz-options">
                  {q.options.map((option, optIndex) => (
                    <label key={optIndex} className="quiz-option">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={quizAnswers[index] === option}
                        onChange={() => {
                          setQuizAnswers({
                            ...quizAnswers,
                            [index]: option,
                          })
                        }}
                      />
                      <span className="radio-custom"></span>
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )

      case "drag-and-drop":
        return (
          <div className="drag-drop-container">
            <div className="drag-items">
              <h3>Elementos:</h3>
              <div className="drag-items-list">
                {activity.items.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`drag-item ${selectedOptions[item.id] ? "selected" : ""}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      // Si ya está seleccionado, deseleccionar
                      if (selectedOptions[item.id]) {
                        const newSelected = { ...selectedOptions }
                        delete newSelected[item.id]
                        setSelectedOptions(newSelected)
                      } else {
                        // Seleccionar este item para arrastrarlo
                        setSelectedOptions({
                          ...selectedOptions,
                          [item.id]: null, // Aún no tiene categoría asignada
                        })
                      }
                    }}
                  >
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="drop-categories">
              {activity.categories.map((category) => (
                <div key={category} className="drop-category">
                  <h3>{category}</h3>
                  <div
                    className="drop-zone"
                    onClick={() => {
                      // Encontrar el ID del item seleccionado (si hay alguno)
                      const selectedItemId = Object.keys(selectedOptions).find((id) => selectedOptions[id] === null)

                      if (selectedItemId) {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedItemId]: category,
                        })
                      }
                    }}
                  >
                    {/* Mostrar items asignados a esta categoría */}
                    {Object.entries(selectedOptions)
                      .filter(([id, cat]) => cat === category)
                      .map(([id]) => {
                        const item = activity.items.find((i) => i.id === Number.parseInt(id))
                        return (
                          <motion.div
                            key={id}
                            className="dropped-item"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            {item.text}
                            <button
                              className="remove-item"
                              onClick={(e) => {
                                e.stopPropagation()
                                const newSelected = { ...selectedOptions }
                                delete newSelected[id]
                                setSelectedOptions(newSelected)
                              }}
                            >
                              ×
                            </button>
                          </motion.div>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>

            {showHint && (
              <div className="hint-box">
                <p>{activity.hint}</p>
              </div>
            )}

            <div className="drag-drop-controls">
              <button className="hint-button" onClick={() => setShowHint(!showHint)}>
                {showHint ? "Ocultar pista" : "Mostrar pista"}
              </button>

              <button
                className="check-button"
                onClick={() => {
                  // Verificar si todas las categorías están correctas
                  const allCorrect = Object.entries(selectedOptions).every(([id, category]) => {
                    const item = activity.items.find((i) => i.id === Number.parseInt(id))
                    return item.category === category
                  })

                  // Verificar si todos los items están asignados
                  const allAssigned = activity.items.every((item) => selectedOptions[item.id] !== undefined)

                  if (allCorrect && allAssigned) {
                    setIsCompleted(true)
                    setFeedback("¡Excelente! Has clasificado correctamente todos los elementos.")
                    triggerConfetti()
                  } else if (!allAssigned) {
                    setFeedback("Asigna todos los elementos a una categoría.")
                  } else {
                    setFeedback("Algunas clasificaciones no son correctas. Revisa y vuelve a intentar.")
                  }
                }}
              >
                Verificar respuestas
              </button>
            </div>
          </div>
        )

      case "memory-game":
        return (
          <div className="memory-game-container">
            <div className="memory-stats">
              <div className="memory-moves">Movimientos: {gameState.moves}</div>
              <div className="memory-pairs">
                Pares encontrados: {gameState.matchedPairs.length}/{activity.pairs.length}
              </div>
            </div>

            <div className="memory-board">
              {gameState.cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className={`memory-card ${card.flipped ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
                  onClick={() => handleCardFlip(index)}
                  whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
                  whileTap={{ scale: card.flipped || card.matched ? 1 : 0.95 }}
                >
                  <div className="memory-card-inner">
                    <div className="memory-card-front">
                      <span className="card-question-mark">?</span>
                    </div>
                    <div className="memory-card-back">{card.content}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {memoryCompleted && (
              <div className="memory-completed">
                <h3>¡Juego completado!</h3>
                <p>Has encontrado todos los pares en {gameState.moves} movimientos.</p>
                <button className="next-button" onClick={() => setIsCompleted(true)}>
                  Continuar
                </button>
              </div>
            )}
          </div>
        )

      case "simulator":
        return (
          <div className="simulator-container">
            <div className="simulator-form">
              {activity.fields.map((field) => (
                <div key={field.id} className="simulator-field">
                  <label htmlFor={field.id}>{field.label}</label>
                  {field.type === "range" ? (
                    <div className="range-container">
                      <input
                        type="range"
                        id={field.id}
                        min={field.min}
                        max={field.max}
                        defaultValue={field.defaultValue}
                        onChange={(e) => {
                          setSelectedOptions({
                            ...selectedOptions,
                            [field.id]: Number.parseInt(e.target.value),
                          })
                        }}
                      />
                      <span className="range-value">{selectedOptions[field.id] || field.defaultValue}</span>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [field.id]: Number.parseFloat(e.target.value),
                        })
                      }}
                    />
                  )}
                </div>
              ))}

              <button
                className="calculate-button"
                onClick={() => {
                  // Verificar que todos los campos estén completos
                  const allFieldsFilled = activity.fields.every(
                    (field) => selectedOptions[field.id] !== undefined && !isNaN(selectedOptions[field.id]),
                  )

                  if (allFieldsFilled) {
                    const result = activity.calculate(selectedOptions)
                    setFeedback(result.message)
                    setScore(result)
                    setIsCompleted(true)
                  } else {
                    setFeedback("Por favor completa todos los campos correctamente.")
                  }
                }}
              >
                Calcular
              </button>
            </div>
          </div>
        )

      case "true-false":
        return (
          <div className="true-false-container">
            {activity.questions.map((q, index) => (
              <motion.div
                key={index}
                className="true-false-question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h3>
                  {index + 1}. {q.statement}
                </h3>
                <div className="true-false-options">
                  <label className="true-option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="true"
                      checked={quizAnswers[index] === true}
                      onChange={() => {
                        setQuizAnswers({
                          ...quizAnswers,
                          [index]: true,
                        })
                      }}
                    />
                    <span className="radio-custom"></span>
                    <span>Verdadero</span>
                  </label>
                  <label className="false-option">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value="false"
                      checked={quizAnswers[index] === false}
                      onChange={() => {
                        setQuizAnswers({
                          ...quizAnswers,
                          [index]: false,
                        })
                      }}
                    />
                    <span className="radio-custom"></span>
                    <span>Falso</span>
                  </label>
                </div>

                {isCompleted && (
                  <div className={`explanation ${q.isTrue === quizAnswers[index] ? "correct" : "incorrect"}`}>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )

      case "investment-game":
        return (
          <div className="investment-game-container">
            <p className="investment-intro">{activity.introduction}</p>

            <div className="investment-options">
              {activity.options.map((option, index) => (
                <div key={index} className="investment-option">
                  <h3>{option.name}</h3>
                  <div className="investment-details">
                    <p>
                      <strong>Riesgo:</strong> {option.risk}
                    </p>
                    <p>
                      <strong>Rendimiento potencial:</strong> {option.returnRange[0]}% a {option.returnRange[1]}%
                    </p>
                    <p>{option.description}</p>
                  </div>
                  <div className="investment-amount">
                    <label htmlFor={`amount-${index}`}>Cantidad a invertir ($):</label>
                    <input
                      type="number"
                      id={`amount-${index}`}
                      min="0"
                      max="10000"
                      placeholder="0"
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value) || 0
                        setSelectedOptions({
                          ...selectedOptions,
                          [option.name]: value,
                        })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="investment-summary">
              <h3>Resumen de inversión</h3>
              <p>
                Total invertido: ${Object.values(selectedOptions).reduce((sum, val) => sum + (val || 0), 0)} de $10,000
              </p>
              <p>Restante: ${10000 - Object.values(selectedOptions).reduce((sum, val) => sum + (val || 0), 0)}</p>
            </div>

            <button
              className="simulate-button"
              onClick={() => {
                const totalInvested = Object.values(selectedOptions).reduce((sum, val) => sum + (val || 0), 0)

                if (totalInvested !== 10000) {
                  setFeedback("Debes invertir exactamente $10,000.")
                  return
                }

                // Simular rendimientos
                let totalReturn = 0
                const details = []

                activity.options.forEach((option) => {
                  const amount = selectedOptions[option.name] || 0
                  if (amount > 0) {
                    // Generar un rendimiento aleatorio dentro del rango
                    const returnRate =
                      option.returnRange[0] + Math.random() * (option.returnRange[1] - option.returnRange[0])
                    const returnAmount = amount * (1 + returnRate / 100)
                    totalReturn += returnAmount

                    details.push({
                      name: option.name,
                      invested: amount,
                      returnRate: returnRate.toFixed(2),
                      finalAmount: returnAmount.toFixed(2),
                    })
                  }
                })

                setScore({
                  totalReturn: totalReturn.toFixed(2),
                  netGain: (totalReturn - 10000).toFixed(2),
                  percentageGain: ((totalReturn / 10000 - 1) * 100).toFixed(2),
                  details,
                })

                setIsCompleted(true)
              }}
            >
              Simular 5 años de inversión
            </button>
          </div>
        )

      case "scenarios":
        return (
          <div className="scenarios-container">
            <p className="scenarios-intro">{activity.introduction}</p>

            {activity.scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                className="scenario"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h3>
                  {index + 1}. {scenario.situation}
                </h3>
                <div className="scenario-options">
                  {scenario.options.map((option, optIndex) => (
                    <label key={optIndex} className="scenario-option">
                      <input
                        type="radio"
                        name={`scenario-${index}`}
                        value={option}
                        checked={quizAnswers[index] === option}
                        onChange={() => {
                          setQuizAnswers({
                            ...quizAnswers,
                            [index]: option,
                          })
                        }}
                      />
                      <span className="radio-custom"></span>
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>

                {isCompleted && (
                  <div
                    className={`explanation ${scenario.correctOption === quizAnswers[index] ? "correct" : "incorrect"}`}
                  >
                    <p>{scenario.explanation}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )

      case "sorting-game":
        return (
          <div className="sorting-game-container">
            <div className="sorting-items">
              <h3>Elementos:</h3>
              <div className="sorting-items-list">
                {activity.items.map((item) => (
                  <motion.div
                    key={item.id}
                    className={`sorting-item ${selectedOptions[item.id] ? "selected" : ""}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (selectedOptions[item.id]) {
                        const newSelected = { ...selectedOptions }
                        delete newSelected[item.id]
                        setSelectedOptions(newSelected)
                      } else {
                        setSelectedOptions({
                          ...selectedOptions,
                          [item.id]: null,
                        })
                      }
                    }}
                  >
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="sorting-categories">
              {activity.categories.map((category) => (
                <div key={category} className="sorting-category">
                  <h3>{category}</h3>
                  <div
                    className="sorting-zone"
                    onClick={() => {
                      const selectedItemId = Object.keys(selectedOptions).find((id) => selectedOptions[id] === null)

                      if (selectedItemId) {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedItemId]: category,
                        })
                      }
                    }}
                  >
                    {Object.entries(selectedOptions)
                      .filter(([id, cat]) => cat === category)
                      .map(([id]) => {
                        const item = activity.items.find((i) => i.id === Number.parseInt(id))
                        return (
                          <motion.div
                            key={id}
                            className="sorted-item"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            {item.text}
                            <button
                              className="remove-item"
                              onClick={(e) => {
                                e.stopPropagation()
                                const newSelected = { ...selectedOptions }
                                delete newSelected[id]
                                setSelectedOptions(newSelected)
                              }}
                            >
                              ×
                            </button>
                          </motion.div>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>

            {showHint && (
              <div className="hint-box">
                <p>{activity.hint}</p>
              </div>
            )}

            <div className="sorting-controls">
              <button className="hint-button" onClick={() => setShowHint(!showHint)}>
                {showHint ? "Ocultar pista" : "Mostrar pista"}
              </button>

              <button
                className="check-button"
                onClick={() => {
                  const allCorrect = Object.entries(selectedOptions).every(([id, category]) => {
                    const item = activity.items.find((i) => i.id === Number.parseInt(id))
                    return item.category === category
                  })

                  const allAssigned = activity.items.every((item) => selectedOptions[item.id] !== undefined)

                  if (allCorrect && allAssigned) {
                    setIsCompleted(true)
                    setFeedback("¡Excelente! Has clasificado correctamente todos los elementos.")
                    triggerConfetti()
                  } else if (!allAssigned) {
                    setFeedback("Clasifica todos los elementos.")
                  } else {
                    setFeedback("Algunas clasificaciones no son correctas. Revisa y vuelve a intentar.")
                  }
                }}
              >
                Verificar respuestas
              </button>
            </div>
          </div>
        )

      case "retirement-calculator":
        return (
          <div className="retirement-calculator-container">
            <p className="retirement-intro">{activity.introduction}</p>

            <div className="retirement-form">
              {activity.fields.map((field) => (
                <div key={field.id} className="retirement-field">
                  <label htmlFor={field.id}>{field.label}</label>
                  {field.type === "range" ? (
                    <div className="range-container">
                      <input
                        type="range"
                        id={field.id}
                        min={field.min}
                        max={field.max}
                        defaultValue={field.defaultValue}
                        onChange={(e) => {
                          setSelectedOptions({
                            ...selectedOptions,
                            [field.id]: Number.parseInt(e.target.value),
                          })
                        }}
                      />
                      <span className="range-value">{selectedOptions[field.id] || field.defaultValue}%</span>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [field.id]: Number.parseFloat(e.target.value),
                        })
                      }}
                    />
                  )}
                </div>
              ))}

              <button
                className="calculate-button"
                onClick={() => {
                  const allFieldsFilled = activity.fields.every(
                    (field) => selectedOptions[field.id] !== undefined && !isNaN(selectedOptions[field.id]),
                  )

                  if (allFieldsFilled) {
                    const result = activity.calculate(selectedOptions)
                    setScore(result)
                    setIsCompleted(true)
                  } else {
                    setFeedback("Por favor completa todos los campos correctamente.")
                  }
                }}
              >
                Calcular
              </button>
            </div>
          </div>
        )

      default:
        return (
          <div className="default-activity">
            <p>Tipo de actividad no reconocido.</p>
          </div>
        )
    }
  }

  // Renderizar los resultados de la actividad
  const renderResults = () => {
    switch (activity.type) {
      case "simulator":
        return (
          <div className="simulator-results">
            <h3>Resultados:</h3>
            <p>{score.message}</p>
            <p className="recommendation">{score.recommendation}</p>
          </div>
        )

      case "investment-game":
        return (
          <div className="investment-results">
            <h3>Resultados después de 5 años:</h3>
            <p className="total-return">Valor final: ${score.totalReturn}</p>
            <p className={`net-gain ${Number.parseFloat(score.netGain) >= 0 ? "positive" : "negative"}`}>
              {Number.parseFloat(score.netGain) >= 0 ? "Ganancia" : "Pérdida"}: ${Math.abs(score.netGain)} (
              {score.percentageGain}%)
            </p>

            <h4>Detalles por inversión:</h4>
            <div className="investment-details-table">
              <div className="table-header">
                <div>Inversión</div>
                <div>Monto inicial</div>
                <div>Rendimiento</div>
                <div>Valor final</div>
              </div>
              {score.details.map((detail, index) => (
                <div key={index} className="table-row">
                  <div>{detail.name}</div>
                  <div>${detail.invested}</div>
                  <div className={Number.parseFloat(detail.returnRate) >= 0 ? "positive" : "negative"}>
                    {detail.returnRate}%
                  </div>
                  <div>${detail.finalAmount}</div>
                </div>
              ))}
            </div>
          </div>
        )

      case "retirement-calculator":
        return (
          <div className="retirement-results">
            <h3>Resultados de tu plan de jubilación:</h3>
            <div className="retirement-summary">
              <div className="summary-item">
                <span>Años hasta la jubilación:</span>
                <span>{score.yearsToRetirement}</span>
              </div>
              <div className="summary-item">
                <span>Monto necesario para jubilación:</span>
                <span>${score.totalNeeded.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>Monto proyectado al jubilarte:</span>
                <span>${score.totalAtRetirement.toLocaleString()}</span>
              </div>
              <div className="summary-item status">
                <span>Estado:</span>
                <span className={score.isEnough ? "positive" : "negative"}>
                  {score.isEnough ? "¡Vas por buen camino!" : "Necesitas ajustar tu plan"}
                </span>
              </div>

              {!score.isEnough && (
                <>
                  <div className="summary-item">
                    <span>Déficit proyectado:</span>
                    <span className="negative">${score.shortfall.toLocaleString()}</span>
                  </div>
                  <div className="summary-item">
                    <span>Ahorro mensual adicional recomendado:</span>
                    <span>${Math.ceil(score.additionalMonthlySavingsNeeded).toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="actividad-container">
      <div className="actividad-header">
        <img src={logo || "/placeholder.svg"} alt="DINAMO Logo" className="actividad-logo" />
        <div className="actividad-info">
          <h1>{activity.title}</h1>
          <div className="difficulty-indicator">
            <span>Nivel de dificultad:</span>
            <div className="difficulty-dots">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`difficulty-dot ${i < activity.difficulty ? "active" : ""}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="actividad-description">
        <p>{activity.description}</p>
      </div>

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="activity"
            className="actividad-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderActivity()}

            {feedback && (
              <div className={`feedback ${feedback.includes("Excelente") ? "success" : "error"}`}>{feedback}</div>
            )}

            {activity.type !== "drag-and-drop" &&
              activity.type !== "memory-game" &&
              activity.type !== "simulator" &&
              activity.type !== "investment-game" &&
              activity.type !== "retirement-calculator" && (
                <button className="submit-button" onClick={handleSubmit}>
                  Verificar respuestas
                </button>
              )}
          </motion.div>
        ) : (
          <motion.div
            key="completion"
            className="completion-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="completion-icon">
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
            <h2>¡Actividad completada!</h2>
            <p>Has completado exitosamente esta actividad.</p>

            {renderResults()}

            <div className="completion-buttons">
              <button
                className="next-button"
                onClick={() => {
                  const nextActivityId = Number.parseInt(id) + 1
                  if (nextActivityId <= activities.length) {
                    navigate(`/actividad/${nextActivityId}`)
                  } else {
                    navigate("/dashboard")
                  }
                }}
              >
                {Number.parseInt(id) < activities.length ? "Siguiente actividad" : "Volver al dashboard"}
              </button>

              <button
                className="retry-button"
                onClick={() => {
                  setIsCompleted(false)
                  setAnswer("")
                  setSelectedOptions({})
                  setFilledAnswers(["", ""])
                  setSelectedChoice("")
                  setDragItems([])
                  setScore(0)
                  setShowHint(false)
                  setAttempts(0)
                  setFeedback("")
                  setQuizAnswers({})
                  setCurrentQuizQuestion(0)
                  setMemoryCompleted(false)

                  if (activity.type === "memory-game") {
                    // Reiniciar el juego de memoria
                    const pairs = activity.pairs
                    const cards = []

                    pairs.forEach((pair) => {
                      cards.push({
                        id: `${pair.id}-a`,
                        content: pair.content,
                        pairId: pair.id,
                        matched: false,
                        flipped: false,
                      })
                      cards.push({
                        id: `${pair.id}-b`,
                        content: `${pair.category} ${pair.emoji}`,
                        pairId: pair.id,
                        matched: false,
                        flipped: false,
                      })
                    })

                    const shuffledCards = [...cards].sort(() => Math.random() - 0.5)

                    setGameState({
                      cards: shuffledCards,
                      flippedIndexes: [],
                      matchedPairs: [],
                      moves: 0,
                    })
                  }
                }}
              >
                Reintentar actividad
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Actividades
