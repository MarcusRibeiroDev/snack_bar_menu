import { useState, useEffect } from "react";

import "./OrderMenu.css";

const OrderMenu = ({
  screenSize,
  setShowOrderMobile,
  showOrderMobile,
  orderCart,
  orderPriceTotal,
  setOrderCart,
  setOrderPriceTotal,
}) => {
  const [shippingCost, setShippingCost] = useState(0);
  const [itemQuantities, setItemQuantities] = useState({});

  function clearCart() {
    setOrderCart([]);
    setItemQuantities({});
  }

  function removeOrder(removedId) {
    const updatedOrderCart = orderCart.filter(
      (order) => order.id !== removedId
    );
    setOrderCart(updatedOrderCart);
  }

  const updateQuantity = (id, newQuantity) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  useEffect(() => {
    // Atualize o subtotal sempre que houver uma modificação no carrinho
    if (orderCart.length > 0) {
      let totalPrice = orderCart.reduce(
        (acc, order) => acc + order.price * itemQuantities[order.id],
        0
      );
      setOrderPriceTotal(totalPrice.toFixed(2));
    } else {
      setOrderPriceTotal(0);
    }
  }, [orderCart, itemQuantities]);

  useEffect(() => {
    const quantities = {};
    orderCart.forEach((order) => {
      quantities[order.id] = itemQuantities[order.id] || 1;
    });
    setItemQuantities(quantities);
  }, [orderCart]);

  useEffect(() => {
    const updatedCart = orderCart.filter(
      (order) => itemQuantities[order.id] <= 0
    );

    if (updatedCart.length > 0) {
      removeOrder(updatedCart[0].id);
    }
    // Atualize o subtotal sempre que houver uma modificação no carrinho
    if (orderCart.length > 0) {
      let totalPrice = orderCart.reduce(
        (acc, order) => acc + order.price * itemQuantities[order.id],
        0
      );
      setOrderPriceTotal(totalPrice.toFixed(2));
    } else {
      setOrderPriceTotal(0);
    }
  }, [itemQuantities, orderCart, setOrderPriceTotal]);

  return (
    <div className={`order-container`}>
      <div className="delivery-camp">
        <i className="bi bi-geo-alt"></i>
        <span>Calcular taxa e tempo de entrega</span>
      </div>
      <div className="d-flex justify-content-between my-4 bg-info align-items-center ">
        <span>Carrinho</span>
        <button onClick={() => clearCart()}>Limpar</button>
      </div>
      {orderCart && (
        <>
          {orderCart.map((order) => (
            <div className="container-product-camp" key={order.id}>
              <div className="product-camp">
                <div className="product-camp-price">
                  <span className="">{order.title}</span>
                  <span>{order.price * itemQuantities[order.id]}</span>
                </div>
                <p>{order.text}</p>
                <div className="product-camp-info">
                  <div>
                    <div>
                      {itemQuantities[order.id] > 0
                        ? itemQuantities[order.id]
                        : 0}{" "}
                      unid
                    </div>{" "}
                    {/* Mostra a quantidade do item */}
                    <button
                      onClick={() =>
                        updateQuantity(order.id, itemQuantities[order.id] + 1)
                      }
                    >
                      + {/* Adiciona 1 à quantidade */}
                    </button>
                    <button
                      onClick={() =>
                        updateQuantity(order.id, itemQuantities[order.id] - 1)
                      }
                      disabled={itemQuantities[order.id] === 0}
                    >
                      -
                    </button>
                  </div>
                  <img src={order.img} alt="" />
                </div>
              </div>
            </div>
          ))}
          <div className="order-details">
            <div className="extra-info">
              <span>Subtotal</span>
              <span>{orderPriceTotal}</span>
            </div>
            <div className="extra-info">
              <span>Entrega</span>
              <span>{shippingCost}</span>
            </div>
            <div className="total-info">
              <span className="">Total</span>
              <span>{parseFloat(orderPriceTotal + shippingCost)}</span>
            </div>
            <div type="button" className="finish-button">
              <span>Finalizar pedido</span>
            </div>
            {screenSize < 992 && (
              <div
                type="button"
                className="close-button"
                onClick={() => setShowOrderMobile(!showOrderMobile)}
              >
                <span>Voltar</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderMenu;
