"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface GlassButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

export function GlassButton({
  children,
  className,
  variant = "primary",
  isLoading,
  disabled,
  ...props
}: GlassButtonProps) {
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    secondary: "bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800",
    danger: "bg-red-600 text-white border-red-500 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.2)]",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 border-transparent",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex items-center justify-center rounded-xl border px-6 py-3 font-medium transition-all duration-300 backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </motion.button>
  );
}
