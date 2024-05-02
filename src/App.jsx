// Começar a fazer o envio do pedido pro whatsapp, criar a página de pedidos e recuperar os dados do firestore

// Firebase
import { db } from "./firebase/config";

// Context
import { AuthProvider } from "./context/AuthContext";

// Hooks
import { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "./hooks/useAuthentication";

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

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ScreenSize]); // Monitorando o tamanho da tela do usuário

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div>
        <AuthProvider value={{ user }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home ScreenSize={ScreenSize} />} />
              <Route
                path="orders"
                element={user ? <Orders /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
