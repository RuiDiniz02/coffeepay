"use client"; // necessário para usar hooks React e código cliente

import app from "@/lib/firebase";

export default function Home() {
  console.log("Firebase app:", app);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">CoffeePay 🚀</h1>
    </main>
  );
}
