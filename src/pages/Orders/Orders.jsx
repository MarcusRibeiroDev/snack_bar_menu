import "./Orders.css";

// Hooks
import { useEffect } from "react";
import { useFetchOrders } from "../../hooks/useFetchOrders";

// Context
import { useAuthValue } from "../../context/AuthContext";

const Orders = () => {
  const { user } = useAuthValue();
  const { orders, setOrders, fetchOrders } = useFetchOrders(); // Corrigido para desestruturar orders e fetchOrders corretamente

  const loadingOrder = user === undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchOrders();
      } else {
        setOrders([]);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  if (loadingOrder) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="order-container">
      <div className="orders-user">
        {orders.map((order) => (
          <div key={order.id}>
            <span className="d-inline-flex gap-1">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#orderCollapse${order.id}`}
                aria-expanded="false"
                aria-controls={`orderCollapse${order.id}`}
              >
                Pedido: {order.date}
              </button>
            </span>
            <div className="row">
              <div className="col">
                <div
                  className="collapse multi-collapse"
                  id={`orderCollapse${order.id}`}
                >
                  <div className="card card-body">
                    {/* Aqui você pode renderizar os detalhes do pedido, substitua este conteúdo pelo que deseja exibir */}
                    <p>Hora do Pedido: {order.time}</p>
                    {order.orderCart.map((prod) => (
                      <div key={prod.id}>
                        <p>{prod.title}</p>
                      </div>
                    ))}
                    <p>Valor total: {order.orderPriceTotal}</p>
                    {/* Renderize outros detalhes do pedido aqui */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
