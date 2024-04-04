import "./OrderMenu.css";

const OrderMenu = () => {
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
      <div className="product-camp">
        <div className="product-camp-price">
          <span className="">5x Bolos</span>
          <span>80,00</span>
        </div>
        <div className="product-camp-info">
          <div>
            <button className="">Editar</button>
            <button>Remover</button>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWqFHHqEeoYTGP7unLMGN0IRvCYu4Iiot9igcEKa6Jg&s"
            alt=""
          />
        </div>
      </div>
      <div className="product-camp">
        <div className="product-camp-price">
          <span className="">5x Bolos</span>
          <span>80,00</span>
        </div>
        <div className="product-camp-info">
          <div>
            <button className="">Editar</button>
            <button>Remover</button>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWqFHHqEeoYTGP7unLMGN0IRvCYu4Iiot9igcEKa6Jg&s"
            alt=""
          />
        </div>
      </div>
      <div className="product-camp">
        <div className="product-camp-price">
          <span className="">5x Bolos</span>
          <span>80,00</span>
        </div>
        <div className="product-camp-info">
          <div>
            <button className="">Editar</button>
            <button>Remover</button>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyWqFHHqEeoYTGP7unLMGN0IRvCYu4Iiot9igcEKa6Jg&s"
            alt=""
          />
        </div>
      </div>
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
      </div>
    </div>
  );
};

export default OrderMenu;
