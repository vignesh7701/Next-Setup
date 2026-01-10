"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassButton } from "@/app/components/ui/GlassButton";
import { LogOut, User, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#121212] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center sm:justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">  
          <span className="text-xl font-bold tracking-tight text-white">Next</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {session ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 transition-all hover:bg-zinc-800 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/10"
              >
                <User size={16} className="text-zinc-400" />
                <span className="text-sm font-medium text-zinc-200">
                  {session.user?.name}
                </span>
                <ChevronDown 
                  size={14} 
                  className={`text-zinc-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-zinc-800 bg-zinc-950/90 p-1 shadow-2xl backdrop-blur-xl ring-1 ring-black/5"
                  >
                    <div className="px-3 py-2.5 border-b border-zinc-800/50 mb-1">
                      <p className="text-xs text-zinc-500 mb-0.5">Signed in as</p>
                      <p className="text-sm font-medium text-zinc-200 truncate">{session.user?.email}</p>
                    </div>
                    
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-4"> 
              <Link href="/login">
                <GlassButton variant="ghost" className="h-9 px-4 text-sm">
                  Sign In
                </GlassButton>
              </Link>
              <Link href="/register">
                <GlassButton className="h-9 px-4 text-sm bg-white text-black hover:bg-zinc-200">
                  Register
                </GlassButton>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800 bg-black backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {session ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2 text-zinc-300">
                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                        <User size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">{session.user?.name}</span>
                        <span className="text-xs text-zinc-500">{session.user?.email}</span>
                    </div>
                  </div>
                  <GlassButton variant="ghost" onClick={() => signOut()} className="w-full justify-start text-red-400 hover:bg-red-900/10">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </GlassButton>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <GlassButton variant="ghost" className="w-full justify-center">Sign In</GlassButton>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <GlassButton className="w-full justify-center bg-white text-black">Register</GlassButton>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}