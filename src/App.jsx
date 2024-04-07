// Hooks
import { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

// CSS
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import RegisterLogin from "./pages/Register-Login/Register-Login";

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
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home ScreenSize={ScreenSize} />} />
            <Route path="/register-login" element={<RegisterLogin />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
