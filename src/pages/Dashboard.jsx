import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <main>
      <h1>Panel de administración del parqueadero</h1>

      <p>Bienvenido al Sistema de Gestión de Parqueadero.</p>

      <h2>Funcionalidades</h2>

      <ul>
        <li>Registro de entrada de vehículos</li>
        <li>Registro de salida de vehículos</li>
        <li>Consulta de vehículos estacionados</li>
        <li>Control de ocupación</li>
      </ul>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </main>
  );
}