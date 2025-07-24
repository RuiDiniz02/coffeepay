import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5zuby3AE7VgRQCCgSlZXWsA1c1kQj9qc",
  authDomain: "coffeepay-52c87.firebaseapp.com",
  projectId: "coffeepay-52c87",
  storageBucket: "coffeepay-52c87.firebasestorage.app",
  messagingSenderId: "569104237151",
  appId: "1:569104237151:web:47212fbee6b1fb1bbc11ea",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Exportar auth e db para usar em outras partes do código
export const auth = getAuth(app);
export const db = getFirestore(app);
