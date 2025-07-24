"use client";

import { useState, useEffect } from "react";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { app } from "@/lib/firebase";  // ajusta aqui se o export for diferente

const auth = getAuth(app);

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  async function login() {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Login cancelado pelo usuário.");
      } else if (error.code === "auth/popup-closed-by-user") {
        console.log("Popup fechado pelo usuário.");
      } else {
        console.error("Erro ao fazer login:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <button disabled>Carregando...</button>;

  if (user)
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Olá, {user.email}</p>
        <button onClick={logout} className="btn-logout">
          Sair
        </button>
      </div>
    );

  return (
    <button onClick={login} className="btn-login">
      Entrar com Google
    </button>
  );
}
