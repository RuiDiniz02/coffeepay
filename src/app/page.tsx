"use client";

import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">CoffeePay 🚀</h1>
      <AuthButton />
    </main>
  );
}
