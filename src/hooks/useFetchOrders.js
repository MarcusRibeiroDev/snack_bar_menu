import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthValue } from "../context/AuthContext";

export const useFetchOrders = () => {
  const { user } = useAuthValue();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const fetchOrders = async () => {
    checkIfIsCancelled();

    try {
      if (!user) {
        // Se o usuário não estiver definido, retornar sem fazer nada
        return;
      }

      const userUid = user.uid;

      // Criar uma query para buscar os pedidos do usuário atual
      const q = query(collection(db, "pedidos", userUid, "meus_pedidos"));

      // Executar a query e obter os documentos
      const querySnapshot = await getDocs(q);

      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Erro ao buscar pedidos: ", error);
      setError("Ocorreu um erro ao buscar os pedidos.");
    }
  };

  useEffect(() => {
    fetchOrders();

    return () => setCancelled(true);
  }, []);

  return {
    orders,
    setOrders,
    fetchOrders,
    error,
  };
};
