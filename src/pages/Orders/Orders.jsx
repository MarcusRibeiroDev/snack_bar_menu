import "./Orders.css";

// Hooks
import { useEffect } from "react";
import { useFetchOrders } from "../../hooks/useFetchOrders";

// Context
import { useAuthValue } from "../../context/AuthContext";

const Orders = () => {
  const { user } = useAuthValue();
  const { orders, setOrders, fetchOrders } = useFetchOrders();
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

  // Ordenar os pedidos por data e hora, com os mais recentes primeiro
  const sortedOrders = orders.slice().sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateB - dateA;
  });

  if (loadingOrder) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="order-container-login">
      <h2>Pedidos</h2>
      <div className="orders-user">
        {sortedOrders.map((order) => (
          <div key={order.id}>
            <span className="d-inline-flex gap-1">
              <button
                className="btn btn-danger"
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
                    <p>Hora do Pedido: {order.time}</p>
                    {order.orderCart.map((prod) => (
                      <div key={prod.id}>
                        <p>
                          {prod.quantity}x {prod.title}
                        </p>
                      </div>
                    ))}
                    <p>Valor total: {order.orderPriceTotal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {sortedOrders.length === 0 && (
          <div className="empty-orders">
            <i className="bi bi-bag-x"></i>
            <span>Sem pedidos até o momento</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
