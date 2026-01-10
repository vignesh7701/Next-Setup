import { cn } from "@/app/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-zinc-400 ml-1">
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-2 text-white placeholder:text-zinc-600 focus:border-white/30 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all duration-300",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
      </div>
    );
  }
);
GlassInput.displayName = "GlassInput";

export { GlassInput };