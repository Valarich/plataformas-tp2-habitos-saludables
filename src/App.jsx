import { useEffect, useState } from 'react';
import './App.css';

import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

import { usuariosIniciales, habitosIniciales } from './data/datosIniciales';
import { leerLocalStorage } from './utils/localStorage';

function App() {
  const [usuarios, setUsuarios] = useState(() =>
    leerLocalStorage('usuarios', usuariosIniciales)
  );

  const [usuarioActual, setUsuarioActual] = useState(() =>
    leerLocalStorage('usuarioActual', null)
  );

  const [habitos, setHabitos] = useState(() =>
    leerLocalStorage('habitos', habitosIniciales)
  );

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
  }, [usuarioActual]);

  useEffect(() => {
    localStorage.setItem('habitos', JSON.stringify(habitos));
  }, [habitos]);

  function handleLogout() {
    setUsuarioActual(null);
  }

  function handleAgregarHabito(nuevoHabito) {
    const habitoCreado = {
      id: Date.now(),
      usuarioId: nuevoHabito.usuarioId,
      nombre: nuevoHabito.nombre,
      categoria: nuevoHabito.categoria,
      frecuencia: nuevoHabito.frecuencia,
      completado: false,
    };

    setHabitos([...habitos, habitoCreado]);
  }

  function handleEditarHabito(id, datosActualizados) {
    const habitosActualizados = habitos.map((habito) => {
      if (habito.id === id) {
        return {
          ...habito,
          usuarioId: datosActualizados.usuarioId,
          nombre: datosActualizados.nombre,
          categoria: datosActualizados.categoria,
          frecuencia: datosActualizados.frecuencia,
        };
      }

      return habito;
    });

    setHabitos(habitosActualizados);
  }

  function handleCambiarEstado(id) {
    const habitosActualizados = habitos.map((habito) => {
      if (habito.id === id) {
        return {
          ...habito,
          completado: !habito.completado,
        };
      }

      return habito;
    });

    setHabitos(habitosActualizados);
  }

  function handleEliminarHabito(id) {
    const habitosFiltrados = habitos.filter((habito) => habito.id !== id);
    setHabitos(habitosFiltrados);
  }

  function handleAgregarUsuario(nuevoUsuario) {
    const usuarioCreado = {
      id: Date.now(),
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      password: nuevoUsuario.password,
      rol: nuevoUsuario.rol,
    };

    setUsuarios([...usuarios, usuarioCreado]);
  }

  function handleEliminarUsuario(id) {
    if (id === usuarioActual.id) {
      return;
    }

    const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
    const habitosFiltrados = habitos.filter((habito) => habito.usuarioId !== id);

    setUsuarios(usuariosFiltrados);
    setHabitos(habitosFiltrados);
  }

  function handleCambiarRol(id, nuevoRol) {
    const usuariosActualizados = usuarios.map((usuario) => {
      if (usuario.id === id) {
        return {
          ...usuario,
          rol: nuevoRol,
        };
      }

      return usuario;
    });

    setUsuarios(usuariosActualizados);
  }

  return (
    <main>
      <Header usuarioActual={usuarioActual} onLogout={handleLogout} />

      {!usuarioActual ? (
        <LoginForm usuarios={usuarios} onLogin={setUsuarioActual} />
      ) : (
        <Dashboard
          usuarioActual={usuarioActual}
          usuarios={usuarios}
          habitos={habitos}
          onAgregarHabito={handleAgregarHabito}
          onEditarHabito={handleEditarHabito}
          onCambiarEstado={handleCambiarEstado}
          onEliminarHabito={handleEliminarHabito}
          onAgregarUsuario={handleAgregarUsuario}
          onEliminarUsuario={handleEliminarUsuario}
          onCambiarRol={handleCambiarRol}
        />
      )}
    </main>
  );
}

export default App;