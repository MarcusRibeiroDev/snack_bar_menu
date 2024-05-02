import "./Orders.css";

const Orders = () => {
  return (
    <div className="order-container">
      <div className="orders-user">
        <div>
          <span className="d-inline-flex gap-1">
            <a
              className="btn btn-primary"
              data-bs-toggle="collapse"
              href="#multiCollapseExample1"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            >
              Pedido feito no dia...
            </a>
          </span>
          <div className="row">
            <div className="col">
              <div
                className="collapse multi-collapse"
                id="multiCollapseExample1"
              >
                <div className="card card-body">
                  Some placeholder content for the first collapse component of
                  this multi-collapse example. This panel is hidden by default
                  but revealed when the user activates the relevant trigger.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
