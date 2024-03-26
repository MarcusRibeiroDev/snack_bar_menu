import "./Navbar.css";

function Navbar() {
  return (
    <>
      <header>
        <div className="container d-flex justify-content-center py-4">
          <nav className="nav">
            <a className="nav-link" aria-current="page" href="#">
              <i className="bi bi-house-door-fill"></i>
              Home
            </a>
            <a className="nav-link" href="#">
              <i className="bi bi-cash-coin"></i>
              Promoções
            </a>
            <a className="nav-link" href="#">
              <i className="bi bi-cart-plus-fill"></i>
              Link
            </a>
            <a className="nav-link" href="#">
              <i className="bi bi-person-fill"></i>
              Disabled
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
