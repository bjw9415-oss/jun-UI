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
import { cn } from "../shared/lib/utils";

// 1. 타입 정의
export type ToastVariant = "default" | "success" | "danger" | "warning";

export interface ToastMessage {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number; // 밀리초 단위 (기본값: 3000ms)
}

// 2. Context 정의
interface ToastContextType {
  toast: (props: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

// 3. 커스텀 훅 (다른 컴포넌트에서 쉽게 쓰기 위함)
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast는 ToastProvider 내부에서 사용되어야 합니다.");
  return context;
};

// 4. Provider 컴포넌트 (최상단에서 앱을 감싸줄 녀석)
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  // 토스트 추가 함수
  const toast = useCallback(
    (props: Omit<ToastMessage, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, ...props }]);

      // 지정된 시간이 지나면 자동 삭제
      if (props.duration !== Infinity) {
        setTimeout(() => {
          removeToast(id);
        }, props.duration || 3000);
      }
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* 화면 우측 하단에 포탈로 렌더링되는 컨테이너 */}
      {typeof window !== "undefined" &&
        createPortal(
          <div className="fixed bottom-0 right-0 z-50 m-4 flex w-full max-w-sm flex-col gap-3 sm:m-6 pointer-events-none">
            {toasts.map((t) => (
              <ToastItem
                key={t.id}
                toast={t}
                onRemove={() => removeToast(t.id)}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

// 5. 개별 Toast UI 컴포넌트
const ToastItem = ({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: () => void;
}) => {
  // Variant에 따른 스타일 및 아이콘 매핑
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

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border p-4 shadow-lg transition-all",
        // 애니메이션: 우측에서 미끄러져 들어옴
        "animate-in slide-in-from-right-full fade-in duration-300",
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
