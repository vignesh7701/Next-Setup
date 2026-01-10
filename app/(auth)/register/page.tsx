"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { GlassInput } from "@/app/components/ui/GlassInput";
import { GlassButton } from "@/app/components/ui/GlassButton";
import { UserPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { registerUser } from "@/app/actions/auth-actions";

export default function RegisterPage() {
  const [name, setName] = useState("");
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
      const result = await registerUser({ name, email, password });

      if (result.success) {
        router.push("/login");
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      console.log("Registration failed", err);
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
            <UserPlus size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-gray-400">Join us and start your journey</p>
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
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          
          <GlassButton type="submit" className="w-full group" isLoading={loading}>
            Create Account
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </GlassButton>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-white hover:text-zinc-300 hover:underline">
            Sign In
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}