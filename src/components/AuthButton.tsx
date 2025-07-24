import { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null); // aqui dizemos que user é User OU null

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <button onClick={login}>
      {user ? `Olá, ${user.displayName}` : "Login com Google"}
    </button>
  );
}
