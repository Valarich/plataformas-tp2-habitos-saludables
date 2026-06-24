import { useState } from 'react';

function LoginForm({ usuarios, onLogin }) {
  const [email, setEmail] = useState('admin@habitos.com');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );

    if (!usuarioEncontrado) {
      setError('Email o contraseña incorrectos.');
      return;
    }

    setError('');
    onLogin(usuarioEncontrado);
  }

  return (
    <section className="card login-card">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}

export default LoginForm;