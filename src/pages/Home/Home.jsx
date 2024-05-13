// Hooks
import { useState, useEffect } from "react";

// CSS
import "./Home.css";

// Components
import Featured_products from "../../components/Featured_products/Featured_products";
import List_of_products from "../../components/List_of_products/List_of_products";
import OrderMenu from "../../components/OrderMenu/OrderMenu";

// Images
import Logo from "../../assets/images/Logo.jpg";

// Context
import { useAuthValue } from "../../context/AuthContext";

// Products informations
import cards from "../../assets/highlights/highlights";
import products from "../../assets/products/products";

function Home({ ScreenSize }) {
  //const { user } = useAuthValue();
  const [showOrderMobile, setShowOrderMobile] = useState(false);

  const [orderCart, setOrderCart] = useState([]);
  const [orderPriceTotal, setOrderPriceTotal] = useState(0);

  //const { orders, setOrders, fetchOrders } = useFetchOrders(); // Corrigido para desestruturar orders e fetchOrders corretamente

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
                <span className="div-information-title">Sabor do Oriente</span>
                <div className="div-information-details">
                  <span className="information-0">
                    Apenas retirada • Abertos de terça a domingo
                  </span>
                  <div className="information-1">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>Itu, SP</span>
                  </div>
                </div>
              </div>
            </div>

            {ScreenSize > 992 && <Featured_products cards={cards} />}
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
