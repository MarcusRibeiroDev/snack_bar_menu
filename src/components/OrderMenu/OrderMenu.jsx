import { useState, useEffect } from "react";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useAuthValue } from "../../context/AuthContext";
import { useSendMessage } from "../../hooks/useSendMessage";

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
  const { sendMessage } = useSendMessage();
  const [showAlert, setShowAlert] = useState(undefined);

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
      alert("Você não está conectado em nenhuma conta!");
      return;
    } else if (error !== null) {
      alert("Não foi possível finalizar o pedido, Contate-nos no WhatsApp!");
      return;
    } else {
      finishOrder();
    }
  }

  const finishOrder = () => {
    // Obtenha a data e hora atuais
    const currentTime = new Date();

    // Formate a data como 'YYYY-MM-DD'
    const currentDate = currentTime.toISOString().split("T")[0];

    // Formate a hora como 'HH:MM'
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const currentTimeFormatted = `${hours}:${minutes}`;

    // Criar um objeto com as informações do pedido, incluindo data e hora
    const order = {
      orderCart: orderCart.map((order) => ({
        ...order,
        quantity: itemQuantities[order.id], // Adicione a quantidade do item ao objeto do pedido
      })),
      orderPriceTotal: orderPriceTotal,
      date: currentDate,
      time: currentTimeFormatted,
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

    const sendNewMessage = async () => {
      if (newOrder !== undefined) {
        // Construir a mensagem personalizada
        let msg = "#### NOVO PEDIDO ####\n\n";
        msg += `# IDº pedido: ?\nfeito em ${newOrder.date} ${newOrder.time}\n\n`;
        msg += `👤 ${user.email}\n`;
        msg += `📞 ${user.displayName}\n\n`;
        msg += "📍 Retirar na loja\n\n";
        msg += "------- ITENS DO PEDIDO -------\n\n";
        newOrder.orderCart.forEach((order) => {
          msg += `${itemQuantities[order.id]} x ${order.title}\n`;
          msg += `💵 ${itemQuantities[order.id]} x R$ ${order.price.toFixed(
            2
          )} = R$ ${(order.price * itemQuantities[order.id]).toFixed(2)}\n\n`;
        });
        msg += "-------------------------------\n\n";
        msg += `VALOR FINAL: R$ ${newOrder.orderPriceTotal}\n\n`;

        // Enviar a mensagem via WhatsApp
        const data = await sendMessage(msg, user.displayName);
        console.log(data);
      }
    };

    sendNewMessage();
    saveNewOrder();
    clearCart();
  }, [newOrder]);

  useEffect(() => {
    if (user) {
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }, [user]);

  return (
    <>
      <div className={`order-container`}>
        <p>Somente retirada na loja</p>
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
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
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
    </>
  );
};

export default OrderMenu;
