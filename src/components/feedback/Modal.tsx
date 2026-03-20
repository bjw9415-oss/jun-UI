import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../shared/lib/utils";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useEscapeKey } from "../../hooks/useEscapeKey";

export interface ModalProps {
  /** 모달이 열려있는지 여부 */
  isOpen: boolean;
  /** 모달을 닫는 함수 */
  onClose: () => void;
  /** 모달의 제목 */
  title?: ReactNode;
  /** 모달의 설명 (선택) */
  description?: ReactNode;
  /** 모달 내부 컨텐츠 */
  children: ReactNode;
  /** 하단 버튼 영역 (선택) */
  footer?: ReactNode;
  /** 모달 최대 너비 사이즈 */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** 외부 클래스 주입 */
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  //  스크롤 잠금 로직
  useScrollLock(isOpen);

  //  ESC 키 처리 로직
  useEscapeKey(onClose, isOpen);

  // 열려있지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  // 사이즈별 최대 너비 설정
  const sizeConfig = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100vw-2rem)]",
  };

  // 2. createPortal을 사용하여 body 태그 바로 아래에 렌더링
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* 어두운 배경 (Backdrop) - 클릭 시 닫힘 */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 모달 컨텐츠 박스 */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative flex w-full flex-col gap-4 rounded-2xl border border-gray-800 bg-[#161b22] p-6 text-white shadow-2xl transition-all",
          // 팝업 애니메이션 (아래에서 위로 살짝 올라오며 커짐)
          "animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out",
          sizeConfig[size],
          className,
        )}
      >
        {/* 우측 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 opacity-70 transition-opacity hover:bg-gray-800 hover:text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00a2ff] focus:ring-offset-2 focus:ring-offset-[#161b22]"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">닫기</span>
        </button>

        {/* 헤더 영역 (제목 & 설명) */}
        {(title || description) && (
          <div className="flex flex-col gap-1.5 pr-6">
            {title && (
              <h2 className="text-xl font-bold tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* 본문 영역 */}
        <div className="py-2 text-gray-300">{children}</div>

        {/* 푸터 영역 (버튼 등) */}
        {footer && (
          <div className="mt-2 flex items-center justify-end gap-3 border-t border-gray-800/60 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
