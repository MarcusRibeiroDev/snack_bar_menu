// Hooks
import { useState, useEffect } from "react";

// CSS
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Featured_products from "./components/Featured_products/Featured_products";

// Images
import Logo from "./assets/images/Logo.png";

function App() {
  const cards = [
    [
      { title: "Card 1", text: "Texto do Card 1" },
      { title: "Card 2", text: "Texto do Card 2" },
      { title: "Card 3", text: "Texto do Card 3" },
    ],
    [
      { title: "Card 4", text: "Texto do Card 4" },
      { title: "Card 5", text: "Texto do Card 5" },
      { title: "Card 6", text: "Texto do Card 6" },
    ],
  ];

  const [ScreenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ScreenSize]); // Monitorando o tamanho da tela do usuário

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container-custom">
          <div className="content-image"></div>
        </div>
        <div className="d-flex justify-content-center ">
          <main className="col-md-9 container d-flex align-items-center flex-column">
            <div className="div-information-container">
              <img src={Logo} alt="" />
              <div className="div-information">
                <span className="div-information-title">
                  Restaurante Asíatico
                </span>
                <div className="div-information-details">
                  <span className="information-0">
                    Apenas agendamento • Abrimos amanhã às 07h00
                  </span>
                  <div className="information-1">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>Itu, SP</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="div-category-search">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Países
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Japão
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      China
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Índia
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tailândia
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Coreia do Sul
                    </a>
                  </li>
                </ul>
              </div>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="Pesquisar"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            <Featured_products cards={cards} />
          </main>
          {ScreenSize > 992 && <article className="col-3">ARTICLE</article>}
        </div>
      </div>
    </>
  );
}

export default App;
