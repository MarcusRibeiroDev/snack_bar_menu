import { Link } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <>
      <header>
        <div className="container d-flex justify-content-center py-4">
          <nav className="nav">
            <Link className="nav-link" to="/">
              <i className="bi bi-house-door-fill"></i>
              Home
            </Link>
            {user && (
              <>
                <a
                  href="#"
                  type="button"
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="bi bi-cash-coin"></i>
                  Promoções
                </a>
                <Link className="nav-link" to="/orders">
                  <i className="bi bi-bag-fill"></i>
                  Pedidos
                </Link>
                <a
                  href="#"
                  type="button"
                  className="nav-link"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal1"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Sair
                </a>
              </>
            )}
            {!user && (
              <>
                <Link className="nav-link" to="/register">
                  <i className="bi bi-person-fill"></i>
                  Cadastrar
                </Link>
                <Link className="nav-link" to="/login">
                  <i className="bi bi-person-fill"></i>
                  Entrar
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Promoções
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              No momento não há promoções disponiníveis
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel1">
                Aviso
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja sair da conta?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => logout()}
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
