// CSS
import "./List_of_products.css";

const List_of_products = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div className="row col-12 my-4" key={product.id}>
          <h2>{product.category}</h2>
          {product.listProducts.map((item) => (
            <div className="col-sm-6 mb-3" key={item.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.text}</p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
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
