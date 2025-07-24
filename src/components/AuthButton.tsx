"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Depois do redirect, o Firebase devolve o resultado aqui (se precisares de o usar)
    getRedirectResult(auth).catch((e) => {
      console.error("Erro no redirect do Google:", e);
    });

    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <button
        disabled
        className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
      >
        A carregar...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p>Olá, {user.displayName}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Login com Google
    </button>
  );
}
