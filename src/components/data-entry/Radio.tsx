import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type InputHTMLAttributes,
} from "react";
import { cn } from "../shared/lib/utils";

// 1. Context 정의 (부모의 상태를 자식들에게 전달)
interface RadioContextValue {
  name?: string;
  value?: string;
  onChange: (value: string) => void;
  size: "sm" | "md" | "lg";
  activeColor: string;
}

const RadioContext = createContext<RadioContextValue | null>(null);

// 2. RadioGroup 컴포넌트 (상태 관리자)
export interface RadioGroupProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  size?: "sm" | "md" | "lg";
  activeColor?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      name,
      size = "md",
      activeColor = "border-[#00a2ff] text-[#00a2ff]", // 테두리와 내부 원(dot) 색상
      children,
      ...props
    },
    ref,
  ) => {
    // 제어/비제어 상태 동시 지원
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (newValue: string) => {
      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    return (
      <RadioContext.Provider
        value={{
          name,
          value: currentValue,
          onChange: handleChange,
          size,
          activeColor,
        }}
      >
        <div
          ref={ref}
          className={cn("flex flex-col gap-2", className)}
          role="radiogroup"
          {...props}
        >
          {children}
        </div>
      </RadioContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

// 3. Radio 컴포넌트 (실제 클릭되는 개별 아이템)
export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "value"
> {
  value: string; // 라디오는 각자의 고유 value가 필수!
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, value, disabled, ...props }, ref) => {
    const context = useContext(RadioContext);

    if (!context) {
      throw new Error(
        "Radio 컴포넌트는 반드시 RadioGroup 내부에서 사용되어야 합니다.",
      );
    }

    const isChecked = context.value === value;

    // 사이즈별 설정 (바깥 원 크기, 내부 점 크기)
    const sizeConfig = {
      sm: { outer: "h-4 w-4", inner: "h-2 w-2" },
      md: { outer: "h-5 w-5", inner: "h-2.5 w-2.5" },
      lg: { outer: "h-6 w-6", inner: "h-3 w-3" },
    };

    const currentSize = sizeConfig[context.size];

    return (
      <>
        <button
          type="button"
          role="radio"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={() => !disabled && context.onChange(value)}
          className={cn(
            "peer shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 outline-none",
            currentSize.outer,
            // 선택 여부에 따른 색상 변경
            isChecked
              ? context.activeColor
              : "border-gray-500 bg-transparent hover:border-gray-400",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]",
            isChecked
              ? "focus-visible:ring-[#00a2ff]"
              : "focus-visible:ring-gray-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          {/* 내부 동그라미 (체크 시 팝업 애니메이션) */}
          <span
            className={cn(
              "rounded-full bg-current transition-transform duration-200 ease-in-out",
              currentSize.inner,
              isChecked ? "scale-100" : "scale-0",
            )}
          />
        </button>

        {/* Form 연동을 위한 숨김 처리된 Native Input */}
        <input
          type="radio"
          ref={ref}
          className="sr-only"
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          tabIndex={-1}
          readOnly
          {...props}
        />
      </>
    );
  },
);
Radio.displayName = "Radio";
