import { forwardRef, useId, type HTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

// Alert 컨테이너 스타일
const alertVariants = cva("relative w-full rounded-xl border p-4 flex gap-3", {
  variants: {
    variant: {
      default: "bg-[#161b22] border-gray-800 text-gray-300",
      info: "bg-primary/10 border-primary/20 text-primary",
      success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
      danger: "bg-red-500/10 border-red-500/20 text-red-400",
      outline: "bg-transparent border-gray-700 text-gray-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// 타이틀 스타일
const alertTitleVariants = cva("font-semibold leading-none tracking-tight", {
  variants: {
    variant: {
      default: "text-white",
      info: "text-primary",
      success: "text-emerald-500",
      warning: "text-yellow-500",
      danger: "text-red-500",
      outline: "text-gray-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

//  아이콘 스타일도 CVA로 관리
const alertIconVariants = cva("h-5 w-5", {
  variants: {
    variant: {
      default: "text-gray-400",
      info: "text-primary",
      success: "text-emerald-500",
      warning: "text-yellow-500",
      danger: "text-red-500",
      outline: "text-gray-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type AlertVariant = NonNullable<
  VariantProps<typeof alertVariants>["variant"]
>;

// 아이콘 컴포넌트 매핑 (색상 제거)
const iconMap: Record<AlertVariant, typeof Info> = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
  outline: Info,
} as const;
const getDefaultIcon = (variant: AlertProps["variant"], iconClass: string) => {
  const IconComponent = iconMap[variant ?? "default"];
  return <IconComponent className={iconClass} aria-hidden="true" />;
};
export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  icon?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, icon, children, ...props }, ref) => {
    const iconClass = alertIconVariants({ variant });
    const titleId = useId();
    const descId = useId();
    return (
      <div
        ref={ref}
        role="alert"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={children ? descId : undefined}
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        <div className="shrink-0 mt-0.5">
          {icon || getDefaultIcon(variant, iconClass)}
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          {title && (
            <h5 id={titleId} className={alertTitleVariants({ variant })}>
              {title}
            </h5>
          )}
          <div id={descId} className="text-sm opacity-90 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    );
  },
);

Alert.displayName = "Alert";
