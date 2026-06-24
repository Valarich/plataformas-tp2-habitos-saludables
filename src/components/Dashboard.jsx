import HabitosPanel from './HabitosPanel';
import UsuariosPanel from './UsuariosPanel';

function Dashboard({
  usuarioActual,
  usuarios,
  habitos,
  onAgregarHabito,
  onEditarHabito,
  onCambiarEstado,
  onEliminarHabito,
  onAgregarUsuario,
  onEliminarUsuario,
  onCambiarRol,
}) {
  const habitosVisibles =
    usuarioActual.rol === 'Administrador'
      ? habitos
      : habitos.filter((habito) => habito.usuarioId === usuarioActual.id);

  const totalHabitos = habitosVisibles.length;

  const totalCompletados = habitosVisibles.filter(
    (habito) => habito.completado
  ).length;

  const totalPendientes = habitosVisibles.filter(
    (habito) => !habito.completado
  ).length;

  return (
    <>
      <section className="card">
        <h2>Panel principal</h2>

        <div className="user-info">
          <p>
            <strong>Usuario:</strong> {usuarioActual.nombre}
          </p>

          <p>
            <strong>Email:</strong> {usuarioActual.email}
          </p>

          <p>
            <strong>Rol:</strong> {usuarioActual.rol}
          </p>
        </div>

        <div className="dashboard-grid">
          <article>
            <h3>Hábitos visibles</h3>
            <p>{totalHabitos}</p>
          </article>

          <article>
            <h3>Hábitos completados</h3>
            <p>{totalCompletados}</p>
          </article>

          <article>
            {usuarioActual.rol === 'Administrador' ? (
              <>
                <h3>Usuarios del sistema</h3>
                <p>{usuarios.length}</p>
              </>
            ) : (
              <>
                <h3>Hábitos pendientes</h3>
                <p>{totalPendientes}</p>
              </>
            )}
          </article>
        </div>
      </section>

      <HabitosPanel
        usuarioActual={usuarioActual}
        usuarios={usuarios}
        habitos={habitos}
        onAgregarHabito={onAgregarHabito}
        onEditarHabito={onEditarHabito}
        onCambiarEstado={onCambiarEstado}
        onEliminarHabito={onEliminarHabito}
      />

      {usuarioActual.rol === 'Administrador' && (
        <UsuariosPanel
          usuarios={usuarios}
          usuarioActual={usuarioActual}
          onAgregarUsuario={onAgregarUsuario}
          onEliminarUsuario={onEliminarUsuario}
          onCambiarRol={onCambiarRol}
        />
      )}
    </>
  );
}

export default Dashboard;