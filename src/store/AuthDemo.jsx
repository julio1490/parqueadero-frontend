import { AuthProvider } from './AuthContext.jsx';
import { useAuth } from './useAuth';

function EstadoSesion() {
  const {
    autenticado,
    iniciarSesion,
    cerrarSesion,
  } = useAuth();

  return (
    <main>
      <h1>Autenticación del parqueadero</h1>

      <p>
        {autenticado
          ? 'Sesión iniciada'
          : 'Sesión no iniciada'}
      </p>

      <button
        type="button"
        onClick={() => iniciarSesion('token-de-prueba')}
      >
        Simular inicio de sesión
      </button>

      <button
        type="button"
        onClick={cerrarSesion}
      >
        Cerrar sesión
      </button>
    </main>
  );
}

export default function AuthDemo() {
  return (
    <AuthProvider>
      <EstadoSesion />
    </AuthProvider>
  );
}
