"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-xl",
        "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500",
        hoverEffect && "hover:before:opacity-100 hover:border-white/20 transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
