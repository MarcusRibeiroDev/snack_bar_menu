import { Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  return (
    <>
      <div className="container-login">
        <h2>Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We will never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Senha:
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
          {
            <span>
              Ainda não possui uma conta?{" "}
              <Link to="/register">Clique aqui!</Link>
            </span>
          }
        </form>
      </div>
    </>
  );
};

export default Login;
