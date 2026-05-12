function Login({ login, setLogin, iniciarSesion }) {
  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>

      <input
        placeholder="Usuario"
        onChange={(e) =>
          setLogin({ ...login, usuario: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) =>
          setLogin({ ...login, password: e.target.value })
        }
      />

      <button onClick={iniciarSesion}>Entrar</button>
    </div>
  );
}

export default Login;