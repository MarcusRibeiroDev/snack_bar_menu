import { useState, useEffect } from "react";

import "./OrderMenu.css";

const OrderMenu = ({
  screenSize,
  setShowOrderMobile,
  showOrderMobile,
  orderCart,
}) => {
  return (
    <div className={`order-container`}>
      <div className="delivery-camp">
        <i className="bi bi-geo-alt"></i>
        <span>Calcular taxa e tempo de entrega</span>
      </div>
      <div className="d-flex justify-content-between my-4 bg-info align-items-center ">
        <span>Carrinho</span>
        <button>Limpar</button>
      </div>
      {orderCart && (
        <>
          {orderCart.map((order) => (
            <div className="container-product-camp" key={order.id}>
              <div className="product-camp">
                <div className="product-camp-price">
                  <span className="">5x {order.title}</span>
                  <span>{order.price}</span>
                </div>
                <div className="product-camp-info">
                  <div>
                    <button className="">Editar</button>
                    <button>Remover</button>
                  </div>
                  <img src={order.img} alt="" />
                </div>
              </div>
            </div>
          ))}
          <div className="order-details">
            <div className="extra-info">
              <span>Subtotal</span>
              <span>80,00</span>
            </div>
            <div className="extra-info">
              <span>Entrega</span>
              <span>80,00</span>
            </div>
            <div className="total-info">
              <span className="">Total</span>
              <span>80,00</span>
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
