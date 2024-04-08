// Hooks
import { useState, useEffect } from "react";

// CSS
import "./Home.css";

// Components
import Featured_products from "../../components/Featured_products/Featured_products";
import List_of_products from "../../components/List_of_products/List_of_products";
import OrderMenu from "../../components/OrderMenu/OrderMenu";

// Images
import Logo from "../../assets/images/Logo.png";

function Home({ ScreenSize }) {
  const [showOrderMobile, setShowOrderMobile] = useState(false);

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

  const products = [
    {
      category: "SALGADOS FRITOS O CENTO",
      id: 2324,
      listProducts: [
        { title: "Card 4", text: "Texto do Card 4", id: 3434 },
        { title: "Card 5", text: "Texto do Card 5", id: 2434 },
        { title: "Card 6", text: "Texto do Card 6", id: 9893 },
        { title: "Card 4", text: "Texto do Card 4", id: 3034 },
        { title: "Card 5", text: "Texto do Card 5", id: 2034 },
        { title: "Card 6", text: "Texto do Card 6", id: 9093 },
      ],
    },
    {
      category: "SALGADOS ASSADOS O CENTO",
      id: 2344,
      listProducts: [
        { title: "Card 4", text: "Texto do Card 4", id: 1434 },
        { title: "Card 5", text: "Texto do Card 5", id: 4434 },
        { title: "Card 6", text: "Texto do Card 6", id: 5434 },
      ],
    },
  ];

  useEffect(() => {
    // Adiciona ou remove a classe ao body conforme showOrderMobile
    if (showOrderMobile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showOrderMobile]);

  return (
    <>
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
            <List_of_products products={products} />
          </main>
          {ScreenSize > 992 && (
            <aside className="col-3">
              <OrderMenu />
            </aside>
          )}
        </div>
      </div>
      {ScreenSize < 992 && (
        <div
          className="order-mobile"
          onClick={() => setShowOrderMobile(!showOrderMobile)}
        >
          <div>
            <i className="bi bi-bag-fill"></i>
            <span>1</span>
          </div>
          <span>Ver sacola</span>
          <span>R$ 90,00</span>
        </div>
      )}
      {showOrderMobile && (
        <div className="showOrderMobile">
          <OrderMenu
            screenSize={ScreenSize}
            setShowOrderMobile={setShowOrderMobile}
            showOrderMobile={showOrderMobile}
          />
        </div>
      )}
    </>
  );
}

export default Home;