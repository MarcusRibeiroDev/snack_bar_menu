import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <>
      <div className="container-login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Endereço de Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              required
              placeholder="E-mail do usuário"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div id="emailHelp" className="form-text">
              Nunca compartilharemos seu e-mail com mais ninguém.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Senha:
            </label>
            <input
              name="password"
              required
              placeholder="Insira a senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {!loading && (
            <button className="btn btn-danger btn-custom" type="submit">
              Entrar
            </button>
          )}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}

          {
            <span>
              Ainda não possui uma conta?{" "}
              <Link to="/register">Clique aqui!</Link>
            </span>
          }

          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
