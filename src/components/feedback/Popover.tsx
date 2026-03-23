import { useRef, useState, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../shared/lib/utils";
import { useClickOutside, useEscapeKey } from "../../hooks";
import type { Direction } from "../../types/ui";

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

export interface PopoverProps extends VariantProps<typeof popoverVariants> {
  content: ReactNode;
  children: ReactNode;
  position: Direction;
  className?: string;
}

export function Popover({
  content,
  children,
  position = "bottom", // 명시적 기본값
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => setIsOpen(false));
  useEscapeKey(() => setIsOpen(false), isOpen);

  return (
    <div className="relative inline-flex" ref={popoverRef}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer inline-flex"
      >
        {children}
      </div>

      {isOpen && (
        <div
          role="dialog"
          className={cn(popoverVariants({ position }), className)}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      )}
    </div>
  );
}
