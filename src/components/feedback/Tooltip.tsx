import { useState, type ReactNode } from "react";
import { cn } from "../../shared/lib/utils";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** 툴팁 안에 들어갈 내용 (텍스트 또는 요소) */
  content: ReactNode;
  /** 툴팁을 띄울 기준이 되는 타겟 요소 */
  children: ReactNode;
  /** 툴팁이 나타날 방향 */
  position?: TooltipPosition;
  /** 추가 커스텀 클래스 */
  className?: string;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  //  1. 방향에 따른 툴팁 본체 위치 (absolute)
  const positionConfig = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
  };

  //  2. 방향에 따른 말풍선 꼬리(화살표) 위치
  const arrowConfig = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-t-[#1c222b] border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "top-[-4px] left-1/2 -translate-x-1/2 border-b-[#1c222b] border-l-transparent border-r-transparent border-t-transparent",
    left: "right-[-4px] top-1/2 -translate-y-1/2 border-l-[#1c222b] border-t-transparent border-b-transparent border-r-transparent",
    right:
      "left-[-4px] top-1/2 -translate-y-1/2 border-r-[#1c222b] border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      // 웹 접근성: 키보드 Tab 키로 포커스가 갔을 때도 툴팁이 보이도록 처리
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {/* 툴팁을 띄우는 트리거 요소 (버튼 등) */}
      {children}

      {/*  툴팁 본체 */}
      <div
        role="tooltip"
        className={cn(
          "absolute z-50 whitespace-nowrap rounded-md bg-[#1c222b] border border-gray-700 px-3 py-1.5 text-xs text-white shadow-xl transition-all duration-200 pointer-events-none",
          positionConfig[position],
          // 페이드 인 & 살짝 떠오르는 애니메이션
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className,
        )}
      >
        {content}

        {/*  꼬리 (화살표) - CSS Border 트릭 사용 */}
        <div
          className={cn("absolute w-0 h-0 border-[5px]", arrowConfig[position])}
        />
      </div>
    </div>
  );
}
