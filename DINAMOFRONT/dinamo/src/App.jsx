import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import BudgetPlanner from "./pages/BudgetPlanner"
import Tips from "./pages/Tips"
import ProgressChart from "./pages/ProgressChart"
import Actividades from "./pages/Actividades"
import NivelSelector from "./pages/NivelSelector"
import OpcionesInicio from "./pages/OpcionesInicio"
import TestNivel from "./pages/TestNivel"
import ResultadoNivel from "./pages/ResultadoNivel"
import Informacion from "./pages/Informacion"
import Perfil from "./pages/Perfil"
import ChatButton from "./components/ChatButton"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/presupuesto" element={<BudgetPlanner />} />
        <Route path="/consejos" element={<Tips />} />
        <Route path="/progreso" element={<ProgressChart />} />
        <Route path="/actividad/:id" element={<Actividades />} />
        <Route path="/niveles" element={<NivelSelector />} />
        <Route path="/opciones-inicio" element={<OpcionesInicio />} />
        <Route path="/test-nivel" element={<TestNivel />} />
        <Route path="/resultado-nivel" element={<ResultadoNivel />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
      <ChatButton />
    </Router>
  )
}

export default App
