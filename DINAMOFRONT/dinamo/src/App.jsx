// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BudgetPlanner from './pages/BudgetPlanner';
import ExpenseTracker from './pages/ExpenseTracker';
import Tips from './pages/Tips';
import ProgressChart from './pages/ProgressChart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/presupuesto" element={<BudgetPlanner />} />
        <Route path="/gastos" element={<ExpenseTracker />} />
        <Route path="/consejos" element={<Tips />} />
        <Route path="/progreso" element={<ProgressChart />} />
      </Routes>
    </Router>
  );
}

export default App;
