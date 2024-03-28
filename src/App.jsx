import { useState, useEffect } from "react";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [ScreenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ScreenSize]); // Monitorando o tamanho da tela do usuário

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container-custom">
          <div className="content-image"></div>
        </div>
        <div className="d-flex">
          <main className="col-9 container d-flex align-items-center flex-column">
            <div className="div-information-container">
              <img
                src="https://w7.pngwing.com/pngs/784/842/png-transparent-new-york-city-domain-name-registrar-generic-top-level-domain-others-blue-text-logo.png"
                alt=""
              />
              <div className="div-information">
                <span>Restaurante Tailândes</span>
                <div>
                  <span>Apenas agendamento • Abrimos amanhã às 07h00</span>
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>Itu, SP</span>
                </div>
              </div>
            </div>
          </main>
          {ScreenSize > 992 && <article className="col-3">ARTICLE</article>}
        </div>
      </div>
    </>
  );
}

export default App;
