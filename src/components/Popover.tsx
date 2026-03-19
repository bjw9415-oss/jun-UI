import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../shared/lib/utils";

export type PopoverPosition = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  /** 툴팁 안에 들어갈 내용 (텍스트 또는 요소) */
  content: ReactNode;
  /** 팝오버를 열 트리거 요소 (버튼 등) */
  children: ReactNode;
  /** 팝오버가 나타날 방향 */
  position?: PopoverPosition;
  /** 추가 커스텀 클래스 */
  className?: string;
}
export default function Popover({
  content,
  children,
  position = "bottom",
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  const positionConfig = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
  };

  return (
    <div className="relative inline-flex" ref={popoverRef}>
      {/*  트리거 요소 (클릭 시 토글) */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer inline-flex"
      >
        {children}
      </div>

      {/*  팝오버 본체 (내부 클릭 시 안 닫힘) */}
      {isOpen && (
        <div
          role="dialog"
          className={cn(
            "absolute z-50 w-72 rounded-xl bg-[#1c222b] border border-gray-700 p-4 text-sm text-white shadow-2xl transition-all",
            "animate-in fade-in zoom-in-95 duration-200",
            positionConfig[position],
            className,
          )}
          // 팝오버 내부를 클릭해도 이벤트가 위로 전파되어 닫히는 것을 방지
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      )}
    </div>
  );
}
