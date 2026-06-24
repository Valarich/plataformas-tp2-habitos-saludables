function Header({ usuarioActual, onLogout }) {
  return (
    <header className="app-header">
      <div>
        <h1>Sistema de Hábitos Saludables</h1>
        <p className="subtitle">
          Aplicación para gestionar hábitos diarios con roles de usuario.
        </p>
      </div>

      {usuarioActual && (
        <button className="logout-button" onClick={onLogout}>
          Cerrar sesión
        </button>
      )}
    </header>
  );
}

export default Header;