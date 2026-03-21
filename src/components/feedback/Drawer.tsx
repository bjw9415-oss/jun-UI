import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../shared/lib/utils";
import { useScrollLock, useEscapeKey } from "../../hooks";

export type DrawerDirection = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  direction?: DrawerDirection;
  size?: DrawerSize;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  direction = "right", // 기본값은 실무에서 가장 많이 쓰는 우측 패널
  size = "md",
  title,
  description,
  children,
  footer,
  className,
}: DrawerProps) {
  //  스크롤 잠금
  useScrollLock(isOpen);
  //ESC 키 이벤트
  useEscapeKey(onClose, isOpen);
  if (!isOpen) return null;

  //  2. 방향에 따른 CSS 클래스 및 애니메이션 매핑
  const directionConfig = {
    left: "inset-y-0 left-0 border-r border-gray-800 animate-in slide-in-from-left duration-300",
    right:
      "inset-y-0 right-0 border-l border-gray-800 animate-in slide-in-from-right duration-300",
    top: "inset-x-0 top-0 border-b border-gray-800 animate-in slide-in-from-top duration-300",
    bottom:
      "inset-x-0 bottom-0 border-t border-gray-800 animate-in slide-in-from-bottom duration-300",
  };

  //  3. 사이즈 설정 (좌/우는 너비(width) 기준, 상/하는 높이(height) 기준)
  const isHorizontal = direction === "left" || direction === "right";
  const sizeConfig = {
    sm: isHorizontal ? "w-64" : "h-64",
    md: isHorizontal ? "w-80" : "h-80",
    lg: isHorizontal ? "w-96" : "h-96",
    xl: isHorizontal ? "w-[28rem]" : "h-[28rem]",
    full: isHorizontal ? "w-screen" : "h-screen",
  };

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* 어두운 배경 (Backdrop) */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/*  패널 본체 */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed flex flex-col bg-[#161b22] text-white shadow-2xl transition-transform ease-in-out",
          directionConfig[direction],
          sizeConfig[size],
          className,
        )}
      >
        {/* 헤더 영역 (제목 & 닫기 버튼) */}
        <div className="flex items-start justify-between border-b border-gray-800/60 px-6 py-4">
          <div className="flex flex-col gap-1 pr-6">
            {title && (
              <h2 className="text-lg font-bold tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-gray-400">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 opacity-70 transition-opacity hover:bg-gray-800 hover:text-white hover:opacity-100"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">닫기</span>
          </button>
        </div>

        {/* 본문 영역 (스크롤 가능하도록 처리) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 text-gray-300">
          {children}
        </div>

        {/* 푸터 영역 */}
        {footer && (
          <div className="mt-auto border-t border-gray-800/60 px-6 py-4 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
