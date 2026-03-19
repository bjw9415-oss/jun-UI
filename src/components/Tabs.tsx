import * as React from "react";
import { cn } from "../shared/lib/utils";

//  1. Context 생성: "지금 어떤 탭이 선택되어 있니?"를 공유하는 공간
const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

//  2. 최상위 부모: Context Provider 역할
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, className, ...props }, ref) => {
    // 제어(Controlled) / 비제어(Uncontrolled) 컴포넌트 패턴 동시 지원
    const [tab, setTab] = React.useState(value || defaultValue || "");
    const handleValueChange = (newValue: string) => {
      setTab(newValue);
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider
        value={{
          value: value !== undefined ? value : tab,
          onValueChange: handleValueChange,
        }}
      >
        <div ref={ref} className={className} {...props} />
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

//  3. 탭 버튼들의 컨테이너 (회색 배경 박스)
const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-lg bg-[#0a0d12] p-1 text-gray-400 border border-gray-800",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

//  4. 개별 탭 버튼 (클릭하면 상태 변경)
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isSelected = context.value === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        onClick={() => context.onValueChange(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-[#0a0d12] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isSelected
            ? "bg-[#161b22] text-white shadow-sm border border-gray-700" // 선택됐을 때 (도드라짐)
            : "hover:text-gray-200 border border-transparent", // 안 선택됐을 때
          className,
        )}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

//  5. 개별 탭의 내용 (선택된 탭과 value가 같을 때만 렌더링)
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    // 내가 선택된 탭이 아니면 아무것도 안 그림 (null 반환)
    if (context.value !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          "mt-2 ring-offset-[#0d1117] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 animate-in fade-in zoom-in-95 duration-200",
          className,
        )}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
