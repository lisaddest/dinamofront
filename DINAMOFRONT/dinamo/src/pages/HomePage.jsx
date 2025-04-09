import './HomePage.css'; // Asegúrate de importar el archivo CSS
import logo from '../assets/inicio.jpg';

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="content">
      <img src={logo} alt="Logo" className="logo-img" />
        <h1>DINAMO</h1>
        
      </div>
    </div>
  );
}
