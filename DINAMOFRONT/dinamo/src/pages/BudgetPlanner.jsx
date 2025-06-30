"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../pages/Dashboard.css"
import "./BudgetPlanner.css"

export default function BudgetPlanner() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("calculadora")
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Vivienda", amount: "", description: "" },
    { id: 2, category: "Alimentación", amount: "", description: "" },
    { id: 3, category: "Transporte", amount: "", description: "" },
  ])
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [expenseHistory, setExpenseHistory] = useState([
    {
      id: 1,
      category: "Vivienda",
      amount: 500,
      description: "Alquiler",
      date: "2023-04-01",
    },
    {
      id: 2,
      category: "Alimentación",
      amount: 120,
      description: "Supermercado",
      date: "2023-04-05",
    },
    {
      id: 3,
      category: "Transporte",
      amount: 50,
      description: "Gasolina",
      date: "2023-04-10",
    },
  ])

  // Categorías de gastos
  const categories = [
    "Vivienda",
    "Alimentación",
    "Transporte",
    "Entretenimiento",
    "Salud",
    "Educación",
    "Ropa",
    "Ahorros",
    "Otros",
  ]

  // Calcular totales
  const totalExpenses = expenses.reduce((sum, expense) => sum + (Number.parseFloat(expense.amount) || 0), 0)
  const balance = Number.parseFloat(income) - totalExpenses

  // Manejar cambios en los gastos
  const handleExpenseChange = (id, field, value) => {
    setExpenses(expenses.map((expense) => (expense.id === id ? { ...expense, [field]: value } : expense)))
  }

  // Agregar nuevo gasto
  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount) {
      const expenseToAdd = {
        ...newExpense,
        id: Date.now(),
        amount: Number.parseFloat(newExpense.amount),
      }
      setExpenseHistory([...expenseHistory, expenseToAdd])
      setNewExpense({
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }

  // Eliminar gasto del historial
  const handleDeleteExpense = (id) => {
    setExpenseHistory(expenseHistory.filter((expense) => expense.id !== id))
  }

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
            <h2 className="welcome-title">Control de Gastos</h2>
            <p className="welcome-subtitle">Administra tus finanzas de manera efectiva</p>
          </div>
          <div className="welcome-mascot">
            <img src="../assets/logo.jpeg" alt="DINAMO mascota" className="welcome-mascot-img" />
          </div>
        </div>

        <div className="budget-tabs">
          <button
            className={`budget-tab ${activeTab === "calculadora" ? "active" : ""}`}
            onClick={() => setActiveTab("calculadora")}
          >
            Calculadora de Presupuesto
          </button>
          <button
            className={`budget-tab ${activeTab === "gastos" ? "active" : ""}`}
            onClick={() => setActiveTab("gastos")}
          >
            Registro de Gastos
          </button>
        </div>

        {activeTab === "calculadora" && (
          <div className="budget-calculator">
            <div className="budget-card">
              <h3 className="budget-card-title">Ingresos y Gastos Mensuales</h3>

              <div className="budget-input-group">
                <label htmlFor="income">Ingreso Mensual:</label>
                <div className="budget-input-wrapper">
                  <span className="budget-currency">$</span>
                  <input
                    type="number"
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <h4 className="budget-section-title">Gastos Mensuales</h4>

              {expenses.map((expense) => (
                <div key={expense.id} className="budget-expense-item">
                  <div className="budget-expense-category">
                    <select
                      value={expense.category}
                      onChange={(e) => handleExpenseChange(expense.id, "category", e.target.value)}
                    >
                      <option value="">{expense.category}</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="budget-input-wrapper expense-amount">
                    <span className="budget-currency">$</span>
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) => handleExpenseChange(expense.id, "amount", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <input
                    type="text"
                    className="expense-description"
                    value={expense.description}
                    onChange={(e) => handleExpenseChange(expense.id, "description", e.target.value)}
                    placeholder="Descripción (opcional)"
                  />
                </div>
              ))}

              <button
                className="budget-add-expense"
                onClick={() => {
                  setExpenses([...expenses, { id: Date.now(), category: "Otros", amount: "", description: "" }])
                }}
              >
                + Agregar Gasto
              </button>

              <div className="budget-summary">
                <div className="budget-summary-item">
                  <span>Total Ingresos:</span>
                  <span className="budget-amount">${Number.parseFloat(income || 0).toFixed(2)}</span>
                </div>
                <div className="budget-summary-item">
                  <span>Total Gastos:</span>
                  <span className="budget-amount">${totalExpenses.toFixed(2)}</span>
                </div>
                <div className="budget-summary-item total">
                  <span>Balance:</span>
                  <span className={`budget-amount ${balance >= 0 ? "positive" : "negative"}`}>
                    ${balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="budget-card">
              <h3 className="budget-card-title">Distribución Recomendada</h3>
              <div className="budget-distribution">
                <div className="distribution-item">
                  <div className="distribution-label">
                    <span className="distribution-color" style={{ backgroundColor: "var(--primary)" }}></span>
                    <span>Necesidades (50%)</span>
                  </div>
                  <span className="distribution-amount">${(Number.parseFloat(income || 0) * 0.5).toFixed(2)}</span>
                </div>
                <div className="distribution-item">
                  <div className="distribution-label">
                    <span className="distribution-color" style={{ backgroundColor: "var(--secondary)" }}></span>
                    <span>Deseos (30%)</span>
                  </div>
                  <span className="distribution-amount">${(Number.parseFloat(income || 0) * 0.3).toFixed(2)}</span>
                </div>
                <div className="distribution-item">
                  <div className="distribution-label">
                    <span className="distribution-color" style={{ backgroundColor: "var(--accent)" }}></span>
                    <span>Ahorros (20%)</span>
                  </div>
                  <span className="distribution-amount">${(Number.parseFloat(income || 0) * 0.2).toFixed(2)}</span>
                </div>
              </div>
              <div className="distribution-chart">
                <div className="chart-bar">
                  <div className="chart-fill needs" style={{ width: "50%" }}></div>
                  <div className="chart-fill wants" style={{ width: "30%" }}></div>
                  <div className="chart-fill savings" style={{ width: "20%" }}></div>
                </div>
              </div>
              <p className="distribution-tip">
                <strong>Tip:</strong> La regla 50/30/20 sugiere destinar el 50% de tus ingresos a necesidades básicas,
                30% a deseos y 20% a ahorros e inversiones.
              </p>
            </div>
          </div>
        )}

        {activeTab === "gastos" && (
          <div className="expense-tracker">
            <div className="budget-card">
              <h3 className="budget-card-title">Agregar Nuevo Gasto</h3>
              <div className="new-expense-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expense-category">Categoría</label>
                    <select
                      id="expense-category"
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                      required
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="expense-amount">Monto</label>
                    <div className="budget-input-wrapper">
                      <span className="budget-currency">$</span>
                      <input
                        type="number"
                        id="expense-amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expense-date">Fecha</label>
                    <input
                      type="date"
                      id="expense-date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expense-description">Descripción</label>
                    <input
                      type="text"
                      id="expense-description"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      placeholder="Descripción (opcional)"
                    />
                  </div>
                </div>
                <button className="add-expense-btn" onClick={handleAddExpense}>
                  Agregar Gasto
                </button>
              </div>
            </div>

            <div className="budget-card">
              <h3 className="budget-card-title">Historial de Gastos</h3>
              <div className="expense-history">
                <div className="expense-history-header">
                  <span>Fecha</span>
                  <span>Categoría</span>
                  <span>Descripción</span>
                  <span>Monto</span>
                  <span>Acción</span>
                </div>
                <div className="expense-history-body">
                  {expenseHistory.length === 0 ? (
                    <div className="no-expenses">No hay gastos registrados</div>
                  ) : (
                    expenseHistory.map((expense) => (
                      <div key={expense.id} className="expense-history-item">
                        <span>{expense.date}</span>
                        <span>{expense.category}</span>
                        <span>{expense.description || "-"}</span>
                        <span className="expense-amount">${expense.amount.toFixed(2)}</span>
                        <button className="delete-expense" onClick={() => handleDeleteExpense(expense.id)}>
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
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
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

        <div className="nav-item active" onClick={() => navigate("/presupuesto")}>
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
          <div className="nav-indicator"></div>
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
