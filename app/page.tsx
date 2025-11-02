"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [inverted, setInverted] = useState(false);

  return (
    <div
      className={`flex min-h-screen items-center justify-center font-sans ${inverted ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <main className="relative flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 sm:items-center">
        <Image
          className={inverted ? "invert" : ""}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <button
          aria-pressed={inverted}
          onClick={() => setInverted((v) => !v)}
          className={`absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-2 shadow focus:outline-none ${
            inverted ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          {inverted ? "Normal" : "Invert"}
        </button>
      </main>
    </div>
  );
}
