import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src="/logo-dinamo.png" alt="Logo Dinamo" className="dashboard-logo" />
      </header>

      <main className="grid-container">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div
            key={item}
            className="grid-item"
            onClick={() => handleClick(`/actividad/${item}`)} // Corregido aquí
          >
            <img src="/icono-actividad.png" alt={`Actividad ${item}`} className="grid-icon" />
          </div>
        ))}
      </main>

      <nav className="bottom-nav">
        {['Label', 'Label', 'Label', 'Label'].map((label, index) => (
          <div className="nav-item" key={index}>
            <span className="nav-icon">☆</span>
            <span className="nav-label">{label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
