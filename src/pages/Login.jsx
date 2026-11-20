import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje('');

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
    }
  };

  return (
    <main>
      <h1>Sistema de Gestión de Parqueadero</h1>
      <h2>Iniciar sesión</h2>

      <form onSubmit={iniciarSesion}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>

      {mensaje && <p role="alert">{mensaje}</p>}
    </main>
  );
}