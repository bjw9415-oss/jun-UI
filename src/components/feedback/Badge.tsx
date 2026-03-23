import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { AsChildProp } from "../../types/ui";

// cva를 사용해 버튼의 "스타일 사전"을 정의
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#21262d] text-gray-300 border-gray-700",
        info: "bg-[#00a2ff]/10 text-[#00a2ff] border-[#00a2ff]/20",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        danger: "bg-red-500/10 text-red-400 border-red-500/20",
        warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        outline: "text-gray-400 border-gray-700 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
export type BadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>["variant"]
>;
export interface BadgeProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants>,
    AsChildProp {}
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, className }))}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";
