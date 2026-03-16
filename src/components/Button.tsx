import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../shared/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyle =
    "rounded-lg font-medium transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
    icon: "w-12 h-12 p-0 flex items-center justify-center",
  };
  const variants = {
    primary:
      "bg-[#00a2ff] text-white hover:bg-[#008bd9] shadow-[0_0_15px_rgba(0,162,255,0.3)] hover:shadow-[0_0_20px_rgba(0,162,255,0.6)]",
    outline:
      "border-2 border-[#30363d] text-gray-300 hover:border-[#00a2ff] hover:text-[#00a2ff] bg-transparent",
    danger:
      "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
  };
  return (
    <button
      className={cn(baseStyle, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
