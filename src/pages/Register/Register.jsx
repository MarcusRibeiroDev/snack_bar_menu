import "./Register.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    displayName: false,
    password: false,
    confirmPassword: false,
  });

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    const res = await createUser(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{2}\d{8,9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    const isFormValid =
      isValidEmail(email) &&
      isValidPhoneNumber(displayName) &&
      isValidPassword(password) &&
      password === confirmPassword;
    setIsValidForm(isFormValid);
  }, [email, displayName, password, confirmPassword]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div className="container-register">
      <h2>Cadastre-se</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label">
            Endereço de Email
          </label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            name="email"
            required
            placeholder="E-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            value={email}
          />
          {touched.email && !isValidEmail(email) && (
            <small className="text-danger">Formato de e-mail inválido</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="registerPhone" className="form-label">
            Telefone - Whatsapp
          </label>
          <input
            type="tel"
            className="form-control"
            id="registerPhone"
            name="displayName"
            required
            placeholder="Digite o DDD seguido do número de telefone"
            onChange={(e) => setDisplayName(e.target.value)}
            onBlur={() => handleBlur("displayName")}
            value={displayName}
          />
          {touched.displayName && !isValidPhoneNumber(displayName) && (
            <small className="text-danger">Formato de telefone inválido</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            name="password"
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            value={password}
          />
          {touched.password && !isValidPassword(password) && (
            <small className="text-danger">
              A senha deve ter pelo menos 6 caracteres, incluindo letras e
              números
            </small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmação de senha
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            value={confirmPassword}
          />
        </div>
        {!loading && (
          <button
            className="btn btn-danger btn-custom"
            type="submit"
            disabled={!isValidForm}
          >
            Cadastrar
          </button>
        )}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
