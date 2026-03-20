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
import { cn } from "../../shared/lib/utils";

// 1. 위치(Position) 타입 추가(총 6방향 지원)
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export type ToastVariant = "default" | "success" | "danger" | "warning";

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

  // 3. 위치에 따른 컨테이너 CSS 매핑
  const positionClasses = {
    "top-right": "top-0 right-0 flex-col",
    "top-left": "top-0 left-0 flex-col",
    "top-center": "top-0 left-1/2 -translate-x-1/2 flex-col",
    "bottom-right": "bottom-0 right-0 flex-col",
    "bottom-left": "bottom-0 left-0 flex-col",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 flex-col",
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {typeof window !== "undefined" &&
        createPortal(
          <div
            className={cn(
              "fixed z-50 m-4 flex w-full max-w-sm gap-3 sm:m-6 pointer-events-none",
              positionClasses[position],
            )}
          >
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
  const variantConfig = {
    default: {
      bg: "bg-[#161b22] border-gray-800 text-white",
      icon: <Info className="h-5 w-5 text-[#00a2ff]" />,
    },
    success: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-500",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    danger: {
      bg: "bg-red-500/10 border-red-500/30 text-red-500",
      icon: <AlertCircle className="h-5 w-5" />,
    },
    warning: {
      bg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-500",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
  };

  const config = variantConfig[toast.variant || "default"];

  // 위치에 따라 날아오는 애니메이션 방향 다르게 설정
  const slideAnimation = {
    "top-right": "slide-in-from-right-full",
    "top-left": "slide-in-from-left-full",
    "top-center": "slide-in-from-top-full",
    "bottom-right": "slide-in-from-right-full",
    "bottom-left": "slide-in-from-left-full",
    "bottom-center": "slide-in-from-bottom-full",
  };

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border p-4 shadow-lg transition-all",
        "animate-in fade-in duration-300",
        slideAnimation[position], // 방향에 맞는 슬라이드 애니메이션 적용!
        config.bg,
      )}
    >
      <div className="shrink-0 pt-0.5">{config.icon}</div>
      <div className="flex flex-1 flex-col gap-1">
        <h3
          className={cn(
            "text-sm font-semibold",
            toast.variant ? "" : "text-white",
          )}
        >
          {toast.title}
        </h3>
        {toast.description && (
          <p
            className={cn(
              "text-sm opacity-90",
              toast.variant ? "" : "text-gray-400",
            )}
          >
            {toast.description}
          </p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 rounded-lg p-1 opacity-70 transition-opacity hover:bg-black/20 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
