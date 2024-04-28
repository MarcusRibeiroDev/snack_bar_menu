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
import sushi from "../../assets/productsImages/sushi.jpg";

function Home({ ScreenSize }) {
  const [showOrderMobile, setShowOrderMobile] = useState(false);

  const [orderCart, setOrderCart] = useState([]);
  const [orderPriceTotal, setOrderPriceTotal] = useState(0);

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
      category: "Culinária japonesa",
      id: 1001,
      listProducts: [
        {
          title: "Card 4",
          text: "Texto do Card 4",
          id: 2001,
          price: 29.99,
          img: sushi,
        },
        {
          title: "Sushi",
          text: "Texto do Card 5",
          id: 2002,
          price: 18,
        },
        { title: "Card 6", text: "Texto do Card 6", id: 2003, price: 45.5 },
        { title: "Card 7", text: "Texto do Card 7", id: 2004, price: 33 },
        { title: "Card 8", text: "Texto do Card 8", id: 2005, price: 64.99 },
        { title: "Card 9", text: "Texto do Card 9", id: 2006, price: 27 },
      ],
    },
    {
      category: "Culinária tailandesa",
      id: 1002,
      listProducts: [
        { title: "Card 4", text: "Texto do Card 4", id: 2007, price: 19 },
        { title: "Card 5", text: "Texto do Card 5", id: 2008, price: 21.99 },
        { title: "Card 6", text: "Texto do Card 6", id: 2009, price: 36 },
      ],
    },
    {
      category: "Culinária Indiana",
      id: 1003,
      listProducts: [
        { title: "Card 4", text: "Texto do Card 4", id: 2010, price: 56.5 },
        { title: "Card 5", text: "Texto do Card 5", id: 2011, price: 42.75 },
        { title: "Card 6", text: "Texto do Card 6", id: 2012, price: 75 },
        { title: "Card 7", text: "Texto do Card 7", id: 2013, price: 81.25 },
        { title: "Card 8", text: "Texto do Card 8", id: 2014, price: 29 },
        { title: "Card 9", text: "Texto do Card 9", id: 2015, price: 62.99 },
      ],
    },
    {
      category: "Culinária vietnamita",
      id: 1004,
      listProducts: [
        { title: "Card 4", text: "Texto do Card 4", id: 2016, price: 47 },
        { title: "Card 5", text: "Texto do Card 5", id: 2017, price: 25.25 },
        { title: "Card 6", text: "Texto do Card 6", id: 2018, price: 39.99 },
      ],
    },
    {
      category: "Culinária chinesa",
      id: 1005,
      listProducts: [
        { title: "Card 4", text: "Texto do Card 4", id: 2019, price: 68 },
        { title: "Card 5", text: "Texto do Card 5", id: 2020, price: 77.5 },
        { title: "Card 6", text: "Texto do Card 6", id: 2021, price: 53.75 },
        { title: "Card 7", text: "Texto do Card 7", id: 2022, price: 84 },
        { title: "Card 8", text: "Texto do Card 8", id: 2023, price: 37.99 },
        { title: "Card 9", text: "Texto do Card 9", id: 2024, price: 72 },
      ],
    },
    {
      category: "Culinária sul-coreana",
      id: 1006,
      listProducts: [
        { title: "Card 4", text: "Texto do Card 4", id: 2025, price: 23 },
        { title: "Card 5", text: "Texto do Card 5", id: 2026, price: 57.25 },
        { title: "Card 6", text: "Texto do Card 6", id: 2027, price: 49 },
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

  useEffect(() => {
    if (orderCart.length > 0) {
      let totalPrice = orderCart.reduce((acc, order) => acc + order.price, 0);
      setOrderPriceTotal(totalPrice.toFixed(2));
    } else {
      setOrderPriceTotal(0);
    }
  }, [orderCart]);

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

            <Featured_products cards={cards} />
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
            <List_of_products
              products={products}
              orderCart={orderCart}
              setOrderCart={setOrderCart}
            />
          </main>
          <div
            className={`${ScreenSize > 992 ? "col-3" : ""}${
              showOrderMobile ? "showOrderMobile" : "d-none"
            }`}
          >
            <OrderMenu
              screenSize={ScreenSize}
              setShowOrderMobile={setShowOrderMobile}
              showOrderMobile={showOrderMobile}
              orderCart={orderCart}
              orderPriceTotal={orderPriceTotal}
              setOrderCart={setOrderCart}
              setOrderPriceTotal={setOrderPriceTotal}
            />
          </div>
        </div>
      </div>
      <div
        className={`${ScreenSize < 992 ? "order-mobile" : "d-none"}`}
        onClick={() => setShowOrderMobile(!showOrderMobile)}
      >
        <div>
          <i className="bi bi-bag-fill"></i>
          <span>{orderCart.length}</span>
        </div>
        <span>Ver sacola</span>
        <span>{orderPriceTotal}</span>
      </div>
    </>
  );
}

export default Home;
