import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../shared/lib/utils";
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export type AlertVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "outline"
  | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode; // 커스텀 아이콘을 넣을 수도 있게 열어둡니다.
}

export default function Alert({
  className,
  variant = "default",
  title,
  icon,
  children,
  ...props
}: AlertProps) {
  // 상태별 아이콘 및 색상 테마 매핑
  const variantConfig = {
    default: {
      wrapper: "bg-[#161b22] border-gray-800 text-gray-300",
      icon: icon || <Info className="h-5 w-5 text-gray-400" />,
      title: "text-white",
    },
    info: {
      wrapper: "bg-[#00a2ff]/10 border-[#00a2ff]/20 text-[#00a2ff]",
      icon: icon || <Info className="h-5 w-5 text-[#00a2ff]" />,
      title: "text-[#00a2ff]",
    },
    success: {
      wrapper: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      icon: icon || <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
      title: "text-emerald-500",
    },
    warning: {
      wrapper: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
      icon: icon || <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      title: "text-yellow-500",
    },
    danger: {
      wrapper: "bg-red-500/10 border-red-500/20 text-red-400",
      icon: icon || <XCircle className="h-5 w-5 text-red-500" />,
      title: "text-red-500",
    },
    outline: {
      wrapper: "bg-transparent border-gray-700 text-gray-400",
      icon: icon || <Info className="h-5 w-5 text-gray-500" />,
      title: "text-gray-300",
    },
  };

  const config = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-4 flex gap-3",
        config.wrapper,
        className,
      )}
      {...props}
    >
      {/*  좌측 아이콘 영역 */}
      <div className="shrink-0 mt-0.5">{config.icon}</div>

      {/*  우측 텍스트 컨텐츠 영역 */}
      <div className="flex-1 flex flex-col gap-1.5">
        {title && (
          <h5
            className={cn(
              "font-semibold leading-none tracking-tight",
              config.title,
            )}
          >
            {title}
          </h5>
        )}
        <div className="text-sm opacity-90 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
