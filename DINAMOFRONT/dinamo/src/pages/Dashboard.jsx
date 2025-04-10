import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Imágenes de actividades
import actividad1 from '../assets/actividad1.jpeg';
import actividad2 from '../assets/actividad2.jpeg';
import actividad3 from '../assets/actividad3.jpeg';
import actividad4 from '../assets/actividad4.jpeg';
import actividad5 from '../assets/actividad5.jpeg';
import actividad6 from '../assets/actividad6.jpeg';
import actividad7 from '../assets/actividad7.jpeg';
import actividad8 from '../assets/actividad8.jpeg';
import actividad9 from '../assets/actividad9.jpeg';
import actividad10 from '../assets/actividad10.jpeg';

const imagenes = [
  actividad1,
  actividad2,
  actividad3,
  actividad4,
  actividad5,
  actividad6,
  actividad7,
  actividad8,
  actividad9,
  actividad10,
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header" />

      <main className="grid-container">
        {imagenes.map((imagen, index) => (
          <div
            key={index}
            className="grid-item"
            onClick={() => handleClick(`/actividad/${index + 1}`)}
          >
            <img
              src={imagen}
              alt={`Actividad ${index + 1}`}
              className="grid-icon"
            />
            <div className="overlay-text">Actividad {index + 1}</div>
          </div>
        ))}
      </main>

      <nav className="bottom-nav">
        {['Inicio', 'Perfil', 'Configuración', 'Salir'].map((label, index) => (
          <div
            className="nav-item"
            key={index}
            onClick={() => handleClick(`/${label.toLowerCase()}`)}
          >
            <span className="nav-icon">☆</span>
            <span className="nav-label">{label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
