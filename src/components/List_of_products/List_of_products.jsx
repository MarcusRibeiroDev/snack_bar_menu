import "./List_of_products.css";
import { useState, useEffect } from "react";

const List_of_products = ({ products, orderCart, setOrderCart }) => {
  function addToCart(item) {
    // Verifica se o item já está no carrinho
    const isItemInCart = orderCart.some((cartItem) => cartItem.id === item.id);
    if (!isItemInCart) {
      // Adiciona o item ao carrinho
      setOrderCart((prevCart) => [...prevCart, item]);
    }
  }

  return (
    <>
      {products.map((product) => (
        <div className="row col-12 my-4 " key={product.id}>
          {product.category && <h2>{product.category.toUpperCase()}</h2>}
          {product.listProducts.map((item) => (
            <div className="col-sm-6 mb-3" key={item.id}>
              <div className="card">
                <div className="card-body d-flex">
                  <div className="col-8">
                    {" "}
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.text}</p>
                    <button
                      type="button"
                      onClick={() => addToCart(item)} // Passa o item para addToCart
                      className={`btn btn-primary ${
                        orderCart.some((cartItem) => cartItem.id === item.id)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                  <div className="col-4 d-flex justify-content-end align-items-center">
                    <div className="img-list-of-products">
                      <img src={item.img} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default List_of_products;
