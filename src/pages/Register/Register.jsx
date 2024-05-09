import "./Register.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isValidForm, setIsValidForm] = useState(false); // Estado para verificar se o formulário é válido

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

  // Função para validar o formato do email
  const isValidEmail = (email) => {
    // Expressão regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar o formato do número de telefone
  const isValidPhoneNumber = (phoneNumber) => {
    // Expressão regular para validar número de telefone com DDD
    const phoneRegex = /^\d{2}\d{8,9}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Função para validar a senha
  const isValidPassword = (password) => {
    // A senha deve ter pelo menos 6 caracteres, incluindo letras e números
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  // Verifica se todos os campos são válidos
  useEffect(() => {
    const isFormValid =
      isValidEmail(email) &&
      isValidPhoneNumber(displayName) &&
      isValidPassword(password) &&
      password === confirmPassword;
    setIsValidForm(isFormValid);
  }, [email, displayName, password, confirmPassword]);

  return (
    <div className="container-register">
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {!isValidEmail(email) && <small>Formato de e-mail inválido</small>}
        </label>
        <label>
          <span>Telefone - Whatsapp:</span>
          <input
            type="tel"
            name="displayName"
            required
            placeholder="Digite o DDD seguido do número de telefone"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
          {!isValidPhoneNumber(displayName) && (
            <small>Formato de telefone inválido</small>
          )}
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!isValidPassword(password) && (
            <small>
              A senha deve ter pelo menos 6 caracteres, incluindo letras e
              números
            </small>
          )}
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {/* Desabilita o botão de cadastro se o formulário não for válido */}
        {!loading && (
          <button className="btn btn-info" disabled={!isValidForm}>
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
