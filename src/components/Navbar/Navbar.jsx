import "./Navbar.css";

function Navbar() {
  return (
    <>
      <header>
        <div className="container d-flex justify-content-center py-4">
          <nav className="nav">
            <a className="nav-link" href="#">
              <i className="bi bi-house-door-fill"></i>
              Home
            </a>
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
            <a className="nav-link" href="#">
              <i className="bi bi-person-fill"></i>
              Entrar/Cadastrar
            </a>
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
    </>
  );
}

export default Navbar;
