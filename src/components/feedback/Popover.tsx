import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import { useClickOutside, useEscapeKey } from "@/hooks";
import type { Direction } from "@/types/ui";
import { useFocusTrap } from "@/hooks/useFocusTrap";
const popoverVariants = cva(
  "absolute z-50 w-72 rounded-xl bg-[#1c222b] border border-gray-700 p-4 text-sm text-white shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200",
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
        left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
        right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
      },
    },
    defaultVariants: {
      position: "bottom",
    },
  },
);
export interface PopoverProps {
  content: ReactNode;
  children: ReactNode;
  position?: Direction; // 명시적 타입
  className?: string;
}
export function Popover({
  content,
  children,
  position = "bottom", // 명시적 기본값
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCloseWithFocusReturn = useCallback(() => {
    setIsOpen(false);
    // 트리거 안에 있는 실제 요소(ex: Button)를 찾아서 포커스 복귀
    const triggerChild = triggerRef.current?.firstElementChild as HTMLElement;
    if (triggerChild && typeof triggerChild.focus === "function") {
      triggerChild.focus();
    } else {
      triggerRef.current?.focus();
    }
  }, []);
  useClickOutside(containerRef, () => setIsOpen(false));
  useEscapeKey(handleCloseWithFocusReturn, isOpen);
  useFocusTrap(contentRef, isOpen);
  return (
    <div className="relative inline-flex" ref={containerRef}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={-1}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        className="cursor-pointer inline-flex"
      >
        {children}
      </div>

      {isOpen && (
        <div
          ref={contentRef}
          id={popoverId} // 트리거의 aria-controls와 연결되는 ID
          role="dialog"
          aria-modal="true" // 포커스 트랩이 있으므로 모달 취급
          className={cn(popoverVariants({ position }), className)}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1} // 포커스 트랩이 정확히 잡을 수 있도록 보조
        >
          {content}
        </div>
      )}
    </div>
  );
}
