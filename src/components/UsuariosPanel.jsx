import { useState } from 'react';

function UsuariosPanel({
  usuarios,
  usuarioActual,
  onAgregarUsuario,
  onEliminarUsuario,
  onCambiarRol,
}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('1234');
  const [rol, setRol] = useState('Usuario');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (nombre.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const emailExiste = usuarios.some((usuario) => usuario.email === email);

    if (emailExiste) {
      setError('Ya existe un usuario con ese email.');
      return;
    }

    onAgregarUsuario({
      nombre,
      email,
      password,
      rol,
    });

    setNombre('');
    setEmail('');
    setPassword('1234');
    setRol('Usuario');
    setError('');
  }

  return (
    <section className="card">
      <h2>Gestión de usuarios</h2>

      <form className="user-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            placeholder="Ej: Ana Pérez"
            onChange={(event) => setNombre(event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            placeholder="Ej: ana@habitos.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Contraseña
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <label>
          Rol
          <select value={rol} onChange={(event) => setRol(event.target.value)}>
            <option>Usuario</option>
            <option>Administrador</option>
          </select>
        </label>

        <button type="submit">Agregar usuario</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="users-list">
        {usuarios.map((usuario) => (
          <article className="user-item" key={usuario.id}>
            <div>
              <h3>{usuario.nombre}</h3>

              <p>
                <strong>Email:</strong> {usuario.email}
              </p>

              <p>
                <strong>Rol:</strong> {usuario.rol}
              </p>
            </div>

            <div className="user-actions">
              <select
                value={usuario.rol}
                disabled={usuario.id === usuarioActual.id}
                onChange={(event) => onCambiarRol(usuario.id, event.target.value)}
              >
                <option>Usuario</option>
                <option>Administrador</option>
              </select>

              <button
                className="delete-button"
                disabled={usuario.id === usuarioActual.id}
                onClick={() => onEliminarUsuario(usuario.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="help-text">
        Nota: el usuario conectado no puede eliminarse ni cambiarse su propio rol.
      </p>
    </section>
  );
}

export default UsuariosPanel;