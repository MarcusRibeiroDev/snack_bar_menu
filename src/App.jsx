// Context do usuário autenticado e bloquear páginas, depois login e logout
// Firebase
import { db } from "./firebase/config";

// Context
import { AuthProvider } from "./context/AuthContext";

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
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Orders from "./pages/Orders/Orders";

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
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home ScreenSize={ScreenSize} />} />
              <Route path="orders" element={<Orders />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
