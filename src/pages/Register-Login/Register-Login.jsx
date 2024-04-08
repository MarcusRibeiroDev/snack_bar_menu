import { useState } from "react";
import "./Register-Login.css";

const RegisterLogin = () => {
  const [registrationStage, setRegistrationStage] = useState("register");

  return (
    <>
      {registrationStage === "register" && (
        <div className="container-register">
          <h2>Cadastrar</h2>
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
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Telefone - Whatsapp
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
              <div id="emailHelp" className="form-text">
                Exemplo: 11970234531
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirmar Senha:
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar-se
            </button>
            <span>
              Já possui uma conta?{" "}
              <a href="#" onClick={() => setRegistrationStage("login")}>
                Clique aqui!
              </a>
            </span>
          </form>
        </div>
      )}
      {registrationStage === "login" && (
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
                We'll never share your email with anyone else.
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
            <span>
              Ainda não possui uma conta?{" "}
              <a href="#" onClick={() => setRegistrationStage("register")}>
                Clique aqui!
              </a>
            </span>
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterLogin;
