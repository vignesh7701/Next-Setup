"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { GlassInput } from "@/app/components/ui/GlassInput";
import { GlassButton } from "@/app/components/ui/GlassButton";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <GlassCard className="w-full max-w-md py-10 px-8">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-white ring-1 ring-zinc-700 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <Lock size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-400">Sign in to access your dashboard</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-300"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <GlassInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <GlassInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 cursor-pointer">
              <input type="checkbox" className="rounded border-zinc-700 bg-zinc-900 text-white focus:ring-white/20" />
              Remember me
            </label>
            <a href="#" className="text-zinc-400 hover:text-white hover:underline">Forgot password?</a>
          </div>

          <GlassButton type="submit" className="w-full group" isLoading={loading}>
            Sign In 
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </GlassButton>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-white hover:text-zinc-300 hover:underline">
            Register now
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}