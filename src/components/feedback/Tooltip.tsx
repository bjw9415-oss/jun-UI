import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";
import type { Direction } from "@/types/ui";
import { useEscapeKey } from "@/hooks/useEscapeKey";

// 툴팁 본체 스타일 및 위치 CVA
const tooltipVariants = cva(
  "absolute z-50 whitespace-nowrap rounded-md bg-[#1c222b] border border-gray-700 px-3 py-1.5 text-xs text-white shadow-xl transition-all duration-200 pointer-events-none",
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
      position: "top",
    },
  },
);

// 툴팁 꼬리(화살표) 위치 CVA
const tooltipArrowVariants = cva("absolute w-0 h-0 border-[5px]", {
  variants: {
    position: {
      top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-[#1c222b] border-l-transparent border-r-transparent border-b-transparent",
      bottom:
        "top-[-4px] left-1/2 -translate-x-1/2 border-b-[#1c222b] border-l-transparent border-r-transparent border-t-transparent",
      left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-[#1c222b] border-t-transparent border-b-transparent border-r-transparent",
      right:
        "left-[-4px] top-1/2 -translate-y-1/2 border-r-[#1c222b] border-t-transparent border-b-transparent border-l-transparent",
    },
  },
  defaultVariants: {
    position: "top",
  },
});

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: Direction;
  className?: string;
}
export function Tooltip({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  useEscapeKey(() => setIsVisible(false), isVisible);
  const trigger = isValidElement(children)
    ? cloneElement(
        children as React.ReactElement<{ "aria-describedby"?: string }>,
        {
          "aria-describedby": isVisible ? tooltipId : undefined,
        },
      )
    : children;
  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {/* 트리거 요소 */}
      {trigger}

      {/*  툴팁 본체 */}
      <div
        id={tooltipId}
        role="tooltip"
        aria-hidden={!isVisible}
        className={cn(
          tooltipVariants({ position }),
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className,
        )}
      >
        {content}

        {/*  꼬리 (화살표) */}
        <div className={tooltipArrowVariants({ position })} />
      </div>
    </div>
  );
}
