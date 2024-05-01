import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuthValue } from "../context/AuthContext";

export const useCreateOrder = () => {
  const { user } = useAuthValue();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const saveOrder = async (order) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const userUid = user.uid;

      // Referência para a coleção de pedidos do usuário
      const userOrdersRef = collection(db, "pedidos", userUid, "meus_pedidos");

      // Adicionar o pedido ao Firestore
      await addDoc(userOrdersRef, order);

      setLoading(false);
    } catch (error) {
      console.error("Erro ao salvar pedido: ", error);
      setLoading(false);
      setError("Ocorreu um erro ao salvar o pedido.");
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    saveOrder,
    error,
    loading,
  };
};
