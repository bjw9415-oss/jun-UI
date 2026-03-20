import { type HTMLAttributes } from "react";
import { cn } from "../../shared/lib/utils";

export type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "info"
  | "warning"
  | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

export default function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#21262d] text-gray-300 border-gray-700",
    info: "bg-[#00a2ff]/10 text-[#00a2ff] border-[#00a2ff]/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    outline: "text-gray-400 border-gray-700 bg-transparent",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
