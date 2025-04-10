import './HomePage.css';
import logo from '../assets/gif.gif';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // Redirige a la ruta /login
  };

  return (
    <div className="home-container">
      <div className="content">
        <img src={logo} alt="Logo" className="logo-img" />
        <h1>DINAMO</h1>
        <button onClick={handleClick}>Iniciar</button>
      </div>
    </div>
  );
}
