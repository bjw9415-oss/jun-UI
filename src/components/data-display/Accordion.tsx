import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { ChevronDown } from "lucide-react";

// Context 설정: 현재 열려있는 아이템들을 추적
type AccordionContextValue = {
  type: "single" | "multiple";
  value: string[];
  toggleValue: (val: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

//  최상위 부모: 상태를 관리하고 하위로 뿌려줍니다.
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", defaultValue, className, ...props }, ref) => {
    // 초기값 배열화 방어 로직
    const initialValue = Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue
        ? [defaultValue]
        : [];

    const [value, setValue] = React.useState<string[]>(initialValue);

    const toggleValue = (itemValue: string) => {
      if (type === "single") {
        // 단일 모드: 누른 게 이미 열려있으면 닫고(빈 배열), 아니면 그것만 엶
        setValue((prev) => (prev[0] === itemValue ? [] : [itemValue]));
      } else {
        // 다중 모드: 이미 있으면 빼고, 없으면 배열에 추가
        setValue((prev) =>
          prev.includes(itemValue)
            ? prev.filter((v) => v !== itemValue)
            : [...prev, itemValue],
        );
      }
    };

    return (
      <AccordionContext.Provider value={{ type, value, toggleValue }}>
        <div ref={ref} className={cn("w-full", className)} {...props} />
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

//  개별 아이템 영역 (각각의 패널 단위)
const AccordionItemContext = React.createContext<{
  value: string;
  isOpen: boolean;
} | null>(null);

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string; // 각 아이템의 고유 ID
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context)
      throw new Error("AccordionItem must be used within Accordion");

    const isOpen = context.value.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          className={cn("border-b border-gray-800", className)}
          {...props}
        />
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

//  클릭하는 버튼 (헤더) 영역
const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const rootContext = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!rootContext || !itemContext) throw new Error("AccordionTrigger error");

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        onClick={() => rootContext.toggleValue(itemContext.value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:text-[#00a2ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] text-gray-200",
          className,
        )}
        {...props}
      >
        {children}
        {/* 열릴 때 아이콘이 180도 부드럽게 회전합니다 */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-500 transition-transform duration-300 ease-in-out",
            itemContext.isOpen && "rotate-180 text-[#00a2ff]",
          )}
        />
      </button>
    </div>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// 숨겨진 내용이 펼쳐지는 영역 (애니메이션 핵심 포인트!)
const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const itemContext = React.useContext(AccordionItemContext);
  if (!itemContext) throw new Error("AccordionContent error");

  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        // CSS Grid 마법: 열리면 1fr(가변 높이 전체), 닫히면 0fr(높이 0)
        itemContext.isOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "pb-4 pt-1 text-sm text-gray-400 leading-relaxed",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
