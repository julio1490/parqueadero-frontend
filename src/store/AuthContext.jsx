import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = (nuevoToken, datosUsuario = null) => {
    if (!nuevoToken) {
      return;
    }

    localStorage.setItem('token', nuevoToken);
    setToken(nuevoToken);
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  useEffect(() => {
    const sincronizarSesion = (evento) => {
      if (evento.key === 'token') {
        setToken(evento.newValue);

        if (!evento.newValue) {
          setUsuario(null);
        }
      }
    };

    window.addEventListener('storage', sincronizarSesion);

    return () => {
      window.removeEventListener('storage', sincronizarSesion);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        autenticado: Boolean(token),
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
