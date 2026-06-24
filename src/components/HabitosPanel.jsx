import { useRef, useState } from 'react';

function HabitosPanel({
  usuarioActual,
  usuarios,
  habitos,
  onAgregarHabito,
  onEditarHabito,
  onCambiarEstado,
  onEliminarHabito,
}) {
  const formularioRef = useRef(null);

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Salud');
  const [frecuencia, setFrecuencia] = useState('Diario');
  const [usuarioIdAsignado, setUsuarioIdAsignado] = useState(usuarioActual.id);
  const [habitoEditandoId, setHabitoEditandoId] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const habitosPorRol =
    usuarioActual.rol === 'Administrador'
      ? habitos
      : habitos.filter((habito) => habito.usuarioId === usuarioActual.id);

  const habitosVisibles = habitosPorRol.filter((habito) => {
    if (filtroEstado === 'Pendientes') {
      return !habito.completado;
    }

    if (filtroEstado === 'Completadas') {
      return habito.completado;
    }

    return true;
  });

  const estaEditando = habitoEditandoId !== null;

  function obtenerNombreUsuario(usuarioId) {
    const usuario = usuarios.find((item) => item.id === usuarioId);
    return usuario ? usuario.nombre : 'Usuario eliminado';
  }

  function limpiarFormulario() {
    setNombre('');
    setCategoria('Salud');
    setFrecuencia('Diario');
    setUsuarioIdAsignado(usuarioActual.id);
    setHabitoEditandoId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (nombre.trim() === '') {
      return;
    }

    const datosHabito = {
      nombre,
      categoria,
      frecuencia,
      usuarioId: Number(usuarioIdAsignado),
    };

    if (estaEditando) {
      onEditarHabito(habitoEditandoId, datosHabito);
    } else {
      onAgregarHabito(datosHabito);
    }

    limpiarFormulario();
  }

  function handleEditarClick(habito) {
    setHabitoEditandoId(habito.id);
    setNombre(habito.nombre);
    setCategoria(habito.categoria);
    setFrecuencia(habito.frecuencia);
    setUsuarioIdAsignado(habito.usuarioId);

    formularioRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <section className="card" ref={formularioRef}>
      <h2>Gestión de hábitos</h2>

      <form className="habit-form" onSubmit={handleSubmit}>
        <label>
          Nombre del hábito
          <input
            type="text"
            value={nombre}
            placeholder="Ej: Dormir 8 horas"
            onChange={(event) => setNombre(event.target.value)}
          />
        </label>

        <label>
          Categoría
          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option>Salud</option>
            <option>Actividad física</option>
            <option>Alimentación</option>
            <option>Estudio</option>
            <option>Desarrollo personal</option>
          </select>
        </label>

        <label>
          Frecuencia
          <select
            value={frecuencia}
            onChange={(event) => setFrecuencia(event.target.value)}
          >
            <option>Diario</option>
            <option>Semanal</option>
            <option>Mensual</option>
          </select>
        </label>

        {usuarioActual.rol === 'Administrador' && (
          <label>
            Usuario
            <select
              value={usuarioIdAsignado}
              onChange={(event) => setUsuarioIdAsignado(event.target.value)}
            >
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </option>
              ))}
            </select>
          </label>
        )}

        <button type="submit">
          {estaEditando ? 'Guardar cambios' : 'Agregar hábito'}
        </button>

        {estaEditando && (
          <button type="button" onClick={limpiarFormulario}>
            Cancelar
          </button>
        )}
      </form>

      <div className="filters">
        <label>
          Filtrar por estado
          <select
            value={filtroEstado}
            onChange={(event) => setFiltroEstado(event.target.value)}
          >
            <option>Todos</option>
            <option>Pendientes</option>
            <option>Completadas</option>
          </select>
        </label>
      </div>

      <div className="habit-list">
        {habitosVisibles.length === 0 ? (
          <p className="empty-message">No hay hábitos para este filtro.</p>
        ) : (
          habitosVisibles.map((habito) => (
            <article
              className={`habit-item ${
                habito.completado ? 'habit-completed' : ''
              }`}
              key={habito.id}
            >
              <div>
                <h3>{habito.nombre}</h3>

                {usuarioActual.rol === 'Administrador' && (
                  <p>
                    <strong>Usuario:</strong>{' '}
                    {obtenerNombreUsuario(habito.usuarioId)}
                  </p>
                )}

                <p>
                  <strong>Categoría:</strong> {habito.categoria}
                </p>

                <p>
                  <strong>Frecuencia:</strong> {habito.frecuencia}
                </p>

                <p>
                  <strong>Estado:</strong>{' '}
                  {habito.completado ? 'Completado' : 'Pendiente'}
                </p>
              </div>

              <div className="habit-actions">
                <button onClick={() => handleEditarClick(habito)}>
                  Editar
                </button>

                <button onClick={() => onCambiarEstado(habito.id)}>
                  {habito.completado ? 'Marcar pendiente' : 'Marcar completo'}
                </button>

                <button
                  className="delete-button"
                  onClick={() => onEliminarHabito(habito.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default HabitosPanel;