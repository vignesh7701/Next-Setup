"use client";

import { useSession } from "next-auth/react";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { GlassButton } from "@/app/components/ui/GlassButton";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Lock, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
 

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-20">
      <main className="flex flex-col items-center justify-center w-full max-w-5xl gap-12 text-center">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >


          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-white">
            <span className="block text-zinc-400">Build modern</span>
            <span className="block">Next.js Applications</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-zinc-500 sm:text-xl">
            A minimalist, high-contrast template equipped with NextAuth, MongoDB, and a sleek monochromatic UI.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {!session ? (
              <>
                <Link href="/register">
                  <GlassButton className=" h-12 text-lg bg-white text-black hover:bg-zinc-200">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/login">
                  <GlassButton variant="secondary" className="h-12 text-lg">
                    Sign In
                  </GlassButton>
                </Link>
              </>
            ) : (
              <GlassCard className="py-2 px-6 flex items-center gap-3 border-zinc-800 bg-zinc-900/50">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <span className="text-zinc-400">Welcome back, <span className="font-bold text-white">{session.user?.name}</span></span>
              </GlassCard>
            )}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-16"
        >
          <FeatureCard
            icon={<Lock />}
            title="Secure Auth"
            description="NextAuth v4 integration with credential provider and bcrypt encryption."
            delay={0}
          />
          <FeatureCard
            icon={<Database />}
            title="MongoDB"
            description="Mongoose for elegant object modeling and database interaction."
            delay={0.1}
          />
          <FeatureCard
            icon={<Zap />}
            title="Fast UI"
            description="Tailwind CSS v4 & Framer Motion for glassy, smooth animations."
            delay={0.2}
          />
          <FeatureCard
            icon={<Code />}
            title="TypeScript"
            description="Type-safe codebase for better developer experience and reliability."
            delay={0.3}
          />
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}>
      <GlassCard hoverEffect className="h-full text-left border-zinc-800 bg-zinc-900/30 group">
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-zinc-800 p-3 ring-1 ring-zinc-700 group-hover:bg-white group-hover:text-black transition-colors duration-300">
          <div className="group-hover:text-black transition-colors duration-300">
            {icon}
          </div>
        </div>
        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-white transition-colors">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  )
}