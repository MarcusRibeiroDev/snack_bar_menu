import { useState, useEffect } from "react";

// CSS
import "./Featured_products.css";

const FeaturedProducts = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false); // Novo estado para controlar se o componente está pronto
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Verifica se o componente está pronto para iniciar o intervalo
    if (isReady) {
      // Inicia o intervalo para mudar o slide a cada 10 segundos
      const id = setInterval(() => {
        showNext();
      }, 10000);

      // Armazena o ID do intervalo
      setIntervalId(id);
    }

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, isReady]); // Execute sempre que currentIndex ou isReady mudar

  useEffect(() => {
    // Define o componente como pronto assim que ele estiver completamente montado
    setIsReady(true);
  }, []);

  const showPrevious = () => {
    clearInterval(intervalId); // Limpa o intervalo ao navegar manualmente
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const showNext = () => {
    clearInterval(intervalId); // Limpa o intervalo ao navegar manualmente
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0); // Volta para o primeiro slide ao chegar ao último
    }
  };

  return (
    <div className="row featured-container">
      <div className="col">
        <div id="cardCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            {cards.map((group, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <div className="row">
                  {group.map((card, cardIndex) => (
                    <div key={cardIndex} className="col-4">
                      <div className="card">
                        <img
                          src="https://www.kideliciasalgados.com.br/wp-content/uploads/2019/11/coxinha_de_peru_kidelicia.png"
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">{card.title}</h5>
                          <p className="card-text">{card.text}</p>
                          <span>R$ 4,00</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className={`carousel-control-prev d-flex justify-content-start button-slide${
              currentIndex === 0 ? "d-none" : ""
            } carousel-button`}
            href="#cardCarousel"
            role="button"
            data-slide="prev"
            onClick={showPrevious}
          >
            <i className="bi bi-chevron-compact-left" aria-hidden="true"></i>
          </div>
          <div
            className={`carousel-control-next d-flex justify-content-end button-slide ${
              currentIndex === cards.length - 1 ? "d-none" : ""
            } carousel-button`}
            href="#cardCarousel"
            role="button"
            data-slide="next"
            onClick={showNext}
          >
            <i className="bi bi-chevron-compact-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
