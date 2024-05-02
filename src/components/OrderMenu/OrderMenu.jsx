import { useState, useEffect } from "react";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useAuthValue } from "../../context/AuthContext";

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
  const { user } = useAuthValue();
  const { saveOrder, error, loading } = useCreateOrder();
  const [itemQuantities, setItemQuantities] = useState({});
  const [newOrder, setNewOrder] = useState(undefined);

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

  function verifyAuth() {
    if (!user) {
      alert("Não ta logado");
      return;
    } else if (error !== null) {
      alert("Não foi possível finalizar o pedido, Contate-nos no WhatsApp!");
      return;
    } else {
      finishOrder();
    }
  }

  const finishOrder = () => {
    // Criar um objeto com as informações do pedido
    const order = {
      orderCart: orderCart,
      orderPriceTotal: orderPriceTotal,
      timeStamp: new Date(),
    };

    // Armazenar o objeto do pedido no estado
    setNewOrder(order);
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

  useEffect(() => {
    const saveNewOrder = async () => {
      if (newOrder !== undefined) {
        await saveOrder(newOrder);
      }
    };

    saveNewOrder();
  }, [newOrder]);

  return (
    <div className={`order-container`}>
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
            <div className="total-info">
              <span className="">Total</span>
              <span>{orderPriceTotal}</span>
            </div>
            {!loading && (
              <div
                type="button"
                className={`finish-button ${
                  orderCart.length === 0 ? "disabled" : ""
                }`}
                onClick={() => verifyAuth()}
              >
                <span>Finalizar pedido</span>
              </div>
            )}
            {loading && (
              <div className="finish-button" disabled>
                Aguarde...
              </div>
            )}
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
