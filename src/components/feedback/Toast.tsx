import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const toastContainerVariants = cva(
  "fixed z-50 m-4 flex w-full max-w-sm gap-3 sm:m-6 pointer-events-none",
  {
    variants: {
      position: {
        "top-right": "top-0 right-0 flex-col",
        "top-left": "top-0 left-0 flex-col",
        "top-center": "top-0 left-1/2 -translate-x-1/2 flex-col",
        "bottom-right": "bottom-0 right-0 flex-col",
        "bottom-left": "bottom-0 left-0 flex-col",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 flex-col",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  },
);

const toastItemVariants = cva(
  "pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border p-4 shadow-lg transition-all animate-in fade-in duration-300",
  {
    variants: {
      variant: {
        default: "bg-[#161b22] border-gray-800 text-white",
        success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
        danger: "bg-red-500/10 border-red-500/30 text-red-500",
        warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-500",
      },
      position: {
        "top-right": "slide-in-from-right-full",
        "top-left": "slide-in-from-left-full",
        "top-center": "slide-in-from-top-full",
        "bottom-right": "slide-in-from-right-full",
        "bottom-left": "slide-in-from-left-full",
        "bottom-center": "slide-in-from-bottom-full",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom-right",
    },
  },
);

const toastIconVariants = cva("h-5 w-5", {
  variants: {
    variant: {
      default: "text-primary",
      success: "",
      danger: "",
      warning: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type ToastVariant = "default" | "success" | "danger" | "warning";

const iconMap = {
  default: Info,
  success: CheckCircle2,
  danger: AlertCircle,
  warning: AlertTriangle,
} as const;

export interface ToastMessage {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (props: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast는 ToastProvider 내부에서 사용되어야 합니다.");
  return context;
};

//2. Provider에 position Props 추가 (기본값은 bottom-right)
interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
}

export const ToastProvider = ({
  children,
  position = "bottom-right",
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (props: Omit<ToastMessage, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) =>
        position.includes("top")
          ? [{ id, ...props }, ...prev]
          : [...prev, { id, ...props }],
      );

      if (props.duration !== Infinity) {
        setTimeout(() => {
          removeToast(id);
        }, props.duration || 3000);
      }
    },
    [removeToast, position],
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <div className={cn(toastContainerVariants({ position }))}>
            {toasts.map((t) => (
              <ToastItem
                key={t.id}
                toast={t}
                onRemove={() => removeToast(t.id)}
                position={position}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

// 4. ToastItem 애니메이션 방향 설정
const ToastItem = ({
  toast,
  onRemove,
  position,
}: {
  toast: ToastMessage;
  onRemove: () => void;
  position: ToastPosition;
}) => {
  const variant = toast.variant || "default";
  const Icon = iconMap[variant];

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={toastItemVariants({ variant, position })}
    >
      <div className="shrink-0 pt-0.5">
        <Icon className={toastIconVariants({ variant })} aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3
          className={cn(
            "text-sm font-semibold",
            variant === "default" && "text-white",
          )}
        >
          {toast.title}
        </h3>
        {toast.description && (
          <p
            className={cn(
              "text-sm opacity-90",
              variant === "default" && "text-gray-400",
            )}
          >
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={onRemove}
        aria-label="알림 닫기"
        className="shrink-0 rounded-lg p-1 opacity-70 transition-opacity hover:bg-black/20 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
