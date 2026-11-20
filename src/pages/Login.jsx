
import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCargando(true);

    try {
      const respuesta = await axiosClient.post('/auth/login', {
        correo,
        password,
      });

      const token = respuesta.data.token;

      if (!token) {
        setMensaje('El servidor no devolvió un token.');
        return;
      }

      localStorage.setItem('token', token);
      window.location.assign('/dashboard');
    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje ||
        'No fue posible iniciar sesión.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="parking-login">
      <div className="parking-login__overlay" />

      <div className="parking-login__content">
        <div className="parking-login__brand">
          <div className="parking-login__logo">P</div>
          <span>PARKING SYSTEM</span>
        </div>

        <section className="parking-login__card">
          <div className="parking-login__icon">🚘</div>

          <h1>Bienvenido</h1>
          <p className="parking-login__subtitle">
            Sistema de Gestión de Parqueadero
          </p>

          <form onSubmit={iniciarSesion}>
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              placeholder="usuario@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="password">Contraseña</label>

            <div className="parking-login__password">
              <input
                id="password"
                type={mostrarPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="parking-login__toggle"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                aria-label={
                  mostrarPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
              >
                {mostrarPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {mensaje && (
              <p className="parking-login__error" role="alert">
                {mensaje}
              </p>
            )}

            <button
              className="parking-login__submit"
              type="submit"
              disabled={cargando}
            >
              {cargando ? 'Ingresando...' : 'Ingresar al sistema →'}
            </button>
          </form>

          <div className="parking-login__security">
            🔒 Acceso seguro y protegido
          </div>
        </section>

        <p className="parking-login__footer">
          © 2026 Parking System · Gestión inteligente de parqueaderos
        </p>
      </div>
    </main>
  );
}
