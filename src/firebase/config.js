import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADSHDc8lMBn2bRKDoChdlgHQMJxE6xQJ0",
  authDomain: "restaurante-pedidos-17de6.firebaseapp.com",
  projectId: "restaurante-pedidos-17de6",
  storageBucket: "restaurante-pedidos-17de6.appspot.com",
  messagingSenderId: "21530714081",
  appId: "1:21530714081:web:831223b9d4149667b7fca0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
