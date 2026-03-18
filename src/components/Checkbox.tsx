import { forwardRef, useEffect, useRef, useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../shared/lib/utils";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "checked"
> {
  /** true(체크), false(빈칸), "indeterminate"(일부 체크 ➖) 상태 지원 */
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  size?: "sm" | "md" | "lg";
  activeColor?: string; // 체크되었을 때의 배경 & 테두리 색상
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      size = "md",
      activeColor = "bg-[#00a2ff] border-[#00a2ff]", // 기본 파란색
      name,
      value,
      ...props
    },
    ref,
  ) => {
    // 1. 제어/비제어 상태 관리
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState<
      boolean | "indeterminate"
    >(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const inputRef = useRef<HTMLInputElement>(null);

    // 🌟 2. 핵심 로직: 숨겨진 native input에 indeterminate 속성 동기화
    // (이 로직 덕분에 React Hook Form 등에서 완벽하게 상태를 추적할 수 있습니다)
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = isChecked === "indeterminate";
      }
    }, [isChecked]);

    // 3. 클릭 핸들러
    const handleClick = () => {
      if (disabled) return;

      // indeterminate 상태에서 클릭하면 무조건 true(전체 체크)로 변환
      const newValue = isChecked === "indeterminate" ? true : !isChecked;

      if (!isControlled) setInternalChecked(newValue);
      onCheckedChange?.(newValue);
    };

    // 📏 사이즈별 설정 (박스 크기, 모서리 둥기, 아이콘 크기)
    const sizeConfig = {
      sm: "h-4 w-4 rounded-sm [&_svg]:h-3 [&_svg]:w-3",
      md: "h-5 w-5 rounded [&_svg]:h-3.5 [&_svg]:w-3.5",
      lg: "h-6 w-6 rounded-md [&_svg]:h-4 [&_svg]:w-4",
    };

    return (
      <>
        <button
          type="button"
          role="checkbox"
          aria-checked={isChecked === "indeterminate" ? "mixed" : isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            "peer shrink-0 flex items-center justify-center border-2 transition-all duration-200 outline-none",
            sizeConfig[size],
            // 체크되지 않았을 땐 투명 배경에 회색 테두리, 체크/일부체크 땐 커스텀 색상
            isChecked === false
              ? "border-gray-500 bg-transparent hover:border-gray-400"
              : activeColor,
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]",
            isChecked === false
              ? "focus-visible:ring-gray-400"
              : "focus-visible:ring-[#00a2ff]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          {isChecked === true && (
            <Check strokeWidth={3} className="text-white" />
          )}
          {isChecked === "indeterminate" && (
            <Minus strokeWidth={3} className="text-white" />
          )}
        </button>

        {/* Form 연동을 위한 숨김 처리된 Native Input */}
        <input
          type="checkbox"
          ref={(node) => {
            // 내부 ref와 외부(forwardRef) 동시 적용 로직
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node); // 콜백 ref인 경우
            } else if (ref) {
              ref.current = node; // 객체형 ref (useRef)인 경우
            }
          }}
          className="sr-only"
          name={name}
          value={value}
          checked={isChecked === true}
          disabled={disabled}
          tabIndex={-1}
          readOnly
          {...props}
        />
      </>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
